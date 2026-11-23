import { useEffect, useState } from 'react';
import { Menu, PhoneCall } from 'lucide-react';
import { BRAND_INFO, NAV_ITEMS } from '../../data/navigation';
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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Navbar remains gracefully hidden at the top for the opening cinematic presentation,
      // and slides down gently once intentional scrolling begins (> 90px).
      setIsVisible(window.scrollY > 90);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 pointer-events-none transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'translate-y-0 opacity-100'
          : '-translate-y-[120%] opacity-0'
      }`}
      role="banner"
    >
      <div
        className="pointer-events-auto mx-auto max-w-[1440px] h-[68px] md:h-[76px] px-4 sm:px-8 flex items-center justify-between gap-6 lg:gap-8 rounded-lg glass-nav-scrolled shadow-[0_12px_36px_rgba(0,0,0,0.65)]"
      >
        {/* Right Zone (RTL start): Brand mark + wordmark with choreographed slide-down */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('#hero');
          }}
          className={`flex items-center gap-3 whitespace-nowrap shrink-0 group transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? 'translate-y-0 opacity-100 delay-[100ms]'
              : '-translate-y-3 opacity-0'
          }`}
          aria-label={BRAND_INFO.name}
        >
          <BrandMark className="w-8 h-8 md:w-9 md:h-9 shrink-0 transition-transform duration-200 group-hover:scale-105" />
          <span className="text-[15px] md:text-[17px] font-semibold text-[#f4f0e8] tracking-tight whitespace-nowrap shrink-0">
            {BRAND_INFO.name}
          </span>
        </a>

        {/* Center Zone: Nav items cascading gracefully from top */}
        <nav
          aria-label="منوی اصلی"
          className="hidden lg:flex items-center gap-7 xl:gap-9"
        >
          {NAV_ITEMS.map((item, idx) => {
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
                className={`relative py-2 text-[14px] font-medium whitespace-nowrap shrink-0 transition-[transform,opacity,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
                  className={`absolute bottom-0 right-0 h-[1.5px] bg-[#c5a46d] transition-all duration-200 ${
                    isActive ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Left Zone (RTL end): Primary CTA + Mobile drawer trigger */}
        <div
          className={`flex items-center gap-3 shrink-0 transition-[transform,opacity] duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isVisible
              ? 'translate-y-0 opacity-100 delay-[360ms]'
              : '-translate-y-3 opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate('#contact')}
            className="hidden sm:inline-flex items-center gap-2 h-10 px-5 rounded-md bg-[#c5a46d] text-[#090909] text-[13.5px] font-semibold hover:bg-[#e4c995] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>درخواست مشاوره</span>
          </button>

          <button
            type="button"
            onClick={onOpenMobileMenu}
            aria-label="باز کردن منوی ناوبری"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-[#c5a46d]/25 bg-[#171512] text-[#f4f0e8] hover:border-[#c5a46d]/60 transition-colors cursor-pointer"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
