import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  getFeaturedProducts,
  getProductCategories,
  ProductItem,
} from '../../data/products';
import { SafeImage } from '../ui/SafeImage';

interface CategoryGridProps {
  onSelectProduct: (product: ProductItem) => void;
}

export function CategoryGrid({ onSelectProduct }: CategoryGridProps) {
  const { language, t } = useLanguage();
  const categories = getProductCategories(language);
  const featuredProducts = getFeaturedProducts(language);

  const handleExplore = (targetProductId: string) => {
    const match =
      featuredProducts.find((p) => p.id === targetProductId) ?? featuredProducts[0];
    onSelectProduct(match);
  };

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="relative scroll-mt-24 py-24 lg:py-28 glass-band-alt border-t border-[#c5a46d]/16"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="max-w-2xl mb-12 reveal-section">
          <p className="text-xs font-medium text-[#c5a46d] mb-3">
            {t.categories.badge}
          </p>
          <h2
            id="categories-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f4f0e8] leading-snug"
          >
            {t.categories.title}
          </h2>
        </div>

        {/* 2x2 Category Grid (2 columns on mobile and desktop) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 reveal-stagger-grid">
          {categories.map((category) => (
            <article
              key={category.id}
              className="reveal-card group relative min-h-[210px] sm:min-h-[340px] rounded-lg overflow-hidden glass-surface flex flex-col justify-end p-3.5 sm:p-8 transition-colors duration-300 hover:border-[#c5a46d]/60"
            >
              <div className="absolute inset-0">
                <SafeImage
                  src={category.image}
                  alt={category.imageAlt}
                  fallbackTitle={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {/* Measured high-contrast dark scrim ensuring WCAG AA readability */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#090909]/95 via-[#090909]/68 to-[#090909]/25"
                />
              </div>

              <div className="relative z-10 max-w-lg">
                <p className="text-[10px] sm:text-xs text-[#e4c995] mb-1 sm:mb-2 line-clamp-1">
                  {category.subtitle}
                </p>
                <h3 className="text-sm sm:text-[26px] font-bold text-[#f4f0e8] mb-1 sm:mb-2.5 leading-snug">
                  {category.title}
                </h3>
                <p className="text-[11px] sm:text-sm text-[#aaa39a] leading-relaxed mb-2.5 sm:mb-5 line-clamp-2 sm:line-clamp-none">
                  {category.description}
                </p>

                <button
                  type="button"
                  onClick={() => handleExplore(category.targetProductId)}
                  className="inline-flex items-center gap-1 sm:gap-2 text-[11px] sm:text-sm font-semibold text-[#e4c995] hover:text-[#f4f0e8] transition-colors cursor-pointer"
                >
                  <span>
                    {t.categories.explorePrefix} {category.title}
                  </span>
                  <ArrowLeft
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 rtl:rotate-0 rtl:group-hover:-translate-x-1.5 ltr:rotate-180 ltr:group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
