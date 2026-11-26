import { useEffect, useRef, useState } from 'react';
import { toPersianDigits } from '../../lib/dashboardLogic';

interface AnimatedStatValueProps {
  rawValue: string;
  usePersianDigits: boolean;
  className?: string;
}

/**
 * Scroll-triggered numeric counter that smoothly eases from 0 -> target once on viewport entry.
 * Preserves '+' prefix/suffix and localized Persian/Latin digits; stays static under reduced motion.
 */
export function AnimatedStatValue({
  rawValue,
  usePersianDigits,
  className = '',
}: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(rawValue);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    setDisplay(rawValue);
  }, [rawValue]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(rawValue);
      return;
    }

    // Parse ASCII digits out of Persian or Latin value string (e.g. "+۵۰۰۰" or "5,000+")
    const ascii = rawValue
      .replace(/[۰-۹]/g, (d) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(d)))
      .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)));
    const match = ascii.match(/(\d[\d,]*)/);
    if (!match) return;

    const targetNum = parseInt(match[1].replace(/,/g, ''), 10);
    if (!Number.isFinite(targetNum) || targetNum <= 0) return;

    const hasLeadingPlus = rawValue.startsWith('+');
    const hasTrailingPlus = rawValue.endsWith('+');
    const hasCommas = ascii.includes(',');

    const formatVal = (n: number) => {
      const formatted = hasCommas ? n.toLocaleString('en-US') : String(n);
      const localized = usePersianDigits ? toPersianDigits(formatted) : formatted;
      return `${hasLeadingPlus ? '+' : ''}${localized}${hasTrailingPlus ? '+' : ''}`;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;
        observer.disconnect();

        const duration = 950;
        const start = performance.now();

        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // Strong ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          const current = Math.max(1, Math.round(targetNum * eased));
          setDisplay(formatVal(current));
          if (t < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(rawValue);
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rawValue, usePersianDigits]);

  return (
    <span ref={ref} className={className} dir="ltr">
      {display}
    </span>
  );
}
