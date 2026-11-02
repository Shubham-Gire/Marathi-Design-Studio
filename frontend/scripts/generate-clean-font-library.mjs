import fs from 'fs';

const UNICODE_MARATHI_FONTS = [
  // 1. POPULAR (प्रसिद्ध)
  {
    id: "Mukta",
    name: "Mukta (मुक्त - Marathi Standard)",
    script: "both",
    category: "popular",
    subCategory: "popular",
    badge: "Popular ⭐",
    sampleDevanagari: "नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.",
    sampleLatin: "The Quick Brown Fox Jumps Over",
    weights: [300, 400, 600, 700, 800],
    fallback: "sans-serif",
    isUnicode: true,
    file: "mukta-regular.otf"
  },
  {
    id: "Baloo 2",
    name: "Baloo 2 (बालू २ - Rounded Bold)",
    script: "both",
    category: "popular",
    subCategory: "popular",
    badge: "Rounded",
    sampleDevanagari: "महाराष्ट्र माझा अभिमान आहे.",
    sampleLatin: "Friendly Rounded Headlines",
    weights: [400, 500, 600, 700, 800],
    fallback: "sans-serif",
    isUnicode: true,
    file: "baloo-2.otf"
  },
  {
    id: "Poppins",
    name: "Poppins (पॉपिन्स - Modern Sans)",
    script: "both",
    category: "popular",
    subCategory: "popular",
    badge: "Clean Pro",
    sampleDevanagari: "नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.",
    sampleLatin: "International Geometric Sans",
    weights: [300, 400, 500, 600, 700, 800],
    fallback: "sans-serif",
    isUnicode: true
  },
  {
    id: "Hind",
    name: "Hind (हिंद - Contemporary)",
    script: "both",
    category: "popular",
    subCategory: "popular",
    badge: "UI Clean",
    sampleDevanagari: "महाराष्ट्र माझा अभिमान आहे.",
    sampleLatin: "Contemporary Devanagari Sans",
    weights: [400, 500, 600, 700],
    fallback: "sans-serif",
    isUnicode: true
  },
  {
    id: "Noto Sans Devanagari",
    name: "Noto Sans Devanagari (नोटो सॅन्स)",
    script: "both",
    category: "popular",
    subCategory: "popular",
    badge: "Official Standard",
    sampleDevanagari: "नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.",
    sampleLatin: "Google Official Devanagari Standard",
    weights: [400, 500, 600, 700, 800],
    fallback: "sans-serif",
    isUnicode: true,
    file: "noto-sans-devanagari.otf"
  },

  // 2. MARATHI STANDARD (मानक देवनागरी)
  {
    id: "SakalBharati",
    name: "SakalBharati (सकाळभारती मानक)",
    script: "devanagari",
    category: "marathi-standard",
    subCategory: "marathi-standard",
    badge: "Govt Standard",
    sampleDevanagari: "महाराष्ट्र माझा अभिमान आहे.",
    sampleLatin: "Official Marathi Standard Typeface",
    weights: [400],
    fallback: "serif",
    isUnicode: true,
    file: "ams-sakal.otf"
  },
  {
    id: "Sarala",
    name: "Sarala (सरला - सहज लिपी)",
    script: "both",
    category: "marathi-standard",
    subCategory: "marathi-standard",
    badge: "Pure Devanagari",
    sampleDevanagari: "नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.",
    sampleLatin: "Smooth Clean Devanagari Lettering",
    weights: [400, 700],
    fallback: "sans-serif",
    isUnicode: true,
    file: "ams-saral.otf"
  },
  {
    id: "Gotu",
    name: "Gotu (गोटू - पारंपारिक वळण)",
    script: "both",
    category: "marathi-standard",
    subCategory: "marathi-standard",
    badge: "Traditional",
    sampleDevanagari: "महाराष्ट्र माझा अभिमान आहे.",
    sampleLatin: "Traditional Rounded Devanagari",
    weights: [400],
    fallback: "sans-serif",
    isUnicode: true
  },

  // 3. MARATHI CALLIGRAPHY (मराठी सुलेखन)
  {
    id: "Tillana",
    name: "Tillana (तिल्लाना सुलेखन - Calligraphy)",
    script: "both",
    category: "calligraphy",
    subCategory: "calligraphy",
    badge: "Calligraphy ⭐",
    sampleDevanagari: "॥ श्री गणेशाय नमः ॥",
    sampleLatin: "Artistic Devanagari Calligraphy",
    weights: [400, 500, 600, 700, 800],
    fallback: "cursive",
    isUnicode: true,
    file: "tillana-calligraphy.otf"
  },
  {
    id: "Amita",
    name: "Amita (अमिता - वाहती सुलेखन लिपी)",
    script: "both",
    category: "calligraphy",
    subCategory: "calligraphy",
    badge: "Flowing Script",
    sampleDevanagari: "॥ जय भवानी जय शिवाजी ॥",
    sampleLatin: "Graceful Calligraphic Script",
    weights: [400, 700],
    fallback: "cursive",
    isUnicode: true
  },
  {
    id: "Rozha One",
    name: "Rozha One (रोझा वन - ठसठशीत सुलेखन)",
    script: "both",
    category: "calligraphy",
    subCategory: "calligraphy",
    badge: "Ornate Calligraphy",
    sampleDevanagari: "गुढीपाडवा नववर्ष शुभेच्छा",
    sampleLatin: "High-Contrast Calligraphic Strokes",
    weights: [400],
    fallback: "serif",
    isUnicode: true,
    file: "rozha-one.otf"
  },

  // 4. HANDWRITTEN (हस्तलिखित)
  {
    id: "Kalam",
    name: "Kalam (कलम - अस्सल हस्तलिखित)",
    script: "both",
    category: "handwritten",
    subCategory: "handwritten",
    badge: "Handwritten ⭐",
    sampleDevanagari: "माझ्या हस्ताक्षरात तुमचे स्वागत आहे.",
    sampleLatin: "Authentic Ink Pen Handwriting",
    weights: [300, 400, 700],
    fallback: "cursive",
    isUnicode: true,
    file: "kalam-handwritten.otf"
  },
  {
    id: "Dekko",
    name: "Dekko (डेक्को - पेन्सिल रेखाटन)",
    script: "both",
    category: "handwritten",
    subCategory: "handwritten",
    badge: "Pencil & Marker",
    sampleDevanagari: "महाराष्ट्र माझा अभिमान आहे.",
    sampleLatin: "Casual Marker Handwritten Style",
    weights: [400],
    fallback: "cursive",
    isUnicode: true
  },

  // 5. DECORATIVE (सजावटी व पोस्टर्स)
  {
    id: "Modak",
    name: "Modak (मोदक - अतिशय ठळक उत्सव फॉन्ट)",
    script: "both",
    category: "decorative",
    subCategory: "decorative",
    badge: "Ultra Heavy ⭐",
    sampleDevanagari: "गणपती बाप्पा मोरया!",
    sampleLatin: "Extra Chubby Festive Poster Font",
    weights: [400],
    fallback: "display",
    isUnicode: true
  },
  {
    id: "Yatra One",
    name: "Yatra One (यात्रा वन - ऐतिहासिक बोर्ड शैली)",
    script: "both",
    category: "decorative",
    subCategory: "decorative",
    badge: "Vintage Signage",
    sampleDevanagari: "॥ छत्रपती शिवाजी महाराज की जय ॥",
    sampleLatin: "Indian Railway Vintage Signboard",
    weights: [400],
    fallback: "display",
    isUnicode: true,
    file: "yatra-one.otf"
  },
  {
    id: "Gajraj One",
    name: "Gajraj One (गजराज - भव्य पोस्टर फॉन्ट)",
    script: "both",
    category: "decorative",
    subCategory: "decorative",
    badge: "Massive Heavy",
    sampleDevanagari: "भव्य शिवजयंती महोत्सव",
    sampleLatin: "Heavy Block Display Typeface",
    weights: [400],
    fallback: "display",
    isUnicode: true
  },
  {
    id: "Shrikhand",
    name: "Shrikhand (श्रीखंड - हाताने रंगवलेले फलक)",
    script: "both",
    category: "decorative",
    subCategory: "decorative",
    badge: "Signboard Retro",
    sampleDevanagari: "मुंबई स्पेशल उत्सव",
    sampleLatin: "Hand-Painted Cinema Poster Font",
    weights: [400],
    fallback: "display",
    isUnicode: true
  },
  {
    id: "Ranga",
    name: "Ranga (रंगा - ब्रश स्ट्रोक लिपी)",
    script: "both",
    category: "decorative",
    subCategory: "decorative",
    badge: "Brush Script",
    sampleDevanagari: "रंगपंचमीच्या हार्दिक शुभेच्छा!",
    sampleLatin: "Dynamic Brush Stroke Lettering",
    weights: [400, 700],
    fallback: "display",
    isUnicode: true,
    file: "ranga-regular.ttf"
  },
  {
    id: "Coiny",
    name: "Coiny (कॉइनी - वक्र पोस्टर)",
    script: "both",
    category: "decorative",
    subCategory: "decorative",
    badge: "Curved Bold",
    sampleDevanagari: "आनंदोत्सव साजरा करूया",
    sampleLatin: "Vibrant Curved Display Typography",
    weights: [400],
    fallback: "display",
    isUnicode: true
  },
  {
    id: "Sarpanch",
    name: "Sarpanch (सरपंच - चौकोनी आधुनिक फॉन्ट)",
    script: "both",
    category: "decorative",
    subCategory: "decorative",
    badge: "Techno Square",
    sampleDevanagari: "डिजिटल भारत डिजिटल महाराष्ट्र",
    sampleLatin: "Angular Heavy Display Typeface",
    weights: [400, 600, 700, 800, 900],
    fallback: "display",
    isUnicode: true,
    file: "sarpanch-regular.ttf"
  },

  // 6. PROFESSIONAL (व्यावसायिक व पुस्तके)
  {
    id: "Tiro Devanagari Marathi",
    name: "Tiro Devanagari Marathi (तीरो मराठी शास्त्रीय)",
    script: "both",
    category: "professional",
    subCategory: "professional",
    badge: "Scholarly Book ⭐",
    sampleDevanagari: "मराठी भाषा, व्याकरण व साहित्य अकादमी",
    sampleLatin: "Scholarly Traditional Publishing Face",
    weights: [400],
    fallback: "serif",
    isUnicode: true,
    file: "tiro-devanagari-marathi.otf"
  },
  {
    id: "Eczar",
    name: "Eczar (एक्झार - संपादकीय सेरिफ)",
    script: "both",
    category: "professional",
    subCategory: "professional",
    badge: "Editorial Pro",
    sampleDevanagari: "वार्षिक अहवाल व संशोधन पत्रिका",
    sampleLatin: "Chiseled Editorial Devanagari Serif",
    weights: [400, 600, 700, 800],
    fallback: "serif",
    isUnicode: true
  },
  {
    id: "Halant",
    name: "Halant (हलंत - ग्रंथ मुद्रण शैली)",
    script: "both",
    category: "professional",
    subCategory: "professional",
    badge: "Book Serif",
    sampleDevanagari: "अखंड हरिनाम सप्ताह ग्रंथराज ज्ञानेश्वरी",
    sampleLatin: "Traditional Book Publishing Face",
    weights: [400, 600, 700],
    fallback: "serif",
    isUnicode: true
  },
  {
    id: "Martel",
    name: "Martel (मार्टेल - वृत्तपत्र सेरिफ)",
    script: "both",
    category: "professional",
    subCategory: "professional",
    badge: "Press / News",
    sampleDevanagari: "दैनिक वृत्तपत्र अग्रलेख",
    sampleLatin: "High-Readability News Serif",
    weights: [400, 700, 900],
    fallback: "serif",
    isUnicode: true
  },
  {
    id: "Jaldi",
    name: "Jaldi (जल्दी - कॉर्पोरेट सॅन्स)",
    script: "both",
    category: "professional",
    subCategory: "professional",
    badge: "Corporate Clean",
    sampleDevanagari: "व्यावसायिक पत्रव्यवहार व सादरीकरण",
    sampleLatin: "Clean Corporate Functional Sans",
    weights: [400, 700],
    fallback: "sans-serif",
    isUnicode: true
  },

  // 7. SERIF (वळणदार सेरिफ)
  {
    id: "Noto Serif Devanagari",
    name: "Noto Serif Devanagari (नोटो सेरिफ)",
    script: "both",
    category: "serif",
    subCategory: "serif",
    badge: "Elegant Serif",
    sampleDevanagari: "काव्यसंग्रह व मराठी कथा साहित्य",
    sampleLatin: "Google Elegant Devanagari Serif",
    weights: [400, 600, 700, 800],
    fallback: "serif",
    isUnicode: true,
    file: "noto-serif-devanagari.otf"
  },
  {
    id: "Karma",
    name: "Karma (कर्मा - सुसंस्कृत सेरिफ)",
    script: "both",
    category: "serif",
    subCategory: "serif",
    badge: "Refined Serif",
    sampleDevanagari: "शुभ दीपावली पाडवा आनंद",
    sampleLatin: "Refined Calligraphic Serif Terminal",
    weights: [400, 600, 700],
    fallback: "serif",
    isUnicode: true
  },
  {
    id: "Sahitya",
    name: "Sahitya (साहित्य - मराठी कादंबरी सेरिफ)",
    script: "both",
    category: "serif",
    subCategory: "serif",
    badge: "Literary",
    sampleDevanagari: "संत ज्ञानेश्वर महाराज चरित्र",
    sampleLatin: "Literary Devanagari Book Typeface",
    weights: [400, 700],
    fallback: "serif",
    isUnicode: true
  },
  {
    id: "Laila",
    name: "Laila (लैला - वळणदार सेरिफ)",
    script: "both",
    category: "serif",
    subCategory: "serif",
    badge: "Curved Terminals",
    sampleDevanagari: "सस्नेह निमंत्रण सोहळा",
    sampleLatin: "Warm Curved Serif Typography",
    weights: [400, 700],
    fallback: "serif",
    isUnicode: true
  },

  // 8. SANS SERIF (ठळक सॅन्स सेरिफ)
  {
    id: "Khand",
    name: "Khand (खांड - ठळक हेडलाइन सॅन्स)",
    script: "both",
    category: "sans-serif",
    subCategory: "sans-serif",
    badge: "Tall Headline",
    sampleDevanagari: "ताजी बातमी: आजचा महामुकाबला",
    sampleLatin: "Compact High-Impact Condensed Sans",
    weights: [400, 500, 600, 700],
    fallback: "sans-serif",
    isUnicode: true
  },
  {
    id: "Rajdhani",
    name: "Rajdhani (राजधानी - आधुनिक तंत्रज्ञान सॅन्स)",
    script: "both",
    category: "sans-serif",
    subCategory: "sans-serif",
    badge: "Tech / Modern",
    sampleDevanagari: "स्मार्ट सिटी पुणे व मुंबई मेट्रो",
    sampleLatin: "Squared Futuristic Modern Sans",
    weights: [500, 600, 700],
    fallback: "sans-serif",
    isUnicode: true
  },

  // 9. LEGACY (Non-Unicode / जुनी लिपी)
  {
    id: "Kruti Dev 010",
    name: "Kruti Dev 010 (कृति देव ०१०)",
    script: "devanagari",
    category: "legacy",
    subCategory: "legacy",
    badge: "Legacy ASCII",
    sampleDevanagari: "ueLdkj! (Kruti Dev Mapping)",
    sampleLatin: "Legacy DTP Kruti Dev 010",
    weights: [400],
    fallback: "sans-serif",
    isUnicode: false,
    file: "kruti-dev-010-regular.otf"
  },
  {
    id: "Shivaji01",
    name: "Shivaji 01 (शिवाजी ०१)",
    script: "devanagari",
    category: "legacy",
    subCategory: "legacy",
    badge: "Legacy ASCII",
    sampleDevanagari: "िशवाजी (Shivaji Mapping)",
    sampleLatin: "Legacy Shivaji01 Series",
    weights: [400],
    fallback: "sans-serif",
    isUnicode: false,
    file: "shivaji01-normal.otf"
  },
  {
    id: "AMS Aaditya",
    name: "AMS Aaditya (आदित्य जुनी लिपी)",
    script: "devanagari",
    category: "legacy",
    subCategory: "legacy",
    badge: "Legacy ASCII",
    sampleDevanagari: "vkfnR; (AMS Mapping)",
    sampleLatin: "Legacy AMS Aaditya Font",
    weights: [400],
    fallback: "sans-serif",
    isUnicode: false,
    file: "ams-aaditya.otf"
  }
];

