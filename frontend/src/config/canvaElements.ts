export interface CanvaElement {
  id: string;
  title: string;
  category: 'festive' | 'badges' | 'frames' | 'shapes' | 'business';
  elementType: 'SVG' | 'SHAPE' | 'BADGE' | 'FRAME';
  svgData: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultFill?: string;
  defaultStroke?: string;
  tags: string[];
}

export const CANVA_ELEMENTS: CanvaElement[] = [
  // 1. Festive & Sacred
  {
    id: 'canva-el-rajmudra',
    title: 'शिवकालीन राजमुद्रा सुवर्ण शिक्का',
    category: 'festive',
    elementType: 'BADGE',
    svgData: `<svg viewBox="0 0 200 200" width="200" height="200">
      <circle cx="100" cy="100" r="95" fill="#7c2d12" stroke="#f59e0b" stroke-width="5"/>
      <circle cx="100" cy="100" r="86" fill="none" stroke="#fbbf24" stroke-width="2" stroke-dasharray="4,4"/>
      <polygon points="100,20 120,60 165,65 130,95 140,140 100,118 60,140 70,95 35,65 80,60" fill="none" stroke="#fef08a" stroke-width="1.5" opacity="0.4"/>
      <text x="100" y="70" font-size="14" text-anchor="middle" fill="#fef08a" font-weight="bold" font-family="serif">प्रतिपच्चंद्रलेखेव</text>
      <text x="100" y="92" font-size="14" text-anchor="middle" fill="#fef08a" font-weight="bold" font-family="serif">वर्धिष्णुर्विश्ववंदिता</text>
      <text x="100" y="114" font-size="14" text-anchor="middle" fill="#fef08a" font-weight="bold" font-family="serif">शाहसूनोः शिवस्यैषा</text>
      <text x="100" y="136" font-size="15" text-anchor="middle" fill="#fbbf24" font-weight="bold" font-family="serif">मुद्रा भद्राय राजते</text>
    </svg>`,
    defaultWidth: 160,
    defaultHeight: 160,
    tags: ['rajmudra', 'shivaji maharaj', 'gold', 'seal', 'marathi', 'shivaji']
  },
  {
    id: 'canva-el-kalash',
    title: 'शुभ विवाह मंगल कलश व नारळ',
    category: 'festive',
    elementType: 'SVG',
    svgData: `<svg viewBox="0 0 160 160" width="160" height="160">
      <circle cx="80" cy="45" r="22" fill="#78350f" stroke="#fbbf24" stroke-width="2"/>
      <path d="M55 52 Q80 25 105 52" fill="#15803d"/>
      <path d="M45 58 Q80 18 115 58" fill="#16a34a"/>
      <path d="M48 65 L112 65 L120 120 Q120 145 80 145 Q40 145 40 120 Z" fill="#b91c1c" stroke="#f59e0b" stroke-width="4"/>
      <circle cx="80" cy="100" r="16" fill="#f59e0b"/>
      <text x="80" y="105" font-size="14" text-anchor="middle" fill="#7c2d12" font-weight="bold">卐</text>
      <rect x="50" y="62" width="60" height="8" rx="4" fill="#fbbf24"/>
    </svg>`,
    defaultWidth: 140,
    defaultHeight: 140,
    tags: ['kalash', 'wedding', 'vivah', 'mangala', 'pooja', 'coconut']
  },
  {
    id: 'canva-el-diya',
    title: 'दिवाळी मंगलमय सुवर्ण समयी दिवा',
    category: 'festive',
    elementType: 'SVG',
    svgData: `<svg viewBox="0 0 160 140" width="160" height="140">
      <ellipse cx="80" cy="100" rx="55" ry="24" fill="#b45309" stroke="#fbbf24" stroke-width="3"/>
      <path d="M25 100 Q80 130 135 100 Q80 115 25 100 Z" fill="#d97706"/>
      <ellipse cx="80" cy="94" rx="40" ry="12" fill="#78350f"/>
      <path d="M80 82 C65 60 70 30 80 15 C90 30 95 60 80 82 Z" fill="#f59e0b"/>
      <path d="M80 75 C72 55 75 35 80 25 C85 35 88 55 80 75 Z" fill="#fef08a"/>
    </svg>`,
    defaultWidth: 140,
    defaultHeight: 120,
    tags: ['diya', 'diwali', 'deep', 'flame', 'gold', 'lamp', 'festive']
  },
  {
    id: 'canva-el-toran',
    title: 'झेंडू आणि आंब्याचे पारंपारिक तोरण',
    category: 'festive',
    elementType: 'SVG',
    svgData: `<svg viewBox="0 0 300 70" width="300" height="70">
      <line x1="0" y1="10" x2="300" y2="10" stroke="#78350f" stroke-width="4"/>
      <path d="M10 10 Q35 45 60 10" fill="none" stroke="#15803d" stroke-width="3"/>
      <path d="M60 10 Q85 45 110 10" fill="none" stroke="#15803d" stroke-width="3"/>
      <path d="M110 10 Q135 45 160 10" fill="none" stroke="#15803d" stroke-width="3"/>
      <path d="M160 10 Q185 45 210 10" fill="none" stroke="#15803d" stroke-width="3"/>
      <path d="M210 10 Q235 45 260 10" fill="none" stroke="#15803d" stroke-width="3"/>
      <circle cx="35" cy="40" r="14" fill="#ea580c" stroke="#fef08a" stroke-width="2"/>
      <circle cx="85" cy="40" r="14" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/>
      <circle cx="135" cy="40" r="14" fill="#ea580c" stroke="#fef08a" stroke-width="2"/>
      <circle cx="185" cy="40" r="14" fill="#f59e0b" stroke="#fef08a" stroke-width="2"/>
      <circle cx="235" cy="40" r="14" fill="#ea580c" stroke="#fef08a" stroke-width="2"/>
    </svg>`,
    defaultWidth: 260,
    defaultHeight: 60,
    tags: ['toran', 'marigold', 'mango leaves', 'door', 'festival', 'welcome']
  },

  // 2. Badges & Ribbons
  {
    id: 'canva-el-grand-opening-ribbon',
    title: 'भव्य उद्घाटन सुवर्ण रिबन',
    category: 'badges',
    elementType: 'BADGE',
    svgData: `<svg viewBox="0 0 280 80" width="280" height="80">
      <polygon points="10,40 0,15 40,20 40,60 0,65" fill="#b45309"/>
      <polygon points="270,40 280,15 240,20 240,60 280,65" fill="#b45309"/>
      <rect x="30" y="15" width="220" height="50" rx="8" fill="#ea580c" stroke="#fde047" stroke-width="3"/>
      <text x="140" y="47" font-size="20" text-anchor="middle" fill="#ffffff" font-weight="900" font-family="sans-serif">★ भव्य उद्घाटन ★</text>
    </svg>`,
    defaultWidth: 240,
    defaultHeight: 70,
    tags: ['grand opening', 'ribbon', 'banner', 'inauguration', 'sale']
  },
  {
    id: 'canva-el-sale-badge-50',
    title: '५०% सवलत विशेष ऑफर शिक्का',
    category: 'badges',
    elementType: 'BADGE',
    svgData: `<svg viewBox="0 0 150 150" width="150" height="150">
      <circle cx="75" cy="75" r="70" fill="#dc2626" stroke="#fde047" stroke-width="4"/>
      <circle cx="75" cy="75" r="60" fill="none" stroke="#ffffff" stroke-width="1.5" stroke-dasharray="4,3"/>
      <text x="75" y="55" font-size="14" text-anchor="middle" fill="#fde047" font-weight="bold">महा धमाका</text>
      <text x="75" y="88" font-size="32" text-anchor="middle" fill="#ffffff" font-weight="900">50%</text>
      <text x="75" y="112" font-size="14" text-anchor="middle" fill="#fde047" font-weight="bold">सवलत / OFF</text>
    </svg>`,
    defaultWidth: 130,
    defaultHeight: 130,
    tags: ['50% off', 'sale', 'discount', 'offer', 'dhamaka', 'badge']
  },
  {
    id: 'canva-el-special-invitation',
    title: 'सस्नेह निमंत्रण सुवर्ण पदक',
    category: 'badges',
    elementType: 'BADGE',
    svgData: `<svg viewBox="0 0 200 80" width="200" height="80">
      <rect x="5" y="5" width="190" height="70" rx="35" fill="#450a0a" stroke="#d97706" stroke-width="3"/>
      <rect x="12" y="12" width="176" height="56" rx="28" fill="none" stroke="#fbbf24" stroke-width="1.5"/>
      <text x="100" y="47" font-size="18" text-anchor="middle" fill="#fef08a" font-weight="bold">॥ सस्नेह निमंत्रण ॥</text>
    </svg>`,
    defaultWidth: 180,
    defaultHeight: 70,
    tags: ['invitation', 'nimantran', 'wedding', 'program', 'gold']
  },

  // 3. Frames & Borders
  {
    id: 'canva-el-royal-gold-frame',
    title: 'राजेशाही सोनेरी बॉर्डर फ्रेम',
    category: 'frames',
    elementType: 'FRAME',
    svgData: `<svg viewBox="0 0 300 200" width="300" height="200">
      <rect x="6" y="6" width="288" height="188" rx="12" fill="none" stroke="#d97706" stroke-width="4"/>
      <rect x="14" y="14" width="272" height="172" rx="8" fill="none" stroke="#fbbf24" stroke-width="2"/>
      <circle cx="20" cy="20" r="10" fill="#d97706"/>
      <circle cx="280" cy="20" r="10" fill="#d97706"/>
      <circle cx="20" cy="180" r="10" fill="#d97706"/>
      <circle cx="280" cy="180" r="10" fill="#d97706"/>
    </svg>`,
    defaultWidth: 260,
    defaultHeight: 180,
    tags: ['frame', 'border', 'gold', 'royal', 'corner', 'wedding']
  },
  {
    id: 'canva-el-floral-corner',
    title: 'पारंपारिक नक्षीदार कॉर्नर बॉर्डर',
    category: 'frames',
    elementType: 'FRAME',
    svgData: `<svg viewBox="0 0 120 120" width="120" height="120">
      <path d="M10 110 L10 10 L110 10" fill="none" stroke="#f59e0b" stroke-width="5"/>
      <path d="M22 100 L22 22 L100 22" fill="none" stroke="#fbbf24" stroke-width="2"/>
      <circle cx="22" cy="22" r="8" fill="#ea580c"/>
      <path d="M22 45 Q45 45 45 22" fill="none" stroke="#f59e0b" stroke-width="3"/>
    </svg>`,
    defaultWidth: 100,
    defaultHeight: 100,
    tags: ['corner', 'nakshi', 'floral', 'border', 'accent']
  },

  // 4. Commercial & Real Estate
  {
    id: 'canva-el-property-pin',
    title: 'रिअल इस्टेट लोकेशन पिन व घर',
    category: 'business',
    elementType: 'SVG',
    svgData: `<svg viewBox="0 0 120 140" width="120" height="140">
      <path d="M60 10 C35 10 15 30 15 55 C15 90 60 130 60 130 C60 130 105 90 105 55 C105 30 85 10 60 10 Z" fill="#0284c7" stroke="#38bdf8" stroke-width="3"/>
      <polygon points="60,30 35,50 42,50 42,75 78,75 78,50 85,50" fill="#ffffff"/>
      <rect x="52" y="55" width="16" height="20" fill="#0284c7"/>
    </svg>`,
    defaultWidth: 100,
    defaultHeight: 120,
    tags: ['property', 'house', 'location', 'pin', 'real estate', 'plot']
  },
  {
    id: 'canva-el-verified-stamp',
    title: '१००% अस्सल / प्रमाणित स्टॅम्प',
    category: 'business',
    elementType: 'BADGE',
    svgData: `<svg viewBox="0 0 140 140" width="140" height="140">
      <circle cx="70" cy="70" r="64" fill="#15803d" stroke="#86efac" stroke-width="4"/>
      <path d="M42 72 L62 92 L100 50" fill="none" stroke="#ffffff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="70" y="118" font-size="12" text-anchor="middle" fill="#dcfce7" font-weight="bold">VERIFIED</text>
    </svg>`,
    defaultWidth: 110,
    defaultHeight: 110,
    tags: ['verified', 'guarantee', 'certified', 'trust', 'badge']
  }
];
