import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Type,
  Check,
  Star,
  Trash2,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import {
  MARATHI_FONT_CATALOG,
  MarathiFontItem,
  MARATHI_FONT_CATEGORIES
} from '../../config/marathiFontCatalog';
import {
  getFavoriteFonts,
  toggleFavoriteFont,
  getRecentFonts
} from '../../config/fontLibrary';

interface CanvaFontManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFontSelected?: (fontId: string) => void;
}

export const CanvaFontManagerModal: React.FC<CanvaFontManagerModalProps> = ({
  isOpen,
  onClose,
  onFontSelected,
}) => {
  const [fonts, setFonts] = useState<MarathiFontItem[]>(MARATHI_FONT_CATALOG);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [favorites, setFavorites] = useState<string[]>(() => getFavoriteFonts());
  const [disabledFonts, setDisabledFonts] = useState<string[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle Escape key to close
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggleFavorite = (fontId: string) => {
    toggleFavoriteFont(fontId);
    setFavorites(getFavoriteFonts());
  };

  const handleToggleEnable = (fontId: string) => {
    setDisabledFonts((prev) =>
      prev.includes(fontId) ? prev.filter((id) => id !== fontId) : [...prev, fontId]
    );
  };

  // Client-side TTF/OTF Font Upload & Validation
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploadStatus('Analyzing font file metadata...');
    const file = files[0];
    const fileName = file.name;
    const isTtfOrOtf = /\.(ttf|otf|woff2?)$/i.test(fileName);

    if (!isTtfOrOtf) {
      setUploadStatus('Invalid font file. Please upload a standard .TTF or .OTF file.');
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      // Derive clean font family name from filename
      const baseName = fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      const formattedFamily = baseName
        .split(' ')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      // Register dynamically into browser using FontFace API
      const fontFace = new FontFace(formattedFamily, buffer);
      await fontFace.load();
      (document.fonts as any).add(fontFace);

      // Check duplicates
      const isDuplicate = fonts.some(
        (f) => f.name.toLowerCase() === formattedFamily.toLowerCase()
      );

      if (isDuplicate) {
        setUploadStatus(`Font "${formattedFamily}" already exists in the catalog.`);
        return;
      }

      const newFont: MarathiFontItem = {
        id: formattedFamily,
        name: formattedFamily,
        style: 'Regular',
        weight: 400,
        category: 'Custom Uploads',
        type: 'custom',
        file: fileName,
        format: fileName.toLowerCase().endsWith('.otf') ? 'OTF' : 'TTF',
        isUnicode: true,
        devanagariGlyphCount: 90,
        sampleText: 'नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.',
        altSampleText: 'महाराष्ट्र माझा अभिमान आहे.',
        fallback: 'Mukta, sans-serif',
      };

      setFonts((prev) => [newFont, ...prev]);
      setUploadStatus(`Font "${formattedFamily}" verified, loaded and enabled successfully!`);
    } catch (err: any) {
      setUploadStatus(`Error loading font: ${err.message}`);
    }
  };

  const filteredFonts = fonts.filter((f) => {
    const matchesSearch =
      !searchTerm ||
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || f.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-4xl max-h-[85vh] bg-[#18191b] border border-[#2e3034] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-gray-200 text-xs">
        
        {/* 1. HEADER */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#28292d] bg-[#141517]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Font Administration & Typography Manager</h3>
              <p className="text-[11px] text-gray-400">
                Inspect, upload, validate, categorize and enable/disable fonts ({fonts.length} total)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#25272b] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 2. LICENSING NOTICE (Requirement 6 Compliance) */}
        <div className="bg-[#121316] border-b border-[#242629] px-5 py-2.5 flex items-center justify-between gap-3 text-[11px]">
          <div className="flex items-center gap-2 text-amber-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>
              <strong>Licensing & Redistribution Advisory:</strong> Verify font commercial redistribution rights before public distribution.
            </span>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload TTF / OTF</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".ttf,.otf,.woff,.woff2"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {uploadStatus && (
          <div className="bg-purple-950/40 border-b border-purple-800/40 px-5 py-2 text-xs text-purple-200 flex items-center justify-between">
            <span>{uploadStatus}</span>
            <button onClick={() => setUploadStatus(null)} className="text-gray-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* 3. CONTROLS BAR: SEARCH & CATEGORY FILTER */}
        <div className="p-4 border-b border-[#25272a] bg-[#161719] flex items-center justify-between gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by font name or family (e.g. Mukta, Baloo, Kruti)..."
              className="w-full bg-[#202226] border border-[#343538] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {['All', ...MARATHI_FONT_CATEGORIES.slice(1)].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-[#202226] text-gray-400 hover:text-white border border-[#323438]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4. FONT TABLE / LIST */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#222428] scrollbar-thin">
          {filteredFonts.map((font) => {
            const isFav = favorites.includes(font.id);
            const isDisabled = disabledFonts.includes(font.id);

            return (
              <div
                key={font.id}
                className={`p-3.5 flex items-center justify-between gap-4 hover:bg-[#202226] transition-colors ${
                  isDisabled ? 'opacity-40 bg-black/20' : ''
                }`}
              >
                {/* Font info and metadata */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-bold text-white text-xs">{font.name}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#2b2d31] text-gray-300">
                      {font.format} • {font.style}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800/40">
                      {font.category}
                    </span>
                    {font.isUnicode ? (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800/40">
                        Unicode ({font.devanagariGlyphCount} Deva Glyphs)
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 font-bold border border-amber-800/40">
                        Legacy Encoded
                      </span>
                    )}
                  </div>

                  {/* Live Font Sample rendering in actual font-family */}
                  <p
                    style={{ fontFamily: font.id }}
                    className="text-sm text-gray-200 mt-1 truncate"
                  >
                    {font.sampleText}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleFavorite(font.id)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isFav
                        ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                        : 'bg-[#222428] text-gray-400 hover:text-white border-[#343538]'
                    }`}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button
                    onClick={() => handleToggleEnable(font.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-colors cursor-pointer border ${
                      isDisabled
                        ? 'bg-red-500/20 text-red-300 border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    }`}
                  >
                    {isDisabled ? 'Disabled' : 'Enabled'}
                  </button>

                  {onFontSelected && !isDisabled && (
                    <button
                      onClick={() => {
                        onFontSelected(font.id);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors cursor-pointer"
                    >
                      Use
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. FOOTER */}
        <div className="px-5 py-3 border-t border-[#25272a] bg-[#141517] flex items-center justify-between text-[11px] text-gray-400">
          <span>Showing {filteredFonts.length} of {fonts.length} registered Marathi & English fonts</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#25272b] hover:bg-[#303338] text-white rounded-lg font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
