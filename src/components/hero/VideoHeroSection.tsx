import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { KineticButton } from '../ui/KineticButton';
import {
  VIDEO_SCROLL_CONFIG,
  clamp01,
  computeHeroTimelinePhases,
  getHeroScrollDistance,
} from '../../lib/videoScroll';
import { PersistentVideoHandle } from '../video/PersistentVideoBackground';

gsap.registerPlugin(ScrollTrigger);

interface VideoHeroSectionProps {
  videoRef: RefObject<PersistentVideoHandle | null>;
  onNavigate: (href: string) => void;
  reducedMotion: boolean;
}

export function VideoHeroSection({
  videoRef,
  onNavigate,
  reducedMotion,
}: VideoHeroSectionProps) {
  const { t } = useLanguage();
  const triggerRef = useRef<HTMLElement>(null);
  const introCueRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const settledCueRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [hasDismissedCue, setHasDismissedCue] = useState(false);
  const hasDismissedCueRef = useRef(false);

  // Track crossing the 768px breakpoint cleanly without reacting to mobile URL-bar height changes
  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileViewport((prev) => (prev !== mobile ? mobile : prev));
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const applyPhaseVisuals = (progress: number) => {
    const phase = computeHeroTimelinePhases(progress);

    if (introCueRef.current) {
      if (hasDismissedCueRef.current) {
        introCueRef.current.style.opacity = '0';
        introCueRef.current.style.pointerEvents = 'none';
      } else {
        introCueRef.current.style.opacity = String(phase.introCueOpacity);
        introCueRef.current.style.pointerEvents =
          phase.introCueOpacity > 0.25 ? 'auto' : 'none';
      }
    }

    if (headlineRef.current) {
      headlineRef.current.style.opacity = String(phase.headlineOpacity);
      headlineRef.current.style.transform = `translate3d(0, ${phase.headlineTranslateY.toFixed(1)}px, 0)`;
    }

    if (detailsRef.current) {
      detailsRef.current.style.opacity = String(phase.detailsOpacity);
      detailsRef.current.style.transform = `translate3d(0, ${phase.detailsTranslateY.toFixed(1)}px, 0)`;
      detailsRef.current.style.pointerEvents =
        phase.detailsOpacity > 0.3 ? 'auto' : 'none';
    }

    if (settledCueRef.current) {
      settledCueRef.current.style.opacity = phase.isSettled ? '1' : '0';
      settledCueRef.current.style.pointerEvents = phase.isSettled
        ? 'auto'
        : 'none';
    }

    if (progressFillRef.current) {
      progressFillRef.current.style.transform = `scaleX(${Math.max(0.02, progress)})`;
    }
  };

  useLayoutEffect(() => {
    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    if (reducedMotion) {
      applyPhaseVisuals(1);
      videoRef.current?.setProgress(1, true);
      videoRef.current?.setPostHeroMode(true);
      return;
    }

    // Initialize exact start-frame visuals
    applyPhaseVisuals(0);
    videoRef.current?.setProgress(0, true);
    videoRef.current?.setPostHeroMode(false);

    // MOBILE FAST PATH: Native CSS `position: sticky` + single passive rAF scroll reader
    // Zero GSAP pin thrashing, zero URL-bar resize ScrollTrigger.refresh stalls, 60/120fps touch scroll!
    if (isMobileViewport) {
      const scrollDist = VIDEO_SCROLL_CONFIG.mobileDistancePx;
      let rafId = 0;
      let lastP = -1;

      const syncMobileScroll = () => {
        rafId = 0;
        const p = clamp01(window.scrollY / scrollDist);
        if (Math.abs(p - lastP) < 0.0005) return;
        lastP = p;

        if (p > 0.015 && !hasDismissedCueRef.current) {
          hasDismissedCueRef.current = true;
          setHasDismissedCue(true);
        }

        videoRef.current?.setProgress(p, true);
        applyPhaseVisuals(p);
        videoRef.current?.setPostHeroMode(p >= 0.985);
      };

      const onScroll = () => {
        if (!rafId) {
          rafId = requestAnimationFrame(syncMobileScroll);
        }
      };

      syncMobileScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => {
        if (rafId) cancelAnimationFrame(rafId);
        window.removeEventListener('scroll', onScroll);
      };
    }

    // DESKTOP PATH: Full GSAP ScrollTrigger pinned cinematic scrub (unchanged)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'hero-video-scrub',
        trigger: triggerEl,
        start: 'top top',
        end: () => `+=${getHeroScrollDistance(window.innerWidth)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          if (p > 0.015 && !hasDismissedCueRef.current) {
            hasDismissedCueRef.current = true;
            setHasDismissedCue(true);
          }
          videoRef.current?.setProgress(p, false);
          applyPhaseVisuals(p);
          videoRef.current?.setPostHeroMode(p >= 0.985);
        },
        onLeave: () => {
          videoRef.current?.setProgress(1, true);
          applyPhaseVisuals(1);
          videoRef.current?.setPostHeroMode(true);
        },
        onEnterBack: () => {
          videoRef.current?.setPostHeroMode(false);
        },
      });
    }, triggerRef);

    return () => {
      ctx.revert();
    };
  }, [reducedMotion, videoRef, isMobileViewport]);

  const stageContent = (
    <div
      className={`${
        isMobileViewport
          ? 'sticky top-0 h-[100svh] min-h-[560px]'
          : 'relative h-[100svh] min-h-[600px]'
      } w-full overflow-hidden flex flex-col justify-between pt-[80px] md:pt-[96px] pb-7`}
    >
      {/* Subtle reading scrim on desktop (never dims the left-settled rotary oven) */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute inset-0 bg-[linear-gradient(270deg,rgba(6,6,6,0.72)_0%,rgba(6,6,6,0.34)_38%,rgba(6,6,6,0)_56%)]"
      />

      {/* Main Content Stage — Lightweight text-shadow (zero GPU filter:drop-shadow passes on mobile) */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8 flex-1 flex items-start lg:items-center pt-2 sm:pt-5 lg:pt-0 pb-4 lg:pb-0 pointer-events-none rtl:justify-start ltr:justify-end">
        <div className="w-full lg:w-[46%] xl:w-[44%] bg-transparent border-0 p-0 rtl:text-right ltr:text-left">
          {/* Phase 1 (25% -> 62%): Brand Kicker + Main Headline + Supporting Headline */}
          <div
            ref={headlineRef}
            className="will-change-[transform,opacity]"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            <p className="text-xs sm:text-[13px] font-medium text-[#c5a46d] tracking-wide mb-1.5 sm:mb-3 hero-text-shadow-sm">
              {t.hero.kicker}
            </p>

            <h1 className="text-[clamp(1.75rem,3.8vw,3.5rem)] font-bold text-[#f4f0e8] leading-[1.2] mb-1.5 sm:mb-3 hero-text-shadow">
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-2xl font-medium text-[#e4c995] leading-snug mb-2.5 sm:mb-4 hero-text-shadow">
              {t.common.brandTagline}
            </p>
          </div>

          {/* Phase 2 (48% -> 84%): Description + CTAs + Quiet Engineering Attributes */}
          <div
            ref={detailsRef}
            className="will-change-[transform,opacity]"
            style={{
              opacity: reducedMotion ? 1 : 0,
              pointerEvents: reducedMotion ? 'auto' : 'none',
            }}
          >
            <p className="text-xs sm:text-base text-[#d2ccc2] leading-[1.75] sm:leading-[1.85] max-w-[50ch] mb-4 sm:mb-8 hero-text-shadow-sm rtl:ml-auto ltr:mr-auto lg:ltr:mr-0">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 rtl:justify-start ltr:justify-end lg:ltr:justify-start">
              <KineticButton
                variant="primary"
                size="md"
                showArrow
                onClick={() => onNavigate('/products')}
                className="text-xs sm:text-sm"
              >
                {t.hero.ctaPrimary}
              </KineticButton>

              <KineticButton
                variant="ghost"
                size="md"
                onClick={() => onNavigate('/contact')}
                className="bg-[#090908]/80 md:bg-black/40 md:backdrop-blur-sm border-[#c5a46d]/45 text-xs sm:text-sm"
              >
                {t.hero.ctaSecondary}
              </KineticButton>
            </div>

            <div className="mt-3 sm:mt-6 pt-2.5 sm:pt-5 border-t border-[#c5a46d]/22 w-full flex rtl:justify-start ltr:justify-end lg:ltr:justify-start">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-x-4 text-[11px] sm:text-xs text-[#b5aea4] hero-text-shadow-sm">
                <div className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#c5a46d] shrink-0 sm:hidden" />
                  <span>{t.hero.featureTag1}</span>
                </div>
                <span aria-hidden="true" className="hidden sm:inline text-[#c5a46d]/50">
                  ·
                </span>
                <div className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#c5a46d] shrink-0 sm:hidden" />
                  <span>{t.hero.featureTag2}</span>
                </div>
                <span aria-hidden="true" className="hidden sm:inline text-[#c5a46d]/50">
                  ·
                </span>
                <div className="inline-flex items-center gap-2">
                  <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#c5a46d] shrink-0 sm:hidden" />
                  <span>{t.hero.featureTag3}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Prompts & Whisper-Thin Timeline Indicator */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Scroll Hint Pill — zero backdrop-blur or continuous ping/bounce over live mobile canvas */}
        <div
          ref={introCueRef}
          className={`transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            hasDismissedCue
              ? 'opacity-0 translate-y-3 pointer-events-none scale-95'
              : 'opacity-100 translate-y-0 scale-100'
          }`}
          style={{ opacity: reducedMotion || hasDismissedCue ? 0 : 1 }}
        >
          <button
            type="button"
            onClick={() => {
              hasDismissedCueRef.current = true;
              setHasDismissedCue(true);
              onNavigate('#dashboard');
            }}
            className="group inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-full bg-[#110f0d]/95 md:bg-[#110f0d]/90 md:backdrop-blur-xl border border-[#c5a46d]/45 hover:border-[#e4c995] transition-colors duration-200 cursor-pointer"
          >
            <span className="relative flex h-2 w-2">
              {!hasDismissedCue && !reducedMotion && (
                <span className="hidden md:inline-flex animate-ping absolute h-full w-full rounded-full bg-[#e4c995] opacity-75"></span>
              )}
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c5a46d]"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#f4f0e8] tracking-wide group-hover:text-[#e4c995] transition-colors">
              {t.common.scrollCue}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-[#e4c995] ${!hasDismissedCue && !reducedMotion ? 'md:animate-bounce' : ''}`}
              aria-hidden="true"
            />
          </button>
        </div>

        {/* Settled Final-Frame Cue */}
        <div
          ref={settledCueRef}
          className="transition-opacity duration-300"
          style={{
            opacity: reducedMotion ? 1 : 0,
            pointerEvents: reducedMotion ? 'auto' : 'none',
          }}
        >
          <button
            type="button"
            onClick={() => onNavigate('#dashboard')}
            className="inline-flex items-center gap-2 text-xs text-[#e4c995] hover:text-[#f4f0e8] transition-colors py-1.5 cursor-pointer"
          >
            <span>{t.hero.settledIndicator}</span>
            <ChevronDown className="w-4 h-4 text-[#c5a46d]" aria-hidden="true" />
          </button>
        </div>

        {/* Subtle champagne scroll-sequence progress bar */}
        {!reducedMotion && (
          <div
            aria-hidden="true"
            className="hidden sm:flex items-center gap-3 w-36"
          >
            <div className="h-[2px] flex-1 bg-white/12 rounded-full overflow-hidden">
              <div
                ref={progressFillRef}
                className="h-full w-full bg-gradient-to-l rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#e4c995] to-[#c5a46d] rtl:origin-right ltr:origin-left will-change-transform"
                style={{ transform: 'scaleX(0.02)' }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section
      id="hero"
      ref={triggerRef}
      aria-label={t.common.brandName}
      className="relative z-10 w-full"
      style={
        isMobileViewport && !reducedMotion
          ? { height: `calc(100svh + ${VIDEO_SCROLL_CONFIG.mobileDistancePx}px)` }
          : undefined
      }
    >
      {stageContent}
    </section>
  );
}
