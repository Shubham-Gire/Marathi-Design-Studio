import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, X, Check, FileText, Smartphone, Monitor, LayoutTemplate } from 'lucide-react';

export type RulerUnit = 'px' | 'in' | 'cm' | 'mm';

export interface PosterPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  ratio: string;
  category: string;
  description: string;
}

export const POSTER_PRESETS: PosterPreset[] = [
  {
    id: 'canva-poster',
    name: 'Canva Poster (Portrait)',
    width: 1080,
    height: 1350,
    ratio: '4:5',
    category: 'Festival & Event',
    description: '1080 × 1350 px • Traditional & Modern Marathi Posters',
  },
  {
    id: 'print-poster-18x24',
    name: 'Standard Print Wall Poster',
    width: 1728,
    height: 2304,
    ratio: '3:4',
    category: 'Print',
    description: '18 × 24 in (1728 × 2304 px) • Physical Poster Frame',
  },
  {
    id: 'a4-poster',
    name: 'A4 Print Poster / Flyer',
    width: 842,
    height: 1191,
    ratio: '1:√2',
    category: 'Print',
    description: '210 × 297 mm (842 × 1191 px) • Commercial & Shop Flyer',
  },
  {
    id: 'a3-poster',
    name: 'A3 Grand Poster',
    width: 1191,
    height: 1684,
    ratio: '1:√2',
    category: 'Print',
    description: '297 × 420 mm (1191 × 1684 px) • Grand Exhibition & Notice',
  },
  {
    id: 'digital-poster',
    name: 'Digital / Story Poster',
    width: 1080,
    height: 1920,
    ratio: '9:16',
    category: 'Digital',
    description: '1080 × 1920 px • Mobile Status, Reel & Story Poster',
  },
  {
    id: 'insta-square',
    name: 'Instagram Square Banner',
    width: 1080,
    height: 1080,
    ratio: '1:1',
    category: 'Social',
    description: '1080 × 1080 px • Square Social Media Post',
  },
];

const UNIT_CONVERSIONS: Record<RulerUnit, { pxPerUnit: number; label: string; symbol: string }> = {
  px: { pxPerUnit: 1, label: 'Pixels', symbol: 'px' },
  in: { pxPerUnit: 96, label: 'Inches', symbol: '″' },
  cm: { pxPerUnit: 37.795, label: 'Centimeters', symbol: 'cm' },
  mm: { pxPerUnit: 3.7795, label: 'Millimeters', symbol: 'mm' },
};

export interface CanvaRulersProps {
  width: number;
  height: number;
  zoomLevel: number;
  showRulers: boolean;
  showMargins: boolean;
  showGrid: boolean;
  cursorPos?: { x: number; y: number } | null;
  selectedBounds?: { left: number; top: number; width: number; height: number } | null;
  horizontalGuides?: number[];
  verticalGuides?: number[];
  onAddHorizontalGuide?: (y: number) => void;
  onAddVerticalGuide?: (x: number) => void;
  onUpdateHorizontalGuide?: (index: number, y: number) => void;
  onUpdateVerticalGuide?: (index: number, x: number) => void;
  onRemoveHorizontalGuide?: (index: number) => void;
  onRemoveVerticalGuide?: (index: number) => void;
  onClearAllGuides?: () => void;
  onSelectDimensions?: (width: number, height: number) => void;
}

