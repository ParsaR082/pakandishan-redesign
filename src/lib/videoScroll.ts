export interface HeroTimelineState {
  introCueOpacity: number;
  headlineOpacity: number;
  headlineTranslateY: number;
  detailsOpacity: number;
  detailsTranslateY: number;
  isSettled: boolean;
}

export const VIDEO_SCROLL_CONFIG = {
  desktopDistancePx: 3000,
  tabletDistancePx: 2200,
  mobileDistancePx: 1650,
  endFramePaddingSec: 0.04,
  seekEpsilonSec: 0.014,
  scrubLerpFactor: 0.18,
} as const;

export function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(1, value));
}

/**
 * Maps normalized hero scroll progress [0..1] to the exact playback timestamp in seconds.
 * Stops slightly before EOF (`duration - endPadding`) so browsers always hold the crisp final frame
 * instead of blanking out on an ended media buffer.
 */
export function computeTargetVideoTime(
  progress: number,
  duration: number,
  endPadding = VIDEO_SCROLL_CONFIG.endFramePaddingSec
): number {
  if (!Number.isFinite(duration) || duration <= 0) return 0;
  const p = clamp01(progress);
  const safeMax = Math.max(0, duration - Math.min(endPadding, duration * 0.05));
  return p * safeMax;
}

/**
 * Determines whether a new seek is needed to avoid redundant media decoder stalls.
 */
export function shouldSeekVideo(
  currentTime: number,
  targetTime: number,
  epsilon = VIDEO_SCROLL_CONFIG.seekEpsilonSec
): boolean {
  if (!Number.isFinite(currentTime) || !Number.isFinite(targetTime)) return false;
  return Math.abs(currentTime - targetTime) >= epsilon;
}

/**
 * Computes responsive scroll distance (in pixels) for the pinned hero video sequence.
 */
export function getHeroScrollDistance(viewportWidth: number): number {
  if (viewportWidth < 768) return VIDEO_SCROLL_CONFIG.mobileDistancePx;
  if (viewportWidth < 1100) return VIDEO_SCROLL_CONFIG.tabletDistancePx;
  return VIDEO_SCROLL_CONFIG.desktopDistancePx;
}

/**
 * Computes CSS `object-position` for the persistent video layer.
 * On desktop 16:9/wide viewports, keeps natural 50% 50% framing so the oven glides naturally
 * from center (0%) to the left half (100%), leaving the right half clear for RTL Persian copy.
 * On narrow portrait mobile viewports, smoothly pans the horizontal focal point toward the
 * left-settled oven (~30%) so the machine stays framed without distortion or cropping.
 */
export function computeVideoFocalPosition(
  progress: number,
  viewportWidth: number
): string {
  const p = clamp01(progress);
  if (viewportWidth >= 1024) {
    return '50% 50%';
  }
  if (viewportWidth >= 768) {
    const xPct = 50 - p * 10;
    return `${xPct.toFixed(1)}% 50%`;
  }
  // Portrait mobile: track the oven as it glides left from center (50%) to ~31%
  const xPct = 50 - p * 19;
  const yPct = 44 - p * 6;
  return `${xPct.toFixed(1)}% ${yPct.toFixed(1)}%`;
}

function smoothRange(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}

/**
 * Choreographs hero copy transitions strictly synchronized to the actual video timeline:
 * - 0.00..0.22: Machine centered; minimal initial cue only so the oven is unobstructed.
 * - 0.28..0.66: Golden base ring illuminates and oven moves left; brand headline enters on the right.
 * - 0.50..0.88: Oven settles left; description, CTAs, and engineering tags complete cleanly on the right.
 * - 0.94..1.00: Final settled hero state before normal page scrolling begins.
 */
export function computeHeroTimelinePhases(progress: number): HeroTimelineState {
  const p = clamp01(progress);
  const introCueOpacity = 1 - smoothRange(p, 0.14, 0.30);
  const headlineOpacity = smoothRange(p, 0.28, 0.64);
  const detailsOpacity = smoothRange(p, 0.50, 0.86);

  return {
    introCueOpacity,
    headlineOpacity,
    headlineTranslateY: (1 - headlineOpacity) * 28,
    detailsOpacity,
    detailsTranslateY: (1 - detailsOpacity) * 24,
    isSettled: p >= 0.94,
  };
}
