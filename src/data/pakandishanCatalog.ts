import { Language } from '../i18n/translations';

export type CatalogCategoryId =
  | 'lavash'
  | 'tafton'
  | 'barbari'
  | 'sangak'
  | 'sheeters'
  | 'robotics'
  | 'accessories';

export interface LocalizedText {
  fa: string;
  en: string;
  ar?: string;
  tr?: string;
  ru?: string;
}

export interface ProductSpecRow {
  label: LocalizedText;
  value: LocalizedText;
}

export interface CatalogProduct {
  id: number;
  slug: string;
  category: CatalogCategoryId;
  featured?: boolean;
  image: string;
  name: LocalizedText;
  tagline: LocalizedText;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  highlights: { fa: string[]; en: string[] };
  specs: ProductSpecRow[];
  relatedSlugs: string[];
}

export interface CatalogCategoryMeta {
  id: CatalogCategoryId;
  image: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  description: LocalizedText;
}

export interface BlogArticle {
  id: number;
  slug: string;
  date: string;
  readTimeMin: number;
  image: string;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  paragraphs: { fa: string[]; en: string[] };
}

export interface CompanyOffice {
  id: string;
  city: LocalizedText;
  role: LocalizedText;
  address: LocalizedText;
  extension: LocalizedText;
  phone: string;
}

export interface ExportRegion {
  id: string;
  regionName: LocalizedText;
  countries: { fa: string[]; en: string[] };
}

export function pickLocale(text: LocalizedText, lang: Language): string {
  if (lang === 'fa') return text.fa;
  if (lang === 'ar') return text.ar || text.fa;
  if (lang === 'tr') return text.tr || text.en;
  if (lang === 'ru') return text.ru || text.en;
  return text.en;
}

export function pickList(list: { fa: string[]; en: string[] }, lang: Language): string[] {
  return lang === 'fa' || lang === 'ar' ? list.fa : list.en;
}

export const OFFICIAL_CONTACT = {
  consultationPhone: '09960786617',
  consultationPhoneIntl: '+98 996 078 6617',
  email: 'info@pakandishan.com',
  website: 'pakandishan.com',
  foundedYearFa: '۱۳۸۲',
  foundedYearEn: '2003',
  factoryAreaSqm: 13000,
  founderFa: 'مهندس حمید پاشایی',
  founderEn: 'Eng. Hamid Pashaei',
} as const;

export const COMPANY_STATS: Array<{
  id: string;
  valueFa: string;
  valueEn: string;
  label: LocalizedText;
}> = [
  {
    id: 'annual-sales',
    valueFa: '+۵۰۰',
    valueEn: '500+',
    label: {
      fa: 'فروش سالانه دستگاه',
      en: 'Machines Delivered Yearly',
      ar: 'مبيعات الأجهزة سنوياً',
      tr: 'Yıllık Makine Satışı',
      ru: 'Продаж машин в год',
    },
  },
  {
    id: 'experience',
    valueFa: '+۲۰',
    valueEn: '20+',
    label: {
      fa: 'سال همراه شما (از ۱۳۸۲)',
      en: 'Years of Engineering (Since 2003)',
      ar: 'عاماً من الخبرة (منذ ۲۰۰۳)',
      tr: 'Yıllık Mühendislik Deneyimi',
      ru: 'Лет инженерного опыта',
    },
  },
  {
    id: 'clients',
    valueFa: '+۵۰۰۰',
    valueEn: '5,000+',
    label: {
      fa: 'مشتری وفادار در ایران و جهان',
      en: 'Loyal Bakeries Worldwide',
      ar: 'عميل مخلص حول العالم',
      tr: 'Dünya Çapında Sadık Müşteri',
      ru: 'Постоянных клиентов',
    },
  },
  {
    id: 'staff',
    valueFa: '+۱۵۰',
    valueEn: '150+',
    label: {
      fa: 'مهندس و پرسنل متخصص',
      en: 'Engineers & Specialists',
      ar: 'مهندساً وفنياً متخصصاً',
      tr: 'Uzman Mühendis ve Personel',
      ru: 'Инженеров и специалистов',
    },
  },
  {
    id: 'exports',
    valueFa: '+۳۰',
    valueEn: '30+',
    label: {
      fa: 'کشور مقصد صادراتی',
      en: 'Export Destination Countries',
      ar: 'دولة مستوردة حول العالم',
      tr: 'İhracat Yapılan Ülke',
      ru: 'Стран экспорта',
    },
  },
];

export const CATALOG_CATEGORIES: CatalogCategoryMeta[] = [
  {
    id: 'lavash',
    image: '/assets/pakandishan/products/lavash-rotary-automatic-set.webp',
    title: {
      fa: 'خطوط و دستگاه‌های نان لواش',
      en: 'Lavash Bread Lines & Sets',
      ar: 'خطوط وأجهزة خبز اللافاش',
      tr: 'Lavaş Ekmek Hatları ve Setleri',
      ru: 'Линии для выпечки лаваша',
    },
    subtitle: {
      fa: 'ست اتوماتیک روتاری، تونلی گردان و ست ربات',
      en: 'Rotary Automatic Sets, Tunnel Ovens & Robot Lines',
      ar: 'مجموعات أوتوماتيكية وروتاري وروبوت',
      tr: 'Otomatik Döner ve Robot Lavaş Hatları',
      ru: 'Ротационные и роботизированные линии',
    },
    description: {
      fa: 'پخت پیوسته نان لواش با پهن‌کن هماهنگ، مصرف سوخت بهینه و کیفیت یکنواخت در تیراژ بالا.',
      en: 'Continuous high-output lavash production combining synchronized sheeting, rotary baking, and thermal efficiency.',
      ar: 'إنتاج مستمر لخبز اللافاش بجودة متجانسة واستهلاك طاقة مثالي.',
      tr: 'Yüksek kapasiteli, homojen pişirme sağlayan tam otomatik lavaş üretim hatları.',
      ru: 'Непрерывная выпечка лаваша с равномерным нагревом и экономией энергии.',
    },
  },
  {
    id: 'tafton',
    image: '/assets/pakandishan/products/tafton-rotary-automatic-set.webp',
    title: {
      fa: 'خطوط و دستگاه‌های نان تافتون',
      en: 'Taftoon Bread Lines',
      ar: 'خطوط وأجهزة خبز التافتون',
      tr: 'Tafton Ekmek Hatları',
      ru: 'Линии для хлеба тафтун',
    },
    subtitle: {
      fa: 'ست اتوماتیک روتاری و تنور دوار سنتی',
      en: 'Automatic Rotary Sets & Revolving Ovens',
      ar: 'مجموعة روتاري أوتوماتيكية وتنور دوار',
      tr: 'Otomatik Döner Setler ve Döner Tandırlar',
      ru: 'Автоматические комплексы и вращающиеся печи',
    },
    description: {
      fa: 'طراحی پرتابل با عایق‌کاری دومرحله‌ای آجر نسوز و پتوی سرامیکی برای حفظ عطر و بافت اصیل نان تافتون.',
      en: 'Portable dual-insulated refractory brick and ceramic blanket chamber preserving authentic taftoon texture and aroma.',
      ar: 'عزل حراري مزدوج بالطوب الحراري للحفاظ على النكهة الأصيلة لخبز التافتون.',
      tr: 'Ateş tuğlası ve seramik battaniye izolasyonu ile geleneksel lezzet ve yüksek verimlilik.',
      ru: 'Двойная теплоизоляция огнеупорным кирпичом для традиционного вкуса и аромата.',
    },
  },
  {
    id: 'barbari',
    image: '/assets/pakandishan/products/barbari-automatic-set.webp',
    title: {
      fa: 'خطوط و دستگاه‌های نان بربری',
      en: 'Barbari Bread Lines',
      ar: 'خطوط وأجهزة خبز البربري',
      tr: 'Barbari Ekmek Hatları',
      ru: 'Линии для хлеба барбари',
    },
    subtitle: {
      fa: 'ست اتوماتیک بربری، فر تونلی مدرن و تزریق خمیر',
      en: 'Automatic Barbari Sets, Tunnel Ovens & Injectors',
      ar: 'مجموعة بربري أوتوماتيكية وأفران نفقية حديثة',
      tr: 'Otomatik Barbari Setleri ve Tünel Fırınlar',
      ru: 'Туннельные печи и автоматические линии барбари',
    },
    description: {
      fa: 'پخت استاندارد نان بربری با کنترل دقیق حرارت بالا و پایین، تزریق یکنواخت و پوسته طلایی برشته.',
      en: 'Precision top-and-bottom thermal profiling for crisp golden barbari crust and consistent crumb structure.',
      ar: 'تحكم دقيق بالحرارة العلوية والسفلية للحصول على قشرة ذهبية مثالية.',
      tr: 'Üst ve alt hassas ısı kontrolü ile altın rengi çıtır kabuk ve standart pişirme.',
      ru: 'Точный контроль верхнего и нижнего нагрева для золотистой хрустящей корочки.',
    },
  },
  {
    id: 'sangak',
    image: '/assets/pakandishan/products/sangak-automatic-set.webp',
    title: {
      fa: 'خطوط اتوماتیک نان سنگک',
      en: 'Sangak Automatic Lines',
      ar: 'خطوط خبز السنغك الأوتوماتيكية',
      tr: 'Otomatik Sengak Ekmek Hatları',
      ru: 'Автоматические линии сангак',
    },
    subtitle: {
      fa: 'ست تونلی اتوماتیک سنگک با بستر حرارتی یکپارچه',
      en: 'Tunnel Automatic Sangak Line with Refractory Bed',
      ar: 'خط نفق أوتوماتيكي متكامل لخبز السنغك',
      tr: 'Tam Otomatik Tünel Sengak Pişirme Hattı',
      ru: 'Туннельный автоматический комплекс сангак',
    },
    description: {
      fa: 'مکانیزاسیون کامل پخت نان سنگک سنتی با کاهش چشمگیر ضایعات، مصرف انرژی پایین و بهداشت حداکثری.',
      en: 'Full mechanization of traditional sangak baking with minimal waste, reduced fuel draw, and hygienic stainless handling.',
      ar: 'ميكنة كاملة لخبز السنغك التقليدي بأعلى معايير النظافة وأقل فاقد.',
      tr: 'Geleneksel sengak ekmeğinin hijyenik ve düşük yakıtlı tam otomatik üretimi.',
      ru: 'Полная автоматизация традиционного сангака с минимальными потерями и высокой гигиеной.',
    },
  },
  {
    id: 'sheeters',
    image: '/assets/pakandishan/products/shateryar-round-3in1.webp',
    title: {
      fa: 'خمیر پهن‌کن‌های شاطریار و اتوماتیک',
      en: 'Shateryar 3-in-1 & Automatic Sheeters',
      ar: 'فرادات العجين الأوتوماتيكية شاطريار',
      tr: 'Şateryar 3’ü 1 Arada Hamur Açıcılar',
      ru: 'Тестораскаточные машины Шатерьяр',
    },
    subtitle: {
      fa: 'ثبت اختراع پاک‌اندیشان با نشان ملی استاندارد',
      en: 'Patented by Pakandishan with National Standard Mark',
      ar: 'براءة اختراع باك أنديشان بعلامة المواصفات الوطنية',
      tr: 'Patentli ve Ulusal Standart Belgeli Hamur Açıcılar',
      ru: 'Запатентованная разработка со знаком стандарта',
    },
    description: {
      fa: 'پهن‌کن‌های سه‌کاره شاطریار و معمولی (گردبر و مستطیل‌بر) سازگار با انواع فرهای روتاری و تونلی خطی.',
      en: 'Three-in-one Shateryar and standard round/rectangular sheeters engineered for both rotary and linear tunnel ovens.',
      ar: 'فرادات عجين دائرية ومستطيلة متوافقة مع الأفران الدوارة والنفقية.',
      tr: 'Döner ve doğrusal tünel fırınlarla uyumlu yuvarlak ve dikdörtgen hamur açma makineleri.',
      ru: 'Круглые и прямоугольные тестораскатки для ротационных и линейных печей.',
    },
  },
  {
    id: 'robotics',
    image: '/assets/pakandishan/products/robot-shater-automatic.webp',
    title: {
      fa: 'ربات شاطر و تجهیزات تکمیلی',
      en: 'Robotic Shater & Auxiliary Systems',
      ar: 'روبوت الشاطر والتجهيزات المكملة',
      tr: 'Otomatik Şater Robotu ve Yardımcı Ekipmanlar',
      ru: 'Робот-пекарь и вспомогательное оборудование',
    },
    subtitle: {
      fa: 'ربات ضربه‌زن، میز گردان، کنجدپاش، برش و دسته‌بندی',
      en: 'Robotic Striker, Turntable, Sesame Sprinkler & Stacker',
      ar: 'روبوت الضرب، الطاولة الدوارة، رشاش السمسم والتصنيف',
      tr: 'Robotik Şater, Döner Masa, Susam Serpici ve İstifleme',
      ru: 'Робот-пекарь, поворотный стол, посыпка кунжутом и укладчик',
    },
    description: {
      fa: 'تکمیل زنجیره اتوماسیون نانوایی از پاشش کنجد و برش دقیق تا ضربه‌زنی رباتیک و دسته‌بندی بهداشتی نان.',
      en: 'Completing end-to-end bakery automation from precision cutting and sesame application to robotic transfer and stacking.',
      ar: 'إكمال سلسلة الأتمتة من التقطيع ورش السمسم حتى التصنيف الصحي للخبز.',
      tr: 'Kesim ve susamlamadan robotik aktarım ve istiflemeye kadar eksiksiz otomasyon.',
      ru: 'Полная автоматизация линии от нарезки и посыпки до роботизированной укладки.',
    },
  },
];

