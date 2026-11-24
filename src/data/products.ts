import { ASSET_MANIFEST } from './assets';
import { Language, TRANSLATIONS } from '../i18n/translations';

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  applications: string[];
  structureNote: string;
}

export interface ProductCategoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  targetProductId: string;
}

export interface TechPillar {
  number: string;
  title: string;
  description: string;
  iconKey: 'compass' | 'cpu' | 'sliders' | 'shield';
}

export interface CompanyAdvantage {
  id: string;
  title: string;
  description: string;
  iconKey: 'layers' | 'crosshair' | 'headphones' | 'award' | 'sparkles';
}

export interface DashboardProfile {
  id: string;
  label: string;
  machineLabel: string;
  temperature: number;
  targetTemperature: number;
  maxTemperature: number;
  efficiency: number;
  dailyEnergyKwh: number;
  energyIndexLabel: string;
  energySavedPercent: number;
  statusHeating: string;
  statusControl: string;
  statusOperation: string;
  statusReadiness: string;
  productionSeries: Array<{
    hour: string;
    output: number;
    target: number;
  }>;
}

export const FEATURED_PRODUCTS: ProductItem[] = [
  {
    id: 'rotary-oven',
    name: 'فر گردان صنعتی',
    category: 'تجهیزات پخت صنعتی',
    shortDescription:
      'ساختار تمام استیل با گردش یکنواخت حرارت و سیستم بخار قدرتمند، مناسب کارگاه‌های تولیدی و خطوط پخت پیوسته.',
    fullDescription:
      'فر گردان صنعتی پاک‌اندیشان با هدف ایجاد پخت یکنواخت در تمامی سینی‌ها طراحی شده است. چرخش منظم کالسکه در کنار کنترل دقیق جریان هوای گرم و بخار، کیفیت یکدستی برای انواع نان‌های فانتزی، شیرینی خشک، کیک و کلوچه فراهم می‌کند.',
    image: ASSET_MANIFEST.rotaryOven.path,
    imageAlt: ASSET_MANIFEST.rotaryOven.altFa,
    highlights: [
      'بدنه و محفظه پخت با ورق استیل ضدزنگ صنعتی',
      'درب شیشه‌ای مقاوم به حرارت با دید کامل از فرآیند پخت',
      'سیستم تولید بخار یکنواخت برای بهبود بافت و رنگ محصول',
      'تابلو کنترل دیجیتال برای تنظیم دقیق دما، زمان و چرخه بخار',
    ],
    applications: ['نان‌های فانتزی و حجیم', 'انواع شیرینی خشک و تر', 'کیک و کلوچه صنعتی'],
    structureNote:
      'مشخصات دقیق ابعاد، ظرفیت دیس و نوع سوخت بر اساس نیاز خط تولید و کاتالوگ فنی شرکت ارائه می‌شود.',
  },
  {
    id: 'modern-deck-oven',
    name: 'فر طبقاتی مدرن',
    category: 'تجهیزات خطوط شیرینی',
    shortDescription:
      'پخت مستقل در هر طبقه با کنترل جداگانه دمای بالا و پایین جهت تولید محصولات متنوع نان و قنادی.',
    fullDescription:
      'فر طبقاتی مدرن برای واحدهای تولیدی طراحی شده که هم‌زمان به پخت محصولات متنوع با پروفیل‌های حرارتی متفاوت نیاز دارند. عایق‌بندی حرارتی اصولی و دسترسی ارگونومیک به هر طبقه، ثبات کیفیت پخت را تضمین می‌کند.',
    image: ASSET_MANIFEST.deckOven.path,
    imageAlt: ASSET_MANIFEST.deckOven.altFa,
    highlights: [
      'امکان تنظیم مستقل دما در هر طبقه پخت',
      'شیشه‌های نسوز با نورپردازی داخلی برای پایش دقیق رنگ پخت',
      'عایق‌بندی حرارتی چندلایه جهت کاهش اتلاف انرژی',
      'طراحی ماژولار متناسب با فضای کارگاه و قنادی‌های حرفه‌ای',
    ],
    applications: ['نان‌های حجیم و نیمه‌حجیم', 'شیرینی‌های تخصصی و پای', 'محصولات قنادی حساس به دما'],
    structureNote:
      'تعداد طبقات، توان حرارتی و تجهیزات جانبی مطابق سفارش خط تولید پیکربندی می‌گردد.',
  },
  {
    id: 'industrial-bread-line',
    name: 'دستگاه تولید نان صنعتی',
    category: 'ماشین‌آلات تولید نان',
    shortDescription:
      'راهکار یکپارچه از مرحله آماده‌سازی و شکل‌دهی خمیر تا پخت مستمر در خطوط تولید نان سنتی و صنعتی.',
    fullDescription:
      'خطوط و ماشین‌آلات تولید نان صنعتی پاک‌اندیشان با تمرکز بر پیوستگی فرآیند، کاهش ضایعات خمیر و بهداشت محیط تولید مهندسی شده‌اند. هماهنگی دقیق میان واحدهای پهن‌کن، برش، انتقال و پخت موجب نظم کامل در تولید روزانه می‌شود.',
    image: ASSET_MANIFEST.breadLine.path,
    imageAlt: ASSET_MANIFEST.breadLine.altFa,
    highlights: [
      'هماهنگی پیوسته میان بخش آماده‌سازی، انتقال و پخت',
      'قطعات در تماس با خمیر از متریال بهداشتی و قابل شستشو',
      'تنظیم سرعت خط متناسب با نوع خمیر و ضخامت محصول',
      'طراحی صنعتی مقاوم برای بهره‌برداری در شیفت‌های طولانی',
    ],
    applications: ['خطوط پخت نان سنتی مکانیزه', 'نان‌های مسطح و صنعتی', 'واحدهای تامین نان سازمانی'],
    structureNote:
      'چیدمان خط و ظرفیت تولید پس از بررسی فضای سالن توسط تیم مهندسی فروش تعیین می‌شود.',
  },
];

