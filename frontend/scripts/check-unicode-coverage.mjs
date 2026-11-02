import fs from 'fs';
import path from 'path';

// Parse OpenType/TrueType cmap table to find unicode coverage
function checkFontDevanagariUnicode(filePath) {
  const buf = fs.readFileSync(filePath);
  // Check cmap table
  const numTables = buf.readUInt16BE(4);
  let cmapOffset = 0;
  for (let i = 0; i < numTables; i++) {
    const tag = buf.toString('utf8', 12 + i * 16, 16 + i * 16);
    if (tag === 'cmap') {
      cmapOffset = buf.readUInt32BE(12 + i * 16 + 8);
      break;
    }
  }

  if (!cmapOffset) return false;

  // Let's check if U+0915 (क) or U+092E (म) exist in the font
  // Devanagari Unicode block: 0x0900 - 0x097F
  // Quick binary search or table scan
  const numSubtables = buf.readUInt16BE(cmapOffset + 2);
  for (let i = 0; i < numSubtables; i++) {
    const subOffset = cmapOffset + buf.readUInt32BE(cmapOffset + 4 + i * 8 + 4);
    const format = buf.readUInt16BE(subOffset);
    if (format === 4) {
      const segCountX2 = buf.readUInt16BE(subOffset + 6);
      const segCount = segCountX2 / 2;
      const endCodes = [];
      for (let s = 0; s < segCount; s++) {
        endCodes.push(buf.readUInt16BE(subOffset + 14 + s * 2));
      }
      const startCodes = [];
      const startCodeOffset = subOffset + 14 + segCountX2 + 2;
      for (let s = 0; s < segCount; s++) {
        startCodes.push(buf.readUInt16BE(startCodeOffset + s * 2));
      }
      
      // Check if 0x0915 is in any segment
      for (let s = 0; s < segCount; s++) {
        if (startCodes[s] <= 0x0915 && endCodes[s] >= 0x0915) {
          return true;
        }
      }
    } else if (format === 12) {
      const nGroups = buf.readUInt32BE(subOffset + 12);
      for (let g = 0; g < nGroups; g++) {
        const startCharCode = buf.readUInt32BE(subOffset + 16 + g * 12);
        const endCharCode = buf.readUInt32BE(subOffset + 16 + g * 12 + 4);
        if (startCharCode <= 0x0915 && endCharCode >= 0x0915) {
          return true;
        }
      }
    }
  }

  return false;
}

const fontDir = 'frontend/public/fonts';
const files = fs.readdirSync(fontDir);
const unicodeFonts = [];
const legacyFonts = [];

for (const file of files) {
  if (file.endsWith('.otf') || file.endsWith('.ttf') || file.endsWith('.TTF')) {
    const isUnicode = checkFontDevanagariUnicode(path.join(fontDir, file));
    if (isUnicode) {
      unicodeFonts.push(file);
    } else {
      legacyFonts.push(file);
    }
  }
}

console.log('Unicode Devanagari Fonts (' + unicodeFonts.length + '):', unicodeFonts);
console.log('\nLegacy Encoded Fonts (' + legacyFonts.length + '):', legacyFonts.slice(0, 10), '...and', legacyFonts.length - 10, 'more');
