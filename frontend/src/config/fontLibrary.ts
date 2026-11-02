export interface FontDefinition {
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

export const FONT_LIBRARY: FontDefinition[] = [
  {
    "id": "Mukta",
    "name": "Mukta (मुक्त - Marathi Standard)",
    "script": "both",
    "category": "popular",
    "subCategory": "standard",
    "badge": "Popular ⭐",
    "sampleDevanagari": "नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.",
    "sampleLatin": "The Quick Brown Fox Jumps Over",
    "weights": [
      300,
      400,
      600,
      700,
      800
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "mukta-regular.otf"
  },
  {
    "id": "Baloo 2",
    "name": "Baloo 2 (बालू २ - Rounded Bold)",
    "script": "both",
    "category": "popular",
    "subCategory": "rounded",
    "badge": "Rounded 😊",
    "sampleDevanagari": "महाराष्ट्र माझा अभिमान आहे.",
    "sampleLatin": "Friendly Rounded Headlines",
    "weights": [
      400,
      500,
      600,
      700,
      800
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "baloo-2.otf"
  },
  {
    "id": "Poppins",
    "name": "Poppins (पॉपिन्स - Modern Clean)",
    "script": "both",
    "category": "popular",
    "subCategory": "modern",
    "badge": "Clean Pro 💎",
    "sampleDevanagari": "नमस्कार! आधुनिक मराठी डिझाइन.",
    "sampleLatin": "International Geometric Sans",
    "weights": [
      300,
      400,
      500,
      600,
      700,
      800
    ],
    "fallback": "sans-serif",
    "isUnicode": true
  },
  {
    "id": "Hind",
    "name": "Hind (हिंद - Contemporary Sans)",
    "script": "both",
    "category": "popular",
    "subCategory": "contemporary",
    "badge": "UI Clean 📱",
    "sampleDevanagari": "महाराष्ट्र माझा अभिमान आहे.",
    "sampleLatin": "Contemporary Devanagari Sans",
    "weights": [
      400,
      500,
      600,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": true
  },
  {
    "id": "Noto Sans Devanagari",
    "name": "Noto Sans Devanagari (नोटो सॅन्स)",
    "script": "both",
    "category": "popular",
    "subCategory": "google",
    "badge": "Google Standard 🌐",
    "sampleDevanagari": "सार्वभौम आणि सर्वसमावेशक अक्षरशैली.",
    "sampleLatin": "Harmonious Universal Typeface",
    "weights": [
      300,
      400,
      500,
      600,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "noto-sans-devanagari.otf"
  },
  {
    "id": "Noto Serif Devanagari",
    "name": "Noto Serif Devanagari (नोटो सेरिफ़)",
    "script": "both",
    "category": "serif",
    "subCategory": "google",
    "badge": "Editorial 📰",
    "sampleDevanagari": "साहित्यिक आणि अभिजात मुद्रण शैली.",
    "sampleLatin": "Elegant Literary Devanagari",
    "weights": [
      400,
      600,
      700,
      800
    ],
    "fallback": "serif",
    "isUnicode": true,
    "file": "noto-serif-devanagari.otf"
  },
  {
    "id": "Tiro Devanagari Marathi",
    "name": "Tiro Devanagari Marathi (तिरो मराठी)",
    "script": "both",
    "category": "marathi-standard",
    "subCategory": "traditional",
    "badge": "Official Marathi 🏛️",
    "sampleDevanagari": "महाराष्ट्र शासन अधिकृत लेखन पद्धती.",
    "sampleLatin": "Traditional Marathi Typography",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": true,
    "file": "tiro-devanagari-marathi.otf"
  },
  {
    "id": "SakalBharati",
    "name": "Sakal Bharati (सकाळ भारती - Classic Newspaper)",
    "script": "both",
    "category": "marathi-standard",
    "subCategory": "news",
    "badge": "Newspaper 📰",
    "sampleDevanagari": "दैनिक वृत्तपत्र आणि जनसंवाद माध्यम.",
    "sampleLatin": "Marathi News Classic",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": true,
    "file": "sakal-regular.otf"
  },
  {
    "id": "Sarala",
    "name": "Sarala (सरळा - Clean Minimalist)",
    "script": "both",
    "category": "marathi-standard",
    "subCategory": "clean",
    "badge": "Minimal 🌿",
    "sampleDevanagari": "सोपी, सुंदर आणि वाचनीय देवनागरी.",
    "sampleLatin": "Clean Readable Devanagari",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "ams-saral.otf"
  },
  {
    "id": "Mangal",
    "name": "Mangal (मंगल - Unicode Core)",
    "script": "both",
    "category": "marathi-standard",
    "subCategory": "core",
    "badge": "Unicode Core 💻",
    "sampleDevanagari": "देवनागरी युनिकोड मानक फॉन्ट.",
    "sampleLatin": "Devanagari Unicode Standard",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "mangal-regular.otf"
  },
  {
    "id": "Adobe Devanagari",
    "name": "Adobe Devanagari (अडोबी देवनागरी)",
    "script": "both",
    "category": "serif",
    "subCategory": "pro",
    "badge": "Pro Publishing 📖",
    "sampleDevanagari": "अभिजात आणि समृद्ध ग्रंथ मुद्रण.",
    "sampleLatin": "Professional Book Typesetting",
    "weights": [
      400,
      700
    ],
    "fallback": "serif",
    "isUnicode": true,
    "file": "devanagari-new.otf"
  },
  {
    "id": "AMS Aaditya",
    "name": "AMS Aaditya (एएमएस आदित्य - Calligraphy)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "ams",
    "badge": "AMS Calligraphy ✒️",
    "sampleDevanagari": "माझा महाराष्ट्र, माझी मातृभाषा",
    "sampleLatin": "AMS Aaditya Calligraphy",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "ams-aaditya.otf"
  },
  {
    "id": "AMS Aakash",
    "name": "AMS Aakash (एएमएस आकाश - Bold Calligraphy)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "ams",
    "badge": "AMS Calligraphy ✒️",
    "sampleDevanagari": "भव्य शिवजन्मोत्सव सोहळा",
    "sampleLatin": "AMS Aakash Calligraphy",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "ams-aakash.otf"
  },
  {
    "id": "AMS Manthan",
    "name": "AMS Manthan (एएमएस मंथन - Stylized Script)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "ams",
    "badge": "AMS Calligraphy ✒️",
    "sampleDevanagari": "अखंड भारत, अजिंक्य महाराष्ट्र",
    "sampleLatin": "AMS Manthan Stylized",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "ams-manthan-regular.otf"
  },
  {
    "id": "AMS Lekhani",
    "name": "AMS Lekhani (एएमएस लेखणी - Expressive Calligraphy)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "ams",
    "badge": "AMS Calligraphy ✒️",
    "sampleDevanagari": "॥ श्री गजानन प्रसन्न ॥",
    "sampleLatin": "AMS Lekhani Expressive",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "ams-lekhani.otf"
  },
  {
    "id": "AMS Kiran",
    "name": "AMS Kiran (एएमएस किरण - Modern Calligraphy)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "ams",
    "badge": "AMS Calligraphy ✒️",
    "sampleDevanagari": "मराठी मनाचा स्वाभिमान",
    "sampleLatin": "AMS Kiran Artistic",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "ams-kiran.otf"
  },
  {
    "id": "AMS Sakal",
    "name": "AMS Sakal (एएमएस सकाळ - Headline Script)",
    "script": "both",
    "category": "marathi-standard",
    "subCategory": "ams",
    "badge": "AMS Standard 📰",
    "sampleDevanagari": "दैनिक विशेष पुरवणी",
    "sampleLatin": "AMS Sakal News Classic",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "ams-sakal.otf"
  },
  {
    "id": "AMS Saral",
    "name": "AMS Saral (एएमएस सरळ - Clear Text)",
    "script": "both",
    "category": "marathi-standard",
    "subCategory": "ams",
    "badge": "AMS Clean 📝",
    "sampleDevanagari": "सरळ, सुंदर आणि सुटसुटीत अक्षर",
    "sampleLatin": "AMS Saral Clean Simple",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "ams-saral.otf"
  },
  {
    "id": "AMS Shree Lipi",
    "name": "AMS Shree Lipi (एएमएस श्री लिपी - Title DTP)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "ams",
    "badge": "AMS Title 🏆",
    "sampleDevanagari": "॥ शुभमंगल सावधान ॥",
    "sampleLatin": "AMS Shree Lipi DTP",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "ams-shree-lipi.otf"
  },
  {
    "id": "AMS Vasudeva",
    "name": "AMS Vasudeva (एएमएस वासुदेव - Traditional)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "ams",
    "badge": "AMS Traditional 🕉️",
    "sampleDevanagari": "जय भवानी, जय शिवाजी",
    "sampleLatin": "AMS Vasudeva Heritage",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "ams-vasudeva.otf"
  },
  {
    "id": "Tillana",
    "name": "Tillana (तिल्लाना - Flowing Calligraphy)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "calligraphy",
    "badge": "Calligraphy ✒️",
    "sampleDevanagari": "लावण्य आणि सुलेखनाची कला.",
    "sampleLatin": "Artistic Flowing Calligraphy",
    "weights": [
      400,
      500,
      600,
      700,
      800
    ],
    "fallback": "cursive",
    "isUnicode": true,
    "file": "tillana-calligraphy.otf"
  },
  {
    "id": "Rozha One",
    "name": "Rozha One (रोझा वन - High Contrast Poster)",
    "script": "both",
    "category": "decorative",
    "subCategory": "display",
    "badge": "High Contrast 🌺",
    "sampleDevanagari": "मराठी उत्सव आणि सोहळा.",
    "sampleLatin": "Didone Style High Contrast",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": true,
    "file": "rozha-one.otf"
  },
  {
    "id": "Yatra One",
    "name": "Yatra One (यात्रा वन - Hand-Painted Signage)",
    "script": "both",
    "category": "decorative",
    "subCategory": "retro",
    "badge": "Signage 🎨",
    "sampleDevanagari": "रेल्वे व एसटी महामंडळ फलक.",
    "sampleLatin": "Devanagari Hand-Painted Signage",
    "weights": [
      400
    ],
    "fallback": "display",
    "isUnicode": true,
    "file": "yatra-one.otf"
  },
  {
    "id": "Sarpanch",
    "name": "Sarpanch (सरपंच - Heavy Geometric Display)",
    "script": "both",
    "category": "decorative",
    "subCategory": "bold",
    "badge": "Heavy Bold 💥",
    "sampleDevanagari": "ग्रामपंचायत व राजकीय फलक.",
    "sampleLatin": "Heavy Blocky Headlines",
    "weights": [
      400,
      600,
      700,
      800,
      900
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "sarpanch-regular.ttf"
  },
  {
    "id": "Ranga",
    "name": "Ranga (रंगा - Brush Script)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "brush",
    "badge": "Brush 🖌️",
    "sampleDevanagari": "रंगबिरंगी कला आणि महोत्सव.",
    "sampleLatin": "Fluid Brush Script",
    "weights": [
      400,
      700
    ],
    "fallback": "cursive",
    "isUnicode": true,
    "file": "ranga-regular.ttf"
  },
  {
    "id": "Kalam",
    "name": "Kalam (कलम - Handwritten)",
    "script": "both",
    "category": "handwritten",
    "subCategory": "handwritten",
    "badge": "Handwritten ✍️",
    "sampleDevanagari": "माझ्या हस्ताक्षरातील सुंदर विचार.",
    "sampleLatin": "Natural Organic Handwriting",
    "weights": [
      300,
      400,
      700
    ],
    "fallback": "cursive",
    "isUnicode": true,
    "file": "kalam-handwritten.otf"
  },
  {
    "id": "Priya",
    "name": "Priya (प्रिया - Delicate Classic)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "classic",
    "badge": "Delicate 🌹",
    "sampleDevanagari": "कोमल आणि मोहक सुलेखन कला",
    "sampleLatin": "Priya Classic Devanagari",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "priya.ttf"
  },
  {
    "id": "Marathi-Roupya",
    "name": "Marathi Roupya (मराठी रौप्य - Silver Ornament)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "royal",
    "badge": "Royal / राजेशाही 👑",
    "sampleDevanagari": "रौप्य महोत्सवी भव्य समारंभ",
    "sampleLatin": "Marathi Roupya Ornament",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "roupya.ttf"
  },
  {
    "id": "Marathi Tirkas",
    "name": "Marathi Tirkas (मराठी तिरकस - Dynamic Italic)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "italic",
    "badge": "Dynamic ⚡",
    "sampleDevanagari": "गतिमान आणि आकर्षक मथळे",
    "sampleLatin": "Marathi Tirkas Dynamic Slant",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "tirkas.ttf"
  },
  {
    "id": "Marathi-Vakra",
    "name": "Marathi Vakra (मराठी वक्र - Curved Artistic)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "curved",
    "badge": "Curved 🌀",
    "sampleDevanagari": "वक्रतुंड महाकाय सूर्यकोटि समप्रभ",
    "sampleLatin": "Marathi Vakra Artistic Curve",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "vakra.ttf"
  },
  {
    "id": "MillenniumAditya",
    "name": "Millennium Aditya (मिलेनियम आदित्य)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Wedding 💌",
    "sampleDevanagari": "॥ श्री गणेशाय नमः ॥ शुभविवाह (आदित्य)",
    "sampleLatin": "Millennium Aditya Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumaditya.ttf"
  },
  {
    "id": "MillenniumAmeya",
    "name": "Millennium Ameya (मिलेनियम अमेय)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Wedding 💌",
    "sampleDevanagari": "सस्नेह निमंत्रण व आशीर्वाद (अमेय)",
    "sampleLatin": "Millennium Ameya Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumameya.ttf"
  },
  {
    "id": "MillenniumDeepak",
    "name": "Millennium Deepak (मिलेनियम दीपक)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Invitation ✨",
    "sampleDevanagari": "शुभमंगल सावधान - विवाह सोहळा (दीपक)",
    "sampleLatin": "Millennium Deepak Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumdeepak.ttf"
  },
  {
    "id": "MillenniumGanesh",
    "name": "Millennium Ganesh (मिलेनियम गणेश)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Divine 🕉️",
    "sampleDevanagari": "गणपती बाप्पा मोरया (गणेश)",
    "sampleLatin": "Millennium Ganesh Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumganesh.ttf"
  },
  {
    "id": "MillenniumGauri",
    "name": "Millennium Gauri (मिलेनियम गौरी)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Festival 🌸",
    "sampleDevanagari": "महालक्ष्मी पूजन व उत्सव (गौरी)",
    "sampleLatin": "Millennium Gauri Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumgauri.ttf"
  },
  {
    "id": "MillenniumMogara",
    "name": "Millennium Mogara (मिलेनियम मोगरा)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Floral 🌼",
    "sampleDevanagari": "सुगंधित आठवणी आणि स्नेहमेळावा (मोगरा)",
    "sampleLatin": "Millennium Mogara Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniummogara.ttf"
  },
  {
    "id": "MillenniumNilima",
    "name": "Millennium Nilima (मिलेनियम नीलिमा)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Graceful 💫",
    "sampleDevanagari": "आदरातिथ्य आणि सत्कार समारंभ (नीलिमा)",
    "sampleLatin": "Millennium Nilima Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumnilima.ttf"
  },
  {
    "id": "MillenniumPooja",
    "name": "Millennium Pooja (मिलेनियम पूजा)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Ceremony 🪔",
    "sampleDevanagari": "गृहप्रवेश व वास्तुशांती पूजा (पूजा)",
    "sampleLatin": "Millennium Pooja Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumpooja.ttf"
  },
  {
    "id": "MillenniumPriya",
    "name": "Millennium Priya (मिलेनियम प्रिया)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Classic 🌹",
    "sampleDevanagari": "पारंपारिक मराठी लग्नपत्रिका (प्रिया)",
    "sampleLatin": "Millennium Priya Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumpriya.ttf"
  },
  {
    "id": "MillenniumShailesh",
    "name": "Millennium Shailesh (मिलेनियम शैलेश)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Banner 🚩",
    "sampleDevanagari": "जय महाराष्ट्र! भव्य विजय मेळावा (शैलेश)",
    "sampleLatin": "Millennium Shailesh Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumshailesh.ttf"
  },
  {
    "id": "MillenniumShridhar",
    "name": "Millennium Shridhar (मिलेनियम श्रीधर)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Royal 👑",
    "sampleDevanagari": "राजेशाही निमंत्रण पत्रिका (श्रीधर)",
    "sampleLatin": "Millennium Shridhar Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumshridhar.ttf"
  },
  {
    "id": "MillenniumVarun",
    "name": "Millennium Varun (मिलेनियम वरुण)",
    "script": "devanagari",
    "category": "decorative",
    "subCategory": "millennium",
    "badge": "Headline 📢",
    "sampleDevanagari": "मोठ्या अक्षरातील ठळक मथळा (वरुण)",
    "sampleLatin": "Millennium Varun Marathi",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "millenniumvarun.ttf"
  },
  {
    "id": "Kruti Dev 010",
    "name": "Kruti Dev 010 (कृती देव ०१० - Official)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Govt Standard 🏛️",
    "sampleDevanagari": "महाराष्ट्र शासन अधिकृत राजपत्र व मुद्रण",
    "sampleLatin": "Kruti Dev 010 Official",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-010-regular.otf"
  },
  {
    "id": "Kruti Dev 011",
    "name": "Kruti Dev 011 (कृती देव ०११ - Bold)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Govt Bold 🏛️",
    "sampleDevanagari": "महत्त्वाची शासकीय अधिसूचना व निकाल",
    "sampleLatin": "Kruti Dev 011 Bold",
    "weights": [
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-010-bold.otf"
  },
  {
    "id": "Kruti Dev 055",
    "name": "Kruti Dev 055 (कृती देव ०५५ - Header)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Header 📌",
    "sampleDevanagari": "प्रमुख बातमी व दैनिक घडामोडी",
    "sampleLatin": "Kruti Dev 055 Header",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-055-regular.otf"
  },
  {
    "id": "Kruti Dev 056",
    "name": "Kruti Dev 056 (कृती देव ०५६ - Heavy Header)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Heavy Header 📌",
    "sampleDevanagari": "ठळक मथळे व जाहिरात शीर्षक",
    "sampleLatin": "Kruti Dev 056 Heavy",
    "weights": [
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-055-bold.otf"
  },
  {
    "id": "Kruti Dev 080",
    "name": "Kruti Dev 080 (कृती देव ०८० - Publishing)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Publishing 📚",
    "sampleDevanagari": "ग्रंथ आणि मासिक मुद्रण",
    "sampleLatin": "Kruti Dev 080 Book",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-080-regular.otf"
  },
  {
    "id": "Kruti Dev 090",
    "name": "Kruti Dev 090 (कृती देव ०९० - Press)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Press 🗞️",
    "sampleDevanagari": "वृत्तपत्र अग्रलेख व स्तंभलेखन",
    "sampleLatin": "Kruti Dev 090 Editorial",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-090-regular.otf"
  },
  {
    "id": "Kruti Dev 100",
    "name": "Kruti Dev 100 (कृती देव १०० - Classic)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Classic ✒️",
    "sampleDevanagari": "क्लासिक देवनागरी मुद्रण प्रकार",
    "sampleLatin": "Kruti Dev 100 Classic",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-100-regular.otf"
  },
  {
    "id": "Kruti Dev 110",
    "name": "Kruti Dev 110 (कृती देव ११० - Modern Legacy)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Legacy 🖋️",
    "sampleDevanagari": "व्यावसायिक पत्रव्यवहार व दस्तऐवज",
    "sampleLatin": "Kruti Dev 110 Modern",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-110-regular.otf"
  },
  {
    "id": "Kruti Dev 120",
    "name": "Kruti Dev 120 (कृती देव १२० - Compact)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Compact 📑",
    "sampleDevanagari": "संक्षिप्त आणि व्यवस्थित अक्षर मांडणी",
    "sampleLatin": "Kruti Dev 120 Compact",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-120-regular.otf"
  },
  {
    "id": "Kruti Dev 130",
    "name": "Kruti Dev 130 (कृती देव १३० - Display)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Display 🎯",
    "sampleDevanagari": "आकर्षक फलक व फलक लेखन",
    "sampleLatin": "Kruti Dev 130 Display",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-130-regular.otf"
  },
  {
    "id": "Kruti Dev 140",
    "name": "Kruti Dev 140 (कृती देव १४० - Title)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Title 📢",
    "sampleDevanagari": "मोठे आणि ठळक शीर्षक",
    "sampleLatin": "Kruti Dev 140 Title",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-140-regular.otf"
  },
  {
    "id": "Kruti Dev 141",
    "name": "Kruti Dev 141 (कृती देव १४१ - Heavy Title)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Heavy Title 📢",
    "sampleDevanagari": "विशेष जाहिरात व बॅनर मथळा",
    "sampleLatin": "Kruti Dev 141 Heavy",
    "weights": [
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-140-bold.otf"
  },
  {
    "id": "Kruti Dev 150",
    "name": "Kruti Dev 150 (कृती देव १५० - Stylized)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Stylized ✍️",
    "sampleDevanagari": "सुलेखन शैलीतील कृती देव फॉन्ट",
    "sampleLatin": "Kruti Dev 150 Stylized",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-150-regular.otf"
  },
  {
    "id": "Kruti Dev 255",
    "name": "Kruti Dev 255 (कृती देव २५५ - Decorative)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "krutidev",
    "badge": "Decorative 🎨",
    "sampleDevanagari": "कलात्मक शीर्षक आणि स्वागत फलक",
    "sampleLatin": "Kruti Dev 255 Decorative",
    "weights": [
      400,
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "kruti-dev-255-regular.otf"
  },
  {
    "id": "Shivaji01",
    "name": "Shivaji 01 (शिवाजी ०१ - Standard)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "shivaji",
    "badge": "Press Classic 📰",
    "sampleDevanagari": "शिवनेरी ते रायगड - हिंदवी स्वराज्य",
    "sampleLatin": "Shivaji 01 Marathi Press",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "shivaji01-normal.ttf"
  },
  {
    "id": "Shivaji05",
    "name": "Shivaji 05 (शिवाजी ०५ - Headline)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "shivaji",
    "badge": "Headline Display 📢",
    "sampleDevanagari": "भव्य आणि ऐतिहासिक सोहळा",
    "sampleLatin": "Shivaji 05 Headline",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "shivaji05-normal.ttf"
  },
  {
    "id": "SHREE-DEV-0714",
    "name": "SHREE-DEV-0714 (श्री-लिपी ७१४ - DTP Master)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "shree-lipi",
    "badge": "DTP Master 🖨️",
    "sampleDevanagari": "श्री-लिपी व्यावसायिक वृत्तपत्र व मुद्रण",
    "sampleLatin": "Shree-Lipi 0714 Standard DTP",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "shree-lipi-regular.ttf"
  },
  {
    "id": "Kiran",
    "name": "Kiran (किरण - Legacy Standard)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "kiran",
    "badge": "Legacy Type ⌨️",
    "sampleDevanagari": "किरण फॉन्ट मराठी टायपिंग",
    "sampleLatin": "Kiran Marathi Legacy",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "kiran-regular.otf"
  },
  {
    "id": "Pankaj",
    "name": "Pankaj (पंकज - Bold Banner)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "pankaj",
    "badge": "Banner Suite 🚩",
    "sampleDevanagari": "महाराष्ट्र राज्य विकास परिषद",
    "sampleLatin": "Pankaj Marathi Bold Banner",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "PANKAJB.TTF"
  },
  {
    "id": "Pankaj Condensed",
    "name": "Pankaj Condensed (पंकज कंडेन्स्ड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "pankaj",
    "badge": "Condensed 📐",
    "sampleDevanagari": "कमी जागेत बसणारे ठळक अक्षर",
    "sampleLatin": "Pankaj Condensed Banner",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "pankaj-c.ttf"
  },
  {
    "id": "Pankaj Thin",
    "name": "Pankaj Thin (पंकज थिन)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "pankaj",
    "badge": "Thin Clean 📏",
    "sampleDevanagari": "नाजूक आणि आधुनिक रेषांकन",
    "sampleLatin": "Pankaj Thin Line",
    "weights": [
      300
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "pankaj-t.ttf"
  },
  {
    "id": "Pankaj Wide",
    "name": "Pankaj Wide (पंकज वाइड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "pankaj",
    "badge": "Wide Impact ↔️",
    "sampleDevanagari": "विस्तृत आणि भव्य मथळा",
    "sampleLatin": "Pankaj Wide Extended",
    "weights": [
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "pankaj-w.ttf"
  },
  {
    "id": "Richa",
    "name": "Richa (ऋचा - Headline Pro)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "richa",
    "badge": "Headline Pro 📰",
    "sampleDevanagari": "साप्ताहिक विशेष आवृत्ती",
    "sampleLatin": "Richa Marathi Headline",
    "weights": [
      400,
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "RICHAB.TTF"
  },
  {
    "id": "Richa Condensed",
    "name": "Richa Condensed (ऋचा कंडेन्स्ड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "richa",
    "badge": "Condensed 📐",
    "sampleDevanagari": "शीर्षक आणि उपशीर्षक मांडणी",
    "sampleLatin": "Richa Condensed Marathi",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "richa-cn.ttf"
  },
  {
    "id": "Richa Thin",
    "name": "Richa Thin (ऋचा थिन)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "richa",
    "badge": "Thin Clean 📏",
    "sampleDevanagari": "अभिजात आणि मोहक मुद्रण",
    "sampleLatin": "Richa Thin Elegant",
    "weights": [
      300
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "richa-th.ttf"
  },
  {
    "id": "Richa Wide",
    "name": "Richa Wide (ऋचा वाइड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "richa",
    "badge": "Wide Impact ↔️",
    "sampleDevanagari": "भव्य आणि प्रभावी शीर्षक",
    "sampleLatin": "Richa Wide Poster",
    "weights": [
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "richa-wd.ttf"
  },
  {
    "id": "Ruchi-Normal",
    "name": "Ruchi Normal (रुची नॉर्मल - Poster)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "ruchi",
    "badge": "Poster Multi 🎯",
    "sampleDevanagari": "नाटक, चित्रपट व सांस्कृतिक फलक",
    "sampleLatin": "Ruchi Normal Poster",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "ruchi-n1.ttf"
  },
  {
    "id": "Ruchi-Normal Condensed",
    "name": "Ruchi Condensed (रुची कंडेन्स्ड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "ruchi",
    "badge": "Condensed 📐",
    "sampleDevanagari": "सुटसुटीत जाहिरात मजकूर",
    "sampleLatin": "Ruchi Condensed Poster",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "ruchi-n5.ttf"
  },
  {
    "id": "Ruchi-Normal Thin",
    "name": "Ruchi Thin (रुची थिन)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "ruchi",
    "badge": "Thin Clean 📏",
    "sampleDevanagari": "आधुनिक नाजूक डिझाइन मांडणी",
    "sampleLatin": "Ruchi Thin Modern",
    "weights": [
      300
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "ruchi-n4.ttf"
  },
  {
    "id": "Ruchi-Normal Wide",
    "name": "Ruchi Wide (रुची वाइड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "ruchi",
    "badge": "Wide Impact ↔️",
    "sampleDevanagari": "मोठे आणि पसरट बॅनर मथळा",
    "sampleLatin": "Ruchi Wide Impact",
    "weights": [
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "ruchi-n6.ttf"
  },
  {
    "id": "Saroj",
    "name": "Saroj (सरोज - Traditional Title)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "saroj",
    "badge": "Festival Title 🏵️",
    "sampleDevanagari": "दीपावली पाडवा व नवीन वर्ष शुभेच्छा",
    "sampleLatin": "Saroj Traditional Title",
    "weights": [
      400,
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "SAROJB.TTF"
  },
  {
    "id": "Saroj Condensed",
    "name": "Saroj Condensed (सरोज कंडेन्स्ड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "saroj",
    "badge": "Condensed 📐",
    "sampleDevanagari": "उत्सव आणि समारंभ पत्रिका",
    "sampleLatin": "Saroj Condensed Title",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "saroj-cn.ttf"
  },
  {
    "id": "Saroj Thin",
    "name": "Saroj Thin (सरोज थिन)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "saroj",
    "badge": "Thin Clean 📏",
    "sampleDevanagari": "नाजूक आणि प्रसन्न अक्षरशैली",
    "sampleLatin": "Saroj Thin Graceful",
    "weights": [
      300
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "saroj-th.ttf"
  },
  {
    "id": "Saroj Wide",
    "name": "Saroj Wide (सरोज वाइड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "saroj",
    "badge": "Wide Impact ↔️",
    "sampleDevanagari": "प्रशस्त आणि ठळक शीर्षक",
    "sampleLatin": "Saroj Wide Poster",
    "weights": [
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "saroj-wd.ttf"
  },
  {
    "id": "Varsha",
    "name": "Varsha (वर्षा - Celebration)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "varsha",
    "badge": "Celebration 🎉",
    "sampleDevanagari": "वर्धापन दिन व स्नेहसंमेलन सोहळा",
    "sampleLatin": "Varsha Marathi Celebration",
    "weights": [
      400,
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "VARSHAB.TTF"
  },
  {
    "id": "Varsha Condensed",
    "name": "Varsha Condensed (वर्षा कंडेन्स्ड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "varsha",
    "badge": "Condensed 📐",
    "sampleDevanagari": "मनोहर आणि सुबक अक्षररचना",
    "sampleLatin": "Varsha Condensed Elegance",
    "weights": [
      400
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "varsha-c.ttf"
  },
  {
    "id": "Varsha Thin",
    "name": "Varsha Thin (वर्षा थिन)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "varsha",
    "badge": "Thin Clean 📏",
    "sampleDevanagari": "निसर्ग आणि पावसाळी सोहळा",
    "sampleLatin": "Varsha Thin Delicate",
    "weights": [
      300
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "varsha-t.ttf"
  },
  {
    "id": "Varsha Wide",
    "name": "Varsha Wide (वर्षा वाइड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "varsha",
    "badge": "Wide Impact ↔️",
    "sampleDevanagari": "भव्य आणि गौरवशाली मांडणी",
    "sampleLatin": "Varsha Wide Festive",
    "weights": [
      700
    ],
    "fallback": "serif",
    "isUnicode": false,
    "file": "varsha-w.ttf"
  },
  {
    "id": "Vimal",
    "name": "Vimal (विमल - Bold Display)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "vimal",
    "badge": "Bold Display ⚡",
    "sampleDevanagari": "क्रांतिकारी आणि कणखर अक्षरशैली",
    "sampleLatin": "Vimal Marathi Bold Display",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "VIMALB.TTF"
  },
  {
    "id": "Vimal Condensed",
    "name": "Vimal Condensed (विमल कंडेन्स्ड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "vimal",
    "badge": "Condensed 📐",
    "sampleDevanagari": "राजकीय व सामाजिक फलक",
    "sampleLatin": "Vimal Condensed Bold",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "vimal-cn.ttf"
  },
  {
    "id": "Vimal Thin",
    "name": "Vimal Thin (विमल थिन)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "vimal",
    "badge": "Thin Clean 📏",
    "sampleDevanagari": "सुस्पष्ट आणि स्वच्छ सुलेखन",
    "sampleLatin": "Vimal Thin Display",
    "weights": [
      300
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "vimal-th.ttf"
  },
  {
    "id": "Vimal Wide",
    "name": "Vimal Wide (विमल वाइड)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "vimal",
    "badge": "Wide Impact ↔️",
    "sampleDevanagari": "धडाकेबाज आणि लक्षवेधी मथळा",
    "sampleLatin": "Vimal Wide Powerful",
    "weights": [
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "vimal-wd.ttf"
  },
  {
    "id": "Eczar",
    "name": "Eczar (एक्झार - Contemporary Serif)",
    "script": "both",
    "category": "serif",
    "subCategory": "google",
    "badge": "Calligraphic Serif 🖋️",
    "sampleDevanagari": "साहित्य, संस्कृती आणि कला.",
    "sampleLatin": "Contemporary Devanagari Serif",
    "weights": [
      400,
      600,
      700,
      800
    ],
    "fallback": "serif",
    "isUnicode": true
  },
  {
    "id": "Halant",
    "name": "Halant (हलंत - Scholarly Serif)",
    "script": "both",
    "category": "serif",
    "subCategory": "google",
    "badge": "Scholarly 📖",
    "sampleDevanagari": "अभिजात मराठी साहित्य संपदा.",
    "sampleLatin": "Scholarly Devanagari Text",
    "weights": [
      400,
      600,
      700
    ],
    "fallback": "serif",
    "isUnicode": true
  },
  {
    "id": "Modak",
    "name": "Modak (मोदक - Ultra Fat Display)",
    "script": "both",
    "category": "decorative",
    "subCategory": "google",
    "badge": "Chubby Fat 🧁",
    "sampleDevanagari": "गोड आठवणी आणि सणवार.",
    "sampleLatin": "Ultra-Heavy Chubby Display",
    "weights": [
      400
    ],
    "fallback": "display",
    "isUnicode": true
  },
  {
    "id": "Gotu",
    "name": "Gotu (गोटू - Modern Monoline)",
    "script": "both",
    "category": "sans-serif",
    "subCategory": "google",
    "badge": "Monoline ⚪",
    "sampleDevanagari": "गोल आणि सुबक अक्षरांची रचना.",
    "sampleLatin": "Modern Monoline Devanagari",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true
  },
  {
    "id": "Rajdhani",
    "name": "Rajdhani (राजधानी - Technical Sans)",
    "script": "both",
    "category": "sans-serif",
    "subCategory": "google",
    "badge": "Technical 🤖",
    "sampleDevanagari": "तंत्रज्ञान आणि आधुनिकता.",
    "sampleLatin": "Squared Modular Typography",
    "weights": [
      500,
      600,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": true
  },
  {
    "id": "Khand",
    "name": "Khand (खांड - Condensed Sans)",
    "script": "both",
    "category": "sans-serif",
    "subCategory": "google",
    "badge": "Compact Sans 📐",
    "sampleDevanagari": "कमी जागेत जास्तीत जास्त प्रभाव.",
    "sampleLatin": "Compact Bold Headlines",
    "weights": [
      400,
      500,
      600,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "ranga-regular.ttf"
  },
  {
    "id": "Coiny",
    "name": "Coiny (कॉइनी - Playful Round)",
    "script": "both",
    "category": "decorative",
    "subCategory": "google",
    "badge": "Playful 🎈",
    "sampleDevanagari": "आनंदी आणि बाल डिझाइन शैली.",
    "sampleLatin": "Playful Bubble Typeface",
    "weights": [
      400
    ],
    "fallback": "display",
    "isUnicode": true
  },
  {
    "id": "Amita",
    "name": "Amita (अमिता - Calligraphic Cursive)",
    "script": "both",
    "category": "calligraphy",
    "subCategory": "google",
    "badge": "Cursive 🌸",
    "sampleDevanagari": "सुंदर आणि लवचिक हस्तलेखन.",
    "sampleLatin": "Calligraphic Cursive Devanagari",
    "weights": [
      400,
      700
    ],
    "fallback": "cursive",
    "isUnicode": true
  },
  {
    "id": "Dekko",
    "name": "Dekko (डेक्को - Marker Hand)",
    "script": "both",
    "category": "handwritten",
    "subCategory": "google",
    "badge": "Marker 🖍️",
    "sampleDevanagari": "मार्कर पेनाने लिहिलेली शैली.",
    "sampleLatin": "Casual Marker Handwriting",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": true
  },
  {
    "id": "Gajraj One",
    "name": "Gajraj One (गजराज - Monumental Bold)",
    "script": "both",
    "category": "decorative",
    "subCategory": "google",
    "badge": "Monumental 🐘",
    "sampleDevanagari": "भव्य आणि वजनदार मथळा.",
    "sampleLatin": "Monumental Display Headlines",
    "weights": [
      400
    ],
    "fallback": "display",
    "isUnicode": true
  },
  {
    "id": "Shrikhand",
    "name": "Shrikhand (श्रीखंड - Retro Signboard)",
    "script": "both",
    "category": "decorative",
    "subCategory": "google",
    "badge": "Retro Sweet 🍧",
    "sampleDevanagari": "पारंपारिक मिठाई आणि दुकानांचे फलक.",
    "sampleLatin": "Hand-Painted Signboard Display",
    "weights": [
      400
    ],
    "fallback": "display",
    "isUnicode": true
  },
  {
    "id": "Jaldi",
    "name": "Jaldi (जल्दी - Crisp Sans)",
    "script": "both",
    "category": "sans-serif",
    "subCategory": "google",
    "badge": "Fast Reading ⚡",
    "sampleDevanagari": "जलद आणि सुलभ वाचन अनुभव.",
    "sampleLatin": "Contemporary Modern Sans",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": true
  },
  {
    "id": "Karma",
    "name": "Karma (कर्मा - Editorial Serif)",
    "script": "both",
    "category": "serif",
    "subCategory": "google",
    "badge": "Editorial 📜",
    "sampleDevanagari": "शांत, संतुलित आणि गंभीर मजकूर.",
    "sampleLatin": "Editorial Book Typography",
    "weights": [
      400,
      600,
      700
    ],
    "fallback": "serif",
    "isUnicode": true
  },
  {
    "id": "Laila",
    "name": "Laila (लैला - Brush Contemporary)",
    "script": "both",
    "category": "handwritten",
    "subCategory": "google",
    "badge": "Brush Elegance 🌷",
    "sampleDevanagari": "कोमल आणि मोहक अक्षररचना.",
    "sampleLatin": "Contemporary Brush Serif",
    "weights": [
      400,
      700
    ],
    "fallback": "serif",
    "isUnicode": true
  },
  {
    "id": "Martel",
    "name": "Martel (मार्टेल - Heavy Contrast Serif)",
    "script": "both",
    "category": "serif",
    "subCategory": "google",
    "badge": "Heavy Serif 🏛️",
    "sampleDevanagari": "ठाम आणि वजनदार मुद्रण शैली.",
    "sampleLatin": "High-Contrast Publishing Type",
    "weights": [
      400,
      700,
      900
    ],
    "fallback": "serif",
    "isUnicode": true
  },
  {
    "id": "Sahitya",
    "name": "Sahitya (साहित्य - Literary Serif)",
    "script": "both",
    "category": "serif",
    "subCategory": "google",
    "badge": "Literature 📚",
    "sampleDevanagari": "मराठी साहित्य आणि ग्रंथ संपदा.",
    "sampleLatin": "Classic Literary Typography",
    "weights": [
      400,
      700
    ],
    "fallback": "serif",
    "isUnicode": true
  },
  {
    "id": "Ajay Normal",
    "name": "Ajay Normal Bold (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "Ajay Normal",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Ajay Normal Bold.ttf"
  },
  {
    "id": "Aman",
    "name": "Aman (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "Aman",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Aman Normal.ttf"
  },
  {
    "id": "Amit-Normal Condensed",
    "name": "Amit-Normal Condensed (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "Amit-Normal Condensed",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Amit-Normal Condensed Regular.ttf"
  },
  {
    "id": "AMS Aakul 1",
    "name": "AMS Aakul 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aakul 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aakul 1 Regular.ttf"
  },
  {
    "id": "AMS Aakul 2",
    "name": "AMS Aakul 2 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aakul 2",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aakul 2 Regular.ttf"
  },
  {
    "id": "AMS Aakul 3",
    "name": "AMS Aakul 3 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aakul 3",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aakul 3 Regular.ttf"
  },
  {
    "id": "AMS Aakul 4",
    "name": "AMS Aakul 4 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aakul 4",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aakul 4 Regular.ttf"
  },
  {
    "id": "AMS Aakul 5",
    "name": "AMS Aakul 5 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aakul 5",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aakul 5 Regular.ttf"
  },
  {
    "id": "AMS Aakul 6",
    "name": "AMS Aakul 6 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aakul 6",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aakul 6 Regular.ttf"
  },
  {
    "id": "AMS Aakul 7",
    "name": "AMS Aakul 7 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aakul 7",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aakul 7 Regular.ttf"
  },
  {
    "id": "AMS Aakul 8",
    "name": "AMS Aakul 8 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aakul 8",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aakul 8 Regular.ttf"
  },
  {
    "id": "AMS Aasmi",
    "name": "AMS Aasmi (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Aasmi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Aasmi Regular.ttf"
  },
  {
    "id": "AMS Afrin",
    "name": "AMS Afrin (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Afrin",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Afrin Regular.ttf"
  },
  {
    "id": "AMS Ankur",
    "name": "AMS Ankur (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Ankur",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Ankur Regular.ttf"
  },
  {
    "id": "AMS BadHand",
    "name": "AMS BadHand (Handwritten)",
    "script": "devanagari",
    "category": "handwritten",
    "subCategory": "handwritten",
    "badge": "Handwritten",
    "sampleDevanagari": "माझे सुंदर हस्ताक्षर",
    "sampleLatin": "AMS BadHand",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "AMS BadHand Regular.ttf"
  },
  {
    "id": "AMS Barakhadi 1",
    "name": "AMS Barakhadi 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Barakhadi 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Barakhadi 1 Regular.ttf"
  },
  {
    "id": "AMS Barakhadi",
    "name": "AMS Barakhadi (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Barakhadi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Barakhadi Regular.ttf"
  },
  {
    "id": "AMS Bhagyshri",
    "name": "AMS Bhagyshri (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Bhagyshri",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Bhagyshri Regular.ttf"
  },
  {
    "id": "AMS Bindu Rekha 1 Bold",
    "name": "AMS Bindu Rekha 1 Bold (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Bindu Rekha 1 Bold",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Bindu Rekha 1 Bold Regular.ttf"
  },
  {
    "id": "AMS Bindu Rekha 1",
    "name": "AMS Bindu Rekha 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Bindu Rekha 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Bindu Rekha 1 Regular.ttf"
  },
  {
    "id": "AMS Calligraphy 2",
    "name": "AMS Calligraphy 2 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Calligraphy 2",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Calligraphy 2 Regular.ttf"
  },
  {
    "id": "AMS Calligraphy 3",
    "name": "AMS Calligraphy 3 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Calligraphy 3",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Calligraphy 3 Regular.ttf"
  },
  {
    "id": "AMS Calligraphy 4",
    "name": "AMS Calligraphy 4 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Calligraphy 4",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Calligraphy 4 Regular.ttf"
  },
  {
    "id": "AMS Calligraphy 5",
    "name": "AMS Calligraphy 5 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Calligraphy 5",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Calligraphy 5 Regular.ttf"
  },
  {
    "id": "AMS Calligraphy 6",
    "name": "AMS Calligraphy 6 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Calligraphy 6",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Calligraphy 6 Regular.ttf"
  },
  {
    "id": "AMS Calligraphy 7",
    "name": "AMS Calligraphy 7 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Calligraphy 7",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Calligraphy 7 Regular.ttf"
  },
  {
    "id": "AMS Calligraphy 8",
    "name": "AMS Calligraphy 8 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Calligraphy 8",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Calligraphy 8 Regular.ttf"
  },
  {
    "id": "AMS Calligraphy 9",
    "name": "AMS Calligraphy 9 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Calligraphy 9",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Calligraphy 9 Regular.ttf"
  },
  {
    "id": "AMS Candy",
    "name": "AMS Candy (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Candy",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Candy Regular.ttf"
  },
  {
    "id": "AMS Chandrakant",
    "name": "AMS Chandrakant (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Chandrakant",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Chandrakant Regular.ttf"
  },
  {
    "id": "AMS Chhatrapati",
    "name": "AMS Chhatrapati (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ जय भवानी जय शिवाजी ॥",
    "sampleLatin": "AMS Chhatrapati",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Chhatrapati Regular.ttf"
  },
  {
    "id": "AMS Cinema",
    "name": "AMS Cinema (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Cinema",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Cinema Regular.ttf"
  },
  {
    "id": "AMS Darshana",
    "name": "AMS Darshana (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Darshana",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Darshana Regular.ttf"
  },
  {
    "id": "AMS Dasra 01",
    "name": "AMS Dasra 01 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "दिवाळीच्या हार्दिक शुभेच्छा",
    "sampleLatin": "AMS Dasra 01",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Dasra 01 Regular.ttf"
  },
  {
    "id": "AMS Deepak",
    "name": "AMS Deepak (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Deepak",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Deepak Regular.ttf"
  },
  {
    "id": "AMS Diamond",
    "name": "AMS Diamond (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Diamond",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Diamond Regular.ttf"
  },
  {
    "id": "AMS Dipanshu",
    "name": "AMS Dipanshu (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Dipanshu",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Dipanshu Regular.ttf"
  },
  {
    "id": "AMS Dipawali 01",
    "name": "AMS Dipawali 01 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "दिवाळीच्या हार्दिक शुभेच्छा",
    "sampleLatin": "AMS Dipawali 01",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Dipawali 01 Regular.ttf"
  },
  {
    "id": "AMS Divya",
    "name": "AMS Divya (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Divya",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Divya Regular.ttf"
  },
  {
    "id": "AMS Diya",
    "name": "AMS Diya (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Diya",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Diya Regular.ttf"
  },
  {
    "id": "AMS Ganesha",
    "name": "AMS Ganesha (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ श्री गणेशाय नमः ॥",
    "sampleLatin": "AMS Ganesha",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Ganesha Regular.ttf"
  },
  {
    "id": "AMS GeoScript",
    "name": "AMS GeoScript (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS GeoScript",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS GeoScript Regular.ttf"
  },
  {
    "id": "AMS Girija",
    "name": "AMS Girija (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Girija",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Girija Regular.ttf"
  },
  {
    "id": "AMS Glassy",
    "name": "AMS Glassy (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Glassy",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Glassy Regular.ttf"
  },
  {
    "id": "AMS Gourav Bold",
    "name": "AMS Gourav Bold (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "महाराष्ट्र माझा अभिमान",
    "sampleLatin": "AMS Gourav Bold",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Gourav Bold Regular.ttf"
  },
  {
    "id": "AMS Gourav",
    "name": "AMS Gourav (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "महाराष्ट्र माझा अभिमान",
    "sampleLatin": "AMS Gourav",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Gourav Regular.ttf"
  },
  {
    "id": "AMS Grass",
    "name": "AMS Grass (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Grass",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Grass Regular.ttf"
  },
  {
    "id": "AMS Handwriting 1",
    "name": "AMS Handwriting 1 (Handwritten)",
    "script": "devanagari",
    "category": "handwritten",
    "subCategory": "handwritten",
    "badge": "Handwritten",
    "sampleDevanagari": "माझे सुंदर हस्ताक्षर",
    "sampleLatin": "AMS Handwriting 1",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "AMS Handwriting 1 Regular.ttf"
  },
  {
    "id": "AMS Handwriting 2",
    "name": "AMS Handwriting 2 (Handwritten)",
    "script": "devanagari",
    "category": "handwritten",
    "subCategory": "handwritten",
    "badge": "Handwritten",
    "sampleDevanagari": "माझे सुंदर हस्ताक्षर",
    "sampleLatin": "AMS Handwriting 2",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "AMS Handwriting 2 Regular.ttf"
  },
  {
    "id": "AMS Handwriting 3",
    "name": "AMS Handwriting 3 (Handwritten)",
    "script": "devanagari",
    "category": "handwritten",
    "subCategory": "handwritten",
    "badge": "Handwritten",
    "sampleDevanagari": "माझे सुंदर हस्ताक्षर",
    "sampleLatin": "AMS Handwriting 3",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "AMS Handwriting 3 Regular.ttf"
  },
  {
    "id": "AMS Handwriting 4",
    "name": "AMS Handwriting 4 (Handwritten)",
    "script": "devanagari",
    "category": "handwritten",
    "subCategory": "handwritten",
    "badge": "Handwritten",
    "sampleDevanagari": "माझे सुंदर हस्ताक्षर",
    "sampleLatin": "AMS Handwriting 4",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "AMS Handwriting 4 Regular.ttf"
  },
  {
    "id": "AMS Harshdeep",
    "name": "AMS Harshdeep (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Harshdeep",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Harshdeep Regular.ttf"
  },
  {
    "id": "AMS Hastkala 1",
    "name": "AMS Hastkala 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Hastkala 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Hastkala 1 Regular.ttf"
  },
  {
    "id": "AMS Hastkala 2",
    "name": "AMS Hastkala 2 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Hastkala 2",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Hastkala 2 Regular.ttf"
  },
  {
    "id": "AMS Hastkala",
    "name": "AMS Hastkala (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Hastkala",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Hastkala Regular.ttf"
  },
  {
    "id": "AMS Indu",
    "name": "AMS Indu (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Indu",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Indu Regular.ttf"
  },
  {
    "id": "AMS Jambo",
    "name": "AMS Jambo (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Jambo",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Jambo Regular.ttf"
  },
  {
    "id": "AMS Jiwan",
    "name": "AMS Jiwan (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Jiwan",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Jiwan Regular.ttf"
  },
  {
    "id": "AMS Kangna",
    "name": "AMS Kangna (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Kangna",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Kangna Regular.ttf"
  },
  {
    "id": "AMS Kartik",
    "name": "AMS Kartik (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Kartik",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Kartik Regular.ttf"
  },
  {
    "id": "AMS Karuna",
    "name": "AMS Karuna (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Karuna",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Karuna Regular.ttf"
  },
  {
    "id": "AMS Kashi",
    "name": "AMS Kashi (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Kashi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Kashi Regular.ttf"
  },
  {
    "id": "AMS Kasturi 1",
    "name": "AMS Kasturi 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Kasturi 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Kasturi 1 Regular.ttf"
  },
  {
    "id": "AMS Kasturi",
    "name": "AMS Kasturi Regular (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Kasturi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Kasturi Regular.ttf"
  },
  {
    "id": "AMS Kesri 1",
    "name": "AMS Kesri 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Kesri 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Kesri 1 Regular.ttf"
  },
  {
    "id": "AMS Kesri",
    "name": "AMS Kesri (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Kesri",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Kesri Regular.ttf"
  },
  {
    "id": "AMS Kirti",
    "name": "AMS Kirti (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Kirti",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Kirti Regular.ttf"
  },
  {
    "id": "AMS Leafy 1",
    "name": "AMS Leafy 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Leafy 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Leafy 1 Regular.ttf"
  },
  {
    "id": "AMS Leafy 2",
    "name": "AMS Leafy 2 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Leafy 2",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Leafy 2 Regular.ttf"
  },
  {
    "id": "AMS Leafy 3",
    "name": "AMS Leafy 3 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Leafy 3",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Leafy 3 Regular.ttf"
  },
  {
    "id": "AMS Leafy",
    "name": "AMS Leafy (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Leafy",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Leafy Regular.ttf"
  },
  {
    "id": "AMS Lekhan 1 Bold",
    "name": "AMS Lekhan 1 Bold (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Lekhan 1 Bold",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Lekhan 1 Bold Regular.ttf"
  },
  {
    "id": "AMS Lekhan 1",
    "name": "AMS Lekhan 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Lekhan 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Lekhan 1 Regular.ttf"
  },
  {
    "id": "AMS Lekhan 2",
    "name": "AMS Lekhan 2 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Lekhan 2",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Lekhan 2 Regular.ttf"
  },
  {
    "id": "AMS Lekhan 3",
    "name": "AMS Lekhan 3 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Lekhan 3",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Lekhan 3 Regular.ttf"
  },
  {
    "id": "AMS Lekhan 4",
    "name": "AMS Lekhan 4 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Lekhan 4",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Lekhan 4 Regular.ttf"
  },
  {
    "id": "AMS Lekhan 5",
    "name": "AMS Lekhan 5 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "मराठी राजभाषा गौरव दिन",
    "sampleLatin": "AMS Lekhan 5",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Lekhan 5 Regular.ttf"
  },
  {
    "id": "AMS MahaBharat",
    "name": "AMS MahaBharat (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ जय भवानी जय शिवाजी ॥",
    "sampleLatin": "AMS MahaBharat",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS MahaBharat Regular.ttf"
  },
  {
    "id": "AMS Manoja",
    "name": "AMS Manoja (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Manoja",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Manoja Regular.ttf"
  },
  {
    "id": "AMS Mantra",
    "name": "AMS Mantra (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ ॐ नमः शिवाय ॥",
    "sampleLatin": "AMS Mantra",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Mantra Regular.ttf"
  },
  {
    "id": "AMS Matarani",
    "name": "AMS Matarani (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Matarani",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Matarani Regular.ttf"
  },
  {
    "id": "AMS Meghna",
    "name": "AMS Meghna (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Meghna",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Meghna Regular.ttf"
  },
  {
    "id": "AMS Modi",
    "name": "AMS Modi (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Modi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Modi Regular.ttf"
  },
  {
    "id": "AMS Morya 01",
    "name": "AMS Morya 01 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ श्री गणेशाय नमः ॥",
    "sampleLatin": "AMS Morya 01",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Morya 01 Regular.ttf"
  },
  {
    "id": "AMS Navratri",
    "name": "AMS Navratri (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "दिवाळीच्या हार्दिक शुभेच्छा",
    "sampleLatin": "AMS Navratri",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Navratri Regular.ttf"
  },
  {
    "id": "AMS Nirakriti",
    "name": "AMS Nirakriti (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Nirakriti",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Nirakriti Regular.ttf"
  },
  {
    "id": "AMS Pankaj",
    "name": "AMS Pankaj (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Pankaj",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Pankaj Regular.ttf"
  },
  {
    "id": "AMS Payal",
    "name": "AMS Payal (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Payal",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Payal Regular.ttf"
  },
  {
    "id": "AMS Pencil",
    "name": "AMS Pencil (Handwritten)",
    "script": "devanagari",
    "category": "handwritten",
    "subCategory": "handwritten",
    "badge": "Handwritten",
    "sampleDevanagari": "माझे सुंदर हस्ताक्षर",
    "sampleLatin": "AMS Pencil",
    "weights": [
      400
    ],
    "fallback": "cursive",
    "isUnicode": false,
    "file": "AMS Pencil Regular.ttf"
  },
  {
    "id": "AMS Premankur",
    "name": "AMS Premankur (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Premankur",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Premankur Regular.ttf"
  },
  {
    "id": "AMS Purvi",
    "name": "AMS Purvi (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Purvi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Purvi Regular.ttf"
  },
  {
    "id": "AMS RaviKumar",
    "name": "AMS RaviKumar (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS RaviKumar",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS RaviKumar Regular.ttf"
  },
  {
    "id": "AMS Rekha 1",
    "name": "AMS Rekha 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Rekha 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Rekha 1 Regular.ttf"
  },
  {
    "id": "AMS Rekha 2",
    "name": "AMS Rekha 2 Regular (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Rekha 2",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Rekha 2 Regular.ttf"
  },
  {
    "id": "AMS Rekha 3",
    "name": "AMS Rekha 3 Regular (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Rekha 3",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Rekha 3 Regular.ttf"
  },
  {
    "id": "AMS Rekha 4",
    "name": "AMS Rekha 4 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Rekha 4",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Rekha 4 Regular.ttf"
  },
  {
    "id": "AMS Rekha 5",
    "name": "AMS Rekha 5 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Rekha 5",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Rekha 5 Regular.ttf"
  },
  {
    "id": "AMS Rekha 6",
    "name": "AMS Rekha 6 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Rekha 6",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Rekha 6 Regular.ttf"
  },
  {
    "id": "AMS Samanya 1",
    "name": "AMS Samanya 1 (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Samanya 1",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Samanya 1 Regular.ttf"
  },
  {
    "id": "AMS Samanya Bold",
    "name": "AMS Samanya Bold (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Samanya Bold",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Samanya Bold Regular.ttf"
  },
  {
    "id": "AMS Samanya",
    "name": "AMS Samanya (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Samanya",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Samanya Regular.ttf"
  },
  {
    "id": "AMS Sandhya",
    "name": "AMS Sandhya (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Sandhya",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Sandhya Regular.ttf"
  },
  {
    "id": "AMS Shikha",
    "name": "AMS Shikha (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Shikha",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Shikha Regular.ttf"
  },
  {
    "id": "AMS Shloka",
    "name": "AMS Shloka (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ ॐ नमः शिवाय ॥",
    "sampleLatin": "AMS Shloka",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Shloka Regular.ttf"
  },
  {
    "id": "AMS SimaRekha",
    "name": "AMS SimaRekha (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS SimaRekha",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS SimaRekha Regular.ttf"
  },
  {
    "id": "AMS Sindhu",
    "name": "AMS Sindhu (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Sindhu",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Sindhu Regular.ttf"
  },
  {
    "id": "AMS Sudha",
    "name": "AMS Sudha (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Sudha",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Sudha Regular.ttf"
  },
  {
    "id": "AMS Sundar",
    "name": "AMS Sundar (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Sundar",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Sundar Regular.ttf"
  },
  {
    "id": "AMS Swarup Bold",
    "name": "AMS Swarup Bold (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "महाराष्ट्र माझा अभिमान",
    "sampleLatin": "AMS Swarup Bold",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Swarup Bold Regular.ttf"
  },
  {
    "id": "AMS Swarup Reguler",
    "name": "AMS Swarup Reguler (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "महाराष्ट्र माझा अभिमान",
    "sampleLatin": "AMS Swarup Reguler",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Swarup Reguler Regular.ttf"
  },
  {
    "id": "AMS Swarup Thin",
    "name": "AMS Swarup Thin (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "महाराष्ट्र माझा अभिमान",
    "sampleLatin": "AMS Swarup Thin",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Swarup Thin Regular.ttf"
  },
  {
    "id": "AMS Tikiya",
    "name": "AMS Tikiya (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Tikiya",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Tikiya Regular.ttf"
  },
  {
    "id": "AMS Tushar",
    "name": "AMS Tushar (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Tushar",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Tushar Regular.ttf"
  },
  {
    "id": "AMS Umakant",
    "name": "AMS Umakant (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Umakant",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Umakant Regular.ttf"
  },
  {
    "id": "AMS Uttar",
    "name": "AMS Uttar (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Uttar",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Uttar Regular.ttf"
  },
  {
    "id": "AMS Vardan",
    "name": "AMS Vardan (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Vardan",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Vardan Regular.ttf"
  },
  {
    "id": "AMS Varsha",
    "name": "AMS Varsha (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Varsha",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Varsha Regular.ttf"
  },
  {
    "id": "AMS Varun",
    "name": "AMS Varun (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Varun",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Varun Regular.ttf"
  },
  {
    "id": "AMS Vedant",
    "name": "AMS Vedant (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Vedant",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Vedant Regular.ttf"
  },
  {
    "id": "AMS Vina",
    "name": "AMS Vina (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Vina",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Vina Regular.ttf"
  },
  {
    "id": "AMS Viram",
    "name": "AMS Viram (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Viram",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Viram Regular.ttf"
  },
  {
    "id": "AMS Wishes",
    "name": "AMS Wishes (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Wishes",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Wishes Regular.ttf"
  },
  {
    "id": "AMS Wood",
    "name": "AMS Wood (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Wood",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Wood Regular.ttf"
  },
  {
    "id": "AMS Yantra",
    "name": "AMS Yantra (AMS Calligraphy)",
    "script": "devanagari",
    "category": "calligraphy",
    "subCategory": "ams-calligraphy",
    "badge": "AMS Calligraphy",
    "sampleDevanagari": "॥ राजा शिवछत्रपती ॥",
    "sampleLatin": "AMS Yantra",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "AMS Yantra Regular.ttf"
  },
  {
    "id": "Ananda Namaste",
    "name": "Ananda Namaste (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Ananda Namaste",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Ananda Namaste Regular.ttf"
  },
  {
    "id": "Chandas",
    "name": "Chandas (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Chandas",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Chandas Regular.ttf"
  },
  {
    "id": "Devanagari New",
    "name": "Devanagari New Normal (Marathi)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "marathi",
    "badge": "Marathi",
    "sampleDevanagari": "॥ श्री गणेशाय नमः ॥",
    "sampleLatin": "Devanagari New",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Devanagari New Normal.ttf"
  },
  {
    "id": "DevLys 010",
    "name": "DevLys 010 Bold Italic (DevLys)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "devlys",
    "badge": "DevLys",
    "sampleDevanagari": "महाराष्ट्र शासन राजपत्र",
    "sampleLatin": "DevLys 010",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "DevLys 010 Bold Italic.ttf"
  },
  {
    "id": "gargi",
    "name": "gargi (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "gargi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "gargi Medium.ttf"
  },
  {
    "id": "Kalimati",
    "name": "Kalimati Regular (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Kalimati",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Kalimati Regular.ttf"
  },
  {
    "id": "KF-Kiran",
    "name": "KF-Kiran (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "KF-Kiran",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "KF-Kiran Normal.ttf"
  },
  {
    "id": "Khand SemiBold",
    "name": "Khand SemiBold (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Khand SemiBold",
    "weights": [
      400,
      700
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Khand SemiBold.ttf"
  },
  {
    "id": "Kruti Dev 111",
    "name": "Kruti Dev 111 (Kruti Dev)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "kruti-dev",
    "badge": "Kruti Dev",
    "sampleDevanagari": "महाराष्ट्र शासन राजपत्र",
    "sampleLatin": "Kruti Dev 111",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Kruti Dev 111 Bold.ttf"
  },
  {
    "id": "Kruti Dev 163",
    "name": "Kruti Dev 163 (Kruti Dev)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "kruti-dev",
    "badge": "Kruti Dev",
    "sampleDevanagari": "महाराष्ट्र शासन राजपत्र",
    "sampleLatin": "Kruti Dev 163",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Kruti Dev 163 Bold Italic.ttf"
  },
  {
    "id": "Lohit Devanagari",
    "name": "Lohit Devanagari (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Lohit Devanagari",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Lohit Devanagari Regular.ttf"
  },
  {
    "id": "Lohit Kashmiri",
    "name": "Lohit Kashmiri (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Lohit Kashmiri",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Lohit Kashmiri Regular.ttf"
  },
  {
    "id": "Lohit Konkani",
    "name": "Lohit Konkani (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Lohit Konkani",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Lohit Konkani Regular.ttf"
  },
  {
    "id": "Lohit Maithili",
    "name": "Lohit Maithili (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Lohit Maithili",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Lohit Maithili Regular.ttf"
  },
  {
    "id": "Lohit Marathi",
    "name": "Lohit Marathi (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Lohit Marathi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Lohit Marathi Regular.ttf"
  },
  {
    "id": "Lohit Nepali",
    "name": "Lohit Nepali (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Lohit Nepali",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Lohit Nepali Regular.ttf"
  },
  {
    "id": "Lohit Sindhi",
    "name": "Lohit Sindhi (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Lohit Sindhi",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Lohit Sindhi Regular.ttf"
  },
  {
    "id": "Marathi Sharada",
    "name": "Marathi Sharada (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "Marathi Sharada",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Marathi Sharada Normal.ttf"
  },
  {
    "id": "Marathi-Kanak",
    "name": "Marathi-Kanak (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "Marathi-Kanak",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Marathi-Kanak Normal.ttf"
  },
  {
    "id": "Marathi-Lekhani",
    "name": "Marathi Lekhani (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "Marathi-Lekhani",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Marathi-Lekhani Normal.ttf"
  },
  {
    "id": "Marathi-Saras",
    "name": "Marathi-Saras (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "Marathi-Saras",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Marathi-Saras Normal.ttf"
  },
  {
    "id": "Nakula",
    "name": "Nakula (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Nakula",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Nakula Regular.ttf"
  },
  {
    "id": "Sahadeva",
    "name": "Sahadeva (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Sahadeva",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Sahadeva Regular.ttf"
  },
  {
    "id": "Samanata",
    "name": "Samanata (Classic Suite)",
    "script": "devanagari",
    "category": "professional",
    "subCategory": "classic-suite",
    "badge": "Classic Suite",
    "sampleDevanagari": "मराठी साहित्य व संस्कृती",
    "sampleLatin": "Samanata",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Samanata Regular.ttf"
  },
  {
    "id": "Samyak Devanagari",
    "name": "Samyak Devanagari (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Samyak Devanagari",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Samyak Devanagari Regular.ttf"
  },
  {
    "id": "Sarai",
    "name": "Sarai (Vedic Unicode)",
    "script": "devanagari",
    "category": "marathi-standard",
    "subCategory": "vedic-unicode",
    "badge": "Vedic Unicode",
    "sampleDevanagari": "सत्यमेव जयते नानृतम्",
    "sampleLatin": "Sarai",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": true,
    "file": "Sarai Regular.ttf"
  },
  {
    "id": "Shivaji02",
    "name": "Shivaji02 (Shivaji)",
    "script": "devanagari",
    "category": "legacy",
    "subCategory": "shivaji",
    "badge": "Shivaji",
    "sampleDevanagari": "महाराष्ट्र शासन राजपत्र",
    "sampleLatin": "Shivaji02",
    "weights": [
      400
    ],
    "fallback": "sans-serif",
    "isUnicode": false,
    "file": "Shivaji02 Normal.ttf"
  }
];

export const FONT_CATEGORIES = [
  { id: 'all', label: 'All Fonts' },
  { id: 'popular', label: 'Popular' },
  { id: 'calligraphy', label: 'AMS & Calligraphy' },
  { id: 'decorative', label: 'Millennium & Decorative' },
  { id: 'legacy', label: 'Legacy (Kruti/Shivaji/Shree)' },
  { id: 'professional', label: 'Classic Suites (Pankaj/Varsha/Vimal)' },
  { id: 'marathi-standard', label: 'Marathi Standard' },
  { id: 'serif', label: 'Serif' },
  { id: 'sans-serif', label: 'Sans Serif' },
  { id: 'handwritten', label: 'Handwritten' }
] as const;

export const getFontById = (id: string): FontDefinition | undefined => {
  return FONT_LIBRARY.find((f) => f.id.toLowerCase() === id.toLowerCase());
};

export const getFontDefinition = getFontById;

const FAVORITES_STORAGE_KEY = 'canva_favorite_fonts_v2';
const RECENTS_STORAGE_KEY = 'canva_recent_fonts_v2';

export const getFavoriteFonts = (): string[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : ['AMS Aaditya', 'Mukta', 'Baloo 2', 'Tillana', 'MillenniumGanesh', 'Kruti Dev 010', 'Varsha', 'Pankaj'];
  } catch {
    return ['AMS Aaditya', 'Mukta', 'Baloo 2', 'Tillana', 'MillenniumGanesh', 'Kruti Dev 010', 'Varsha', 'Pankaj'];
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
    return raw ? JSON.parse(raw) : ['AMS Aaditya', 'Mukta', 'Baloo 2', 'MillenniumGanesh'];
  } catch {
    return ['AMS Aaditya', 'Mukta', 'Baloo 2', 'MillenniumGanesh'];
  }
};

export const addRecentFont = (fontId: string): void => {
  const recents = getRecentFonts().filter((id) => id !== fontId);
  const next = [fontId, ...recents].slice(0, 10);
  try {
    localStorage.setItem(RECENTS_STORAGE_KEY, JSON.stringify(next));
  } catch {}
};