export const PRODUCT_CATEGORIES: ProductCategoryItem[] = [
  {
    id: 'baking-equipment',
    title: 'تجهیزات پخت صنعتی',
    subtitle: 'فرهای گردان، مینی فر و تنورهای دوار',
    description:
      'انواع فرهای گردان و سیستم‌های پخت با انتقال حرارت غیرمستقیم برای کیفیت یکنواخت در تیراژ بالا.',
    image: ASSET_MANIFEST.rotaryOven.path,
    imageAlt: ASSET_MANIFEST.rotaryOven.altFa,
    targetProductId: 'rotary-oven',
  },
  {
    id: 'bread-machinery',
    title: 'ماشین‌آلات تولید نان',
    subtitle: 'خطوط مکانیزه نان سنتی و فانتزی',
    description:
      'سیستم‌های پخت و شکل‌دهی نان از دستگاه‌های سه‌کاره و شاطریار تا خطوط پیوسته کارخانه‌ای.',
    image: ASSET_MANIFEST.breadLine.path,
    imageAlt: ASSET_MANIFEST.breadLine.altFa,
    targetProductId: 'industrial-bread-line',
  },
  {
    id: 'pastry-lines',
    title: 'تجهیزات خطوط شیرینی',
    subtitle: 'فرهای طبقاتی و تجهیزات تخصصی قنادی',
    description:
      'تجهیزات دقیق پخت کیک، شیرینی خشک و محصولات قنادی با کنترل یکپارچه دما و رطوبت.',
    image: ASSET_MANIFEST.deckOven.path,
    imageAlt: ASSET_MANIFEST.deckOven.altFa,
    targetProductId: 'modern-deck-oven',
  },
  {
    id: 'prep-conveyor',
    title: 'سیستم‌های انتقال و آماده‌سازی',
    subtitle: 'خمیرگیر اسپیرال، دیوایدر و نوار نقاله',
    description:
      'ماشین‌آلات آماده‌سازی خمیر، چانه‌گیر و انتقال بهداشتی محصول برای تکمیل زنجیره تولید.',
    image: ASSET_MANIFEST.pastryPrep.path,
    imageAlt: ASSET_MANIFEST.pastryPrep.altFa,
    targetProductId: 'industrial-bread-line',
  },
];

