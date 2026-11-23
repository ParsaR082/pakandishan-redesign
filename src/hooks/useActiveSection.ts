import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'hero');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let ticking = false;
    let rafId = 0;

    const evaluateActiveSection = () => {
      ticking = false;
      const scrollMarker = window.scrollY + window.innerHeight * 0.32;
      let current = sectionIds[0] ?? 'hero';

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (scrollMarker >= top) {
          current = id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        rafId = requestAnimationFrame(evaluateActiveSection);
      }
    };

    evaluateActiveSection();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [sectionIds]);

  return activeId;
}
