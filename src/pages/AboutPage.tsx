import { useLanguage } from '../context/LanguageContext';
import {
  CERTIFICATES_AND_AWARDS,
  COMPANY_STATS,
  OFFICIAL_CONTACT,
  pickLocale,
} from '../data/pakandishanCatalog';
import { AnimatedStatValue } from '../components/ui/AnimatedStatValue';
import { KineticButton } from '../components/ui/KineticButton';
import { SafeImage } from '../components/ui/SafeImage';

interface AboutPageProps {
  onNavigate: (href: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const { language, formatNumber } = useLanguage();

  return (
    <div className="page-enter">
      {/* Story & Heritage Hero */}
      <section className="section-base pt-32 sm:pt-36 pb-20 sm:pb-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h1 className="heading-enter text-3xl sm:text-4xl font-bold text-[#f5f2eb] leading-[1.25]">
                {language === 'fa'
                  ? 'درباره شرکت ماشین‌سازی پاک‌اندیشان (از سال ۱۳۸۲)'
                  : 'About Pakandishan Machinery Co. (Since 2003)'}
              </h1>
              <p className="subtitle-enter text-[15px] sm:text-base text-[#c2bbb0] leading-[1.9]">
                {language === 'fa'
                  ? `شرکت ماشین‌سازی پاک‌اندیشان (پاک‌اندیشان شهر آذر) در سال ${OFFICIAL_CONTACT.foundedYearFa} به همت ${OFFICIAL_CONTACT.founderFa} با هدف تحول در صنعت نان و مکانیزاسیون استاندارد نانوایی‌های سنتی بنیان‌گذاری شد. امروز این مجموعه به‌عنوان بزرگ‌ترین تولیدکننده ماشین‌آلات پخت نان ایران در کارخانه‌ای به مساحت ${formatNumber(OFFICIAL_CONTACT.factoryAreaSqm)} مترمربع در شهرک صنعتی شماره ۳ ارومیه فعالیت می‌کند.`
                  : `Founded in ${OFFICIAL_CONTACT.foundedYearEn} by ${OFFICIAL_CONTACT.founderEn}, Pakandishan Machinery Co. set out to transform traditional flatbread baking through sanitary, indirect-heat automation. Today, we operate from a ${OFFICIAL_CONTACT.factoryAreaSqm.toLocaleString()} m² manufacturing plant in Urmia Industrial Park No. 3 with over 150 engineers and specialists.`}
              </p>
              <p className="subtitle-enter text-[15px] sm:text-base text-[#c2bbb0] leading-[1.9]">
                {language === 'fa'
                  ? 'واحد تحقیق و توسعه (R&D) پاک‌اندیشان به‌عنوان نخستین واحد تولیدی دارنده پروانه علامت استاندارد ملی و ثبت اختراع پهن‌کن اتوماتیک خمیر در سال ۱۳۹۰، توانسته است خطوط کامل نان لواش، تافتون، بربری، سنگک و ربات شاطر هوشمند را به بیش از ۵٬۰۰۰ نانوایی در داخل و بیش از ۳۰ کشور جهان عرضه کند.'
                  : 'Backed by a dedicated R&D division — the first in Iran to patent and certify an automatic dough sheeter under the National Standard mark (2011) — Pakandishan has delivered Lavash, Taftoon, Barbari, Sangak, and Robotic Shater systems to 5,000+ bakeries across Iran and 30+ countries worldwide.'}
              </p>
              <div className="cta-enter flex flex-wrap gap-3 pt-2">
                <KineticButton
                  variant="primary"
                  size="md"
                  showArrow
                  onClick={() => onNavigate('/products')}
                >
                  {language === 'fa' ? 'مشاهده محصولات کارخانه' : 'Explore Machinery'}
                </KineticButton>
                <KineticButton
                  variant="ghost"
                  size="md"
                  onClick={() => onNavigate('/export')}
                >
                  {language === 'fa' ? 'صادرات به +۳۰ کشور' : '30+ Export Markets'}
                </KineticButton>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="floating-stage bg-transparent aspect-[4/3]">
                <SafeImage
                  src="/assets/pakandishan/products/lavash-rotary-automatic-set.webp"
                  alt={
                    language === 'fa'
                      ? 'خط تولید تمام‌اتوماتیک نان لواش ساخت کارخانه پاک‌اندیشان ارومیه'
                      : 'Pakandishan Urmia flagship automatic rotary lavash production line'
                  }
                  fallbackTitle="Pakandishan"
                  width={800}
                  height={600}
                  className="floating-machine-img w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* 5 Verified Scale Stats with Animated Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 mt-16">
            {COMPANY_STATS.map((stat) => (
              <div
                key={stat.id}
                className="surface-panel panel-kinetic rounded-lg p-5 sm:p-6 flex flex-col justify-between gap-2"
              >
                <AnimatedStatValue
                  rawValue={
                    language === 'fa' || language === 'ar'
                      ? stat.valueFa
                      : stat.valueEn
                  }
                  usePersianDigits={language === 'fa' || language === 'ar'}
                  className="text-2xl sm:text-3xl font-bold text-[#ebd09e] tabular-nums"
                />
                <span className="text-sm text-[#c2bbb0]">
                  {pickLocale(stat.label, language)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & National Honors */}
      <section className="section-alt py-20 sm:py-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="max-w-2xl mb-12">
            <h2 className="text-2xl sm:text-[30px] font-bold text-[#f5f2eb] leading-[1.3] mb-3">
              {language === 'fa'
                ? 'گواهینامه‌های بین‌المللی، ثبت اختراع و افتخارات ملی'
                : 'International Certifications, Patents & National Honors'}
            </h2>
            <p className="text-[15px] sm:text-base text-[#c2bbb0] leading-[1.85]">
              {language === 'fa'
                ? 'تعهد به کیفیت مهندسی، ایمنی بهداشتی و رضایت مشتری که با معتبرترین نهادهای استاندارد داخلی و اروپایی تأیید شده است.'
                : 'Verified quality management, hygienic safety, and engineering innovation audited by domestic and European standards bodies.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CERTIFICATES_AND_AWARDS.map((cert) => (
              <article
                key={cert.id}
                className="surface-panel panel-kinetic rounded-lg p-6 sm:p-8 flex flex-col justify-between gap-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-lg font-bold text-[#ebd09e] tracking-wide"
                    dir="ltr"
                  >
                    {cert.code}
                  </span>
                  <span className="text-sm text-[#c2bbb0]">
                    {pickLocale(cert.year, language)}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#f5f2eb] mb-2">
                    {pickLocale(cert.title, language)}
                  </h3>
                  <p className="text-sm sm:text-[15px] text-[#c2bbb0] leading-[1.8]">
                    {pickLocale(cert.description, language)}
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
