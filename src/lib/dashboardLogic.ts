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
 * Computes delta between current and target temperature in localized format.
 */
export function getTemperatureDeltaLabel(
  current: number,
  target: number,
  lang: 'fa' | 'en' = 'fa'
): string {
  const diff = current - target;
  if (Math.abs(diff) <= 3) {
    return lang === 'en' ? 'At target temperature' : 'در محدوده دمای هدف';
  }
  if (diff < 0) {
    const absVal = Math.abs(diff);
    return lang === 'en'
      ? `${absVal}°C below target`
      : `${toPersianDigits(absVal)} درجه تا دمای هدف`;
  }
  return lang === 'en'
    ? `${diff}°C above target`
    : `${toPersianDigits(diff)} درجه بالاتر از هدف`;
}