export const PAKANDISHAN_PRODUCTS: CatalogProduct[] = [
  {
    id: 8419,
    slug: 'lavash-rotary-automatic-set',
    category: 'lavash',
    featured: true,
    image: '/assets/pakandishan/products/lavash-rotary-automatic-set.webp',
    name: {
      fa: 'ست دستگاه تونلی گردان (روتاری) اتوماتیک نان لواش',
      en: 'Automatic Rotary Tunnel Lavash Production Set',
      ar: 'مجموعة الفرن النفق الدوار الأوتوماتيكي لخبز اللافاش',
      tr: 'Tam Otomatik Döner Tünel Lavaş Üretim Seti',
      ru: 'Автоматический ротационно-туннельный комплекс для лаваша',
    },
    tagline: {
      fa: 'خط کامل پخت تمام‌اتوماتیک لواش با بهره‌وری بالا',
      en: 'End-to-End High-Output Automatic Lavash Line',
    },
    shortDescription: {
      fa: 'ترکیب هماهنگ فر تونلی گردان روتاری، پهن‌کن اتوماتیک و سیستم کنترل دقیق حرارت برای تولید مداوم نان لواش با کیفیت یکنواخت.',
      en: 'Integrated rotary tunnel oven, automatic dough sheeter, and digital thermal control engineered for continuous high-volume lavash production.',
    },
    fullDescription: {
      fa: 'ست دستگاه تونلی گردان اتوماتیک نان لواش پاک‌اندیشان حاصل بیش از دو دهه تجربه مهندسی در صنعت ماشین‌آلات نانوایی است. این مجموعه با هماهنگی کامل میان واحد پهن‌کن اتوماتیک خمیر، محفظه پخت با عایق‌کاری دومرحله‌ای آجر نسوز و پتوی سرامیکی، و سیستم خروج بهداشتی نان، ضایعات خمیر و مصرف سوخت را به حداقل رسانده و نانی نرم، خوش‌عطر و یکدست تحویل می‌دهد.',
      en: 'Built on over two decades of Pakandishan engineering, the Automatic Rotary Tunnel Lavash Set synchronizes automated dough sheeting with a dual-insulated refractory baking chamber and hygienic discharge conveyor—minimizing fuel draw and waste while maintaining uniform bread softness.',
    },
    highlights: {
      fa: [
        'عایق‌کاری دومرحله‌ای با آجر نسوز و پتوی سرامیکی ۱۰ سانتی‌متری',
        'کاهش چشمگیر مصرف سوخت و اتلاف حرارت محیطی',
        'بدنه تمام استیل ضدزنگ بهداشتی و طراحی پرتابل با قابلیت جابه‌جایی',
        'کنترل دقیق سرعت پخت و دمای محفظه برای یکنواختی کامل رنگ نان',
      ],
      en: [
        'Dual-stage thermal insulation with refractory brick and 10 cm ceramic blanket',
        'Significantly lowered fuel consumption and ambient heat loss',
        'Food-grade stainless steel enclosure with crane-ready portable chassis',
        'Precision speed and temperature regulation for uniform bake color',
      ],
    },
    specs: [
      { label: { fa: 'نوع نان', en: 'Bread Type' }, value: { fa: 'نان لواش (سنتی و صنعتی)', en: 'Lavash (Traditional & Industrial)' } },
      { label: { fa: 'ساختار عایق', en: 'Insulation' }, value: { fa: 'آجر نسوز + پتوی سرامیکی ۱۰ سانتی‌متری', en: 'Refractory Brick + 10 cm Ceramic Blanket' } },
      { label: { fa: 'سیستم انتقال', en: 'Transfer' }, value: { fa: 'پهن‌کن اتوماتیک هماهنگ با فر روتاری', en: 'Synchronized Auto Sheeter + Rotary Oven' } },
      { label: { fa: 'گارانتی رسمی', en: 'Warranty' }, value: { fa: '۱۲ تا ۲۴ ماه گارانتی + پشتیبانی سراسری', en: '12–24 Months Official Warranty' } },
    ],
    relatedSlugs: ['rotary-tunnel-lavash-tafton', 'tafton-rotary-automatic-set', 'lavash-robot-set'],
  },
  {
    id: 11943,
    slug: 'tafton-rotary-automatic-set',
    category: 'tafton',
    featured: true,
    image: '/assets/pakandishan/products/tafton-rotary-automatic-set.webp',
    name: {
      fa: 'ست دستگاه تونلی گردان (روتاری) اتوماتیک نان تافتون',
      en: 'Automatic Rotary Tunnel Taftoon Production Set',
      ar: 'مجموعة الفرن النفق الدوار الأوتوماتيكي لخبز التافتون',
      tr: 'Tam Otomatik Döner Tünel Tafton Üretim Seti',
      ru: 'Автоматический ротационный комплекс для хлеба тафтун',
    },
    tagline: {
      fa: 'پخت سریع و اصیل نان تافتون با سازه پرتابل',
      en: 'High-Speed Authentic Taftoon Line with Portable Architecture',
    },
    shortDescription: {
      fa: 'ست کامل تمام‌اتوماتیک تافتون شامل فر تونلی گردان، پهن‌کن اختصاصی و سیستم کنترل هوشمند دما با امکان جابه‌جایی آسان.',
      en: 'Complete automatic taftoon production set combining rotary tunnel baking, dedicated sheeting, and dual-layer ceramic insulation.',
    },
    fullDescription: {
      fa: 'ست کامل روتاری نان تافتون یکی از پیشرفته‌ترین تجهیزات نانوایی صنعتی تمام‌اتوماتیک پاک‌اندیشان است. مهندسی دقیق شاسی امکان حمل‌ونقل و انتقال آسان با جرثقیل (طراحی پرتابل) را فراهم می‌کند و عایق‌کاری دومرحله‌ای با آجر نسوز و پتوی سرامیکی ۱۰ سانتی‌متری موجب حفظ حرارت داخلی و پخت مغزپخت و یکنواخت تافتون می‌شود.',
      en: 'One of Pakandishan’s flagship fully automatic bakery systems, engineered with a crane-portable steel frame and dual-stage refractory + 10 cm ceramic blanket insulation to deliver fast, thorough, and consistent taftoon baking.',
    },
    highlights: {
      fa: [
        'طراحی مهندسی پرتابل با امکان انتقال آسان با جرثقیل',
        'عایق‌کاری دومرحله‌ای آجر نسوز + پتوی سرامیکی ۱۰ سانتی‌متری',
        'پخت یکنواخت با قابلیت تنظیم ضخامت خمیر و سرعت چرخش',
        'مجهز به استاندارد ملی ایران، ISO 9001 و استاندارد CE اروپا',
      ],
      en: [
        'Portable engineered chassis for effortless relocation and installation',
        'Dual-stage refractory brick + 10 cm ceramic blanket insulation',
        'Adjustable dough thickness and rotational bake speed',
        'Certified under ISO 9001, CE, and Iranian National Standard',
      ],
    },
    specs: [
      { label: { fa: 'نوع نان', en: 'Bread Type' }, value: { fa: 'نان تافتون سنتی و ماشینی', en: 'Taftoon Bread' } },
      { label: { fa: 'سازه و انتقال', en: 'Chassis' }, value: { fa: 'پرتابل مهندسی (قابل جابه‌جایی با جرثقیل)', en: 'Portable Crane-Ready Industrial Frame' } },
      { label: { fa: 'عایق حرارتی', en: 'Thermal Layer' }, value: { fa: 'آجر نسوز + پتوی سرامیکی', en: 'Refractory Brick + Ceramic Blanket' } },
      { label: { fa: 'استانداردها', en: 'Standards' }, value: { fa: 'ISO 9001 • CE • استاندارد ملی', en: 'ISO 9001 • CE • National Standard' } },
    ],
    relatedSlugs: ['lavash-rotary-automatic-set', 'rotary-bakery-oven', 'shateryar-round-3in1'],
  },
  {
    id: 7940,
    slug: 'barbari-automatic-set',
    category: 'barbari',
    featured: true,
    image: '/assets/pakandishan/products/barbari-automatic-set.webp',
    name: {
      fa: 'ست اتوماتیک نان بربری',
      en: 'Automatic Barbari Bread Production Set',
      ar: 'المجموعة الأوتوماتيكية لخبز البربري',
      tr: 'Tam Otomatik Barbari Ekmek Üretim Seti',
      ru: 'Автоматический комплекс для выпечки барбари',
    },
    tagline: {
      fa: 'خط یکپارچه تزریق، شیارزنی و پخت تونلی بربری',
      en: 'Integrated Injection, Scoring & Tunnel Baking Line',
    },
    shortDescription: {
      fa: 'سیستم کامل مکانیزه پخت نان بربری با کنترل مستقل حرارت بالا و پایین، دستگاه تزریق دقیق و راندمان بالای شیفت‌های طولانی.',
      en: 'Complete mechanized barbari baking line featuring independent top/bottom thermal zones, precision dough injection, and high shift durability.',
    },
    fullDescription: {
      fa: 'ست اتوماتیک نان بربری پاک‌اندیشان تمام مراحل فرم‌دهی، تزریق، کنجدپاشی و پخت تونلی را در یک خط هماهنگ ادغام می‌کند. توزیع یکنواخت حرارت در طول تونل پخت و کیفیت ساخت صنعتی، امکان تولید مداوم نان بربری برشته و خوش‌عطر را با کمترین نیاز به نیروی انسانی فراهم می‌سازد.',
      en: 'Pakandishan’s Automatic Barbari Set integrates dough forming, precision injection, optional sesame application, and continuous tunnel baking for golden, aromatic barbari bread with minimal manual labor.',
    },
    highlights: {
      fa: [
        'هماهنگی کامل واحد تزریق خمیر بربری با فر تونلی تمام‌استیل',
        'کنترل دقیق حرارت سطح و کف برای پوسته طلایی و مغز پف‌دار',
        'بهینه‌سازی مصرف گاز و برق در کارکرد ۲۴ ساعته',
        'دسترسی سریع برای نظافت روزانه و نگهداری آسان',
      ],
      en: [
        'Seamless integration of barbari injector with stainless tunnel oven',
        'Independent top and bottom heat control for crisp crust and airy crumb',
        'Optimized gas and electrical draw for 24-hour production',
        'Hygienic access panels for fast daily cleaning and maintenance',
      ],
    },
    specs: [
      { label: { fa: 'نوع نان', en: 'Bread Type' }, value: { fa: 'نان بربری سنتی و کنجدی', en: 'Traditional & Sesame Barbari' } },
      { label: { fa: 'ساختار پخت', en: 'Baking System' }, value: { fa: 'فر تونلی مدرن با کنترل حرارت چندناحیه‌ای', en: 'Multi-Zone Modern Tunnel Oven' } },
      { label: { fa: 'تجهیزات هماهنگ', en: 'Paired Units' }, value: { fa: 'دستگاه تزریق بربری + کنجدپاش', en: 'Barbari Injector + Sesame Sprinkler' } },
      { label: { fa: 'پشتیبانی', en: 'Support' }, value: { fa: 'نصب، آموزش و تأمین قطعات اورجینال', en: 'On-Site Setup, Training & Original Parts' } },
    ],
    relatedSlugs: ['barbari-tunnel-oven', 'barbari-sangak-injector', 'sesame-sprinkler'],
  },
  {
    id: 12158,
    slug: 'sangak-automatic-set',
    category: 'sangak',
    featured: true,
    image: '/assets/pakandishan/products/sangak-automatic-set.webp',
    name: {
      fa: 'ست اتوماتیک نان سنگک تونلی',
      en: 'Automatic Tunnel Sangak Production Set',
      ar: 'مجموعة النفق الأوتوماتيكية لخبز السنغك',
      tr: 'Otomatik Tünel Sengak Ekmek Seti',
      ru: 'Автоматический туннельный комплекс для хлеба сангак',
    },
    tagline: {
      fa: 'پخت مکانیزه و بهداشتی نان سنگک اصیل',
      en: 'Hygienic Mechanized Authentic Sangak Baking',
    },
    shortDescription: {
      fa: 'خط تمام‌اتوماتیک تولید نان سنگک تونلی با پخت غیرمستقیم و یکنواخت، کنترل دیجیتال سرعت و حداقل دورریز خمیر.',
      en: 'Fully automated tunnel sangak baking line delivering uniform indirect heat, digital conveyor speed control, and minimal dough waste.',
    },
    fullDescription: {
      fa: 'ست اتوماتیک نان سنگک تونلی پاک‌اندیشان با هدف ارتقای کیفیت، بهداشت و بهره‌وری نانوایی‌های سنگک طراحی شده است. این سیستم با ترکیب واحد تزریق هوشمند خمیر شل سنگک و فر تونلی با توزیع حرارت یکنواخت، طعم و ظاهر سنتی نان سنگک را با استاندارد صنعتی و سرعت پخت بالا ترکیب می‌کند.',
      en: 'Designed to elevate quality, hygiene, and throughput for sangak bakeries, this automated tunnel system pairs soft-dough injection with uniform radiant tunnel baking—preserving classic sangak character at industrial output.',
    },
    highlights: {
      fa: [
        'پخت یکنواخت و کاملاً بهداشتی بدون سوختگی و خام‌ماندگی',
        'کنترل دیجیتال دما و سرعت حرکت بستر پخت',
        'کاهش قابل توجه مصرف سوخت نسبت به تنورهای سنتی',
        'بدنه تمام استیل ضدزنگ مقاوم در برابر حرارت و رطوبت',
      ],
      en: [
        'Uniform hygienic baking free from scorching or under-baking',
        'Digital chamber temperature and conveyor speed regulation',
        'Substantial fuel savings compared to conventional stone ovens',
        'Heat- and moisture-resistant food-grade stainless steel housing',
      ],
    },
    specs: [
      { label: { fa: 'نوع نان', en: 'Bread Type' }, value: { fa: 'نان سنگک سنتی و صنعتی', en: 'Traditional & Commercial Sangak' } },
      { label: { fa: 'نوع پخت', en: 'Heating Mode' }, value: { fa: 'تونلی حرارتی یکنواخت', en: 'Uniform Radiant Tunnel Baking' } },
      { label: { fa: 'واحد خمیر', en: 'Feeding Unit' }, value: { fa: 'تزریق اتوماتیک خمیر سنگک', en: 'Automatic Sangak Dough Injector' } },
      { label: { fa: 'گارانتی', en: 'Warranty' }, value: { fa: '۱۲ تا ۲۴ ماه گارانتی معتبر', en: '12–24 Months Official Warranty' } },
    ],
    relatedSlugs: ['barbari-sangak-injector', 'sesame-sprinkler', 'barbari-automatic-set'],
  },
  {
    id: 1732,
    slug: 'shateryar-round-3in1',
    category: 'sheeters',
    featured: true,
    image: '/assets/pakandishan/products/shateryar-round-3in1.webp',
    name: {
      fa: 'خمیر پهن‌کن گردبر شاطریار — سه‌کاره',
      en: 'Shateryar 3-in-1 Round Dough Sheeter',
      ar: 'فرادة العجين الدائرية شاطريار (٣ في ١)',
      tr: 'Şateryar 3’ü 1 Arada Yuvarlak Hamur Açıcı',
      ru: 'Тестораскаточная машина Шатерьяр 3-в-1 (круглая)',
    },
    tagline: {
      fa: 'دستگاه سه‌کاره چانه‌گیر، پهن‌کن و گردبر با استاندارد ملی',
      en: 'Patented 3-in-1 Divider, Sheeter & Round Cutter',
    },
    shortDescription: {
      fa: 'تجمیع سه مرحله آماده‌سازی خمیر در یک دستگاه فشرده؛ مناسب برای نان‌های گرد لواش و تافتون با ضخامت دقیق و قابل تنظیم.',
      en: 'Combines three dough-preparation stages in one compact stainless chassis with precision thickness calibration for round lavash and taftoon.',
    },
    fullDescription: {
      fa: 'پهن‌کن گردبر سه‌کاره شاطریار از محصولات شاخص و ثبت‌اختراع‌شده پاک‌اندیشان است که نخستین پروانه استاندارد ملی ایران در این حوزه را دریافت کرده است. این دستگاه با کاربری بسیار ساده، جایگزین نیروی انسانی متعدد در مرحله چانه‌گیری و پهن کردن خمیر شده و ورقه‌ای یکنواخت و بدون پارگی تحویل می‌دهد.',
      en: 'A flagship patented innovation by Pakandishan—and the first automatic dough sheeter in Iran to receive the National Standard license—Shateryar 3-in-1 replaces heavy manual sheeting with tear-free, uniform dough sheets.',
    },
    highlights: {
      fa: [
        'نخستین دارنده پروانه علامت استاندارد ملی ایران در دستگاه پهن‌کن اتوماتیک',
        'انجام هم‌زمان سه مرحله آماده‌سازی، پهن‌کردن و برش گرد خمیر',
        'تنظیم میکرومتری ضخامت خمیر متناسب با نوع نان',
        'اشغال فضای کم و سازگاری با انواع فرهای دوار و روتاری',
      ],
      en: [
        'First Iran National Standard certified automatic dough sheeter',
        'Three integrated stages: forming, sheeting, and precision round cutting',
        'Fine thickness adjustment tailored to recipe requirements',
        'Compact footprint compatible with rotary and revolving ovens',
      ],
    },
    specs: [
      { label: { fa: 'نوع برش', en: 'Cut Shape' }, value: { fa: 'گردبر دقیق', en: 'Precision Round Cut' } },
      { label: { fa: 'عملکرد', en: 'Function' }, value: { fa: 'سه‌کاره یکپارچه شاطریار', en: 'Integrated 3-in-1 Shateryar' } },
      { label: { fa: 'استاندارد', en: 'Certification' }, value: { fa: 'دارای نشان ملی استاندارد و ثبت اختراع', en: 'National Standard & Patented Design' } },
      { label: { fa: 'بدنه', en: 'Build' }, value: { fa: 'استیل ضدزنگ بهداشتی', en: 'Food-Grade Stainless Steel' } },
    ],
    relatedSlugs: ['shateryar-rectangular-3in1', 'lavash-rotary-automatic-set', 'tafton-rotary-automatic-set'],
  },
  {
    id: 1734,
    slug: 'robot-shater-automatic',
    category: 'robotics',
    featured: true,
    image: '/assets/pakandishan/products/robot-shater-automatic.webp',
    name: {
      fa: 'ربات ضربه‌زن — شاطر اتوماتیک نانوایی',
      en: 'Automatic Robotic Shater (Bread Transfer Robot)',
      ar: 'روبوت الضرب — الشاطر الأوتوماتيكي للمخابز',
      tr: 'Otomatik Şater Robotu',
      ru: 'Робот-пекарь автоматический (Шатер)',
    },
    tagline: {
      fa: 'جایگزین هوشمند و دقیق ضربه‌زنی دستی روی تنور',
      en: 'Intelligent Precision Automation for Traditional Oven Transfer',
    },
    shortDescription: {
      fa: 'ربات تخصصی شاطر اتوماتیک برای انتقال و چسباندن دقیق خمیر به سطح پخت با ریتم پایدار، بهداشت کامل و کاهش خستگی پرسنل.',
      en: 'Specialized robotic bread-transfer arm automating dough placement onto the baking surface with consistent rhythm and maximum hygiene.',
    },
    fullDescription: {
      fa: 'ربات ضربه‌زن (شاطر اتوماتیک) پاک‌اندیشان یکی از نوآوری‌های مهندسی برای حذف سخت‌ترین و پرحرارت‌ترین مرحله نانوایی است. این ربات با دقت حرکتی بالا، خمیر پهن‌شده را به صورت کاملاً منظم و بهداشتی به سطح پخت منتقل کرده و کیفیت یکنواختی را در تمام ساعات شبانه‌روز تضمین می‌کند.',
      en: 'Engineered to eliminate the most physically demanding, high-heat step in traditional baking, Pakandishan’s Robotic Shater transfers sheeted dough with repeatable precision around the clock.',
    },
    highlights: {
      fa: [
        'حذف تماس مستقیم دست و ارتقای کامل بهداشت تولید نان',
        'عملکرد پیوسته و دقیق بدون افت ریتم در شیفت‌های طولانی',
        'هماهنگی کامل با ست‌های رباتیک لواش و پهن‌کن‌های پاک‌اندیشان',
        'تنظیم آسان سرعت و کورس حرکتی از طریق پنل کنترل',
      ],
      en: [
        'Eliminates manual hand contact for superior bakery hygiene',
        'Continuous, fatigue-free accuracy across long production shifts',
        'Direct synchronization with Pakandishan sheeters and lavash sets',
        'Simple stroke and speed tuning via industrial control panel',
      ],
    },
    specs: [
      { label: { fa: 'کاربرد', en: 'Application' }, value: { fa: 'انتقال و ضربه‌زنی اتوماتیک خمیر', en: 'Automated Dough Transfer & Placement' } },
      { label: { fa: 'کنترل حرکت', en: 'Motion Control' }, value: { fa: 'الکترومکانیکی دقیق با پنل دیجیتال', en: 'Precision Electromechanical + Digital Panel' } },
      { label: { fa: 'بهداشت', en: 'Hygiene' }, value: { fa: 'قطعات در تماس با خمیر تمام استیل', en: 'Food-Grade Stainless Contact Parts' } },
      { label: { fa: 'سازگاری', en: 'Compatibility' }, value: { fa: 'تنورهای دوار و خطوط لواش و تافتون', en: 'Revolving Ovens & Lavash/Taftoon Lines' } },
    ],
    relatedSlugs: ['lavash-robot-set', 'rotary-bakery-oven', 'shateryar-rectangular-3in1'],
  },
  {
    id: 1712,
    slug: 'rotary-tunnel-lavash-tafton',
    category: 'lavash',
    image: '/assets/pakandishan/products/rotary-tunnel-lavash-tafton.webp',
    name: {
      fa: 'دستگاه تونلی گردان پخت نان لواش و تافتون (روتاری)',
      en: 'Rotary Tunnel Oven for Lavash & Taftoon',
      ar: 'الفرن النفق الدوار لخبز اللافاش والتافتون',
      tr: 'Lavaş ve Tafton Döner Tünel Fırını',
      ru: 'Ротационно-туннельная печь для лаваша и тафтуна',
    },
    tagline: {
      fa: 'فر تونلی گردان دوکاره لواش و تافتون',
      en: 'Dual-Purpose Rotary Tunnel Baking Chamber',
    },
    shortDescription: {
      fa: 'فر تونلی گردان با اشغال فضای بهینه و ظرفیت پخت بالا برای تولید هم‌زمان یا مجزای نان لواش و تافتون.',
      en: 'Compact-footprint rotary tunnel oven delivering high-capacity uniform baking for both lavash and taftoon breads.',
    },
    fullDescription: {
      fa: 'دستگاه تونلی گردان (روتاری) پاک‌اندیشان با ترکیب مزایای فر تونلی و فضای کم تنورهای گردان، گزینه‌ای ایده‌آل برای نانوایی‌های پرتردد شهری و کارگاه‌های صنعتی است. عایق‌کاری پیشرفته و مشعل بهینه، پختی یکنواخت با کمترین هزینه انرژی ایجاد می‌کند.',
      en: 'Combining tunnel-oven productivity with the compact footprint of rotary design, this oven is engineered for high-traffic urban bakeries and industrial baking plants.',
    },
    highlights: {
      fa: [
        'قابلیت پخت هر دو نوع نان لواش و تافتون با تنظیم سریع',
        'اشغال فضای بهینه نسبت به تونل‌های خطی بلند',
        'گردش حرارت متوازن در کل مسیر پخت',
      ],
      en: [
        'Fast switching between lavash and taftoon baking profiles',
        'Space-saving footprint compared to long linear tunnels',
        'Balanced thermal circulation throughout the chamber',
      ],
    },
    specs: [
      { label: { fa: 'نوع پخت', en: 'Oven Type' }, value: { fa: 'تونلی گردان (روتاری)', en: 'Rotary Tunnel' } },
      { label: { fa: 'محصولات', en: 'Products' }, value: { fa: 'نان لواش و تافتون', en: 'Lavash & Taftoon' } },
    ],
    relatedSlugs: ['lavash-rotary-automatic-set', 'tafton-rotary-automatic-set', 'rotary-bakery-turntable'],
  },
  {
    id: 259,
    slug: 'rotary-bakery-oven',
    category: 'tafton',
    image: '/assets/pakandishan/products/rotary-bakery-oven.webp',
    name: {
      fa: 'تنور دوار نانوایی پاک‌اندیشان',
      en: 'Pakandishan Revolving Bakery Oven',
      ar: 'التنور الدوار للمخابز باك أنديشان',
      tr: 'Pakandishan Döner Tandır Fırını',
      ru: 'Вращающаяся печь-тандыр Пакандишан',
    },
    tagline: {
      fa: 'پخت سنتی و باکیفیت با ایمنی و عایق صنعتی',
      en: 'Traditional Hearth Quality with Industrial Safety & Insulation',
    },
    shortDescription: {
      fa: 'تنور دوار تمام‌استیل با چرخش نرم صفحه چدنی، عایق حرارتی ضخیم و کنترل دقیق شعله برای نانوایی‌های سنتی مدرن.',
      en: 'Stainless-steel revolving hearth oven with smooth cast-iron rotation, thick insulation, and precise burner control.',
    },
    fullDescription: {
      fa: 'تنور دوار نانوایی پاک‌اندیشان با بهره‌گیری از چدن مقاوم در برابر شوک حرارتی، گیربکس بی‌صدا و عایق‌کاری چندلایه، ضمن حفظ طعم اصیل نان سنتی، محیط کار خنک‌تر و مصرف انرژی بسیار پایین‌تری نسبت به تنورهای قدیمی فراهم می‌آورد.',
      en: 'Built with thermal-shock-resistant cast-iron plates, silent gear drive, and multi-layer insulation, Pakandishan’s revolving oven delivers traditional bread flavor with a cooler workspace and lower fuel bills.',
    },
    highlights: {
      fa: [
        'صفحه پخت مقاوم با توزیع یکنواخت دما در کل سطح',
        'سیستم محرکه نرم و کم‌صدا با طول عمر بالا',
        'قابلیت اتصال مستقیم به پهن‌کن شاطریار و ربات شاطر',
      ],
      en: [
        'Heavy-duty hearth plate with even heat distribution',
        'Quiet, long-life electromechanical rotary drive',
        'Compatible with Shateryar sheeters and robotic shater',
      ],
    },
    specs: [
      { label: { fa: 'نوع دستگاه', en: 'Type' }, value: { fa: 'تنور دوار نانوایی', en: 'Revolving Bakery Oven' } },
      { label: { fa: 'کاربرد', en: 'Usage' }, value: { fa: 'لواش، تافتون و نان‌های محلی', en: 'Lavash, Taftoon & Regional Flatbreads' } },
    ],
    relatedSlugs: ['tafton-rotary-automatic-set', 'shateryar-round-3in1', 'robot-shater-automatic'],
  },
  {
    id: 1723,
    slug: 'barbari-tunnel-oven',
    category: 'barbari',
    image: '/assets/pakandishan/products/barbari-tunnel-oven.webp',
    name: {
      fa: 'دستگاه تونلی پخت نان بربری — نانوایی مدرن',
      en: 'Modern Tunnel Oven for Barbari Bread',
      ar: 'الفرن النفقي الحديث لخبز البربري',
      tr: 'Modern Tünel Barbari Fırını',
      ru: 'Современная туннельная печь для барбари',
    },
    tagline: {
      fa: 'فر تونلی تخصصی بربری با راندمان حرارتی ممتاز',
      en: 'Dedicated Barbari Tunnel Oven with Superior Thermal Efficiency',
    },
    shortDescription: {
      fa: 'فر تونلی مدرن مخصوص نان بربری با نوار نسوز مقاوم، مشعل‌های قابل تنظیم و پخت یکنواخت از ابتدا تا انتهای تونل.',
      en: 'Modern tunnel oven engineered specifically for barbari bread with heat-resistant belt and zoned burner regulation.',
    },
    fullDescription: {
      fa: 'دستگاه تونلی پخت نان بربری پاک‌اندیشان با طراحی کاملاً مهندسی برای نانوایی‌های مدرن و کارگاه‌های تولید نان فانتزی و سنتی ساخته شده است. کنترل مستقل دمای سقف و کف، رنگ طلایی و بافت پوک استاندارد را در هر پخت تضمین می‌کند.',
      en: 'Engineered for modern barbari bakeries and commercial baking workshops, offering independent ceiling and floor heat profiles for repeatable golden crust and soft texture.',
    },
    highlights: {
      fa: [
        'پخت کاملاً غیرمستقیم و بهداشتی بدون تماس مستقیم دود با نان',
        'کنترل دیجیتال سرعت نوار و دمای محفظه پخت',
        'بدنه تمام استیل با عایق‌کاری متراکم جهت حفظ انرژی',
      ],
      en: [
        'Clean indirect thermal baking with zero flue contact',
        'Digital belt speed and chamber temperature control',
        'Dense insulation inside food-grade stainless steel housing',
      ],
    },
    specs: [
      { label: { fa: 'ساختار', en: 'Structure' }, value: { fa: 'فر تونلی خطی تمام‌استیل', en: 'Stainless Linear Tunnel Oven' } },
      { label: { fa: 'نوع نان', en: 'Bread Type' }, value: { fa: 'نان بربری و نان‌های حجیم سنتی', en: 'Barbari & Semi-Hearth Loaves' } },
    ],
    relatedSlugs: ['barbari-automatic-set', 'barbari-sangak-injector', 'sesame-sprinkler'],
  },
  {
    id: 1733,
    slug: 'shateryar-rectangular-3in1',
    category: 'sheeters',
    image: '/assets/pakandishan/products/shateryar-rectangular-3in1.webp',
    name: {
      fa: 'خمیر پهن‌کن مستطیل‌بر شاطریار — سه‌کاره',
      en: 'Shateryar 3-in-1 Rectangular Dough Sheeter',
      ar: 'فرادة العجين المستطيلة شاطريار (٣ في ١)',
      tr: 'Şateryar 3’ü 1 Arada Dikdörtgen Hamur Açıcı',
      ru: 'Тестораскаточная машина Шатерьяр 3-в-1 (прямоугольная)',
    },
    tagline: {
      fa: 'پهن‌کن سه‌کاره اختصاصی نان‌های مستطیلی لواش',
      en: 'Dedicated 3-in-1 Sheeter for Rectangular Flatbreads',
    },
    shortDescription: {
      fa: 'دستگاه سه‌کاره شاطریار با قالب مستطیل‌بر دقیق، بدون ایجاد ضایعات خمیر و با ضخامت کاملاً یکنواخت.',
      en: 'Three-in-one Shateryar sheeter with clean rectangular cutting, zero dough trim waste, and uniform sheet thickness.',
    },
    fullDescription: {
      fa: 'خمیر پهن‌کن مستطیل‌بر شاطریار تمامی نیازهای نانوایی‌های لواش مستطیلی را در یک واحد فشرده و استاندارد پاسخ می‌دهد. استفاده از غلطک‌های بهداشتی و نوارهای مورد تأیید صنایع غذایی، دوام و کیفیت کارکرد روزمره را تضمین می‌کند.',
      en: 'Purpose-built for rectangular lavash bakeries, integrating sanitary rollers and food-certified belts in a compact, easy-to-clean chassis.',
    },
    highlights: {
      fa: [
        'برش مستطیلی دقیق با حداقل دورریز و بازگشت خمیر',
        'غلطک‌ها و قطعات تمام بهداشتی با تنظیم سریع ضخامت',
        'سازگار با ست ربات لواش و فرهای تونلی گردان',
      ],
      en: [
        'Clean rectangular cut minimizing trim recirculation',
        'Sanitary rollers with quick thickness calibration',
        'Seamless pairing with robotic lavash sets and rotary ovens',
      ],
    },
    specs: [
      { label: { fa: 'نوع برش', en: 'Cut Shape' }, value: { fa: 'مستطیل‌بر دقیق', en: 'Precision Rectangular Cut' } },
      { label: { fa: 'عملکرد', en: 'Function' }, value: { fa: 'سه‌کاره شاطریار', en: '3-in-1 Shateryar' } },
    ],
    relatedSlugs: ['shateryar-round-3in1', 'lavash-robot-set', 'lavash-rotary-automatic-set'],
  },
  {
    id: 4007,
    slug: 'lavash-robot-set',
    category: 'lavash',
    image: '/assets/pakandishan/products/lavash-robot-set.webp',
    name: {
      fa: 'ست ربات لواش (نان مستطیلی)',
      en: 'Robotic Lavash Set (Rectangular Bread)',
      ar: 'مجموعة روبوت اللافاش (خبز مستطيل)',
      tr: 'Robotik Lavaş Seti (Dikdörtgen Ekmek)',
      ru: 'Роботизированный комплекс для прямоугольного лаваша',
    },
    tagline: {
      fa: 'ترکیب ربات شاطر، پهن‌کن مستطیل‌بر و تنور دوار',
      en: 'Integrated Robotic Shater, Rectangular Sheeter & Revolving Oven',
    },
    shortDescription: {
      fa: 'مجموعه رباتیک کامل برای پخت نان لواش مستطیلی بدون دخالت دست و با ریتم پایدار تولید.',
      en: 'Complete robotic production line for rectangular lavash bread with touch-free hygiene and steady throughput.',
    },
    fullDescription: {
      fa: 'ست ربات لواش پاک‌اندیشان با ترکیب هماهنگ پهن‌کن مستطیل‌بر، ربات ضربه‌زن اتوماتیک و تنور پخت، فرآیند تولید نان لواش مستطیلی را به سطح کاملاً مکانیزه و بهداشتی ارتقا می‌دهد.',
      en: 'Synchronizing rectangular sheeting, automated robotic placement, and revolving hearth baking, this set modernizes traditional lavash output with industrial precision.',
    },
    highlights: {
      fa: [
        'هماهنگی نرم‌افزاری و مکانیکی میان پهن‌کن و ربات ضربه‌زن',
        'کاهش چشمگیر نیاز به نیروی کار ماهر در پای تنور',
        'کیفیت و ابعاد کاملاً یکسان در تمام نان‌های خروجی',
      ],
      en: [
        'Synchronized electromechanical timing between sheeter and robot arm',
        'Reduces dependence on high-heat manual oven labor',
        'Consistent dimensions and baking across every loaf',
      ],
    },
    specs: [
      { label: { fa: 'نوع نان', en: 'Bread Type' }, value: { fa: 'نان لواش مستطیلی', en: 'Rectangular Lavash' } },
      { label: { fa: 'اتوماسیون', en: 'Automation' }, value: { fa: 'ست کامل رباتیک', en: 'Full Robotic Set' } },
    ],
    relatedSlugs: ['robot-shater-automatic', 'shateryar-rectangular-3in1', 'lavash-rotary-automatic-set'],
  },
  {
    id: 7954,
    slug: 'barbari-sangak-injector',
    category: 'barbari',
    image: '/assets/pakandishan/products/barbari-sangak-injector.webp',
    name: {
      fa: 'دستگاه تزریق خمیر بربری و سنگک',
      en: 'Barbari & Sangak Dough Injection Machine',
      ar: 'جهاز حقن عجين البربري والسنغك',
      tr: 'Barbari ve Sengak Hamur Enjeksiyon Makinesi',
      ru: 'Дозатор-инжектор теста для барбари и сангака',
    },
    tagline: {
      fa: 'پهن‌کردن و تزریق دقیق خمیرهای شل بدون آسیب به بافت',
      en: 'Gentle High-Hydration Dough Forming Without Degassing',
    },
    shortDescription: {
      fa: 'طراحی ویژه برای خمیرهای با رطوبت بالای سنگک و بربری جهت فرم‌دهی یکنواخت و انتقال مستقیم به نوار فر تونلی.',
      en: 'Engineered specifically for high-hydration sangak and barbari doughs, delivering even forming directly onto tunnel oven belts.',
    },
    fullDescription: {
      fa: 'دستگاه تزریق بربری و سنگک پاک‌اندیشان با مکانیزم تغذیه ملایم، ساختار تخلخل و تخمیر خمیرهای شل را حفظ کرده و وزن و ضخامت هر نان را با دقت بالا یکسان‌سازی می‌کند.',
      en: 'Using a gentle extrusion mechanism, this machine preserves fermentation structure in high-hydration doughs while keeping every loaf uniform in weight and thickness.',
    },
    highlights: {
      fa: [
        'حفظ کامل بافت تخمیرشده خمیرهای پرآب بربری و سنگک',
        'تنظیم دقیق وزن، عرض و ضخامت خمیر خروجی',
        'مخزن و اجزای تمام استیل با شستشوی سریع',
      ],
      en: [
        'Preserves delicate fermented structure of high-hydration dough',
        'Accurate control of loaf weight, width, and thickness',
        'Food-grade stainless hopper engineered for rapid washdown',
      ],
    },
    specs: [
      { label: { fa: 'کاربرد', en: 'Usage' }, value: { fa: 'خمیر بربری و سنگک', en: 'Barbari & Sangak Dough' } },
      { label: { fa: 'جنس مخزن', en: 'Hopper Material' }, value: { fa: 'استیل ضدزنگ گرید غذایی', en: 'Food-Grade Stainless Steel' } },
    ],
    relatedSlugs: ['barbari-automatic-set', 'sangak-automatic-set', 'sesame-sprinkler'],
  },
  {
    id: 1707,
    slug: 'standard-rectangular-sheeter-linear',
    category: 'sheeters',
    image: '/assets/pakandishan/products/standard-rectangular-sheeter-linear.webp',
    name: {
      fa: 'خمیر پهن‌کن مستطیل‌بر معمولی — مناسب تونلی خطی',
      en: 'Standard Rectangular Sheeter (Linear Tunnel)',
      ar: 'فرادة عجين مستطيلة عادية (للأفران النفقية الخطية)',
      tr: 'Standart Dikdörtgen Hamur Açıcı (Doğrusal Tünel)',
      ru: 'Прямоугольная тестораскатка (для линейных печей)',
    },
    tagline: {
      fa: 'پهن‌کن اقتصادی و دقیق مخصوص خطوط تونلی خطی',
      en: 'Reliable Precision Sheeting for Linear Tunnel Ovens',
    },
    shortDescription: {
      fa: 'پهن‌کن مستطیل‌بر با ساختار مقاوم و نگهداری آسان، طراحی‌شده برای هماهنگی کامل با فرهای تونلی خطی.',
      en: 'Durable rectangular dough sheeter built for direct synchronization with linear tunnel baking ovens.',
    },
    fullDescription: {
      fa: 'این مدل پهن‌کن با تمرکز بر سادگی کارکرد، استحکام مکانیکی بالا و سرعت تغذیه پایدار برای نانوایی‌های مجهز به فرهای تونلی خطی طراحی شده است.',
      en: 'Focused on mechanical reliability, straightforward operation, and consistent feed speed for linear tunnel oven lines.',
    },
    highlights: {
      fa: [
        'هماهنگی دقیق ارتفاع و سرعت با خطوط تونلی خطی',
        'تنظیم آسان ضخامت خمیر و دسترسی ساده به غلطک‌ها',
      ],
      en: [
        'Matched height and belt speed for linear tunnel lines',
        'Simple thickness adjustment and fast roller access',
      ],
    },
    specs: [
      { label: { fa: 'سازگاری', en: 'Compatibility' }, value: { fa: 'فرهای تونلی خطی', en: 'Linear Tunnel Ovens' } },
      { label: { fa: 'برش', en: 'Cut' }, value: { fa: 'مستطیل‌بر', en: 'Rectangular' } },
    ],
    relatedSlugs: ['standard-round-sheeter-linear', 'standard-rectangular-sheeter-rotary', 'shateryar-rectangular-3in1'],
  },
  {
    id: 1706,
    slug: 'standard-round-sheeter-linear',
    category: 'sheeters',
    image: '/assets/pakandishan/products/standard-round-sheeter-linear.webp',
    name: {
      fa: 'خمیر پهن‌کن گردبر معمولی — مناسب تونلی خطی',
      en: 'Standard Round Sheeter (Linear Tunnel)',
      ar: 'فرادة عجين دائرية عادية (للأفران النفقية الخطية)',
      tr: 'Standart Yuvarlak Hamur Açıcı (Doğrusal Tünel)',
      ru: 'Круглая тестораскатка (для линейных печей)',
    },
    tagline: {
      fa: 'برش گرد یکنواخت برای خطوط تونلی خطی',
      en: 'Uniform Round Dough Cutting for Linear Tunnels',
    },
    shortDescription: {
      fa: 'پهن‌کن گردبر صنعتی با قالب دقیق برای انتقال مستقیم خمیر گرد به ورودی فرهای تونلی خطی.',
      en: 'Industrial round-cut sheeter engineered to feed uniform circular dough directly into linear tunnel ovens.',
    },
    fullDescription: {
      fa: 'خمیر پهن‌کن گردبر معمولی پاک‌اندیشان با دقت بالا در ضخامت‌دهی و برش دایره‌ای، گزینه‌ای مطمئن برای خطوط پخت تونلی نان لواش و تافتون است.',
      en: 'Delivers consistent dough thickness and crisp round cuts tailored for linear tunnel lavash and taftoon production.',
    },
    highlights: {
      fa: [
        'برش گرد منظم با قطر استاندارد',
        'سازه فلزی مقاوم با قطعات بهداشتی در تماس با خمیر',
      ],
      en: [
        'Consistent round cutting with calibrated diameter',
        'Rugged frame with sanitary food-contact components',
      ],
    },
    specs: [
      { label: { fa: 'سازگاری', en: 'Compatibility' }, value: { fa: 'فرهای تونلی خطی', en: 'Linear Tunnel Ovens' } },
      { label: { fa: 'برش', en: 'Cut' }, value: { fa: 'گردبر', en: 'Round' } },
    ],
    relatedSlugs: ['standard-rectangular-sheeter-linear', 'standard-round-sheeter-rotary', 'shateryar-round-3in1'],
  },
  {
    id: 4030,
    slug: 'standard-rectangular-sheeter-rotary',
    category: 'sheeters',
    image: '/assets/pakandishan/products/standard-rectangular-sheeter-rotary.webp',
    name: {
      fa: 'پهن‌کن مستطیل‌بر معمولی — مناسب روتاری',
      en: 'Standard Rectangular Sheeter (Rotary)',
      ar: 'فرادة عجين مستطيلة (للأفران الدوارة روتاري)',
      tr: 'Standart Dikdörtgen Hamur Açıcı (Döner Fırın)',
      ru: 'Прямоугольная тестораскатка (для ротационных печей)',
    },
    tagline: {
      fa: 'طراحی اختصاصی برای تغذیه فرهای تونلی گردان روتاری',
      en: 'Calibrated Feed Geometry for Rotary Tunnel Ovens',
    },
    shortDescription: {
      fa: 'پهن‌کن مستطیل‌بر هماهنگ با زاویه و سرعت ورودی دستگاه‌های تونلی گردان روتاری پاک‌اندیشان.',
      en: 'Rectangular sheeter engineered to match the exact intake height and rhythm of Pakandishan rotary tunnel ovens.',
    },
    fullDescription: {
      fa: 'این دستگاه به‌طور اختصاصی برای کارکرد مداوم در کنار فرهای تونلی گردان روتاری طراحی شده و خمیر لواش مستطیلی را با ضخامت دلخواه و بدون کشیدگی به داخل محفظه هدایت می‌کند.',
      en: 'Purpose-built to run continuously beside rotary tunnel ovens, guiding tension-free rectangular dough sheets smoothly into the baking chamber.',
    },
    highlights: {
      fa: [
        'هماهنگی کامل با فر تونلی گردان روتاری',
        'تنظیم سریع ضخامت خمیر بدون توقف خط',
      ],
      en: [
        'Exact alignment with rotary tunnel oven intake',
        'On-the-fly thickness adjustment without halting production',
      ],
    },
    specs: [
      { label: { fa: 'سازگاری', en: 'Compatibility' }, value: { fa: 'فر تونلی گردان (روتاری)', en: 'Rotary Tunnel Ovens' } },
      { label: { fa: 'برش', en: 'Cut' }, value: { fa: 'مستطیل‌بر', en: 'Rectangular' } },
    ],
    relatedSlugs: ['standard-round-sheeter-rotary', 'lavash-rotary-automatic-set', 'rotary-tunnel-lavash-tafton'],
  },
  {
    id: 4020,
    slug: 'standard-round-sheeter-rotary',
    category: 'sheeters',
    image: '/assets/pakandishan/products/standard-round-sheeter-rotary.webp',
    name: {
      fa: 'پهن‌کن گردبر معمولی — مناسب روتاری',
      en: 'Standard Round Sheeter (Rotary)',
      ar: 'فرادة عجين دائرية (للأفران الدوارة روتاري)',
      tr: 'Standart Yuvarlak Hamur Açıcı (Döner Fırın)',
      ru: 'Круглая тестораскатка (для ротационных печей)',
    },
    tagline: {
      fa: 'تغذیه یکنواخت نان‌های گرد برای فر روتاری',
      en: 'Smooth Round Flatbread Feeding for Rotary Ovens',
    },
    shortDescription: {
      fa: 'پهن‌کن گردبر ویژه خطوط روتاری با قابلیت تنظیم دقیق ضخامت و انتقال نرم خمیر به صفحه پخت.',
      en: 'Round dough sheeter designed for rotary lines with fine thickness adjustment and smooth transfer onto the baking deck.',
    },
    fullDescription: {
      fa: 'دستگاه پهن‌کن معمولی گردبر برای پهن کردن خمیر نان لواش و تافتون گرد طراحی شده است؛ به‌طوری‌که خمیر پس از پهن شدن با ضخامت قابل تنظیم و برش دقیق، مستقیماً به داخل دستگاه تونلی گردان هدایت می‌شود.',
      en: 'Shapes and cuts circular lavash and taftoon dough to adjustable thickness and transfers it smoothly straight into the rotary tunnel chamber.',
    },
    highlights: {
      fa: [
        'برش گرد تمیز و ضخامت یکنواخت در کل سطح خمیر',
        'انتقال مستقیم به ورودی فر تونلی گردان روتاری',
      ],
      en: [
        'Clean circular cut with uniform thickness edge-to-edge',
        'Direct transfer into rotary tunnel oven intake',
      ],
    },
    specs: [
      { label: { fa: 'سازگاری', en: 'Compatibility' }, value: { fa: 'فر تونلی گردان (روتاری)', en: 'Rotary Tunnel Ovens' } },
      { label: { fa: 'برش', en: 'Cut' }, value: { fa: 'گردبر', en: 'Round' } },
    ],
    relatedSlugs: ['standard-rectangular-sheeter-rotary', 'tafton-rotary-automatic-set', 'rotary-tunnel-lavash-tafton'],
  },
  {
    id: 4052,
    slug: 'rotary-bakery-turntable',
    category: 'accessories',
    image: '/assets/pakandishan/products/rotary-bakery-turntable.webp',
    name: {
      fa: 'میز گردان نانوایی (مخصوص تونلی گردان)',
      en: 'Rotary Bakery Cooling & Collection Turntable',
      ar: 'الطاولة الدوارة للمخابز',
      tr: 'Döner Ekmek Soğutma ve Toplama Masası',
      ru: 'Поворотный стол для сбора и охлаждения хлеба',
    },
    tagline: {
      fa: 'جمع‌آوری و خنک‌سازی منظم نان در خروجی فر',
      en: 'Hygienic Bread Cooling & Collection at Oven Discharge',
    },
    shortDescription: {
      fa: 'میز گردان تمام‌استیل جهت دریافت، خنک‌سازی اولیه و سهولت تحویل نان در انتهای خطوط پخت روتاری.',
      en: 'Stainless-steel rotary table streamlining bread cooling, inspection, and customer handover at the oven exit.',
    },
    fullDescription: {
      fa: 'میز گردان نانوایی پاک‌اندیشان با سطح تمام استیل ضدزنگ و چرخش آرام و کنترل‌شده، از روی‌هم افتادن نان‌های داغ جلوگیری کرده و روند بسته‌بندی یا تحویل به مشتری را کاملاً منظم و بهداشتی می‌کند.',
      en: 'With a food-grade stainless surface and gentle controlled rotation, this turntable prevents hot flatbreads from sticking while organizing packaging and customer service.',
    },
    highlights: {
      fa: [
        'سطح تمام استیل ضدزنگ با نظافت سریع و بهداشتی',
        'سرعت چرخش ملایم و متناسب با خروجی فر روتاری',
      ],
      en: [
        'Food-grade stainless surface for effortless daily sanitation',
        'Gentle rotation matched to rotary oven discharge speed',
      ],
    },
    specs: [
      { label: { fa: 'کاربرد', en: 'Usage' }, value: { fa: 'خنک‌سازی و تحویل نان خروجی فر', en: 'Post-Bake Cooling & Collection' } },
      { label: { fa: 'متریال', en: 'Material' }, value: { fa: 'استیل ضدزنگ بهداشتی', en: 'Food-Grade Stainless Steel' } },
    ],
    relatedSlugs: ['bread-stacking-machine', 'lavash-rotary-automatic-set', 'rotary-tunnel-lavash-tafton'],
  },
  {
    id: 4023,
    slug: 'bread-stacking-machine',
    category: 'accessories',
    image: '/assets/pakandishan/products/bread-stacking-machine.webp',
    name: {
      fa: 'دستگاه دسته‌بندی نان',
      en: 'Automatic Bread Stacking & Counting Machine',
      ar: 'آلة تصنيف وتكديس الخبز الأوتوماتيكية',
      tr: 'Otomatik Ekmek İstifleme ve Sayma Makinesi',
      ru: 'Автоматическая машина для укладки и счёта хлеба',
    },
    tagline: {
      fa: 'شمارش و دسته‌بندی منظم نان آماده بسته‌بندی',
      en: 'Automated Counting & Neat Stacking for Packaging Lines',
    },
    shortDescription: {
      fa: 'دستگاه هوشمند شمارش و روی‌هم‌چینی دقیق نان‌های خروجی برای آماده‌سازی سریع خطوط بسته‌بندی صنعتی.',
      en: 'Precision bread counting and stacking unit preparing freshly baked flatbreads directly for commercial packaging.',
    },
    fullDescription: {
      fa: 'دستگاه دسته‌بندی نان پاک‌اندیشان با سنسورهای شمارش دقیق و مکانیزم چیدمان ملایم، نان‌های خنک‌شده را در دسته‌های با تعداد دلخواه مرتب کرده و سرعت واحد بسته‌بندی را چند برابر می‌کند.',
      en: 'Equipped with accurate counting sensors and gentle stacking mechanics, this unit groups cooled breads into preset batch counts to accelerate industrial packaging.',
    },
    highlights: {
      fa: [
        'شمارش دقیق و تنظیم تعداد نان در هر دسته',
        'حذف تماس دست در مرحله آماده‌سازی بسته‌بندی',
      ],
      en: [
        'Accurate batch counting with configurable stack sizes',
        'Touch-free hygiene prior to packaging',
      ],
    },
    specs: [
      { label: { fa: 'عملکرد', en: 'Function' }, value: { fa: 'شمارش و دسته‌بندی اتوماتیک', en: 'Automatic Counting & Stacking' } },
      { label: { fa: 'مناسب برای', en: 'Ideal For' }, value: { fa: 'واحدهای بسته‌بندی و کارخانجات نان', en: 'Packaging & Commercial Bakeries' } },
    ],
    relatedSlugs: ['rotary-bakery-turntable', 'lavash-rotary-automatic-set', 'dough-cutting-system'],
  },
  {
    id: 7974,
    slug: 'sesame-sprinkler',
    category: 'accessories',
    image: '/assets/pakandishan/products/sesame-sprinkler.webp',
    name: {
      fa: 'دستگاه کنجدپاش اتوماتیک',
      en: 'Automatic Sesame & Seed Sprinkler',
      ar: 'رشاش السمسم الأوتوماتيكي',
      tr: 'Otomatik Susam Serpme Makinesi',
      ru: 'Автоматический дозатор посыпки кунжута',
    },
    tagline: {
      fa: 'پاشش یکنواخت کنجد و سیاه‌دانه با قابلیت بازیافت مازاد',
      en: 'Uniform Seed Application with Excess Recovery System',
    },
    shortDescription: {
      fa: 'توزیع کاملاً یکنواخت کنجد روی سطح خمیر بربری، سنگک و تافتون بدون هدررفت و با تنظیم دقیق تراکم پاشش.',
      en: 'Evenly distributes sesame and seeds over barbari, sangak, and taftoon dough with adjustable density and zero seed waste.',
    },
    fullDescription: {
      fa: 'دستگاه کنجدپاش پاک‌اندیشان با طراحی بهداشتی تمام‌استیل و قابلیت تنظیم دقیق میزان پاشش، پوشش یکدست کنجد را روی تمام سطح نان ایجاد کرده و از هدررفت دانه‌ها جلوگیری می‌کند.',
      en: 'Built in stainless steel with calibrated seed flow control, ensuring consistent topping coverage across every loaf while recovering excess seeds cleanly.',
    },
    highlights: {
      fa: [
        'تنظیم دقیق میزان و تراکم پاشش کنجد',
        'کاهش کامل ضایعات کنجد در خطوط پیوسته',
      ],
      en: [
        'Calibrated seed density adjustment',
        'Eliminates seed waste on continuous lines',
      ],
    },
    specs: [
      { label: { fa: 'کاربرد', en: 'Usage' }, value: { fa: 'خطوط بربری، سنگک و تافتون', en: 'Barbari, Sangak & Taftoon Lines' } },
      { label: { fa: 'بدنه', en: 'Build' }, value: { fa: 'استیل ضدزنگ بهداشتی', en: 'Food-Grade Stainless Steel' } },
    ],
    relatedSlugs: ['barbari-automatic-set', 'sangak-automatic-set', 'barbari-sangak-injector'],
  },
  {
    id: 7955,
    slug: 'dough-cutting-system',
    category: 'accessories',
    image: '/assets/pakandishan/products/dough-cutting-system.webp',
    name: {
      fa: 'سیستم برش دقیق خمیر و نان',
      en: 'Precision Dough & Bread Cutting System',
      ar: 'نظام تقطيع العجين والخبز الدقيق',
      tr: 'Hassas Hamur ve Ekmek Kesim Sistemi',
      ru: 'Система точной нарезки теста и хлеба',
    },
    tagline: {
      fa: 'برش یکنواخت در ابعاد سفارشی برای خطوط صنعتی',
      en: 'Custom-Dimension Uniform Cutting for Industrial Lines',
    },
    shortDescription: {
      fa: 'سیستم برش مهندسی با تیغه‌های ضدزنگ بهداشتی برای برش یکدست خمیر یا نان در ابعاد استاندارد بسته‌بندی.',
      en: 'Engineered stainless cutting unit delivering uniform dough or bread sizing for standardized commercial packaging.',
    },
    fullDescription: {
      fa: 'سیستم برش پاک‌اندیشان با دقت مکانیکی بالا و تیغه‌های استیل مقاوم، امکان برش سریع و تمیز را بدون تغییر فرم خمیر یا خرد شدن نان فراهم می‌سازد.',
      en: 'High-precision stainless blades deliver crisp, repeatable cuts without deforming fresh dough or crumbling baked flatbreads.',
    },
    highlights: {
      fa: [
        'تیغه‌های استیل بهداشتی با قابلیت تعویض و تنظیم آسان',
        'هماهنگی مستقیم با خطوط تونلی و بسته‌بندی',
      ],
      en: [
        'Easy-to-adjust sanitary stainless steel blades',
        'Direct line integration with tunnel ovens and stackers',
      ],
    },
    specs: [
      { label: { fa: 'عملکرد', en: 'Function' }, value: { fa: 'برش دقیق طولی و عرضی', en: 'Precision Cross & Length Cutting' } },
      { label: { fa: 'جنس تیغه', en: 'Blade Material' }, value: { fa: 'استیل ضدزنگ صنعتی', en: 'Industrial Stainless Steel' } },
    ],
    relatedSlugs: ['bread-stacking-machine', 'lavash-rotary-automatic-set', 'barbari-automatic-set'],
  },
];

