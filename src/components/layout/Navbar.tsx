import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe, Menu, PhoneCall } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getNavItems } from '../../data/navigation';
import { BrandMark } from '../ui/BrandMark';

interface NavbarProps {
  activeSection: string;
  onNavigate: (href: string) => void;
  onOpenMobileMenu: () => void;
  mobileMenuOpen: boolean;
}

export function Navbar({
  activeSection,
  onNavigate,
  onOpenMobileMenu,
  mobileMenuOpen,
}: NavbarProps) {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const navItems = getNavItems(language);

  useEffect(() => {
    let lastVisible = false;
    const onScroll = () => {
      const shouldBeVisible = window.scrollY > 90;
      if (shouldBeVisible !== lastVisible) {
        lastVisible = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close language dropdown on outside click or escape
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target as Node)
      ) {
        setLangDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [langDropdownOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 px-2 sm:px-6 pt-2 sm:pt-3 pointer-events-none transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-[120%] opacity-0'
      }`}
      role="banner"
    >
      <div
        className="pointer-events-auto mx-auto max-w-[1440px] h-[60px] sm:h-[68px] md:h-[76px] px-3 sm:px-8 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8 rounded-lg glass-nav-scrolled shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
      >
        {/* Brand mark + wordmark with choreographed slide-down and Furnace Ember Glow */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#hero');
          }}
          className={`relative flex items-center gap-2 sm:gap-3 whitespace-nowrap shrink-0 group transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] py-1.5 px-1 sm:px-2 rounded-lg ${
            isVisible
              ? 'translate-y-0 opacity-100 delay-[100ms]'
              : '-translate-y-3 opacity-0'
          }`}
        >
          {/* Animated ember glow aura behind brand name */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -inset-x-2 rounded-lg bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18)_0%,rgba(228,201,149,0.14)_35%,rgba(197,164,109,0.06)_60%,transparent_80%)] blur-[10px] pointer-events-none animate-ember-pulse"
          />

          <BrandMark className="w-7 h-7 sm:w-9 sm:h-9 relative z-10 transition-transform duration-300 group-hover:scale-105" />

          <div className="relative z-10 flex flex-col leading-tight">
            <span className="font-extrabold text-[13.5px] sm:text-base tracking-tight text-[#f4f0e8] drop-shadow-[0_2px_12px_rgba(255,255,255,0.45)] group-hover:text-white transition-colors">
              {t.common.brandName}
            </span>
            <span className="hidden sm:block text-[11px] sm:text-xs text-[#c5a46d] font-normal tracking-wide opacity-90">
              {t.common.brandTagline}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links: staggered entrance */}
        <nav
          aria-label={t.common.brandName}
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm"
        >
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.href);
                }}
                className={`relative py-1 font-medium transition-[color,transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : '-translate-y-3 opacity-0'
                } ${
                  isActive
                    ? 'text-[#e4c995]'
                    : 'text-[#aaa39a] hover:text-[#f4f0e8]'
                }`}
                style={{
                  transitionDelay: isVisible ? `${140 + idx * 45}ms` : '0ms',
                }}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0 inset-x-0 h-[1.5px] bg-[#c5a46d] transition-[width,opacity] duration-200 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Action Zone: Multi-Language Selector + Primary CTA + Mobile drawer trigger */}
        <div
          className={`flex items-center gap-1.5 sm:gap-3 shrink-0 transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? 'translate-y-0 opacity-100 delay-[360ms]'
              : '-translate-y-3 opacity-0'
          }`}
        >
          {/* Multi-Language Dropdown Menu */}
          <div className="relative shrink-0" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select Language"
              className="inline-flex items-center gap-1 sm:gap-1.5 h-8 sm:h-10 px-2 sm:px-3 rounded-md border border-[#c5a46d]/28 bg-[#12110f]/80 hover:bg-[#1d1a16] hover:border-[#c5a46d]/60 text-[11px] sm:text-xs font-semibold text-[#e4c995] transition-colors cursor-pointer select-none"
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c5a46d]" aria-hidden="true" />
              <span className="font-mono-tech tracking-wider uppercase">
                {language}
              </span>
              <ChevronDown
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#aaa39a] transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180 text-[#e4c995]' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {langDropdownOpen && (
              <div
                role="listbox"
                className="absolute top-full mt-2 rtl:left-0 ltr:right-0 z-50 w-36 py-1.5 rounded-lg bg-[#0e0d0c]/95 backdrop-blur-2xl border border-[#c5a46d]/35 shadow-[0_16px_40px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-150"
              >
                {supportedLanguages.map((item) => {
                  const isCurrent = language === item.code;
                  return (
                    <button
                      key={item.code}
                      type="button"
                      role="option"
                      aria-selected={isCurrent}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#c5a46d]/20 text-[#e4c995] font-semibold'
                          : 'text-[#aaa39a] hover:bg-[#1a1815] hover:text-[#f4f0e8]'
                      }`}
                    >
                      <span>{item.nativeLabel}</span>
                      <span className="font-mono-tech text-[10px] text-[#77716a] uppercase">
                        {item.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('#contact')}
            className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-md bg-[#c5a46d] text-[#090909] text-[13.5px] font-semibold hover:bg-[#e4c995] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{t.common.requestConsultation}</span>
          </button>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label={t.nav.closeMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="lg:hidden inline-flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 rounded-md border border-[#c5a46d]/25 bg-[#171512] text-[#f4f0e8] hover:border-[#c5a46d]/60 transition-colors shrink-0 cursor-pointer"
          >
            <Menu className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
