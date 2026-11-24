export type Language = 'fa' | 'en';
export type Direction = 'rtl' | 'ltr';

export interface Translations {
  common: {
    brandName: string;
    brandShortName: string;
    brandTagline: string;
    brandDescription: string;
    officialWebsite: string;
    requestConsultation: string;
    scrollCue: string;
    languageName: string;
    otherLanguageCode: Language;
    otherLanguageLabel: string;
    unitsLabel: string;
    degreeLabel: string;
    percentLabel: string;
    loadingVideo: string;
  };
  nav: {
    home: string;
    technology: string;
    products: string;
    about: string;
    contact: string;
    mobileMenuTitle: string;
    mobileConsultationBtn: string;
    closeMenu: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subtitle: string;
    featureTag1: string;
    featureTag2: string;
    featureTag3: string;
    ctaPrimary: string;
    ctaSecondary: string;
    settledIndicator: string;
  };
  technology: {
    badge: string;
    title: string;
    subtitle: string;
    pillar01Num: string;
    pillar01Title: string;
    pillar01Desc: string;
    pillar02Num: string;
    pillar02Title: string;
    pillar02Desc: string;
    pillar03Num: string;
    pillar03Title: string;
    pillar03Desc: string;
    pillar04Num: string;
    pillar04Title: string;
    pillar04Desc: string;
    spec1: string;
    spec2: string;
    spec3: string;
  };
  products: {
    badge: string;
    title: string;
    subtitle: string;
    viewSpecs: string;
    modalInquire: string;
    modalClose: string;
    primaryApplications: string;
    designHighlights: string;
    items: Array<{
      id: string;
      name: string;
      category: string;
      shortDescription: string;
      fullDescription: string;
      highlights: string[];
      applications: string[];
      structureNote: string;
    }>;
  };
  categories: {
    badge: string;
    title: string;
    explorePrefix: string;
    items: Array<{
      id: string;
      title: string;
      subtitle: string;
      description: string;
      targetProductId: string;
    }>;
  };
  dashboard: {
    badge: string;
    title: string;
    description: string;
    cadRenderLabel: string;
    profilesTabLabel: string;
    statusHeatingLabel: string;
    statusControlLabel: string;
    statusOperationLabel: string;
    statusReadinessLabel: string;
    gauge1Title: string;
    gauge1Subtitle: string;
    gauge1Status: string;
    gauge2Title: string;
    gauge2Subtitle: string;
    gauge2Status: string;
    gaugeMaxPrefix: string;
    dailyEnergyTitle: string;
    dailyEnergyNote: string;
    airflowTitle: string;
    airflowSub: string;
    airflowMetric1: string;
    airflowMetric2: string;
    airflowStatus: string;
    chartTitle: string;
    chartSubtitle: string;
    chartActualLegend: string;
    chartTargetLegend: string;
    chartUnit: string;
    tempDeltaTarget: string;
    tempDeltaBelow: (val: number | string) => string;
    tempDeltaAbove: (val: number | string) => string;
    profiles: Array<{
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
    }>;
  };
  advantages: {
    badge: string;
    title: string;
    subtitle: string;
    items: Array<{
      id: string;
      number: string;
      title: string;
      description: string;
      iconKey: 'layers' | 'crosshair' | 'headphones' | 'award' | 'sparkles';
    }>;
  };
  showcase: {
    badge: string;
    title: string;
    description: string;
    cta: string;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    requestCta: string;
    visitPortal: string;
    plantAddressTitle: string;
    plantAddressValue: string;
    salesDeskTitle: string;
    corporateEmailTitle: string;
    workingHoursTitle: string;
    workingHoursValue: string;
    formTitle: string;
    formSubtitle: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    machineSelectLabel: string;
    machineSelectPlaceholder: string;
    machineOptions: string[];
    descriptionLabel: string;
    descriptionPlaceholder: string;
    submitButton: string;
    successTitle: string;
    successSubtitle: string;
    resetButton: string;
    privacyNote: string;
    errors: {
      fullName: string;
      phoneRequired: string;
      phoneInvalid: string;
      machineRequired: string;
      descTooShort: string;
      descTooLong: string;
    };
  };
  footer: {
    tagline: string;
    quickLinks: string;
    categories: string;
    rights: string;
    subRights: string;
    ariaWeb: string;
    ariaInstagram: string;
    ariaTelegram: string;
    ariaLinkedin: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  fa: {
    common: {
      brandName: 'گروه صنعتی پاک‌اندیشان',
      brandShortName: 'پاک‌اندیشان',
      brandTagline: 'نوآوری در صنعت نان و شیرینی',
      brandDescription:
        'طراحی و تولید ماشین‌آلات صنعتی با تکیه بر مهندسی دقیق، فناوری روز و استانداردهای حرفه‌ای تولید.',
      officialWebsite: 'pakandishan.com',
      requestConsultation: 'درخواست مشاوره',
      scrollCue: 'اسکرول کنید',
      languageName: 'فارسی',
      otherLanguageCode: 'en',
      otherLanguageLabel: 'EN',
      unitsLabel: 'عدد',
      degreeLabel: '°C',
      percentLabel: '٪',
      loadingVideo: 'در حال آماده‌سازی نمایش ویدیویی...',
    },
    nav: {
      home: 'صفحه اصلی',
      technology: 'فناوری و نوآوری',
      products: 'محصولات',
      about: 'درباره ما',
      contact: 'تماس با ما',
      mobileMenuTitle: 'منوی ناوبری موبایل',
      mobileConsultationBtn: 'درخواست مشاوره تخصصی',
      closeMenu: 'بستن منو',
    },
    hero: {
      kicker: 'مهندسی ماشین‌آلات صنعتی · pakandishan.com',
      headline: 'گروه صنعتی پاک‌اندیشان',
      subtitle:
        'طراحی و ساخت ماشین‌آلات پیشرفته پخت نان و شیرینی با تکیه بر مهندسی دقیق و فناوری روز.',
      featureTag1: 'استیل ضدزنگ AISI 304',
      featureTag2: 'سیستم بخار متمرکز',
      featureTag3: 'پایداری حرارتی ۹۲٪',
      ctaPrimary: 'مشاهده محصولات تخصصی',
      ctaSecondary: 'درخواست مشاوره خط تولید',
      settledIndicator: 'ادامه معرفی و کاتالوگ مهندسی',
    },
    technology: {
      badge: 'مهندسی و نوآوری',
      title: 'معماری مهندسی و نوآوری در فرآیند پخت',
      subtitle:
        'ترکیبی از متالورژی دقیق، مدیریت بهینه جریان حرارت و کنترل فرآیند پیوسته برای تحقق بالاترین بازدهی در خطوط تولید نان و شیرینی صنعتی.',
      pillar01Num: '۰۱',
      pillar01Title: 'طراحی مهندسی',
      pillar01Desc:
        'مدل‌سازی دقیق مکانیکی و حرارتی تمامی اجزا برای دستیابی به تعادل ساختاری، ایمنی عملیاتی و دسترسی آسان جهت نگهداری.',
      pillar02Num: '۰۲',
      pillar02Title: 'فناوری پیشرفته',
      pillar02Desc:
        'بهره‌گیری از سیستم‌های کنترل دیجیتال و الگوریتم‌های مدیریت جریان هوا و بخار برای تکرارپذیری کیفیت در هر نوبت پخت.',
      pillar03Num: '۰۳',
      pillar03Title: 'کنترل دقیق فرآیند',
      pillar03Desc:
        'پایش پایدار دما، زمان و چرخه گردش حرارت درون محفظه به منظور حفظ بافت، عطر و یکنواختی رنگ نهایی محصولات.',
      pillar04Num: '۰۴',
      pillar04Title: 'کیفیت ساخت',
      pillar04Desc:
        'استفاده از ورق‌های استیل ضدزنگ استاندارد، برش و مونتاژ دقیق صنعتی و آزمون‌های کنترلی پیش از تحویل دستگاه.',
      spec1: 'متالورژی سازه: استیل ضدزنگ بهداشتی AISI 304',
      spec2: 'سیستم کنترل: کنترلر میکروپروسسوری با حافظه برنامه‌های پخت',
      spec3: 'عایق‌بندی: پشم سنگ فشرده با دانسیته بالا برای حفظ حداکثر انرژی',
    },
    products: {
      badge: 'کاتالوگ ماشین‌آلات',
      title: 'ماشین‌آلات مهندسی‌شده پاک‌اندیشان',
      subtitle: 'تجهیزات صنعتی پخت، آماده‌سازی خمیر و خطوط پیوسته',
      viewSpecs: 'مشاهده مشخصات فنی',
      modalInquire: 'درخواست مشاوره برای این دستگاه',
      modalClose: 'بستن جزئیات',
      primaryApplications: 'کاربردهای اصلی',
      designHighlights: 'ویژگی‌های طراحی و ساخت',
      items: [
        {
          id: 'rotary-oven',
          name: 'فر گردان صنعتی',
          category: 'تجهیزات پخت صنعتی',
          shortDescription:
            'ساختار تمام استیل با گردش یکنواخت حرارت و سیستم بخار قدرتمند، مناسب کارگاه‌های تولیدی و خطوط پخت پیوسته.',
          fullDescription:
            'فر گردان صنعتی پاک‌اندیشان با هدف ایجاد پخت یکنواخت در تمامی سینی‌ها طراحی شده است. چرخش منظم کالسکه در کنار کنترل دقیق جریان هوای گرم و بخار، کیفیت یکدستی برای انواع نان‌های فانتزی، شیرینی خشک، کیک و کلوچه فراهم می‌کند.',
          highlights: [
            'بدنه و محفظه پخت با ورق استیل ضدزنگ صنعتی',
            'درب شیشه‌ای مقاوم به حرارت با دید کامل از فرآیند پخت',
            'سیستم تولید بخار یکنواخت برای بهبود بافت و رنگ محصول',
            'تابلو کنترل دیجیتال برای تنظیم دقیق دما، زمان و چرخه بخار',
          ],
          applications: [
            'نان‌های فانتزی و حجیم',
            'انواع شیرینی خشک و تر',
            'کیک و کلوچه صنعتی',
          ],
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
          highlights: [
            'امکان تنظیم مستقل دما در هر طبقه پخت',
            'شیشه‌های نسوز با نورپردازی داخلی برای پایش دقیق رنگ پخت',
            'عایق‌بندی حرارتی چندلایه جهت کاهش اتلاف انرژی',
            'طراحی ماژولار متناسب با فضای کارگاه و قنادی‌های حرفه‌ای',
          ],
          applications: [
            'نان‌های حجیم و نیمه‌حجیم',
            'شیرینی‌های تخصصی و پای',
            'محصولات قنادی حساس به دما',
          ],
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
          highlights: [
            'هماهنگی پیوسته میان بخش آماده‌سازی، انتقال و پخت',
            'قطعات در تماس با خمیر از متریال بهداشتی و قابل شستشو',
            'تنظیم سرعت خط متناسب با نوع خمیر و ضخامت محصول',
            'طراحی صنعتی مقاوم برای بهره‌برداری در شیفت‌های طولانی',
          ],
          applications: [
            'خطوط پخت نان سنتی مکانیزه',
            'نان‌های مسطح و صنعتی',
            'واحدهای تامین نان سازمانی',
          ],
          structureNote:
            'چیدمان خط و ظرفیت تولید پس از بررسی فضای سالن توسط تیم مهندسی فروش تعیین می‌شود.',
        },
      ],
    },
    categories: {
      badge: 'دسته‌بندی ماشین‌آلات',
      title: 'پوشش کامل زنجیره پخت و آماده‌سازی',
      explorePrefix: 'مشاهده',
      items: [
        {
          id: 'baking-equipment',
          title: 'تجهیزات پخت صنعتی',
          subtitle: 'فرهای گردان، مینی فر و تنورهای دوار',
          description:
            'انواع فرهای گردان و سیستم‌های پخت با انتقال حرارت غیرمستقیم برای کیفیت یکنواخت در تیراژ بالا.',
          targetProductId: 'rotary-oven',
        },
        {
          id: 'bread-machinery',
          title: 'ماشین‌آلات تولید نان',
          subtitle: 'خطوط مکانیزه نان سنتی و فانتزی',
          description:
            'سیستم‌های پخت و شکل‌دهی نان از دستگاه‌های سه‌کاره و شاطریار تا خطوط پیوسته کارخانه‌ای.',
          targetProductId: 'industrial-bread-line',
        },
        {
          id: 'pastry-lines',
          title: 'تجهیزات خطوط شیرینی',
          subtitle: 'فرهای طبقاتی و تجهیزات تخصصی قنادی',
          description:
            'تجهیزات دقیق پخت کیک، شیرینی خشک و محصولات قنادی با کنترل یکپارچه دما و رطوبت.',
          targetProductId: 'modern-deck-oven',
        },
        {
          id: 'prep-conveyor',
          title: 'سیستم‌های انتقال و آماده‌سازی',
          subtitle: 'خمیرگیر اسپیرال، دیوایدر و نوار نقاله',
          description:
            'ماشین‌آلات آماده‌سازی خمیر، چانه‌گیر و انتقال بهداشتی محصول برای تکمیل زنجیره تولید.',
          targetProductId: 'industrial-bread-line',
        },
      ],
    },
    dashboard: {
      badge: 'پایش مهندسی فرآیند · داده‌های نمایشی نمونه',
      title: 'کنترل دقیق دما، انرژی و پایداری خط تولید',
      description:
        'نمایش رابط مهندسی کنترل فرآیند پخت؛ مقادیر زیر صرفاً به‌عنوان الگوی نمایشی برای بررسی ساختار کنترل دستگاه طراحی شده‌اند و نمایانگر اتصال زنده به خط تولید نیستند.',
      cadRenderLabel: 'نمایش گرافیکی',
      profilesTabLabel: 'انتخاب الگوی نمایشی پخت',
      statusHeatingLabel: 'سیستم گرمایش',
      statusControlLabel: 'سیستم کنترل',
      statusOperationLabel: 'وضعیت عملکرد',
      statusReadinessLabel: 'آماده‌به‌کار',
      gauge1Title: 'دمای محفظه پخت',
      gauge1Subtitle: 'پایداری سنسور PT100',
      gauge1Status: 'در محدوده بهینه',
      gauge2Title: 'راندمان سیستم حرارتی',
      gauge2Subtitle: 'کاهش اتلاف انرژی کوره',
      gauge2Status: 'گرید انرژی A',
      gaugeMaxPrefix: 'حداکثر',
      dailyEnergyTitle: 'مصرف انرژی روزانه',
      dailyEnergyNote: 'کاهش مصرف انرژی کوره نسبت به خطوط نسل قبل',
      airflowTitle: 'پایداری جریان حرارت',
      airflowSub: 'گردش یکنواخت در کالسکه پخت',
      airflowMetric1: 'نرخ هوای گرم: ۱۸ متر مکعب بر دقیقه',
      airflowMetric2: 'تزریق بخار: کنترل فشار در ۳ بار',
      airflowStatus: 'کنترل مداوم سنسورها',
      chartTitle: 'نمودار روند تولید ساعتی (داده نمونه)',
      chartSubtitle:
        'مقایسه خروجی شبیه‌سازی‌شده با ظرفیت هدف در طول شیفت کاری',
      chartActualLegend: 'خروجی واقعی (نمونه)',
      chartTargetLegend: 'هدف شیفت',
      chartUnit: 'عدد',
      tempDeltaTarget: 'در محدوده دمای هدف',
      tempDeltaBelow: (val) => `${val} درجه تا دمای هدف`,
      tempDeltaAbove: (val) => `${val} درجه بالاتر از هدف`,
      profiles: [
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
      ],
    },
    advantages: {
      badge: 'ارزش‌های مهندسی و تولید',
      title: 'چرا تولیدکنندگان حرفه‌ای پاک‌اندیشان را انتخاب می‌کنند',
      subtitle:
        'تمرکز بر اصالت ساخت، مهندسی کارآمد و پشتیبانی پایدار برای خطوط تولید نان و شیرینی.',
      items: [
        {
          id: 'custom-design',
          number: '۰۱',
          title: 'طراحی اختصاصی',
          description:
            'پیکربندی تجهیزات متناسب با ابعاد کارگاه، نوع محصول و برنامه توسعه خط تولید.',
          iconKey: 'layers',
        },
        {
          id: 'precision-engineering',
          number: '۰۲',
          title: 'مهندسی دقیق',
          description:
            'تمرکز بر تناسب مکانیکی، انتقال حرارت بهینه و پایداری عملکرد در کارکرد پیوسته.',
          iconKey: 'crosshair',
        },
        {
          id: 'support-services',
          number: '۰۳',
          title: 'خدمات پشتیبانی',
          description:
            'همراهی فنی از مرحله مشاوره و نصب تا آموزش بهره‌برداری و تامین قطعات استاندارد.',
          iconKey: 'headphones',
        },
        {
          id: 'build-quality',
          number: '۰۴',
          title: 'کیفیت ساخت',
          description:
            'ساختار مقاوم با متریال بهداشتی و کنترل کیفی دقیق در تمامی مراحل تولید.',
          iconKey: 'award',
        },
        {
          id: 'tech-development',
          number: '۰۵',
          title: 'توسعه فناوری',
          description:
            'به‌روزرسانی مستمر طراحی ماشین‌آلات همگام با نیازهای مدرن صنعت نان و شیرینی.',
          iconKey: 'sparkles',
        },
      ],
    },
    showcase: {
      badge: 'چشم‌انداز نسل جدید خطوط تولید',
      title: 'آینده صنعت در دستان فناوری است',
      description:
        'همراهی مهندسی دقیق، متریال ماندگار و طراحی هوشمندانه برای ارتقای بهره‌وری کارگاه‌ها و کارخانه‌های تولید نان و شیرینی در مقیاس صنعتی.',
      cta: 'برنامه‌ریزی تجهیز خط تولید',
    },
    contact: {
      badge: 'ارتباط با واحد مهندسی فروش',
      title: 'برای توسعه خط تولید خود آماده‌اید؟',
      description:
        'برای دریافت مشاوره تخصصی و آشنایی با راهکارهای صنعتی، با کارشناسان ما در ارتباط باشید.',
      requestCta: 'درخواست مشاوره',
      visitPortal: 'مشاهده وب‌سایت رسمی',
      plantAddressTitle: 'آدرس کارخانه',
      plantAddressValue: 'ارومیه، شهرک صنعتی فاز یک، بلوار تلاشگران',
      salesDeskTitle: 'تلفن کارخانه و مهندسی فروش',
      corporateEmailTitle: 'پست الکترونیک رسمی',
      workingHoursTitle: 'ساعات کاری و پاسخگویی',
      workingHoursValue: 'شنبه تا چهارشنبه، ساعت ۸ الی ۱۷',
      formTitle: 'فرم درخواست مشاوره فنی و تجاری',
      formSubtitle:
        'لطفاً اطلاعات خط تولید یا دستگاه مورد نیاز خود را ثبت فرمایید تا کارشناسان فروش با شما تماس بگیرند.',
      fullNameLabel: 'نام و نام خانوادگی',
      fullNamePlaceholder: 'مثال: مهندس رضوانی',
      phoneLabel: 'شماره تماس مستقیم',
      phonePlaceholder: '۰۹۱۲۳۴۵۶۷۸۹ یا شماره ثابت',
      machineSelectLabel: 'نوع دستگاه یا خط تولید مورد نظر',
      machineSelectPlaceholder: 'انتخاب کنید...',
      machineOptions: [
        'فر گردان صنعتی',
        'فر طبقاتی مدرن',
        'دستگاه تولید نان صنعتی',
        'مینی فر گردان قنادی',
        'خمیرگیر اسپیرال و تجهیزات آماده‌سازی',
        'مشاوره راه‌اندازی کامل خط تولید',
      ],
      descriptionLabel: 'توضیحات و نیازمندی‌های تولید (اختیاری)',
      descriptionPlaceholder:
        'ظرفیت مورد انتظار، ابعاد سالن تولید، نوع سوخت در دسترس یا هر نوع ویژگی اختصاصی مدنظر...',
      submitButton: 'ارسال درخواست مشاوره',
      successTitle: 'درخواست شما با موفقیت ثبت شد.',
      successSubtitle:
        'کارشناسان فنی پاک‌اندیشان در کوتاه‌ترین زمان جهت بررسی نیازهای خط تولید با شما تماس خواهند گرفت.',
      resetButton: 'ثبت درخواست جدید',
      privacyNote:
        'اطلاعات تماس شما صرفاً جهت هماهنگی و ارائه مشاوره مهندسی توسط پاک‌اندیشان استفاده خواهد شد.',
      errors: {
        fullName:
          'لطفاً نام و نام خانوادگی خود را کامل وارد کنید (حداقل ۳ کاراکتر).',
        phoneRequired: 'وارد کردن شماره تماس الزامی است.',
        phoneInvalid:
          'شماره تماس معتبر نیست (مثال: ۰۹۱۲۳۴۵۶۷۸۹ یا ۰۴۴۳۲۲۲۰۰۰۰).',
        machineRequired:
          'لطفاً نوع دستگاه یا خط تولید موردنظر را انتخاب کنید.',
        descTooShort:
          'در صورت ثبت توضیحات، لطفاً حداقل ۱۰ کاراکتر بنویسید.',
        descTooLong: 'متن توضیحات نمی‌تواند بیشتر از ۱۰۰۰ کاراکتر باشد.',
      },
    },
    footer: {
      tagline:
        'طراحی و ساخت ماشین‌آلات پیشرفته پخت نان و شیرینی با استانداردهای کیفی بین‌المللی.',
      quickLinks: 'دسترسی سریع',
      categories: 'دسته‌بندی محصولات',
      rights:
        'تمامی حقوق مادی و معنوی متعلق به گروه صنعتی پاک‌اندیشان می‌باشد.',
      subRights: 'طراحی و توسعه مهندسی خطوط پخت و فرآوری صنعتی.',
      ariaWeb: 'وب‌سایت رسمی پاک‌اندیشان',
      ariaInstagram: 'ارتباط در اینستاگرام',
      ariaTelegram: 'ارتباط در تلگرام',
      ariaLinkedin: 'صفحه لینکدین',
    },
  },
  en: {
    common: {
      brandName: 'Pakandishan Industrial Group',
      brandShortName: 'Pakandishan',
      brandTagline: 'Pioneering Industrial Bakery & Confectionery Systems',
      brandDescription:
        'Engineering and manufacturing heavy-duty industrial machinery engineered for thermal efficiency, metallurgical durability, and continuous bakery production.',
      officialWebsite: 'pakandishan.com',
      requestConsultation: 'Inquire Now',
      scrollCue: 'Scroll to Explore',
      languageName: 'English',
      otherLanguageCode: 'fa',
      otherLanguageLabel: 'FA',
      unitsLabel: 'units',
      degreeLabel: '°C',
      percentLabel: '%',
      loadingVideo: 'Initializing visual display...',
    },
    nav: {
      home: 'Home',
      technology: 'Technology',
      products: 'Products',
      about: 'About Us',
      contact: 'Contact Sales',
      mobileMenuTitle: 'Navigation Menu',
      mobileConsultationBtn: 'Request Technical Consultation',
      closeMenu: 'Close menu',
    },
    hero: {
      kicker: 'Heavy Industrial Machinery · pakandishan.com',
      headline: 'Pakandishan Industrial Group',
      subtitle:
        'Pioneering commercial ovens and automated food processing lines engineered with certified stainless metallurgy, continuous thermal airflow, and intelligent digital control.',
      featureTag1: 'AISI 304 Stainless Steel',
      featureTag2: 'Integrated Steam Injection',
      featureTag3: '92% Thermal Efficiency',
      ctaPrimary: 'Explore Machinery',
      ctaSecondary: 'Request Production Consultation',
      settledIndicator: 'Scroll to Explore Specifications',
    },
    technology: {
      badge: 'Engineering & Innovation',
      title: 'Architectural Rigor & Engineering Precision in Baking',
      subtitle:
        'A fusion of precision metallurgy, optimized thermal aerodynamics, and continuous digital monitoring engineered for maximum yield in industrial bakery lines.',
      pillar01Num: '01',
      pillar01Title: 'Engineering Design',
      pillar01Desc:
        'Finite mechanical and thermal simulations across all components to ensure structural balance, operational safety, and ergonomic maintenance access.',
      pillar02Num: '02',
      pillar02Title: 'Advanced Technology',
      pillar02Desc:
        'PLC-driven digital automation and intelligent airflow/steam orchestration ensuring exact reproducibility across continuous baking shifts.',
      pillar03Num: '03',
      pillar03Title: 'Process Control',
      pillar03Desc:
        'Stable monitoring of thermal cycles, internal chamber velocity, and dwell time to safeguard product texture, crust coloration, and crumb volume.',
      pillar04Num: '04',
      pillar04Title: 'Manufacturing Craft',
      pillar04Desc:
        'Certified industrial stainless steel construction, high-precision CNC laser cutting, and stringent pre-delivery load testing.',
      spec1: 'Structural Metallurgy: Sanitary AISI 304 Stainless Steel',
      spec2:
        'Control Architecture: Microprocessor PLC with Multi-Recipe Memory',
      spec3:
        'Thermal Insulation: High-Density Compressed Rockwool for Minimal Energy Loss',
    },
    products: {
      badge: 'Machinery Catalog',
      title: 'Pakandishan Precision Machinery',
      subtitle:
        'Industrial baking equipment, dough preparation systems, and continuous automated lines.',
      viewSpecs: 'View Technical Specifications',
      modalInquire: 'Inquire About This Machine',
      modalClose: 'Close Details',
      primaryApplications: 'Primary Applications',
      designHighlights: 'Design & Engineering Highlights',
      items: [
        {
          id: 'rotary-oven',
          name: 'Rotary Rack Oven',
          category: 'Industrial Baking Equipment',
          shortDescription:
            'Heavy-duty all-stainless rack oven featuring uniform heat convection and high-capacity steam generator for high-throughput bakeries and continuous production lines.',
          fullDescription:
            'Engineered for consistent thermal baking across all baking trays. The controlled rotation of the trolley combined with laminar hot airflow and saturation steam guarantees uniform crust color, volume, and texture for artisan breads, toast, pastries, and biscuits.',
          highlights: [
            'Heavy-gauge sanitary stainless steel chamber and exterior cladding',
            'Multi-pane heat-resistant tempered glass door with 180° visual inspection',
            'High-capacity cascaded steam injection for optimal crust gloss and volume',
            'Digital PLC touchscreen interface for multi-stage temperature, time, and steam profile control',
          ],
          applications: [
            'Artisan & Pan Breads',
            'Pastries & Viennoiserie',
            'Industrial Biscuits & Cookies',
          ],
          structureNote:
            'Tray capacity, rack dimensions, and gas/electric burner configurations are custom-tailored to facility footprint and output targets.',
        },
        {
          id: 'modern-deck-oven',
          name: 'Modular Deck Oven',
          category: 'Pastry & Confectionery Systems',
          shortDescription:
            'Independent multi-tier baking with individual top and bottom heating elements for artisan breads, delicate patisserie, and high-precision baking.',
          fullDescription:
            'Engineered for bakeries and confectionery workshops that require concurrent baking of diverse products with distinct thermal profiles. Multi-layer ceramic stone hearths and superior insulation ensure thermal equilibrium and crust crustiness.',
          highlights: [
            'Independent top and bottom heat adjustments per deck',
            'High-density refractory stone baking plates for classic artisan hearth baking',
            'Multi-layer thermal insulation drastically reducing ambient kitchen heat radiation',
            'Modular vertical expansion compatible with future production capacity growth',
          ],
          applications: [
            'Hearth & Sourdough Breads',
            'Delicate Patisserie & Pies',
            'Temperature-Sensitive Confectionery',
          ],
          structureNote:
            'Number of decks, internal deck height, and integrated steam modules are configured per production requirements.',
        },
        {
          id: 'industrial-bread-line',
          name: 'Automated Bread Production Line',
          category: 'Automated Bread Machinery',
          shortDescription:
            'Turnkey automated solution from dough division, round-sheeting, and resting to continuous tunnel baking for traditional flatbreads and commercial bakeries.',
          fullDescription:
            'Engineered for continuous production, zero dough wastage, and high sanitary standards. Seamless synchronization between dough dividing, sheeting, proofing conveyors, and high-speed baking hearths maximizes hourly yield while minimizing manual labor.',
          highlights: [
            'Synchronized conveyor interlocks connecting divider, sheeter, and continuous oven',
            'All dough-contact surfaces fabricated from food-grade FDA-compliant materials',
            'Variable frequency drive speed controls adaptable to dough hydration and thickness',
            'Heavy-duty structural framework built for continuous 24/7 multi-shift uptime',
          ],
          applications: [
            'Mechanized Traditional Flatbread Lines',
            'Pita & Tortilla Production',
            'High-Volume Commercial Bakeries',
          ],
          structureNote:
            'Line layout, cooling spiral length, and automation sensors are mapped following on-site plant architecture assessment.',
        },
      ],
    },
    categories: {
      badge: 'Machinery Classification',
      title: 'Complete Processing & Baking Ecosystem',
      explorePrefix: 'Explore',
      items: [
        {
          id: 'baking-equipment',
          title: 'Industrial Baking Equipment',
          subtitle: 'Rotary rack ovens, mini ovens, and tunnel hearths',
          description:
            'High-capacity indirect convection baking ovens engineered for uniform crumb development and maximum batch output.',
          targetProductId: 'rotary-oven',
        },
        {
          id: 'bread-machinery',
          title: 'Bread Production Systems',
          subtitle: 'Automated traditional and European bread lines',
          description:
            'Automated continuous shaping, proofing, and baking systems scaled from commercial bakeries to industrial bread plants.',
          targetProductId: 'industrial-bread-line',
        },
        {
          id: 'pastry-lines',
          title: 'Pastry & Confectionery Equipment',
          subtitle: 'Modular deck ovens and specialized patisserie gear',
          description:
            'Precision temperature and humidity-controlled ovens built for cakes, laminated pastries, and delicate bakery items.',
          targetProductId: 'modern-deck-oven',
        },
        {
          id: 'prep-conveyor',
          title: 'Dough Preparation & Conveying',
          subtitle: 'Spiral mixers, volumetric dividers, and hygienic belts',
          description:
            'Heavy-duty spiral dough mixers, automatic rounders, and sanitary transport conveyors completing the production line.',
          targetProductId: 'industrial-bread-line',
        },
      ],
    },
    dashboard: {
      badge: 'Process Engineering Telemetry · Illustrative Simulation',
      title: 'Precise Thermal, Energy & Line Stability Control',
      description:
        'Industrial telemetry simulation demonstrating digital PLC control architecture. Data displayed illustrates thermal monitoring metrics and operational diagnostics.',
      cadRenderLabel: '3D CAD Render',
      profilesTabLabel: 'Select Simulation Profile',
      statusHeatingLabel: 'Heating System',
      statusControlLabel: 'Control Architecture',
      statusOperationLabel: 'Operating State',
      statusReadinessLabel: 'Operational Status',
      gauge1Title: 'Baking Chamber Temp',
      gauge1Subtitle: 'PT100 Thermal Stability',
      gauge1Status: 'Optimal Range',
      gauge2Title: 'Thermal Efficiency Ratio',
      gauge2Subtitle: 'Burner Waste Heat Recovery',
      gauge2Status: 'Energy Grade A',
      gaugeMaxPrefix: 'Max',
      dailyEnergyTitle: 'Daily Energy Consumption',
      dailyEnergyNote:
        'Burner energy savings compared to legacy generation ovens',
      airflowTitle: 'Thermal Airflow Stability',
      airflowSub: 'Laminar recirculation inside rack chamber',
      airflowMetric1: 'Hot Air Velocity: 18 m³/min',
      airflowMetric2: 'Steam Injection: Pressure Monitored at 3 Bar',
      airflowStatus: 'Active Sensor Feedback Loop',
      chartTitle: 'Hourly Production Output Trend (Simulation)',
      chartSubtitle:
        'Simulated batch output vs. shift target capacity throughout working hours',
      chartActualLegend: 'Actual Output (Simulated)',
      chartTargetLegend: 'Shift Target',
      chartUnit: 'units',
      tempDeltaTarget: 'At target temperature',
      tempDeltaBelow: (val) => `${val}°C below target`,
      tempDeltaAbove: (val) => `${val}°C above target`,
      profiles: [
        {
          id: 'fantasy-bread',
          label: 'Baguette & Bun Profile',
          machineLabel: 'Rotary Rack Oven — Simulation Mode',
          temperature: 225,
          targetTemperature: 230,
          maxTemperature: 300,
          efficiency: 92,
          dailyEnergyKwh: 148,
          energyIndexLabel: 'Thermal Optimized (Simulated)',
          energySavedPercent: 18,
          statusHeating: 'Stable',
          statusControl: 'Automated PLC',
          statusOperation: 'Continuous Bake',
          statusReadiness: 'Ready / Active',
          productionSeries: [
            { hour: '08:00', output: 420, target: 450 },
            { hour: '10:00', output: 510, target: 500 },
            { hour: '12:00', output: 580, target: 550 },
            { hour: '14:00', output: 545, target: 550 },
            { hour: '16:00', output: 620, target: 600 },
            { hour: '18:00', output: 640, target: 620 },
          ],
        },
        {
          id: 'pastry-line',
          label: 'Confectionery & Cookie Profile',
          machineLabel: 'Rotary / Deck Oven — Simulation Mode',
          temperature: 182,
          targetTemperature: 185,
          maxTemperature: 300,
          efficiency: 95,
          dailyEnergyKwh: 112,
          energyIndexLabel: 'Balanced Consumption (Simulated)',
          energySavedPercent: 22,
          statusHeating: 'Uniform',
          statusControl: 'Precision PID',
          statusOperation: 'Gentle Steam Injection',
          statusReadiness: 'Ready / Active',
          productionSeries: [
            { hour: '08:00', output: 310, target: 320 },
            { hour: '10:00', output: 375, target: 360 },
            { hour: '12:00', output: 410, target: 400 },
            { hour: '14:00', output: 430, target: 410 },
            { hour: '16:00', output: 460, target: 440 },
            { hour: '18:00', output: 475, target: 460 },
          ],
        },
        {
          id: 'traditional-bread',
          label: 'Flatbread Line Profile',
          machineLabel: 'Industrial Bread Line — Simulation Mode',
          temperature: 268,
          targetTemperature: 270,
          maxTemperature: 300,
          efficiency: 89,
          dailyEnergyKwh: 174,
          energyIndexLabel: 'High Heat (Simulated)',
          energySavedPercent: 14,
          statusHeating: 'Peak Output',
          statusControl: 'Line-Synced',
          statusOperation: 'Continuous Conveyor',
          statusReadiness: 'Ready / Active',
          productionSeries: [
            { hour: '08:00', output: 680, target: 700 },
            { hour: '10:00', output: 740, target: 720 },
            { hour: '12:00', output: 810, target: 780 },
            { hour: '14:00', output: 790, target: 800 },
            { hour: '16:00', output: 850, target: 820 },
            { hour: '18:00', output: 870, target: 850 },
          ],
        },
      ],
    },
    advantages: {
      badge: 'Engineering & Manufacturing Principles',
      title: 'Why Leading Food Producers Choose Pakandishan',
      subtitle:
        'Dedicated to mechanical integrity, thermal innovation, and lifelong technical support for industrial bakery and food processing facilities.',
      items: [
        {
          id: 'custom-design',
          number: '01',
          title: 'Custom Plant Engineering',
          description:
            'Custom-tailored machinery configurations designed to match your facility floor plan, target bread/pastry recipes, and capacity expansion roadmaps.',
          iconKey: 'layers',
        },
        {
          id: 'precision-engineering',
          number: '02',
          title: 'Precision Aerodynamics',
          description:
            'Rigorous mechanical engineering, optimized convective heat transfer, and vibration-dampened drivetrains built for uninterrupted operation.',
          iconKey: 'crosshair',
        },
        {
          id: 'support-services',
          number: '03',
          title: 'Lifecycle Technical Support',
          description:
            'Comprehensive engineering partnership spanning turnkey installation, operational team training, and prompt OEM spare parts availability.',
          iconKey: 'headphones',
        },
        {
          id: 'build-quality',
          number: '04',
          title: 'Certified Metallurgy',
          description:
            'Heavy-duty structural integrity built with food-grade sanitary steels, high-density insulation, and exhaustive factory acceptance testing.',
          iconKey: 'award',
        },
        {
          id: 'tech-development',
          number: '05',
          title: 'Continuous Innovation',
          description:
            'Ongoing engineering R&D delivering progressive digital controls, lower carbon footprints, and improved baking yields.',
          iconKey: 'sparkles',
        },
      ],
    },
    showcase: {
      badge: 'Next-Generation Bakery Plant Vision',
      title: 'The Future of Industrial Baking is Driven by Technology',
      description:
        'Uniting mechanical precision, food-grade sanitary metallurgy, and intelligent automation to maximize productivity in commercial bakeries and industrial food plants.',
      cta: 'Plan Production Line Architecture',
    },
    contact: {
      badge: 'Contact Technical Sales & Engineering',
      title: 'Ready to Scale Your Production Line?',
      description:
        'Connect with our sales engineering team for tailored equipment proposals, facility floor plan consultations, and technical specifications.',
      requestCta: 'Request Consultation',
      visitPortal: 'Official Company Website',
      plantAddressTitle: 'Manufacturing Plant',
      plantAddressValue:
        'Phase 1 Industrial Zone, Talashgaran Blvd, Urmia, Iran',
      salesDeskTitle: 'Technical Sales Desk',
      corporateEmailTitle: 'Official Corporate Email',
      workingHoursTitle: 'Working Hours',
      workingHoursValue: 'Saturday to Wednesday, 08:00 – 17:00 (GMT+3:30)',
      formTitle: 'Technical Consultation & Proposal Request',
      formSubtitle:
        'Please provide your production requirements or target machinery so our sales engineering team can prepare a custom proposal.',
      fullNameLabel: 'Full Name',
      fullNamePlaceholder: 'e.g. John Miller',
      phoneLabel: 'Direct Phone Number',
      phonePlaceholder: '+98 912 345 6789 or local number',
      machineSelectLabel: 'Target Machinery or Processing Line',
      machineSelectPlaceholder: 'Select equipment...',
      machineOptions: [
        'Rotary Rack Oven',
        'Modular Deck Oven',
        'Automated Industrial Bread Line',
        'Mini Rotary Confectionery Oven',
        'Spiral Mixers & Dough Prep Equipment',
        'Turnkey Plant Consultation',
      ],
      descriptionLabel: 'Production Requirements & Project Details (Optional)',
      descriptionPlaceholder:
        'Expected throughput, facility dimensions, available utilities (gas/electric), or specific custom requirements...',
      submitButton: 'Submit Consultation Request',
      successTitle: 'Your consultation request has been registered.',
      successSubtitle:
        'Our sales engineering department will contact you shortly to review your technical requirements.',
      resetButton: 'Submit Another Request',
      privacyNote:
        'Your contact information is strictly confidential and used solely for technical consultation.',
      errors: {
        fullName: 'Please enter your full name (minimum 3 characters).',
        phoneRequired: 'Phone number is required.',
        phoneInvalid:
          'Please enter a valid phone number (e.g. +98 912 345 6789 or local number).',
        machineRequired:
          'Please select your target machinery or production line.',
        descTooShort:
          'If providing project details, please write at least 10 characters.',
        descTooLong: 'Description cannot exceed 1000 characters.',
      },
    },
    footer: {
      tagline:
        'Designing and manufacturing advanced bakery and food processing machinery engineered to international standards.',
      quickLinks: 'Quick Links',
      categories: 'Product Categories',
      rights: '© 2026 Pakandishan Industrial Group. All rights reserved.',
      subRights:
        'Precision engineering for commercial and industrial baking systems.',
      ariaWeb: 'Official Pakandishan Website',
      ariaInstagram: 'Connect on Instagram',
      ariaTelegram: 'Connect on Telegram',
      ariaLinkedin: 'LinkedIn Company Page',
    },
  },
};
