import React, { useState, useRef, useEffect } from 'react';
import {
  Undo2,
  Redo2,
  Cloud,
  Check,
  Loader2,
  Crown,
  Sparkles,
  Download,
  ChevronDown,
  FilePlus,
  Save,
  Copy,
  Sliders,
  Home,
  LogOut,
  History,
  Share2,
  BookmarkCheck,
  Ruler,
  Scan,
  Grid
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface CanvaHeaderProps {
  title: string;
  onTitleChange: (newTitle: string) => void;
  saveStatus: 'saved' | 'saving' | 'unsaved';
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onSave: () => void;
  onNewDesign: () => void;
  onDuplicate: () => void;
  onOpenResizeModal: () => void;
  onOpenExportModal: () => void;
  onOpenAiModal: () => void;
  onSaveAsTemplate?: () => void;
  onOpenVersionHistory?: () => void;
  onOpenShareModal?: () => void;
  // Setting Area (View Settings & Precision Tools)
  canvasDimensions?: { width: number; height: number };
  zoomLevel?: number;
  onFitCanvas?: () => void;
  showRulers?: boolean;
  onToggleRulers?: () => void;
  showMargins?: boolean;
  onToggleMargins?: () => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  onSelectDimensions?: (w: number, h: number) => void;
}

export const CanvaHeader: React.FC<CanvaHeaderProps> = ({
  title,
  onTitleChange,
  saveStatus,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onSave,
  onNewDesign,
  onDuplicate,
  onOpenResizeModal,
  onOpenExportModal,
  onOpenAiModal,
  onSaveAsTemplate,
  onOpenVersionHistory,
  onOpenShareModal,
  canvasDimensions,
  zoomLevel,
  onFitCanvas,
  showRulers,
  onToggleRulers,
  showMargins,
  onToggleMargins,
  showGrid,
  onToggleGrid,
  onSelectDimensions,
}) => {
  const { user, isPro, logout, openAuthModal, openPricingModal } = useAuth();
  const navigate = useNavigate();
  const [isFileMenuOpen, setIsFileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(e.target as Node)) {
        setIsFileMenuOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-[54px] bg-[#0e1318] text-white px-3 flex items-center justify-between border-b border-[#252627] select-none z-40 shrink-0">
      
      {/* LEFT SECTION */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Brand Home Button */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-white/10 transition-colors text-white"
          title="Back to Dashboard"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#ea580c] via-[#f97316] to-[#fb923c] flex items-center justify-center font-extrabold text-white text-base shadow-sm">
            M
          </div>
          <span className="font-extrabold text-sm tracking-tight hidden md:inline">
            Marathi Studio
          </span>
        </Link>

        {/* File Dropdown */}
        <div className="relative" ref={fileMenuRef}>
          <button
            onClick={() => setIsFileMenuOpen(!isFileMenuOpen)}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-200 hover:bg-white/10 transition-colors ${
              isFileMenuOpen ? 'bg-white/10 text-white' : ''
            }`}
          >
            <span>File</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {isFileMenuOpen && (
            <div className="absolute left-0 top-full mt-1.5 w-60 bg-[#1e2023] border border-[#343538] rounded-xl shadow-2xl py-1.5 z-50 text-xs">
              <button
                onClick={() => { onNewDesign(); setIsFileMenuOpen(false); }}
                className="w-full px-3.5 py-2 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center gap-2.5"
              >
                <FilePlus className="w-4 h-4 text-orange-400" />
                <span>Create New Design</span>
              </button>
              <button
                onClick={() => { onSave(); setIsFileMenuOpen(false); }}
                className="w-full px-3.5 py-2 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <Save className="w-4 h-4 text-emerald-400" />
                  <span>Save to Cloud</span>
                </div>
                <span className="text-[10px] text-gray-400">Ctrl+S</span>
              </button>
              <button
                onClick={() => { onDuplicate(); setIsFileMenuOpen(false); }}
                className="w-full px-3.5 py-2 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center gap-2.5 border-t border-[#2b2d31]"
              >
                <Copy className="w-4 h-4 text-sky-400" />
                <span>Make a Copy (Duplicate)</span>
              </button>
              {onSaveAsTemplate && (
                <button
                  onClick={() => { onSaveAsTemplate(); setIsFileMenuOpen(false); }}
                  className="w-full px-3.5 py-2 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center gap-2.5"
                >
                  <BookmarkCheck className="w-4 h-4 text-teal-400" />
                  <span>Save as Template</span>
                </button>
              )}
              {onOpenVersionHistory && (
                <button
                  onClick={() => { onOpenVersionHistory(); setIsFileMenuOpen(false); }}
                  className="w-full px-3.5 py-2 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center gap-2.5"
                >
                  <History className="w-4 h-4 text-indigo-400" />
                  <span>Version History</span>
                </button>
              )}
              <button
                onClick={() => { onOpenResizeModal(); setIsFileMenuOpen(false); }}
                className="w-full px-3.5 py-2 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center justify-between border-t border-[#2b2d31]"
              >
                <div className="flex items-center gap-2.5">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span>Resize Design</span>
                </div>
                <Crown className="w-3.5 h-3.5 text-amber-400" />
              </button>
              <button
                onClick={() => { onOpenExportModal(); setIsFileMenuOpen(false); }}
                className="w-full px-3.5 py-2 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center gap-2.5 border-t border-[#2b2d31]"
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>Download (PNG, JPG, PDF)</span>
              </button>

              {/* View Settings Section inside File Menu */}
              <div className="border-t border-[#2b2d31] pt-1 mt-1">
                <div className="px-3.5 py-1 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  View settings
                </div>
                {onToggleRulers && (
                  <button
                    onClick={() => { onToggleRulers(); setIsFileMenuOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Ruler className="w-3.5 h-3.5 text-purple-400" />
                      <span>Show rulers and guides</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{showRulers ? '✓ ' : ''}Ctrl+R</span>
                  </button>
                )}
                {onToggleMargins && (
                  <button
                    onClick={() => { onToggleMargins(); setIsFileMenuOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Scan className="w-3.5 h-3.5 text-purple-400" />
                      <span>Show margins</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{showMargins ? '✓' : ''}</span>
                  </button>
                )}
                {onToggleGrid && (
                  <button
                    onClick={() => { onToggleGrid(); setIsFileMenuOpen(false); }}
                    className="w-full px-3.5 py-1.5 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <Grid className="w-3.5 h-3.5 text-purple-400" />
                      <span>Show grid</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{showGrid ? '✓' : ''}</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Resize (Canva Pro Icon) */}
        <button
          onClick={onOpenResizeModal}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-gray-200 hover:bg-white/10 transition-colors"
          title="Resize canvas dimensions"
        >
          <Sliders className="w-3.5 h-3.5 text-gray-300" />
          <span className="hidden sm:inline">Resize</span>
          <Crown className="w-3 h-3 text-amber-400 ml-0.5" />
        </button>

        {/* Divider */}
        <div className="h-4 w-px bg-[#2d2e30]" />

        {/* Undo / Redo */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Setting Area: Precision View Settings & Canvas Metrics */}
        {canvasDimensions && (
          <div
            data-testid="stage-quick-view-bar"
            className="stage-quick-view-bar flex items-center gap-1.5 bg-[#18191b] border border-[#2d2e30] px-2.5 py-1 rounded-lg text-xs shadow-xs"
          >
            <span
              className="font-bold text-gray-200 text-[11px] px-1.5 py-0.5 bg-[#222428] rounded border border-[#343538] whitespace-nowrap flex items-center gap-1"
              data-testid="header-dimensions-badge"
            >
              <span>{canvasDimensions.width} × {canvasDimensions.height} px</span>
              {canvasDimensions.width === 1080 && canvasDimensions.height === 1350 && (
                <span className="text-[10px] text-purple-400 font-extrabold bg-purple-500/20 px-1 rounded">Poster</span>
              )}
            </span>
            {onSelectDimensions && (
              <button
                type="button"
                onClick={() => {
                  if (canvasDimensions.width === 1080 && canvasDimensions.height === 1350) {
                    onSelectDimensions(1080, 1080);
                  } else {
                    onSelectDimensions(1080, 1350);
                  }
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  canvasDimensions.width === 1080 && canvasDimensions.height === 1350
                    ? 'bg-purple-600 text-white font-bold'
                    : 'hover:bg-[#282a2e] text-purple-300 border border-purple-500/30'
                }`}
                title="Toggle Standard Poster Size (1080 × 1350 px)"
                data-testid="header-poster-toggle-btn"
              >
                {canvasDimensions.width === 1080 && canvasDimensions.height === 1350 ? 'Poster ✓' : 'Poster Size'}
              </button>
            )}
            {zoomLevel !== undefined && (
              <span className="text-purple-400 font-extrabold text-[11px]">{Math.round(zoomLevel * 100)}%</span>
            )}
            {onFitCanvas && (
              <button
                type="button"
                onClick={onFitCanvas}
                className="px-2 py-0.5 text-[11px] font-semibold text-gray-300 hover:text-purple-400 hover:bg-[#282a2e] rounded transition-colors cursor-pointer"
                title="Fit to Screen"
              >
                Fit
              </button>
            )}
            <div className="h-3 w-px bg-[#343538]" />
            {onToggleRulers && (
              <button
                type="button"
                onClick={onToggleRulers}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  showRulers ? 'bg-purple-600 text-white font-bold' : 'hover:bg-[#282a2e] text-gray-300'
                }`}
                title="Toggle Rulers (Ctrl+R)"
              >
                Rulers
              </button>
            )}
            {onToggleMargins && (
              <button
                type="button"
                onClick={onToggleMargins}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  showMargins ? 'bg-purple-600 text-white font-bold' : 'hover:bg-[#282a2e] text-gray-300'
                }`}
                title="Toggle Safe Margins & Bleed"
              >
                Margins
              </button>
            )}
            {onToggleGrid && (
              <button
                type="button"
                onClick={onToggleGrid}
                className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                  showGrid ? 'bg-purple-600 text-white font-bold' : 'hover:bg-[#282a2e] text-gray-300'
                }`}
                title="Toggle Precision Grid"
              >
                Grid
              </button>
            )}
          </div>
        )}

        {/* Cloud Auto-save Status Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 text-[11px] text-gray-400">
          {saveStatus === 'saved' && (
            <>
              <Cloud className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-gray-300">All changes saved</span>
              <Check className="w-3 h-3 text-emerald-400" />
            </>
          )}
          {saveStatus === 'saving' && (
            <>
              <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
              <span className="text-amber-300">Saving to cloud...</span>
            </>
          )}
          {saveStatus === 'unsaved' && (
            <>
              <Cloud className="w-3.5 h-3.5 text-gray-500" />
              <span className="text-gray-400">Unsaved changes</span>
            </>
          )}
        </div>
      </div>

      {/* CENTER SECTION: DOCUMENT TITLE */}
      <div className="flex-1 max-w-sm mx-2 flex justify-center">
        <div className="relative group w-full max-w-[260px] sm:max-w-xs text-center">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            placeholder="Design Title"
            className="w-full text-center font-bold text-xs sm:text-sm text-gray-200 bg-transparent rounded-lg px-2 py-1 border border-transparent hover:border-[#383a3e] focus:border-[#8b3dff] focus:bg-[#1a1b1e] focus:outline-none transition-all truncate"
          />
        </div>
      </div>

      {/* RIGHT SECTION: ACTIONS & EXPORT */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Pro Badge */}
        {isPro ? (
          <span className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-amber-400/15 border border-amber-400/30 text-amber-300 rounded-full text-[11px] font-black">
            <Crown className="w-3 h-3 text-amber-400" />
            PRO
          </span>
        ) : (
          <button
            onClick={() => openPricingModal()}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-white/10 hover:bg-white/15 text-gray-200 rounded-full text-[11px] font-bold transition-colors"
          >
            <Crown className="w-3 h-3 text-amber-400" />
            Upgrade
          </button>
        )}

        {/* AI Magic Assistant Button */}
        <button
          onClick={onOpenAiModal}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:brightness-110 text-white rounded-lg text-xs font-extrabold shadow-sm transition-all"
          title="AI Copy & Design Assistant"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden md:inline">AI Magic</span>
        </button>

        {/* Canva Signature "Download" Gradient Pill Button */}
        <button
          onClick={onOpenExportModal}
          className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#8b3dff] via-[#7d2ae8] to-[#6366f1] hover:brightness-110 text-white rounded-lg text-xs font-black shadow-md shadow-purple-900/30 transition-all cursor-pointer"
          title="Download Design (PNG, JPG, PDF, SVG)"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download</span>
        </button>

        {/* Canva "Share" Button */}
        <button
          onClick={onOpenShareModal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/15 text-white rounded-lg text-xs font-bold border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          title="Share & Collaborate"
        >
          <Share2 className="w-3.5 h-3.5 text-purple-300" />
          <span className="hidden sm:inline">Share</span>
        </button>

        {/* User Profile Avatar / Login */}
        <div className="relative" ref={profileMenuRef}>
          {user ? (
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs border border-white/20 hover:ring-2 hover:ring-purple-400 transition-all"
            >
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </button>
          ) : (
            <button
              onClick={() => openAuthModal('login')}
              className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-colors"
            >
              Log in
            </button>
          )}

          {isProfileMenuOpen && user && (
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-[#1e2023] border border-[#343538] rounded-xl shadow-2xl py-2 z-50 text-xs">
              <div className="px-3.5 py-2 border-b border-[#2b2d31]">
                <p className="font-bold text-white truncate">{user.fullName}</p>
                <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
              </div>
              <Link
                to="/dashboard"
                onClick={() => setIsProfileMenuOpen(false)}
                className="w-full px-3.5 py-2 text-left text-gray-200 hover:bg-[#2b2d31] hover:text-white flex items-center gap-2"
              >
                <Home className="w-3.5 h-3.5 text-gray-400" />
                <span>My Dashboard</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsProfileMenuOpen(false);
                  navigate('/', { replace: true });
                }}
                className="w-full px-3.5 py-2 text-left text-red-400 hover:bg-[#2b2d31] hover:text-red-300 flex items-center gap-2 border-t border-[#2b2d31]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
