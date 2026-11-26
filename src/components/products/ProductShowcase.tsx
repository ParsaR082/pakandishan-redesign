import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import {
  CATALOG_CATEGORIES,
  PAKANDISHAN_PRODUCTS,
  pickLocale,
} from '../../data/pakandishanCatalog';
import { KineticButton } from '../ui/KineticButton';
import { SafeImage } from '../ui/SafeImage';

interface ProductShowcaseProps {
  onNavigate: (href: string) => void;
}

export function ProductShowcase({ onNavigate }: ProductShowcaseProps) {
  const { language, t, formatNumber } = useLanguage();
  const featured = PAKANDISHAN_PRODUCTS.filter((p) => p.featured).slice(0, 6);

  const getCategoryTitle = (catId: string) => {
    const found = CATALOG_CATEGORIES.find((c) => c.id === catId);
    return found ? pickLocale(found.title, language) : catId;
  };

  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative scroll-mt-24 py-28 sm:py-32 lg:py-40 section-base"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-16 reveal-section text-start">
          <div className="max-w-2xl">
            <h2
              id="products-heading"
              className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#f5f2eb] leading-[1.3]"
            >
              {t.products.title}
            </h2>
            <p className="text-[15px] sm:text-base text-[#c2bbb0] mt-3 leading-[1.85] max-w-[54ch]">
              {t.products.subtitle}
            </p>
          </div>

          <KineticButton
            variant="primary"
            size="md"
            showArrow
            onClick={() => onNavigate('/products')}
            className="self-start md:self-end"
          >
            {language === 'fa'
              ? `مشاهده هر ${formatNumber(PAKANDISHAN_PRODUCTS.length)} محصول`
              : `View All ${PAKANDISHAN_PRODUCTS.length} Machines`}
          </KineticButton>
        </div>

        {/* 6 Featured Real Pakandishan Products — Floating Borderless Cutouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 reveal-stagger-grid">
          {featured.map((product, index) => {
            const name = pickLocale(product.name, language);
            const desc = pickLocale(product.shortDescription, language);
            const catTitle = getCategoryTitle(product.category);
            return (
              <article
                key={product.slug}
                onClick={() => onNavigate(`/products/${product.slug}`)}
                className="reveal-card group rounded-lg bg-transparent flex flex-col justify-between transition-colors duration-200 hover:bg-white/[0.035] cursor-pointer text-start p-4 -m-4"
              >
                {/* Floating Transparent Product Cutout — blends directly into the site backdrop */}
                <div className="floating-stage relative aspect-[4/3] w-full bg-transparent mb-5">
                  <SafeImage
                    src={product.image}
                    alt={name}
                    fallbackTitle={name}
                    width={800}
                    height={600}
                    className="floating-machine-img w-full h-full object-contain"
                  />
                </div>

                {/* Clean Borderless Editorial Details */}
                <div className="flex-1 flex flex-col justify-between gap-5 px-1">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <p className="text-sm font-medium text-[#d4b278]">
                        {catTitle}
                      </p>
                      <span className="text-sm font-medium text-[#c2bbb0] tabular-nums">
                        {formatNumber(String(index + 1).padStart(2, '0'))}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-[#f5f2eb] mb-3 leading-snug group-hover:text-[#ebd09e] transition-colors">
                      {name}
                    </h3>
                    <p className="text-sm sm:text-[15px] text-[#c2bbb0] leading-[1.8]">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <a
                      href={`/products/${product.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onNavigate(`/products/${product.slug}`);
                      }}
                      className="link-kinetic text-sm font-semibold text-[#d4b278] group-hover:text-[#f5f2eb] transition-colors py-1"
                    >
                      <span>{t.products.viewSpecs}</span>
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
