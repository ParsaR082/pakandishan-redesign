import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getTechPillars } from '../../data/products';
import { SafeImage } from '../ui/SafeImage';

interface TechnologySectionProps {
  onNavigate?: (href: string) => void;
}

export function TechnologySection({ onNavigate }: TechnologySectionProps) {
  const { language, t } = useLanguage();
  const techPillars = getTechPillars(language);

  return (
    <section
      id="technology"
      aria-labelledby="technology-heading"
      className="relative scroll-mt-24 py-28 sm:py-32 lg:py-40 section-alt"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Editorial Intro + Real Patented Shateryar Photo */}
          <div className="lg:col-span-5 flex flex-col gap-8 reveal-section text-start">
            <div>
              <h2
                id="technology-heading"
                className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#f5f2eb] leading-[1.3]"
              >
                {t.technology.title}
              </h2>
              <p className="text-[15px] sm:text-base text-[#c2bbb0] mt-4 leading-[1.85] max-w-[52ch]">
                {t.technology.subtitle}
              </p>
            </div>

            <figure className="space-y-3">
              <div className="floating-stage aspect-[4/3] w-full bg-transparent">
                <SafeImage
                  src="/assets/pakandishan/products/shateryar-round-3in1.webp"
                  alt={
                    language === 'fa'
                      ? 'دستگاه پهن‌کن خمیر شاطریار سه‌کاره ثبت اختراع پاک‌اندیشان'
                      : 'Pakandishan patented Shateryar 3-in-1 automatic dough sheeter'
                  }
                  fallbackTitle={t.technology.title}
                  width={800}
                  height={600}
                  className="floating-machine-img w-full h-full object-contain"
                />
              </div>
              <figcaption className="text-sm text-[#c2bbb0]">
                {language === 'fa'
                  ? 'شاطریار سه‌کاره — نخستین پهن‌کن اتوماتیک خمیر ثبت اختراع‌شده در ایران'
                  : 'Shateryar 3-in-1 — Iran’s first patented automatic dough sheeter'}
              </figcaption>
            </figure>

            {onNavigate && (
              <div>
                <button
                  type="button"
                  onClick={() => onNavigate('/about')}
                  className="group link-kinetic text-sm font-semibold text-[#d4b278] hover:text-[#ebd09e] transition-colors py-1 cursor-pointer"
                >
                  <span>
                    {language === 'fa'
                      ? 'آشنایی بیشتر با کارخانه و تاریخچه پاک‌اندیشان'
                      : 'Explore Our Urmia Plant & Heritage'}
                  </span>
                  <span className="kinetic-arrow-box" aria-hidden="true">
                    <ArrowLeft className="kinetic-arrow kinetic-arrow--main rtl:rotate-0 ltr:rotate-180" />
                    <ArrowLeft className="kinetic-arrow kinetic-arrow--trail rtl:rotate-0 ltr:rotate-180" />
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* 2x2 Architectural Numbered Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 reveal-stagger-grid">
            {techPillars.map((pillar) => (
              <article
                key={pillar.number}
                className="reveal-card group surface-panel panel-kinetic rounded-lg p-6 sm:p-7 flex flex-col justify-between gap-6 text-start"
              >
                <span className="text-xl sm:text-2xl font-bold text-[#d4b278] tabular-nums">
                  {pillar.number}
                </span>

                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#f5f2eb] mb-2.5 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#c2bbb0] leading-[1.8]">
                    {pillar.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
