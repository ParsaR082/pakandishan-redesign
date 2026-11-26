import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Globe, Menu } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getNavItems } from '../../data/navigation';
import { BrandMark } from '../ui/BrandMark';
import { KineticButton } from '../ui/KineticButton';

interface NavbarProps {
  activeSection: string;
  onNavigate: (href: string) => void;
  onOpenMobileMenu: () => void;
  mobileMenuOpen: boolean;
  forceVisible?: boolean;
}

export function Navbar({
  activeSection,
  onNavigate,
  onOpenMobileMenu,
  mobileMenuOpen,
  forceVisible = false,
}: NavbarProps) {
  const { language, setLanguage, supportedLanguages, t } = useLanguage();
  const [isVisible, setIsVisible] = useState(forceVisible);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const navItems = getNavItems(language);

  useEffect(() => {
    if (forceVisible) {
      setIsVisible(true);
      return;
    }
    let lastVisible = window.scrollY > 90;
    setIsVisible(lastVisible);
    const onScroll = () => {
      const shouldBeVisible = window.scrollY > 90;
      if (shouldBeVisible !== lastVisible) {
        lastVisible = shouldBeVisible;
        setIsVisible(shouldBeVisible);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceVisible]);

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
      className={`fixed top-0 inset-x-0 z-50 px-3 sm:px-6 lg:px-10 pt-3 pointer-events-none transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-[120%] opacity-0'
      }`}
      role="banner"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-[1200px] h-[60px] sm:h-[68px] px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 sm:gap-4 rounded-lg glass-nav-scrolled">
        {/* Brand mark + wordmark (safely truncates on tiny viewports so controls never overflow) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('/');
          }}
          className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink group py-1 rounded-md"
        >
          <BrandMark className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 relative z-10 transition-transform duration-200 group-hover:scale-105" />
          <span className="font-bold text-sm sm:text-base text-[#f5f2eb] group-hover:text-[#ebd09e] transition-colors truncate">
            {t.common.brandShortName}
          </span>
        </a>

        {/* Desktop Navigation Links (shown at xl >= 1280px so all 7 links fit comfortably in all 5 languages) */}
        <nav
          aria-label={t.common.brandName}
          className="hidden xl:flex items-center justify-center gap-5 2xl:gap-6 text-sm min-w-0"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.href);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative py-2 transition-colors duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#ebd09e] font-semibold'
                    : 'text-[#c2bbb0] hover:text-[#f5f2eb]'
                }`}
              >
                <span className="kinetic-roll">
                  <span className="kinetic-roll-line kinetic-roll-line--main">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="kinetic-roll-line kinetic-roll-line--clone text-[#ebd09e]"
                  >
                    {item.label}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-[2px] bg-[#d4b278] transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)] origin-center ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Action Zone: Multi-Language Selector + Desktop CTA (strictly wrapper-hidden on mobile) + Drawer Trigger */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="relative shrink-0" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen((prev) => !prev)}
              aria-expanded={langDropdownOpen}
              aria-haspopup="listbox"
              aria-label="Select Language"
              className="inline-flex items-center gap-1.5 h-9 sm:h-10 px-2.5 sm:px-3 rounded-md border border-white/15 bg-[#141311] hover:bg-[#1f1d1a] hover:border-[#d4b278]/60 text-xs sm:text-sm font-medium text-[#f5f2eb] transition-colors cursor-pointer select-none"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4b278] shrink-0" aria-hidden="true" />
              <span className="uppercase">{language}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#c2bbb0] shrink-0 transition-transform duration-200 ${
                  langDropdownOpen ? 'rotate-180 text-[#ebd09e]' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {langDropdownOpen && (
              <div
                role="listbox"
                className="absolute top-full mt-2 rtl:left-0 ltr:right-0 z-50 w-40 py-1.5 rounded-lg bg-[#141311] border border-white/15"
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
                      className={`w-full flex items-center justify-between px-3.5 py-2 text-sm transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#d4b278]/20 text-[#ebd09e] font-semibold'
                          : 'text-[#c2bbb0] hover:bg-[#1f1d1a] hover:text-[#f5f2eb]'
                      }`}
                    >
                      <span>{item.nativeLabel}</span>
                      <span className="text-xs text-[#c2bbb0]/80 uppercase">
                        {item.shortLabel}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Wrapper hides CTA reliably below md (768px) without conflicting with KineticButton's inline-flex */}
          <div className="hidden md:block shrink-0">
            <KineticButton
              size="sm"
              variant="primary"
              onClick={() => onNavigate('/contact')}
            >
              {t.common.requestConsultation}
            </KineticButton>
          </div>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label={t.nav.mobileMenuTitle}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="xl:hidden inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-md border border-white/15 bg-[#141311] text-[#f5f2eb] hover:bg-[#1f1d1a] hover:border-[#d4b278]/60 transition-colors shrink-0 cursor-pointer"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
