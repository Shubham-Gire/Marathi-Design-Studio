// Marathi Calligraphy & Vector Stencils Library (Front-End & API Client)

export interface CalligraphyStencil {
  id: string;
  title: string;
  englishTitle: string;
  category: 'rajmudra' | 'sacred' | 'greetings' | 'festivals' | 'borders_frames';
  tags: string[];
  description: string;
  width: number;
  height: number;
  svg: string;
}

export interface StencilTheme {
  id: string;
  name: string;
  gradient: {
    from: string;
    mid?: string;
    to: string;
  };
  stroke: string;
  glow: string;
}

export const STENCIL_THEMES: StencilTheme[] = [
  {
    id: 'gold-foil',
    name: 'Royal Gold Foil',
    gradient: { from: '#FFE57F', mid: '#FFB300', to: '#B27B00' },
    stroke: '#FFD54F',
    glow: 'rgba(255, 179, 0, 0.45)'
  },
  {
    id: 'bhagwa-maratha',
    name: 'Bhagwa Maratha Saffron',
    gradient: { from: '#FF8A00', mid: '#FF5722', to: '#D84315' },
    stroke: '#FFA726',
    glow: 'rgba(255, 87, 34, 0.45)'
  },
  {
    id: 'royal-purple',
    name: 'Royal Velvet Purple',
    gradient: { from: '#CE93D8', mid: '#8E24AA', to: '#4A148C' },
    stroke: '#BA68C8',
    glow: 'rgba(142, 36, 170, 0.45)'
  },
  {
    id: 'neon-cyan',
    name: 'Electric Neon Cyan',
    gradient: { from: '#80DEEA', mid: '#00ACC1', to: '#006064' },
    stroke: '#26C6DA',
    glow: 'rgba(0, 172, 193, 0.45)'
  },
  {
    id: 'heritage-ink',
    name: 'Heritage Traditional Ink',
    gradient: { from: '#424242', mid: '#212121', to: '#000000' },
    stroke: '#616161',
    glow: 'rgba(0, 0, 0, 0.3)'
  }
];