export const CanvaRulers: React.FC<CanvaRulersProps> = ({
  width,
  height,
  zoomLevel,
  showRulers,
  showMargins,
  showGrid,
  cursorPos,
  selectedBounds,
  horizontalGuides = [],
  verticalGuides = [],
  onAddHorizontalGuide,
  onAddVerticalGuide,
  onUpdateHorizontalGuide,
  onUpdateVerticalGuide,
  onRemoveHorizontalGuide,
  onRemoveVerticalGuide,
  onClearAllGuides,
  onSelectDimensions,
}) => {
  const scaledWidth = width * zoomLevel;
  const scaledHeight = height * zoomLevel;

  // Margin guide (5% bleed inset)
  const marginInsetX = width * 0.05;
  const marginInsetY = height * 0.05;

  // Active unit state (px, in, cm, mm)
  const [unit, setUnit] = useState<RulerUnit>(() => {
    try {
      const saved = localStorage.getItem('canva_ruler_unit');
      if (saved && (saved === 'px' || saved === 'in' || saved === 'cm' || saved === 'mm')) {
        return saved as RulerUnit;
      }
    } catch {}
    return 'px';
  });

  const handleUnitChange = (newUnit: RulerUnit) => {
    setUnit(newUnit);
    try {
      localStorage.setItem('canva_ruler_unit', newUnit);
    } catch {}
  };

  // Convert pixel value to current unit
  const pxToUnitValue = (px: number) => {
    const factor = UNIT_CONVERSIONS[unit].pxPerUnit;
    const raw = px / factor;
    if (unit === 'px') return Math.round(raw);
    if (unit === 'in') return Number(raw.toFixed(1));
    if (unit === 'cm') return Number(raw.toFixed(1));
    return Math.round(raw);
  };

  // Format value with unit symbol
  const formatValue = (px: number) => {
    const val = pxToUnitValue(px);
    if (unit === 'in') return `${val}″`;
    if (unit === 'cm') return `${val}cm`;
    if (unit === 'mm') return `${val}mm`;
    return `${val}`;
  };

  // Check if current dimensions match a known poster preset
  const currentPosterPreset = POSTER_PRESETS.find(
    (p) => Math.abs(p.width - width) < 2 && Math.abs(p.height - height) < 2
  );

  // Corner unit menu dropdown
  const [isCornerMenuOpen, setIsCornerMenuOpen] = useState(false);
  const cornerMenuRef = useRef<HTMLDivElement>(null);

  // Active guide drag state
  const [draggingGuide, setDraggingGuide] = useState<{ type: 'h' | 'v'; index: number } | null>(null);

  // Close corner menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cornerMenuRef.current && !cornerMenuRef.current.contains(e.target as Node)) {
        setIsCornerMenuOpen(false);
      }
    };
    if (isCornerMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCornerMenuOpen]);

  // Global mousemove and mouseup listeners for guide dragging
  useEffect(() => {
    if (!draggingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      const stageWrapper = document.getElementById('fabric-stage-wrapper');
      if (!stageWrapper) return;

      const rect = stageWrapper.getBoundingClientRect();
      const snapDistance = 6;

      if (draggingGuide.type === 'h') {
        let y = Math.round((e.clientY - rect.top) / zoomLevel);
        // Magnetic snap to center & margins
        if (Math.abs(y - height / 2) < snapDistance) y = Math.round(height / 2);
        if (Math.abs(y - marginInsetY) < snapDistance) y = Math.round(marginInsetY);
        if (Math.abs(y - (height - marginInsetY)) < snapDistance) y = Math.round(height - marginInsetY);

        onUpdateHorizontalGuide?.(draggingGuide.index, y);
      } else {
        let x = Math.round((e.clientX - rect.left) / zoomLevel);
        // Magnetic snap to center & margins
        if (Math.abs(x - width / 2) < snapDistance) x = Math.round(width / 2);
        if (Math.abs(x - marginInsetX) < snapDistance) x = Math.round(marginInsetX);
        if (Math.abs(x - (width - marginInsetX)) < snapDistance) x = Math.round(width - marginInsetX);

        onUpdateVerticalGuide?.(draggingGuide.index, x);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      const stageWrapper = document.getElementById('fabric-stage-wrapper');
      if (stageWrapper) {
        const rect = stageWrapper.getBoundingClientRect();
        if (draggingGuide.type === 'h') {
          const y = (e.clientY - rect.top) / zoomLevel;
          // If dragged off canvas or into ruler area, remove guide
          if (y < -15 || y > height + 25) {
            onRemoveHorizontalGuide?.(draggingGuide.index);
          }
        } else {
          const x = (e.clientX - rect.left) / zoomLevel;
          // If dragged off canvas or into ruler area, remove guide
          if (x < -15 || x > width + 25) {
            onRemoveVerticalGuide?.(draggingGuide.index);
          }
        }
      }
      setDraggingGuide(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [
    draggingGuide,
    zoomLevel,
    width,
    height,
    marginInsetX,
    marginInsetY,
    onUpdateHorizontalGuide,
    onUpdateVerticalGuide,
    onRemoveHorizontalGuide,
    onRemoveVerticalGuide,
  ]);

  // Adaptive dynamic tick interval calculation based on active unit and zoom level
  const calculateAdaptiveTicks = (dimensionPx: number) => {
    const minPixelSpacing = 68; // Minimum screen pixels between major labels
    const pxPerUnit = UNIT_CONVERSIONS[unit].pxPerUnit;

    let majorStepUnits = 100;
    let minorStepUnits = 20;

    if (unit === 'px') {
      const targetStepPx = minPixelSpacing / Math.max(0.08, zoomLevel);
      const candidateSteps = [10, 20, 50, 100, 200, 500, 1000, 2000];
      majorStepUnits = candidateSteps.find((s) => s >= targetStepPx) || 1000;
      minorStepUnits =
        majorStepUnits <= 20
          ? 5
          : majorStepUnits <= 50
          ? 10
          : majorStepUnits <= 100
          ? 20
          : majorStepUnits <= 200
          ? 50
          : majorStepUnits <= 500
          ? 100
          : 200;
    } else if (unit === 'in') {
      const targetStepUnits = minPixelSpacing / (pxPerUnit * Math.max(0.08, zoomLevel));
      const candidateSteps = [0.25, 0.5, 1, 2, 5, 10];
      majorStepUnits = candidateSteps.find((s) => s >= targetStepUnits) || 5;
      minorStepUnits = majorStepUnits <= 1 ? 0.25 : majorStepUnits <= 2 ? 0.5 : 1;
    } else if (unit === 'cm') {
      const targetStepUnits = minPixelSpacing / (pxPerUnit * Math.max(0.08, zoomLevel));
      const candidateSteps = [1, 2, 5, 10, 20, 50];
      majorStepUnits = candidateSteps.find((s) => s >= targetStepUnits) || 10;
      minorStepUnits = majorStepUnits <= 2 ? 0.5 : majorStepUnits <= 5 ? 1 : 2;
    } else {
      // mm
      const targetStepUnits = minPixelSpacing / (pxPerUnit * Math.max(0.08, zoomLevel));
      const candidateSteps = [10, 20, 50, 100, 200, 500];
      majorStepUnits = candidateSteps.find((s) => s >= targetStepUnits) || 100;
      minorStepUnits = majorStepUnits <= 20 ? 5 : majorStepUnits <= 50 ? 10 : 20;
    }

    const majorStepPx = majorStepUnits * pxPerUnit;
    const minorStepPx = minorStepUnits * pxPerUnit;

    const ticks: { px: number; label: string; isMajor: boolean; isMid: boolean }[] = [];
    const maxPx = Math.ceil(dimensionPx / minorStepPx) * minorStepPx;

    for (let px = 0; px <= maxPx; px += minorStepPx) {
      if (px > dimensionPx + 2) break;
      const unitVal = px / pxPerUnit;
      const isMajor = Math.abs(unitVal % majorStepUnits) < 0.001 || Math.abs((unitVal % majorStepUnits) - majorStepUnits) < 0.001;
      const isMid = !isMajor && (Math.abs(unitVal % (majorStepUnits / 2)) < 0.001);

      let label = '';
      if (isMajor) {
        if (unit === 'px') label = `${Math.round(unitVal)}`;
        else if (unit === 'in') label = `${Number(unitVal.toFixed(1))}″`;
        else if (unit === 'cm') label = `${Number(unitVal.toFixed(1))}`;
        else label = `${Math.round(unitVal)}`;
      }

      ticks.push({ px, label, isMajor, isMid });
    }

    return { ticks, majorStepPx, minorStepPx };
  };

  const horizontalTicks = calculateAdaptiveTicks(width);
  const verticalTicks = calculateAdaptiveTicks(height);

  // Drag down from top ruler to create a horizontal guide
  const handleTopRulerMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const stageWrapper = document.getElementById('fabric-stage-wrapper');
    if (!stageWrapper) return;
    const rect = stageWrapper.getBoundingClientRect();
    const initY = Math.max(20, Math.round((e.clientY - rect.top) / zoomLevel));
    if (onAddHorizontalGuide) {
      onAddHorizontalGuide(initY);
      setDraggingGuide({ type: 'h', index: horizontalGuides.length });
    }
  };

  // Drag right from left ruler to create a vertical guide
  const handleLeftRulerMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    const stageWrapper = document.getElementById('fabric-stage-wrapper');
    if (!stageWrapper) return;
    const rect = stageWrapper.getBoundingClientRect();
    const initX = Math.max(20, Math.round((e.clientX - rect.left) / zoomLevel));
    if (onAddVerticalGuide) {
      onAddVerticalGuide(initX);
      setDraggingGuide({ type: 'v', index: verticalGuides.length });
    }
  };

  // Double click ruler to add guide at cursor position
  const handleTopRulerDoubleClick = (e: React.MouseEvent) => {
    const stageWrapper = document.getElementById('fabric-stage-wrapper');
    if (!stageWrapper) return;
    const rect = stageWrapper.getBoundingClientRect();
    const x = Math.round((e.clientX - rect.left) / zoomLevel);
    if (x >= 0 && x <= width && onAddVerticalGuide) {
      onAddVerticalGuide(x);
    }
  };

  const handleLeftRulerDoubleClick = (e: React.MouseEvent) => {
    const stageWrapper = document.getElementById('fabric-stage-wrapper');
    if (!stageWrapper) return;
    const rect = stageWrapper.getBoundingClientRect();
    const y = Math.round((e.clientY - rect.top) / zoomLevel);
    if (y >= 0 && y <= height && onAddHorizontalGuide) {
      onAddHorizontalGuide(y);
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP-LEFT CORNER JUNCTION BOX (ORIGIN, POSTER SIZES & UNITS MENU)      */}
      {/* ========================================================================= */}
      {showRulers && (
        <div
          ref={cornerMenuRef}
          className="absolute -top-6 -left-8 w-8 h-6 bg-[#1e2024] hover:bg-[#282a2e] text-[#a0a5ad] hover:text-white border-r border-b border-[#343538] select-none flex items-center justify-center text-[10px] font-mono font-bold cursor-pointer pointer-events-auto z-40 transition-colors shadow-xs"
          onClick={() => setIsCornerMenuOpen(!isCornerMenuOpen)}
          title="Ruler Origin & Poster Size Menu • Click to Change Units or Poster Format"
          data-testid="ruler-origin-box"
        >
          <span className="text-purple-400 font-extrabold">{unit}</span>

          {/* Corner Dropdown: Poster Presets & Units */}
          {isCornerMenuOpen && (
            <div
              className="absolute left-0 top-7 w-64 bg-[#18191b] border border-[#343538] rounded-xl shadow-2xl p-2.5 text-xs text-gray-200 z-50 flex flex-col gap-2 backdrop-blur-md cursor-default select-none pointer-events-auto animate-in fade-in zoom-in duration-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with Active Poster Metric */}
              <div className="flex items-center justify-between pb-1.5 border-b border-[#2d2e30]">
                <div className="flex items-center gap-1.5">
                  <LayoutTemplate className="w-3.5 h-3.5 text-purple-400" />
                  <span className="font-bold text-white text-[11px]">Poster Ruler & Size</span>
                </div>
                <span className="text-[10px] text-purple-400 font-mono font-bold">
                  {width}×{height} px
                </span>
              </div>

              {/* Units Switcher Bar */}
              <div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                  <span>Ruler Units</span>
                  <span className="text-gray-500 font-normal">Active: {UNIT_CONVERSIONS[unit].label}</span>
                </div>
                <div className="grid grid-cols-4 gap-1 p-0.5 bg-[#121315] rounded-lg border border-[#2d2e30]">
                  {(['px', 'in', 'cm', 'mm'] as RulerUnit[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      data-testid={`ruler-unit-${u}`}
                      onClick={() => handleUnitChange(u)}
                      className={`py-1 text-[11px] font-mono font-bold rounded transition-colors cursor-pointer text-center ${
                        unit === u
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'text-gray-400 hover:text-white hover:bg-[#282a2e]'
                      }`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Poster Formats */}
              {onSelectDimensions && (
                <div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Poster Formats
                  </div>
                  <div className="flex flex-col gap-1 max-h-48 overflow-y-auto pr-0.5 custom-scrollbar">
                    {POSTER_PRESETS.map((preset) => {
                      const isActive = Math.abs(preset.width - width) < 2 && Math.abs(preset.height - height) < 2;
                      return (
                        <button
                          key={preset.id}
                          type="button"
                          onClick={() => {
                            onSelectDimensions(preset.width, preset.height);
                            setIsCornerMenuOpen(false);
                          }}
                          className={`flex items-start justify-between px-2 py-1.5 rounded-lg text-left transition-colors cursor-pointer border ${
                            isActive
                              ? 'bg-purple-600/20 border-purple-500/60 text-purple-200'
                              : 'border-transparent hover:bg-[#282a2e] text-gray-300'
                          }`}
                        >
                          <div>
                            <div className="font-bold text-[11px] flex items-center gap-1.5">
                              <span>{preset.name}</span>
                              {isActive && <Check className="w-3 h-3 text-purple-400" />}
                            </div>
                            <div className="text-[10px] text-gray-400 font-mono mt-0.5">
                              {preset.width} × {preset.height} px ({preset.ratio})
                            </div>
                          </div>
                          <span className="text-[9px] bg-[#222428] px-1 py-0.5 rounded text-gray-400 shrink-0 font-medium">
                            {preset.category}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Guide Quick Tools */}
              <div className="border-t border-[#2d2e30] pt-1.5 flex flex-col gap-1">
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  Poster Guides & Snap
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onAddHorizontalGuide?.(Math.round(height / 2));
                    onAddVerticalGuide?.(Math.round(width / 2));
                    setIsCornerMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-[#282a2e] rounded-lg text-left text-xs transition-colors cursor-pointer text-gray-200 hover:text-purple-300"
                >
                  <Plus className="w-3.5 h-3.5 text-purple-400" />
                  <span>Add Poster Center Crosshair</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onAddHorizontalGuide?.(Math.round(marginInsetY));
                    onAddHorizontalGuide?.(Math.round(height - marginInsetY));
                    onAddVerticalGuide?.(Math.round(marginInsetX));
                    onAddVerticalGuide?.(Math.round(width - marginInsetX));
                    setIsCornerMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-2 py-1 hover:bg-[#282a2e] rounded-lg text-left text-xs transition-colors cursor-pointer text-gray-200 hover:text-purple-300"
                >
                  <Plus className="w-3.5 h-3.5 text-sky-400" />
                  <span>Add 5% Safe Print Margin Guides</span>
                </button>

                {(horizontalGuides.length > 0 || verticalGuides.length > 0) && (
                  <button
                    type="button"
                    onClick={() => {
                      onClearAllGuides?.();
                      setIsCornerMenuOpen(false);
                    }}
                    className="flex items-center gap-2 px-2 py-1 hover:bg-red-500/20 text-red-400 rounded-lg text-left text-xs transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear All Guides ({horizontalGuides.length + verticalGuides.length})</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TOP HORIZONTAL RULER (ALIGNED WITH POSTER WIDTH)                      */}
      {/* ========================================================================= */}
      {showRulers && (
        <div
          onMouseDown={handleTopRulerMouseDown}
          onDoubleClick={handleTopRulerDoubleClick}
          className="absolute -top-6 left-0 h-6 bg-[#1e2024] text-[#8e929b] border-b border-[#343538] select-none text-[9px] font-mono pointer-events-auto cursor-row-resize overflow-hidden z-30 transition-none"
          style={{ width: `${scaledWidth}px` }}
          title={`Top Ruler: Poster Width (${width}px • ${formatValue(width)}) • Drag down to pull a horizontal guide • Double click to add vertical guide`}
          data-testid="top-poster-ruler"
        >
          {/* Active Selection Highlight Span */}
          {selectedBounds && (
            <div
              className="absolute top-0 bottom-0 bg-[#8b3dff]/25 border-x border-[#8b3dff]/70 pointer-events-none transition-none z-10"
              style={{
                left: `${Math.max(0, selectedBounds.left * zoomLevel)}px`,
                width: `${Math.max(2, Math.min(scaledWidth - selectedBounds.left * zoomLevel, selectedBounds.width * zoomLevel))}px`,
              }}
            />
          )}

          {/* Dynamic Adaptive Ticks */}
          {horizontalTicks.ticks.map(({ px, label, isMajor, isMid }) => {
            const leftPos = px * zoomLevel;
            if (leftPos > scaledWidth - 4 && px < width - 10) return null;

            return (
              <div
                key={`h-${px}`}
                className="absolute top-0 bottom-0 flex flex-col justify-end pointer-events-none"
                style={{ left: `${leftPos}px` }}
              >
                <div
                  className={`w-px ${
                    isMajor
                      ? 'h-3 bg-[#a0a5ad]'
                      : isMid
                      ? 'h-2 bg-[#60646c]'
                      : 'h-1.5 bg-[#40434a]'
                  }`}
                />
                {isMajor && label && (
                  <span className="absolute left-1 bottom-0.5 leading-none font-semibold text-[#8e929b] select-none">
                    {label}
                  </span>
                )}
              </div>
            );
          })}

          {/* Poster Center Marker */}
          <div
            className="absolute top-0 bottom-0 flex flex-col justify-end pointer-events-none z-15"
            style={{ left: `${(width / 2) * zoomLevel}px` }}
            title={`Poster Center: ${Math.round(width / 2)}px`}
          >
            <div className="w-px h-3.5 bg-purple-400" />
            <div className="w-1 h-1 rounded-full bg-purple-400 absolute -left-0.5 top-0.5" />
          </div>

          {/* Poster End Boundary Marker (Exact Poster Width) */}
          <div
            className="absolute top-0 bottom-0 right-0 border-r-2 border-purple-500 z-25 pointer-events-none flex items-center pr-1"
            data-testid="ruler-poster-end-width"
            title={`Poster End Boundary: ${width}px (${formatValue(width)})`}
          >
            <span className="text-[8px] font-mono font-extrabold text-white bg-purple-600/90 px-1 py-0.5 rounded-xs leading-none shadow-xs whitespace-nowrap">
              {formatValue(width)}
            </span>
          </div>

          {/* Instantaneous Cursor X Needle & Pill Badge */}
          {cursorPos && cursorPos.x >= 0 && cursorPos.x <= width && (
            <div
              className="absolute top-0 bottom-0 pointer-events-none z-20 transition-none"
              style={{ left: `${cursorPos.x * zoomLevel}px` }}
            >
              <div className="w-0.5 h-full bg-[#8b3dff]" />
              <div className="absolute top-0.5 -translate-x-1/2 bg-[#8b3dff] text-white text-[8px] font-mono font-bold px-1 rounded-xs shadow-xs leading-none py-0.5 whitespace-nowrap">
                {formatValue(cursorPos.x)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. LEFT VERTICAL RULER (ALIGNED WITH POSTER HEIGHT, CLEAR LABELS)        */}
      {/* ========================================================================= */}
      {showRulers && (
        <div
          onMouseDown={handleLeftRulerMouseDown}
          onDoubleClick={handleLeftRulerDoubleClick}
          className="absolute top-0 -left-8 w-8 bg-[#1e2024] text-[#8e929b] border-r border-[#343538] select-none text-[9px] font-mono pointer-events-auto cursor-col-resize overflow-hidden z-30 transition-none"
          style={{ height: `${scaledHeight}px` }}
          title={`Left Ruler: Poster Height (${height}px • ${formatValue(height)}) • Drag right to pull a vertical guide • Double click to add horizontal guide`}
          data-testid="left-poster-ruler"
        >
          {/* Active Selection Highlight Span */}
          {selectedBounds && (
            <div
              className="absolute left-0 right-0 bg-[#8b3dff]/25 border-y border-[#8b3dff]/70 pointer-events-none transition-none z-10"
              style={{
                top: `${Math.max(0, selectedBounds.top * zoomLevel)}px`,
                height: `${Math.max(2, Math.min(scaledHeight - selectedBounds.top * zoomLevel, selectedBounds.height * zoomLevel))}px`,
              }}
            />
          )}

          {/* Dynamic Adaptive Ticks */}
          {verticalTicks.ticks.map(({ px, label, isMajor, isMid }) => {
            const topPos = px * zoomLevel;
            if (topPos > scaledHeight - 4 && px < height - 10) return null;

            return (
              <div
                key={`v-${px}`}
                className="absolute left-0 right-0 flex items-center justify-end pointer-events-none"
                style={{ top: `${topPos}px` }}
              >
                <div
                  className={`h-px ${
                    isMajor
                      ? 'w-2.5 bg-[#a0a5ad]'
                      : isMid
                      ? 'w-1.5 bg-[#60646c]'
                      : 'w-1 bg-[#40434a]'
                  }`}
                />
                {isMajor && label && (
                  <span className="absolute right-3 leading-none text-[8px] font-mono font-bold text-[#a0a5ad] -translate-y-1/2 select-none">
                    {label}
                  </span>
                )}
              </div>
            );
          })}

          {/* Poster Center Marker */}
          <div
            className="absolute left-0 right-0 flex items-center justify-end pointer-events-none z-15"
            style={{ top: `${(height / 2) * zoomLevel}px` }}
            title={`Poster Center: ${Math.round(height / 2)}px`}
          >
            <div className="h-px w-3 bg-purple-400" />
            <div className="w-1 h-1 rounded-full bg-purple-400 absolute left-1 -top-0.5" />
          </div>

          {/* Poster End Boundary Marker (Exact Poster Height) */}
          <div
            className="absolute left-0 right-0 bottom-0 border-b-2 border-purple-500 z-25 pointer-events-none flex flex-col items-center pb-0.5"
            data-testid="ruler-poster-end-height"
            title={`Poster End Boundary: ${height}px (${formatValue(height)})`}
          >
            <span className="text-[7.5px] font-mono font-extrabold text-white bg-purple-600/90 px-0.5 py-0.5 rounded-xs leading-none shadow-xs whitespace-nowrap">
              {formatValue(height)}
            </span>
          </div>

          {/* Instantaneous Cursor Y Needle & Pill Badge */}
          {cursorPos && cursorPos.y >= 0 && cursorPos.y <= height && (
            <div
              className="absolute left-0 right-0 pointer-events-none z-20 transition-none"
              style={{ top: `${cursorPos.y * zoomLevel}px` }}
            >
              <div className="h-0.5 w-full bg-[#8b3dff]" />
              <div className="absolute left-0.5 -translate-y-1/2 bg-[#8b3dff] text-white text-[8px] font-mono font-bold px-0.5 rounded-xs shadow-xs leading-none py-0.5 whitespace-nowrap">
                {formatValue(cursorPos.y)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. INTERACTIVE GUIDE LINES (CANVA GUIDES SYSTEM)                          */}
      {/* ========================================================================= */}
      {showRulers && (
        <>
          {/* Horizontal Guides */}
          {horizontalGuides.map((gy, idx) => {
            const topScreen = gy * zoomLevel;
            return (
              <div
                key={`h-guide-${idx}-${gy}`}
                className="absolute left-0 right-0 group z-35 select-none cursor-row-resize pointer-events-auto"
                style={{ top: `${topScreen}px`, height: '9px', marginTop: '-4px' }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDraggingGuide({ type: 'h', index: idx });
                }}
              >
                {/* Thin Purple / Cyan Guideline */}
                <div className="w-full h-px bg-[#8b3dff] group-hover:h-0.5 group-hover:bg-[#a855f7] transition-all shadow-[0_0_4px_rgba(139,61,255,0.6)]" />

                {/* Coordinate Badge & Delete Pill */}
                <div className="absolute left-3 -top-5 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 bg-[#1e2024]/95 text-purple-300 border border-[#8b3dff] text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-lg z-40 backdrop-blur-md transition-opacity">
                  <span>Y: {formatValue(gy)}</span>
                  <button
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      onRemoveHorizontalGuide?.(idx);
                    }}
                    className="hover:text-red-400 text-gray-400 font-bold ml-1 cursor-pointer transition-colors"
                    title="Remove Guide"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Vertical Guides */}
          {verticalGuides.map((gx, idx) => {
            const leftScreen = gx * zoomLevel;
            return (
              <div
                key={`v-guide-${idx}-${gx}`}
                className="absolute top-0 bottom-0 group z-35 select-none cursor-col-resize pointer-events-auto"
                style={{ left: `${leftScreen}px`, width: '9px', marginLeft: '-4px' }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setDraggingGuide({ type: 'v', index: idx });
                }}
              >
                {/* Thin Purple / Cyan Guideline */}
                <div className="h-full w-px bg-[#8b3dff] group-hover:w-0.5 group-hover:bg-[#a855f7] transition-all shadow-[0_0_4px_rgba(139,61,255,0.6)]" />

                {/* Coordinate Badge & Delete Pill */}
                <div className="absolute top-3 -left-5 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 bg-[#1e2024]/95 text-purple-300 border border-[#8b3dff] text-[10px] font-mono font-bold px-2 py-0.5 rounded-md shadow-lg z-40 backdrop-blur-md transition-opacity">
                  <span>X: {formatValue(gx)}</span>
                  <button
                    type="button"
                    onClick={(ev) => {
                      ev.stopPropagation();
                      onRemoveVerticalGuide?.(idx);
                    }}
                    className="hover:text-red-400 text-gray-400 font-bold ml-1 cursor-pointer transition-colors"
                    title="Remove Guide"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}

      {/* ========================================================================= */}
      {/* 5. POSTER SAFETY PRINT MARGINS & PRINT BLEED OVERLAY                      */}
      {/* ========================================================================= */}
      {showMargins && (
        <>
          {/* Poster Safe Print Margin (5% Inset) */}
          <div
            className="absolute pointer-events-none z-20 border border-dashed border-sky-400/80"
            style={{
              left: `${marginInsetX * zoomLevel}px`,
              top: `${marginInsetY * zoomLevel}px`,
              width: `${(width - marginInsetX * 2) * zoomLevel}px`,
              height: `${(height - marginInsetY * 2) * zoomLevel}px`,
            }}
          >
            <div className="absolute -top-3.5 left-1 text-[8px] font-bold text-sky-400 uppercase tracking-wider bg-[#18191b]/95 border border-sky-400/40 px-1 py-0.5 rounded shadow-xs">
              Poster Safe Zone (5%)
            </div>
          </div>

          {/* Poster Print Bleed (3% Bleed Inset) */}
          <div
            className="absolute pointer-events-none z-20 border border-dotted border-amber-400/60"
            style={{
              left: `${width * 0.03 * zoomLevel}px`,
              top: `${height * 0.03 * zoomLevel}px`,
              width: `${(width - width * 0.06) * zoomLevel}px`,
              height: `${(height - height * 0.06) * zoomLevel}px`,
            }}
          >
            <div className="absolute -top-3.5 right-1 text-[8px] font-bold text-amber-400 uppercase tracking-wider bg-[#18191b]/95 border border-amber-400/40 px-1 py-0.5 rounded shadow-xs">
              Print Bleed (3%)
            </div>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* 6. PRECISION ALIGNMENT GRID OVERLAY (20px / 50px)                         */}
      {/* ========================================================================= */}
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(99, 102, 241, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: `${20 * zoomLevel}px ${20 * zoomLevel}px`,
          }}
        />
      )}
    </>
  );
};
