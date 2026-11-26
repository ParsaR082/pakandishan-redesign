export interface HeroTimelineState {
  introCueOpacity: number;
  headlineOpacity: number;
  headlineTranslateY: number;
  detailsOpacity: number;
  detailsTranslateY: number;
  isSettled: boolean;
}

export const DESKTOP_VIDEO_FRAMES = 120;
export const MOBILE_VIDEO_FRAMES = 80;
export const TOTAL_VIDEO_FRAMES = DESKTOP_VIDEO_FRAMES;
export const FRAMES_BASE_PATH = '/assets/frames';

export const VIDEO_SCROLL_CONFIG = {
  desktopDistancePx: 3000,
  tabletDistancePx: 2200,
  mobileDistancePx: 1550,
  endFramePaddingSec: 0.04,
  seekEpsilonSec: 0.014,
  scrubLerpFactor: 0.22,
  mobileScrubLerpFactor: 0.32,
  totalFrames: DESKTOP_VIDEO_FRAMES,
  mobileTotalFrames: MOBILE_VIDEO_FRAMES,
  framesBasePath: FRAMES_BASE_PATH,
} as const;

/**
 * Returns the total frame count for the active viewport mode.
 */
export function getTotalFrames(isMobile = false): number {
  return isMobile ? MOBILE_VIDEO_FRAMES : DESKTOP_VIDEO_FRAMES;
}

/**
 * Returns the URL path for a zero-indexed frame:
 * - desktop: /assets/frames/desktop-opt/frame_0001.webp..frame_0120.webp
 * - mobile:  /assets/frames/mobile-opt/frame_0001.webp..frame_0080.webp
 */
export function getFrameFileName(frameIndex: number, isMobile = false): string {
  const total = getTotalFrames(isMobile);
  const index = Math.max(1, Math.min(total, Math.round(frameIndex) + 1));
  const folder = isMobile ? 'mobile-opt' : 'desktop-opt';
  return `${FRAMES_BASE_PATH}/${folder}/frame_${String(index).padStart(4, '0')}.webp`;
}

/**
 * Maps normalized progress [0..1] directly to integer frame index [0..totalFrames-1].
 */
export function computeTargetFrameIndex(
  progress: number,
  totalFrames = TOTAL_VIDEO_FRAMES
): number {
  const p = clamp01(progress);
  return Math.min(totalFrames - 1, Math.floor(p * totalFrames));
}

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
 * Computes CSS `object-position` for the persistent video canvas.
 * - On desktop (>=1024px, 16:9 widescreen): centered 50% 50% so the oven pulls back and settles
 *   naturally in the left 40% of the frame, leaving the right half dark and clear for copy.
 * - On tablet (768px..1023px): subtle horizontal shift so the oven stays well framed.
 * - On mobile (<768px, 9:16 vertical): calibrated for the dedicated 9:16 portrait video where the
 *   oven settles in the lower half with open dark negative space on top.
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
    const xPct = 50 - p * 8;
    return `${xPct.toFixed(1)}% 50%`;
  }
  // Dedicated 9:16 portrait mobile frames: subtle horizontal and vertical centering
  const xPct = 50 - p * 6;
  const yPct = 50 + p * 3;
  return `${xPct.toFixed(1)}% ${yPct.toFixed(1)}%`;
}

function smoothRange(value: number, start: number, end: number): number {
  if (end <= start) return value >= end ? 1 : 0;
  const t = clamp01((value - start) / (end - start));
  return t * t * (3 - 2 * t);
}

/**
 * Choreographs hero copy transitions strictly synchronized to the 3D camera motion:
 * - 0.00..0.22: Camera close-up on rotating trays & glowing furnace; hero copy hidden so product is hero.
 * - 0.25..0.62: Camera executes 3D pull-back & pivot; oven glides left/lower-left; brand kicker & headline glide in.
 * - 0.48..0.84: Oven settles cleanly; subtitle, CTAs, and metallurgy badges enter with silky ease.
 * - 0.94..1.00: Full settled state reached; unpins smoothly into dashboard.
 */
export function computeHeroTimelinePhases(progress: number): HeroTimelineState {
  const p = clamp01(progress);
  const introCueOpacity = 1 - smoothRange(p, 0.12, 0.28);
  const headlineOpacity = smoothRange(p, 0.25, 0.62);
  const detailsOpacity = smoothRange(p, 0.48, 0.84);

  return {
    introCueOpacity,
    headlineOpacity,
    headlineTranslateY: (1 - headlineOpacity) * 24,
    detailsOpacity,
    detailsTranslateY: (1 - detailsOpacity) * 20,
    isSettled: p >= 0.94,
  };
}
