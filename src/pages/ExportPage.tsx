import { useLanguage } from '../context/LanguageContext';
import {
  EXPORT_REGIONS,
  pickList,
  pickLocale,
} from '../data/pakandishanCatalog';
import { KineticButton } from '../components/ui/KineticButton';
import { SafeImage } from '../components/ui/SafeImage';

interface ExportPageProps {
  onNavigate: (href: string) => void;
}

export function ExportPage({ onNavigate }: ExportPageProps) {
  const { language } = useLanguage();

  const exportPillars = [
    {
      num: language === 'fa' ? '۰۱' : '01',
      title:
        language === 'fa'
          ? 'انطباق با استاندارد CE اروپا و ISO 9001'
          : 'European CE & ISO 9001 Compliance',
      desc:
        language === 'fa'
          ? 'طراحی تابلو برق، ایمنی مشعل و سطوح استیل خوراکی منطبق بر مقررات واردات اروپا، آمریکای شمالی و استرالیا.'
          : 'Electrical panels, burner safety interlocks, and food-grade stainless steel engineered for EU, North American, and Australian import compliance.',
    },
    {
      num: language === 'fa' ? '۰۲' : '02',
      title:
        language === 'fa'
          ? 'بسته‌بندی صادراتی و سازه پرتابل کانتینری'
          : 'Container-Ready Portable Packaging',
      desc:
        language === 'fa'
          ? 'مهندسی ابعاد و وزن دستگاه‌ها برای بارگیری ایمن در کانتینر دریایی و زمینی با حداقل هزینه نصب در کشور مقصد.'
          : 'Modular frame dimensions engineered for sea and overland container freight with rapid site assembly at destination.',
    },
    {
      num: language === 'fa' ? '۰۳' : '03',
      title:
        language === 'fa'
          ? 'مشاوره، راه‌اندازی و تأمین قطعات بین‌المللی'
          : 'Global Commissioning & Spare Parts',
      desc:
        language === 'fa'
          ? 'ارسال پک کامل قطعات مصرفی همراه دستگاه، پشتیبانی آنلاین مهندسی و امکان اعزام کارشناس برای نصب خطوط کارخانه‌ای.'
          : 'Every export shipment includes essential spare parts, remote engineering diagnostics, and optional on-site commissioning.',
    },
  ];

  return (
    <div className="page-enter">
      {/* Export Overview Band */}
      <section className="section-base pt-32 sm:pt-36 pb-20 sm:pb-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h1 className="heading-enter text-3xl sm:text-4xl font-bold text-[#f5f2eb] leading-[1.25]">
                {language === 'fa'
                  ? 'صادرات ماشین‌آلات پاک‌اندیشان به بیش از ۳۰ کشور جهان'
                  : 'Pakandishan Machinery Exported to 30+ Countries Worldwide'}
              </h1>
              <p className="subtitle-enter text-[15px] sm:text-base text-[#c2bbb0] leading-[1.9]">
                {language === 'fa'
                  ? 'کیفیت ساخت مهندسی، مصرف انرژی بهینه و نشان CE اروپا موجب شده است خطوط تمام‌اتوماتیک نان لواش، تافتون، بربری، سنگک و پهن‌کن‌های شاطریار پاک‌اندیشان در نانوایی‌های معتبر پنج قاره جهان مشغول به کار باشند.'
                  : 'Backed by European CE conformity, ISO 9001 quality assurance, and container-ready modular builds, Pakandishan’s Lavash, Taftoon, Barbari, Sangak, and Shateryar machines operate daily across five continents.'}
              </p>
              <div className="cta-enter pt-2">
                <KineticButton
                  variant="primary"
                  size="lg"
                  showArrow
                  onClick={() =>
                    onNavigate(
                      `/contact?machine=${encodeURIComponent(
                        language === 'fa'
                          ? 'مشاوره کامل راه‌اندازی خط نانوایی'
                          : 'Turnkey Bakery Line Consultation'
                      )}`
                    )
                  }
                >
                  {language === 'fa'
                    ? 'درخواست پیش‌فاکتور صادراتی'
                    : 'Request Export Proforma & Quote'}
                </KineticButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="floating-stage bg-transparent aspect-[4/3]">
                <SafeImage
                  src="/assets/pakandishan/products/sangak-automatic-set.webp"
                  alt={
                    language === 'fa'
                      ? 'خط صادراتی تمام‌اتوماتیک نان سنتی پاک‌اندیشان'
                      : 'Pakandishan export-grade automatic traditional bread line'
                  }
                  fallbackTitle="Pakandishan Export"
                  width={800}
                  height={600}
                  className="floating-machine-img w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Destination Countries Matrix */}
      <section className="section-alt py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-[30px] font-bold text-[#f5f2eb] leading-[1.3] mb-3">
              {language === 'fa'
                ? 'مقاصد فعال صادراتی در چهار حوزه جغرافیایی'
                : 'Active Export Destinations Across Four Regions'}
            </h2>
            <p className="text-[15px] sm:text-base text-[#c2bbb0] leading-[1.85]">
              {language === 'fa'
                ? 'فهرست کشورهای اصلی مقصد صادرات خطوط نانوایی و تجهیزات پخت شرکت ماشین‌سازی پاک‌اندیشان:'
                : 'Primary international markets operating Pakandishan flatbread lines and dough sheeters:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {EXPORT_REGIONS.map((region) => (
              <div
                key={region.id}
                className="surface-panel panel-kinetic rounded-lg p-6 sm:p-8 space-y-5"
              >
                <h3 className="text-lg font-semibold text-[#ebd09e]">
                  {pickLocale(region.regionName, language)}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {pickList(region.countries, language).map((country) => (
                    <span
                      key={country}
                      className="px-3.5 py-1.5 rounded-md bg-[#0e0d0c] border border-white/10 text-sm text-[#f5f2eb] transition-colors duration-200 hover:border-[#d4b278]/50 hover:text-[#ebd09e]"
                    >
                      {country}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 3 Export Compliance Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exportPillars.map((pillar) => (
              <div
                key={pillar.num}
                className="surface-panel panel-kinetic rounded-lg p-6 sm:p-7 flex flex-col justify-between gap-5"
              >
                <span className="text-xl font-bold text-[#d4b278] tabular-nums">
                  {pillar.num}
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#f5f2eb] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#c2bbb0] leading-[1.8]">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