export const COMPANY_OFFICES: CompanyOffice[] = [
  {
    id: 'urmia-hq',
    city: { fa: 'کارخانه و دفتر مرکزی ارومیه', en: 'Urmia Factory & Headquarters', ar: 'المصنع والمقر الرئيسي — أرومية', tr: 'Urmiye Fabrika ve Genel Merkez', ru: 'Завод и штаб-квартира в Урмии' },
    role: { fa: 'واحد تولیدی ۱۳,۰۰۰ متری و مرکز R&D', en: '13,000 m² Manufacturing Plant & R&D Center', ar: 'مصنع بمساحة ١٣٬٠٠٠ م² ومركز التطوير', tr: '13.000 m² Üretim Tesisi ve Ar-Ge', ru: 'Завод 13 000 м² и центр НИОКР' },
    address: {
      fa: 'آذربایجان غربی، ارومیه، ۳۵ کیلومتری جاده ارومیه به سلماس، شهرک صنعتی شماره ۳، بلوار تلاشگران شمالی، شرکت ماشین‌سازی پاک‌اندیشان',
      en: 'Km 35 Urmia–Salmas Road, Industrial Park No. 3, North Talashgaran Blvd., Pakandishan Machinery Co., Urmia, Iran',
    },
    extension: { fa: 'مرکز فروش و پشتیبانی مستقیم', en: 'Direct Factory Sales & Support' },
    phone: '09960786617',
  },
  {
    id: 'tehran',
    city: { fa: 'دفتر فروش تهران', en: 'Tehran Sales Office', ar: 'مكتب مبيعات طهران', tr: 'Tahran Satış Ofisi', ru: 'Офис продаж в Тегеране' },
    role: { fa: 'مشاوره خرید، قراردادها و مشتریان پایتخت', en: 'Capital Sales, Consultation & Contracts', ar: 'المبيعات والاستشارات والعقود', tr: 'Satış ve Proje Danışmanlığı', ru: 'Продажи и консультации' },
    address: {
      fa: 'تهران، سهروردی، سه‌راه ملک، روبه‌روی خیابان ترکمنستان، پلاک ۱۸، طبقه ۲، واحد ۴',
      en: 'Unit 4, 2nd Floor, No. 18, Opposite Torkamanestan St., Malek Intersection, Sohrevardi, Tehran',
    },
    extension: { fa: 'داخلی: ۳۰۰', en: 'Ext: 300' },
    phone: '09960786617',
  },
  {
    id: 'tabriz',
    city: { fa: 'دفتر فروش تبریز', en: 'Tabriz Regional Office', ar: 'مكتب مبيعات تبريز', tr: 'Tebriz Bölge Ofisi', ru: 'Региональный офис в Тебризе' },
    role: { fa: 'پشتیبانی منطقه شمال‌غرب و بازرگانی', en: 'Northwest Regional Sales & Support', ar: 'الدعم والمبيعات الإقليمية', tr: 'Kuzeybatı Bölge Satış ve Destek', ru: 'Региональные продажи и сервис' },
    address: {
      fa: 'تبریز، چهارراه آبرسان، جنب پل روگذر، کوی مهرگان ۳، ساختمان دیبا، طبقه ۲',
      en: '2nd Floor, Diba Bldg., Mehregan 3 Alley, Next to Overpass, Abresan Sq., Tabriz',
    },
    extension: { fa: 'داخلی: ۲۰۰ و ۲۰۱', en: 'Ext: 200, 201' },
    phone: '09960786617',
  },
];

