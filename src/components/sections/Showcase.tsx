import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ASSET_MANIFEST } from '../../data/assets';
import { SafeImage } from '../ui/SafeImage';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseSectionProps {
  onNavigate: (href: string) => void;
  reducedMotion: boolean;
}

export function ShowcaseSection({ onNavigate, reducedMotion }: ShowcaseSectionProps) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !bgRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { yPercent: -8, scale: 1.08 },
        {
          yPercent: 8,
          scale: 1.08,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="showcase"
      ref={sectionRef}
      aria-labelledby="showcase-heading"
      className="relative scroll-mt-24 py-20 lg:py-28 w-full overflow-hidden glass-band-alt border-t border-[#c5a46d]/20"
    >
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-8">
        <div className="relative rounded-xl overflow-hidden glass-surface-strong border border-[#c5a46d]/28 min-h-[460px] lg:min-h-[520px] flex items-center">
          {/* Parallax Architectural Hall Visual contained within the framed glass card */}
          <div
            ref={bgRef}
            className="absolute inset-0 w-full h-full will-change-transform opacity-45"
            aria-hidden="true"
          >
            <SafeImage
              src={ASSET_MANIFEST.futureShowcase.path}
              alt={ASSET_MANIFEST.futureShowcase.altFa}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Layered dark architectural scrims + warm champagne vignette */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,0.72)_0%,rgba(8,8,7,0.58)_50%,rgba(8,8,7,0.86)_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,164,109,0.14)_0%,transparent_65%)]"
          />

          <div className="relative z-10 w-full py-16 px-6 sm:px-10">
            <div className="max-w-3xl mx-auto text-center border-y border-[#c5a46d]/30 py-10 sm:py-14 px-4">
              <p className="text-xs font-medium text-[#e4c995] mb-4">
                {t.showcase.badge}
              </p>
              <h2
                id="showcase-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f4f0e8] leading-[1.3] mb-6"
              >
                {t.showcase.title}
              </h2>
              <p className="text-sm sm:text-base text-[#f4f0e8]/85 leading-[1.9] max-w-2xl mx-auto mb-9">
                {t.showcase.description}
              </p>

              <button
                type="button"
                onClick={() => onNavigate('#contact')}
                className="inline-flex items-center justify-center gap-2.5 h-12 px-7 rounded-md bg-[#c5a46d] text-[#090909] text-sm font-semibold hover:bg-[#e4c995] transition-colors cursor-pointer"
              >
                <span>{t.showcase.cta}</span>
                <ArrowLeft className="w-4 h-4 rtl:rotate-0 ltr:rotate-180" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
