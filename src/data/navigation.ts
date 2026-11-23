export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'صفحه اصلی', href: '#hero' },
  { id: 'products', label: 'محصولات', href: '#products' },
  { id: 'technology', label: 'فناوری و نوآوری', href: '#technology' },
  { id: 'advantages', label: 'درباره ما', href: '#advantages' },
  { id: 'contact', label: 'تماس با ما', href: '#contact' },
];

export const BRAND_INFO = {
  name: 'گروه صنعتی پاک‌اندیشان',
  shortName: 'پاک‌اندیشان',
  tagline: 'نوآوری در صنعت نان و شیرینی',
  description:
    'طراحی و تولید ماشین‌آلات صنعتی با تکیه بر مهندسی دقیق، فناوری روز و استانداردهای حرفه‌ای تولید.',
  website: 'pakandishan.com',
  cityPlaceholder: 'شهرک صنعتی ارومیه — ایران',
  phonePlaceholder: '۰۴۴-۳۲۲۲۰۰۰۰ (نمونه جهت جایگزینی)',
  emailPlaceholder: 'info@pakandishan.com',
};