export const EXPORT_REGIONS: ExportRegion[] = [
  {
    id: 'europe',
    regionName: { fa: 'اروپا و اسکاندیناوی', en: 'Europe & Scandinavia', ar: 'أوروبا والدول الإسكندنافية', tr: 'Avrupa ve İskandinavya', ru: 'Европа и Скандинавия' },
    countries: {
      fa: ['آلمان', 'انگلستان', 'سوئیس', 'بلژیک', 'سوئد', 'نروژ', 'فنلاند', 'دانمارک'],
      en: ['Germany', 'United Kingdom', 'Switzerland', 'Belgium', 'Sweden', 'Norway', 'Finland', 'Denmark'],
    },
  },
  {
    id: 'eurasia',
    regionName: { fa: 'اوراسیا و شرق اروپا', en: 'Eurasia & Eastern Europe', ar: 'أوراسيا وشرق أوروبا', tr: 'Avrasya ve Doğu Avrupa', ru: 'Евразия и Восточная Европа' },
    countries: {
      fa: ['روسیه', 'اوکراین', 'بلاروس', 'آذربایجان', 'قزاقستان', 'ازبکستان', 'ترکمنستان', 'گرجستان'],
      en: ['Russia', 'Ukraine', 'Belarus', 'Azerbaijan', 'Kazakhstan', 'Uzbekistan', 'Turkmenistan', 'Georgia'],
    },
  },
  {
    id: 'middle-east',
    regionName: { fa: 'خاورمیانه و همسایگان', en: 'Middle East & Neighbors', ar: 'الشرق الأوسط والدول المجاورة', tr: 'Orta Doğu ve Komşu Ülkeler', ru: 'Ближний Восток' },
    countries: {
      fa: ['امارات متحده عربی', 'ترکیه', 'عراق', 'عمان', 'لبنان'],
      en: ['United Arab Emirates', 'Turkey', 'Iraq', 'Oman', 'Lebanon'],
    },
  },
  {
    id: 'global',
    regionName: { fa: 'آمریکا، آسیا و اقیانوسیه', en: 'Americas, Asia & Oceania', ar: 'أمريكا وآسيا وأوقيانوسيا', tr: 'Amerika, Asya ve Okyanusya', ru: 'Америка, Азия и Океания' },
    countries: {
      fa: ['ایالات متحده آمریکا', 'کانادا', 'استرالیا', 'ژاپن'],
      en: ['United States', 'Canada', 'Australia', 'Japan'],
    },
  },
];

