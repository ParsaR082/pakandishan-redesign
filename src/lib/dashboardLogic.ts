const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/**
 * Formats numbers or numeric strings into Persian digits for cohesive Farsi UI typography.
 */
export function toPersianDigits(value: number | string): string {
  return String(value).replace(/\d/g, (digit) => PERSIAN_DIGITS[Number(digit)] ?? digit);
}

export interface GaugeMetrics {
  clampedRatio: number;
  circumference: number;
  dashOffset: number;
  arcLength: number;
}

/**
 * Computes SVG stroke-dasharray / stroke-dashoffset geometry for a 270-degree industrial gauge arc.
 */
export function computeGaugeArc(
  value: number,
  maxValue: number,
  radius: number,
  sweepRatio = 0.75
): GaugeMetrics {
  const safeMax = maxValue > 0 ? maxValue : 100;
  const clampedRatio = Math.max(0, Math.min(1, value / safeMax));
  const circumference = 2 * Math.PI * radius;
  const arcLength = circumference * sweepRatio;
  const dashOffset = arcLength * (1 - clampedRatio);

  return {
    clampedRatio,
    circumference,
    dashOffset,
    arcLength,
  };
}

/**
 * Computes delta between current and target temperature in Persian-readable format.
 */
export function getTemperatureDeltaLabel(current: number, target: number): string {
  const diff = current - target;
  if (Math.abs(diff) <= 3) {
    return 'در محدوده دمای هدف';
  }
  if (diff < 0) {
    return `${toPersianDigits(Math.abs(diff))} درجه تا دمای هدف`;
  }
  return `${toPersianDigits(diff)} درجه بالاتر از هدف`;
}
