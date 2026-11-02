/**
 * Marathi Transliteration Engine & InScript Layout Utilities
 * - English-to-Marathi Phonetic Transliteration (Direct typing assistance)
 * - InScript Keyboard Layout (Standard CDAC / Government layout)
 * - Devanagari Conjunct builder (क्ष, ज्ञ, त्र, श्र, स्त्र, क्र, प्र, ग्र, द्य, क्त, ळ, ऱ)
 */

// Common phonetic dictionary for instant, perfect transliteration of frequent Marathi words
const PHONETIC_DICT: Record<string, string> = {
  // Greetings & Core Terms
  'namaskar': 'नमस्कार',
  'namaste': 'नमस्ते',
  'swagatam': 'स्वागतम',
  'swagat': 'स्वागत',
  'dhanyavaad': 'धन्यवाद',
  'dhanyavad': 'धन्यवाद',
  'aabhar': 'आभार',
  'shubhechha': 'शुभेच्छा',
  'subhechha': 'शुभेच्छा',
  'hardik': 'हार्दिक',
  'abhinandan': 'अभिनंदन',
  'jay': 'जय',
  'jai': 'जय',
  'shree': 'श्री',
  'shri': 'श्री',

  // Iconic Figures & Places
  'chhatrapati': 'छत्रपती',
  'shivaji': 'शिवाजी',
  'maharaj': 'महाराज',
  'sambhajimaharaj': 'संभाजी महाराज',
  'sambhaji': 'संभाजी',
  'bhavani': 'भवानी',
  'rajmudra': 'राजमुद्रा',
  'maharashtra': 'महाराष्ट्र',
  'marathi': 'मराठी',
  'mumbai': 'मुंबई',
  'pune': 'पुणे',
  'nashik': 'नाशिक',
  'nagpur': 'नागपूर',
  'kolhapur': 'कोल्हापूर',
  'satara': 'सातारा',
  'solapur': 'सोलापूर',
  'aurangabad': 'औरंगाबाद',
  'chhatrapatisambhajinagar': 'छत्रपती संभाजीनगर',

  // Celebrations & Events
  'ganesh': 'गणेश',
  'ganpati': 'गणपती',
  'bappa': 'बाप्पा',
  'morya': 'मोरया',
  'diwali': 'दिवाळी',
  'deepavali': 'दीपावली',
  'gudhipadwa': 'गुढीपाडवा',
  'padwa': 'पाडवा',
  'utsav': 'उत्सव',
  'sohala': 'सोहळा',
  'nimantran': 'निमंत्रण',
  'vivah': 'विवाह',
  'shubh': 'शुभ',
  'lagna': 'लग्न',
  'patrika': 'पत्रिका',
  'katha': 'कथा',
  'puja': 'पूजा',
  'pooja': 'पूजा',
  'aarti': 'आरती',
  'vadhdivas': 'वाढदिवस',
  'vadhdiwas': 'वाढदिवस',
  'vandan': 'वंदन',

  // Common Phrases
  'aai': 'आई',
  'baba': 'बाबा',
  'mitra': 'मित्र',
  'desh': 'देश',
  'swarajya': 'स्वराज्य',
  'pranam': 'प्रणाम',
  'abhiman': 'अभिमान',
  'aaple': 'आपले',
  'majhya': 'माझ्या',
  'ahe': 'आहे',
  'design': 'डिझाइन',
};

// Vowel phonetics
const VOWELS: [RegExp, string][] = [
  [/^aa/i, 'आ'],
  [/^a/i, 'अ'],
  [/^ee/i, 'ई'],
  [/^i/i, 'इ'],
  [/^oo/i, 'ऊ'],
  [/^u/i, 'उ'],
  [/^ai/i, 'ऐ'],
  [/^ei/i, 'ऐ'],
  [/^e/i, 'ए'],
  [/^au/i, 'औ'],
  [/^ou/i, 'औ'],
  [/^o/i, 'ओ'],
  [/^ru/i, 'ऋ'],
  [/^am/i, 'अं'],
  [/^an/i, 'अं'],
  [/^aha/i, 'अः'],
];

