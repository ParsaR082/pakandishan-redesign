import { useState } from 'react';
import { Flame, Gauge as GaugeIcon, Sliders, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ASSET_MANIFEST } from '../../data/assets';
import { getDashboardProfiles } from '../../data/products';
import { getTemperatureDeltaLabel } from '../../lib/dashboardLogic';
import { SafeImage } from '../ui/SafeImage';
import { Gauge } from './Gauge';
import { ProductionChart } from './ProductionChart';

export function DashboardSection() {
  const { language, t, formatNumber } = useLanguage();
  const profiles = getDashboardProfiles(language);
  const [selectedId, setSelectedId] = useState<string>(profiles[0].id);

  const profile =
    profiles.find((item) => item.id === selectedId) ?? profiles[0];

  const statusRows = [
    { label: t.dashboard.statusHeatingLabel, value: profile.statusHeating, icon: Flame },
    { label: t.dashboard.statusControlLabel, value: profile.statusControl, icon: Sliders },
    { label: t.dashboard.statusOperationLabel, value: profile.statusOperation, icon: GaugeIcon },
    { label: t.dashboard.statusReadinessLabel, value: profile.statusReadiness, icon: Zap },
  ];

  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-heading"
      className="relative scroll-mt-24 py-24 lg:py-28 glass-band border-t border-[#c5a46d]/20"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        {/* Section Header + Illustrative Profile Switcher */}
        <div className="reveal-section flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#c5a46d] mb-3">
              {t.dashboard.badge}
            </p>
            <h2
              id="dashboard-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f4f0e8] leading-snug"
            >
              {t.dashboard.title}
            </h2>
            <p className="text-sm sm:text-base text-[#aaa39a] mt-3 leading-relaxed">
              {t.dashboard.description}
            </p>
          </div>

          {/* Interactive Profile Switcher (Segmented Control) */}
          <div
            role="tablist"
            aria-label={t.dashboard.profilesTabLabel}
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-lg bg-[#090908]/65 backdrop-blur-md border border-[#c5a46d]/22 self-start lg:self-end"
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
                  className={`h-10 px-4 rounded-md text-xs sm:text-[13px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#c5a46d] text-[#090909] font-semibold'
                      : 'text-[#aaa39a] hover:text-[#f4f0e8]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 12-Column Grid: Machine Render on One Column, Technical Panels on Other */}
        <div className="reveal-stagger-grid grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Column 1: Studio Industrial Rotary Oven Showcase + Status Panel */}
          <div className="reveal-card lg:col-span-5 flex flex-col gap-6">
            <div className="surface-panel rounded-lg overflow-hidden flex-1 flex flex-col">
              <div className="px-5 py-4 border-b border-[#c5a46d]/14 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-[#f4f0e8]">
                  {profile.machineLabel}
                </span>
                <span className="text-xs text-[#aaa39a]">
                  {t.dashboard.cadRenderLabel}
                </span>
              </div>

              <div className="relative flex-1 min-h-[280px] bg-black/50 overflow-hidden">
                <SafeImage
                  src={ASSET_MANIFEST.rotaryOven.path}
                  alt={ASSET_MANIFEST.rotaryOven.altFa}
                  fallbackTitle={profile.machineLabel}
                  className="w-full h-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0d0c0b]/95 to-transparent"
                />
              </div>

              {/* Technical Status Indicators Grid */}
              <div className="grid grid-cols-2 gap-px bg-[#c5a46d]/18 border-t border-[#c5a46d]/20">
                {statusRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.label}
                      className="bg-[#0e0d0b]/78 px-4 py-3.5 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <Icon
                          className="w-4 h-4 text-[#c5a46d] shrink-0"
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                        <span className="text-xs text-[#aaa39a] truncate">
                          {row.label}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-[#e4c995] whitespace-nowrap">
                        {row.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Gauges, Energy Monitor, and Production Chart */}
          <div className="reveal-card lg:col-span-7 flex flex-col gap-6">
            {/* Top Row: Temperature Gauge + Efficiency Gauge + Energy Card */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
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
              <div className="surface-panel rounded-lg p-5 flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-[#f4f0e8]">
                    {t.dashboard.dailyEnergyTitle}
                  </h3>
                  <Zap className="w-4 h-4 text-[#c5a46d]" aria-hidden="true" />
                </div>

                <div className="space-y-4 my-auto">
                  <div>
                    <p className="text-xs text-[#77716a] mb-1">
                      {language === 'fa' ? 'مصرف روزانه (نمونه)' : 'Daily Consumption'}
                    </p>
                    <p className="font-mono-tech text-3xl font-bold text-[#f4f0e8] tabular-nums">
                      {formatNumber(profile.dailyEnergyKwh)}{' '}
                      <span className="text-sm font-normal text-[#e4c995]">kWh</span>
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[#aaa39a]">
                        {language === 'fa' ? 'شاخص بهینه‌سازی عایق' : 'Thermal Optimization'}
                      </span>
                      <span className="text-[#e4c995] font-semibold tabular-nums">
                        +{formatNumber(profile.energySavedPercent)}{t.common.percentLabel}
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-white/8 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-l from-[#e4c995] to-[#80643c] transition-[width] duration-500"
                        style={{ width: `${Math.min(100, profile.energySavedPercent * 3.5)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#aaa39a] border-t border-[#c5a46d]/14 pt-3">
                  {profile.energyIndexLabel}
                </p>
              </div>
            </div>

            {/* Bottom Row: Recharts Production Output Line/Area Chart */}
            <ProductionChart data={profile.productionSeries} />
          </div>
        </div>
      </div>
    </section>
  );
}
