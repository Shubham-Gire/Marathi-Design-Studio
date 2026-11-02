// Marathi Phonetic Transliteration & Legacy Font Converter Engine

// High-frequency curated Marathi phrases & design words
const COMMON_PHRASES = {
  'shubhechha': 'शुभेच्छा',
  'hardik shubhechha': 'हार्दिक शुभेच्छा',
  'abhinandan': 'अभिनंदन',
  'manahpurvak abhinandan': 'मनःपूर्वक अभिनंदन',
  'namaskar': 'नमस्कार',
  'shree': 'श्री',
  'shri': 'श्री',
  'ganesh': 'गणेश',
  'shree ganeshaya namah': '॥ श्री गणेशाय नमः ॥',
  'om namah shivay': '॥ ॐ नमः शिवाय ॥',
  'om namah shivaya': '॥ ॐ नमः शिवाय ॥',
  'har har mahadev': '॥ हर हर महादेव ॥',
  'jai shree ram': '॥ जय श्रीराम ॥',
  'jai shivaji': 'जय शिवाजी',
  'jai bhavani': 'जय भवानी',
  'jai bhavani jai shivaji': 'जय भवानी जय शिवाजी',
  'chhatrapati shivaji maharaj': 'छत्रपती शिवाजी महाराज',
  'shivaji maharaj': 'छत्रपती शिवाजी महाराज',
  'shivaji': 'शिवाजी महाराज',
  'sambhajinagar': 'छत्रपती संभाजीनगर',
  'sambhaji maharaj': 'छत्रपती संभाजी महाराज',
  'maharashtra': 'महाराष्ट्र',
  'swami samarth': 'श्री स्वामी समर्थ',
  'shree swami samarth': '॥ श्री स्वामी समर्थ ॥',
  'aai': 'आई',
  'vadil': 'वडील',
  'saheb': 'साहेब',
  'bhavya': 'भव्य',
  'nimantran': 'निमंत्रण',
  'aamantran': 'आमंत्रण',
  'patrika': 'पत्रिका',
  'shubh vivah': 'शुभ विवाह',
  'lagna': 'लग्न',
  'vadhdivas': 'वाढदिवस',
  'vadhdivasachya hardik shubhechha': 'वाढदिवसाच्या हार्दिक शुभेच्छा',
  'ganeshotsav': 'गणेशोत्सव',
  'ganpati bappa morya': 'गणपती बाप्पा मोरया',
  'gudi padwa': 'गुढीपाडवा',
  'shivjayanti': 'शिवजयंती',
  'diwali': 'दिवाळी',
  'dipawali': 'दीपावली',
  'dasara': 'दसरा',
  'makar sankranti': 'मकर संक्रांती',
  'tilgul ghya god god bola': 'तिळगूळ घ्या, गोड गोड बोला',
  'dhol tasha': 'ढोल ताशा',
  'bhagwa': 'भगवा',
  'rajmudra': 'राजमुद्रा',
  'swarajya': 'स्वराज्य'
};

// Phonetic Consonants & Matras mapping
const CONSONANTS = {
  'k': 'क', 'kh': 'ख', 'g': 'ग', 'gh': 'घ', 'ng': 'ङ',
  'ch': 'च', 'chh': 'छ', 'j': 'ज', 'jh': 'झ', 'ny': 'ञ',
  't': 'त', 'th': 'थ', 'd': 'द', 'dh': 'ध', 'n': 'न',
  'T': 'ट', 'Th': 'ठ', 'D': 'ड', 'Dh': 'ढ', 'N': 'ण',
  'p': 'प', 'ph': 'फ', 'f': 'फ', 'b': 'ब', 'bh': 'भ', 'm': 'म',
  'y': 'य', 'r': 'र', 'l': 'ल', 'v': 'व', 'w': 'व',
  'sh': 'श', 'shh': 'ष', 's': 'स', 'h': 'ह', 'L': 'ळ', 'ksh': 'क्ष', 'dny': 'ज्ञ', 'gy': 'ज्ञ'
};

