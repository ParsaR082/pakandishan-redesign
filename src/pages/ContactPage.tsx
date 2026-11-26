import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../context/RouterContext';
import { COMPANY_OFFICES, pickLocale } from '../data/pakandishanCatalog';
import { ContactSection } from '../components/sections/Contact';

export function ContactPage() {
  const { language } = useLanguage();
  const { query } = useRouter();
  const preselectedMachine = query.get('machine') ?? '';

  return (
    <div className="page-enter">
      {/* Official Offices Band: Urmia HQ, Tehran Office, Tabriz Office */}
      <section className="section-alt pt-32 sm:pt-36 pb-16 sm:pb-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="max-w-2xl mb-12">
            <h1 className="heading-enter text-3xl sm:text-4xl font-bold text-[#f5f2eb] leading-[1.25] mb-4">
              {language === 'fa'
                ? 'کارخانه مرکزی، دفاتر فروش و ارتباط با پاک‌اندیشان'
                : 'Factory Headquarters, Regional Sales Offices & Contact'}
            </h1>
            <p className="subtitle-enter text-[15px] sm:text-base text-[#c2bbb0] leading-[1.85]">
              {language === 'fa'
                ? 'پاسخگویی مستقیم از کارخانه ۱۳٬۰۰۰ متری ارومیه، دفاتر رسمی فروش در تهران و تبریز، و شبکه نمایندگی‌های فعال در سراسر ایران.'
                : 'Direct engineering sales from our 13,000 m² Urmia manufacturing plant, Tehran & Tabriz offices, and authorized nationwide agents.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COMPANY_OFFICES.map((office) => (
              <article
                key={office.id}
                className="surface-panel panel-kinetic rounded-lg p-6 sm:p-7 flex flex-col justify-between gap-5"
              >
                <div className="space-y-2.5">
                  <p className="text-sm font-semibold text-[#d4b278]">
                    {pickLocale(office.role, language)}
                  </p>
                  <h2 className="text-lg font-bold text-[#f5f2eb]">
                    {pickLocale(office.city, language)}
                  </h2>
                  <p className="text-sm text-[#c2bbb0] leading-[1.85]">
                    {pickLocale(office.address, language)}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="text-[#c2bbb0]">
                    {pickLocale(office.extension, language)}
                  </span>
                  <a
                    href={`tel:${office.phone}`}
                    dir="ltr"
                    className="font-semibold text-[#ebd09e] hover:text-[#f5f2eb] transition-colors tabular-nums"
                  >
                    {language === 'fa' ? '۰۹۹۶۰۷۸۶۶۱۷' : '+98 996 078 6617'}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Validated Consultation Form Band */}
      <ContactSection
        preselectedMachine={preselectedMachine}
        compactTopPadding
      />
    </div>
  );
}
