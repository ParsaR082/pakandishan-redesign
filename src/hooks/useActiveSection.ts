import { useEffect, useState } from 'react';

/**
 * Tracks the active page section using IntersectionObserver (zero forced layout /
 * zero getBoundingClientRect calls on scroll) with a MutationObserver fallback
 * for lazily-mounted sections.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? 'hero');

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const visibleMap = new Map<string, number>();
    const observed = new Set<Element>();

    const pickActive = () => {
      let bestId = '';
      let bestRatio = 0;
      for (const id of sectionIds) {
        const ratio = visibleMap.get(id) ?? 0;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      }
      if (bestId) {
        setActiveId((prev) => (prev === bestId ? prev : bestId));
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (!id) continue;
          if (entry.isIntersecting) {
            visibleMap.set(id, entry.intersectionRatio || 0.01);
          } else {
            visibleMap.delete(id);
          }
        }
        pickActive();
      },
      {
        rootMargin: '-28% 0px -52% 0px',
        threshold: [0, 0.15, 0.4, 0.7],
      }
    );

    const observeAll = () => {
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observed.add(el);
          observer.observe(el);
        }
      }
    };

    observeAll();

    // Observe DOM additions so lazy-loaded sections get registered automatically
    const mutationObserver = new MutationObserver(() => {
      if (observed.size < sectionIds.length) {
        observeAll();
      } else {
        mutationObserver.disconnect();
      }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeId;
}