export const CLIENT_STENCILS: CalligraphyStencil[] = [
  // 1. RAJMUDRA & SHIVRAY
  {
    id: 'shiva-rajmudra-seal',
    title: 'छत्रपती शिवाजी महाराज राजमुद्रा',
    englishTitle: 'Chhatrapati Shivaji Maharaj Rajmudra (Official Seal)',
    category: 'rajmudra',
    tags: ['shivaji', 'rajmudra', 'maratha', 'chhatrapati', 'seal', 'heritage'],
    description: 'Authentic 8-sided Sanskrit Rajmudra: प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता...',
    width: 600,
    height: 600,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="rajmudraGrad_client" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE57F" />
      <stop offset="50%" stop-color="#FFB300" />
      <stop offset="100%" stop-color="#B27B00" />
    </linearGradient>
  </defs>
  <polygon points="300,30 491,109 570,300 491,491 300,570 109,491 30,300 109,109" 
    fill="none" stroke="url(#rajmudraGrad_client)" stroke-width="10"/>
  <polygon points="300,50 477,123 550,300 477,477 300,550 123,477 50,300 123,123" 
    fill="none" stroke="url(#rajmudraGrad_client)" stroke-width="3" stroke-dasharray="6,4"/>
  <circle cx="300" cy="40" r="6" fill="#FFD54F"/>
  <circle cx="560" cy="300" r="6" fill="#FFD54F"/>
  <circle cx="300" cy="560" r="6" fill="#FFD54F"/>
  <circle cx="40" cy="300" r="6" fill="#FFD54F"/>
  <text x="300" y="160" text-anchor="middle" fill="url(#rajmudraGrad_client)" font-family="'Yashoda', 'Shivaji01', 'AMS Aaditya', serif" font-size="34" font-weight="900" letter-spacing="3">॥ प्रतिपच्चंद्रलेखेव ॥</text>
  <text x="300" y="230" text-anchor="middle" fill="url(#rajmudraGrad_client)" font-family="'Yashoda', 'Shivaji01', 'AMS Aaditya', serif" font-size="32" font-weight="900" letter-spacing="2">वर्धिष्णुर्विश्ववंदिता</text>
  <text x="300" y="305" text-anchor="middle" fill="url(#rajmudraGrad_client)" font-family="'Yashoda', 'Shivaji01', 'AMS Aaditya', serif" font-size="34" font-weight="900" letter-spacing="2">शाहसूनोः शिवस्यैषा</text>
  <text x="300" y="380" text-anchor="middle" fill="url(#rajmudraGrad_client)" font-family="'Yashoda', 'Shivaji01', 'AMS Aaditya', serif" font-size="34" font-weight="900" letter-spacing="2">मुद्रा भद्राय राजते</text>
  <path d="M 270 420 Q 300 400 330 420 Q 300 440 270 420 Z" fill="url(#rajmudraGrad_client)" />
  <circle cx="300" cy="420" r="4" fill="#FFFFFF"/>
</svg>`
  },
  {
    id: 'jai-bhavani-jai-shivaji',
    title: 'जय भवानी जय शिवाजी',
    englishTitle: 'Jai Bhavani Jai Shivaji Banner',
    category: 'rajmudra',
    tags: ['jai bhavani', 'jai shivaji', 'calligraphy', 'saffron', 'banner'],
    description: 'Iconic Maratha banner with curved calligraphy and saffron sword motif',
    width: 800,
    height: 320,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
  <defs>
    <linearGradient id="jbjsGrad_client" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF8A00" />
      <stop offset="50%" stop-color="#FF5722" />
      <stop offset="100%" stop-color="#D84315" />
    </linearGradient>
  </defs>
  <path d="M 120 70 Q 400 20 680 70 Q 400 50 120 70 Z" fill="url(#jbjsGrad_client)" />
  <text x="400" y="165" text-anchor="middle" fill="url(#jbjsGrad_client)" font-family="'AMS Aaditya', 'Shivaji02', serif" font-size="78" font-weight="900" letter-spacing="4">जय भवानी जय शिवाजी</text>
  <path d="M 220 230 L 580 230 M 400 215 L 400 245 M 390 230 L 350 250 M 410 230 L 450 250" stroke="url(#jbjsGrad_client)" stroke-width="4" stroke-linecap="round" fill="none" />
  <circle cx="400" cy="230" r="7" fill="#FFA726" />
</svg>`
  },
  {
    id: 'sahyadricha-sinha',
    title: 'सह्याद्रीचा सिंह - शिवछत्रपती',
    englishTitle: 'Sahyadricha Sinha Calligraphy Badge',
    category: 'rajmudra',
    tags: ['sahyadri', 'sinha', 'lion', 'shivray', 'calligraphy'],
    description: 'Calligraphy emblem honoring the Lion of Sahyadri',
    width: 700,
    height: 300,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 300" width="700" height="300">
  <defs>
    <linearGradient id="sahyadriGrad_client" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF8A00" />
      <stop offset="100%" stop-color="#D84315" />
    </linearGradient>
  </defs>
  <rect x="30" y="30" width="640" height="240" rx="30" fill="none" stroke="url(#sahyadriGrad_client)" stroke-width="4" stroke-dasharray="12,8" />
  <text x="350" y="125" text-anchor="middle" fill="url(#sahyadriGrad_client)" font-family="'AMS Calligraphy 1', 'Shivaji01', sans-serif" font-size="62" font-weight="900">॥ सह्याद्रीचा सिंह ॥</text>
  <text x="350" y="200" text-anchor="middle" fill="#FFA726" font-family="'AMS Aaditya', serif" font-size="44" font-weight="800" letter-spacing="6">राजे शिवछत्रपती</text>
</svg>`
  },

  // 2. SACRED & AUSPICIOUS
  {
    id: 'shree-ganeshaya-namah',
    title: '॥ श्री गणेशाय नमः ॥',
    englishTitle: 'Shree Ganeshaya Namah Sacred Heading',
    category: 'sacred',
    tags: ['ganesh', 'ganpati', 'shree ganeshaya namah', 'sacred', 'wedding', 'invitation'],
    description: 'Sacred Ganesha Devanagari calligraphy with modak and tilak elements',
    width: 750,
    height: 250,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 250" width="750" height="250">
  <defs>
    <linearGradient id="ganeshGrad_client" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFE57F" />
      <stop offset="50%" stop-color="#FFB300" />
      <stop offset="100%" stop-color="#B27B00" />
    </linearGradient>
  </defs>
  <path d="M 375 25 Q 365 45 375 60 Q 385 45 375 25 Z" fill="#FFD54F" />
  <circle cx="375" cy="18" r="4" fill="#FFD54F" />
  <text x="375" y="145" text-anchor="middle" fill="url(#ganeshGrad_client)" font-family="'AMS Aaditya', 'Shivaji01', serif" font-size="70" font-weight="900" letter-spacing="4">॥ श्री गणेशाय नमः ॥</text>
  <path d="M 180 185 Q 375 220 570 185 Q 375 200 180 185 Z" fill="url(#ganeshGrad_client)" />
  <circle cx="375" cy="195" r="5" fill="#FFFFFF" />
</svg>`
  },
  {
    id: 'shree-swami-samarth',
    title: '॥ श्री स्वामी समर्थ ॥',
    englishTitle: 'Shree Swami Samarth Divine Calligraphy',
    category: 'sacred',
    tags: ['swami samarth', 'akkalkot', 'sacred', 'devotional'],
    description: 'Devotional calligraphy emblem for Swami Samarth Maharaj',
    width: 700,
    height: 240,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 240" width="700" height="240">
  <defs>
    <linearGradient id="swamiGrad_client" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF8A00" />
      <stop offset="100%" stop-color="#D84315" />
    </linearGradient>
  </defs>
  <circle cx="350" cy="120" r="95" fill="none" stroke="rgba(255, 87, 34, 0.4)" stroke-width="2" stroke-dasharray="4,4" />
  <text x="350" y="135" text-anchor="middle" fill="url(#swamiGrad_client)" font-family="'AMS Calligraphy 1', 'Shivaji01', serif" font-size="64" font-weight="900" letter-spacing="3">॥ श्री स्वामी समर्थ ॥</text>
  <path d="M 220 180 L 480 180" stroke="url(#swamiGrad_client)" stroke-width="3" stroke-linecap="round" />
  <circle cx="350" cy="180" r="5" fill="#FFA726" />
</svg>`
  },

  // 3. GREETINGS & CELEBRATIONS
  {
    id: 'hardik-shubhechha',
    title: 'हार्दिक शुभेच्छा',
    englishTitle: 'Hardik Shubhechha Festive Calligraphy Banner',
    category: 'greetings',
    tags: ['hardik shubhechha', 'shubhechha', 'greetings', 'celebration', 'banner'],
    description: 'Bold festive congratulations and warm greetings calligraphy with gold gradient',
    width: 800,
    height: 280,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 280" width="800" height="280">
  <defs>
    <linearGradient id="hsGrad_client" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFE57F" />
      <stop offset="50%" stop-color="#FFB300" />
      <stop offset="100%" stop-color="#B27B00" />
    </linearGradient>
  </defs>
  <path d="M 80 140 C 200 80 600 80 720 140 C 600 200 200 200 80 140 Z" fill="rgba(255, 179, 0, 0.15)" />
  <text x="400" y="155" text-anchor="middle" fill="url(#hsGrad_client)" font-family="'AMS Calligraphy 2', 'Shivaji05', serif" font-size="92" font-weight="900" letter-spacing="4">हार्दिक शुभेच्छा</text>
  <path d="M 200 210 Q 400 240 600 210 Q 400 225 200 210 Z" fill="url(#hsGrad_client)" />
  <circle cx="400" cy="225" r="6" fill="#FFD54F" />
</svg>`
  },
  {
    id: 'vadhdivsachya-shubhechha',
    title: 'वाढदिवसाच्या हार्दिक शुभेच्छा',
    englishTitle: 'Happy Birthday Marathi Calligraphy',
    category: 'greetings',
    tags: ['birthday', 'vadhdivas', 'shubhechha', 'cake', 'party'],
    description: 'Two-line royal birthday calligraphy badge with stars and ribbon',
    width: 750,
    height: 320,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 320" width="750" height="320">
  <defs>
    <linearGradient id="bdayGrad_client" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#CE93D8" />
      <stop offset="100%" stop-color="#4A148C" />
    </linearGradient>
  </defs>
  <text x="375" y="110" text-anchor="middle" fill="#BA68C8" font-family="'AMS Aaditya', sans-serif" font-size="42" font-weight="700" letter-spacing="6">वाढदिवसाच्या</text>
  <text x="375" y="200" text-anchor="middle" fill="url(#bdayGrad_client)" font-family="'AMS Calligraphy 1', 'Shivaji01', serif" font-size="76" font-weight="900" letter-spacing="4">हार्दिक शुभेच्छा</text>
  <path d="M 220 250 Q 375 280 530 250" stroke="url(#bdayGrad_client)" stroke-width="3" stroke-linecap="round" fill="none" />
</svg>`
  },
  {
    id: 'shubh-vivah',
    title: 'शुभ विवाह',
    englishTitle: 'Shubh Vivah Wedding Calligraphy Header',
    category: 'greetings',
    tags: ['shubh vivah', 'wedding', 'marriage', 'lagna', 'shehnai', 'invitation'],
    description: 'Classic auspicious Marathi wedding invitation calligraphy with kalash and floral vines',
    width: 700,
    height: 280,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 280" width="700" height="280">
  <defs>
    <linearGradient id="vivahGrad_client" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFE57F" />
      <stop offset="50%" stop-color="#FFB300" />
      <stop offset="100%" stop-color="#B27B00" />
    </linearGradient>
  </defs>
  <path d="M 120 140 Q 350 90 580 140 Q 350 120 120 140 Z" fill="rgba(255, 179, 0, 0.2)" />
  <text x="350" y="160" text-anchor="middle" fill="url(#vivahGrad_client)" font-family="'AMS Calligraphy 3', 'Shivaji02', serif" font-size="88" font-weight="900" letter-spacing="8">॥ शुभ विवाह ॥</text>
  <path d="M 200 220 Q 350 250 500 220" stroke="url(#vivahGrad_client)" stroke-width="4" stroke-linecap="round" fill="none" />
  <circle cx="350" cy="235" r="6" fill="#FFD54F" />
</svg>`
  },

  // 4. FESTIVALS & UTSAV
  {
    id: 'ganeshotsav-shubhechha',
    title: 'गणेशोत्सव हार्दिक शुभेच्छा',
    englishTitle: 'Ganeshotsav Celebration Calligraphy',
    category: 'festivals',
    tags: ['ganeshotsav', 'ganpati bappa', 'morya', 'festival', 'bappa'],
    description: 'Grand festive calligraphy for Ganesh Chaturthi and Ganeshotsav posters',
    width: 800,
    height: 300,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="800" height="300">
  <defs>
    <linearGradient id="ganeshotsavGrad_client" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF8A00" />
      <stop offset="100%" stop-color="#D84315" />
    </linearGradient>
  </defs>
  <text x="400" y="105" text-anchor="middle" fill="#FFA726" font-family="'AMS Aaditya', sans-serif" font-size="48" font-weight="800" letter-spacing="8">॥ बाप्पा मोरया ॥</text>
  <text x="400" y="200" text-anchor="middle" fill="url(#ganeshotsavGrad_client)" font-family="'AMS Calligraphy 1', 'Shivaji01', serif" font-size="76" font-weight="900" letter-spacing="4">गणेशोत्सवाच्या हार्दिक शुभेच्छा</text>
  <path d="M 180 245 L 620 245" stroke="url(#ganeshotsavGrad_client)" stroke-width="3" stroke-linecap="round" />
  <circle cx="400" cy="245" r="6" fill="#FFA726" />
</svg>`
  },
  {
    id: 'shivjayanti-utsav',
    title: 'शिवजयंती महोत्सव',
    englishTitle: 'Shivjayanti Celebration Header',
    category: 'festivals',
    tags: ['shivjayanti', 'chhatrapati', 'maharaj', 'utsav', 'february 19'],
    description: 'Chhatrapati Shivaji Maharaj Jayanti grand celebration typography',
    width: 800,
    height: 320,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
  <defs>
    <linearGradient id="sjGrad_client" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FF8A00" />
      <stop offset="100%" stop-color="#D84315" />
    </linearGradient>
  </defs>
  <text x="400" y="90" text-anchor="middle" fill="#FFA726" font-family="'AMS Aaditya', sans-serif" font-size="36" font-weight="800" letter-spacing="10">अखंड हिंदुस्थानचे आराध्य दैवत</text>
  <text x="400" y="185" text-anchor="middle" fill="url(#sjGrad_client)" font-family="'AMS Calligraphy 2', 'Shivaji01', serif" font-size="82" font-weight="900" letter-spacing="4">शिवजयंती महोत्सव</text>
  <text x="400" y="255" text-anchor="middle" fill="#FFA726" font-family="'AMS Aaditya', sans-serif" font-size="34" font-weight="700" letter-spacing="6">निमित्त मनःपूर्वक शुभेच्छा</text>
</svg>`
  },

  // 5. BORDERS & FRAMES
  {
    id: 'maratha-royal-frame',
    title: 'राजेशाही बॉर्डर व कॉर्नर',
    englishTitle: 'Maratha Royal Palace Corner & Border Frame',
    category: 'borders_frames',
    tags: ['border', 'frame', 'royal', 'corner', 'flourish'],
    description: 'Architectural Maratha palace arch and ornamental filigree corner frame',
    width: 800,
    height: 600,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="frameGrad_client" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE57F" />
      <stop offset="100%" stop-color="#B27B00" />
    </linearGradient>
  </defs>
  <rect x="30" y="30" width="740" height="540" rx="20" fill="none" stroke="url(#frameGrad_client)" stroke-width="4" />
  <rect x="44" y="44" width="712" height="512" rx="14" fill="none" stroke="url(#frameGrad_client)" stroke-width="1.5" stroke-dasharray="6,4" />
  <path d="M 30 110 Q 70 70 110 30" fill="none" stroke="url(#frameGrad_client)" stroke-width="4" />
  <circle cx="70" cy="70" r="5" fill="#FFD54F" />
  <path d="M 770 110 Q 730 70 690 30" fill="none" stroke="url(#frameGrad_client)" stroke-width="4" />
  <circle cx="730" cy="70" r="5" fill="#FFD54F" />
  <path d="M 30 490 Q 70 530 110 570" fill="none" stroke="url(#frameGrad_client)" stroke-width="4" />
  <circle cx="70" cy="530" r="5" fill="#FFD54F" />
  <path d="M 770 490 Q 730 530 690 570" fill="none" stroke="url(#frameGrad_client)" stroke-width="4" />
  <circle cx="730" cy="530" r="5" fill="#FFD54F" />
  <path d="M 320 30 Q 400 70 480 30 Z" fill="url(#frameGrad_client)" />
  <circle cx="400" cy="50" r="4" fill="#FFFFFF" />
</svg>`
  },
  {
    id: 'mandala-invitation-medallion',
    title: 'मंगल मंडला रांगोळी',
    englishTitle: 'Mandala Rangoli Auspicious Medallion',
    category: 'borders_frames',
    tags: ['mandala', 'rangoli', 'medallion', 'sacred', 'wedding'],
    description: 'High-res symmetrical geometric medallion for wedding cards and festival flyers',
    width: 600,
    height: 600,
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="mandalaGrad_client" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFE57F" />
      <stop offset="100%" stop-color="#B27B00" />
    </linearGradient>
  </defs>
  <g transform="translate(300, 300)" stroke="url(#mandalaGrad_client)" fill="none" stroke-width="2">
    <circle r="260" stroke-width="3" />
    <circle r="240" stroke-dasharray="8,6" />
    <circle r="180" />
    <circle r="120" stroke-width="2.5" />
    <circle r="60" fill="rgba(255, 179, 0, 0.2)" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" fill="url(#mandalaGrad_client)" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(45)" fill="url(#mandalaGrad_client)" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(90)" fill="url(#mandalaGrad_client)" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(135)" fill="url(#mandalaGrad_client)" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(180)" fill="url(#mandalaGrad_client)" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(225)" fill="url(#mandalaGrad_client)" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(270)" fill="url(#mandalaGrad_client)" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(315)" fill="url(#mandalaGrad_client)" opacity="0.35" />
    <circle r="12" fill="#FFD54F" />
  </g>
</svg>`
  }
];

