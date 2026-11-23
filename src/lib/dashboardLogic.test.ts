import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toPersianDigits,
  computeGaugeArc,
  getTemperatureDeltaLabel,
} from './dashboardLogic';

test('toPersianDigits converts Latin digits cleanly', () => {
  assert.equal(toPersianDigits(225), '۲۲۵');
  assert.equal(toPersianDigits('92%'), '۹۲%');
});

test('computeGaugeArc clamps ratios and computes accurate dash offsets', () => {
  const half = computeGaugeArc(50, 100, 60, 0.75);
  assert.equal(half.clampedRatio, 0.5);
  assert.ok(Math.abs(half.dashOffset - half.arcLength * 0.5) < 1e-6);

  const over = computeGaugeArc(150, 100, 60, 0.75);
  assert.equal(over.clampedRatio, 1);
  assert.equal(over.dashOffset, 0);

  const under = computeGaugeArc(-10, 100, 60, 0.75);
  assert.equal(under.clampedRatio, 0);
  assert.equal(under.dashOffset, under.arcLength);
});

test('getTemperatureDeltaLabel describes proximity to target temperature', () => {
  assert.equal(getTemperatureDeltaLabel(228, 230), 'در محدوده دمای هدف');
  assert.equal(getTemperatureDeltaLabel(220, 230), '۱۰ درجه تا دمای هدف');
  assert.equal(getTemperatureDeltaLabel(240, 230), '۱۰ درجه بالاتر از هدف');
});
