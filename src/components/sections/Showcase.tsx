import { useLanguage } from '../../context/LanguageContext';
import { EXPORT_REGIONS, pickList, pickLocale } from '../../data/pakandishanCatalog';
import { KineticButton } from '../ui/KineticButton';
import { SafeImage } from '../ui/SafeImage';

interface ShowcaseSectionProps {
  onNavigate: (href: string) => void;
  reducedMotion: boolean;
}

export function ShowcaseSection({ onNavigate }: ShowcaseSectionProps) {
  const { language, t } = useLanguage();

  return (
    <section
      id="showcase"
      aria-labelledby="showcase-heading"
      className="relative scroll-mt-24 py-28 sm:py-32 lg:py-40 section-alt"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Asymmetric Edge-Aligned Export Showcase with Floating Transparent Machine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-6 reveal-section text-start">
            <h2
              id="showcase-heading"
              className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#f5f2eb] leading-[1.3]"
            >
              {t.showcase.title}
            </h2>
            <p className="text-[15px] sm:text-base text-[#c2bbb0] leading-[1.85] max-w-[54ch]">
              {t.showcase.description}
            </p>

            {/* Concise regional export highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {EXPORT_REGIONS.map((region) => (
                <div
                  key={region.id}
                  className="surface-panel panel-kinetic rounded-lg p-4 space-y-1.5"
                >
                  <p className="text-sm font-semibold text-[#ebd09e]">
                    {pickLocale(region.regionName, language)}
                  </p>
                  <p className="text-sm text-[#c2bbb0] leading-relaxed">
                    {pickList(region.countries, language).slice(0, 4).join(language === 'fa' ? '، ' : ', ')}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <KineticButton
                variant="primary"
                size="lg"
                showArrow
                onClick={() => onNavigate('/export')}
              >
                {t.showcase.cta}
              </KineticButton>
            </div>
          </div>

          <div className="lg:col-span-6 reveal-section">
            <div className="floating-stage aspect-[4/3] w-full bg-transparent">
              <SafeImage
                src="/assets/pakandishan/products/tafton-rotary-automatic-set.webp"
                alt={t.showcase.title}
                fallbackTitle={t.showcase.title}
                width={800}
                height={600}
                className="floating-machine-img w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
