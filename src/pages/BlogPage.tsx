import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_ARTICLES, pickLocale } from '../data/pakandishanCatalog';
import { SafeImage } from '../components/ui/SafeImage';

interface BlogPageProps {
  onNavigate: (href: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const { language, formatNumber } = useLanguage();

  return (
    <div className="page-enter">
      {/* Header Band */}
      <section className="section-base pt-32 sm:pt-36 pb-14">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="max-w-2xl">
            <h1 className="heading-enter text-3xl sm:text-4xl font-bold text-[#f5f2eb] leading-[1.25] mb-4">
              {language === 'fa'
                ? 'مجله تخصصی و بلاگ فنی پاک‌اندیشان'
                : 'Pakandishan Bakery Engineering Blog'}
            </h1>
            <p className="subtitle-enter text-[15px] sm:text-base text-[#c2bbb0] leading-[1.85]">
              {language === 'fa'
                ? 'مقالات کاربردی درباره عیب‌یابی پخت نان، کاهش ضایعات، راهنمای راه‌اندازی نانوایی مدرن و شناخت ماشین‌آلات استاندارد.'
                : 'Technical articles covering bread baking troubleshooting, reducing dough waste, launching a modern bakery, and equipment selection.'}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-alt py-16 sm:py-24">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_ARTICLES.map((article) => {
              const title = pickLocale(article.title, language);
              const excerpt = pickLocale(article.excerpt, language);
              const cat = pickLocale(article.category, language);
              const href = `/blog/${article.slug}`;

              return (
                <article
                  key={article.slug}
                  onClick={() => onNavigate(href)}
                  className="group rounded-lg surface-panel panel-kinetic overflow-hidden flex flex-col justify-between cursor-pointer text-start"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#0c0b0a]">
                    <SafeImage
                      src={article.image}
                      alt={title}
                      fallbackTitle={title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex items-center justify-between gap-3 text-sm mb-2.5">
                        <span className="font-medium text-[#d4b278]">{cat}</span>
                        <span className="text-[#c2bbb0] tabular-nums">
                          {language === 'fa'
                            ? `${formatNumber(article.readTimeMin)} دقیقه`
                            : `${article.readTimeMin} min read`}
                        </span>
                      </div>
                      <h2 className="text-lg font-semibold text-[#f5f2eb] mb-3 leading-snug group-hover:text-[#ebd09e] transition-colors">
                        {title}
                      </h2>
                      <p className="text-sm text-[#c2bbb0] leading-[1.8]">
                        {excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/8 flex items-center justify-between text-sm">
                      <a
                        href={href}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onNavigate(href);
                        }}
                        className="link-kinetic font-semibold text-[#d4b278] group-hover:text-[#f5f2eb] transition-colors py-1"
                      >
                        <span>
                          {language === 'fa' ? 'مطالعه کامل مقاله' : 'Read Article'}
                        </span>
                        <span className="kinetic-arrow-box" aria-hidden="true">
                          <ArrowLeft className="kinetic-arrow kinetic-arrow--main rtl:rotate-0 ltr:rotate-180" />
                          <ArrowLeft className="kinetic-arrow kinetic-arrow--trail rtl:rotate-0 ltr:rotate-180" />
                        </span>
                      </a>
                      <span className="text-[#c2bbb0] tabular-nums">
                        {article.date}
                      </span>
                    </div>
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
