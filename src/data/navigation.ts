import { Language, TRANSLATIONS } from '../i18n/translations';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export function getNavItems(lang: Language = 'fa'): NavItem[] {
  const t = (TRANSLATIONS[lang] ?? TRANSLATIONS.fa).nav;
  return [
    { id: 'hero', label: t.home, href: '#hero' },
    { id: 'technology', label: t.technology, href: '#technology' },
    { id: 'products', label: t.products, href: '#products' },
    { id: 'advantages', label: t.about, href: '#advantages' },
    { id: 'contact', label: t.contact, href: '#contact' },
  ];
}

export const NAV_ITEMS: NavItem[] = getNavItems('fa');

export function getBrandInfo(lang: Language = 'fa') {
  const tr = TRANSLATIONS[lang] ?? TRANSLATIONS.fa;
  return {
    name: tr.common.brandName,
    shortName: tr.common.brandShortName,
    tagline: tr.common.brandTagline,
    description: tr.common.brandDescription,
    website: tr.common.officialWebsite,
    cityPlaceholder: tr.contact.plantAddressValue,
    phonePlaceholder: lang === 'fa' ? '۰۴۴-۳۲۲۲۰۰۰۰' : '+98 44 3222 0000',
    emailPlaceholder: 'info@pakandishan.com',
  };
}

export const BRAND_INFO = getBrandInfo('fa');
