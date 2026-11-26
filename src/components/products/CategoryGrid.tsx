import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  CATALOG_CATEGORIES,
  getProductsByCategory,
  pickLocale,
} from '../../data/pakandishanCatalog';
import { SafeImage } from '../ui/SafeImage';

interface CategoryGridProps {
  onNavigate: (href: string) => void;
}

export function CategoryGrid({ onNavigate }: CategoryGridProps) {
  const { language, t, formatNumber } = useLanguage();

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="relative scroll-mt-24 py-28 sm:py-32 lg:py-40 section-alt"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl mb-14 lg:mb-16 reveal-section text-start">
          <h2
            id="categories-heading"
            className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#f5f2eb] leading-[1.3]"
          >
            {t.categories.title}
          </h2>
        </div>

        {/* 6 Real Pakandishan Bakery Categories — Floating Borderless Presentation */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12 reveal-stagger-grid">
          {CATALOG_CATEGORIES.map((category) => {
            const title = pickLocale(category.title, language);
            const subtitle = pickLocale(category.subtitle, language);
            const description = pickLocale(category.description, language);
            const count = getProductsByCategory(category.id).length;
            const targetUrl = `/products?category=${category.id}`;

            return (
              <article
                key={category.id}
                onClick={() => onNavigate(targetUrl)}
                className="reveal-card group rounded-lg bg-transparent flex flex-col justify-between transition-colors duration-200 hover:bg-white/[0.04] cursor-pointer text-start p-3 sm:p-4 -m-3 sm:-m-4"
              >
                <div className="floating-stage aspect-[4/3] w-full bg-transparent mb-4 sm:mb-5">
                  <SafeImage
                    src={category.image}
                    alt={title}
                    fallbackTitle={title}
                    width={800}
                    height={600}
                    className="floating-machine-img w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between gap-4 sm:gap-5 px-1">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                      <p className="text-xs sm:text-sm font-medium text-[#d4b278] truncate">
                        {subtitle}
                      </p>
                      <span className="text-xs sm:text-sm text-[#c2bbb0] tabular-nums shrink-0">
                        {language === 'fa'
                          ? `${formatNumber(count)} مدل`
                          : `${count}`}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#f5f2eb] mb-2 leading-snug group-hover:text-[#ebd09e] transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-[#c2bbb0] leading-[1.75] line-clamp-3">
                      {description}
                    </p>
                  </div>

                  <div className="pt-3 sm:pt-4 border-t border-white/10">
                    <a
                      href={targetUrl}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigate(targetUrl);
                      }}
                      className="link-kinetic text-sm font-semibold text-[#d4b278] group-hover:text-[#f5f2eb] transition-colors py-1"
                    >
                      <span>{t.categories.explorePrefix}</span>
                      <span className="kinetic-arrow-box" aria-hidden="true">
                        <ArrowLeft className="kinetic-arrow kinetic-arrow--main rtl:rotate-0 ltr:rotate-180" />
                        <ArrowLeft className="kinetic-arrow kinetic-arrow--trail rtl:rotate-0 ltr:rotate-180" />
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
