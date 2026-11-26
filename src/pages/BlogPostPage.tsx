import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  BLOG_ARTICLES,
  getBlogBySlug,
  pickList,
  pickLocale,
} from '../data/pakandishanCatalog';
import { KineticButton } from '../components/ui/KineticButton';
import { SafeImage } from '../components/ui/SafeImage';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (href: string) => void;
}

export function BlogPostPage({ slug, onNavigate }: BlogPostPageProps) {
  const { language, formatNumber } = useLanguage();
  const article = getBlogBySlug(slug);

  if (!article) {
    return (
      <section className="page-enter section-base pt-36 pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start space-y-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#f5f2eb]">
            {language === 'fa' ? 'مقاله مورد نظر یافت نشد' : 'Article Not Found'}
          </h1>
          <button
            type="button"
            onClick={() => onNavigate('/blog')}
            className="h-12 px-6 rounded-md bg-[#d4b278] text-[#090908] text-sm font-semibold hover:bg-[#ebd09e] transition-colors cursor-pointer"
          >
            {language === 'fa' ? 'بازگشت به لیست مقالات' : 'Back to Blog'}
          </button>
        </div>
      </section>
    );
  }

  const title = pickLocale(article.title, language);
  const excerpt = pickLocale(article.excerpt, language);
  const category = pickLocale(article.category, language);
  const paragraphs = pickList(article.paragraphs, language);
  const otherArticles = BLOG_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <div className="page-enter">
      {/* Main Editorial Reader */}
      <article className="section-base pt-32 sm:pt-36 pb-20 sm:pb-28">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <div className="max-w-[780px]">
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#d4b278] hover:text-[#ebd09e] transition-colors mb-8"
            >
              <ArrowRight
                className="w-4 h-4 rtl:rotate-0 ltr:rotate-180"
                aria-hidden="true"
              />
              <span>{language === 'fa' ? 'بازگشت به بلاگ پاک‌اندیشان' : 'Back to Blog'}</span>
            </a>

            <div className="flex flex-wrap items-center gap-4 text-sm text-[#c2bbb0] mb-4">
              <span className="font-semibold text-[#d4b278]">{category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{article.date}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {language === 'fa'
                  ? `زمان مطالعه: ${formatNumber(article.readTimeMin)} دقیقه`
                  : `${article.readTimeMin} min read`}
              </span>
            </div>

            <h1 className="heading-enter text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f5f2eb] leading-[1.3] mb-6">
              {title}
            </h1>

            <p className="subtitle-enter text-base sm:text-lg text-[#ebd09e] leading-[1.85] mb-8">
              {excerpt}
            </p>

            <div className="rounded-lg overflow-hidden border border-white/10 bg-[#0c0b0a] aspect-[16/9] mb-10">
              <SafeImage
                src={article.image}
                alt={title}
                fallbackTitle={title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6 text-[15px] sm:text-base text-[#f5f2eb]/90 leading-[2]">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Article Footer Consultation CTA */}
            <div className="surface-panel rounded-lg p-6 sm:p-8 mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-lg font-semibold text-[#f5f2eb] mb-1.5">
                  {language === 'fa'
                    ? 'برای انتخاب دستگاه مناسب نانوایی خود راهنمایی می‌خواهید؟'
                    : 'Need engineering advice on selecting the right bakery line?'}
                </h2>
                <p className="text-sm text-[#c2bbb0]">
                  {language === 'fa'
                    ? 'با کارشناسان فروش پاک‌اندیشان برای مشاوره رایگان و طراحی چیدمان فضا صحبت کنید.'
                    : 'Speak with Pakandishan engineers for free floor-plan and capacity guidance.'}
                </p>
              </div>
              <KineticButton
                variant="primary"
                size="md"
                showArrow
                onClick={() => onNavigate('/contact')}
                className="shrink-0"
              >
                {language === 'fa' ? 'درخواست مشاوره رایگان' : 'Request Free Consultation'}
              </KineticButton>
            </div>
          </div>
        </div>
      </article>

      {/* More Articles */}
      <section className="section-alt py-20">
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10 text-start">
          <h2 className="text-2xl font-bold text-[#f5f2eb] mb-10">
            {language === 'fa' ? 'سایر مقالات تخصصی' : 'More Engineering Articles'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {otherArticles.map((item) => {
              const itemTitle = pickLocale(item.title, language);
              const itemHref = `/blog/${item.slug}`;
              return (
                <article
                  key={item.slug}
                  onClick={() => onNavigate(itemHref)}
                  className="group surface-panel panel-kinetic rounded-lg overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-[#0c0b0a]">
                    <SafeImage
                      src={item.image}
                      alt={itemTitle}
                      fallbackTitle={itemTitle}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <h3 className="text-base font-semibold text-[#f5f2eb] leading-snug group-hover:text-[#ebd09e] transition-colors">
                      {itemTitle}
                    </h3>
                    <span className="link-kinetic text-sm font-semibold text-[#d4b278] group-hover:text-[#f5f2eb] transition-colors self-start py-1">
                      <span>{language === 'fa' ? 'مطالعه مقاله' : 'Read Article'}</span>
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