const VOWELS = {
  'a': 'अ', 'aa': 'आ', 'A': 'आ',
  'i': 'इ', 'ee': 'ई', 'I': 'ई',
  'u': 'उ', 'oo': 'ऊ', 'U': 'ऊ',
  'e': 'ए', 'ai': 'ऐ',
  'o': 'ओ', 'au': 'औ', 'ou': 'औ',
  'am': 'अं', 'aha': 'अः'
};

const MATRAS = {
  'aa': 'ा', 'A': 'ा',
  'i': 'ि', 'ee': 'ी', 'I': 'ी',
  'u': 'ु', 'oo': 'ू', 'U': 'ू',
  'e': 'े', 'ai': 'ै',
  'o': 'ो', 'au': 'ौ', 'ou': 'ौ',
  'am': 'ं', 'aha': 'ः'
};

export function transliterateEnglishToMarathi(input) {
  if (!input || typeof input !== 'string') return '';
  const trimmed = input.trim().toLowerCase();

  // 1. Direct phrase lookup
  if (COMMON_PHRASES[trimmed]) {
    return COMMON_PHRASES[trimmed];
  }

  // 2. Multi-word phrase handling
  const words = input.split(/\s+/);
  if (words.length > 1) {
    return words.map(w => transliterateSingleWord(w)).join(' ');
  }

  return transliterateSingleWord(input);
}

function transliterateSingleWord(word) {
  const lower = word.toLowerCase();
  if (COMMON_PHRASES[lower]) {
    return COMMON_PHRASES[lower];
  }

  let result = '';
  let i = 0;
  const len = word.length;

  while (i < len) {
    // Check 3-char consonant clusters
    const three = word.substring(i, i + 3).toLowerCase();
    if (CONSONANTS[three]) {
      result += handleConsonantMatra(three, word, i + 3);
      i += 3 + skipVowels(word, i + 3);
      continue;
    }

    // Check 2-char consonant clusters
    const two = word.substring(i, i + 2).toLowerCase();
    if (CONSONANTS[two]) {
      result += handleConsonantMatra(two, word, i + 2);
      i += 2 + skipVowels(word, i + 2);
      continue;
    }

    // Check 1-char consonant
    const one = word.charAt(i).toLowerCase();
    if (CONSONANTS[one]) {
      result += handleConsonantMatra(one, word, i + 1);
      i += 1 + skipVowels(word, i + 1);
      continue;
    }

    // Check 2-char vowel at beginning of syllable
    if (VOWELS[two]) {
      result += VOWELS[two];
      i += 2;
      continue;
    }

    // Check 1-char vowel at beginning of syllable
    if (VOWELS[one]) {
      result += VOWELS[one];
      i += 1;
      continue;
    }

    // Default: pass character through (spaces, numbers, punctuation)
    result += word.charAt(i);
    i++;
  }

  return result;
}

function handleConsonantMatra(consonantKey, word, nextIdx) {
  const baseChar = CONSONANTS[consonantKey] || '';
  if (nextIdx >= word.length) {
    return baseChar;
  }

  const nextTwo = word.substring(nextIdx, nextIdx + 2).toLowerCase();
  if (MATRAS[nextTwo]) {
    return baseChar + MATRAS[nextTwo];
  }

  const nextOne = word.charAt(nextIdx).toLowerCase();
  if (nextOne === 'a') {
    return baseChar; // inherent vowel 'a'
  }
  if (MATRAS[nextOne]) {
    return baseChar + MATRAS[nextOne];
  }

  // Next is another consonant without vowel -> virama / half-letter
  const nextIsConsonant = CONSONANTS[nextOne] || CONSONANTS[nextTwo];
  if (nextIsConsonant) {
    return baseChar + '्';
  }

  return baseChar;
}

function skipVowels(word, nextIdx) {
  if (nextIdx >= word.length) return 0;
  const two = word.substring(nextIdx, nextIdx + 2).toLowerCase();
  if (MATRAS[two]) return 2;
  const one = word.charAt(nextIdx).toLowerCase();
  if (one === 'a' || MATRAS[one]) return 1;
  return 0;
}
