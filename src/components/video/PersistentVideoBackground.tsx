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

type DecodedFrame = ImageBitmap | HTMLImageElement;

function isFrameReady(frame: DecodedFrame | null): frame is DecodedFrame {
  if (!frame) return false;
  if (typeof ImageBitmap !== 'undefined' && frame instanceof ImageBitmap) {
    return frame.width > 0 && frame.height > 0;
  }
  const img = frame as HTMLImageElement;
  return img.complete && img.naturalWidth > 0;
}

function getFrameDimensions(frame: DecodedFrame): { w: number; h: number } {
  if (typeof ImageBitmap !== 'undefined' && frame instanceof ImageBitmap) {
    return { w: frame.width, h: frame.height };
  }
  const img = frame as HTMLImageElement;
  return { w: img.naturalWidth || 1280, h: img.naturalHeight || 720 };
}

function closeFrame(frame: DecodedFrame | null) {
  if (
    frame &&
    typeof ImageBitmap !== 'undefined' &&
    frame instanceof ImageBitmap
  ) {
    try {
      frame.close();
    } catch {
      // Ignore already-closed bitmaps
    }
  }
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

  const desktopFramesRef = useRef<(DecodedFrame | null)[]>(
    new Array(DESKTOP_VIDEO_FRAMES).fill(null)
  );
  const mobileFramesRef = useRef<(DecodedFrame | null)[]>(
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
  const settledAttrRef = useRef<boolean>(reducedMotion);
  const dimensionsRef = useRef<{
    cW: number;
    cH: number;
    windowWidth: number;
  }>({
    cW: 0,
    cH: 0,
    windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1280,
  });
  const lastDrawnFrameObjRef = useRef<DecodedFrame | null>(null);
  const lastDrawnIdxRef = useRef<number>(-1);
  const postHeroRef = useRef<boolean>(reducedMotion);

  const updateDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const winW = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const isMobile = winW < 768;
    // DPR 1.0 on mobile cuts GPU pixel fill-rate by up to 75% on Retina screens while staying crisp
    const maxDpr = isMobile ? 1 : 1.75;
    const dpr = Math.min(
      typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
      maxDpr
    );

    const rect = canvas.getBoundingClientRect();
    const targetW = Math.max(1, Math.round((rect.width || winW) * dpr));
    const stableH = Math.max(
      rect.height || 0,
      typeof window !== 'undefined' ? window.innerHeight : 720
    );
    const targetH = Math.max(1, Math.round(stableH * dpr));

    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      lastDrawnFrameObjRef.current = null;
    }

    if (!ctxRef.current) {
      ctxRef.current = canvas.getContext('2d', {
        alpha: false,
        desynchronized: isMobile,
      });
    }

    if (ctxRef.current && isMobile) {
      ctxRef.current.imageSmoothingQuality = 'low';
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
        ctx = canvas.getContext('2d', {
          alpha: false,
          desynchronized: isMobileRef.current,
        });
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
        ? mobileFramesRef.current
        : desktopFramesRef.current;
      const secondarySet = isMobile
        ? desktopFramesRef.current
        : mobileFramesRef.current;

      // Exact frame or nearest pre-decoded neighbour
      let bestFrame: DecodedFrame | null = primarySet[targetIdx] ?? null;
      if (!isFrameReady(bestFrame)) {
        bestFrame = null;
        for (let radius = 1; radius < totalFrames; radius++) {
          const prev = targetIdx - radius;
          if (prev >= 0 && isFrameReady(primarySet[prev])) {
            bestFrame = primarySet[prev];
            break;
          }
          const next = targetIdx + radius;
          if (next < totalFrames && isFrameReady(primarySet[next])) {
            bestFrame = primarySet[next];
            break;
          }
        }
      }

      if (!bestFrame) {
        const secTotal = secondarySet.length;
        const mappedIdx = Math.min(
          secTotal - 1,
          Math.round((targetIdx / Math.max(1, totalFrames - 1)) * (secTotal - 1))
        );
        if (isFrameReady(secondarySet[mappedIdx])) {
          bestFrame = secondarySet[mappedIdx];
        } else {
          for (let radius = 1; radius < secTotal; radius++) {
            const prev = mappedIdx - radius;
            if (prev >= 0 && isFrameReady(secondarySet[prev])) {
              bestFrame = secondarySet[prev];
              break;
            }
            const next = mappedIdx + radius;
            if (next < secTotal && isFrameReady(secondarySet[next])) {
              bestFrame = secondarySet[next];
              break;
            }
          }
        }
      }

      if (!bestFrame) return;

      // Skip redundant GPU blit if exact same decoded bitmap is already painted
      if (!force && bestFrame === lastDrawnFrameObjRef.current) {
        return;
      }

      let dims = dimensionsRef.current;
      if (dims.cW === 0 || dims.cH === 0) {
        updateDimensions();
        dims = dimensionsRef.current;
      }

      const cW = dims.cW || canvas.width || 1280;
      const cH = dims.cH || canvas.height || 720;
      const { w: imgW, h: imgH } = getFrameDimensions(bestFrame);

      // Cover-fit geometry
      const scale = Math.max(cW / imgW, cH / imgH);
      const renderW = imgW * scale;
      const renderH = imgH * scale;

      let focalX = 0.5;
      let focalY = 0.5;
      if (!isMobile) {
        const focalStr = computeVideoFocalPosition(
          progressRef.current,
          dims.windowWidth
        );
        const parts = focalStr.split(' ');
        if (parts.length === 2) {
          focalX = parseFloat(parts[0]) / 100;
          focalY = parseFloat(parts[1]) / 100;
        }
      } else {
        // Inline mobile focal math to avoid per-frame string allocation/parsing
        const p = progressRef.current;
        focalX = (50 - p * 6) / 100;
        focalY = (50 + p * 3) / 100;
      }

      const offsetX = (cW - renderW) * focalX;
      const offsetY = (cH - renderH) * focalY;

      ctx.drawImage(bestFrame, offsetX, offsetY, renderW, renderH);
      lastDrawnFrameObjRef.current = bestFrame;
      lastDrawnIdxRef.current = targetIdx;

      // Hide initial LCP poster once canvas has painted cleanly
      if (
        !posterHiddenRef.current &&
        posterRef.current &&
        (targetIdx > 0 || reducedMotion)
      ) {
        posterHiddenRef.current = true;
        posterRef.current.style.opacity = '0';
        posterRef.current.style.visibility = 'hidden';
      }

      // Only touch DOM dataset when settled state flips (never per-frame during active scroll)
      const isNowSettled = progressRef.current >= 0.98;
      if (settledAttrRef.current !== isNowSettled && wrapperRef.current) {
        settledAttrRef.current = isNowSettled;
        wrapperRef.current.dataset.settled = isNowSettled ? 'true' : 'false';
        wrapperRef.current.dataset.frame = String(targetIdx);
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

        const isMobile = isMobileRef.current;
        const totalFrames = getTotalFrames(isMobile);
        const nextTarget = computeTargetFrameIndex(p, totalFrames);
        targetFrameRef.current = nextTarget;

        // On mobile: direct 1:1 GPU blit synced to native touch scroll (zero secondary lerp lag)
        if (immediate || isMobile || reducedMotion || !isReadyRef.current) {
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

  // Off-main-thread ImageBitmap progressive frame decoder:
  // 1. Frame 0 paints immediately via <picture> LCP poster + first ImageBitmap decode.
  // 2. Starts loading 16 keyframe anchors + final frame right after first paint (80ms)
  //    so mobile swipes NEVER hit un-decoded frames on first scroll!
  // 3. Streams even frames (30fps full smoothness) then odd frames off the main thread
  //    via fetch() -> blob() -> createImageBitmap() so ctx.drawImage() is < 0.3ms on phones!
  useEffect(() => {
    let isCancelled = false;
    const preloadedModes = new Set<'mobile' | 'desktop'>();
    const pendingInFlight = new Set<string>();
    const supportsBitmap = typeof createImageBitmap === 'function';

    const decodeToFrame = async (
      url: string,
      isMobile: boolean
    ): Promise<DecodedFrame> => {
      if (supportsBitmap) {
        try {
          const res = await fetch(url, { cache: 'force-cache' });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const blob = await res.blob();
          if (isMobile) {
            // Decode directly to mobile viewport width so GPU VRAM stays ~75 MB total and drawImage is ~1:1 blit
            const winW =
              typeof window !== 'undefined' ? window.innerWidth : 390;
            const resizeWidth = Math.min(430, Math.max(360, Math.round(winW)));
            const resizeHeight = Math.round((resizeWidth * 960) / 540);
            try {
              return await createImageBitmap(blob, {
                resizeWidth,
                resizeHeight,
                resizeQuality: 'medium',
              });
            } catch {
              // Safari fallback without resize options
              return await createImageBitmap(blob);
            }
          }
          return await createImageBitmap(blob);
        } catch {
          // Fall through to HTMLImageElement decode fallback
        }
      }

      return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.decoding = 'async';
        img.src = url;
        img.onload = () => {
          if (typeof img.decode === 'function') {
            img
              .decode()
              .then(() => resolve(img))
              .catch(() => resolve(img));
          } else {
            resolve(img);
          }
        };
        img.onerror = () => reject(new Error(`Failed to load ${url}`));
      });
    };

    const loadSingleFrame = (
      idx: number,
      isMobile: boolean
    ): Promise<DecodedFrame | null> => {
      const cache = isMobile
        ? mobileFramesRef.current
        : desktopFramesRef.current;
      const key = `${isMobile ? 'm' : 'd'}_${idx}`;

      if (isFrameReady(cache[idx])) {
        return Promise.resolve(cache[idx]);
      }

      if (pendingInFlight.has(key)) {
        return Promise.resolve(cache[idx]);
      }
      pendingInFlight.add(key);

      const url = getFrameFileName(idx, isMobile);
      return decodeToFrame(url, isMobile)
        .then((frame) => {
          pendingInFlight.delete(key);
          if (isCancelled) {
            closeFrame(frame);
            return null;
          }
          cache[idx] = frame;
          if (
            isMobile === isMobileRef.current &&
            Math.abs(idx - Math.round(displayedFrameRef.current)) <= 1
          ) {
            drawFrame(displayedFrameRef.current);
          }
          return frame;
        })
        .catch(() => {
          pendingInFlight.delete(key);
          return null;
        });
    };

    const runBackgroundQueue = (isMobile: boolean) => {
      const modeKey = isMobile ? 'mobile' : 'desktop';
      if (preloadedModes.has(modeKey) || isCancelled) return;
      preloadedModes.add(modeKey);

      const cache = isMobile
        ? mobileFramesRef.current
        : desktopFramesRef.current;
      const total = getTotalFrames(isMobile);
      const batchSize = isMobile ? 4 : 6;

      // Build smart progressive priority queue:
      // 1) 16 evenly spaced anchors + final frame
      // 2) Even frames (instant silky half-rate coverage)
      // 3) Remaining odd frames
      const ordered: number[] = [];
      const seen = new Set<number>();
      const pushIfNeeded = (i: number) => {
        if (i >= 0 && i < total && !seen.has(i) && !isFrameReady(cache[i])) {
          seen.add(i);
          ordered.push(i);
        }
      };

      const anchorStep = Math.max(1, Math.floor(total / 16));
      for (let i = 0; i < total; i += anchorStep) pushIfNeeded(i);
      pushIfNeeded(total - 1);
      for (let i = 0; i < total; i += 2) pushIfNeeded(i);
      for (let i = 1; i < total; i += 2) pushIfNeeded(i);

      let cursor = 0;
      const pump = () => {
        if (isCancelled || isMobile !== isMobileRef.current) return;
        if (cursor >= ordered.length) return;

        // Prioritize frames right next to user's current scroll target first
        const focus = targetFrameRef.current;
        const immediateSlice: number[] = [];
        for (let delta = 0; delta <= 4 && immediateSlice.length < batchSize; delta++) {
          const candidates = delta === 0 ? [focus] : [focus + delta, focus - delta];
          for (const c of candidates) {
            if (
              c >= 0 &&
              c < total &&
              !isFrameReady(cache[c]) &&
              !pendingInFlight.has(`${isMobile ? 'm' : 'd'}_${c}`) &&
              !immediateSlice.includes(c)
            ) {
              immediateSlice.push(c);
            }
          }
        }

        const slice =
          immediateSlice.length > 0
            ? immediateSlice
            : ordered.slice(cursor, (cursor += batchSize));

        Promise.allSettled(slice.map((i) => loadSingleFrame(i, isMobile))).then(
          () => {
            if (isCancelled) return;
            setTimeout(pump, isMobile ? 12 : 8);
          }
        );
      };

      pump();
    };

    const bootMode = (isMobile: boolean) => {
      const total = getTotalFrames(isMobile);
      const initialFrame =
        reducedMotion || progressRef.current >= 0.98 ? total - 1 : 0;

      if (initialFrame === 0) {
        void loadSingleFrame(total - 1, isMobile);
      }

      loadSingleFrame(initialFrame, isMobile)
        .then((frame) => {
          if (isCancelled) return;
          if (!frame) {
            setHasError(true);
            return;
          }
          isReadyRef.current = true;
          updateDimensions();
          drawFrame(displayedFrameRef.current || initialFrame, true);

          if (wrapperRef.current) {
            wrapperRef.current.dataset.ready = 'true';
            wrapperRef.current.dataset.duration = '10.000';
            wrapperRef.current.dataset.mode = isMobile ? 'mobile' : 'desktop';
            wrapperRef.current.dataset.frame = String(
              Math.round(displayedFrameRef.current || initialFrame)
            );
          }

          if (reducedMotion) return;

          // Begin off-main-thread decoding immediately after first paint (80ms)
          // so frames are ALREADY GPU-ready before the user even swipes!
          window.setTimeout(() => {
            if (!isCancelled) {
              runBackgroundQueue(isMobile);
            }
          }, 80);
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
        const winW = window.innerWidth;
        const newIsMobile = winW < 768;

        // Ignore vertical-only mobile address-bar collapse/expand resizes so canvas NEVER reallocates mid-scroll!
        if (
          newIsMobile &&
          isMobileRef.current &&
          Math.abs(winW - dimensionsRef.current.windowWidth) <= 2
        ) {
          return;
        }

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
      }, 140);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    const mobileFrames = mobileFramesRef.current;
    const desktopFrames = desktopFramesRef.current;

    return () => {
      isCancelled = true;
      window.clearTimeout(resizeTimer);
      stopScrubLoop();
      window.removeEventListener('resize', handleResize);
      for (let i = 0; i < mobileFrames.length; i++) {
        closeFrame(mobileFrames[i]);
        mobileFrames[i] = null;
      }
      for (let i = 0; i < desktopFrames.length; i++) {
        closeFrame(desktopFrames[i]);
        desktopFrames[i] = null;
      }
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
      className="bg-video-stage fixed top-0 inset-x-0 z-0 w-full overflow-hidden bg-[#060606] pointer-events-none select-none"
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

      {/* Post-hero subtle dimming veil: keeps the frozen final frame of the oven clearly visible behind all sections while preserving crisp text contrast */}
      <div
        ref={veilRef}
        className="absolute inset-0 md:backdrop-blur-[5px] bg-[#060606]/48 md:bg-[#060606]/40 transition-opacity duration-500 pointer-events-none"
        style={{
          opacity: reducedMotion ? 1 : 0,
          visibility: reducedMotion ? 'visible' : 'hidden',
        }}
      />
    </div>
  );
});
