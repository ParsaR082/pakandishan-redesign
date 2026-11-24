import { Translations } from '../types';

export const en: Translations = {
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
    otherLanguageLabel: 'EN',
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
};
