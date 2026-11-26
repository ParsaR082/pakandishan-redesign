import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getBrandInfo } from '../data/navigation';
import {
  CATALOG_CATEGORIES,
  getProductBySlug,
  PAKANDISHAN_PRODUCTS,
  pickList,
  pickLocale,
} from '../data/pakandishanCatalog';
import { KineticButton } from '../components/ui/KineticButton';
import { SafeImage } from '../components/ui/SafeImage';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (href: string) => void;
}

export function ProductDetailPage({ slug, onNavigate }: ProductDetailPageProps) {
  const { language } = useLanguage();
  const brandInfo = getBrandInfo(language);
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <section className="page-enter section-base pt-36 pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f2eb]">
            {language === 'fa' ? 'دستگاه مورد نظر یافت نشد' : 'Machine Not Found'}
          </h1>
          <p className="text-base text-[#c2bbb0]">
            {language === 'fa'
              ? 'لینک واردشده در کاتالوگ محصولات موجود نیست. می‌توانید تمام ۲۰ محصول را در صفحه محصولات مشاهده کنید.'
              : 'The requested machine slug was not found. Browse our complete 20-machine catalog below.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('/products')}
            className="h-12 px-6 rounded-md bg-[#d4b278] text-[#090908] text-sm font-semibold hover:bg-[#ebd09e] transition-colors cursor-pointer"
          >
            {language === 'fa' ? 'بازگشت به کاتالوگ محصولات' : 'Back to Catalog'}
          </button>
        </div>
      </section>
    );
  }

  const name = pickLocale(product.name, language);
  const tagline = pickLocale(product.tagline, language);
  const fullDescription = pickLocale(product.fullDescription, language);
  const highlights = pickList(product.highlights, language);

  const catObj =
    CATALOG_CATEGORIES.find((c) => c.id === product.category) ??
    CATALOG_CATEGORIES.find((c) => c.id === 'robotics');
  const categoryTitle = catObj ? pickLocale(catObj.title, language) : product.category;

  const relatedProducts = product.relatedSlugs
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const fallbackRelated =
    relatedProducts.length > 0
      ? relatedProducts
      : PAKANDISHAN_PRODUCTS.filter((p) => p.slug !== product.slug).slice(0, 3);

  const inquiryHref = `/contact?machine=${encodeURIComponent(name)}`;

  return (
    <div className="page-enter">
      {/* Main Product Hero & Technical Detail */}
      <section className="section-base pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-[#c2bbb0] mb-8"
          >
            <a
              href="/products"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/products');
              }}
              className="inline-flex items-center gap-1.5 text-[#d4b278] hover:text-[#ebd09e] transition-colors"
            >
              <ArrowRight
                className="w-4 h-4 rtl:rotate-0 ltr:rotate-180"
                aria-hidden="true"
              />
              <span>{language === 'fa' ? 'کاتالوگ محصولات' : 'All Machines'}</span>
            </a>
            <span aria-hidden="true">/</span>
            <a
              href={`/products?category=${product.category === 'accessories' ? 'robotics' : product.category}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(
                  `/products?category=${product.category === 'accessories' ? 'robotics' : product.category}`
                );
              }}
              className="hover:text-[#f5f2eb] transition-colors"
            >
              {categoryTitle}
            </a>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Floating Transparent Machine Showcase */}
            <div className="lg:col-span-6">
              <div className="floating-stage bg-transparent aspect-[4/3]">
                <SafeImage
                  src={product.image}
                  alt={name}
                  fallbackTitle={name}
                  width={800}
                  height={600}
                  className="floating-machine-img w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Summary & Inquiry CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-sm font-medium text-[#d4b278] mb-2">
                  {categoryTitle}
                </p>
                <h1 className="heading-enter text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#f5f2eb] leading-[1.25] mb-3">
                  {name}
                </h1>
                <p className="subtitle-enter text-base sm:text-lg font-medium text-[#ebd09e]">
                  {tagline}
                </p>
              </div>

              <p className="subtitle-enter text-[15px] sm:text-base text-[#c2bbb0] leading-[1.9]">
                {fullDescription}
              </p>

              {/* High-Contrast Kinetic CTAs */}
              <div className="cta-enter flex flex-wrap items-center gap-3 pt-2">
                <KineticButton
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={() => onNavigate(inquiryHref)}
                >
                  {language === 'fa'
                    ? 'استعلام قیمت و مشاوره این دستگاه'
                    : 'Request Quote for This Machine'}
                </KineticButton>

                <KineticButton
                  href={brandInfo.phoneHref}
                  variant="ghost"
                  size="lg"
                  className="tabular-nums"
                >
                  {language === 'fa'
                    ? 'تماس فوری: ۰۹۹۶۰۷۸۶۶۱۷'
                    : `Call ${brandInfo.phonePlaceholder}`}
                </KineticButton>
              </div>
            </div>
          </div>

          {/* Highlights & Specifications Two-Column Band */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-14 lg:mt-16">
            {/* Highlights */}
            <div className="lg:col-span-6 surface-panel rounded-lg p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-semibold text-[#f5f2eb]">
                {language === 'fa'
                  ? 'ویژگی‌های مهندسی و مزایای عملکردی'
                  : 'Engineering Highlights & Advantages'}
              </h2>
              <ul className="space-y-3.5">
                {highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] text-[#c2bbb0] leading-[1.8]"
                  >
                    <Check
                      className="w-4 h-4 text-[#d4b278] shrink-0 mt-1.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specs Table */}
            <div className="lg:col-span-6 surface-panel rounded-lg p-6 sm:p-8 space-y-5">
              <h2 className="text-xl font-semibold text-[#f5f2eb]">
                {language === 'fa' ? 'مشخصات فنی کلیدی' : 'Key Technical Specifications'}
              </h2>
              <dl className="divide-y divide-white/10">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label.en}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4"
                  >
                    <dt className="text-sm font-medium text-[#d4b278]">
                      {pickLocale(spec.label, language)}
                    </dt>
                    <dd className="text-sm sm:text-[15px] font-medium text-[#f5f2eb]">
                      {pickLocale(spec.value, language)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Related Machines */}
      <section className="section-alt py-20 sm:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <h2 className="text-2xl font-bold text-[#f5f2eb] mb-10">
            {language === 'fa' ? 'ماشین‌آلات مرتبط و مکمل خط تولید' : 'Related & Complementary Machines'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {fallbackRelated.map((rel) => {
              const relName = pickLocale(rel.name, language);
              const relDesc = pickLocale(rel.shortDescription, language);
              const relHref = `/products/${rel.slug}`;
              return (
                <article
                  key={rel.slug}
                  onClick={() => onNavigate(relHref)}
                  className="group rounded-lg bg-transparent flex flex-col justify-between transition-colors duration-200 hover:bg-white/[0.035] cursor-pointer p-4 -m-4"
                >
                  <div className="floating-stage aspect-[4/3] w-full bg-transparent mb-5">
                    <SafeImage
                      src={rel.image}
                      alt={relName}
                      fallbackTitle={relName}
                      width={800}
                      height={600}
                      className="floating-machine-img w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between gap-4 px-1">
                    <div>
                      <h3 className="text-lg font-semibold text-[#f5f2eb] mb-2 group-hover:text-[#ebd09e] transition-colors">
                        {relName}
                      </h3>
                      <p className="text-sm text-[#c2bbb0] leading-[1.75] line-clamp-2">
                        {relDesc}
                      </p>
                    </div>
                    <span className="link-kinetic text-sm font-semibold text-[#d4b278] group-hover:text-[#f5f2eb] transition-colors self-start py-1">
                      <span>{language === 'fa' ? 'مشاهده جزئیات' : 'View Machine'}</span>
                      <span className="kinetic-arrow-box" aria-hidden="true">
                        <ArrowLeft className="kinetic-arrow kinetic-arrow--main rtl:rotate-0 ltr:rotate-180" />
                        <ArrowLeft className="kinetic-arrow kinetic-arrow--trail rtl:rotate-0 ltr:rotate-180" />
                      </span>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