const fileContent = `export interface FontDefinition {
  id: string;
  name: string;
  script: 'devanagari' | 'latin' | 'both';
  category: 'popular' | 'marathi-standard' | 'calligraphy' | 'handwritten' | 'decorative' | 'professional' | 'serif' | 'sans-serif' | 'legacy';
  subCategory?: string;
  badge?: string;
  sampleDevanagari: string;
  sampleLatin: string;
  weights: number[];
  fallback: string;
  isUnicode?: boolean;
  file?: string;
}

export const FONT_LIBRARY: FontDefinition[] = ${JSON.stringify(UNICODE_MARATHI_FONTS, null, 2)};

export const FONT_CATEGORIES = [
  { id: 'all', label: 'All Fonts' },
  { id: 'popular', label: 'Popular' },
  { id: 'marathi-standard', label: 'Marathi Standard' },
  { id: 'calligraphy', label: 'Marathi Calligraphy' },
  { id: 'handwritten', label: 'Handwritten' },
  { id: 'decorative', label: 'Decorative' },
  { id: 'professional', label: 'Professional' },
  { id: 'serif', label: 'Serif' },
  { id: 'sans-serif', label: 'Sans Serif' },
  { id: 'legacy', label: 'Legacy (Non-Unicode)' }
] as const;

export const getFontById = (id: string): FontDefinition | undefined => {
  return FONT_LIBRARY.find((f) => f.id.toLowerCase() === id.toLowerCase());
};

const FAVORITES_STORAGE_KEY = 'canva_favorite_fonts_v2';
const RECENTS_STORAGE_KEY = 'canva_recent_fonts_v2';

export const getFavoriteFonts = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['Mukta', 'Baloo 2', 'Tillana', 'Kalam', 'Modak'];
  } catch {
    return ['Mukta', 'Baloo 2', 'Tillana', 'Kalam', 'Modak'];
  }
};

export const toggleFavoriteFont = (fontId: string): boolean => {
  const favs = getFavoriteFonts();
  const exists = favs.includes(fontId);
  const next = exists ? favs.filter((id) => id !== fontId) : [...favs, fontId];
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
  } catch {}
  return !exists;
};

export const getRecentFonts = (): string[] => {
  try {
    const raw = localStorage.getItem(RECENTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['Mukta', 'Baloo 2', 'Tillana'];
  } catch {
    return ['Mukta', 'Baloo 2', 'Tillana'];
  }
};

export const addRecentFont = (fontId: string): void => {
  const recents = getRecentFonts().filter((id) => id !== fontId);
  const next = [fontId, ...recents].slice(0, 10);
  try {
    localStorage.setItem(RECENTS_STORAGE_KEY, JSON.stringify(next));
  } catch {}
};
`;

fs.writeFileSync('frontend/src/config/fontLibrary.ts', fileContent, 'utf8');
console.log('Successfully generated frontend/src/config/fontLibrary.ts with ' + UNICODE_MARATHI_FONTS.length + ' fonts!');
