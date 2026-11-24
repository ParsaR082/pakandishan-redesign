import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ProductItem } from './data/products';
import { useActiveSection } from './hooks/useActiveSection';
import { useReducedMotion } from './hooks/useReducedMotion';
import { Navbar } from './components/layout/Navbar';
import { MobileMenu } from './components/layout/MobileMenu';
import { Footer } from './components/layout/Footer';
import {
  PersistentVideoBackground,
  PersistentVideoHandle,
} from './components/video/PersistentVideoBackground';
import { VideoHeroSection } from './components/hero/VideoHeroSection';
import { DashboardSection } from './components/dashboard/DashboardSection';
import { TechnologySection } from './components/sections/Technology';
import { ProductShowcase } from './components/products/ProductShowcase';
import { CategoryGrid } from './components/products/CategoryGrid';
import { AdvantagesSection } from './components/sections/Advantages';
import { ShowcaseSection } from './components/sections/Showcase';
import { ContactSection } from './components/sections/Contact';
import { ProductModal } from './components/products/ProductModal';
import { useLanguage } from './context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const { direction, isRTL, language } = useLanguage();
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<PersistentVideoHandle | null>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [preselectedMachine, setPreselectedMachine] = useState('');

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

  // Lenis smooth scroll synchronized with GSAP ScrollTrigger
  useEffect(() => {
    if (reducedMotion) {
      lenisRef.current = null;
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
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

  // Global scroll-reveal choreography with cinematic entrance and exit
  useEffect(() => {
    if (reducedMotion || !appRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 28,
            scale: 0.985,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
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
            y: 26,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.07,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: grid,
              start: 'top 86%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, appRef);

    // Refresh ScrollTrigger layout once hero pin-spacer and downstream triggers are mounted
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [reducedMotion]);

  const handleNavigate = useCallback(
    (href: string) => {
      const targetId = href.replace(/^#/, '');

      if (targetId === 'hero') {
        if (lenisRef.current && !reducedMotion) {
          lenisRef.current.scrollTo(0, {
            duration: 1.85,
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
          duration: 1.85,
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
        {language === 'en' ? 'Skip to main content' : 'پرش به محتوای اصلی'}
      </a>

      <div className="relative z-10">
        <Navbar
          activeSection={activeNavId}
          onNavigate={handleNavigate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          mobileMenuOpen={mobileMenuOpen}
        />

        <MobileMenu
          isOpen={mobileMenuOpen}
          activeSection={activeNavId}
          onClose={() => setMobileMenuOpen(false)}
          onNavigate={handleNavigate}
          reducedMotion={reducedMotion}
        />

        <main id="main-content">
          {/* 1. Scroll-Controlled Cinematic Video Hero */}
          <VideoHeroSection
            videoRef={videoRef}
            onNavigate={handleNavigate}
            reducedMotion={reducedMotion}
          />

          {/* 2. Industrial Performance Dashboard (Glassmorphism over frozen final frame) */}
          <DashboardSection />

          {/* 3. Technology & Innovation */}
          <TechnologySection />

          {/* 4. Featured Machinery */}
          <ProductShowcase onSelectProduct={setSelectedProduct} />

          {/* 5. Product Categories */}
          <CategoryGrid onSelectProduct={setSelectedProduct} />

          {/* 6. Company Advantages */}
          <AdvantagesSection />

          {/* 7. Industrial Showcase / Future Vision */}
          <ShowcaseSection onNavigate={handleNavigate} reducedMotion={reducedMotion} />

          {/* 8. Call to Action & Validated Consultation Form */}
          <ContactSection preselectedMachine={preselectedMachine} />
        </main>

        {/* 9. Glassmorphism Footer over Persistent Video */}
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestConsultation={handleRequestConsultation}
      />
    </div>
  );
}
