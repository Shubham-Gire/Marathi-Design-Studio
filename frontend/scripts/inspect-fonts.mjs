import fs from 'fs';

const fontLib = fs.readFileSync('frontend/src/config/fontLibrary.ts', 'utf8');
const ids = [...fontLib.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);
console.log('Total fonts in fontLibrary:', ids.length);
console.log('IDs in fontLibrary:', ids);

const css = fs.readFileSync('frontend/src/marathi-fonts.css', 'utf8');
const families = [...css.matchAll(/font-family:\s*'([^']+)'/g)].map(m => m[1]);
console.log('\nTotal @font-face families in marathi-fonts.css:', families.length);

const missingInCss = ids.filter(id => !families.includes(id));
console.log('\nFont IDs in fontLibrary that are MISSING in marathi-fonts.css @font-face:', missingInCss);