// Matras
const MATRAS: [RegExp, string][] = [
  [/^aa/i, 'ा'],
  [/^ee/i, 'ी'],
  [/^ii/i, 'ी'],
  [/^i/i, 'ि'],
  [/^oo/i, 'ू'],
  [/^u/i, 'ु'],
  [/^ai/i, 'ै'],
  [/^e/i, 'े'],
  [/^au/i, 'ौ'],
  [/^ou/i, 'ौ'],
  [/^o/i, 'ो'],
  [/^ru/i, 'ृ'],
  [/^am/i, 'ं'],
  [/^an/i, 'ं'],
  [/^a/i, ''],
];

// Consonants (longest sequences first)
const CONSONANTS: [RegExp, string][] = [
  // Special Marathi & Sanskrit Conjuncts
  [/^shree/i, 'श्री'],
  [/^shri/i, 'श्री'],
  [/^ksh/i, 'क्ष'],
  [/^gny/i, 'ज्ञ'],
  [/^dny/i, 'ज्ञ'],
  [/^jny/i, 'ज्ञ'],
  [/^gy/i, 'ज्ञ'],
  [/^tra/i, 'त्र'],
  [/^tr/i, 'त्र'],
  [/^shr/i, 'श्र'],
  [/^str/i, 'स्त्र'],
  [/^st/i, 'स्त'],
  [/^kr/i, 'क्र'],
  [/^pr/i, 'प्र'],
  [/^gr/i, 'ग्र'],
  [/^dy/i, 'द्य'],
  [/^kt/i, 'क्त'],
  [/^sw/i, 'स्व'],
  [/^sv/i, 'स्व'],
  [/^vy/i, 'व्य'],
  [/^ny/i, 'न्य'],
  [/^my/i, 'म्य'],
  [/^ty/i, 'त्य'],
  [/^py/i, 'प्य'],
  [/^ky/i, 'क्य'],
  [/^jy/i, 'ज्य'],
  [/^hy/i, 'ह्य'],
  [/^ry/i, 'र्य'],
  [/^nd/i, 'न्द'],
  [/^nt/i, 'न्त'],
  [/^mp/i, 'म्प'],
  [/^mb/i, 'म्ब'],

  // Marathi specific Eyelash Ra (ऱ - U+0972)
  [/^rrh/i, 'ऱ्ह'],
  [/^rra/i, 'ऱ'],
  [/^rr/i, 'ऱ'],

  // Marathi ळ (Retroflex lateral)
  [/^ld/i, 'ळ'],
  [/^L/i, 'ळ'],
  [/^la/i, 'ल'],

  // Aspirated Consonants
  [/^chh/i, 'छ'],
  [/^ch/i, 'च'],
  [/^kh/i, 'ख'],
  [/^gh/i, 'घ'],
  [/^jh/i, 'झ'],
  [/^th/i, 'थ'],
  [/^dh/i, 'ध'],
  [/^ph/i, 'फ'],
  [/^bh/i, 'भ'],
  [/^sh/i, 'श'],
  [/^Sh/i, 'ष'],

  // Retroflex consonants
  [/^Th/i, 'ठ'],
  [/^T/i, 'ट'],
  [/^Dh/i, 'ढ'],
  [/^D/i, 'ड'],
  [/^N/i, 'ण'],

  // Standard Consonants
  [/^k/i, 'क'],
  [/^g/i, 'ग'],
  [/^j/i, 'ज'],
  [/^t/i, 'त'],
  [/^d/i, 'द'],
  [/^n/i, 'न'],
  [/^p/i, 'प'],
  [/^f/i, 'फ'],
  [/^b/i, 'ब'],
  [/^m/i, 'म'],
  [/^y/i, 'य'],
  [/^r/i, 'र'],
  [/^l/i, 'ल'],
  [/^v/i, 'व'],
  [/^w/i, 'व'],
  [/^s/i, 'स'],
  [/^h/i, 'ह'],
];

/**
 * Phonetically transliterate a single English word into Marathi Unicode
 */
