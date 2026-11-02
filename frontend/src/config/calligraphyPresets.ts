export interface CalligraphyItem {
  id: string;
  category: 'festival' | 'wedding' | 'birthday' | 'business' | 'honorific';
  titleMr: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight?: string;
  fill: string;
  stroke?: string;
  strokeWidth?: number;
  shadow?: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
  badge: string;
}

export const CALLIGRAPHY_PRESETS: CalligraphyItem[] = [
  // --- 1. FESTIVALS & SPIRITUAL ---
  {
    id: 'cal-ganesh-1',
    category: 'festival',
    titleMr: 'Shree Ganeshaya Namah',
    text: '॥ श्री गणेशाय नमः ॥',
    fontFamily: 'AMS Aaditya',
    fontSize: 54,
    fill: '#ea580c',
    shadow: { color: 'rgba(234, 88, 12, 0.35)', blur: 8, offsetX: 3, offsetY: 3 },
    badge: 'Ganesh Festival'
  },
  {
    id: 'cal-ganpati-bappa',
    category: 'festival',
    titleMr: 'Ganpati Bappa Morya',
    text: 'गणपती बाप्पा मोरया! मंगलमूर्ती मोरया!',
    fontFamily: 'AMS Lekhani',
    fontSize: 50,
    fill: '#c2410c',
    shadow: { color: 'rgba(0,0,0,0.2)', blur: 6, offsetX: 2, offsetY: 2 },
    badge: 'Festive'
  },
  {
    id: 'cal-shivaji-1',
    category: 'festival',
    titleMr: 'Jai Bhavani Jai Shivaji',
    text: '॥ जय भवानी जय शिवाजी ॥',
    fontFamily: 'Tillana Calligraphy',
    fontSize: 52,
    fill: '#b91c1c',
    shadow: { color: 'rgba(185, 28, 28, 0.4)', blur: 10, offsetX: 2, offsetY: 3 },
    badge: 'Shiv Jayanti'
  },
  {
    id: 'cal-diwali',
    category: 'festival',
    titleMr: 'Happy Diwali & New Year',
    text: 'शुभ दीपावली व बलिप्रतिपदा!',
    fontFamily: 'Rozha One',
    fontSize: 48,
    fill: '#f59e0b',
    shadow: { color: 'rgba(245, 158, 11, 0.5)', blur: 12, offsetX: 0, offsetY: 2 },
    badge: 'Diwali'
  },
  {
    id: 'cal-gudipadwa',
    category: 'festival',
    titleMr: 'Gudi Padwa Greetings',
    text: 'गुढीपाडव्याच्या व हिंदू नववर्षाच्या हार्दिक शुभेच्छा!',
    fontFamily: 'AMS Aakash',
    fontSize: 44,
    fill: '#ea580c',
    badge: 'New Year'
  },
  {
    id: 'cal-swami-samarth',
    category: 'festival',
    titleMr: 'Shree Swami Samarth',
    text: '॥ श्री स्वामी समर्थ ॥',
    fontFamily: 'AMS Manthan',
    fontSize: 52,
    fill: '#d97706',
    shadow: { color: 'rgba(217, 119, 6, 0.35)', blur: 8, offsetX: 2, offsetY: 2 },
    badge: 'Spiritual'
  },

  // --- 2. WEDDINGS & INVITATIONS ---
  {
    id: 'cal-shubh-vivah',
    category: 'wedding',
    titleMr: 'Shubh Vivah (Wedding)',
    text: '॥ शुभ विवाह ॥',
    fontFamily: 'AMS Lekhani',
    fontSize: 68,
    fill: '#991b1b',
    shadow: { color: 'rgba(153, 27, 27, 0.35)', blur: 8, offsetX: 3, offsetY: 3 },
    badge: 'Wedding'
  },
  {
    id: 'cal-save-the-date',
    category: 'wedding',
    titleMr: 'Save The Date (English)',
    text: 'SAVE THE DATE',
    fontFamily: 'Playfair Display',
    fontSize: 56,
    fill: '#991b1b',
    shadow: { color: 'rgba(153, 27, 27, 0.3)', blur: 6, offsetX: 2, offsetY: 2 },
    badge: 'English Wedding'
  },
  {
    id: 'cal-suswagatam',
    category: 'wedding',
    titleMr: 'Suswagatam (Welcome)',
    text: '॥ सुस्वागतम ॥',
    fontFamily: 'Tillana Calligraphy',
    fontSize: 62,
    fill: '#b45309',
    shadow: { color: 'rgba(180, 83, 9, 0.3)', blur: 6, offsetX: 2, offsetY: 2 },
    badge: 'Welcome'
  },
  {
    id: 'cal-sakharpuda',
    category: 'wedding',
    titleMr: 'Engagement Ceremony',
    text: 'शुभ साखरपुडा सोहळा',
    fontFamily: 'AMS Shree Lipi',
    fontSize: 50,
    fill: '#be123c',
    badge: 'Engagement'
  },
  {
    id: 'cal-cordial-invitation',
    category: 'wedding',
    titleMr: 'Cordially Invited (Bilingual)',
    text: 'Cordially Invited\n॥ सप्रेम निमंत्रण ॥',
    fontFamily: 'Playfair Display',
    fontSize: 42,
    fill: '#1e293b',
    badge: 'Bilingual'
  },

  // --- 3. BIRTHDAYS & FELICITATIONS ---
  {
    id: 'cal-bday-1',
    category: 'birthday',
    titleMr: 'Happy Birthday Greetings',
    text: 'वाढदिवसाच्या मनःपूर्वक हार्दिक शुभेच्छा!',
    fontFamily: 'AMS Aaditya',
    fontSize: 52,
    fill: '#1e40af',
    shadow: { color: 'rgba(30, 64, 175, 0.35)', blur: 10, offsetX: 2, offsetY: 3 },
    badge: 'Birthday'
  },
  {
    id: 'cal-happy-bday-en',
    category: 'birthday',
    titleMr: 'Happy Birthday (English)',
    text: 'HAPPY BIRTHDAY!',
    fontFamily: 'Bebas Neue',
    fontSize: 64,
    fill: '#ea580c',
    shadow: { color: 'rgba(234, 88, 12, 0.4)', blur: 8, offsetX: 2, offsetY: 3 },
    badge: 'English'
  },
  {
    id: 'cal-bday-2',
    category: 'birthday',
    titleMr: 'Long Life Wishes',
    text: 'आपणांस उदंड आणि निरोगी दीर्घायुष्याच्या अनंत सदिच्छा!',
    fontFamily: 'Tillana Calligraphy',
    fontSize: 42,
    fill: '#047857',
    badge: 'Wishes'
  },

  // --- 4. BUSINESS & ADVERTISING ---
  {
    id: 'cal-grand-opening',
    category: 'business',
    titleMr: 'Grand Opening (Bilingual)',
    text: 'GRAND OPENING\n॥ भव्य शुभ उद्घाटन सोहळा ॥',
    fontFamily: 'Bebas Neue',
    fontSize: 52,
    fill: '#dc2626',
    shadow: { color: 'rgba(220, 38, 38, 0.4)', blur: 8, offsetX: 2, offsetY: 2 },
    badge: 'Bilingual'
  },
  {
    id: 'cal-dhamaka-offer',
    category: 'business',
    titleMr: 'Mega Sale 50% Off',
    text: '💥 MEGA SALE! 50% OFF 💥\nथेट ५०% महाबचत सूट',
    fontFamily: 'Baloo 2',
    fontSize: 44,
    fill: '#ea580c',
    badge: 'Offer'
  },
  {
    id: 'cal-buy-get',
    category: 'business',
    titleMr: 'Buy 1 Get 1 Free',
    text: 'BUY 1 GET 1 FREE!\nएकावर एक मोफत ऑफर',
    fontFamily: 'Sarpanch',
    fontSize: 42,
    fill: '#047857',
    badge: 'Promo'
  },

  // --- 5. GREETINGS & HONORIFICS ---
  {
    id: 'cal-vinamra-abhivadan',
    category: 'honorific',
    titleMr: 'Respectful Greetings',
    text: 'कोटि कोटि विनम्र अभिवादन!',
    fontFamily: 'AMS Aaditya',
    fontSize: 50,
    fill: '#0f172a',
    shadow: { color: 'rgba(0,0,0,0.2)', blur: 6, offsetX: 2, offsetY: 2 },
    badge: 'Tribute'
  },
  {
    id: 'cal-aabhar',
    category: 'honorific',
    titleMr: 'Heartfelt Gratitude',
    text: 'Thank You! मनःपूर्वक धन्यवाद!',
    fontFamily: 'Kalam Handwritten',
    fontSize: 42,
    fill: '#1e3a8a',
    badge: 'Thank You'
  },
  {
    id: 'cal-jai-maharashtra',
    category: 'honorific',
    titleMr: 'Jai Maharashtra',
    text: '॥ जय महाराष्ट्र ॥',
    fontFamily: 'Yatra One',
    fontSize: 60,
    fill: '#ea580c',
    shadow: { color: 'rgba(234, 88, 12, 0.4)', blur: 8, offsetX: 3, offsetY: 3 },
    badge: 'Pride'
  },
];
