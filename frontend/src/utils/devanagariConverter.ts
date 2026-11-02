/**
 * Devanagari Encoding & Legacy Font Converter
 * Supports bidirectional conversion between Unicode Devanagari and legacy encodings:
 * - Kruti Dev (Kruti Dev 010, 055, 100, etc.)
 * - Shivaji Series (Shivaji01, Shivaji05, etc.)
 * - Shree Lipi (SHREE-DEV-0714, etc.)
 */

// Kruti Dev to Unicode character mapping rules (longest sequences first)
const KRUTI_TO_UNICODE_MAP: [string, string][] = [
  // Multi-character conjuncts and complex glyphs
  ['ç', 'fa'], // Left matra placeholder
  ['ñ', 'ं'],
  ['ò', 'ऽ'],
  ['ó', 'ऽ'],
  ['à', 'ा'],
  ['á', 'ा'],
  ['â', 'ा'],
  ['ã', 'ा'],
  ['ä', 'ा'],
  ['å', 'ा'],
  ['æ', 'ा'],
  ['ç', 'ा'],
  ['è', 'ा'],
  ['é', 'ा'],
  ['ê', 'ा'],
  ['ë', 'ा'],
  ['í', 'ा'],
  ['î', 'ा'],
  ['ï', 'ा'],
  ['ð', 'ा'],
  ['ñ', 'ं'],
  ['ò', 'ा'],
  ['ó', 'ा'],
  ['ô', 'ा'],
  ['õ', 'ा'],
  ['ö', 'ा'],
  ['÷', 'ा'],
  ['ø', 'ा'],
  ['ù', 'ा'],
  ['ú', 'ा'],
  ['û', 'ा'],
  ['ü', 'ा'],
  ['ý', 'ा'],
  ['þ', 'ा'],
  ['ÿ', 'ा'],

  // Conjuncts
  ['{k', 'क्ष'],
  ['K', 'ज्ञ'],
  ['=k', 'त्र'],
  ['J', 'श्र'],
  ['L=k', 'स्त्र'],
  ['Ø', 'क्र'],
  ['Á', 'प्र'],
  ['xz', 'ग्र'],
  ['|', 'द्य'],
  ['Dr', 'क्त'],
  ['G', 'ळ'],
  ['Ý', '्र'],
  ['z', '्र'],
  ['Z', 'र्'],
  ['~', '्'],
  ['`', '्'],

  // Consonants
  ['d', 'क'],
  ['[k', 'ख'],
  ['x', 'ग'],
  ['?k', 'घ'],
  ['³', 'ङ'],
  ['p', 'च'],
  ['N', 'छ'],
  ['t', 'ज'],
  ['Hk', 'झ'],
  ['¥', 'ञ'],
  ['V', 'ट'],
  ['B', 'ठ'],
  ['M', 'ड'],
  ['<', 'ढ'],
  ['.', 'ण'],
  ['r', 'त'],
  ['Fk', 'थ'],
  ['n', 'द'],
  ['/k', 'ध'],
  ['u', 'न'],
  ['i', 'प'],
  ['Q', 'फ'],
  ['c', 'ब'],
  ['H', 'भ'],
  ['e', 'म'],
  [';', 'य'],
  ['j', 'र'],
  ['y', 'ल'],
  ['o', 'व'],
  ["'k", 'श'],
  ['"k', 'ष'],
  ['l', 'स'],
  ['g', 'ह'],
  ['G', 'ळ'],

  // Half-letters
  ['D', 'क्'],
  ['[', 'ख्'],
  ['X', 'ग्'],
  ['?', 'घ्'],
  ['P', 'च्'],
  ['T', 'ज्'],
  ['R', 'त्'],
  ['F', 'थ्'],
  ['/', 'ध्'],
  ['U', 'न्'],
  ['I', 'प्'],
  ['C', 'ब्'],
  ['E', 'म्'],
  ['Y', 'ल्'],
  ['O', 'व्'],
  ["'", 'श्'],
  ['"', 'ष्'],
  ['L', 'स्'],

  // Vowels
  ['v', 'अ'],
  ['vk', 'आ'],
  ['b', 'इ'],
  ['bZ', 'ई'],
  ['m', 'उ'],
  ['Å', 'ऊ'],
  ['ऋ', 'ऋ'],
  ['ए', 'ए'],
  ['ऐ', 'ऐ'],
  ['vks', 'ओ'],
  ['vkS', 'औ'],
  ['vsa', 'अं'],
  ['v%', 'अः'],

  // Matras
  ['k', 'ा'],
  ['h', 'ी'],
  ['q', 'ु'],
  ['w', 'ू'],
  ['`', 'ृ'],
  ['s', 'े'],
  ['S', 'ै'],
  ['ks', 'ो'],
  ['kS', 'ौ'],
  ['a', 'ं'],
  ['%', 'ः'],
  ['~', '्'],
  ['W', 'ॅ'],
  ['kW', 'ॉ'],

  // Digits
  ['0', '०'],
  ['1', '१'],
  ['2', '२'],
  ['3', '३'],
  ['4', '४'],
  ['5', '५'],
  ['6', '६'],
  ['7', '७'],
  ['8', '८'],
  ['9', '९'],

  // Punctuation
  ['A', '।'],
  ['AA', '॥'],
];

