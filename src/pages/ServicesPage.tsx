import { useLanguage } from '../context/LanguageContext';
import { getBrandInfo } from '../data/navigation';
import { AFTER_SALES_PILLARS, pickLocale } from '../data/pakandishanCatalog';
import { KineticButton } from '../components/ui/KineticButton';
import { SafeImage } from '../components/ui/SafeImage';

interface ServicesPageProps {
  onNavigate: (href: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { language } = useLanguage();
  const brandInfo = getBrandInfo(language);

  return (
    <div className="page-enter">
      {/* Services Hero */}
      <section className="section-base pt-32 sm:pt-36 pb-20 sm:pb-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h1 className="heading-enter text-3xl sm:text-4xl font-bold text-[#f5f2eb] leading-[1.25]">
                {language === 'fa'
                  ? 'خدمات پس از فروش، گارانتی طلایی و مرکز آموزش پاک‌اندیشان'
                  : 'After-Sales Services, Golden Warranty & Training Center'}
              </h1>
              <p className="subtitle-enter text-[15px] sm:text-base text-[#c2bbb0] leading-[1.9]">
                {language === 'fa'
                  ? 'در شرکت ماشین‌سازی پاک‌اندیشان، تحویل دستگاه آغاز همراهی ما با نانوایی شماست. پیش از عرضه هر دستگاه جدید، قطعات یدکی اورجینال آن در انبار خدمات ذخیره می‌شود و تیم نصابان آموزش‌دیده در مرکز آموزش کارخانه، راه‌اندازی و آموزش اپراتورها را در محل انجام می‌دهند.'
                  : 'At Pakandishan, delivery is the start of our partnership. Before every machine model enters production, its genuine spare parts are stocked in our dedicated warehouse, and technicians trained at our Urmia Training Center commission the line on site.'}
              </p>

              <div className="cta-enter flex flex-wrap items-center gap-3 pt-2">
                <KineticButton
                  href={brandInfo.phoneHref}
                  variant="primary"
                  size="lg"
                  className="tabular-nums"
                >
                  {language === 'fa'
                    ? 'تماس با واحد خدمات: ۰۹۹۶۰۷۸۶۶۱۷'
                    : `Support Desk: ${brandInfo.phonePlaceholder}`}
                </KineticButton>
                <KineticButton
                  variant="ghost"
                  size="lg"
                  showArrow
                  onClick={() => onNavigate('/contact')}
                >
                  {language === 'fa'
                    ? 'ثبت درخواست خدمات یا قطعه'
                    : 'Request Service or Spare Part'}
                </KineticButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="floating-stage bg-transparent aspect-[4/3]">
                <SafeImage
                  src="/assets/pakandishan/products/robot-shater-automatic.webp"
                  alt={
                    language === 'fa'
                      ? 'پشتیبانی تخصصی، ربات شاطر و خدمات نصب پاک‌اندیشان'
                      : 'Pakandishan robotic shater and technical commissioning support'
                  }
                  fallbackTitle="Pakandishan Support"
                  width={800}
                  height={600}
                  className="floating-machine-img w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core After-Sales Pillars */}
      <section className="section-alt py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-[30px] font-bold text-[#f5f2eb] leading-[1.3] mb-3">
              {language === 'fa'
                ? 'چهار تعهد کلیدی پشتیبانی و نگهداری پاک‌اندیشان'
                : 'Four Commitments of Pakandishan Lifecycle Support'}
            </h2>
            <p className="text-[15px] sm:text-base text-[#c2bbb0] leading-[1.85]">
              {language === 'fa'
                ? 'اطمینان از تداوم پخت بدون توقف در نانوایی‌های شهری و خطوط صنعتی سراسر ایران و خارج از کشور.'
                : 'Engineered to keep urban bakeries and industrial plants running shift after shift with minimal downtime.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AFTER_SALES_PILLARS.map((pillar) => (
              <article
                key={pillar.id}
                className="surface-panel panel-kinetic rounded-lg p-6 sm:p-8 flex flex-col justify-between gap-6"
              >
                <span className="text-2xl font-bold text-[#d4b278] tabular-nums">
                  {language === 'fa' || language === 'ar'
                    ? pillar.number
                    : pillar.number
                        .replace('۰', '0')
                        .replace('۱', '1')
                        .replace('۲', '2')
                        .replace('۳', '3')
                        .replace('۴', '4')}
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-[#f5f2eb] mb-3">
                    {pickLocale(pillar.title, language)}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#c2bbb0] leading-[1.85]">
                    {pickLocale(pillar.description, language)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
