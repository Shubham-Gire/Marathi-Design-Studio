// Authentic Marathi Calligraphy, Rajmudra, Sacred Symbols & Festive Vector Stencils

export const COLOR_THEMES = {
  'gold-foil': {
    id: 'gold-foil',
    name: 'Royal Gold Foil',
    gradient: {
      from: '#FFE57F',
      mid: '#FFB300',
      to: '#B27B00'
    },
    stroke: '#FFD54F',
    glow: 'rgba(255, 179, 0, 0.45)',
    filter: 'drop-shadow(0 4px 12px rgba(255, 179, 0, 0.35))'
  },
  'bhagwa-maratha': {
    id: 'bhagwa-maratha',
    name: 'Bhagwa Maratha Saffron',
    gradient: {
      from: '#FF8A00',
      mid: '#FF5722',
      to: '#D84315'
    },
    stroke: '#FFA726',
    glow: 'rgba(255, 87, 34, 0.45)',
    filter: 'drop-shadow(0 4px 12px rgba(255, 87, 34, 0.35))'
  },
  'royal-purple': {
    id: 'royal-purple',
    name: 'Royal Velvet Purple',
    gradient: {
      from: '#CE93D8',
      mid: '#8E24AA',
      to: '#4A148C'
    },
    stroke: '#BA68C8',
    glow: 'rgba(142, 36, 170, 0.45)',
    filter: 'drop-shadow(0 4px 12px rgba(142, 36, 170, 0.35))'
  },
  'neon-cyan': {
    id: 'neon-cyan',
    name: 'Electric Neon Cyan',
    gradient: {
      from: '#80DEEA',
      mid: '#00ACC1',
      to: '#006064'
    },
    stroke: '#26C6DA',
    glow: 'rgba(0, 172, 193, 0.45)',
    filter: 'drop-shadow(0 4px 12px rgba(0, 172, 193, 0.4))'
  },
  'heritage-ink': {
    id: 'heritage-ink',
    name: 'Heritage Traditional Ink',
    gradient: {
      from: '#424242',
      mid: '#212121',
      to: '#000000'
    },
    stroke: '#616161',
    glow: 'rgba(0, 0, 0, 0.3)',
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.25))'
  }
};

