import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ASSET_MANIFEST } from '../../data/assets';
import {
  VIDEO_SCROLL_CONFIG,
  clamp01,
  computeTargetVideoTime,
  computeVideoFocalPosition,
  shouldSeekVideo,
} from '../../lib/videoScroll';

export const HERO_VIDEO_SRC =
  '/assets/aistudio/gemini_generated_video_9ab5cb01_9f10563b.mp4';

export interface PersistentVideoHandle {
  setProgress: (progress: number, immediate?: boolean) => void;
  setPostHeroMode: (isPostHero: boolean) => void;
}

interface PersistentVideoBackgroundProps {
  reducedMotion: boolean;
}

export const PersistentVideoBackground = forwardRef<
  PersistentVideoHandle,
  PersistentVideoBackgroundProps
>(function PersistentVideoBackground({ reducedMotion }, ref) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const durationRef = useRef<number>(0);
  const readyRef = useRef<boolean>(false);
  const progressRef = useRef<number>(reducedMotion ? 1 : 0);
  const targetTimeRef = useRef<number>(0);
  const displayedTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number>(0);
  const pendingSeekRef = useRef<number | null>(null);

  const applyVideoTime = (timeSec: number) => {
    const video = videoRef.current;
    if (!video || !readyRef.current) return;

    if (!video.paused) {
      video.pause();
    }

    const clamped = Math.max(
      0,
      Math.min(
        timeSec,
        Math.max(0, durationRef.current - VIDEO_SCROLL_CONFIG.endFramePaddingSec)
      )
    );

    if (video.seeking) {
      pendingSeekRef.current = clamped;
      return;
    }

    if (shouldSeekVideo(video.currentTime, clamped)) {
      try {
        video.currentTime = clamped;
      } catch {
        pendingSeekRef.current = clamped;
      }
    }

    if (wrapperRef.current) {
      wrapperRef.current.dataset.currentTime = clamped.toFixed(3);
      wrapperRef.current.dataset.settled =
        progressRef.current >= 0.98 ? 'true' : 'false';
    }
  };

  const applyFocalPosition = (progress: number) => {
    const video = videoRef.current;
    if (!video || typeof window === 'undefined') return;
    video.style.objectPosition = computeVideoFocalPosition(
      progress,
      window.innerWidth
    );
  };

  const stopScrubLoop = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
  };

  const startScrubLoop = () => {
    if (rafIdRef.current) return;

    const step = () => {
      rafIdRef.current = 0;
      const target = targetTimeRef.current;
      const current = displayedTimeRef.current;
      const diff = target - current;

      if (Math.abs(diff) <= VIDEO_SCROLL_CONFIG.seekEpsilonSec) {
        displayedTimeRef.current = target;
        applyVideoTime(target);
        return;
      }

      const next = current + diff * VIDEO_SCROLL_CONFIG.scrubLerpFactor;
      displayedTimeRef.current = next;
      applyVideoTime(next);
      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);
  };

  useImperativeHandle(
    ref,
    () => ({
      setProgress(rawProgress: number, immediate = false) {
        const p = reducedMotion ? 1 : clamp01(rawProgress);
        progressRef.current = p;

        if (wrapperRef.current) {
          wrapperRef.current.dataset.progress = p.toFixed(4);
        }

        applyFocalPosition(p);

        if (!readyRef.current || durationRef.current <= 0) {
          return;
        }

        const nextTarget = computeTargetVideoTime(p, durationRef.current);
        targetTimeRef.current = nextTarget;

        if (immediate || reducedMotion) {
          stopScrubLoop();
          displayedTimeRef.current = nextTarget;
          applyVideoTime(nextTarget);
        } else {
          startScrubLoop();
        }
      },
      setPostHeroMode(isPostHero: boolean) {
        if (!veilRef.current) return;
        veilRef.current.style.opacity = isPostHero ? '1' : '0';
      },
    }),
    [reducedMotion]
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;
      durationRef.current = video.duration;
      readyRef.current = true;
      setIsReady(true);
      video.pause();

      const initialProgress = reducedMotion ? 1 : progressRef.current;
      const initialTarget = computeTargetVideoTime(
        initialProgress,
        video.duration
      );
      targetTimeRef.current = initialTarget;
      displayedTimeRef.current = initialTarget;
      applyFocalPosition(initialProgress);
      applyVideoTime(initialTarget);

      if (wrapperRef.current) {
        wrapperRef.current.dataset.ready = 'true';
        wrapperRef.current.dataset.duration = video.duration.toFixed(3);
      }
    };

    const handleSeeked = () => {
      if (!video.paused) {
        video.pause();
      }
      if (wrapperRef.current) {
        wrapperRef.current.dataset.currentTime = video.currentTime.toFixed(3);
      }
      if (pendingSeekRef.current !== null) {
        const queued = pendingSeekRef.current;
        pendingSeekRef.current = null;
        if (shouldSeekVideo(video.currentTime, queued)) {
          try {
            video.currentTime = queued;
          } catch {
            // Ignore transient decode state
          }
        }
      }
    };

    const preventAutoplay = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    const handleError = () => {
      setHasError(true);
    };

    const handleResize = () => {
      applyFocalPosition(progressRef.current);
    };

    video.addEventListener('loadedmetadata', markReady);
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('canplay', markReady);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('play', preventAutoplay);
    video.addEventListener('error', handleError);
    window.addEventListener('resize', handleResize, { passive: true });

    // If browser already cached metadata before effect mounted
    if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) {
      markReady();
    } else {
      video.load();
    }

    return () => {
      stopScrubLoop();
      video.removeEventListener('loadedmetadata', markReady);
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('canplay', markReady);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('play', preventAutoplay);
      video.removeEventListener('error', handleError);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      data-testid="persistent-bg-video"
      data-ready={isReady ? 'true' : 'false'}
      data-progress={reducedMotion ? '1.0000' : '0.0000'}
      data-current-time="0.000"
      data-settled={reducedMotion ? 'true' : 'false'}
      aria-hidden="true"
      className="fixed inset-0 z-0 w-full h-full overflow-hidden bg-[#060606] pointer-events-none select-none"
    >
      {hasError ? (
        <img
          src={ASSET_MANIFEST.rotaryOven.path}
          alt=""
          className="w-full h-full object-cover object-center opacity-90"
        />
      ) : (
        <video
          ref={videoRef}
          id="pakandishan-bg-video"
          src={HERO_VIDEO_SRC}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          className="w-full h-full object-cover will-change-transform"
          style={{ objectPosition: '50% 50%' }}
        />
      )}

      {/* Subtle ambient depth veil that gently eases in once scrolling past the hero so glass sections stay crisp */}
      <div
        ref={veilRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,6,6,0.12)_0%,rgba(6,6,6,0.48)_72%,rgba(6,6,6,0.62)_100%)] transition-opacity duration-500"
        style={{ opacity: reducedMotion ? 1 : 0 }}
      />

      {/* Minimal loading veil only until first video frame metadata is ready */}
      {!isReady && !hasError && (
        <div className="absolute inset-0 flex items-end justify-center pb-14 bg-[#060606]/70 transition-opacity duration-300">
          <span className="text-xs text-[#c5a46d] tracking-wide">
            در حال آماده‌سازی نمایش ویدیویی...
          </span>
        </div>
      )}
    </div>
  );
});
