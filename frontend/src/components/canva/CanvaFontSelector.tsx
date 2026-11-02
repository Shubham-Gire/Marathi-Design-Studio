import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Star, Type, X, Sparkles, Check, Settings2, ShieldCheck } from 'lucide-react';
import {
  FONT_LIBRARY,
  FontDefinition,
  getRecentFonts,
  addRecentFont,
  getFavoriteFonts,
  toggleFavoriteFont
} from '../../config/fontLibrary';

interface CanvaFontSelectorProps {
  currentFont: string;
  selectedText?: string;
  onSelectFont: (fontId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  position?: { left: number; top: number } | null;
  onOpenFontManager?: () => void;
}

export const CanvaFontSelector: React.FC<CanvaFontSelectorProps> = ({
  currentFont,
  selectedText = '',
  onSelectFont,
  isOpen,
  onClose,
  position,
  onOpenFontManager,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [previewSampleMode, setPreviewSampleMode] = useState<'sample1' | 'sample2' | 'custom'>('sample1');
  const [favorites, setFavorites] = useState<string[]>(() => getFavoriteFonts());
  const [recents, setRecents] = useState<string[]>(() => getRecentFonts());
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Exact sample texts specified by User:
  const SAMPLE_TEXT_1 = 'नमस्कार! माझ्या डिझाइनमध्ये आपले स्वागत आहे.';
  const SAMPLE_TEXT_2 = 'महाराष्ट्र माझा अभिमान आहे.';

  // Focus search input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchTerm('');
    }
  }, [isOpen]);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Filtered fonts matching all categories required by User:
  // Popular, Marathi Standard, Marathi Calligraphy, Handwritten, Decorative, Professional, Serif, Sans Serif
  const filteredFonts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return FONT_LIBRARY.filter((f) => {
      // Search filter
      const matchesSearch =
        !term ||
        f.name.toLowerCase().includes(term) ||
        f.id.toLowerCase().includes(term) ||
        f.category.toLowerCase().includes(term) ||
        (f.subCategory && f.subCategory.toLowerCase().includes(term)) ||
        (f.badge && f.badge.toLowerCase().includes(term));

      if (!matchesSearch) return false;

      // Category filters
      if (selectedFilter === 'all') return true;
      if (selectedFilter === 'favorites') return favorites.includes(f.id);
      if (selectedFilter === 'recents') return recents.includes(f.id);
      if (selectedFilter === 'popular') return f.category === 'popular';
      if (selectedFilter === 'marathi-standard') return f.category === 'marathi-standard';
      if (selectedFilter === 'calligraphy') return f.category === 'calligraphy';
      if (selectedFilter === 'handwritten') return f.category === 'handwritten';
      if (selectedFilter === 'decorative') return f.category === 'decorative';
      if (selectedFilter === 'professional') return f.category === 'professional';
      if (selectedFilter === 'serif') return f.category === 'serif';
      if (selectedFilter === 'sans-serif') return f.category === 'sans-serif';
      if (selectedFilter === 'legacy') return f.category === 'legacy';

      return true;
    });
  }, [searchTerm, selectedFilter, favorites, recents]);

  const handleSelect = (fontId: string) => {
    addRecentFont(fontId);
    setRecents(getRecentFonts());
    onSelectFont(fontId);
    onClose();
  };

  const handleToggleFav = (e: React.MouseEvent, fontId: string) => {
    e.stopPropagation();
    toggleFavoriteFont(fontId);
    setFavorites(getFavoriteFonts());
  };

  if (!isOpen) return null;

  // Categories defined per prompt and marathifontstyle.com requirements
  const categories = [
    { id: 'all', label: `All Fonts (${FONT_LIBRARY.length})` },
    { id: 'calligraphy', label: `AMS Calligraphy (${FONT_LIBRARY.filter((f) => f.category === 'calligraphy').length})` },
    { id: 'decorative', label: `Millennium & Wedding (${FONT_LIBRARY.filter((f) => f.category === 'decorative').length})` },
    { id: 'legacy', label: `Legacy Kruti/Shivaji (${FONT_LIBRARY.filter((f) => f.category === 'legacy').length})` },
    { id: 'professional', label: `Classic Suites (${FONT_LIBRARY.filter((f) => f.category === 'professional').length})` },
    { id: 'popular', label: `Popular (${FONT_LIBRARY.filter((f) => f.category === 'popular').length})` },
    { id: 'marathi-standard', label: `Marathi Standard (${FONT_LIBRARY.filter((f) => f.category === 'marathi-standard').length})` },
    { id: 'serif', label: `Serif (${FONT_LIBRARY.filter((f) => f.category === 'serif').length})` },
    { id: 'sans-serif', label: `Sans Serif (${FONT_LIBRARY.filter((f) => f.category === 'sans-serif').length})` },
    { id: 'handwritten', label: `Handwritten (${FONT_LIBRARY.filter((f) => f.category === 'handwritten').length})` },
    { id: 'favorites', label: `★ Favorites (${favorites.length})` },
    { id: 'recents', label: '🕒 Recent' },
  ];

  return (
    <div
      ref={modalRef}
      role="dialog"
      data-testid="canva-font-selector"
      style={{
        left: position ? `${position.left}px` : '80px',
        top: position ? `${position.top}px` : '52px',
      }}
      className="canva-font-selector fixed w-84 sm:w-96 md:w-[460px] max-h-[580px] bg-[#18191b] border border-[#2d2e30] rounded-2xl shadow-[0_16px_48px_rgba(0,0,0,0.85)] flex flex-col z-50 overflow-hidden text-xs text-gray-200 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-md"
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* 1. SEARCH & CONTROLS HEADER */}
      <div className="p-3 border-b border-[#28292d] bg-[#141517] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Marathi & English fonts (e.g. Mukta, Tillana, Baloo)..."
              className="w-full bg-[#202226] border border-[#343538] rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 shadow-inner"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-white rounded-md cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {onOpenFontManager && (
            <button
              onClick={() => {
                onClose();
                onOpenFontManager();
              }}
              className="p-2 bg-[#202226] hover:bg-[#2b2d33] text-gray-300 hover:text-purple-300 border border-[#343538] rounded-xl transition-colors cursor-pointer shrink-0"
              title="Font Manager (Upload & Admin)"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 2. SAMPLE TEXT PREVIEW SELECTOR (Prompt Requirement 1) */}
        <div className="flex items-center justify-between text-[11px] gap-2 pt-0.5">
          <span className="text-gray-400 shrink-0">Sample Preview:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            <button
              onClick={() => setPreviewSampleMode('sample1')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer truncate max-w-[150px] ${
                previewSampleMode === 'sample1'
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                  : 'bg-[#202226] text-gray-400 hover:text-gray-200 border border-[#343538]'
              }`}
              title={SAMPLE_TEXT_1}
            >
              नमस्कार! स्वागत आहे
            </button>
            <button
              onClick={() => setPreviewSampleMode('sample2')}
              className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer truncate max-w-[150px] ${
                previewSampleMode === 'sample2'
                  ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                  : 'bg-[#202226] text-gray-400 hover:text-gray-200 border border-[#343538]'
              }`}
              title={SAMPLE_TEXT_2}
            >
              महाराष्ट्र माझा अभिमान
            </button>
            {selectedText.trim() && (
              <button
                onClick={() => setPreviewSampleMode('custom')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-all cursor-pointer ${
                  previewSampleMode === 'custom'
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                    : 'bg-[#202226] text-gray-400 hover:text-gray-200 border border-[#343538]'
                }`}
              >
                Selected Canvas Text
              </button>
            )}
          </div>
        </div>

        {/* 3. CATEGORY FILTER PILLS */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin text-[11px]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedFilter(cat.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-bold transition-all cursor-pointer ${
                selectedFilter === cat.id
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-[#222428] border border-[#343538] text-gray-300 hover:bg-[#2b2d33] hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. FONT LIST WITH LIVE MARATHI PREVIEWS */}
      <div className="flex-1 overflow-y-auto divide-y divide-[#222428] max-h-[420px] scrollbar-thin scrollbar-thumb-gray-700">
        {filteredFonts.length === 0 ? (
          <div className="p-8 text-center text-gray-400 space-y-2">
            <Type className="w-8 h-8 mx-auto text-gray-500" />
            <p className="font-semibold text-gray-300">No fonts matching "{searchTerm}"</p>
            <p className="text-[11px] text-gray-500">Try searching for "Mukta", "Baloo", "Kalam", or "Tillana"</p>
          </div>
        ) : (
          filteredFonts.map((font) => {
            const isSelected = font.id.toLowerCase() === currentFont.toLowerCase();
            const isFav = favorites.includes(font.id);

            // Determine preview text according to selected mode
            let previewText = font.sampleDevanagari || SAMPLE_TEXT_1;
            if (previewSampleMode === 'sample2') {
              previewText = SAMPLE_TEXT_2;
            } else if (previewSampleMode === 'custom' && selectedText.trim()) {
              previewText = selectedText.slice(0, 42);
            } else if (font.script === 'latin') {
              previewText = font.sampleLatin;
            }

            return (
              <div
                key={font.id}
                onClick={() => handleSelect(font.id)}
                className={`p-3.5 hover:bg-[#222428] cursor-pointer flex items-center justify-between group transition-colors ${
                  isSelected ? 'bg-purple-950/40 border-l-4 border-purple-500' : ''
                }`}
              >
                <div className="flex-1 min-w-0 pr-3">
                  <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                    <span className="font-bold text-gray-100 text-xs truncate">{font.name}</span>
                    {font.badge && (
                      <span className="px-1.5 py-0.5 rounded-md bg-purple-900/60 text-purple-300 text-[10px] font-bold border border-purple-700/50">
                        {font.badge}
                      </span>
                    )}
                    {font.isUnicode ? (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-300 font-bold border border-emerald-800/40">
                        Unicode
                      </span>
                    ) : (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950/60 text-amber-300 font-medium border border-amber-800/40">
                        Legacy
                      </span>
                    )}
                  </div>

                  {/* Live Typography Preview in that font's actual face */}
                  <div
                    className="text-base truncate text-gray-100 leading-snug py-0.5 select-none"
                    style={{ fontFamily: font.id }}
                  >
                    {previewText}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => handleToggleFav(e, font.id)}
                    className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                      isFav ? 'text-amber-400 fill-amber-400' : 'text-gray-500 hover:text-amber-400'
                    }`}
                    title={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 5. FOOTER */}
      <div className="px-3.5 py-2.5 bg-[#141517] border-t border-[#25272a] flex items-center justify-between text-[11px] text-gray-400">
        <span>{filteredFonts.length} fonts available</span>
        <span className="text-purple-400 font-semibold">1-Click Instant Canvas Apply</span>
      </div>
    </div>
  );
};
