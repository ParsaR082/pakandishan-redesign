import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getNavItems } from '../../data/navigation';
import { BrandMark } from '../ui/BrandMark';

interface MobileMenuProps {
  isOpen: boolean;
  activeSection: string;
  onClose: () => void;
  onNavigate: (href: string) => void;
  reducedMotion: boolean;
}

export function MobileMenu({
  isOpen,
  activeSection,
  onClose,
  onNavigate,
  reducedMotion,
}: MobileMenuProps) {
  const { language, isRTL, setLanguage, supportedLanguages, t } = useLanguage();
  const navItems = getNavItems(language);
  const backdropRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
    };
    window.addEventListener('keydown', onKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    if (!reducedMotion && backdropRef.current && drawerRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(backdropRef.current, {
          opacity: 0,
          duration: 0.22,
          ease: 'power2.out',
          clearProps: 'opacity',
        });
        gsap.from(drawerRef.current, {
          x: isRTL ? 28 : -28,
          duration: 0.28,
          ease: 'power3.out',
          clearProps: 'transform',
        });
        if (linksRef.current) {
          gsap.from(linksRef.current.children, {
            x: isRTL ? 14 : -14,
            duration: 0.24,
            stagger: 0.04,
            delay: 0.05,
            ease: 'power2.out',
            clearProps: 'transform',
          });
        }
      });
      return () => {
        ctx.revert();
        window.removeEventListener('keydown', onKeyDown);
        document.body.style.overflow = prevOverflow;
      };
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, reducedMotion, isRTL]);

  if (!isOpen) return null;

  const handleSelect = (href: string) => {
    onClose();
    onNavigate(href);
  };

  return (
    <div
      id="mobile-nav-drawer"
      role="dialog"
      aria-modal="true"
      aria-label={t.nav.mobileMenuTitle}
      className="fixed inset-0 z-50 xl:hidden flex justify-start"
    >
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        className="relative z-10 w-[86vw] max-w-[360px] h-full bg-[#100f0d] rtl:border-l ltr:border-r border-white/10 flex flex-col justify-between p-6 overflow-y-auto text-start"
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <BrandMark className="w-8 h-8" />
              <span className="text-base font-bold text-[#f5f2eb]">
                {t.common.brandName}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.nav.closeMenu}
              className="w-10 h-10 inline-flex items-center justify-center rounded-md border border-white/15 bg-[#141311] text-[#c2bbb0] hover:text-[#f5f2eb] hover:border-[#d4b278]/60 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Multi-Language Selector in Mobile Menu */}
          <div className="mt-6">
            <div className="flex items-center gap-2 text-sm text-[#c2bbb0] mb-3">
              <Globe className="w-4 h-4 text-[#d4b278]" aria-hidden="true" />
              <span>
                {language === 'fa'
                  ? 'انتخاب زبان'
                  : language === 'ar'
                  ? 'اختر اللغة'
                  : language === 'tr'
                  ? 'Dil Seçimi'
                  : language === 'ru'
                  ? 'Выбор языка'
                  : 'Select Language'}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {supportedLanguages.map((item) => {
                const isCurrent = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => setLanguage(item.code)}
                    className={`flex items-center justify-center h-10 rounded-md text-xs font-semibold transition-colors cursor-pointer border ${
                      isCurrent
                        ? 'bg-[#d4b278] border-[#d4b278] text-[#090908]'
                        : 'bg-[#141311] border-white/12 text-[#c2bbb0] hover:text-[#f5f2eb] hover:border-[#d4b278]/50'
                    }`}
                  >
                    <span className="uppercase">{item.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <nav aria-label={t.nav.mobileMenuTitle} className="mt-6">
            <ul ref={linksRef} className="space-y-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelect(item.href);
                      }}
                      className={`flex items-center justify-between min-h-[48px] px-4 rounded-md text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-[#d4b278]/15 text-[#ebd09e] border border-[#d4b278]/40'
                          : 'text-[#f5f2eb] hover:bg-[#1b1916]'
                      }`}
                    >
                      <span>{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-4">
          <button
            type="button"
            onClick={() => handleSelect('/contact')}
            className="w-full h-12 inline-flex items-center justify-center rounded-md bg-[#d4b278] text-[#090908] text-sm font-semibold hover:bg-[#ebd09e] transition-colors cursor-pointer"
          >
            {t.nav.mobileConsultationBtn}
          </button>
          <p className="text-sm text-[#c2bbb0] leading-relaxed">
            {t.common.brandTagline}
          </p>
        </div>
      </div>
    </div>
  );
}
