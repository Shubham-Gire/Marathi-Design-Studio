import React from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Copy,
  Trash2,
  Keyboard,
  Grid,
  Ruler,
  Scan,
  Hand,
  Play,
  FileText,
  Clock,
  LayoutGrid,
  ArrowUpToLine
} from 'lucide-react';

interface CanvaBottomBarProps {
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  onFitScreen: () => void;
  currentPage: number;
  totalPages: number;
  onAddPage: () => void;
  onAddPageAbove?: () => void;
  onDuplicatePage?: () => void;
  onDeletePage?: () => void;
  onPageChange?: (pageIndex: number) => void;
  onToggleShortcuts?: () => void;
  showRulers?: boolean;
  onToggleRulers?: () => void;
  showMargins?: boolean;
  onToggleMargins?: () => void;
  showGrid?: boolean;
  onToggleGrid?: () => void;
  isPanMode?: boolean;
  onTogglePanMode?: () => void;
  onStartPresentation?: () => void;
  isNotesOpen?: boolean;
  onToggleNotes?: () => void;
  isTimerOpen?: boolean;
  onToggleTimer?: () => void;
  onToggleMarathiKeyboard?: () => void;
}

export const CanvaBottomBar: React.FC<CanvaBottomBarProps> = ({
  zoomLevel,
  onZoomChange,
  onFitScreen,
  currentPage,
  totalPages,
  onAddPage,
  onAddPageAbove,
  onDuplicatePage,
  onDeletePage,
  onPageChange,
  onToggleShortcuts,
  showRulers = false,
  onToggleRulers,
  showMargins = false,
  onToggleMargins,
  showGrid = false,
  onToggleGrid,
  isPanMode = false,
  onTogglePanMode,
  onStartPresentation,
  isNotesOpen = false,
  onToggleNotes,
  isTimerOpen = false,
  onToggleTimer,
  onToggleMarathiKeyboard,
}) => {
  const zoomPercent = Math.round(zoomLevel * 100);

  const zoomStep = (delta: number) => {
    const next = Math.max(0.1, Math.min(2.0, Number((zoomLevel + delta).toFixed(2))));
    onZoomChange(next);
  };

  return (
    <div className="h-10 bg-[#18191b] border-t border-[#2d2e30] px-4 flex items-center justify-between text-xs text-gray-400 select-none shrink-0 z-20">
      
      {/* LEFT: PRESENTER TOOLS (Notes & Timer) + PAGE MANAGEMENT */}
      <div className="flex items-center gap-2">
        {/* Presenter Notes Button (Canva Image 1) */}
        {onToggleNotes && (
          <button
            onClick={onToggleNotes}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
              isNotesOpen ? 'bg-[#8b3dff] text-white' : 'hover:bg-white/10 text-gray-300'
            }`}
            title="Slide Notes"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>
        )}

        {/* Design Timer Button (Canva Image 1) */}
        {onToggleTimer && (
          <button
            onClick={onToggleTimer}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
              isTimerOpen ? 'bg-[#8b3dff] text-white' : 'hover:bg-white/10 text-gray-300'
            }`}
            title="Design Timer"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Timer</span>
          </button>
        )}

        <div className="h-3 w-px bg-[#2d2e30] mx-0.5" />

        {/* Page navigation */}
        {totalPages > 1 && (
          <button
            onClick={() => onPageChange && onPageChange(currentPage - 2)}
            disabled={currentPage <= 1}
            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-gray-300 transition-colors"
            title="Previous Page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
        <span className="font-semibold text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        {totalPages > 1 && (
          <button
            onClick={() => onPageChange && onPageChange(currentPage)}
            disabled={currentPage >= totalPages}
            className="p-1 rounded hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent text-gray-300 transition-colors"
            title="Next Page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={onAddPage}
          className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-white/10 text-gray-300 transition-colors text-[11px]"
          title="Add New Blank Page"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Page</span>
        </button>
        {onAddPageAbove && (
          <button
            onClick={onAddPageAbove}
            className="flex items-center gap-1 px-2.5 py-1 rounded hover:bg-white/10 text-purple-300 transition-colors text-[11px]"
            title="Add New Blank Page Above"
          >
            <ArrowUpToLine className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">Add Page Up</span>
          </button>
        )}
        {onDuplicatePage && (
          <button
            onClick={onDuplicatePage}
            className="flex items-center gap-1 px-2 py-1 rounded hover:bg-white/10 text-gray-300 transition-colors text-[11px]"
            title="Duplicate Current Page"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Duplicate</span>
          </button>
        )}
        {onDeletePage && totalPages > 1 && (
          <button
            onClick={onDeletePage}
            className="p-1 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
            title="Delete Current Page"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* CENTER: VIEW TOGGLES (Rulers, Margins, Grid, Pan Tool) */}
      <div className="hidden md:flex items-center gap-1 bg-[#25272a] px-2 py-0.5 rounded-lg border border-[#343538]">
        {onToggleRulers && (
          <button
            onClick={onToggleRulers}
            className={`p-1 rounded transition-colors ${showRulers ? 'bg-[#8b3dff] text-white' : 'hover:bg-white/10 text-gray-400 hover:text-gray-200'}`}
            title="Toggle Rulers (Ctrl+R)"
          >
            <Ruler className="w-3.5 h-3.5" />
          </button>
        )}
        {onToggleMargins && (
          <button
            onClick={onToggleMargins}
            className={`p-1 rounded transition-colors ${showMargins ? 'bg-[#8b3dff] text-white' : 'hover:bg-white/10 text-gray-400 hover:text-gray-200'}`}
            title="Toggle Safety Margins & Bleed"
          >
            <Scan className="w-3.5 h-3.5" />
          </button>
        )}
        {onToggleGrid && (
          <button
            onClick={onToggleGrid}
            className={`p-1 rounded transition-colors ${showGrid ? 'bg-[#8b3dff] text-white' : 'hover:bg-white/10 text-gray-400 hover:text-gray-200'}`}
            title="Toggle Precision Grid"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>
        )}
        {onTogglePanMode && (
          <button
            onClick={onTogglePanMode}
            className={`p-1 rounded transition-colors ${isPanMode ? 'bg-[#8b3dff] text-white' : 'hover:bg-white/10 text-gray-400 hover:text-gray-200'}`}
            title="Hand / Pan Tool (or hold Spacebar)"
          >
            <Hand className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* RIGHT: ZOOM & VIEW CONTROLS */}
      <div className="flex items-center gap-1.5">
        
        {/* Zoom Out */}
        <button
          onClick={() => zoomStep(-0.05)}
          className="p-1 hover:bg-white/10 rounded text-gray-300 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Slider */}
        <input
          type="range"
          min={0.15}
          max={2.5}
          step={0.05}
          value={zoomLevel}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          className="w-24 lg:w-36 accent-white bg-[#343538] cursor-pointer h-1.5 rounded-lg"
          title="Zoom level"
        />

        {/* Zoom In */}
        <button
          onClick={() => zoomStep(0.05)}
          className="p-1 hover:bg-white/10 rounded text-gray-300 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        {/* Zoom Percentage */}
        <span className="min-w-[42px] text-center font-bold text-gray-200 text-[11px]">
          {zoomPercent}%
        </span>

        <div className="h-3 w-px bg-[#2d2e30] mx-1" />

        {/* Pages / Grid view indicator */}
        <div className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#27282b] text-[11px] font-bold text-gray-300" title="Page Grid View">
          <LayoutGrid className="w-3 h-3 text-purple-400" />
          <span>{currentPage}/{totalPages}</span>
        </div>

        {/* Fit to screen */}
        <button
          onClick={onFitScreen}
          className="p-1 hover:bg-white/10 rounded text-gray-300 transition-colors"
          title="Fit to Screen"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Presentation Mode */}
        {onStartPresentation && (
          <button
            onClick={onStartPresentation}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white transition-all text-[11px] font-bold shadow-xs cursor-pointer"
            title="Present Fullscreen"
          >
            <Play className="w-3 h-3 fill-current" />
            <span className="hidden lg:inline">Present</span>
          </button>
        )}

        {/* Marathi Keyboard Assistant */}
        {onToggleMarathiKeyboard && (
          <button
            onClick={onToggleMarathiKeyboard}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white transition-colors text-[11px] font-bold cursor-pointer"
            title="Marathi InScript Keyboard & Phonetic Typing Assistant"
          >
            <span className="font-bold text-xs text-purple-400">म</span>
            <span className="hidden md:inline">मराठी कीबोर्ड</span>
          </button>
        )}

        {/* Keyboard Shortcuts */}
        {onToggleShortcuts && (
          <>
            <div className="h-3 w-px bg-[#2d2e30] mx-1" />
            <button
              onClick={onToggleShortcuts}
              className="p-1 hover:bg-white/10 rounded text-gray-300 transition-colors"
              title="Keyboard Shortcuts (?)"
            >
              <Keyboard className="w-3.5 h-3.5" />
            </button>
          </>
        )}

      </div>
    </div>
  );
};