export function transliterateWord(word: string): string {
  if (!word) return '';
  const lower = word.toLowerCase();

  // 1. Direct dictionary match
  if (PHONETIC_DICT[lower]) {
    return PHONETIC_DICT[lower];
  }

  // 2. Phonetic token-by-token builder
  let res = '';
  let i = 0;
  const len = word.length;

  while (i < len) {
    const sub = word.slice(i);

    // Digits
    const digitMatch = sub.match(/^[0-9]/);
    if (digitMatch) {
      const d = digitMatch[0];
      const devaDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
      res += devaDigits[parseInt(d, 10)];
      i += 1;
      continue;
    }

    // Punctuation & spaces
    if (/^[\s.,!?;:\-–—"'()[\]{}]/.test(sub)) {
      res += sub[0];
      i += 1;
      continue;
    }

    // Check if start of word or after vowel: match independent vowels
    if (i === 0 || /[\s-]/.test(word[i - 1])) {
      let vMatch = false;
      for (const [pat, vChar] of VOWELS) {
        const m = sub.match(pat);
        if (m) {
          res += vChar;
          i += m[0].length;
          vMatch = true;
          break;
        }
      }
      if (vMatch) continue;
    }

    // Match Consonants
    let cMatch = false;
    for (const [cPat, cChar] of CONSONANTS) {
      const cm = sub.match(cPat);
      if (cm) {
        cMatch = true;
        const matchedCStr = cm[0];
        i += matchedCStr.length;

        // Check if consonant is followed by vowel matra
        const nextSub = word.slice(i);
        let mMatch = false;

        for (const [mPat, mChar] of MATRAS) {
          const mm = nextSub.match(mPat);
          if (mm) {
            res += cChar + mChar;
            i += mm[0].length;
            mMatch = true;
            break;
          }
        }

        // If no following vowel, consonant has default 'a' or if at end of word has implicit halant
        if (!mMatch) {
          if (i === len) {
            // End of word in Marathi usually ends without halant unless specifically marked
            res += cChar;
          } else {
            // In middle of word followed by another consonant -> half letter (halant)
            res += cChar + '्';
          }
        }
        break;
      }
    }

    if (!cMatch) {
      // Fallback pass-through
      res += word[i];
      i += 1;
    }
  }

  // Clean double viramas or invalid sequences
  res = res.replace(/््+/g, '्');
  return res;
}

/**
 * Transliterate full text containing mixed words and punctuation
 */
export function transliterateText(text: string): string {
  if (!text) return '';
  return text
    .split(/(\s+|[.,!?;:\-–—"'()[\]{}]+)/)
    .map((chunk) => {
      if (/^(\s+|[.,!?;:\-–—"'()[\]{}]+)$/.test(chunk)) {
        return chunk;
      }
      return transliterateWord(chunk);
    })
    .join('');
}

// ---------------------------------------------------------------------------
// IN-SCRIPT KEYBOARD LAYOUT MATRIX (Standard Devanagari InScript for Marathi)
// ---------------------------------------------------------------------------

export interface InScriptKey {
  key: string;
  normal: string;
  shift: string;
  type: 'vowel' | 'consonant' | 'matra' | 'digit' | 'symbol' | 'special';
}

export const INSCRIPT_ROWS: InScriptKey[][] = [
  // Row 1: Numbers
  [
    { key: '`', normal: '़', shift: 'ऺ', type: 'symbol' },
    { key: '1', normal: '१', shift: 'ऍ', type: 'digit' },
    { key: '2', normal: '२', shift: 'ॅ', type: 'digit' },
    { key: '3', normal: '३', shift: '्र', type: 'digit' },
    { key: '4', normal: '४', shift: 'र्', type: 'digit' },
    { key: '5', normal: '५', shift: 'ज्ञ', type: 'digit' },
    { key: '6', normal: '६', shift: 'त्र', type: 'digit' },
    { key: '7', normal: '७', shift: 'क्ष', type: 'digit' },
    { key: '8', normal: '८', shift: 'श्र', type: 'digit' },
    { key: '9', normal: '९', shift: '(', type: 'digit' },
    { key: '0', normal: '०', shift: ')', type: 'digit' },
    { key: '-', normal: '-', shift: 'ः', type: 'symbol' },
    { key: '=', normal: 'ृ', shift: 'ॠ', type: 'matra' },
  ],
  // Row 2: Q - P
  [
    { key: 'q', normal: 'ौ', shift: 'औ', type: 'matra' },
    { key: 'w', normal: 'ै', shift: 'ऐ', type: 'matra' },
    { key: 'e', normal: 'ा', shift: 'आ', type: 'matra' },
    { key: 'r', normal: 'ी', shift: 'ई', type: 'matra' },
    { key: 't', normal: 'ू', shift: 'ऊ', type: 'matra' },
    { key: 'y', normal: 'ब', shift: 'भ', type: 'consonant' },
    { key: 'u', normal: 'ह', shift: 'ङ', type: 'consonant' },
    { key: 'i', normal: 'ग', shift: 'घ', type: 'consonant' },
    { key: 'o', normal: 'द', shift: 'ध', type: 'consonant' },
    { key: 'p', normal: 'ज', shift: 'झ', type: 'consonant' },
    { key: '[', normal: 'ड', shift: 'ढ', type: 'consonant' },
    { key: ']', normal: '़', shift: 'ञ', type: 'symbol' },
  ],
  // Row 3: A - ;
  [
    { key: 'a', normal: 'ो', shift: 'ओ', type: 'matra' },
    { key: 's', normal: 'े', shift: 'ए', type: 'matra' },
    { key: 'd', normal: '्', shift: 'अ', type: 'matra' }, // Halant / Virama
    { key: 'f', normal: 'ि', shift: 'इ', type: 'matra' },
    { key: 'g', normal: 'ु', shift: 'उ', type: 'matra' },
    { key: 'h', normal: 'प', shift: 'फ', type: 'consonant' },
    { key: 'j', normal: 'र', shift: 'ऱ', type: 'consonant' }, // Normal र, Shift ऱ (Eyelash Ra)
    { key: 'k', normal: 'क', shift: 'ख', type: 'consonant' },
    { key: 'l', normal: 'त', shift: 'थ', type: 'consonant' },
    { key: ';', normal: 'च', shift: 'छ', type: 'consonant' },
    { key: "'", normal: 'ट', shift: 'ठ', type: 'consonant' },
  ],
  // Row 4: Z - /
  [
    { key: 'z', normal: 'े', shift: 'ऐ', type: 'matra' },
    { key: 'x', normal: 'ं', shift: 'ँ', type: 'matra' }, // Anusvara
    { key: 'c', normal: 'म', shift: 'ण', type: 'consonant' },
    { key: 'v', normal: 'न', shift: 'ऩ', type: 'consonant' },
    { key: 'b', normal: 'व', shift: 'ऴ', type: 'consonant' },
    { key: 'n', normal: 'ल', shift: 'ळ', type: 'consonant' }, // Normal ल, Shift ळ
    { key: 'm', normal: 'स', shift: 'श', type: 'consonant' },
    { key: ',', normal: ',', shift: 'ष', type: 'symbol' },
    { key: '.', normal: '.', shift: '।', type: 'symbol' }, // Danda
    { key: '/', normal: 'य', shift: '?', type: 'consonant' },
  ],
];

// Quick Marathi phrases ready for 1-click insertion onto design canvas
export const QUICK_MARATHI_PHRASES = [
  { label: 'स्वागत', text: 'नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.' },
  { label: 'अभिमान', text: 'महाराष्ट्र माझा अभिमान आहे.' },
  { label: 'गणेश वंदन', text: '॥ श्री गणेशाय नमः ॥' },
  { label: 'शिव वंदना', text: '॥ जय भवानी जय शिवाजी ॥' },
  { label: 'वाढदिवस', text: 'वाढदिवसाच्या हार्दिक शुभेच्छा!' },
  { label: 'शुभ विवाह', text: '॥ शुभ विवाह ॥' },
  { label: 'गुढीपाडवा', text: 'गुढीपाडव्याच्या हार्दिक शुभेच्छा!' },
  { label: 'अभिनंदन', text: 'हार्दिक अभिनंदन व मनःपूर्वक शुभेच्छा!' },
  { label: 'राजमुद्रा', text: 'प्रतिपच्चंद्रलेखेव वर्धिष्णुर्विश्ववंदिता शाहसूनोः शिवस्यैषा मुद्रा भद्राय राजते।' },
];
