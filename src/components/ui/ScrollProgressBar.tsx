import { useEffect, useRef } from 'react';

/**
 * 2px forged-gold GPU reading progress hairline across the top edge of the viewport.
 * Writes directly to ref.current.style.transform on passive scroll — zero React re-renders.
 */
export function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const bar = barRef.current;
      if (!bar) return;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
    };

    const onScroll = () => {
      if (!rafId) rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 z-[60] h-[2px] pointer-events-none"
    >
      <div
        ref={barRef}
        className="h-full w-full bg-gradient-to-l rtl:bg-gradient-to-l ltr:bg-gradient-to-r from-[#ebd09e] via-[#d4b278] to-[#80643c] rtl:origin-right ltr:origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
