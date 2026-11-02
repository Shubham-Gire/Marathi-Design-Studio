import fs from 'fs';

const css = fs.readFileSync('frontend/src/marathi-fonts.css', 'utf8');
const header = `/* Core Unicode Devanagari Font Families */
@font-face {
  font-family: 'Mukta';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/mukta-regular.otf') format('opentype'),
       url('/fonts/mukta-regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/baloo-2.otf') format('opentype');
}

@font-face {
  font-family: 'Tillana';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/tillana-calligraphy.otf') format('opentype'),
       url('/fonts/tillana-calligraphy.ttf') format('truetype');
}

@font-face {
  font-family: 'Yatra One';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/yatra-one.otf') format('opentype'),
       url('/fonts/yatra-one.ttf') format('truetype');
}

@font-face {
  font-family: 'Rozha One';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/rozha-one.otf') format('opentype'),
       url('/fonts/rozha-one.ttf') format('truetype');
}

@font-face {
  font-family: 'Tiro Devanagari Marathi';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/tiro-devanagari-marathi.otf') format('opentype'),
       url('/fonts/tiro-devanagari-marathi.ttf') format('truetype');
}

@font-face {
  font-family: 'Noto Sans Devanagari';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/noto-sans-devanagari.otf') format('opentype'),
       url('/fonts/noto-sans-devanagari.ttf') format('truetype');
}

@font-face {
  font-family: 'Noto Serif Devanagari';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/noto-serif-devanagari.otf') format('opentype');
}

@font-face {
  font-family: 'Sarpanch';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/sarpanch-regular.ttf') format('truetype');
}

@font-face {
  font-family: 'Ranga';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/ranga-regular.ttf') format('truetype');
}
`;

fs.writeFileSync('frontend/src/marathi-fonts.css', header + '\n' + css, 'utf8');
console.log('Successfully updated frontend/src/marathi-fonts.css!');