export const TECH_PILLARS: TechPillar[] = [
  {
    number: '۰۱',
    title: 'طراحی مهندسی',
    description:
      'مدل‌سازی دقیق مکانیکی و حرارتی تمامی اجزا برای دستیابی به تعادل ساختاری، ایمنی عملیاتی و دسترسی آسان جهت نگهداری.',
    iconKey: 'compass',
  },
  {
    number: '۰۲',
    title: 'فناوری پیشرفته',
    description:
      'بهره‌گیری از سیستم‌های کنترل دیجیتال و الگوریتم‌های مدیریت جریان هوا و بخار برای تکرارپذیری کیفیت در هر نوبت پخت.',
    iconKey: 'cpu',
  },
  {
    number: '۰۳',
    title: 'کنترل دقیق فرآیند',
    description:
      'پایش پایدار دما، زمان و چرخه گردش حرارت درون محفظه به منظور حفظ بافت، عطر و یکنواختی رنگ نهایی محصولات.',
    iconKey: 'sliders',
  },
  {
    number: '۰۴',
    title: 'کیفیت ساخت',
    description:
      'استفاده از ورق‌های استیل ضدزنگ استاندارد، برش و مونتاژ دقیق صنعتی و آزمون‌های کنترلی پیش از تحویل دستگاه.',
    iconKey: 'shield',
  },
];

export const COMPANY_ADVANTAGES: CompanyAdvantage[] = [
  {
    id: 'custom-design',
    title: 'طراحی اختصاصی',
    description: 'پیکربندی تجهیزات متناسب با ابعاد کارگاه، نوع محصول و برنامه توسعه خط تولید.',
    iconKey: 'layers',
  },
  {
    id: 'precision-engineering',
    title: 'مهندسی دقیق',
    description: 'تمرکز بر تناسب مکانیکی، انتقال حرارت بهینه و پایداری عملکرد در کارکرد پیوسته.',
    iconKey: 'crosshair',
  },
  {
    id: 'support-services',
    title: 'خدمات پشتیبانی',
    description: 'همراهی فنی از مرحله مشاوره و نصب تا آموزش بهره‌برداری و تامین قطعات استاندارد.',
    iconKey: 'headphones',
  },
  {
    id: 'build-quality',
    title: 'کیفیت ساخت',
    description: 'ساختار مقاوم با متریال بهداشتی و کنترل کیفی دقیق در تمامی مراحل تولید.',
    iconKey: 'award',
  },
  {
    id: 'tech-development',
    title: 'توسعه فناوری',
    description: 'به‌روزرسانی مستمر طراحی ماشین‌آلات همگام با نیازهای مدرن صنعت نان و شیرینی.',
    iconKey: 'sparkles',
  },
];

export const DASHBOARD_PROFILES: DashboardProfile[] = [
  {
    id: 'fantasy-bread',
    label: 'الگوی پخت نان فانتزی',
    machineLabel: 'فر گردان صنعتی — حالت نمونه',
    temperature: 225,
    targetTemperature: 230,
    maxTemperature: 300,
    efficiency: 92,
    dailyEnergyKwh: 148,
    energyIndexLabel: 'بهینه حرارتی (نمایشی)',
    energySavedPercent: 18,
    statusHeating: 'پایدار',
    statusControl: 'خودکار',
    statusOperation: 'پخت پیوسته',
    statusReadiness: 'آماده‌به‌کار',
    productionSeries: [
      { hour: '۰۸:۰۰', output: 420, target: 450 },
      { hour: '۱۰:۰۰', output: 510, target: 500 },
      { hour: '۱۲:۰۰', output: 580, target: 550 },
      { hour: '۱۴:۰۰', output: 545, target: 550 },
      { hour: '۱۶:۰۰', output: 620, target: 600 },
      { hour: '۱۸:۰۰', output: 640, target: 620 },
    ],
  },
  {
    id: 'pastry-line',
    label: 'الگوی پخت شیرینی خشک',
    machineLabel: 'فر گردان / طبقاتی — حالت نمونه',
    temperature: 182,
    targetTemperature: 185,
    maxTemperature: 300,
    efficiency: 95,
    dailyEnergyKwh: 112,
    energyIndexLabel: 'مصرف متعادل (نمایشی)',
    energySavedPercent: 22,
    statusHeating: 'یکنواخت',
    statusControl: 'دقیق',
    statusOperation: 'چرخه بخار ملایم',
    statusReadiness: 'آماده‌به‌کار',
    productionSeries: [
      { hour: '۰۸:۰۰', output: 310, target: 320 },
      { hour: '۱۰:۰۰', output: 375, target: 360 },
      { hour: '۱۲:۰۰', output: 410, target: 400 },
      { hour: '۱۴:۰۰', output: 430, target: 410 },
      { hour: '۱۶:۰۰', output: 460, target: 440 },
      { hour: '۱۸:۰۰', output: 475, target: 460 },
    ],
  },
  {
    id: 'traditional-bread',
    label: 'الگوی خط نان سنتی',
    machineLabel: 'خط تولید نان صنعتی — حالت نمونه',
    temperature: 268,
    targetTemperature: 270,
    maxTemperature: 300,
    efficiency: 89,
    dailyEnergyKwh: 174,
    energyIndexLabel: 'حرارت بالا (نمایشی)',
    energySavedPercent: 14,
    statusHeating: 'حداکثر توان',
    statusControl: 'همگام با خط',
    statusOperation: 'نوار پیوسته',
    statusReadiness: 'آماده‌به‌کار',
    productionSeries: [
      { hour: '۰۸:۰۰', output: 680, target: 700 },
      { hour: '۱۰:۰۰', output: 740, target: 720 },
      { hour: '۱۲:۰۰', output: 810, target: 780 },
      { hour: '۱۴:۰۰', output: 790, target: 800 },
      { hour: '۱۶:۰۰', output: 850, target: 820 },
      { hour: '۱۸:۰۰', output: 870, target: 850 },
    ],
  },
];

