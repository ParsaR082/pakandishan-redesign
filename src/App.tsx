import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type Lenis from 'lenis';
import { useReducedMotion } from './hooks/useReducedMotion';
import { Navbar } from './components/layout/Navbar';
import {
  PersistentVideoBackground,
  PersistentVideoHandle,
} from './components/video/PersistentVideoBackground';
import { VideoHeroSection } from './components/hero/VideoHeroSection';
import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { useLanguage } from './context/LanguageContext';
import { useRouter } from './context/RouterContext';
import { getBlogBySlug, getProductBySlug, pickLocale } from './data/pakandishanCatalog';

// Lazy-load below-the-fold home sections & mobile menu
const MobileMenu = lazy(() =>
  import('./components/layout/MobileMenu').then((m) => ({ default: m.MobileMenu }))
);
const DashboardSection = lazy(() =>
  import('./components/dashboard/DashboardSection').then((m) => ({
    default: m.DashboardSection,
  }))
);
const TechnologySection = lazy(() =>
  import('./components/sections/Technology').then((m) => ({
    default: m.TechnologySection,
  }))
);
const ProductShowcase = lazy(() =>
  import('./components/products/ProductShowcase').then((m) => ({
    default: m.ProductShowcase,
  }))
);
const CategoryGrid = lazy(() =>
  import('./components/products/CategoryGrid').then((m) => ({
    default: m.CategoryGrid,
  }))
);
const AdvantagesSection = lazy(() =>
  import('./components/sections/Advantages').then((m) => ({
    default: m.AdvantagesSection,
  }))
);
const ShowcaseSection = lazy(() =>
  import('./components/sections/Showcase').then((m) => ({
    default: m.ShowcaseSection,
  }))
);
const LatestBlogPreview = lazy(() =>
  import('./components/sections/LatestBlogPreview').then((m) => ({
    default: m.LatestBlogPreview,
  }))
);
const ContactSection = lazy(() =>
  import('./components/sections/Contact').then((m) => ({
    default: m.ContactSection,
  }))
);
const Footer = lazy(() =>
  import('./components/layout/Footer').then((m) => ({ default: m.Footer }))
);

