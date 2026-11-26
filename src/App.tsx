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
import { ProductItem } from './data/products';
import { useActiveSection } from './hooks/useActiveSection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { Navbar } from './components/layout/Navbar';
import {
  PersistentVideoBackground,
  PersistentVideoHandle,
} from './components/video/PersistentVideoBackground';
import { VideoHeroSection } from './components/hero/VideoHeroSection';
import { useLanguage } from './context/LanguageContext';

// Lazy-load all below-the-fold sections & modals to keep initial mobile JS minimal
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
const ContactSection = lazy(() =>
  import('./components/sections/Contact').then((m) => ({
    default: m.ContactSection,
  }))
);
const Footer = lazy(() =>
  import('./components/layout/Footer').then((m) => ({ default: m.Footer }))
);
const ProductModal = lazy(() =>
  import('./components/products/ProductModal').then((m) => ({
    default: m.ProductModal,
  }))
);

gsap.registerPlugin(ScrollTrigger);

interface BelowFoldProps {
  onSelectProduct: (product: ProductItem) => void;
  onNavigate: (href: string) => void;
  preselectedMachine: string;
  reducedMotion: boolean;
  onReady: () => void;
}

function BelowFoldContent({
  onSelectProduct,
  onNavigate,
  preselectedMachine,
  reducedMotion,
  onReady,
}: BelowFoldProps) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <>
      {/* 2. Industrial Performance Dashboard */}
      <DashboardSection />

      {/* 3. Technology & Innovation */}
      <TechnologySection />

      {/* 4. Featured Machinery */}
      <ProductShowcase onSelectProduct={onSelectProduct} />

      {/* 5. Product Categories */}
      <CategoryGrid onSelectProduct={onSelectProduct} />

      {/* 6. Company Advantages */}
      <AdvantagesSection />

      {/* 7. Industrial Showcase / Future Vision */}
      <ShowcaseSection onNavigate={onNavigate} reducedMotion={reducedMotion} />

      {/* 8. Call to Action & Validated Consultation Form */}
      <ContactSection preselectedMachine={preselectedMachine} />

      {/* 9. Glassmorphism Footer */}
      <Footer onNavigate={onNavigate} />
    </>
  );
}

export default function App() {
  const { direction, isRTL, language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<PersistentVideoHandle | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [preselectedMachine, setPreselectedMachine] = useState('');
  const [belowFoldReady, setBelowFoldReady] = useState(false);

  const sectionIds = useMemo(
    () => [
      'hero',
      'dashboard',
      'technology',
      'products',
      'categories',
      'advantages',
      'showcase',
      'contact',
    ],
    []
  );
  const rawActiveSection = useActiveSection(sectionIds);

  // Map secondary sections to their closest top-level nav link for clean active state
  const activeNavId = useMemo(() => {
    if (rawActiveSection === 'dashboard') return 'hero';
    if (rawActiveSection === 'categories') return 'products';
    if (rawActiveSection === 'showcase') return 'advantages';
    return rawActiveSection;
  }, [rawActiveSection]);

  // Dynamic Lenis smooth scroll ONLY on desktop fine-pointer devices.
  // Mobile touch devices use native hardware-accelerated compositor scrolling for 60/120fps.
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

  // Safety sync: if user jumps directly past the pinned hero via scrollbar or anchor, guarantee final-frame lock
  useEffect(() => {
    if (reducedMotion) return;

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
  }, [reducedMotion]);

  // Lightweight one-shot scroll reveals once below-the-fold sections mount
  useEffect(() => {
    if (reducedMotion || !appRef.current || !belowFoldReady) return;

    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: isMobile ? 16 : 24,
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.45 : 0.65,
            ease: 'power3.out',
            clearProps: 'transform',
            scrollTrigger: {
              trigger: el,
              start: 'top 90%',
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('.reveal-stagger-grid').forEach((grid) => {
        const cards = grid.querySelectorAll<HTMLElement>('.reveal-card');
        if (!cards.length) return;
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: isMobile ? 14 : 22,
          },
          {
            opacity: 1,
            y: 0,
            duration: isMobile ? 0.42 : 0.58,
            stagger: isMobile ? 0.04 : 0.06,
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
  }, [reducedMotion, belowFoldReady]);

  const handleBelowFoldReady = useCallback(() => {
    setBelowFoldReady(true);
  }, []);

  const handleNavigate = useCallback(
    (href: string) => {
      const targetId = href.replace(/^#/, '');

      if (targetId === 'hero') {
        if (lenisRef.current && !reducedMotion) {
          lenisRef.current.scrollTo(0, {
            duration: 1.6,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        }
        return;
      }

      const el = document.getElementById(targetId);
      if (!el) return;

      const targetTop = Math.max(
        0,
        el.getBoundingClientRect().top + window.scrollY - 76
      );

      if (lenisRef.current && !reducedMotion) {
        lenisRef.current.scrollTo(targetTop, {
          duration: 1.6,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({
          top: targetTop,
          behavior: reducedMotion ? 'auto' : 'smooth',
        });
      }
    },
    [reducedMotion]
  );

  const handleRequestConsultation = useCallback(
    (machineName: string) => {
      setSelectedProduct(null);
      setPreselectedMachine(machineName);
      window.setTimeout(() => {
        handleNavigate('#contact');
      }, 60);
    },
    [handleNavigate]
  );

  return (
    <div ref={appRef} className="relative min-h-screen text-[#f4f0e8]" dir={direction}>
      {/* Persistent Full-Screen Fixed Video Background (z-0, lives from Hero through Footer) */}
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

      <div className="relative z-10">
        <Navbar
          activeSection={activeNavId}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
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

        <main id="main-content">
          {/* 1. Scroll-Controlled Cinematic Video Hero (eager critical path) */}
          <VideoHeroSection
            videoRef={videoRef}
            onNavigate={handleNavigate}
            reducedMotion={reducedMotion}
          />

          {/* 2-9. Below-the-fold sections (lazy-loaded chunks) */}
          <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
            <BelowFoldContent
              onSelectProduct={setSelectedProduct}
              onNavigate={handleNavigate}
              preselectedMachine={preselectedMachine}
              reducedMotion={reducedMotion}
              onReady={handleBelowFoldReady}
            />
          </Suspense>
        </main>
      </div>

      {/* Product Detail Modal (loaded only when user opens a product) */}
      {selectedProduct && (
        <Suspense fallback={null}>
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onRequestConsultation={handleRequestConsultation}
          />
        </Suspense>
      )}
    </div>
  );
}