// Shivaji to Unicode mapping rules
const SHIVAJI_TO_UNICODE_MAP: [string, string][] = [
  ['Ix', 'क्ष'],
  ['J', 'ज्ञ'],
  ['=', 'त्र'],
  ['S', 'श्र'],
  ['x', 'क्र'],
  ['y', 'प्र'],
  ['z', '्र'],
  ['k', 'क'],
  ['K', 'ख'],
  ['g', 'ग'],
  ['G', 'घ'],
  ['c', 'च'],
  ['C', 'छ'],
  ['j', 'ज'],
  ['jh', 'झ'],
  ['t', 'ट'],
  ['T', 'ठ'],
  ['d', 'ड'],
  ['D', 'ढ'],
  ['N', 'ण'],
  ['w', 'त'],
  ['W', 'थ'],
  ['X', 'द'],
  ['h', 'ध'],
  ['n', 'न'],
  ['p', 'प'],
  ['P', 'फ'],
  ['b', 'ब'],
  ['B', 'भ'],
  ['m', 'म'],
  ['y', 'य'],
  ['r', 'र'],
  ['l', 'ल'],
  ['v', 'व'],
  ['sh', 'श'],
  ['Sh', 'ष'],
  ['s', 'स'],
  ['H', 'ह'],
  ['L', 'ळ'],
  ['a', 'ा'],
  ['i', 'ि'],
  ['I', 'ी'],
  ['u', 'ु'],
  ['U', 'ू'],
  ['e', 'े'],
  ['E', 'ै'],
  ['o', 'ो'],
  ['O', 'ौ'],
  ['M', 'ं'],
  [':', 'ः'],
];

/**
 * Convert Kruti Dev encoded legacy string to Standard Unicode Devanagari
 */
export function krutiDevToUnicode(krutiText: string): string {
  if (!krutiText) return '';
  let text = krutiText;

  // Handle post-position vowel sign 'f' which in Kruti Dev appears BEFORE the consonant
  // e.g. "fd" -> "कि" (f + consonant -> consonant + ि)
  text = text.replace(/f([d\[x?pNtHVBM<rFn/uicHEjyo'\"lgGL])/g, '$1ि');
  text = text.replace(/f([A-Za-z0-9])/g, '$1ि');

  // Handle reph 'Z' which appears after character in Kruti Dev but is prepended as 'र्' in Unicode
  // e.g. "dZ" -> "र्क"
  text = text.replace(/([A-Za-z0-9]+)Z/g, 'र्$1');

  // Apply mapped substitutions
  for (const [k, u] of KRUTI_TO_UNICODE_MAP) {
    if (k && text.includes(k)) {
      text = text.split(k).join(u);
    }
  }

  // Handle misplaced matra attachments
  text = text.replace(/ाे/g, 'ो');
  text = text.replace(/ाै/g, 'ौ');

  return text;
}

/**
 * Convert Standard Unicode Devanagari to Kruti Dev encoded string
 */
export function unicodeToKrutiDev(unicodeText: string): string {
  if (!unicodeText) return '';
  let text = unicodeText;

  // Reverse mapping from Unicode to Kruti Dev
  // Sorted by length of unicode character descending
  const reverseMap = [...KRUTI_TO_UNICODE_MAP]
    .filter(([k, u]) => u.length > 0 && k.length > 0)
    .sort((a, b) => b[1].length - a[1].length);

  for (const [k, u] of reverseMap) {
    if (text.includes(u)) {
      text = text.split(u).join(k);
    }
  }

  // Reverse matra 'ि' position (Unicode consonant + ि -> Kruti Dev f + consonant)
  text = text.replace(/([A-Za-z0-9]+)ि/g, 'f$1');

  return text;
}

/**
 * Convert Shivaji font legacy encoding to Unicode Devanagari
 */
export function shivajiToUnicode(shivajiText: string): string {
  if (!shivajiText) return '';
  let text = shivajiText;

  for (const [s, u] of SHIVAJI_TO_UNICODE_MAP) {
    if (s && text.includes(s)) {
      text = text.split(s).join(u);
    }
  }
  return text;
}

/**
 * Detect probable Devanagari encoding of a string
 */
export function detectDevanagariEncoding(text: string): 'unicode' | 'krutidev' | 'shivaji' | 'ascii' {
  if (!text) return 'ascii';

  // Check Unicode Devanagari codepoints
  if (/[\u0900-\u097F]/.test(text)) {
    return 'unicode';
  }

  // Check Kruti Dev distinctive markers (e.g. 'vk', 'vks', '{k', 'Hk', 'Fk')
  if (/vk|vks|\{k|Hk|Fk|Z|~|Dr|G/.test(text)) {
    return 'krutidev';
  }

  // Check Shivaji markers
  if (/Ix|jh|Sh/.test(text)) {
    return 'shivaji';
  }

  return 'ascii';
}

/**
 * Test whether a font requires legacy conversion
 */
export function isLegacyFont(fontFamily: string): boolean {
  const f = fontFamily.toLowerCase();
  return (
    f.includes('kruti') ||
    f.includes('shivaji0') ||
    f.includes('shree-dev') ||
    f.includes('ams') ||
    f.includes('pankaj') ||
    f.includes('richa') ||
    f.includes('ruchi') ||
    f.includes('saroj') ||
    f.includes('varsha') ||
    f.includes('vimal')
  );
}
