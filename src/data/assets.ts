export interface AssetManifestEntry {
  id: string;
  path: string;
  source: 'ai-generated';
  referenceBrand: string;
  section: string;
  altFa: string;
  aspectRatio: '4:3' | '16:9';
}

export const ASSET_MANIFEST: Record<string, AssetManifestEntry> = {
  rotaryOven: {
    id: 'rotary-oven-hero',
    path: '/src/assets/images/rotary_oven_hero_1795428093867.webp',
    source: 'ai-generated',
    referenceBrand: 'pakandishan.com',
    section: 'hero-fallback / dashboard / featured-products / categories',
    altFa: 'تصویر استودیویی فر گردان صنعتی استیل ضدزنگ با شیشه دید محفظه پخت و سینی‌های گردان',
    aspectRatio: '4:3',
  },
  deckOven: {
    id: 'deck-oven-modern',
    path: '/src/assets/images/deck_oven_modern_1795428095017.webp',
    source: 'ai-generated',
    referenceBrand: 'pakandishan.com',
    section: 'featured-products / categories',
    altFa: 'تصویر استودیویی فر طبقاتی مدرن صنعتی با چهار طبقه پخت مستقل و پنل کنترل دیجیتال',
    aspectRatio: '4:3',
  },
  breadLine: {
    id: 'industrial-bread-line',
    path: '/src/assets/images/industrial_bread_line_1795428093874.webp',
    source: 'ai-generated',
    referenceBrand: 'pakandishan.com',
    section: 'featured-products / categories',
    altFa: 'خط و دستگاه تولید نان صنعتی تمام استیل مجهز به نوار انتقال و محفظه پخت',
    aspectRatio: '4:3',
  },
  pastryPrep: {
    id: 'pastry-prep-machinery',
    path: '/src/assets/images/pastry_prep_machinery_1795428094476.webp',
    source: 'ai-generated',
    referenceBrand: 'pakandishan.com',
    section: 'categories',
    altFa: 'تجهیزات آماده‌سازی خمیر و خطوط شیرینی‌پزی شامل خمیرگیر اسپیرال و رول‌کن استیل',
    aspectRatio: '4:3',
  },
  engineeringCloseup: {
    id: 'engineering-closeup-tech',
    path: '/src/assets/images/engineering_closeup_tech_1795428094659.webp',
    source: 'ai-generated',
    referenceBrand: 'pakandishan.com',
    section: 'technology',
    altFa: 'نمای نزدیک مهندسی دقیق مبدل حرارتی و قطعات ماشین‌کاری‌شده استیل صنعتی',
    aspectRatio: '16:9',
  },
  futureShowcase: {
    id: 'future-industrial-showcase',
    path: '/src/assets/images/future_industrial_showcase_1795428116206.webp',
    source: 'ai-generated',
    referenceBrand: 'pakandishan.com',
    section: 'industrial-showcase',
    altFa: 'نمای سالن نمایشگاهی ماشین‌آلات صنعتی پخت نان و شیرینی با نورپردازی گرم طلایی',
    aspectRatio: '16:9',
  },
};
