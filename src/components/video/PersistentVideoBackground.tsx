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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_VIDEO_FRAMES).fill(null)
  );
  const isReadyRef = useRef<boolean>(false);
  const progressRef = useRef<number>(reducedMotion ? 1 : 0);
  const targetFrameRef = useRef<number>(reducedMotion ? TOTAL_VIDEO_FRAMES - 1 : 0);
  const displayedFrameRef = useRef<number>(
    reducedMotion ? TOTAL_VIDEO_FRAMES - 1 : 0
  );
  const rafIdRef = useRef<number>(0);

  const drawFrame = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const targetIdx = Math.max(
      0,
      Math.min(TOTAL_VIDEO_FRAMES - 1, Math.round(frameFloat))
    );

    // Find the best available frame: exact match or nearest loaded neighbour
    let bestImg: HTMLImageElement | null = imagesRef.current[targetIdx];
    if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
      for (let radius = 1; radius < TOTAL_VIDEO_FRAMES; radius++) {
        const prev = targetIdx - radius;
        if (
          prev >= 0 &&
          imagesRef.current[prev]?.complete &&
          imagesRef.current[prev]?.naturalWidth
        ) {
          bestImg = imagesRef.current[prev];
          break;
        }
        const next = targetIdx + radius;
        if (
          next < TOTAL_VIDEO_FRAMES &&
          imagesRef.current[next]?.complete &&
          imagesRef.current[next]?.naturalWidth
        ) {
          bestImg = imagesRef.current[next];
          break;
        }
      }
    }

    if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
      return;
    }

    // High-DPI canvas scaling
    const dpr = Math.min(
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
      2
    );
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    const cW = canvas.width;
    const cH = canvas.height;
    const imgW = bestImg.naturalWidth || 1280;
    const imgH = bestImg.naturalHeight || 720;

    // Cover-fit geometry
    const scale = Math.max(cW / imgW, cH / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;

    // Responsive focal positioning
    let focalX = 0.5;
    let focalY = 0.5;
    if (typeof window !== 'undefined') {
      const focalStr = computeVideoFocalPosition(
        progressRef.current,
        window.innerWidth
      );
      const parts = focalStr.split(' ');
      if (parts.length === 2) {
        focalX = parseFloat(parts[0]) / 100;
        focalY = parseFloat(parts[1]) / 100;
      }
    }

    const offsetX = (cW - renderW) * focalX;
    const offsetY = (cH - renderH) * focalY;

    ctx.drawImage(bestImg, offsetX, offsetY, renderW, renderH);

    if (wrapperRef.current) {
      const approxSeconds = (targetIdx / TOTAL_VIDEO_FRAMES) * 10.03;
      wrapperRef.current.dataset.currentTime = approxSeconds.toFixed(3);
      wrapperRef.current.dataset.frame = String(targetIdx);
      wrapperRef.current.dataset.settled =
        progressRef.current >= 0.98 ? 'true' : 'false';
    }
  }, []);

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

  // Preload video frames progressively
  useEffect(() => {
    let isCancelled = false;

    const loadSingleImage = (idx: number): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (imagesRef.current[idx]) {
          resolve(imagesRef.current[idx]!);
          return;
        }
        const img = new Image();
        img.src = getFrameFileName(idx);
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[idx] = img;
          }
          resolve(img);
        };
        img.onerror = () => {
          reject(new Error(`Failed to load frame ${idx}`));
        };
      });
    };

    // 1. Immediately load frame 0 so the hero renders without delay
    const initialFrame = reducedMotion ? TOTAL_VIDEO_FRAMES - 1 : 0;
    loadSingleImage(initialFrame)
      .then((img) => {
        if (isCancelled) return;
        isReadyRef.current = true;
        setIsReady(true);
        drawFrame(initialFrame);

        if (wrapperRef.current) {
          wrapperRef.current.dataset.ready = 'true';
          wrapperRef.current.dataset.duration = '10.030';
        }

        // Also ensure final frame is loaded if in reduced motion
        if (reducedMotion && initialFrame !== 0) {
          loadSingleImage(0).catch(() => {});
        }

        // 2. Load milestone keyframes every 8th frame for instant scrub response
        const milestoneIndices: number[] = [];
        for (let i = 0; i < TOTAL_VIDEO_FRAMES; i += 8) {
          if (i !== initialFrame) milestoneIndices.push(i);
        }
        milestoneIndices.push(TOTAL_VIDEO_FRAMES - 1);

        milestoneIndices.forEach((idx) => {
          loadSingleImage(idx).catch(() => {});
        });

        // 3. Concurrently load all other frames in chunks
        const allRemaining: number[] = [];
        for (let i = 0; i < TOTAL_VIDEO_FRAMES; i++) {
          if (!imagesRef.current[i]) {
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

          Promise.allSettled(chunk.map((i) => loadSingleImage(i))).then(() => {
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

    const handleResize = () => {
      drawFrame(displayedFrameRef.current);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      isCancelled = true;
      stopScrubLoop();
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion, drawFrame]);

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

      {/* Subtle ambient depth veil that gently eases in once scrolling past the hero so glass sections stay crisp */}
      <div
        ref={veilRef}
        className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(6,6,6,0.12)_0%,rgba(6,6,6,0.48)_72%,rgba(6,6,6,0.62)_100%)] transition-opacity duration-500"
        style={{ opacity: reducedMotion ? 1 : 0 }}
      />

      {/* Minimal loading veil only until initial frame is ready */}
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
