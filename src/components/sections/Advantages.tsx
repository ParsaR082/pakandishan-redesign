import { useLanguage } from '../../context/LanguageContext';
import { getCompanyAdvantages } from '../../data/products';
import { KineticButton } from '../ui/KineticButton';

interface AdvantagesSectionProps {
  onNavigate?: (href: string) => void;
}

export function AdvantagesSection({ onNavigate }: AdvantagesSectionProps) {
  const { language, t, formatNumber } = useLanguage();
  const advantages = getCompanyAdvantages(language);

  return (
    <section
      id="advantages"
      aria-labelledby="advantages-heading"
      className="relative scroll-mt-24 py-28 sm:py-32 lg:py-40 section-base"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-16 reveal-section text-start">
          <div className="max-w-2xl">
            <h2
              id="advantages-heading"
              className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#f5f2eb] leading-[1.3]"
            >
              {t.advantages.title}
            </h2>
            <p className="text-[15px] sm:text-base text-[#c2bbb0] mt-3 leading-[1.85] max-w-[54ch]">
              {t.advantages.subtitle}
            </p>
          </div>

          {onNavigate && (
            <KineticButton
              variant="ghost"
              size="md"
              showArrow
              onClick={() => onNavigate('/services')}
              className="self-start md:self-end"
            >
              {language === 'fa'
                ? 'خدمات پس از فروش و گارانتی'
                : 'After-Sales & Warranty'}
            </KineticButton>
          )}
        </div>

        {/* Clean Numbered Advantage Cards with Specular Rim Lift */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 reveal-stagger-grid">
          {advantages.map((item, idx) => (
            <article
              key={item.id}
              className="reveal-card surface-panel panel-kinetic rounded-lg p-6 flex flex-col justify-between gap-6 text-start"
            >
              <span className="text-lg font-bold text-[#d4b278] tabular-nums">
                {formatNumber(String(idx + 1).padStart(2, '0'))}
              </span>

              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[#f5f2eb] mb-2.5 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-[#c2bbb0] leading-[1.8]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
