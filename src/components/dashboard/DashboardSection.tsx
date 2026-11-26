import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { COMPANY_STATS, pickLocale } from '../../data/pakandishanCatalog';
import { getDashboardProfiles } from '../../data/products';
import { getTemperatureDeltaLabel } from '../../lib/dashboardLogic';
import { AnimatedStatValue } from '../ui/AnimatedStatValue';
import { SafeImage } from '../ui/SafeImage';
import { Gauge } from './Gauge';
import { ProductionChart } from './ProductionChart';

const PROFILE_IMAGES: Record<string, string> = {
  'lavash-line': '/assets/pakandishan/products/lavash-rotary-automatic-set.webp',
  'barbari-line': '/assets/pakandishan/products/barbari-automatic-set.webp',
  'sangak-line': '/assets/pakandishan/products/sangak-automatic-set.webp',
  'fantasy-bread': '/assets/pakandishan/products/lavash-rotary-automatic-set.webp',
  'pastry-line': '/assets/pakandishan/products/barbari-automatic-set.webp',
  'traditional-bread': '/assets/pakandishan/products/sangak-automatic-set.webp',
};

export function DashboardSection() {
  const { language, t, formatNumber } = useLanguage();
  const profiles = getDashboardProfiles(language);
  const [selectedId, setSelectedId] = useState<string>(profiles[0].id);

  const profile =
    profiles.find((item) => item.id === selectedId) ?? profiles[0];
  const machineImage =
    PROFILE_IMAGES[profile.id] ??
    '/assets/pakandishan/products/lavash-rotary-automatic-set.webp';

  const statusRows = [
    { label: t.dashboard.statusHeatingLabel, value: profile.statusHeating },
    { label: t.dashboard.statusControlLabel, value: profile.statusControl },
    { label: t.dashboard.statusOperationLabel, value: profile.statusOperation },
    { label: t.dashboard.statusReadinessLabel, value: profile.statusReadiness },
  ];

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="relative scroll-mt-24 py-28 sm:py-32 lg:py-40 section-base"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Authentic Pakandishan Scale & Trust Metrics Strip with Animated Counters */}
        <div className="reveal-stagger-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mb-20 lg:mb-24">
          {COMPANY_STATS.map((stat) => (
            <div
              key={stat.id}
              className="reveal-card surface-panel panel-kinetic rounded-lg px-5 py-5 sm:px-6 sm:py-6 flex flex-col justify-between gap-2 text-start"
            >
              <AnimatedStatValue
                rawValue={
                  language === 'fa' || language === 'ar'
                    ? stat.valueFa
                    : stat.valueEn
                }
                usePersianDigits={language === 'fa' || language === 'ar'}
                className="text-2xl sm:text-3xl font-bold text-[#ebd09e] tabular-nums leading-none"
              />
              <span className="text-sm text-[#c2bbb0] leading-snug">
                {pickLocale(stat.label, language)}
              </span>
            </div>
          ))}
        </div>

        {/* Section Header + High-Contrast Profile Switcher */}
        <div className="reveal-section flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-16 text-start">
          <div className="max-w-2xl">
            <h2
              id="dashboard-heading"
              className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#f5f2eb] leading-[1.3]"
            >
              {t.dashboard.title}
            </h2>
            <p className="text-[15px] sm:text-base text-[#c2bbb0] mt-4 leading-[1.85] max-w-[58ch]">
              {t.dashboard.description}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={t.dashboard.profilesTabLabel}
            className="flex flex-wrap items-center gap-2 p-1.5 rounded-lg bg-[#141311] border border-white/10 self-start lg:self-end"
          >
            {profiles.map((item) => {
              const isSelected = item.id === profile.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedId(item.id)}
                  className={`h-10 px-4 rounded-md text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#d4b278] text-[#090908] font-semibold'
                      : 'text-[#c2bbb0] hover:bg-white/8 hover:text-[#f5f2eb]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="reveal-stagger-grid grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Column 1: Floating Transparent Machine Cutout + Technical Status */}
          <div className="reveal-card lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-base font-semibold text-[#f5f2eb]">
                {profile.machineLabel}
              </span>
              <span className="text-sm text-[#d4b278] shrink-0">
                {t.dashboard.cadRenderLabel}
              </span>
            </div>

            <div className="floating-stage relative aspect-[4/3] w-full bg-transparent">
              <SafeImage
                src={machineImage}
                alt={profile.machineLabel}
                fallbackTitle={profile.machineLabel}
                width={800}
                height={600}
                className="floating-machine-img w-full h-full object-contain"
              />
            </div>

            {/* Clean Typographic Status Grid */}
            <div className="surface-panel rounded-lg overflow-hidden grid grid-cols-2 gap-px bg-white/8 flex-1">
              {statusRows.map((row) => (
                <div
                  key={row.label}
                  className="bg-[#141311]/90 px-5 py-4 flex flex-col justify-center gap-1 text-start"
                >
                  <span className="text-sm text-[#c2bbb0]">
                    {row.label}
                  </span>
                  <span className="text-sm font-semibold text-[#f5f2eb]">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Gauges, Energy Monitor, and Production Chart */}
          <div className="reveal-card lg:col-span-7 flex flex-col gap-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Gauge
                title={t.dashboard.gauge1Title}
                value={profile.temperature}
                maxValue={profile.maxTemperature}
                unit="°C"
                statusLabel={
                  language === 'fa'
                    ? `هدف ${formatNumber(profile.targetTemperature)}°C`
                    : `Target ${formatNumber(profile.targetTemperature)}°C`
                }
                subtitle={getTemperatureDeltaLabel(
                  profile.temperature,
                  profile.targetTemperature,
                  language
                )}
              />

              <Gauge
                title={t.dashboard.gauge2Title}
                value={profile.efficiency}
                maxValue={100}
                unit={t.common.percentLabel}
                statusLabel={t.dashboard.gauge2Status}
                subtitle={t.dashboard.gauge2Subtitle}
              />

              {/* Energy Monitoring Card */}
              <div className="surface-panel rounded-lg p-6 flex flex-col justify-between gap-5 text-start">
                <h3 className="text-base font-semibold text-[#f5f2eb]">
                  {t.dashboard.dailyEnergyTitle}
                </h3>

                <div className="space-y-5 my-auto">
                  <div>
                    <p className="text-sm text-[#c2bbb0] mb-1">
                      {language === 'fa' ? 'مصرف شیفت' : 'Shift Estimate'}
                    </p>
                    <p className="text-3xl font-bold text-[#f5f2eb] tabular-nums">
                      {formatNumber(profile.dailyEnergyKwh)}{' '}
                      <span className="text-sm font-medium text-[#d4b278]">kWh</span>
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-[#c2bbb0]">
                        {language === 'fa' ? 'صرفه‌جویی سوخت' : 'Fuel Saving'}
                      </span>
                      <span className="text-[#ebd09e] font-semibold tabular-nums">
                        +{formatNumber(profile.energySavedPercent)}{t.common.percentLabel}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-md bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-md bg-[#d4b278] transition-[width] duration-500"
                        style={{ width: `${Math.min(100, profile.energySavedPercent * 3.5)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#c2bbb0] border-t border-white/8 pt-4">
                  {profile.energyIndexLabel}
                </p>
              </div>
            </div>

            <ProductionChart data={profile.productionSeries} />
          </div>
        </div>
      </div>
    </section>
  );
}
