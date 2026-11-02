export interface FontMetadata {
  id: string;
  name: string;
  nameMr: string;
  script: 'devanagari' | 'latin' | 'bilingual';
  category: 'Calligraphy' | 'Display' | 'Sans Serif' | 'Serif' | 'Handwriting';
  weights: (string | number)[];
  sampleMr: string;
  sampleEn: string;
  isPopular?: boolean;
}

export const MARATHI_FONT_REGISTRY: FontMetadata[] = [
  {
    id: 'Yatra One',
    name: 'Yatra One (Devanagari Calligraphy)',
    nameMr: 'यात्रा वन (पारंपरिक देवनागरी)',
    script: 'devanagari',
    category: 'Calligraphy',
    weights: ['normal', 'bold'],
    sampleMr: '|| श्री गणेशाय नमः ||',
    sampleEn: 'Royal Maratha',
    isPopular: true
  },
  {
    id: 'Rozha One',
    name: 'Rozha One (Bold Festive Header)',
    nameMr: 'रोझा वन (ठळक उत्सव शीर्षक)',
    script: 'devanagari',
    category: 'Display',
    weights: ['normal', 'bold'],
    sampleMr: 'भव्य उद्घाटन व महासेल',
    sampleEn: 'Grand Opening Sale',
    isPopular: true
  },
  {
    id: 'Modak',
    name: 'Modak (Heavy Fat Display)',
    nameMr: 'मोदक (अति-ठळक शीर्षक)',
    script: 'devanagari',
    category: 'Display',
    weights: ['normal'],
    sampleMr: 'धमाका ५०% सवलत',
    sampleEn: 'Mega 50% Off',
    isPopular: true
  },
  {
    id: 'Tillana',
    name: 'Tillana (Handwritten Script)',
    nameMr: 'तिल्लाना (हस्ताक्षर शैली)',
    script: 'devanagari',
    category: 'Handwriting',
    weights: [400, 500, 600, 700, 800],
    sampleMr: 'स्नेहपूर्वक निमंत्रण',
    sampleEn: 'Cordially Invited',
    isPopular: true
  },
  {
    id: 'Mukta',
    name: 'Mukta (Modern Editorial Sans)',
    nameMr: 'मुक्ता (आधुनिक वृत्तपत्र शैली)',
    script: 'bilingual',
    category: 'Sans Serif',
    weights: [200, 300, 400, 500, 600, 700, 800],
    sampleMr: 'महाराष्ट्र टाइम्स विशेष वार्ता',
    sampleEn: 'Modern Clean Typography',
    isPopular: true
  },
  {
    id: 'Baloo 2',
    name: 'Baloo 2 (Rounded Friendly)',
    nameMr: 'बालू २ (गोलाकार मैत्रीपूर्ण)',
    script: 'bilingual',
    category: 'Sans Serif',
    weights: [400, 500, 600, 700, 800],
    sampleMr: 'ताजे ज्यूस व आइस्क्रीम पार्लर',
    sampleEn: 'Fresh Juices & Shakes',
    isPopular: true
  },
  {
    id: 'Gotu',
    name: 'Gotu (Calligraphic Sans)',
    nameMr: 'गोटू (कॅलिग्राफी आधुनिक)',
    script: 'devanagari',
    category: 'Calligraphy',
    weights: ['normal'],
    sampleMr: 'अमृततुल्य चहा कॅफे',
    sampleEn: 'Authentic Chai',
    isPopular: true
  },
  {
    id: 'Martel',
    name: 'Martel (Royal Classic Serif)',
    nameMr: 'मार्टेल (शाही ऐतिहासिक सेरिफ)',
    script: 'bilingual',
    category: 'Serif',
    weights: [200, 300, 400, 600, 700, 800, 900],
    sampleMr: 'छत्रपती शिवाजी महाराज गौरव',
    sampleEn: 'Royal Maratha Dynasty',
    isPopular: true
  },
  {
    id: 'Noto Sans Devanagari',
    name: 'Noto Sans Devanagari (Clean Document)',
    nameMr: 'नोटो सॅन्स (स्वच्छ शासकीय फॉन्ट)',
    script: 'bilingual',
    category: 'Sans Serif',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    sampleMr: 'अधिकृत सूचना व माहिती',
    sampleEn: 'Official Clean Notices',
    isPopular: false
  },
  {
    id: 'Poppins',
    name: 'Poppins (Geometric Latin)',
    nameMr: 'पॉपिन्स (भूमितीय आधुनिक)',
    script: 'latin',
    category: 'Sans Serif',
    weights: [300, 400, 500, 600, 700, 800],
    sampleMr: 'इंटरनॅशनल स्टुडिओ',
    sampleEn: 'Professional Design Studio',
    isPopular: true
  },
  {
    id: 'Montserrat',
    name: 'Montserrat (Ultra Bold Latin)',
    nameMr: 'माँटसेरात (ठळक जाहिरात)',
    script: 'latin',
    category: 'Sans Serif',
    weights: [400, 500, 600, 700, 800, 900],
    sampleMr: 'मार्केटिंग पोस्टर',
    sampleEn: 'EXPRESSION OF CREATIVITY',
    isPopular: true
  },
  {
    id: 'Playfair Display',
    name: 'Playfair Display (Luxury Editorial)',
    nameMr: 'प्लेफेअर डिस्प्ले (लक्झरी डिझाईन)',
    script: 'latin',
    category: 'Serif',
    weights: [400, 600, 700, 900],
    sampleMr: 'दागिने व रत्न ज्वेलर्स',
    sampleEn: 'Luxury Gold & Diamonds',
    isPopular: true
  }
];

export function getFontDefinition(fontId: string): FontMetadata | undefined {
  return MARATHI_FONT_REGISTRY.find((f) => f.id.toLowerCase() === fontId.toLowerCase());
}
