import { RefObject, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { BRAND_INFO } from '../../data/navigation';
import {
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
  const triggerRef = useRef<HTMLElement>(null);
  const introCueRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const settledCueRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  const applyPhaseVisuals = (progress: number) => {
    const phase = computeHeroTimelinePhases(progress);

    if (introCueRef.current) {
      introCueRef.current.style.opacity = String(phase.introCueOpacity);
      introCueRef.current.style.pointerEvents =
        phase.introCueOpacity > 0.25 ? 'auto' : 'none';
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

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'hero-video-scrub',
        trigger: triggerEl,
        start: 'top top',
        end: () => `+=${getHeroScrollDistance(window.innerWidth)}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.45,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          videoRef.current?.setProgress(p, false);
          applyPhaseVisuals(p);
          videoRef.current?.setPostHeroMode(p >= 0.985);
        },
        onLeave: () => {
          // Lock video permanently at exact final frame while the rest of the site scrolls above it
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
  }, [reducedMotion, videoRef]);

  return (
    <section
      id="hero"
      ref={triggerRef}
      aria-label="معرفی گروه صنعتی پاک‌اندیشان"
      className="relative z-10 h-[100svh] min-h-[600px] w-full overflow-hidden flex flex-col justify-between pt-[84px] md:pt-[96px] pb-7"
    >
      {/* Subtle right-side RTL reading scrim on desktop (never dims the left-settled rotary oven) */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden lg:block absolute inset-0 bg-[linear-gradient(270deg,rgba(6,6,6,0.72)_0%,rgba(6,6,6,0.34)_38%,rgba(6,6,6,0)_56%)]"
      />

      {/* Mobile bottom gradient scrim so lower glass content never clashes with upper oven view */}
      <div
        aria-hidden="true"
        className="pointer-events-none lg:hidden absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,6,0.32)_0%,rgba(6,6,6,0.05)_36%,rgba(6,6,6,0.78)_76%,rgba(6,6,6,0.92)_100%)]"
      />

      {/* Main Content Stage — Aligned strictly to RIGHT half on desktop (RTL start) so left oven stays 100% clear */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8 flex-1 flex items-end lg:items-center pb-10 lg:pb-0 pointer-events-none">
        <div className="w-full lg:w-[45%] xl:w-[43%] lg:bg-transparent bg-[#0a0908]/68 lg:backdrop-blur-none backdrop-blur-md border lg:border-0 border-[#c5a46d]/20 rounded-xl lg:rounded-none p-5 sm:p-6 lg:p-0">
          {/* Phase 1 (28% -> 64%): Brand Kicker + Main Headline + Supporting Headline */}
          <div
            ref={headlineRef}
            className="will-change-[transform,opacity]"
            style={{ opacity: reducedMotion ? 1 : 0 }}
          >
            <p className="text-xs sm:text-[13px] font-medium text-[#c5a46d] tracking-wide mb-3">
              مهندسی ماشین‌آلات صنعتی · {BRAND_INFO.website}
            </p>

            <h1 className="text-[clamp(1.9rem,4.1vw,3.65rem)] font-bold text-[#f4f0e8] leading-[1.2] mb-3">
              {BRAND_INFO.name}
            </h1>

            <p className="text-lg sm:text-2xl font-medium text-[#e4c995] leading-snug mb-4">
              {BRAND_INFO.tagline}
            </p>
          </div>

          {/* Phase 2 (50% -> 86%): Description + CTAs + Quiet Engineering Attributes */}
          <div
            ref={detailsRef}
            className="will-change-[transform,opacity]"
            style={{
              opacity: reducedMotion ? 1 : 0,
              pointerEvents: reducedMotion ? 'auto' : 'none',
            }}
          >
            <p className="text-sm sm:text-base text-[#d2ccc2] leading-[1.85] max-w-[48ch] mb-6 sm:mb-8">
              {BRAND_INFO.description}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('#products')}
                className="inline-flex items-center justify-center gap-2.5 h-11 sm:h-12 px-6 rounded-md bg-[#c5a46d] text-[#060606] text-sm font-semibold hover:bg-[#e4c995] transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>مشاهده ماشین‌آلات</span>
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('#contact')}
                className="inline-flex items-center justify-center gap-2 h-11 sm:h-12 px-6 rounded-md glass-surface text-[#f4f0e8] text-sm font-medium hover:border-[#e4c995]/60 hover:text-[#e4c995] transition-colors duration-200 whitespace-nowrap cursor-pointer"
              >
                <span>دریافت مشاوره فنی</span>
              </button>
            </div>

            <div className="mt-6 pt-5 border-t border-[#c5a46d]/22 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-[#b5aea4]">
              <span>مهندسی دقیق</span>
              <span aria-hidden="true" className="text-[#c5a46d]/50">
                ·
              </span>
              <span>کنترل دمای پیشرفته</span>
              <span aria-hidden="true" className="text-[#c5a46d]/50">
                ·
              </span>
              <span>ساختار تمام استیل</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Prompts & Whisper-Thin Timeline Indicator */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] px-4 sm:px-8 flex items-center justify-between gap-4">
        {/* Initial Frame Minimal Scroll Invitation (fades out cleanly once scrubbing starts) */}
        <div
          ref={introCueRef}
          className="transition-opacity duration-200"
          style={{ opacity: reducedMotion ? 0 : 1 }}
        >
          <button
            type="button"
            onClick={() => onNavigate('#dashboard')}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-md glass-nav text-xs sm:text-[13px] text-[#f4f0e8]/90 hover:text-[#e4c995] hover:border-[#c5a46d]/40 transition-colors cursor-pointer"
          >
            <span>برای کنترل حرکت دستگاه به پایین اسکرول کنید</span>
            <ChevronDown className="w-4 h-4 text-[#c5a46d]" aria-hidden="true" />
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
            <span>ادامه به پنل مهندسی و محصولات</span>
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
                className="h-full w-full bg-gradient-to-l from-[#e4c995] to-[#c5a46d] origin-right will-change-transform"
                style={{ transform: 'scaleX(0.02)' }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