export const CERTIFICATES_AND_AWARDS: Array<{
  id: string;
  code: string;
  year: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
}> = [
  {
    id: 'iso-9001',
    code: 'ISO 9001',
    year: { fa: 'بین‌المللی', en: 'International' },
    title: { fa: 'گواهینامه سیستم مدیریت کیفیت ISO 9001', en: 'ISO 9001 Quality Management System' },
    description: {
      fa: 'استانداردسازی کامل فرآیندهای طراحی، کنترل کیفیت تولید و پاسخگویی به مشتریان در کارخانه پاک‌اندیشان.',
      en: 'End-to-end quality governance across engineering design, factory QA, and customer fulfillment.',
    },
  },
  {
    id: 'ce-mark',
    code: 'CE',
    year: { fa: 'اروپا', en: 'European Union' },
    title: { fa: 'گواهینامه انطباق و استاندارد اروپا (CE)', en: 'European Conformity Certification (CE)' },
    description: {
      fa: 'انطباق ایمنی، بهداشت و مهندسی ماشین‌آلات پاک‌اندیشان با الزامات صادرات به بازارهای اروپایی.',
      en: 'Verified mechanical, electrical, and sanitary compliance enabling exports across European markets.',
    },
  },
  {
    id: 'national-std',
    code: 'ISIRI',
    year: { fa: 'نخستین در ایران — ۱۳۹۰', en: 'First in Iran — 2011' },
    title: { fa: 'نشان ملی استاندارد ایران و ثبت اختراع پهن‌کن', en: 'Iran National Standard Mark & Patented Sheeter' },
    description: {
      fa: 'اولین واحد تولیدی دارای پروانه کاربرد علامت استاندارد ملی برای دستگاه پهن‌کن اتوماتیک خمیر نان.',
      en: 'First manufacturer licensed with the National Standard mark for automatic dough sheeting machinery.',
    },
  },
  {
    id: 'top-industry',
    code: 'R&D',
    year: { fa: '۱۳۹۰ تا ۱۳۹۵', en: '2011 – 2016+' },
    title: { fa: 'واحد نمونه صنعتی کشور، کیفی و HSEE', en: 'National Model Industrial, Quality & HSEE Unit' },
    description: {
      fa: 'واحد نمونه صنعتی کشور (۱۳۹۵)، تندیس کنگره ملی رضایتمندی مشتری (۱۳۹۱)، کارآفرین نمونه و فعال برتر اقتصادی استان.',
      en: 'Recognized as National Model Industrial Unit, Customer Satisfaction Laureate, HSEE Leader, and Model Entrepreneur.',
    },
  },
];