// Lazy-load dedicated multi-page routes
const ProductsPage = lazy(() =>
  import('./pages/ProductsPage').then((m) => ({ default: m.ProductsPage }))
);
const ProductDetailPage = lazy(() =>
  import('./pages/ProductDetailPage').then((m) => ({
    default: m.ProductDetailPage,
  }))
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);
const ExportPage = lazy(() =>
  import('./pages/ExportPage').then((m) => ({ default: m.ExportPage }))
);
const ServicesPage = lazy(() =>
  import('./pages/ServicesPage').then((m) => ({ default: m.ServicesPage }))
);
const BlogPage = lazy(() =>
  import('./pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);
const BlogPostPage = lazy(() =>
  import('./pages/BlogPostPage').then((m) => ({ default: m.BlogPostPage }))
);
const ContactPage = lazy(() =>
  import('./pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

gsap.registerPlugin(ScrollTrigger);

interface HomeBelowFoldProps {
  onNavigate: (href: string) => void;
  reducedMotion: boolean;
  onReady: () => void;
}

function HomeBelowFoldContent({
  onNavigate,
  reducedMotion,
  onReady,
}: HomeBelowFoldProps) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <>
      <DashboardSection />
      <TechnologySection onNavigate={onNavigate} />
      <ProductShowcase onNavigate={onNavigate} />
      <CategoryGrid onNavigate={onNavigate} />
      <AdvantagesSection onNavigate={onNavigate} />
      <ShowcaseSection onNavigate={onNavigate} reducedMotion={reducedMotion} />
      <LatestBlogPreview onNavigate={onNavigate} />
      <ContactSection onNavigate={onNavigate} />
    </>
  );
}

export default function App() {
  const { direction, isRTL, language, t } = useLanguage();
  const { pathname, navigate } = useRouter();
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<PersistentVideoHandle | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  const isHome = pathname === '/';

  // Compute active nav tab ID directly from route pathname
  const activeNavId = useMemo(() => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/products')) return 'products';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/export')) return 'export';
    if (pathname.startsWith('/services')) return 'services';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/contact')) return 'contact';
    return 'home';
  }, [pathname]);

  // Keep document title synchronized with active route & language
  useEffect(() => {
    const brand = t.common.brandName;
    if (pathname === '/') {
      document.title = `${brand} | ${t.common.brandTagline}`;
    } else if (pathname === '/products') {
      document.title =
        language === 'fa' ? `محصولات و خطوط پخت | ${brand}` : `Machinery Catalog | ${brand}`;
    } else if (pathname.startsWith('/products/')) {
      const slug = pathname.replace('/products/', '');
      const prod = getProductBySlug(slug);
      document.title = prod ? `${pickLocale(prod.name, language)} | ${brand}` : `${brand}`;
    } else if (pathname === '/about') {
      document.title =
        language === 'fa' ? `درباره کارخانه پاک‌اندیشان | ${brand}` : `About Us | ${brand}`;
    } else if (pathname === '/export') {
      document.title =
        language === 'fa' ? `صادرات به +۳۰ کشور | ${brand}` : `Global Exports | ${brand}`;
    } else if (pathname === '/services') {
      document.title =
        language === 'fa' ? `خدمات پس از فروش و گارانتی | ${brand}` : `After-Sales Services | ${brand}`;
    } else if (pathname === '/blog') {
      document.title =
        language === 'fa' ? `بلاگ و مقالات تخصصی | ${brand}` : `Blog | ${brand}`;
    } else if (pathname.startsWith('/blog/')) {
      const slug = pathname.replace('/blog/', '');
      const post = getBlogBySlug(slug);
      document.title = post ? `${pickLocale(post.title, language)} | ${brand}` : `${brand}`;
    } else if (pathname === '/contact') {
      document.title =
        language === 'fa' ? `دفاتر فروش و تماس با ما | ${brand}` : `Contact & Offices | ${brand}`;
    }
  }, [pathname, language, t]);

  // Dynamic Lenis smooth scroll ONLY on desktop fine-pointer devices
  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') {
      lenisRef.current = null;
      return;
    }

    const isFineDesktop =
      window.innerWidth >= 1024 &&
      window.matchMedia('(pointer: fine)').matches;

    if (!isFineDesktop) {
      lenisRef.current = null;
      return;
    }

    let cancelled = false;
    let onTick: ((time: number) => void) | null = null;

    import('lenis').then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);
      onTick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(onTick);
      gsap.ticker.lagSmoothing(0);
    });

    return () => {
      cancelled = true;
      if (onTick) gsap.ticker.remove(onTick);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  // Lock persistent video background to dimmed final frame on all sub-pages
  useEffect(() => {
    if (!isHome) {
      videoRef.current?.setProgress(1, true);
      videoRef.current?.setPostHeroMode(true);
      // Re-assert briefly after frame loader finishes on direct sub-page land
      const timer = window.setTimeout(() => {
        videoRef.current?.setProgress(1, true);
        videoRef.current?.setPostHeroMode(true);
      }, 350);
      return () => window.clearTimeout(timer);
    }
  }, [isHome]);

  // Safety sync on Home (desktop GSAP ScrollTrigger only; mobile uses native sticky scroll handler directly)
  useEffect(() => {
    if (!isHome || reducedMotion || typeof window === 'undefined') return;
    if (window.innerWidth < 768) return;

    let lockTicking = false;
    let rafId = 0;

    const checkLock = () => {
      lockTicking = false;
      const heroTrigger = ScrollTrigger.getById('hero-video-scrub');
      if (!heroTrigger) return;
      if (window.scrollY >= heroTrigger.end - 2) {
        videoRef.current?.setProgress(1, true);
        videoRef.current?.setPostHeroMode(true);
      }
    };

    const enforcePostHeroLock = () => {
      if (!lockTicking) {
        lockTicking = true;
        rafId = requestAnimationFrame(checkLock);
      }
    };

    window.addEventListener('scroll', enforcePostHeroLock, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', enforcePostHeroLock);
    };
  }, [isHome, reducedMotion]);

  // Choreographed one-shot scroll reveals on Home (Lead masked heading -> Support copy -> Organic wave grid)
  useEffect(() => {
    if (!isHome || reducedMotion || !appRef.current || !belowFoldReady) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
        const leadHeading = el.querySelector<HTMLElement>('h2, h1');
        if (leadHeading && !isMobile) {
          gsap.fromTo(
            leadHeading,
            {
              opacity: 0,
              y: 24,
              clipPath: 'inset(0 0 100% 0)',
            },
            {
              opacity: 1,
              y: 0,
              clipPath: 'inset(0 0 0% 0)',
              duration: 0.68,
              ease: 'power4.out',
              clearProps: 'transform,clipPath',
              scrollTrigger: {
                trigger: el,
                start: 'top 89%',
                once: true,
              },
            }
          );
          gsap.fromTo(
            el,
            { opacity: 0.01, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.56,
              delay: 0.06,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 89%',
                once: true,
              },
            }
          );
        } else {
          gsap.fromTo(
            el,
            { opacity: 0, y: isMobile ? 16 : 22 },
            {
              opacity: 1,
              y: 0,
              duration: isMobile ? 0.45 : 0.6,
              ease: 'power3.out',
              clearProps: 'transform',
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                once: true,
              },
            }
          );
        }
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger-grid').forEach((grid) => {
        const cards = grid.querySelectorAll<HTMLElement>('.reveal-card');
        if (!cards.length) return;
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: isMobile ? 16 : 24,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: isMobile ? 0.46 : 0.62,
            // Non-uniform organic wave stagger (gaps shrink naturally instead of metronome)
            stagger: {
              amount: isMobile ? 0.16 : 0.24,
              ease: 'power2.out',
            },
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: grid,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });
    }, appRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [isHome, reducedMotion, belowFoldReady]);

  const handleBelowFoldReady = useCallback(() => {
    setBelowFoldReady(true);
  }, []);

  const handleNavigate = useCallback(
    (href: string) => {
      // Route path navigation (starts with '/')
      if (href.startsWith('/')) {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true });
        }
        navigate(href);
        return;
      }

      // Hash anchor scroll navigation on Home
      const targetId = href.replace(/^#/, '');
      if (targetId === 'hero') {
        if (!isHome) {
          navigate('/');
          return;
        }
        if (lenisRef.current && !reducedMotion) {
          lenisRef.current.scrollTo(0, {
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        }
        return;
      }

      const el = document.getElementById(targetId);
      if (!el) {
        navigate('/');
        return;
      }

      const targetTop = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - 76
      );

      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(targetTop, {
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: targetTop,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [isHome, navigate, reducedMotion]
  );

  // Route view resolver
  const renderPageContent = () => {
    if (pathname === '/products') {
      return <ProductsPage onNavigate={handleNavigate} />;
    }
    if (pathname.startsWith('/products/')) {
      const slug = decodeURIComponent(pathname.slice('/products/'.length));
      return <ProductDetailPage slug={slug} onNavigate={handleNavigate} />;
    }
    if (pathname === '/about') {
      return <AboutPage onNavigate={handleNavigate} />;
    }
    if (pathname === '/export') {
      return <ExportPage onNavigate={handleNavigate} />;
    }
    if (pathname === '/services') {
      return <ServicesPage onNavigate={handleNavigate} />;
    }
    if (pathname === '/blog') {
      return <BlogPage onNavigate={handleNavigate} />;
    }
    if (pathname.startsWith('/blog/')) {
      const slug = decodeURIComponent(pathname.slice('/blog/'.length));
      return <BlogPostPage slug={slug} onNavigate={handleNavigate} />;
    }
    if (pathname === '/contact') {
      return <ContactPage />;
    }

    // Default: Home page with untouched GSAP 3D scroll video hero + authentic Pakandishan sections
    return (
      <>
        <VideoHeroSection
          videoRef={videoRef}
          onNavigate={handleNavigate}
          reducedMotion={reducedMotion}
        />
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <HomeBelowFoldContent
            onNavigate={handleNavigate}
            reducedMotion={reducedMotion}
            onReady={handleBelowFoldReady}
          />
        </Suspense>
      </>
    );
  };

  return (
    <div ref={appRef} className="relative min-h-screen text-[#f4f0e8]" dir={direction}>
      <ScrollProgressBar />
      {/* Persistent Full-Screen Fixed Video Background (lives from Hero through Footer and across sub-pages) */}
      <PersistentVideoBackground ref={videoRef} reducedMotion={reducedMotion} />

      <a
        href="#main-content"
        className={`sr-only focus:not-sr-only focus:fixed focus:top-4 ${isRTL ? 'focus:right-4' : 'focus:left-4'} focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#c5a46d] focus:text-[#090909] focus:rounded-md focus:font-semibold`}
      >
        {language === 'en'
          ? 'Skip to main content'
          : language === 'ar'
          ? 'الانتقال إلى المحتوى الرئيسي'
          : language === 'tr'
          ? 'Ana içeriğe geç'
          : language === 'ru'
          ? 'Перейти к основному содержимому'
          : 'پرش به محتوای اصلی'}
      </a>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          activeSection={activeNavId}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
          forceVisible={!isHome}
        />

        {mobileMenuOpen && (
          <Suspense fallback={null}>
            <MobileMenu
              isOpen={mobileMenuOpen}
              activeSection={activeNavId}
              onClose={() => setMobileMenuOpen(false)}
              onNavigate={handleNavigate}
              reducedMotion={reducedMotion}
            />
          </Suspense>
        )}

        <main id="main-content" className="flex-1">
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            {renderPageContent()}
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer onNavigate={handleNavigate} />
        </Suspense>
      </div>
    </div>
  );
}
