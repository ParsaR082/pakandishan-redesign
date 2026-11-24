import test from 'node:test';
import assert from 'node:assert/strict';
import {
  computeTargetVideoTime,
  shouldSeekVideo,
  getHeroScrollDistance,
  computeVideoFocalPosition,
  computeHeroTimelinePhases,
  getFrameFileName,
} from './videoScroll';

test('getFrameFileName resolves desktop and mobile subfolders accurately', () => {
  assert.equal(getFrameFileName(0, false), '/assets/frames/desktop/frame_0001.webp');
  assert.equal(getFrameFileName(239, false), '/assets/frames/desktop/frame_0240.webp');
  assert.equal(getFrameFileName(0, true), '/assets/frames/mobile/frame_0001.webp');
  assert.equal(getFrameFileName(239, true), '/assets/frames/mobile/frame_0240.webp');
});

test('computeTargetVideoTime maps [0..1] accurately and holds safe final frame', () => {
  assert.equal(computeTargetVideoTime(0, 10), 0);
  assert.ok(Math.abs(computeTargetVideoTime(0.5, 10, 0.04) - 4.98) < 1e-6);
  assert.ok(Math.abs(computeTargetVideoTime(1, 10, 0.04) - 9.96) < 1e-6);
  // Clamps out-of-range scroll progress
  assert.equal(computeTargetVideoTime(-0.5, 10), 0);
  assert.ok(Math.abs(computeTargetVideoTime(1.5, 10, 0.04) - 9.96) < 1e-6);
  // Handles uninitialized duration safely
  assert.equal(computeTargetVideoTime(0.5, 0), 0);
  assert.equal(computeTargetVideoTime(0.5, Number.NaN), 0);
});

test('shouldSeekVideo respects epsilon threshold', () => {
  assert.equal(shouldSeekVideo(2.0, 2.005, 0.014), false);
  assert.equal(shouldSeekVideo(2.0, 2.05, 0.014), true);
  assert.equal(shouldSeekVideo(5.0, 4.9, 0.014), true);
});

test('getHeroScrollDistance adapts cleanly to desktop, tablet, and mobile', () => {
  assert.ok(getHeroScrollDistance(1440) > getHeroScrollDistance(900));
  assert.ok(getHeroScrollDistance(900) > getHeroScrollDistance(390));
});

test('computeVideoFocalPosition keeps desktop centered and tracks left-moving oven on mobile', () => {
  assert.equal(computeVideoFocalPosition(0, 1440), '50% 50%');
  assert.equal(computeVideoFocalPosition(1, 1440), '50% 50%');
  assert.equal(computeVideoFocalPosition(0, 390), '50.0% 50.0%');
  assert.equal(computeVideoFocalPosition(1, 390), '44.0% 53.0%');
});

test('computeHeroTimelinePhases keeps intro clean at start and completes at final frame', () => {
  const start = computeHeroTimelinePhases(0);
  assert.equal(start.introCueOpacity, 1);
  assert.equal(start.headlineOpacity, 0);
  assert.equal(start.detailsOpacity, 0);
  assert.equal(start.isSettled, false);

  const mid = computeHeroTimelinePhases(0.55);
  assert.equal(mid.introCueOpacity, 0);
  assert.ok(mid.headlineOpacity > 0.5);
  assert.ok(mid.detailsOpacity > 0 && mid.detailsOpacity < 0.5);
  assert.equal(mid.isSettled, false);

  const end = computeHeroTimelinePhases(1);
  assert.equal(end.introCueOpacity, 0);
  assert.equal(end.headlineOpacity, 1);
  assert.equal(end.detailsOpacity, 1);
  assert.equal(end.headlineTranslateY, 0);
  assert.equal(end.isSettled, true);
});
