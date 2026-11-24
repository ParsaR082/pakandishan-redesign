import React from 'react';
import { Globe, Instagram, Linkedin, Send } from 'lucide-react';
import { getBrandInfo, getNavItems } from '../../data/navigation';
import { getProductCategories } from '../../data/products';
import { BrandMark } from '../ui/BrandMark';
import { useLanguage } from '../../context/LanguageContext';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { language, t } = useLanguage();
  const brandInfo = getBrandInfo(language);
  const navItems = getNavItems(language);
  const productCategories = getProductCategories(language);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <footer
      role="contentinfo"
      className="bg-[#090908]/80 backdrop-blur-xl border-t border-[#c5a46d]/24 pt-16 pb-10"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          {/* Brand Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark className="w-9 h-9" />
              <span className="text-base font-bold text-[#f4f0e8]">
                {brandInfo.name}
              </span>
            </div>
            <p className="text-sm text-[#aaa39a] leading-[1.9] max-w-sm">
              {brandInfo.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://${brandInfo.website}`}
                target="_blank"
                rel="noreferrer"
                aria-label={t.footer.ariaWeb}
                className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/24 flex items-center justify-center text-[#aaa39a] hover:text-[#e4c995] hover:border-[#c5a46d]/55 transition-colors"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                aria-label={t.footer.ariaInstagram}
                className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/24 flex items-center justify-center text-[#aaa39a] hover:text-[#e4c995] hover:border-[#c5a46d]/55 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                aria-label={t.footer.ariaTelegram}
                className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/24 flex items-center justify-center text-[#aaa39a] hover:text-[#e4c995] hover:border-[#c5a46d]/55 transition-colors"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                aria-label={t.footer.ariaLinkedin}
                className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/24 flex items-center justify-center text-[#aaa39a] hover:text-[#e4c995] hover:border-[#c5a46d]/55 transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-[#e4c995] mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-[#aaa39a] hover:text-[#f4f0e8] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-[#e4c995] mb-4">
              {t.footer.categories}
            </h3>
            <ul className="space-y-2.5 text-sm">
              {productCategories.map((cat) => (
                <li key={cat.id}>
                  <a
                    href="#categories"
                    onClick={(e) => handleLinkClick(e, '#categories')}
                    className="text-[#aaa39a] hover:text-[#f4f0e8] transition-colors"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Placeholders */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-[#e4c995] mb-4">
              {t.nav.contact}
            </h3>
            <ul className="space-y-3 text-sm text-[#aaa39a]">
              <li>{t.contact.plantAddressValue || brandInfo.cityPlaceholder}</li>
              <li className="tabular-nums" dir="ltr">{brandInfo.phonePlaceholder}</li>
              <li className="font-mono-tech text-xs">{brandInfo.emailPlaceholder}</li>
              <li>
                <a
                  href={`https://${brandInfo.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#c5a46d] hover:text-[#e4c995] transition-colors font-mono-tech text-xs"
                >
                  {brandInfo.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mb-6" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#77716a]">
          <p>{t.footer.rights}</p>
          <p>{t.footer.subRights}</p>
        </div>
      </div>
    </footer>
  );
}
