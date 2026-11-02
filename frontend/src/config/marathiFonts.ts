import { FONT_LIBRARY, FontDefinition } from './fontLibrary';

export interface MarathiFont {
  id: string;
  name: string;
  category: 'popular' | 'marathi-standard' | 'calligraphy' | 'handwritten' | 'decorative' | 'professional' | 'serif' | 'sans-serif' | 'legacy' | string;
  badge?: string;
  sampleMr: string;
  file?: string;
  isUnicode?: boolean;
}

export const MARATHI_FONTS: MarathiFont[] = FONT_LIBRARY.map((f: FontDefinition) => ({
  id: f.id,
  name: f.name,
  category: f.category,
  badge: f.badge,
  sampleMr: f.sampleDevanagari,
  file: f.file,
  isUnicode: f.isUnicode
}));
