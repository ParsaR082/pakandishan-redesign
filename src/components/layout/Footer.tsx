import React from 'react';
import { getBrandInfo, getNavItems } from '../../data/navigation';
import { CATALOG_CATEGORIES, pickLocale } from '../../data/pakandishanCatalog';
import { BrandMark } from '../ui/BrandMark';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { language, t } = useLanguage();
  const brandInfo = getBrandInfo(language);
  const navItems = getNavItems(language);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <footer
      role="contentinfo"
      className="bg-[#090908]/82 pt-20 pb-12"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-5 text-start">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-flex items-center gap-3 group"
            >
              <BrandMark className="w-8 h-8" />
              <span className="text-base font-bold text-[#f5f2eb] group-hover:text-[#ebd09e] transition-colors">
                {brandInfo.name}
              </span>
            </a>
            <p className="text-sm sm:text-[15px] text-[#c2bbb0] leading-[1.85] max-w-sm">
              {t.footer.tagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2 text-start">
            <h3 className="text-sm font-semibold text-[#f5f2eb] mb-5">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="link-kinetic text-[#c2bbb0] hover:text-[#ebd09e] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Real Pakandishan Product Categories */}
          <div className="lg:col-span-3 text-start">
            <h3 className="text-sm font-semibold text-[#f5f2eb] mb-5">
              {t.footer.categories}
            </h3>
            <ul className="space-y-3 text-sm">
              {CATALOG_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/products?category=${cat.id}`}
                    onClick={(e) => handleLinkClick(e, `/products?category=${cat.id}`)}
                    className="link-kinetic text-[#c2bbb0] hover:text-[#ebd09e] transition-colors"
                  >
                    {pickLocale(cat.title, language)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Official Contact Details */}
          <div className="lg:col-span-3 text-start">
            <h3 className="text-sm font-semibold text-[#f5f2eb] mb-5">
              {t.nav.contact}
            </h3>
            <ul className="space-y-3 text-sm text-[#c2bbb0]">
              <li className="leading-relaxed">
                {t.contact.plantAddressValue || brandInfo.cityPlaceholder}
              </li>
              <li className="tabular-nums">
                <a
                  href={brandInfo.phoneHref}
                  dir="ltr"
                  className="inline-block text-[#ebd09e] hover:text-[#f5f2eb] font-medium transition-colors"
                >
                  {brandInfo.phonePlaceholder}
                </a>
              </li>
              <li>{brandInfo.emailPlaceholder}</li>
              <li>
                <a
                  href={`https://${brandInfo.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#d4b278] hover:text-[#ebd09e] underline-offset-4 hover:underline transition-colors"
                >
                  {brandInfo.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px w-full bg-white/10 mb-8" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-[#c2bbb0]">
          <p>{t.footer.rights}</p>
          <p>{t.footer.subRights}</p>
        </div>
      </div>
    </footer>
  );
}
