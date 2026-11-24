import { Compass, Cpu, ShieldCheck, Sliders } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ASSET_MANIFEST } from '../../data/assets';
import { getTechPillars, TechPillar } from '../../data/products';
import { SafeImage } from '../ui/SafeImage';

const ICON_MAP: Record<TechPillar['iconKey'], typeof Compass> = {
  compass: Compass,
  cpu: Cpu,
  sliders: Sliders,
  shield: ShieldCheck,
};

export function TechnologySection() {
  const { language, t } = useLanguage();
  const techPillars = getTechPillars(language);

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="relative scroll-mt-24 py-24 lg:py-28 glass-band-alt border-t border-[#c5a46d]/16"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Editorial Intro + High-Res Engineering Macro Visual */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 reveal-section">
            <div>
              <p className="text-xs font-medium text-[#c5a46d] mb-3">
                {t.technology.badge}
              </p>
              <h2
                id="technology-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f4f0e8] leading-snug"
              >
                {t.technology.title}
              </h2>
              <p className="text-sm sm:text-base text-[#aaa39a] mt-4 leading-[1.9]">
                {t.technology.subtitle}
              </p>
            </div>

            <div className="relative rounded-lg overflow-hidden glass-surface aspect-[16/10] lg:flex-1 lg:min-h-[300px]">
              <SafeImage
                src={ASSET_MANIFEST.engineeringCloseup.path}
                alt={ASSET_MANIFEST.engineeringCloseup.altFa}
                fallbackTitle={t.technology.title}
                className="w-full h-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090909]/85 via-transparent to-transparent"
              />
              <div className="absolute bottom-4 inset-x-5 flex items-center justify-between gap-4 border-t border-[#c5a46d]/25 pt-3">
                <span className="text-xs font-medium text-[#e4c995]">
                  {language === 'fa'
                    ? 'دقت ماشین‌کاری و انتقال حرارت یکنواخت'
                    : 'CNC Machining Precision & Convective Uniformity'}
                </span>
                <span className="text-[11px] text-[#aaa39a] whitespace-nowrap">
                  {language === 'fa' ? 'ساختار استیل صنعتی' : 'Sanitary Stainless Steel'}
                </span>
              </div>
            </div>
          </div>

          {/* Numbered Feature Cards 01 - 04 */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-stagger-grid">
            {techPillars.map((pillar) => {
              const Icon = ICON_MAP[pillar.iconKey];
              return (
                <article
                  key={pillar.number}
                  className="reveal-card group surface-panel rounded-lg p-6 sm:p-7 flex flex-col justify-between gap-6 transition-[transform,border-color,box-shadow] duration-300 hover:border-[#c5a46d]/55 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono-tech text-2xl font-semibold text-[#c5a46d]/85 group-hover:text-[#e4c995] transition-colors">
                      {pillar.number}
                    </span>
                    <span className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/25 flex items-center justify-center text-[#c5a46d] group-hover:border-[#c5a46d]/55 transition-colors">
                      <Icon className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>

                  <div>
                    <div
                      aria-hidden="true"
                      className="w-10 h-px bg-[#c5a46d]/40 mb-4 group-hover:w-16 transition-[width] duration-300"
                    />
                    <h3 className="text-lg font-semibold text-[#f4f0e8] mb-2.5">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[#aaa39a] leading-[1.85]">
                      {pillar.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
