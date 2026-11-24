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
  TOTAL_VIDEO_FRAMES,
  VIDEO_SCROLL_CONFIG,
  clamp01,
  computeTargetFrameIndex,
  computeVideoFocalPosition,
  getFrameFileName,
} from '../../lib/videoScroll';
import { useLanguage } from '../../context/LanguageContext';

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
  const { t } = useLanguage();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const desktopImagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_VIDEO_FRAMES).fill(null)
  );
  const mobileImagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_VIDEO_FRAMES).fill(null)
  );
  const isMobileRef = useRef<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  const isReadyRef = useRef<boolean>(false);
  const progressRef = useRef<number>(reducedMotion ? 1 : 0);
  const targetFrameRef = useRef<number>(reducedMotion ? TOTAL_VIDEO_FRAMES - 1 : 0);
  const displayedFrameRef = useRef<number>(
    reducedMotion ? TOTAL_VIDEO_FRAMES - 1 : 0
  );
  const rafIdRef = useRef<number>(0);
  const dimensionsRef = useRef<{
    targetW: number;
    targetH: number;
    cW: number;
    cH: number;
    windowWidth: number;
  }>({
    targetW: 0,
    targetH: 0,
    cW: 0,
    cH: 0,
    windowWidth: 0,
  });
  const lastDrawnFrameRef = useRef<number>(-1);

  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
      2
    );
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(
      (rect.width || (typeof window !== 'undefined' ? window.innerWidth : 1280)) * dpr
    );
    const targetH = Math.round(
      (rect.height || (typeof window !== 'undefined' ? window.innerHeight : 720)) * dpr
    );

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    dimensionsRef.current = {
      targetW,
      targetH,
      cW: targetW,
      cH: targetH,
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1280,
    };
  }, []);

  const drawFrame = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const targetIdx = Math.max(
      0,
      Math.min(TOTAL_VIDEO_FRAMES - 1, Math.round(frameFloat))
    );

    const isMobile = isMobileRef.current;
    const primarySet = isMobile ? mobileImagesRef.current : desktopImagesRef.current;
    const secondarySet = isMobile ? desktopImagesRef.current : mobileImagesRef.current;

    // Find the best available frame: exact match or nearest loaded neighbour in primary set
    let bestImg: HTMLImageElement | null = primarySet[targetIdx];
    if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
      for (let radius = 1; radius < TOTAL_VIDEO_FRAMES; radius++) {
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
          next < TOTAL_VIDEO_FRAMES &&
          primarySet[next]?.complete &&
          primarySet[next]?.naturalWidth
        ) {
          bestImg = primarySet[next];
          break;
        }
      }
    }

    // Fallback to secondary set during orientation/resize transitions
    if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
      bestImg = secondarySet[targetIdx];
      if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
        for (let radius = 1; radius < TOTAL_VIDEO_FRAMES; radius++) {
          const prev = targetIdx - radius;
          if (
            prev >= 0 &&
            secondarySet[prev]?.complete &&
            secondarySet[prev]?.naturalWidth
          ) {
            bestImg = secondarySet[prev];
            break;
          }
          const next = targetIdx + radius;
          if (
            next < TOTAL_VIDEO_FRAMES &&
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

    // High-DPI canvas scaling from cached dimensions (zero forced layout thrashing)
    let dims = dimensionsRef.current;
    if (dims.cW === 0 || dims.cH === 0) {
      updateDimensions();
      dims = dimensionsRef.current;
    }

    const cW = dims.cW || canvas.width || 1280;
    const cH = dims.cH || canvas.height || 720;
    const imgW = bestImg.naturalWidth || 1280;
    const imgH = bestImg.naturalHeight || 720;

    // Cover-fit geometry: works flawlessly for either 16:9 widescreen or 9:16 vertical frames
    const scale = Math.max(cW / imgW, cH / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;

    // Responsive focal positioning
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

    // Only mutate DOM dataset attributes if frame has advanced to avoid DOM churn
    if (lastDrawnFrameRef.current !== targetIdx) {
      lastDrawnFrameRef.current = targetIdx;
      if (wrapperRef.current) {
        const approxSeconds = (targetIdx / TOTAL_VIDEO_FRAMES) * 10.0;
        wrapperRef.current.dataset.currentTime = approxSeconds.toFixed(3);
        wrapperRef.current.dataset.frame = String(targetIdx);
        wrapperRef.current.dataset.settled =
          progressRef.current >= 0.98 ? 'true' : 'false';
      }
    }
  }, [updateDimensions]);

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

      if (Math.abs(diff) < 0.04) {
        displayedFrameRef.current = target;
        drawFrame(target);
        return;
      }

      // Smooth interpolation for butter-fluid 60/120fps motion
      const next = current + diff * VIDEO_SCROLL_CONFIG.scrubLerpFactor;
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

        const nextTarget = computeTargetFrameIndex(p, TOTAL_VIDEO_FRAMES);
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
        if (!veilRef.current) return;
        veilRef.current.style.opacity = isPostHero ? '1' : '0';
      },
    }),
    [reducedMotion, drawFrame, startScrubLoop]
  );

  // Preload video frames progressively with viewport awareness
  useEffect(() => {
    let isCancelled = false;

    const loadSingleImage = (
      idx: number,
      isMobile: boolean
    ): Promise<HTMLImageElement> => {
      const cache = isMobile ? mobileImagesRef.current : desktopImagesRef.current;
      return new Promise((resolve, reject) => {
        if (cache[idx]) {
          resolve(cache[idx]!);
          return;
        }
        const img = new Image();
        img.src = getFrameFileName(idx, isMobile);
        img.onload = () => {
          if (!isCancelled) {
            cache[idx] = img;
          }
          resolve(img);
        };
        img.onerror = () => {
          reject(new Error(`Failed to load frame ${idx} (mobile: ${isMobile})`));
        };
      });
    };

    const startPreloadingForMode = (isMobile: boolean) => {
      const cache = isMobile ? mobileImagesRef.current : desktopImagesRef.current;
      const initialFrame = reducedMotion ? TOTAL_VIDEO_FRAMES - 1 : 0;

      // 1. Immediately load initial frame so the hero renders without delay
      loadSingleImage(initialFrame, isMobile)
        .then(() => {
          if (isCancelled) return;
          isReadyRef.current = true;
          setIsReady(true);
          updateDimensions();
          drawFrame(initialFrame);

          if (wrapperRef.current) {
            wrapperRef.current.dataset.ready = 'true';
            wrapperRef.current.dataset.duration = '10.000';
            wrapperRef.current.dataset.mode = isMobile ? 'mobile' : 'desktop';
          }

          // Ensure final frame is loaded if in reduced motion
          if (reducedMotion && initialFrame !== 0) {
            loadSingleImage(0, isMobile).catch(() => {});
          }

          // 2. Load milestone keyframes every 8th frame for instant scrub response
          const milestoneIndices: number[] = [];
          for (let i = 0; i < TOTAL_VIDEO_FRAMES; i += 8) {
            if (i !== initialFrame) milestoneIndices.push(i);
          }
          milestoneIndices.push(TOTAL_VIDEO_FRAMES - 1);

          milestoneIndices.forEach((idx) => {
            loadSingleImage(idx, isMobile).catch(() => {});
          });

          // 3. Concurrently load all other frames in chunks
          const allRemaining: number[] = [];
          for (let i = 0; i < TOTAL_VIDEO_FRAMES; i++) {
            if (!cache[i]) {
              allRemaining.push(i);
            }
          }

          let currentIndex = 0;
          const chunkSize = 12;

          const loadNextChunk = () => {
            if (isCancelled || currentIndex >= allRemaining.length) return;
            const chunk = allRemaining.slice(
              currentIndex,
              currentIndex + chunkSize
            );
            currentIndex += chunkSize;

            Promise.allSettled(chunk.map((i) => loadSingleImage(i, isMobile))).then(() => {
              if (!isCancelled && currentIndex < allRemaining.length) {
                if (typeof requestIdleCallback !== 'undefined') {
                  requestIdleCallback(loadNextChunk, { timeout: 150 });
                } else {
                  setTimeout(loadNextChunk, 20);
                }
              }
            });
          };

          loadNextChunk();
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
    startPreloadingForMode(initialIsMobile);

    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobileRef.current) {
        isMobileRef.current = newIsMobile;
        if (wrapperRef.current) {
          wrapperRef.current.dataset.mode = newIsMobile ? 'mobile' : 'desktop';
        }
        startPreloadingForMode(newIsMobile);
      }
      updateDimensions();
      drawFrame(displayedFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isCancelled = true;
      stopScrubLoop();
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, drawFrame, updateDimensions]);

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
        <canvas
          ref={canvasRef}
          id="pakandishan-bg-canvas"
          className="w-full h-full block will-change-transform"
        />
      )}

      {/* Frosted glass blur veil that seamlessly eases in past the hero, creating an ultra-luxurious dark frosted glass background */}
      <div
        ref={veilRef}
        className="absolute inset-0 backdrop-blur-[18px] bg-[#060606]/60 bg-[radial-gradient(ellipse_at_top_right,rgba(197,164,109,0.1)_0%,transparent_55%),radial-gradient(circle_at_30%_50%,rgba(6,6,6,0.3)_0%,rgba(6,6,6,0.75)_70%,rgba(6,6,6,0.92)_100%)] transition-opacity duration-700 pointer-events-none"
        style={{ opacity: reducedMotion ? 1 : 0 }}
      />

      {/* Minimal loading veil only until initial frame is ready */}
      {!isReady && !hasError && (
        <div className="absolute inset-0 flex items-end justify-center pb-14 bg-[#060606]/70 transition-opacity duration-300">
          <span className="text-xs text-[#c5a46d] tracking-wide">
            {t.common.loadingVideo}
          </span>
        </div>
      )}
    </div>
  );
});