export const AFTER_SALES_PILLARS: Array<{
  id: string;
  number: string;
  title: LocalizedText;
  description: LocalizedText;
}> = [
  {
    id: 'warranty',
    number: '۰۱',
    title: { fa: 'گارانتی طلایی ۱۲ تا ۲۴ ماهه', en: '12 to 24-Month Golden Warranty' },
    description: {
      fa: 'پوشش کامل عیوب ساخت و نقص‌های فنی در طول دوره گارانتی به همراه بازدیدهای دوره‌ای توسط تکنسین‌های مجرب کارخانه.',
      en: 'Comprehensive coverage of manufacturing and technical defects backed by scheduled factory technician inspections.',
    },
  },
  {
    id: 'spare-parts',
    number: '۰۲',
    title: { fa: 'انبار کامل قطعات یدکی اورجینال', en: 'Dedicated Original Spare Parts Warehouse' },
    description: {
      fa: 'در پاک‌اندیشان پیش از عرضه هر دستگاه جدید، قطعات یدکی استاندارد آن تولید و در انبار خدمات مشتریان ذخیره می‌شود تا خط تولید شما هرگز متوقف نماند.',
      en: 'Pakandishan manufactures and stocks spare parts prior to launching every machine model so your bakery never faces downtime.',
    },
  },
  {
    id: 'training',
    number: '۰۳',
    title: { fa: 'نصب، راه‌اندازی و آموزش تخصصی', en: 'On-Site Commissioning & Operator Training' },
    description: {
      fa: 'تمامی کارشناسان و نصاب‌های شرکت در مرکز آموزش اختصاصی پاک‌اندیشان آموزش دیده‌اند و راه‌اندازی کامل خط را در محل نانوایی انجام می‌دهند.',
      en: 'Certified technicians trained at the Pakandishan Training Center handle full installation and hands-on operator training on site.',
    },
  },
  {
    id: 'support-247',
    number: '۰۴',
    title: { fa: 'پشتیبانی ۲۴ ساعته و اعزام سراسری', en: '24/7 Technical Support & Nationwide Dispatch' },
    description: {
      fa: 'مشاوره فنی فوری، عیب‌یابی تلفنی و اعزام سریع تیم تعمیرات اضطراری به سراسر ایران و پشتیبانی مشتریان صادراتی.',
      en: 'Rapid phone diagnostics, preventive maintenance guidance, and emergency technician dispatch nationwide and abroad.',
    },
  },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 10772,
    slug: 'article-10772',
    date: '۱۴۰۴/۰۶/۰۱',
    readTimeMin: 4,
    image: '/assets/pakandishan/blog/article-10772.webp',
    category: { fa: 'شناخت نان سنتی', en: 'Traditional Bread' },
    title: {
      fa: 'خواص نان بربری: ۵ فایده اصلی که باید بدانید',
      en: 'Health Benefits of Barbari Bread: 5 Key Facts',
    },
    excerpt: {
      fa: 'نان بربری سنتی با تخمیر اصولی، سبوس مناسب و کنجد تازه یکی از مغذی‌ترین نان‌های سفره ایرانی است که پخت یکنواخت آن در فرهای مدرن ارزش غذایی‌اش را دوچندان می‌کند.',
      en: 'Properly fermented barbari bread topped with fresh sesame delivers lasting energy, fiber, and minerals—especially when baked evenly in modern indirect ovens.',
    },
    paragraphs: {
      fa: [
        'نان بربری یکی از اصیل‌ترین و پرطرفدارترین نان‌های ایرانی است که عطر پوسته طلایی و بافت نرم آن بخش جدایی‌ناپذیر صبحانه و وعده‌های روزانه است. ارزش غذایی این نان به‌شدت به کیفیت آرد، زمان تخمیر طبیعی خمیر و نحوه پخت در تنور یا فر بستگی دارد.',
        'در فرآیند پخت مدرن با دستگاه‌های تونلی بربری، حرارت به صورت غیرمستقیم و کاملاً کنترل‌شده به سطح و کف خمیر می‌رسد. این ویژگی از سوختگی سطحی، ایجاد ترکیبات مضر و خام‌ماندگی مغز نان جلوگیری کرده و هضم نان را بسیار آسان‌تر می‌سازد.',
        'افزودن کنجد یکنواخت پیش از ورود به تونل پخت نیز منبع غنی کلسیم، منیزیم و چربی‌های مفید را به نان اضافه می‌کند. زمانی که تخمیر کامل با خمیرمایه استاندارد انجام شود، اسید فیتیک آرد تجزیه شده و جذب آهن و روی برای بدن به حداکثر می‌رسد.',
      ],
      en: [
        'Barbari is one of Iran’s most beloved traditional breads, prized for its crisp golden crust and tender crumb. Its true nutritional value depends directly on flour quality, patient natural fermentation, and even thermal baking.',
        'In modern indirect tunnel ovens, calibrated top and bottom heat prevents surface charring and raw centers, making the bread noticeably easier to digest while locking in moisture.',
        'Even sesame application prior to baking boosts calcium and healthy fats, while complete yeast fermentation neutralizes phytic acid so essential minerals are absorbed efficiently.',
      ],
    },
  },
  {
    id: 2247,
    slug: 'article-2247',
    date: '۱۴۰۴/۰۶/۰۵',
    readTimeMin: 5,
    image: '/assets/pakandishan/blog/article-2247.webp',
    category: { fa: 'تکنولوژی خمیر', en: 'Dough Science' },
    title: {
      fa: 'انواع بهبوددهنده خمیر و نحوه استفاده اصولی از آن‌ها',
      en: 'Types of Dough Improvers and How to Use Them Properly',
    },
    excerpt: {
      fa: 'آشنایی تخصصی با نقش آنزیم‌ها، امولسیفایرها و تنظیم‌کننده‌های رطوبت در افزایش حجم، ماندگاری و کیفیت پخت نان‌های صنعتی و سنتی.',
      en: 'Understanding enzymes, emulsifiers, and hydration stabilizers to improve loaf volume, softness, and shelf stability in commercial baking.',
    },
    paragraphs: {
      fa: [
        'بهبوددهنده‌های خمیر ترکیبات مجاز و تخصصی هستند که برای جبران نوسانات کیفیت آرد و استانداردسازی بافت نان در نانوایی‌های صنعتی و نیمه‌صنعتی به کار می‌روند. شناخت دقیق نوع بهبوددهنده و دوز مصرف آن نقشی کلیدی در کاهش ضایعات نان دارد.',
        'گروه اصلی بهبوددهنده‌ها شامل آنزیم‌های آمیلاز (برای تغذیه خمیرمایه و رنگ طلایی پوسته)، امولسیفایرها (برای تقویت شبکه گلوتن و تعویق بیات‌شدن) و اسید اسکوربیک (برای افزایش استحکام و تحمل خمیر در دستگاه‌های پهن‌کن اتوماتیک) است.',
        'نکته حیاتی در خطوط مکانیزه این است که دوز مصرف دقیقاً مطابق توصیه فنی (معمولاً ۰.۳ تا ۱ درصد وزن آرد) توزین شده و پیش از افزودن آب، به صورت یکنواخت با آرد خشک مخلوط شود تا در دستگاه پهن‌کن و فر تونلی نتیجه کاملاً یکدست حاصل شود.',
      ],
      en: [
        'Dough improvers are specialized food-grade formulations used to compensate for flour variability and standardize crumb texture across industrial and semi-industrial bakeries.',
        'Key functional families include amylase enzymes for fermentation support and crust color, emulsifiers for softer crumb and slower staling, and ascorbic acid for gluten tolerance through automated dough sheeters.',
        'On mechanized lines, accurate dosing (typically 0.3%–1% of flour weight) blended thoroughly into dry flour before hydration ensures repeatable volume and tear-free sheeting.',
      ],
    },
  },
  {
    id: 1648,
    slug: 'article-1648',
    date: '۱۴۰۴/۰۶/۰۴',
    readTimeMin: 5,
    image: '/assets/pakandishan/blog/article-1648.webp',
    category: { fa: 'عیب‌یابی پخت', en: 'Baking Troubleshooting' },
    title: {
      fa: 'علت سفت شدن نان و راهکارهای مهندسی جلوگیری از آن',
      en: 'Why Bread Turns Hard — Practical Prevention Guide',
    },
    excerpt: {
      fa: 'بررسی دقیق عوامل کلیدی سفت‌شدن و بیاتی زودهنگام نان شامل میزان آب خمیر، زمان پخت، دمای محفظه فر و نحوه خنک‌سازی پس از خروج.',
      en: 'Pinpointing the exact causes of tough or prematurely stale bread: hydration ratio, oven dwell time, chamber temperature, and post-bake cooling.',
    },
    paragraphs: {
      fa: [
        'سفت شدن سریع نان پس از خروج از تنور یا فر یکی از رایج‌ترین چالش‌های نانوایی‌هاست که مستقیماً روی رضایت مشتری اثر می‌گذارد. مهم‌ترین علت فنی این مشکل، تبخیر بیش از حد رطوبت در دمای نامناسب یا طولانی شدن زمان ماندگاری نان در محفظه پخت است.',
        'علاوه بر نسبت آب به آرد و ورزدهی کافی خمیر برای تشکیل شبکه گلوتن، پایداری دمای فر نقش تعیین‌کننده دارد. در دستگاه‌های تونلی گردان و خطی پاک‌اندیشان به لطف عایق‌کاری آجر نسوز و پتوی سرامیکی، دما دچار افت ناگهانی نشده و نان در زمان کوتاه‌تر با حفظ رطوبت داخلی پخته می‌شود.',
        'در نهایت، استفاده از میز گردان خنک‌کننده و خودداری از روی‌هم چیدن نان‌های بسیار داغ در کیسه پلاستیکی باعث می‌شود بخار اضافی به‌درستی خارج شده و بافت نان تا ساعت‌ها لطیف و تازه بماند.',
      ],
      en: [
        'Bread hardening shortly after baking directly impacts customer retention. The primary technical cause is excessive moisture evaporation caused by low chamber heat paired with overly long bake times.',
        'Alongside proper hydration and gluten development, thermal stability inside the oven is decisive. Dual-insulated refractory and ceramic chambers prevent temperature drops so loaves bake quickly while retaining internal softness.',
        'Finally, allowing hot loaves to vent briefly on a stainless cooling turntable before stacking or bagging keeps the crumb tender for hours.',
      ],
    },
  },
  {
    id: 9690,
    slug: 'article-9690',
    date: '۱۴۰۴/۰۵/۱۸',
    readTimeMin: 6,
    image: '/assets/pakandishan/blog/article-9690.webp',
    category: { fa: 'راهنمای سرمایه‌گذاری', en: 'Business Guide' },
    title: {
      fa: 'راهنمای کامل و برآورد هزینه راه‌اندازی نانوایی مدرن در ایران',
      en: 'Complete Guide to Launching a Modern Commercial Bakery',
    },
    excerpt: {
      fa: 'هر آنچه پیش از خرید دستگاه نانوایی، انتخاب مکان، مجوزها و برآورد سرمایه برای راه‌اندازی یک واحد پخت سودآور و استاندارد باید بدانید.',
      en: 'Everything to evaluate before purchasing bakery equipment: line selection, space planning, utility requirements, and return on investment.',
    },
    paragraphs: {
      fa: [
        'راه‌اندازی یک نانوایی مدرن و مکانیزه به دلیل تقاضای دائمی و روزمره، یکی از پایدارترین کسب‌وکارهای تولیدی به شمار می‌رود. موفقیت مالی این واحدها در گرو انتخاب درست نوع خط پخت متناسب با ظرفیت فروش منطقه و فضای مغازه است.',
        'برای فضاهای محدود شهری، استفاده از ست‌های تونلی گردان (روتاری) لواش و تافتون همراه با پهن‌کن سه‌کاره شاطریار بیشترین بازدهی را در کمترین متراژ ایجاد می‌کند و هزینه نیروی انسانی را به‌شکل چشمگیری کاهش می‌دهد.',
        'تیم مشاوره مهندسی پاک‌اندیشان پیش از خرید، بر اساس متراژ محیط، انشعابات گاز و برق و ظرفیت تولید هدف، بهترین چیدمان خط تولید و برآورد دقیق سرمایه را به‌صورت رایگان در اختیار متقاضیان قرار می‌دهد.',
      ],
      en: [
        'Because bread enjoys steady everyday demand, launching a mechanized bakery remains one of the most resilient manufacturing investments—provided equipment capacity matches local demand and floor space.',
        'For compact urban shops, rotary tunnel ovens paired with a 3-in-1 Shateryar sheeter maximize hourly yield per square meter while sharply reducing manual labor costs.',
        'Before any purchase, Pakandishan’s engineering desk provides free layout guidance, utility sizing, and capacity planning tailored to your site.',
      ],
    },
  },
  {
    id: 1116,
    slug: 'article-1116',
    date: '۱۴۰۴/۰۶/۰۴',
    readTimeMin: 4,
    image: '/assets/pakandishan/blog/article-1116.webp',
    category: { fa: 'عیب‌یابی پخت', en: 'Baking Troubleshooting' },
    title: {
      fa: 'علت خشک شدن نان در فر و روش تنظیم استاندارد دما',
      en: 'Preventing Dry Bread in Ovens: Mastering Thermal Balance',
    },
    excerpt: {
      fa: 'چگونه با تنظیم دقیق سرعت نوار، رطوبت خمیر و شعله مشعل، نانی لطیف، مغزپخت و خوش‌خوراک تولید کنیم؟',
      en: 'How calibrating belt speed, hydration, and burner flame produces tender, thoroughly baked bread every cycle.',
    },
    paragraphs: {
      fa: [
        'خشک شدن نان داخل فر معمولاً زمانی رخ می‌دهد که دمای محفظه پایین‌تر از حد استاندارد بوده و نانوا برای رنگ‌گرفتن نان مجبور به کاهش سرعت حرکت صفحه یا نوار پخت می‌شود. در نتیجه، رطوبت مغز نان پیش از طلایی شدن پوسته تبخیر می‌گردد.',
        'تنظیم دقیق نسبت هوا به سوخت در مشعل و پیش‌گرمایش کامل آجرهای نسوز پیش از شروع پخت، باعث انتقال سریع حرارت تابشی و تشکیل فوری پوسته محافظ رطوبت می‌شود.',
      ],
      en: [
        'Dryness inside the oven typically occurs when chamber temperature is too low, forcing operators to slow the belt to get color—evaporating internal moisture in the process.',
        'Preheating refractory bricks thoroughly and calibrating burner air-fuel ratio creates instant radiant heat that seals internal moisture inside a crisp crust.',
      ],
    },
  },
  {
    id: 8542,
    slug: 'article-8542',
    date: '۱۴۰۴/۰۵/۰۶',
    readTimeMin: 5,
    image: '/assets/pakandishan/blog/article-8542.webp',
    category: { fa: 'نکات فنی پخت', en: 'Technical Tips' },
    title: {
      fa: 'چرا نان در فر پف نمی‌کند؟ ۷ دلیل اصلی و راه‌حل عملی',
      en: 'Why Bread Fails to Rise in the Oven: 7 Root Causes & Fixes',
    },
    excerpt: {
      fa: 'بررسی علمی نقش دمای آب، سلامت خمیرمایه، استراحت میانی خمیر و شوک حرارتی ابتدای پخت در ایجاد پف و تخلخل استاندارد.',
      en: 'The science of water temperature, yeast viability, intermediate proofing, and initial oven spring for airy bread structure.',
    },
    paragraphs: {
      fa: [
        'پف مطلوب نان در ثانیه‌های اول ورود به فر (Oven Spring) حاصل انبساط سریع گازهای تولیدشده توسط خمیرمایه در برخورد با حرارت استاندارد است. هرگونه اختلال در دمای آب خمیرگیری، زمان استراحت چانه یا دمای اولیه فر می‌تواند مانع این فرآیند شود.',
        'استفاده از دمای متعادل محیط خمیرخانه (۲۴ تا ۲۸ درجه)، جلوگیری از فشار بیش‌ازحد غلطک در پهن‌کن و اطمینان از دمای پایدار محفظه پخت، ۷ کلید اصلی دستیابی به بافتی سبک و متخلخل هستند.',
      ],
      en: [
        'Proper oven spring occurs in the first seconds of baking when yeast gases rapidly expand under calibrated heat. Errors in water temperature, proofing time, or initial hearth heat suppress this rise.',
        'Maintaining a 24–28°C dough room, avoiding excessive roller compression during sheeting, and keeping steady oven heat guarantee light, open crumb structure.',
      ],
    },
  },
];

export function getProductsByCategory(category: CatalogCategoryId | 'all'): CatalogProduct[] {
  if (category === 'all') return PAKANDISHAN_PRODUCTS;
  if (category === 'robotics') {
    return PAKANDISHAN_PRODUCTS.filter(
      (p) => p.category === 'robotics' || p.category === 'accessories'
    );
  }
  return PAKANDISHAN_PRODUCTS.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return PAKANDISHAN_PRODUCTS.find((p) => p.slug === slug);
}

export function getBlogBySlug(slug: string): BlogArticle | undefined {
  return BLOG_ARTICLES.find((a) => a.slug === slug);
}
