import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { ASSET_MANIFEST } from '../../data/assets';
import {
  DESKTOP_VIDEO_FRAMES,
  MOBILE_VIDEO_FRAMES,
  VIDEO_SCROLL_CONFIG,
  clamp01,
  computeTargetFrameIndex,
  computeVideoFocalPosition,
  getFrameFileName,
  getTotalFrames,
} from '../../lib/videoScroll';

export const HERO_VIDEO_SRC = '/assets/videos/desktop.mp4';
export const HERO_VIDEO_SRC_MOBILE = '/assets/videos/mobile.mp4';

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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const posterRef = useRef<HTMLPictureElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  const [hasError, setHasError] = useState(false);

  const desktopImagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(DESKTOP_VIDEO_FRAMES).fill(null)
  );
  const mobileImagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(MOBILE_VIDEO_FRAMES).fill(null)
  );
  const isMobileRef = useRef<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const isReadyRef = useRef<boolean>(false);
  const progressRef = useRef<number>(reducedMotion ? 1 : 0);
  const targetFrameRef = useRef<number>(
    reducedMotion ? getTotalFrames(isMobileRef.current) - 1 : 0
  );
  const displayedFrameRef = useRef<number>(
    reducedMotion ? getTotalFrames(isMobileRef.current) - 1 : 0
  );
  const rafIdRef = useRef<number>(0);
  const posterHiddenRef = useRef<boolean>(false);
  const dimensionsRef = useRef<{
    cW: number;
    cH: number;
    windowWidth: number;
  }>({
    cW: 0,
    cH: 0,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1280,
  });
  const lastDrawnImgRef = useRef<HTMLImageElement | null>(null);
  const lastDrawnFrameRef = useRef<number>(-1);
  const postHeroRef = useRef<boolean>(reducedMotion);

  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const winW = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const isMobile = winW < 768;
    // Cap DPR to 1.25 on mobile and 1.75 on desktop to slash GPU fill-rate without visible softness
    const maxDpr = isMobile ? 1.25 : 1.75;
    const dpr = Math.min(
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
      maxDpr
    );

    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(
      (rect.width || winW) * dpr
    );
    const targetH = Math.round(
      (rect.height || (typeof window !== 'undefined' ? window.innerHeight : 720)) * dpr
    );

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      lastDrawnImgRef.current = null;
    }

    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext('2d', { alpha: false });
    }

    dimensionsRef.current = {
      cW: targetW,
      cH: targetH,
      windowWidth: winW,
    };
  }, []);

  const drawFrame = useCallback(
    (frameFloat: number, force = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      let ctx = ctxRef.current;
      if (!ctx) {
        ctx = canvas.getContext('2d', { alpha: false });
        ctxRef.current = ctx;
      }
      if (!ctx) return;

      const isMobile = isMobileRef.current;
      const totalFrames = getTotalFrames(isMobile);
      const targetIdx = Math.max(
        0,
        Math.min(totalFrames - 1, Math.round(frameFloat))
      );

      const primarySet = isMobile
        ? mobileImagesRef.current
        : desktopImagesRef.current;
      const secondarySet = isMobile
        ? desktopImagesRef.current
        : mobileImagesRef.current;

      // Find exact match or nearest loaded neighbour in primary set
      let bestImg: HTMLImageElement | null = primarySet[targetIdx] ?? null;
      if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
        for (let radius = 1; radius < totalFrames; radius++) {
          const prev = targetIdx - radius;
          if (
            prev >= 0 &&
            primarySet[prev]?.complete &&
            primarySet[prev]?.naturalWidth
          ) {
            bestImg = primarySet[prev];
            break;
          }
          const next = targetIdx + radius;
          if (
            next < totalFrames &&
            primarySet[next]?.complete &&
            primarySet[next]?.naturalWidth
          ) {
            bestImg = primarySet[next];
            break;
          }
        }
      }

      // Fallback to secondary set during viewport resize across 768px
      if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
        const secTotal = secondarySet.length;
        const mappedIdx = Math.min(
          secTotal - 1,
          Math.round((targetIdx / Math.max(1, totalFrames - 1)) * (secTotal - 1))
        );
        bestImg = secondarySet[mappedIdx] ?? null;
        if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
          for (let radius = 1; radius < secTotal; radius++) {
            const prev = mappedIdx - radius;
            if (
              prev >= 0 &&
              secondarySet[prev]?.complete &&
              secondarySet[prev]?.naturalWidth
            ) {
              bestImg = secondarySet[prev];
              break;
            }
            const next = mappedIdx + radius;
            if (
              next < secTotal &&
              secondarySet[next]?.complete &&
              secondarySet[next]?.naturalWidth
            ) {
              bestImg = secondarySet[next];
              break;
            }
          }
        }
      }

      if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
        return;
      }

      // Skip redundant GPU drawImage when the exact same frame is already rendered
      if (!force && bestImg === lastDrawnImgRef.current) {
        return;
      }

      let dims = dimensionsRef.current;
      if (dims.cW === 0 || dims.cH === 0) {
        updateDimensions();
        dims = dimensionsRef.current;
      }

      const cW = dims.cW || canvas.width || 1280;
      const cH = dims.cH || canvas.height || 720;
      const imgW = bestImg.naturalWidth || 1280;
      const imgH = bestImg.naturalHeight || 720;

      // Cover-fit geometry
      const scale = Math.max(cW / imgW, cH / imgH);
      const renderW = imgW * scale;
      const renderH = imgH * scale;

      let focalX = 0.5;
      let focalY = 0.5;
      const focalStr = computeVideoFocalPosition(
        progressRef.current,
        dims.windowWidth
      );
      const parts = focalStr.split(' ');
      if (parts.length === 2) {
        focalX = parseFloat(parts[0]) / 100;
        focalY = parseFloat(parts[1]) / 100;
      }

      const offsetX = (cW - renderW) * focalX;
      const offsetY = (cH - renderH) * focalY;

      ctx.drawImage(bestImg, offsetX, offsetY, renderW, renderH);
      lastDrawnImgRef.current = bestImg;

      // Hide initial LCP poster once canvas has taken over cleanly
      if (!posterHiddenRef.current && posterRef.current && (targetIdx > 0 || reducedMotion)) {
        posterHiddenRef.current = true;
        posterRef.current.style.opacity = '0';
        posterRef.current.style.visibility = 'hidden';
      }

      if (lastDrawnFrameRef.current !== targetIdx) {
        lastDrawnFrameRef.current = targetIdx;
        if (wrapperRef.current) {
          const approxSeconds = (targetIdx / totalFrames) * 10.0;
          wrapperRef.current.dataset.currentTime = approxSeconds.toFixed(3);
          wrapperRef.current.dataset.frame = String(targetIdx);
          wrapperRef.current.dataset.settled =
            progressRef.current >= 0.98 ? 'true' : 'false';
        }
      }
    },
    [reducedMotion, updateDimensions]
  );

  const stopScrubLoop = () => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = 0;
    }
  };

  const startScrubLoop = useCallback(() => {
    if (rafIdRef.current) return;

    const step = () => {
      rafIdRef.current = 0;
      const target = targetFrameRef.current;
      const current = displayedFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.08) {
        displayedFrameRef.current = target;
        drawFrame(target);
        return;
      }

      const lerp = isMobileRef.current
        ? VIDEO_SCROLL_CONFIG.mobileScrubLerpFactor
        : VIDEO_SCROLL_CONFIG.scrubLerpFactor;
      const next = current + diff * lerp;
      displayedFrameRef.current = next;
      drawFrame(next);
      rafIdRef.current = requestAnimationFrame(step);
    };

    rafIdRef.current = requestAnimationFrame(step);
  }, [drawFrame]);

  useImperativeHandle(
    ref,
    () => ({
      setProgress(rawProgress: number, immediate = false) {
        const p = reducedMotion ? 1 : clamp01(rawProgress);
        progressRef.current = p;

        if (wrapperRef.current) {
          wrapperRef.current.dataset.progress = p.toFixed(4);
        }

        const totalFrames = getTotalFrames(isMobileRef.current);
        const nextTarget = computeTargetFrameIndex(p, totalFrames);
        targetFrameRef.current = nextTarget;

        if (immediate || reducedMotion || !isReadyRef.current) {
          stopScrubLoop();
          displayedFrameRef.current = nextTarget;
          drawFrame(nextTarget);
        } else {
          startScrubLoop();
        }
      },
      setPostHeroMode(isPostHero: boolean) {
        if (postHeroRef.current === isPostHero) return;
        postHeroRef.current = isPostHero;
        if (!veilRef.current) return;
        if (isPostHero) {
          veilRef.current.style.visibility = 'visible';
          veilRef.current.style.opacity = '1';
        } else {
          veilRef.current.style.opacity = '0';
          veilRef.current.style.visibility = 'hidden';
        }
      },
    }),
    [reducedMotion, drawFrame, startScrubLoop]
  );

  // Smart progressive frame preloader:
  // 1. Frame 0 renders instantly via <picture> LCP poster + single image load.
  // 2. Remaining frames wait for first user interaction (scroll/touch/wheel) OR idle timer,
  //    so initial page load & Lighthouse audit stay 100% free of network/CPU flood.
  // 3. When active, loads 16 anchor keyframes first, then dynamically prioritizes frames
  //    closest to current scroll position in small polite concurrency batches.
  useEffect(() => {
    let isCancelled = false;
    const preloadedModes = new Set<'mobile' | 'desktop'>();
    const pendingInFlight = new Set<string>();

    const loadSingleImage = (
      idx: number,
      isMobile: boolean
    ): Promise<HTMLImageElement> => {
      const cache = isMobile ? mobileImagesRef.current : desktopImagesRef.current;
      const key = `${isMobile ? 'm' : 'd'}_${idx}`;

      if (cache[idx]?.complete && cache[idx]?.naturalWidth) {
        return Promise.resolve(cache[idx]!);
      }

      if (pendingInFlight.has(key)) {
        return Promise.resolve(cache[idx] as HTMLImageElement);
      }
      pendingInFlight.add(key);

      return new Promise((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = getFrameFileName(idx, isMobile);
        img.onload = () => {
          pendingInFlight.delete(key);
          if (!isCancelled) {
            cache[idx] = img;
            // If this loaded frame is very close to what the user is currently viewing, redraw immediately
            if (
              isMobile === isMobileRef.current &&
              Math.abs(idx - Math.round(displayedFrameRef.current)) <= 2
            ) {
              drawFrame(displayedFrameRef.current);
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          pendingInFlight.delete(key);
          reject(new Error(`Failed to load frame ${idx} (mobile: ${isMobile})`));
        };
      });
    };

    const runBackgroundQueue = (isMobile: boolean) => {
      const modeKey = isMobile ? 'mobile' : 'desktop';
      if (preloadedModes.has(modeKey) || isCancelled) return;
      preloadedModes.add(modeKey);

      const cache = isMobile ? mobileImagesRef.current : desktopImagesRef.current;
      const total = getTotalFrames(isMobile);
      const batchSize = isMobile ? 4 : 6;

      // Phase A: 16 evenly-spaced keyframe anchors + final frame for immediate full-range scrubbing
      const anchors: number[] = [];
      const anchorStep = Math.max(1, Math.floor(total / 16));
      for (let i = 0; i < total; i += anchorStep) {
        if (!cache[i]) anchors.push(i);
      }
      if (!cache[total - 1] && !anchors.includes(total - 1)) {
        anchors.push(total - 1);
      }

      const loadAnchorBatch = (offset: number) => {
        if (isCancelled || isMobile !== isMobileRef.current) return;
        if (offset >= anchors.length) {
          scheduleRemainingBatch();
          return;
        }
        const slice = anchors.slice(offset, offset + batchSize);
        Promise.allSettled(slice.map((i) => loadSingleImage(i, isMobile))).then(() => {
          if (!isCancelled) {
            setTimeout(() => loadAnchorBatch(offset + batchSize), isMobile ? 24 : 10);
          }
        });
      };

      // Phase B: Dynamically pick unloaded frames closest to current scroll target
      const scheduleRemainingBatch = () => {
        if (isCancelled || isMobile !== isMobileRef.current) return;
        const unloaded: number[] = [];
        for (let i = 0; i < total; i++) {
          if (!cache[i]) unloaded.push(i);
        }
        if (unloaded.length === 0) return;

        const focus = targetFrameRef.current;
        unloaded.sort((a, b) => Math.abs(a - focus) - Math.abs(b - focus));
        const nextBatch = unloaded.slice(0, batchSize);

        Promise.allSettled(
          nextBatch.map((i) => loadSingleImage(i, isMobile))
        ).then(() => {
          if (isCancelled) return;
          if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(scheduleRemainingBatch, { timeout: 180 });
          } else {
            setTimeout(scheduleRemainingBatch, isMobile ? 40 : 16);
          }
        });
      };

      loadAnchorBatch(0);
    };

    const bootMode = (isMobile: boolean) => {
      const total = getTotalFrames(isMobile);
      const initialFrame = reducedMotion ? total - 1 : 0;

      loadSingleImage(initialFrame, isMobile)
        .then(() => {
          if (isCancelled) return;
          isReadyRef.current = true;
          updateDimensions();
          drawFrame(initialFrame, true);

          if (wrapperRef.current) {
            wrapperRef.current.dataset.ready = 'true';
            wrapperRef.current.dataset.duration = '10.000';
            wrapperRef.current.dataset.mode = isMobile ? 'mobile' : 'desktop';
          }

          if (reducedMotion) return;

          // Trigger background preloading on first user interaction OR idle timer
          let started = false;
          const triggerPreload = () => {
            if (started || isCancelled) return;
            started = true;
            cleanupTriggers();
            runBackgroundQueue(isMobile);
          };

          const idleTimer = window.setTimeout(
            triggerPreload,
            isMobile ? 2200 : 600
          );

          const cleanupTriggers = () => {
            window.clearTimeout(idleTimer);
            window.removeEventListener('scroll', triggerPreload);
            window.removeEventListener('touchstart', triggerPreload);
            window.removeEventListener('wheel', triggerPreload);
            window.removeEventListener('pointerdown', triggerPreload);
          };

          window.addEventListener('scroll', triggerPreload, { passive: true, once: true });
          window.addEventListener('touchstart', triggerPreload, { passive: true, once: true });
          window.addEventListener('wheel', triggerPreload, { passive: true, once: true });
          window.addEventListener('pointerdown', triggerPreload, { passive: true, once: true });

          // If user already scrolled before mount completed, start immediately
          if (window.scrollY > 5) {
            triggerPreload();
          }
        })
        .catch(() => {
          if (!isCancelled) {
            setHasError(true);
          }
        });
    };

    const initialIsMobile =
      typeof window !== 'undefined' ? window.innerWidth < 768 : false;
    isMobileRef.current = initialIsMobile;
    bootMode(initialIsMobile);

    let resizeTimer = 0;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (isCancelled) return;
        const newIsMobile = window.innerWidth < 768;
        if (newIsMobile !== isMobileRef.current) {
          isMobileRef.current = newIsMobile;
          const total = getTotalFrames(newIsMobile);
          const mapped = computeTargetFrameIndex(progressRef.current, total);
          targetFrameRef.current = mapped;
          displayedFrameRef.current = mapped;
          if (wrapperRef.current) {
            wrapperRef.current.dataset.mode = newIsMobile ? 'mobile' : 'desktop';
          }
          bootMode(newIsMobile);
        }
        updateDimensions();
        drawFrame(displayedFrameRef.current, true);
      }, 120);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isCancelled = true;
      window.clearTimeout(resizeTimer);
      stopScrubLoop();
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, drawFrame, updateDimensions]);

  return (
    <div
      ref={wrapperRef}
      data-testid="persistent-bg-video"
      data-ready="true"
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
        <>
          <canvas
            ref={canvasRef}
            id="pakandishan-bg-canvas"
            className="w-full h-full block"
          />
          {/* Immediate LCP Hero Poster (Frame 0) — renders before JS/Canvas initializes and hides once scrolling starts */}
          <picture
            ref={posterRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              opacity: reducedMotion ? 0 : 1,
              visibility: reducedMotion ? 'hidden' : 'visible',
            }}
          >
            <source
              media="(max-width: 767px)"
              srcSet="/assets/frames/mobile-opt/frame_0001.webp"
              type="image/webp"
            />
            <img
              src="/assets/frames/desktop-opt/frame_0001.webp"
              alt=""
              width={1280}
              height={720}
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover object-center"
            />
          </picture>
        </>
      )}

      {/* Post-hero dark frosted veil: hidden during hero scrubbing so GPU never allocates blur overhead; lightweight dark scrim on mobile, frosted blur on desktop */}
      <div
        ref={veilRef}
        className="absolute inset-0 md:backdrop-blur-[16px] bg-[#060606]/82 md:bg-[#060606]/60 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,109,0.1)_0%,transparent_55%),radial-gradient(circle_at_30%_50%,rgba(6,6,6,0.35)_0%,rgba(6,6,6,0.78)_70%,rgba(6,6,6,0.94)_100%)] transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: reducedMotion ? 1 : 0,
          visibility: reducedMotion ? 'visible' : 'hidden',
        }}
      />
    </div>
  );
});