// Client-side phonetic transliteration dictionary
const PHONETIC_DICT: Record<string, string> = {
  'shubhechha': 'शुभेच्छा',
  'hardik shubhechha': 'हार्दिक शुभेच्छा',
  'abhinandan': 'अभिनंदन',
  'manahpurvak abhinandan': 'मनःपूर्वक अभिनंदन',
  'namaskar': 'नमस्कार',
  'shree': 'श्री',
  'ganesh': 'गणेश',
  'shree ganeshaya namah': '॥ श्री गणेशाय नमः ॥',
  'om namah shivay': '॥ ॐ नमः शिवाय ॥',
  'om namah shivaya': '॥ ॐ नमः शिवाय ॥',
  'har har mahadev': '॥ हर हर महादेव ॥',
  'jai shree ram': '॥ जय श्रीराम ॥',
  'jai shivaji': 'जय शिवाजी',
  'jai bhavani jai shivaji': 'जय भवानी जय शिवाजी',
  'chhatrapati shivaji maharaj': 'छत्रपती शिवाजी महाराज',
  'shivaji maharaj': 'छत्रपती शिवाजी महाराज',
  'shivaji': 'शिवाजी महाराज',
  'maharashtra': 'महाराष्ट्र',
  'swami samarth': 'श्री स्वामी समर्थ',
  'shree swami samarth': '॥ श्री स्वामी समर्थ ॥',
  'aai': 'आई',
  'vadil': 'वडील',
  'saheb': 'साहेब',
  'shubh vivah': 'शुभ विवाह',
  'vadhdivas': 'वाढदिवस',
  'vadhdivasachya hardik shubhechha': 'वाढदिवसाच्या हार्दिक शुभेच्छा',
  'ganeshotsav': 'गणेशोत्सव',
  'ganpati bappa morya': 'गणपती बाप्पा मोरया',
  'gudi padwa': 'गुढीपाडवा',
  'shivjayanti': 'शिवजयंती',
  'diwali': 'दिवाळी'
};

export function clientTransliterate(input: string): string {
  if (!input) return '';
  const lower = input.trim().toLowerCase();
  if (PHONETIC_DICT[lower]) return PHONETIC_DICT[lower];

  const words = input.split(/\s+/);
  if (words.length > 1) {
    return words.map(w => PHONETIC_DICT[w.toLowerCase()] || w).join(' ');
  }
  return input;
}
