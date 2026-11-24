import { Language } from '../i18n/translations';

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
  lang: Language = 'fa'
): string {
  const diff = current - target;
  if (Math.abs(diff) <= 3) {
    if (lang === 'en') return 'At target temperature';
    if (lang === 'ar') return 'في نطاق درجة الحرارة المستهدفة';
    if (lang === 'tr') return 'Hedef sıcaklık aralığında';
    if (lang === 'ru') return 'В пределах целевой температуры';
    return 'در محدوده دمای هدف';
  }
  if (diff < 0) {
    const absVal = Math.abs(diff);
    if (lang === 'en') return `${absVal}°C below target`;
    if (lang === 'ar') return `${absVal}°C تحت الهدف`;
    if (lang === 'tr') return `${absVal}°C hedefin altında`;
    if (lang === 'ru') return `на ${absVal}°C ниже цели`;
    return `${toPersianDigits(absVal)} درجه تا دمای هدف`;
  }
  if (lang === 'en') return `${diff}°C above target`;
  if (lang === 'ar') return `${diff}°C فوق الهدف`;
  if (lang === 'tr') return `${diff}°C hedefin üzerinde`;
  if (lang === 'ru') return `на ${diff}°C выше цели`;
  return `${toPersianDigits(diff)} درجه بالاتر از هدف`;
}
