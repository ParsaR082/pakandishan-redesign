import { Language } from '../i18n/translations';

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export function getNavItems(lang: Language = 'fa'): NavItem[] {
  if (lang === 'en') {
    return [
      { id: 'hero', label: 'Home', href: '#hero' },
      { id: 'technology', label: 'Technology', href: '#technology' },
      { id: 'products', label: 'Products', href: '#products' },
      { id: 'advantages', label: 'About Us', href: '#advantages' },
      { id: 'contact', label: 'Contact', href: '#contact' },
    ];
  }
  return [
    { id: 'hero', label: 'صفحه اصلی', href: '#hero' },
    { id: 'technology', label: 'فناوری و نوآوری', href: '#technology' },
    { id: 'products', label: 'محصولات', href: '#products' },
    { id: 'advantages', label: 'درباره ما', href: '#advantages' },
    { id: 'contact', label: 'تماس با ما', href: '#contact' },
  ];
}

export const NAV_ITEMS: NavItem[] = getNavItems('fa');

export function getBrandInfo(lang: Language = 'fa') {
  if (lang === 'en') {
    return {
      name: 'Pakandishan Industrial Group',
      shortName: 'Pakandishan',
      tagline: 'Pioneering Industrial Bakery & Confectionery Systems',
      description:
        'Engineering and manufacturing heavy-duty industrial machinery engineered for thermal efficiency, metallurgical durability, and continuous bakery production.',
      website: 'pakandishan.com',
      cityPlaceholder: 'Phase 1 Industrial Zone, Urmia — Iran',
      phonePlaceholder: '+98 44 3222 0000',
      emailPlaceholder: 'info@pakandishan.com',
    };
  }
  return {
    name: 'گروه صنعتی پاک‌اندیشان',
    shortName: 'پاک‌اندیشان',
    tagline: 'نوآوری در صنعت نان و شیرینی',
    description:
      'طراحی و تولید ماشین‌آلات صنعتی با تکیه بر مهندسی دقیق، فناوری روز و استانداردهای حرفه‌ای تولید.',
    website: 'pakandishan.com',
    cityPlaceholder: 'شهرک صنعتی ارومیه — ایران',
    phonePlaceholder: '۰۴۴-۳۲۲۲۰۰۰۰',
    emailPlaceholder: 'info@pakandishan.com',
  };
}

export const BRAND_INFO = getBrandInfo('fa');
