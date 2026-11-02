import React, { useState, useRef, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';

export type CanvaDrawToolType =
  | 'select'
  | 'pen'
  | 'shapes'
  | 'line'
  | 'sticky'
  | 'text'
  | 'calligraphy'
  | 'table';

export type CanvaBrushStyle = 'pen' | 'marker' | 'highlighter' | 'eraser';

interface CanvaDrawFloatingToolbarProps {
  isOpen: boolean;
  onClose: () => void;
  // Tool Selection
  activeTool: CanvaDrawToolType;
  onSelectTool: (tool: CanvaDrawToolType) => void;
  // Drawing Mode & Brush Configuration
  isDrawingMode: boolean;
  brushColor: string;
  onSetBrushColor: (color: string) => void;
  brushWidth: number;
  onSetBrushWidth: (width: number) => void;
  brushStyle: CanvaBrushStyle;
  onSetBrushStyle: (style: CanvaBrushStyle) => void;
  onClearDrawings?: () => void;
  // Canvas insertion callbacks
  onAddShape: (type: 'rect' | 'circle' | 'triangle' | 'star' | 'heart' | 'hexagon') => void;
  onAddLine: () => void;
  onAddStickyNote: (color?: string) => void;
  onAddText: (type?: string) => void;
  onAddCalligraphy?: () => void;
  onAddTable?: (rows?: number, cols?: number, theme?: string) => void;
}

export const CanvaDrawFloatingToolbar: React.FC<CanvaDrawFloatingToolbarProps> = ({
  isOpen,
  onClose,
  activeTool,
  onSelectTool,
  isDrawingMode,
  brushColor,
  onSetBrushColor,
  brushWidth,
  onSetBrushWidth,
  brushStyle,
  onSetBrushStyle,
  onClearDrawings,
  onAddShape,
  onAddLine,
  onAddStickyNote,
  onAddText,
  onAddCalligraphy,
  onAddTable,
}) => {
  const [isShapesSubmenuOpen, setIsShapesSubmenuOpen] = useState(false);
  const [isStickySubmenuOpen, setIsStickySubmenuOpen] = useState(false);
  const [isPenSettingsOpen, setIsPenSettingsOpen] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Preset colors for Freehand Drawing
  const BRUSH_COLORS = [
    { label: 'Red', hex: '#ef4444' },
    { label: 'Kesari', hex: '#ea580c' },
    { label: 'Yellow', hex: '#facc15' },
    { label: 'Green', hex: '#22c55e' },
    { label: 'Blue', hex: '#3b82f6' },
    { label: 'Purple', hex: '#8b3dff' },
    { label: 'Black', hex: '#18191b' },
    { label: 'White', hex: '#ffffff' },
  ];

  // Sticky Note Colors
  const STICKY_COLORS = [
    { label: 'Yellow', hex: '#fef08a' },
    { label: 'Pink', hex: '#fbcfe8' },
    { label: 'Blue', hex: '#bfdbfe' },
    { label: 'Green', hex: '#bbf7d0' },
    { label: 'Orange', hex: '#fed7aa' },
    { label: 'Purple', hex: '#e9d5ff' },
  ];

  return (
    <div
      ref={containerRef}
      data-testid="canva-draw-floating-toolbar"
      className="absolute left-[78px] top-4 z-40 flex items-start gap-2.5 select-none animate-in fade-in slide-in-from-left-2 duration-200"
    >
      {/* 1. Main Vertical Floating Dock Pillar */}
      <div className="flex flex-col items-center">
        {/* Circular Close Button (✕) matching Canva */}
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-[#20222a] hover:bg-[#2c2f3a] text-gray-300 hover:text-white flex items-center justify-center cursor-pointer shadow-lg mb-2 border border-[#2d303b] transition-colors"
          title="Close Drawing Tools"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Sleek Vertical Pill Toolbar */}
        <div className="w-[52px] bg-[#1a1c23] border border-[#2c2f3c] rounded-[26px] py-2 px-1 flex flex-col items-center gap-1.5 shadow-2xl backdrop-blur-md">
          {/* Tool 1: Pointer / Select Cursor */}
          <button
            type="button"
            onClick={() => {
              onSelectTool('select');
              setIsShapesSubmenuOpen(false);
              setIsStickySubmenuOpen(false);
            }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activeTool === 'select' && !isDrawingMode
                ? 'bg-[#594285] text-white shadow-md'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
            title="Select & Move (V)"
          >
            {/* Tilted Navigation Arrow Pointer */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M4.5 3.5L19 11.5L12 14L9.5 21L4.5 3.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </button>

          {/* Tool 2: Pen / Draw (Red Pencil drawing a curve) */}
          <button
            type="button"
            onClick={() => {
              onSelectTool('pen');
              setIsPenSettingsOpen(true);
              setIsShapesSubmenuOpen(false);
              setIsStickySubmenuOpen(false);
            }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer relative ${
              activeTool === 'pen' || isDrawingMode
                ? 'bg-[#594285] text-white shadow-md'
                : 'hover:bg-white/5'
            }`}
            title="Pen / Freehand Draw (P)"
          >
            {/* Red Stylus with Red Wavy Line beneath */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18H4.5v-3.5L16.5 3.5z"
                fill="#ef4444"
                stroke="#dc2626"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              <path d="M14.5 5.5l3 3" stroke="#ffffff" strokeWidth="1" />
              <path d="M4.5 14.5L4.5 18l3.5 0L4.5 14.5z" fill="#ffffff" />
              <path
                d="M8 20.5c2-1.5 4 1 6 0"
                stroke="#ef4444"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Tool 3: Shapes (Overlapping Grey Circle + White Rounded Rect) */}
          <button
            type="button"
            onClick={() => {
              onSelectTool('shapes');
              setIsShapesSubmenuOpen(!isShapesSubmenuOpen);
              setIsStickySubmenuOpen(false);
            }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activeTool === 'shapes' || isShapesSubmenuOpen
                ? 'bg-[#594285] shadow-md'
                : 'hover:bg-white/5'
            }`}
            title="Shapes"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="9" r="6" fill="#94a3b8" />
              <rect
                x="9"
                y="9"
                width="11"
                height="11"
                rx="3"
                fill="#ffffff"
                stroke="#1a1c23"
                strokeWidth="1.5"
              />
            </svg>
          </button>

          {/* Tool 4: Line / Connector (Blue Diagonal Line) */}
          <button
            type="button"
            onClick={() => {
              onSelectTool('line');
              onAddLine();
              setIsShapesSubmenuOpen(false);
              setIsStickySubmenuOpen(false);
            }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activeTool === 'line'
                ? 'bg-[#594285] shadow-md'
                : 'hover:bg-white/5'
            }`}
            title="Line / Connector"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <line
                x1="5"
                y1="19"
                x2="19"
                y2="5"
                stroke="#3b82f6"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Tool 5: Sticky Note (Yellow note with folded corner) */}
          <button
            type="button"
            onClick={() => {
              onSelectTool('sticky');
              setIsStickySubmenuOpen(!isStickySubmenuOpen);
              setIsShapesSubmenuOpen(false);
            }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activeTool === 'sticky' || isStickySubmenuOpen
                ? 'bg-[#594285] shadow-md'
                : 'hover:bg-white/5'
            }`}
            title="Sticky Note"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 4h14a1 1 0 0 1 1 1v9l-5 5H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z"
                fill="#facc15"
              />
              <path
                d="M14 14h5.5l-5.5 5.5v-5.5z"
                fill="#ca8a04"
              />
            </svg>
          </button>

          {/* Tool 6: Text (Bold Purple T) */}
          <button
            type="button"
            onClick={() => {
              onSelectTool('text');
              onAddText('heading');
              setIsShapesSubmenuOpen(false);
              setIsStickySubmenuOpen(false);
            }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activeTool === 'text'
                ? 'bg-[#594285] shadow-md'
                : 'hover:bg-white/5'
            }`}
            title="Add Text (T)"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 6h14v3.5h-5.2v10.5h-3.6V9.5H5V6z"
                fill="#c084fc"
              />
            </svg>
          </button>

          {/* Tool 7: Signature / Calligraphy Flourish */}
          <button
            type="button"
            onClick={() => {
              onSelectTool('calligraphy');
              if (onAddCalligraphy) onAddCalligraphy();
              setIsShapesSubmenuOpen(false);
              setIsStickySubmenuOpen(false);
            }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activeTool === 'calligraphy'
                ? 'bg-[#594285] shadow-md'
                : 'hover:bg-white/5'
            }`}
            title="Calligraphy & Signature"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 17.5c2.5-3.5 5-9 6-9s-1.5 11.5 2.5 11.5 5.5-6.5 7.5-6.5 0.5 4 2 4"
                stroke="#ffffff"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Tool 8: Table (White Table Grid) */}
          <button
            type="button"
            onClick={() => {
              onSelectTool('table');
              if (onAddTable) onAddTable(3, 3, 'purple');
              setIsShapesSubmenuOpen(false);
              setIsStickySubmenuOpen(false);
            }}
            className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all cursor-pointer ${
              activeTool === 'table'
                ? 'bg-[#594285] shadow-md'
                : 'hover:bg-white/5'
            }`}
            title="Table Grid"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect
                x="3.5"
                y="3.5"
                width="17"
                height="17"
                rx="3.5"
                stroke="#ffffff"
                strokeWidth="2"
              />
              <line x1="3.5" y1="12" x2="20.5" y2="12" stroke="#ffffff" strokeWidth="1.8" />
              <line x1="9.5" y1="3.5" x2="9.5" y2="20.5" stroke="#ffffff" strokeWidth="1.8" />
              <line x1="15" y1="3.5" x2="15" y2="20.5" stroke="#ffffff" strokeWidth="1.8" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Flyout Sub-panel: Pen & Brush Settings (when Pen active or open) */}
      {(activeTool === 'pen' || isDrawingMode) && isPenSettingsOpen && (
        <div
          data-testid="draw-brush-panel"
          className="w-64 bg-[#181920] border border-[#2d303b] rounded-2xl p-4 shadow-2xl space-y-3.5 text-xs text-gray-200 mt-10 backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-[#282a35] pb-2">
            <span className="font-extrabold text-white text-xs">Pen & Brush Options</span>
            <button
              type="button"
              onClick={() => setIsPenSettingsOpen(false)}
              className="text-gray-400 hover:text-white text-xs cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Brush Style Selector: Pen, Marker, Highlighter, Eraser */}
          <div>
            <span className="text-[11px] font-bold text-gray-400 block mb-1.5">Brush Type</span>
            <div className="grid grid-cols-4 gap-1">
              {[
                { id: 'pen', label: 'Pen', icon: '✏️' },
                { id: 'marker', label: 'Marker', icon: '🖊️' },
                { id: 'highlighter', label: 'Highlight', icon: '🖍️' },
                { id: 'eraser', label: 'Eraser', icon: '🧹' },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => onSetBrushStyle(b.id as CanvaBrushStyle)}
                  className={`py-1.5 px-1 rounded-lg text-center flex flex-col items-center gap-0.5 border text-[10px] font-bold transition-all cursor-pointer ${
                    brushStyle === b.id
                      ? 'bg-purple-600 text-white border-purple-400 shadow-xs'
                      : 'bg-[#22242c] hover:bg-[#2b2e38] border-[#343744] text-gray-300'
                  }`}
                >
                  <span className="text-sm">{b.icon}</span>
                  <span>{b.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brush Color Swatches */}
          {brushStyle !== 'eraser' && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-bold text-gray-400">Color</span>
                <span className="text-[11px] font-mono font-bold text-purple-400">{brushColor}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {BRUSH_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => onSetBrushColor(c.hex)}
                    className={`h-7 rounded-lg border transition-transform cursor-pointer relative overflow-hidden flex items-center justify-center ${
                      brushColor.toLowerCase() === c.hex.toLowerCase()
                        ? 'scale-105 border-white ring-2 ring-purple-500'
                        : 'border-[#3a3c48] hover:scale-105'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.label}
                  />
                ))}
              </div>
              {/* Custom Color Input */}
              <div className="flex items-center gap-2 mt-2 pt-1 border-t border-[#282a35]">
                <label className="flex items-center gap-2 text-[11px] text-gray-300 cursor-pointer">
                  <input
                    type="color"
                    value={brushColor.startsWith('#') ? brushColor : '#ea580c'}
                    onChange={(e) => onSetBrushColor(e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                  />
                  <span>Custom color</span>
                </label>
              </div>
            </div>
          )}

          {/* Brush Width Slider & Presets */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-gray-400">Stroke Thickness</span>
              <span className="text-[11px] font-mono font-bold text-purple-400">{brushWidth}px</span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              value={brushWidth}
              onChange={(e) => onSetBrushWidth(Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
            {/* Quick Presets */}
            <div className="grid grid-cols-4 gap-1 mt-1.5">
              {[
                { label: '2px', val: 2 },
                { label: '6px', val: 6 },
                { label: '14px', val: 14 },
                { label: '28px', val: 28 },
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => onSetBrushWidth(p.val)}
                  className={`py-1 rounded text-[10px] font-bold border cursor-pointer transition-colors ${
                    brushWidth === p.val
                      ? 'bg-purple-600 text-white border-purple-400'
                      : 'bg-[#22242c] hover:bg-[#2b2e38] border-[#343744] text-gray-300'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Clear Drawings Button */}
          {onClearDrawings && (
            <div className="pt-2 border-t border-[#282a35]">
              <button
                type="button"
                onClick={onClearDrawings}
                className="w-full py-1.5 px-3 bg-[#241f2a] hover:bg-rose-950/60 text-rose-300 hover:text-rose-200 border border-rose-500/30 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Freehand Drawings</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. Flyout Sub-panel: Quick Shapes Picker */}
      {isShapesSubmenuOpen && (
        <div
          data-testid="draw-shapes-panel"
          className="w-48 bg-[#181920] border border-[#2d303b] rounded-2xl p-3 shadow-2xl space-y-2 text-xs text-gray-200 mt-20 backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-[#282a35] pb-1.5">
            <span className="font-extrabold text-white text-xs">Shapes</span>
            <button
              type="button"
              onClick={() => setIsShapesSubmenuOpen(false)}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {[
              { id: 'rect', label: 'Square', shape: '▢' },
              { id: 'circle', label: 'Circle', shape: '○' },
              { id: 'triangle', label: 'Triangle', shape: '△' },
              { id: 'star', label: 'Star', shape: '★' },
              { id: 'hexagon', label: 'Hexagon', shape: '⬡' },
              { id: 'heart', label: 'Heart', shape: '♥' },
            ].map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  onAddShape(s.id as any);
                  setIsShapesSubmenuOpen(false);
                }}
                className="p-2 rounded-xl bg-[#22242c] hover:bg-purple-600 hover:text-white border border-[#343744] flex flex-col items-center justify-center gap-1 transition-all cursor-pointer text-gray-200"
                title={`Add ${s.label}`}
              >
                <span className="text-xl font-bold leading-none">{s.shape}</span>
                <span className="text-[9px] font-semibold">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Flyout Sub-panel: Quick Sticky Notes Color Picker */}
      {isStickySubmenuOpen && (
        <div
          data-testid="draw-sticky-panel"
          className="w-48 bg-[#181920] border border-[#2d303b] rounded-2xl p-3 shadow-2xl space-y-2 text-xs text-gray-200 mt-36 backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-[#282a35] pb-1.5">
            <span className="font-extrabold text-white text-xs">Sticky Notes</span>
            <button
              type="button"
              onClick={() => setIsStickySubmenuOpen(false)}
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-[10px] text-gray-400">Click a color to drop a sticky note onto canvas:</p>
          <div className="grid grid-cols-3 gap-2 pt-1">
            {STICKY_COLORS.map((st) => (
              <button
                key={st.hex}
                type="button"
                onClick={() => {
                  onAddStickyNote(st.hex);
                  setIsStickySubmenuOpen(false);
                }}
                className="aspect-square rounded-xl shadow-md border border-black/20 hover:scale-110 transition-transform cursor-pointer flex flex-col items-center justify-between p-1.5"
                style={{ backgroundColor: st.hex }}
                title={`Add ${st.label} Note`}
              >
                <span className="text-[11px] font-bold text-gray-800">📝</span>
                <span className="text-[8px] font-bold text-gray-800">{st.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
