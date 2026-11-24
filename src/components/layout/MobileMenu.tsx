import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Globe, PhoneCall, X } from 'lucide-react';
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
      className="fixed inset-0 z-50 lg:hidden flex justify-start"
    >
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        className="relative z-10 w-[86vw] max-w-[360px] h-full bg-[#0e0d0c]/90 backdrop-blur-2xl rtl:border-l ltr:border-r border-[#c5a46d]/28 flex flex-col justify-between p-6 overflow-y-auto"
      >
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#c5a46d]/18">
            <div className="flex items-center gap-3">
              <BrandMark className="w-8 h-8" />
              <span className="text-base font-semibold text-[#f4f0e8]">
                {t.common.brandName}
              </span>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={t.nav.closeMenu}
              className="w-11 h-11 inline-flex items-center justify-center rounded-md border border-[#c5a46d]/20 text-[#aaa39a] hover:text-[#f4f0e8] hover:border-[#c5a46d]/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Multi-Language Selector in Mobile Menu */}
          <div className="mt-5 pt-3 border-t border-[#c5a46d]/14">
            <div className="flex items-center gap-1.5 text-xs text-[#aaa39a] mb-2.5">
              <Globe className="w-3.5 h-3.5 text-[#c5a46d]" aria-hidden="true" />
              <span>
                {language === 'fa'
                  ? 'انتخاب زبان:'
                  : language === 'ar'
                  ? 'اختر اللغة:'
                  : language === 'tr'
                  ? 'Dil Seçimi:'
                  : language === 'ru'
                  ? 'Выбор языка:'
                  : 'Select Language:'}
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
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-md text-xs transition-colors cursor-pointer border ${
                      isCurrent
                        ? 'bg-[#c5a46d]/20 border-[#c5a46d] text-[#e4c995] font-semibold shadow-sm'
                        : 'bg-[#141311] border-[#c5a46d]/18 text-[#aaa39a] hover:text-[#f4f0e8] hover:border-[#c5a46d]/40'
                    }`}
                  >
                    <span className="text-[11px] font-medium leading-none truncate max-w-full">
                      {item.nativeLabel}
                    </span>
                    <span className="font-mono-tech text-[9px] text-[#77716a] mt-1 uppercase">
                      {item.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <nav aria-label={t.nav.mobileMenuTitle} className="mt-6">
            <ul ref={linksRef} className="space-y-2">
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
                          ? 'bg-[#c5a46d]/12 text-[#e4c995] border border-[#c5a46d]/30'
                          : 'text-[#f4f0e8]/85 hover:bg-[#171512] hover:text-[#f4f0e8]'
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

        <div className="pt-6 border-t border-[#c5a46d]/18 space-y-4">
          <button
            type="button"
            onClick={() => handleSelect('#contact')}
            className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 rounded-md bg-[#c5a46d] text-[#090909] text-sm font-semibold hover:bg-[#e4c995] transition-colors cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" aria-hidden="true" />
            <span>{t.nav.mobileConsultationBtn}</span>
          </button>
          <p className="text-xs text-[#77716a] leading-relaxed">
            {t.common.brandTagline}
          </p>
        </div>
      </div>
    </div>
  );
}
