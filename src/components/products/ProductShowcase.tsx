import { ArrowLeft } from 'lucide-react';
import { FEATURED_PRODUCTS, ProductItem } from '../../data/products';
import { toPersianDigits } from '../../lib/dashboardLogic';
import { SafeImage } from '../ui/SafeImage';

interface ProductShowcaseProps {
  onSelectProduct: (product: ProductItem) => void;
}

export function ProductShowcase({ onSelectProduct }: ProductShowcaseProps) {
  return (
    <section
      id="products"
      aria-labelledby="products-heading"
      className="relative scroll-mt-24 py-24 lg:py-28 glass-band border-t border-[#c5a46d]/16"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal-section">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#c5a46d] mb-3">
              محصولات منتخب صنعتی
            </p>
            <h2
              id="products-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f4f0e8] leading-snug"
            >
              تجهیزات تخصصی برای تولید حرفه‌ای
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#aaa39a] max-w-md leading-relaxed">
            راهکارهای صنعتی متناسب با نیاز خطوط تولید نان و شیرینی.
          </p>
        </div>

        {/* Luxury Industrial Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-stagger-grid">
          {FEATURED_PRODUCTS.map((product, index) => (
            <article
              key={product.id}
              className="reveal-card group relative rounded-lg glass-surface overflow-hidden flex flex-col justify-between transition-[transform,border-color,box-shadow] duration-300 hover:border-[#c5a46d]/65 hover:-translate-y-1.5"
            >
              {/* Product Image Stage */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                <SafeImage
                  src={product.image}
                  alt={product.imageAlt}
                  fallbackTitle={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d0c0b]/90 via-transparent to-black/25"
                />
                <span className="absolute top-4 right-5 font-mono-tech text-xs text-[#e4c995]/85">
                  {toPersianDigits(String(index + 1).padStart(2, '0'))}
                </span>
              </div>

              {/* Editorial Details */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-6">
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <p className="text-xs text-[#c5a46d] mb-2">{product.category}</p>
                  <h3 className="text-xl font-bold text-[#f4f0e8] mb-3">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#aaa39a] leading-[1.85]">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#c5a46d]/14 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="inline-flex items-center gap-2.5 text-sm font-semibold text-[#e4c995] hover:text-[#f4f0e8] transition-colors py-1.5 cursor-pointer"
                  >
                    <span>بررسی جزئیات {product.name}</span>
                    <ArrowLeft
                      className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1.5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
