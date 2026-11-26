import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { BLOG_ARTICLES, pickLocale } from '../../data/pakandishanCatalog';
import { KineticButton } from '../ui/KineticButton';
import { SafeImage } from '../ui/SafeImage';

interface LatestBlogPreviewProps {
  onNavigate: (href: string) => void;
}

export function LatestBlogPreview({ onNavigate }: LatestBlogPreviewProps) {
  const { language, formatNumber } = useLanguage();
  const latest = BLOG_ARTICLES.slice(0, 3);

  return (
    <section
      id="blog-preview"
      aria-labelledby="blog-preview-heading"
      className="relative scroll-mt-24 py-28 sm:py-32 lg:py-40 section-alt"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 lg:mb-16 reveal-section text-start">
          <div className="max-w-2xl">
            <h2
              id="blog-preview-heading"
              className="text-2xl sm:text-[28px] lg:text-[32px] font-bold text-[#f5f2eb] leading-[1.3]"
            >
              {language === 'fa'
                ? 'مقالات تخصصی و راهنمای خرید ماشین‌آلات نانوایی'
                : 'Bakery Engineering Guides & Industry Articles'}
            </h2>
            <p className="text-[15px] sm:text-base text-[#c2bbb0] mt-3 leading-[1.85] max-w-[56ch]">
              {language === 'fa'
                ? 'مطالب کاربردی کارشناسان پاک‌اندیشان درباره انتخاب خط پخت، کاهش ضایعات و مکانیزاسیون نان سنتی.'
                : 'Practical insights from Pakandishan engineers on selecting ovens, reducing dough waste, and automating traditional bakeries.'}
            </p>
          </div>

          <KineticButton
            variant="ghost"
            size="md"
            showArrow
            onClick={() => onNavigate('/blog')}
            className="self-start md:self-end"
          >
            {language === 'fa' ? 'مشاهده همه مقالات' : 'View All Articles'}
          </KineticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger-grid">
          {latest.map((article) => {
            const title = pickLocale(article.title, language);
            const excerpt = pickLocale(article.excerpt, language);
            const cat = pickLocale(article.category, language);
            const href = `/blog/${article.slug}`;

            return (
              <article
                key={article.slug}
                onClick={() => onNavigate(href)}
                className="reveal-card group rounded-lg surface-panel panel-kinetic overflow-hidden flex flex-col justify-between cursor-pointer text-start"
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
                    <h3 className="text-lg font-semibold text-[#f5f2eb] mb-2.5 leading-snug group-hover:text-[#ebd09e] transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-[#c2bbb0] leading-[1.8] line-clamp-3">
                      {excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/8">
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
                        {language === 'fa' ? 'مطالعه مقاله' : 'Read Article'}
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
      </div>
    </section>
  );
}
