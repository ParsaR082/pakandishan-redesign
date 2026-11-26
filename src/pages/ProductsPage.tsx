import { useMemo, useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import {
  CATALOG_CATEGORIES,
  CatalogCategoryId,
  getProductsByCategory,
  PAKANDISHAN_PRODUCTS,
  pickLocale,
} from '../data/pakandishanCatalog';
import { SafeImage } from '../components/ui/SafeImage';

interface ProductsPageProps {
  onNavigate: (href: string) => void;
}

export function ProductsPage({ onNavigate }: ProductsPageProps) {
  const { language, formatNumber } = useLanguage();
  const { query } = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const activeCategory = useMemo<CatalogCategoryId | 'all'>(() => {
    const raw = query.get('category');
    if (
      raw === 'lavash' ||
      raw === 'tafton' ||
      raw === 'barbari' ||
      raw === 'sangak' ||
      raw === 'sheeters' ||
      raw === 'robotics'
    ) {
      return raw;
    }
    return 'all';
  }, [query]);

  const filteredProducts = useMemo(() => {
    const base = getProductsByCategory(activeCategory);
    const q = searchTerm.trim().toLowerCase();
    if (!q) return base;
    return base.filter((p) => {
      const hay = [
        p.name.fa,
        p.name.en,
        p.tagline.fa,
        p.tagline.en,
        p.shortDescription.fa,
        p.shortDescription.en,
      ]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [activeCategory, searchTerm]);

  const handleSelectCategory = (cat: CatalogCategoryId | 'all') => {
    if (cat === 'all') {
      onNavigate('/products');
    } else {
      onNavigate(`/products?category=${cat}`);
    }
  };

  const getCategoryTitle = (catId: string) => {
    const found = CATALOG_CATEGORIES.find((c) => c.id === catId);
    if (found) return pickLocale(found.title, language);
    if (catId === 'accessories') {
      const robotics = CATALOG_CATEGORIES.find((c) => c.id === 'robotics');
      return robotics ? pickLocale(robotics.title, language) : catId;
    }
    return catId;
  };

  return (
    <div className="page-enter">
      {/* Header & Filter Band */}
      <section className="section-base pt-32 sm:pt-36 pb-14 sm:pb-16">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <h1 className="heading-enter text-3xl sm:text-4xl font-bold text-[#f5f2eb] leading-[1.25] mb-4">
                {language === 'fa'
                  ? 'کاتالوگ کامل ماشین‌آلات و خطوط پخت پاک‌اندیشان'
                  : 'Complete Pakandishan Bakery Machinery Catalog'}
              </h1>
              <p className="subtitle-enter text-[15px] sm:text-base text-[#c2bbb0] leading-[1.85] max-w-[58ch]">
                {language === 'fa'
                  ? `مجموعه ${formatNumber(PAKANDISHAN_PRODUCTS.length)} دستگاه و خط کامل نان لواش، تافتون، بربری، سنگک، پهن‌کن‌های شاطریار و تجهیزات رباتیک ساخت کارخانه ارومیه.`
                  : `Explore all ${PAKANDISHAN_PRODUCTS.length} Lavash, Taftoon, Barbari, and Sangak lines, patented Shateryar sheeters, and robotic bakery systems manufactured in Urmia.`}
              </p>
            </div>

            {/* Instant Search Box */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search
                className="w-4 h-4 text-[#c2bbb0] absolute top-1/2 -translate-y-1/2 rtl:right-3.5 ltr:left-3.5 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'fa'
                    ? 'جستجوی دستگاه (مثلاً لواش، شاطریار...)'
                    : 'Search machines (Lavash, Shateryar...)'
                }
                aria-label={language === 'fa' ? 'جستجوی محصول' : 'Search products'}
                className="w-full h-12 rtl:pr-10 rtl:pl-9 ltr:pl-10 ltr:pr-9 rounded-md bg-[#141311] border border-white/15 text-sm text-[#f5f2eb] placeholder:text-[#c2bbb0]/65 hover:border-white/30 focus:border-[#d4b278]"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  aria-label={language === 'fa' ? 'پاک کردن جستجو' : 'Clear search'}
                  className="absolute top-1/2 -translate-y-1/2 rtl:left-3 ltr:right-3 text-[#c2bbb0] hover:text-[#f5f2eb] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs — horizontally scrollable on mobile so cards stay visible above the fold */}
          <div
            role="tablist"
            aria-label={language === 'fa' ? 'فیلتر دسته‌بندی محصولات' : 'Product categories'}
            className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 sm:flex-wrap"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => handleSelectCategory('all')}
              className={`h-10 px-4 rounded-md text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
                activeCategory === 'all'
                  ? 'bg-[#d4b278] border-[#d4b278] text-[#090908] font-semibold'
                  : 'bg-[#141311] border-white/12 text-[#c2bbb0] hover:text-[#f5f2eb] hover:border-[#d4b278]/50'
              }`}
            >
              {language === 'fa'
                ? `همه محصولات (${formatNumber(PAKANDISHAN_PRODUCTS.length)})`
                : `All Machines (${PAKANDISHAN_PRODUCTS.length})`}
            </button>

            {CATALOG_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = getProductsByCategory(cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`h-10 px-4 rounded-md text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-[#d4b278] border-[#d4b278] text-[#090908] font-semibold'
                      : 'bg-[#141311] border-white/12 text-[#c2bbb0] hover:text-[#f5f2eb] hover:border-[#d4b278]/50'
                  }`}
                >
                  {pickLocale(cat.title, language)}{' '}
                  <span className="opacity-75 tabular-nums">
                    ({language === 'fa' ? formatNumber(count) : count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Grid Band */}
      <section className="section-alt py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
          {filteredProducts.length === 0 ? (
            <div className="surface-panel rounded-lg p-12 text-start space-y-4">
              <h2 className="text-xl font-semibold text-[#f5f2eb]">
                {language === 'fa'
                  ? 'محصولی با این عبارت پیدا نشد'
                  : 'No matching machines found'}
              </h2>
              <p className="text-sm text-[#c2bbb0]">
                {language === 'fa'
                  ? 'عبارت جستجو را تغییر دهید یا فیلتر دسته‌بندی را روی «همه محصولات» قرار دهید.'
                  : 'Try adjusting your search query or switching back to All Machines.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  handleSelectCategory('all');
                }}
                className="h-11 px-5 rounded-md bg-[#d4b278] text-[#090908] text-sm font-semibold hover:bg-[#ebd09e] transition-colors cursor-pointer"
              >
                {language === 'fa' ? 'نمایش همه محصولات' : 'Show All Machines'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10 sm:gap-x-8 sm:gap-y-12">
              {filteredProducts.map((product) => {
                const name = pickLocale(product.name, language);
                const desc = pickLocale(product.shortDescription, language);
                const catTitle = getCategoryTitle(product.category);
                const href = `/products/${product.slug}`;

                return (
                  <article
                    key={product.slug}
                    onClick={() => onNavigate(href)}
                    className="group rounded-lg bg-transparent flex flex-col justify-between transition-colors duration-200 hover:bg-white/[0.035] cursor-pointer text-start p-3 sm:p-4 -m-3 sm:-m-4"
                  >
                    <div className="floating-stage aspect-[4/3] w-full bg-transparent mb-4 sm:mb-5">
                      <SafeImage
                        src={product.image}
                        alt={name}
                        fallbackTitle={name}
                        width={800}
                        height={600}
                        className="floating-machine-img w-full h-full object-contain"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between gap-4 sm:gap-5 px-1">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-[#d4b278] mb-1.5 sm:mb-2 truncate">
                          {catTitle}
                        </p>
                        <h2 className="text-sm sm:text-lg font-semibold text-[#f5f2eb] mb-2 leading-snug group-hover:text-[#ebd09e] transition-colors">
                          {name}
                        </h2>
                        <p className="text-sm text-[#c2bbb0] leading-[1.75] line-clamp-3">
                          {desc}
                        </p>
                      </div>

                      <div className="pt-3 sm:pt-4 border-t border-white/10">
                        <a
                          href={href}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onNavigate(href);
                          }}
                          className="link-kinetic text-sm font-semibold text-[#d4b278] group-hover:text-[#f5f2eb] transition-colors py-1"
                        >
                          <span>
                            {language === 'fa' ? 'مشخصات و استعلام' : 'Specs & Quote'}
                          </span>
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
          )}
        </div>
      </section>
    </div>
  );
}
