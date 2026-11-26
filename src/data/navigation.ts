import { Language, TRANSLATIONS } from '../i18n/translations';
import { OFFICIAL_CONTACT, pickLocale } from './pakandishanCatalog';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

const ROUTE_LABELS = {
  export: {
    fa: 'صادرات',
    en: 'Exports',
    ar: 'التصدير',
    tr: 'İhracat',
    ru: 'Экспорт',
  },
  services: {
    fa: 'خدمات پس از فروش',
    en: 'After-Sales',
    ar: 'خدمات ما بعد البيع',
    tr: 'Satış Sonrası',
    ru: 'Сервис',
  },
  blog: {
    fa: 'بلاگ',
    en: 'Blog',
    ar: 'المدونة',
    tr: 'Blog',
    ru: 'Блог',
  },
} as const;

export function getNavItems(lang: Language = 'fa'): NavItem[] {
  const t = (TRANSLATIONS[lang] ?? TRANSLATIONS.fa).nav;
  return [
    { id: 'home', label: t.home, href: '/' },
    { id: 'products', label: t.products, href: '/products' },
    { id: 'about', label: t.about, href: '/about' },
    { id: 'export', label: pickLocale(ROUTE_LABELS.export, lang), href: '/export' },
    { id: 'services', label: pickLocale(ROUTE_LABELS.services, lang), href: '/services' },
    { id: 'blog', label: pickLocale(ROUTE_LABELS.blog, lang), href: '/blog' },
    { id: 'contact', label: t.contact, href: '/contact' },
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
    website: OFFICIAL_CONTACT.website,
    cityPlaceholder: tr.contact.plantAddressValue,
    phonePlaceholder:
      lang === 'fa'
        ? '۰۹۹۶۰۷۸۶۶۱۷'
        : OFFICIAL_CONTACT.consultationPhoneIntl,
    phoneHref: `tel:${OFFICIAL_CONTACT.consultationPhone}`,
    emailPlaceholder: OFFICIAL_CONTACT.email,
  };
}

export const BRAND_INFO = getBrandInfo('fa');