export const MACHINE_OPTIONS: string[] = [
  'فر گردان صنعتی',
  'فر طبقاتی مدرن',
  'دستگاه تولید نان صنعتی',
  'مینی فر گردان قنادی',
  'خمیرگیر اسپیرال و تجهیزات آماده‌سازی',
  'مشاوره راه‌اندازی کامل خط تولید',
];

export function getFeaturedProducts(lang: Language = 'fa'): ProductItem[] {
  const trans = TRANSLATIONS[lang].products.items;
  return trans.map((item) => {
    let img = ASSET_MANIFEST.rotaryOven.path;
    let alt = ASSET_MANIFEST.rotaryOven.altFa;
    if (item.id === 'modern-deck-oven') {
      img = ASSET_MANIFEST.deckOven.path;
      alt = ASSET_MANIFEST.deckOven.altFa;
    } else if (item.id === 'industrial-bread-line') {
      img = ASSET_MANIFEST.breadLine.path;
      alt = ASSET_MANIFEST.breadLine.altFa;
    }
    return {
      ...item,
      image: img,
      imageAlt: alt,
    };
  });
}

export function getProductCategories(lang: Language = 'fa'): ProductCategoryItem[] {
  const trans = TRANSLATIONS[lang].categories.items;
  return trans.map((item) => {
    let img = ASSET_MANIFEST.rotaryOven.path;
    let alt = ASSET_MANIFEST.rotaryOven.altFa;
    if (item.id === 'bread-machinery') {
      img = ASSET_MANIFEST.breadLine.path;
      alt = ASSET_MANIFEST.breadLine.altFa;
    } else if (item.id === 'pastry-lines') {
      img = ASSET_MANIFEST.deckOven.path;
      alt = ASSET_MANIFEST.deckOven.altFa;
    } else if (item.id === 'prep-conveyor') {
      img = ASSET_MANIFEST.pastryPrep.path;
      alt = ASSET_MANIFEST.pastryPrep.altFa;
    }
    return {
      ...item,
      image: img,
      imageAlt: alt,
    };
  });
}

export function getTechPillars(lang: Language = 'fa'): TechPillar[] {
  const t = TRANSLATIONS[lang].technology;
  return [
    {
      number: t.pillar01Num,
      title: t.pillar01Title,
      description: t.pillar01Desc,
      iconKey: 'compass',
    },
    {
      number: t.pillar02Num,
      title: t.pillar02Title,
      description: t.pillar02Desc,
      iconKey: 'cpu',
    },
    {
      number: t.pillar03Num,
      title: t.pillar03Title,
      description: t.pillar03Desc,
      iconKey: 'sliders',
    },
    {
      number: t.pillar04Num,
      title: t.pillar04Title,
      description: t.pillar04Desc,
      iconKey: 'shield',
    },
  ];
}

export function getCompanyAdvantages(lang: Language = 'fa'): CompanyAdvantage[] {
  return TRANSLATIONS[lang].advantages.items;
}

export function getDashboardProfiles(lang: Language = 'fa'): DashboardProfile[] {
  return TRANSLATIONS[lang].dashboard.profiles;
}

export function getMachineOptions(lang: Language = 'fa'): string[] {
  return TRANSLATIONS[lang].contact.machineOptions;
}
