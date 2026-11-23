import { Globe, Instagram, Linkedin, Send } from 'lucide-react';
import { BRAND_INFO, NAV_ITEMS } from '../../data/navigation';
import { PRODUCT_CATEGORIES } from '../../data/products';
import { BrandMark } from '../ui/BrandMark';

interface FooterProps {
  onNavigate: (href: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
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
                {BRAND_INFO.name}
              </span>
            </div>
            <p className="text-sm text-[#aaa39a] leading-[1.9] max-w-sm">
              {BRAND_INFO.description}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://${BRAND_INFO.website}`}
                target="_blank"
                rel="noreferrer"
                aria-label="وب‌سایت رسمی پاک‌اندیشان"
                className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/24 flex items-center justify-center text-[#aaa39a] hover:text-[#e4c995] hover:border-[#c5a46d]/55 transition-colors"
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                aria-label="ارتباط در اینستاگرام"
                className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/24 flex items-center justify-center text-[#aaa39a] hover:text-[#e4c995] hover:border-[#c5a46d]/55 transition-colors"
              >
                <Instagram className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                aria-label="ارتباط در تلگرام"
                className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/24 flex items-center justify-center text-[#aaa39a] hover:text-[#e4c995] hover:border-[#c5a46d]/55 transition-colors"
              >
                <Send className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                aria-label="صفحه لینکدین"
                className="w-10 h-10 rounded-md bg-black/45 border border-[#c5a46d]/24 flex items-center justify-center text-[#aaa39a] hover:text-[#e4c995] hover:border-[#c5a46d]/55 transition-colors"
              >
                <Linkedin className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-[#e4c995] mb-4">
              دسترسی سریع
            </h3>
            <ul className="space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
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
              دسته‌بندی محصولات
            </h3>
            <ul className="space-y-2.5 text-sm">
              {PRODUCT_CATEGORIES.map((cat) => (
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
              اطلاعات تماس
            </h3>
            <ul className="space-y-3 text-sm text-[#aaa39a]">
              <li>{BRAND_INFO.cityPlaceholder}</li>
              <li className="tabular-nums">{BRAND_INFO.phonePlaceholder}</li>
              <li className="font-mono-tech text-xs">{BRAND_INFO.emailPlaceholder}</li>
              <li>
                <a
                  href={`https://${BRAND_INFO.website}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#c5a46d] hover:text-[#e4c995] transition-colors font-mono-tech text-xs"
                >
                  {BRAND_INFO.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="gold-divider mb-6" aria-hidden="true" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#77716a]">
          <p>© تمامی حقوق برای {BRAND_INFO.name} محفوظ است.</p>
          <p>تصاویر نمایش داده‌شده با هدف ارائه کانسپت صنعتی طراحی شده‌اند.</p>
        </div>
      </div>
    </footer>
  );
}