export const STENCIL_CATALOG = [
  // 1. RAJMUDRA & SHIVRAY HERITAGE
  {
    id: 'shiva-rajmudra-seal',
    title: 'छत्रपती शिवाजी महाराज राजमुद्रा',
    englishTitle: 'Chhatrapati Shivaji Maharaj Rajmudra (Official Seal)',
    category: 'rajmudra',
    tags: ['shivaji', 'rajmudra', 'maratha', 'chhatrapati', 'seal', 'heritage'],
    description: 'Authentic 8-sided Sanskrit Rajmudra: प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता...',
    width: 600,
    height: 600,
    renderSvg: (themeId = 'gold-foil') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['gold-foil'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="rajmudraGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="50%" stop-color="${theme.gradient.mid}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
    <filter id="rajmudraGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="${theme.glow}" flood-opacity="0.6"/>
    </filter>
  </defs>
  <!-- Outer Octagonal Ring -->
  <polygon points="300,30 491,109 570,300 491,491 300,570 109,491 30,300 109,109" 
    fill="none" stroke="url(#rajmudraGrad_${themeId})" stroke-width="10" filter="url(#rajmudraGlow)"/>
  <!-- Inner Octagonal Ring -->
  <polygon points="300,50 477,123 550,300 477,477 300,550 123,477 50,300 123,123" 
    fill="none" stroke="url(#rajmudraGrad_${themeId})" stroke-width="3" stroke-dasharray="6,4"/>
  <!-- Decorative Corner Sunbursts -->
  <circle cx="300" cy="40" r="6" fill="${theme.stroke}"/>
  <circle cx="560" cy="300" r="6" fill="${theme.stroke}"/>
  <circle cx="300" cy="560" r="6" fill="${theme.stroke}"/>
  <circle cx="40" cy="300" r="6" fill="${theme.stroke}"/>
  <!-- Rajmudra Inscription Lines -->
  <text x="300" y="160" text-anchor="middle" fill="url(#rajmudraGrad_${themeId})" font-family="'Yashoda', 'Shivaji01', 'AMS Aaditya', 'Rozha One', serif" font-size="34" font-weight="900" letter-spacing="3">॥ प्रतिपच्चंद्रलेखेव ॥</text>
  <text x="300" y="230" text-anchor="middle" fill="url(#rajmudraGrad_${themeId})" font-family="'Yashoda', 'Shivaji01', 'AMS Aaditya', 'Rozha One', serif" font-size="32" font-weight="900" letter-spacing="2">वर्धिष्णुर्विश्ववंदिता</text>
  <text x="300" y="305" text-anchor="middle" fill="url(#rajmudraGrad_${themeId})" font-family="'Yashoda', 'Shivaji01', 'AMS Aaditya', 'Rozha One', serif" font-size="34" font-weight="900" letter-spacing="2">शाहसूनोः शिवस्यैषा</text>
  <text x="300" y="380" text-anchor="middle" fill="url(#rajmudraGrad_${themeId})" font-family="'Yashoda', 'Shivaji01', 'AMS Aaditya', 'Rozha One', serif" font-size="34" font-weight="900" letter-spacing="2">मुद्रा भद्राय राजते</text>
  <!-- Auspicious Central Floral Seal -->
  <path d="M 270 420 Q 300 400 330 420 Q 300 440 270 420 Z" fill="url(#rajmudraGrad_${themeId})" />
  <circle cx="300" cy="420" r="4" fill="#FFFFFF"/>
</svg>`;
    }
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
    renderSvg: (themeId = 'bhagwa-maratha') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['bhagwa-maratha'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
  <defs>
    <linearGradient id="jbjsGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="50%" stop-color="${theme.gradient.mid}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <!-- Flourish Banner Background -->
  <path d="M 60 160 Q 400 130 740 160 Q 400 190 60 160 Z" fill="${theme.glow}" opacity="0.15" />
  <!-- Upper Calligraphy Accent -->
  <path d="M 120 70 Q 400 20 680 70 Q 400 50 120 70 Z" fill="url(#jbjsGrad_${themeId})" />
  <!-- Central Majestic Calligraphy -->
  <text x="400" y="165" text-anchor="middle" fill="url(#jbjsGrad_${themeId})" font-family="'AMS Aaditya', 'Shivaji02', 'Gotu', serif" font-size="78" font-weight="900" letter-spacing="4">जय भवानी जय शिवाजी</text>
  <!-- Lower Sword & Flourish Stencil -->
  <path d="M 220 230 L 580 230 M 400 215 L 400 245 M 390 230 L 350 250 M 410 230 L 450 250" stroke="url(#jbjsGrad_${themeId})" stroke-width="4" stroke-linecap="round" fill="none" />
  <circle cx="400" cy="230" r="7" fill="${theme.stroke}" />
</svg>`;
    }
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
    renderSvg: (themeId = 'bhagwa-maratha') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['bhagwa-maratha'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 300" width="700" height="300">
  <defs>
    <linearGradient id="sahyadriGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <rect x="30" y="30" width="640" height="240" rx="30" fill="none" stroke="url(#sahyadriGrad_${themeId})" stroke-width="4" stroke-dasharray="12,8" />
  <text x="350" y="125" text-anchor="middle" fill="url(#sahyadriGrad_${themeId})" font-family="'AMS Calligraphy 1', 'Shivaji01', sans-serif" font-size="62" font-weight="900">॥ सह्याद्रीचा सिंह ॥</text>
  <text x="350" y="200" text-anchor="middle" fill="${theme.stroke}" font-family="'AMS Aaditya', 'Gotu', serif" font-size="44" font-weight="800" letter-spacing="6">राजे शिवछत्रपती</text>
</svg>`;
    }
  },

  // 2. SACRED & AUSPICIOUS INVOCATIONS
  {
    id: 'shree-ganeshaya-namah',
    title: '॥ श्री गणेशाय नमः ॥',
    englishTitle: 'Shree Ganeshaya Namah Sacred Heading',
    category: 'sacred',
    tags: ['ganesh', 'ganpati', 'shree ganeshaya namah', 'sacred', 'wedding', 'invitation'],
    description: 'Sacred Ganesha Devanagari calligraphy with modak and tilak elements',
    width: 750,
    height: 250,
    renderSvg: (themeId = 'gold-foil') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['gold-foil'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 250" width="750" height="250">
  <defs>
    <linearGradient id="ganeshGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="50%" stop-color="${theme.gradient.mid}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <!-- Kalash / Tilak Top Icon -->
  <path d="M 375 25 Q 365 45 375 60 Q 385 45 375 25 Z" fill="${theme.stroke}" />
  <circle cx="375" cy="18" r="4" fill="${theme.stroke}" />
  <!-- Sacred Inscription -->
  <text x="375" y="145" text-anchor="middle" fill="url(#ganeshGrad_${themeId})" font-family="'AMS Aaditya', 'Shivaji01', 'Gotu', serif" font-size="70" font-weight="900" letter-spacing="4">॥ श्री गणेशाय नमः ॥</text>
  <!-- Lower Ornamental Flourish -->
  <path d="M 180 185 Q 375 220 570 185 Q 375 200 180 185 Z" fill="url(#ganeshGrad_${themeId})" />
  <circle cx="375" cy="195" r="5" fill="#FFFFFF" />
</svg>`;
    }
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
    renderSvg: (themeId = 'bhagwa-maratha') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['bhagwa-maratha'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 240" width="700" height="240">
  <defs>
    <linearGradient id="swamiGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <circle cx="350" cy="120" r="95" fill="none" stroke="${theme.glow}" stroke-width="2" stroke-dasharray="4,4" />
  <text x="350" y="135" text-anchor="middle" fill="url(#swamiGrad_${themeId})" font-family="'AMS Calligraphy 1', 'Shivaji01', serif" font-size="64" font-weight="900" letter-spacing="3">॥ श्री स्वामी समर्थ ॥</text>
  <path d="M 220 180 L 480 180" stroke="url(#swamiGrad_${themeId})" stroke-width="3" stroke-linecap="round" />
  <circle cx="350" cy="180" r="5" fill="${theme.stroke}" />
</svg>`;
    }
  },

  // 3. CELEBRATIONS & GREETINGS
  {
    id: 'hardik-shubhechha',
    title: 'हार्दिक शुभेच्छा',
    englishTitle: 'Hardik Shubhechha Festive Calligraphy Banner',
    category: 'greetings',
    tags: ['hardik shubhechha', 'shubhechha', 'greetings', 'celebration', 'banner'],
    description: 'Bold festive congratulations and warm greetings calligraphy with gold gradient',
    width: 800,
    height: 280,
    renderSvg: (themeId = 'gold-foil') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['gold-foil'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 280" width="800" height="280">
  <defs>
    <linearGradient id="hsGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="50%" stop-color="${theme.gradient.mid}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <!-- Background Banner Shape -->
  <path d="M 80 140 C 200 80 600 80 720 140 C 600 200 200 200 80 140 Z" fill="${theme.glow}" opacity="0.2" />
  <!-- Main Calligraphy Text -->
  <text x="400" y="155" text-anchor="middle" fill="url(#hsGrad_${themeId})" font-family="'AMS Calligraphy 2', 'Shivaji05', 'Yashoda', serif" font-size="92" font-weight="900" letter-spacing="4">हार्दिक शुभेच्छा</text>
  <!-- Bottom Ribbon Flourish -->
  <path d="M 200 210 Q 400 240 600 210 Q 400 225 200 210 Z" fill="url(#hsGrad_${themeId})" />
  <circle cx="400" cy="225" r="6" fill="${theme.stroke}" />
</svg>`;
    }
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
    renderSvg: (themeId = 'royal-purple') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['royal-purple'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 320" width="750" height="320">
  <defs>
    <linearGradient id="bdayGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <text x="375" y="110" text-anchor="middle" fill="${theme.stroke}" font-family="'AMS Aaditya', sans-serif" font-size="42" font-weight="700" letter-spacing="6">वाढदिवसाच्या</text>
  <text x="375" y="200" text-anchor="middle" fill="url(#bdayGrad_${themeId})" font-family="'AMS Calligraphy 1', 'Shivaji01', serif" font-size="76" font-weight="900" letter-spacing="4">हार्दिक शुभेच्छा</text>
  <!-- Stars -->
  <polygon points="180,80 185,95 200,95 188,105 192,120 180,110 168,120 172,105 160,95 175,95" fill="${theme.stroke}" />
  <polygon points="570,80 575,95 590,95 578,105 582,120 570,110 558,120 562,105 550,95 565,95" fill="${theme.stroke}" />
  <path d="M 220 250 Q 375 280 530 250" stroke="url(#bdayGrad_${themeId})" stroke-width="3" stroke-linecap="round" fill="none" />
</svg>`;
    }
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
    renderSvg: (themeId = 'gold-foil') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['gold-foil'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 280" width="700" height="280">
  <defs>
    <linearGradient id="vivahGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="50%" stop-color="${theme.gradient.mid}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <path d="M 120 140 Q 350 90 580 140 Q 350 120 120 140 Z" fill="${theme.glow}" opacity="0.25" />
  <text x="350" y="160" text-anchor="middle" fill="url(#vivahGrad_${themeId})" font-family="'AMS Calligraphy 3', 'Shivaji02', serif" font-size="88" font-weight="900" letter-spacing="8">॥ शुभ विवाह ॥</text>
  <path d="M 200 220 Q 350 250 500 220" stroke="url(#vivahGrad_${themeId})" stroke-width="4" stroke-linecap="round" fill="none" />
  <circle cx="350" cy="235" r="6" fill="${theme.stroke}" />
</svg>`;
    }
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
    renderSvg: (themeId = 'bhagwa-maratha') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['bhagwa-maratha'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 300" width="800" height="300">
  <defs>
    <linearGradient id="ganeshotsavGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <text x="400" y="105" text-anchor="middle" fill="${theme.stroke}" font-family="'AMS Aaditya', sans-serif" font-size="48" font-weight="800" letter-spacing="8">॥ बाप्पा मोरया ॥</text>
  <text x="400" y="200" text-anchor="middle" fill="url(#ganeshotsavGrad_${themeId})" font-family="'AMS Calligraphy 1', 'Shivaji01', serif" font-size="76" font-weight="900" letter-spacing="4">गणेशोत्सवाच्या हार्दिक शुभेच्छा</text>
  <path d="M 180 245 L 620 245" stroke="url(#ganeshotsavGrad_${themeId})" stroke-width="3" stroke-linecap="round" />
  <circle cx="400" cy="245" r="6" fill="${theme.stroke}" />
</svg>`;
    }
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
    renderSvg: (themeId = 'bhagwa-maratha') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['bhagwa-maratha'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 320" width="800" height="320">
  <defs>
    <linearGradient id="sjGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <text x="400" y="90" text-anchor="middle" fill="${theme.stroke}" font-family="'AMS Aaditya', sans-serif" font-size="36" font-weight="800" letter-spacing="10">अखंड हिंदुस्थानचे आराध्य दैवत</text>
  <text x="400" y="185" text-anchor="middle" fill="url(#sjGrad_${themeId})" font-family="'AMS Calligraphy 2', 'Shivaji01', serif" font-size="82" font-weight="900" letter-spacing="4">शिवजयंती महोत्सव</text>
  <text x="400" y="255" text-anchor="middle" fill="${theme.stroke}" font-family="'AMS Aaditya', sans-serif" font-size="34" font-weight="700" letter-spacing="6">निमित्त मनःपूर्वक शुभेच्छा</text>
</svg>`;
    }
  },

  // 5. ORNAMENTS, BORDERS & FRAMES
  {
    id: 'maratha-royal-frame',
    title: 'राजेशाही बॉर्डर व कॉर्नर',
    englishTitle: 'Maratha Royal Palace Corner & Border Frame',
    category: 'borders_frames',
    tags: ['border', 'frame', 'royal', 'corner', 'flourish'],
    description: 'Architectural Maratha palace arch and ornamental filigree corner frame',
    width: 800,
    height: 600,
    renderSvg: (themeId = 'gold-foil') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['gold-foil'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <defs>
    <linearGradient id="frameGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <!-- Main Border -->
  <rect x="30" y="30" width="740" height="540" rx="20" fill="none" stroke="url(#frameGrad_${themeId})" stroke-width="4" />
  <rect x="44" y="44" width="712" height="512" rx="14" fill="none" stroke="url(#frameGrad_${themeId})" stroke-width="1.5" stroke-dasharray="6,4" />
  <!-- Top Left Corner Stencil -->
  <path d="M 30 110 Q 70 70 110 30" fill="none" stroke="url(#frameGrad_${themeId})" stroke-width="4" />
  <circle cx="70" cy="70" r="5" fill="${theme.stroke}" />
  <!-- Top Right Corner Stencil -->
  <path d="M 770 110 Q 730 70 690 30" fill="none" stroke="url(#frameGrad_${themeId})" stroke-width="4" />
  <circle cx="730" cy="70" r="5" fill="${theme.stroke}" />
  <!-- Bottom Left Corner Stencil -->
  <path d="M 30 490 Q 70 530 110 570" fill="none" stroke="url(#frameGrad_${themeId})" stroke-width="4" />
  <circle cx="70" cy="530" r="5" fill="${theme.stroke}" />
  <!-- Bottom Right Corner Stencil -->
  <path d="M 770 490 Q 730 530 690 570" fill="none" stroke="url(#frameGrad_${themeId})" stroke-width="4" />
  <circle cx="730" cy="530" r="5" fill="${theme.stroke}" />
  <!-- Top Arch Header -->
  <path d="M 320 30 Q 400 70 480 30 Z" fill="url(#frameGrad_${themeId})" />
  <circle cx="400" cy="50" r="4" fill="#FFFFFF" />
</svg>`;
    }
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
    renderSvg: (themeId = 'gold-foil') => {
      const theme = COLOR_THEMES[themeId] || COLOR_THEMES['gold-foil'];
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <linearGradient id="mandalaGrad_${themeId}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${theme.gradient.from}" />
      <stop offset="100%" stop-color="${theme.gradient.to}" />
    </linearGradient>
  </defs>
  <g transform="translate(300, 300)" stroke="url(#mandalaGrad_${themeId})" fill="none" stroke-width="2">
    <circle r="260" stroke-width="3" />
    <circle r="240" stroke-dasharray="8,6" />
    <circle r="180" />
    <circle r="120" stroke-width="2.5" />
    <circle r="60" fill="${theme.glow}" opacity="0.3" />
    <!-- 8 Petals Symmetrical Rotation -->
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" fill="url(#mandalaGrad_${themeId})" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(45)" fill="url(#mandalaGrad_${themeId})" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(90)" fill="url(#mandalaGrad_${themeId})" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(135)" fill="url(#mandalaGrad_${themeId})" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(180)" fill="url(#mandalaGrad_${themeId})" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(225)" fill="url(#mandalaGrad_${themeId})" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(270)" fill="url(#mandalaGrad_${themeId})" opacity="0.35" />
    <path d="M 0 -180 C 40 -140 40 -60 0 0 C -40 -60 -40 -140 0 -180 Z" transform="rotate(315)" fill="url(#mandalaGrad_${themeId})" opacity="0.35" />
    <circle r="12" fill="${theme.stroke}" />
  </g>
</svg>`;
    }
  }
];
