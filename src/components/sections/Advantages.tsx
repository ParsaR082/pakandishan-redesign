import { Award, Crosshair, Headphones, Layers, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getCompanyAdvantages, CompanyAdvantage } from '../../data/products';

const ICON_MAP: Record<CompanyAdvantage['iconKey'], typeof Layers> = {
  layers: Layers,
  crosshair: Crosshair,
  headphones: Headphones,
  award: Award,
  sparkles: Sparkles,
};

export function AdvantagesSection() {
  const { language, t, formatNumber } = useLanguage();
  const advantages = getCompanyAdvantages(language);

  return (
    <section
      id="advantages"
      aria-labelledby="advantages-heading"
      className="relative scroll-mt-24 py-24 lg:py-28 glass-band border-t border-[#c5a46d]/16"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal-section">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#c5a46d] mb-3">
              {t.advantages.badge}
            </p>
            <h2
              id="advantages-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f4f0e8] leading-snug"
            >
              {t.advantages.title}
            </h2>
          </div>
          <p className="text-sm text-[#aaa39a] max-w-md leading-relaxed">
            {t.advantages.subtitle}
          </p>
        </div>

        {/* Clean Horizontal Architectural Feature Grid inside Dark Frosted Glass */}
        <div className="glass-surface rounded-lg overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 divide-y sm:divide-y-0 sm:rtl:divide-x-reverse sm:ltr:divide-x divide-[#c5a46d]/16 reveal-stagger-grid">
          {advantages.map((item, idx) => {
            const Icon = ICON_MAP[item.iconKey];
            return (
              <div
                key={item.id}
                className="reveal-card p-6 sm:p-6 flex flex-col justify-between gap-5 hover:bg-white/[0.025] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <Icon
                    className="w-5 h-5 text-[#c5a46d]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <span className="font-mono-tech text-xs text-[#77716a]">
                    {formatNumber(String(idx + 1).padStart(2, '0'))}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#f4f0e8] mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#aaa39a] leading-[1.85]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
