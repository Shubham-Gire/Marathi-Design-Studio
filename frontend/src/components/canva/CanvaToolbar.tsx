import React, { useState, useRef, useEffect } from 'react';
import { fabric } from 'fabric';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Sliders,
  Sparkles,
  FlipHorizontal,
  FlipVertical,
  Minus,
  Plus,
  Palette,
  ChevronDown,
  Group,
  Ungroup,
  ArrowUp,
  ArrowDown,
  Sun,
  Contrast,
  SlidersHorizontal,
  Paintbrush,
  RotateCw,
  Play,
  Keyboard,
  ArrowRightLeft,
  Type,
  Lock,
  Unlock,
  Trash2,
  Copy,
  Wand2
} from 'lucide-react';
import { CanvaFontSelector } from './CanvaFontSelector';
import { getFontDefinition } from '../../config/fontLibrary';

// Authentic Canva Icons
const CheckerboardTransparencyIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-200">
    <rect x="0" y="0" width="4" height="4" fill="currentColor" opacity="0.9" />
    <rect x="8" y="0" width="4" height="4" fill="currentColor" opacity="0.9" />
    <rect x="4" y="4" width="4" height="4" fill="currentColor" opacity="0.9" />
    <rect x="12" y="4" width="4" height="4" fill="currentColor" opacity="0.9" />
    <rect x="0" y="8" width="4" height="4" fill="currentColor" opacity="0.9" />
    <rect x="8" y="8" width="4" height="4" fill="currentColor" opacity="0.9" />
    <rect x="4" y="12" width="4" height="4" fill="currentColor" opacity="0.9" />
    <rect x="12" y="12" width="4" height="4" fill="currentColor" opacity="0.9" />
  </svg>
);

const CornerRoundingIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
    <path d="M4 20V11a7 7 0 0 1 7-7h9" />
  </svg>
);

const BorderStyleIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-200">
    <rect x="2" y="3" width="12" height="1.8" rx="0.9" />
    <rect x="2" y="7.1" width="12" height="1.8" rx="0.9" />
    <rect x="2" y="11.2" width="12" height="1.8" rx="0.9" />
  </svg>
);

const CropIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-200">
    <path d="M6 2v14a2 2 0 0 0 2 2h14" />
    <path d="M18 22V8a2 2 0 0 0-2-2H2" />
  </svg>
);

interface CanvaToolbarProps {
  selectedObject: fabric.Object | null;
  selectedType: string | null;
  canvasBackgroundColor: string;
  canvasDimensions: { width: number; height: number };
  onUpdateText: (prop: string, val: any) => void;
  onUpdateObject: (prop: string, val: any) => void;
  onUpdateCanvasBackground: (color: string) => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onToggleLock: () => void;
  isLocked: boolean;
  onFlipH: () => void;
  onFlipV: () => void;
  onAlignCenter: () => void;
  onAlignMiddle: () => void;
  onAlign?: (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  onDistribute?: (axis: 'horizontal' | 'vertical') => void;
  onGroup?: () => void;
  onUngroup?: () => void;
  onRotate?: (angle?: number, immediate?: boolean, direction?: 'Clockwise' | 'Counter-clockwise') => void;
  onOpenAiTool?: (toolDetails: any) => void;
  onApplyImageFilter?: (filterType: string, options?: any) => void;
  onCopyStyle?: () => void;
  onPasteStyle?: () => void;
  hasCopiedStyle?: boolean;
  onOpenCropModal?: () => void;
  onReplaceImage?: (newFile: File) => void;
  onRemoveBg?: () => void;
  onOpenMarathiKeyboard?: () => void;
  onOpenLegacyConverter?: () => void;
  onOpenFontManager?: () => void;
  onOpenEffectsDrawer?: () => void;
  isEffectsDrawerOpen?: boolean;
}

export const CanvaToolbar: React.FC<CanvaToolbarProps> = ({
  selectedObject,
  selectedType,
  canvasBackgroundColor,
  canvasDimensions,
  onUpdateText,
  onUpdateObject,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onDuplicate,
  onDelete,
  onToggleLock,
  isLocked,
  onFlipH,
  onFlipV,
  onAlignCenter,
  onAlignMiddle,
  onAlign,
  onDistribute,
  onGroup,
  onUngroup,
  onRotate,
  onOpenAiTool,
  onCopyStyle,
  onPasteStyle,
  hasCopiedStyle = false,
  onOpenCropModal,
  onReplaceImage,
  onRemoveBg,
  onOpenMarathiKeyboard,
  onOpenLegacyConverter,
  onOpenFontManager,
  onOpenEffectsDrawer,
  isEffectsDrawerOpen = false,
}) => {
  const replaceFileRef = useRef<HTMLInputElement>(null);
  const isText = selectedType === 'textbox' || selectedType === 'i-text' || selectedType === 'text';
  const isShape = selectedType === 'rect' || selectedType === 'circle' || selectedType === 'triangle' || selectedType === 'polygon' || selectedType === 'line';
  const isImage = selectedType === 'image';
  const isSelection = selectedType === 'activeSelection';
  const isGroup = selectedType === 'group';

  // State extracted from selected text
  const textObj = isText ? (selectedObject as fabric.Textbox) : null;
  const currentFont = textObj?.fontFamily || 'Mukta';
  const currentFontSize = textObj?.fontSize ? Math.round(textObj.fontSize * 10) / 10 : 48;
  const isBold = textObj?.fontWeight === 'bold' || textObj?.fontWeight === '700' || (textObj?.fontWeight as any) > 500;
  const isItalic = textObj?.fontStyle === 'italic';
  const isUnderline = !!textObj?.underline;
  const isLinethrough = !!(textObj as any)?.linethrough;
  const currentAlign = textObj?.textAlign || 'center';
  const currentFill = (selectedObject?.fill as string) || '#ffffff';
  const currentStroke = (selectedObject?.stroke as string) || '#8b5cf6';
  const currentStrokeWidth = selectedObject?.strokeWidth || 0;
  const currentOpacity = selectedObject?.opacity !== undefined ? Math.round(selectedObject.opacity * 100) : 100;
  const currentCharSpacing = (textObj as any)?.charSpacing ? Math.round((textObj as any).charSpacing / 10) : 0;
  const currentLineHeight = textObj?.lineHeight || 1.15;
  const selectedTextContent = textObj?.text || '';
  const currentTextBg = textObj?.backgroundColor || 'transparent';

  // Shape specific properties
  const rectObj = selectedType === 'rect' ? (selectedObject as fabric.Rect) : null;
  const currentCornerRadius = Number((selectedObject as any)?.cornerRounding ?? (rectObj?.rx || 0));
  const currentStrokeDash = selectedObject?.strokeDashArray;

  // Popover visibility
  const [isFontSelectorOpen, setIsFontSelectorOpen] = useState(false);
  const [fontMenuPos, setFontMenuPos] = useState<{ left: number; top: number } | null>(null);
  const fontBtnRef = useRef<HTMLButtonElement>(null);
  const [isSpacingOpen, setIsSpacingOpen] = useState(false);
  const [isEffectsOpen, setIsEffectsOpen] = useState(false);
  const [isPositionOpen, setIsPositionOpen] = useState(false);
  const [isOpacityOpen, setIsOpacityOpen] = useState(false);
  const [isImageAdjustOpen, setIsImageAdjustOpen] = useState(false);
  const [isBorderStyleOpen, setIsBorderStyleOpen] = useState(false);
  const [isCornerRoundingOpen, setIsCornerRoundingOpen] = useState(false);
  const [isFlipOpen, setIsFlipOpen] = useState(false);
  const [isAnimateOpen, setIsAnimateOpen] = useState(false);

  // Local Opacity
  const [localOpacity, setLocalOpacity] = useState<number>(currentOpacity);
  useEffect(() => {
    setLocalOpacity(currentOpacity);
  }, [currentOpacity, selectedObject]);

  // Corner Rounding state
  const [cornerRounding, setCornerRounding] = useState<number>(currentCornerRadius);
  useEffect(() => {
    setCornerRounding(Number((selectedObject as any)?.cornerRounding ?? (rectObj?.rx || 0)));
  }, [selectedObject, currentCornerRadius]);

  // Dynamic Color Palette for Selected Element (like Canva's graphic color swatches)
  const [paletteColors, setPaletteColors] = useState<string[]>([]);
  useEffect(() => {
    if (!selectedObject) {
      setPaletteColors([]);
      return;
    }
    const extracted = new Set<string>();
    if (typeof selectedObject.fill === 'string' && selectedObject.fill && selectedObject.fill !== 'transparent') {
      extracted.add(selectedObject.fill);
    }
    if (typeof selectedObject.stroke === 'string' && selectedObject.stroke && selectedObject.stroke !== 'transparent') {
      extracted.add(selectedObject.stroke);
    }
    if ((selectedObject as any).getObjects) {
      (selectedObject as any).getObjects().forEach((child: any) => {
        if (typeof child.fill === 'string' && child.fill && child.fill !== 'transparent') extracted.add(child.fill);
        if (typeof child.stroke === 'string' && child.stroke && child.stroke !== 'transparent') extracted.add(child.stroke);
      });
    }
    if ((selectedObject as any).palette && Array.isArray((selectedObject as any).palette)) {
      (selectedObject as any).palette.forEach((c: string) => extracted.add(c));
    }
    const valid = Array.from(extracted).filter((c) => c.startsWith('#') || c.startsWith('rgb'));
    // Fallback default 5-color palette matching Canva's eagle illustration screenshot
    const defaults = ['#111827', '#cbd5e1', '#ea580c', '#f59e0b', '#ffffff'];
    defaults.forEach((c) => {
      if (valid.length < 5 && !valid.includes(c)) valid.push(c);
    });
    setPaletteColors(valid.slice(0, 5));
  }, [selectedObject]);

  const handleColorChange = (idx: number, newColor: string) => {
    const next = [...paletteColors];
    next[idx] = newColor;
    setPaletteColors(next);
    if (!selectedObject) return;
    (selectedObject as any).palette = next;

    if (isShape) {
      if (idx === 0) onUpdateObject('fill', newColor);
      else if (idx === 1) onUpdateObject('stroke', newColor);
    } else if ((selectedObject as any).getObjects) {
      const children = (selectedObject as any).getObjects();
      const oldColor = paletteColors[idx];
      children.forEach((c: any) => {
        if (c.fill === oldColor) c.set('fill', newColor);
        if (c.stroke === oldColor) c.set('stroke', newColor);
      });
      selectedObject.canvas?.requestRenderAll();
    } else if (isImage) {
      if (idx === 0) onUpdateObject('stroke', newColor);
      selectedObject.canvas?.requestRenderAll();
    }
  };

  // Position precise metrics
  const [posX, setPosX] = useState<number>(selectedObject ? Math.round(selectedObject.left || 0) : 0);
  const [posY, setPosY] = useState<number>(selectedObject ? Math.round(selectedObject.top || 0) : 0);
  const [posWidth, setPosWidth] = useState<number>(selectedObject ? Math.round(selectedObject.getScaledWidth() || 0) : 0);
  const [posHeight, setPosHeight] = useState<number>(selectedObject ? Math.round(selectedObject.getScaledHeight() || 0) : 0);
  const [posAngle, setPosAngle] = useState<number>(selectedObject ? Math.round(selectedObject.angle || 0) : 0);

  useEffect(() => {
    if (selectedObject) {
      setPosX(Math.round(selectedObject.left || 0));
      setPosY(Math.round(selectedObject.top || 0));
      setPosWidth(Math.round(selectedObject.getScaledWidth() || 0));
      setPosHeight(Math.round(selectedObject.getScaledHeight() || 0));
      setPosAngle(Math.round(selectedObject.angle || 0));
    }
  }, [selectedObject]);

  // Image adjust state
  const [brightness, setBrightness] = useState<number>(0);
  const [contrast, setContrast] = useState<number>(0);
  const [saturation, setSaturation] = useState<number>(0);
  const [blurVal, setBlurVal] = useState<number>(0);

  // Element Refs for click outside
  const fontSelectorRef = useRef<HTMLDivElement>(null);
  const spacingRef = useRef<HTMLDivElement>(null);
  const effectsRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef<HTMLDivElement>(null);
  const imageAdjustRef = useRef<HTMLDivElement>(null);
  const borderStyleRef = useRef<HTMLDivElement>(null);
  const cornerRoundingRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const animateRef = useRef<HTMLDivElement>(null);

  // Close popovers on click outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (fontSelectorRef.current && !fontSelectorRef.current.contains(target)) setIsFontSelectorOpen(false);
      if (spacingRef.current && !spacingRef.current.contains(target)) setIsSpacingOpen(false);
      if (effectsRef.current && !effectsRef.current.contains(target)) setIsEffectsOpen(false);
      if (positionRef.current && !positionRef.current.contains(target)) setIsPositionOpen(false);
      if (opacityRef.current && !opacityRef.current.contains(target)) setIsOpacityOpen(false);
      if (imageAdjustRef.current && !imageAdjustRef.current.contains(target)) setIsImageAdjustOpen(false);
      if (borderStyleRef.current && !borderStyleRef.current.contains(target)) setIsBorderStyleOpen(false);
      if (cornerRoundingRef.current && !cornerRoundingRef.current.contains(target)) setIsCornerRoundingOpen(false);
      if (flipRef.current && !flipRef.current.contains(target)) setIsFlipOpen(false);
      if (animateRef.current && !animateRef.current.contains(target)) setIsAnimateOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const changeFontSize = (delta: number) => {
    const next = Math.max(8, Math.min(300, Math.round((currentFontSize + delta) * 10) / 10));
    onUpdateText('fontSize', next);
  };

  const cycleTextCase = () => {
    if (!textObj) return;
    const current = textObj.text || '';
    if (current === current.toUpperCase()) {
      onUpdateText('text', current.toLowerCase());
    } else if (current === current.toLowerCase()) {
      const titleCase = current.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase());
      onUpdateText('text', titleCase);
    } else {
      onUpdateText('text', current.toUpperCase());
    }
  };

  const toggleList = (type: 'bullet' | 'number') => {
    if (!textObj) return;
    const current = textObj.text || '';
    const lines = current.split('\n');
    const isBulletList = lines.every((line) => line.startsWith('• '));
    const isNumberList = lines.every((line, i) => line.startsWith(`${i + 1}. `));

    if (type === 'bullet') {
      if (isBulletList) {
        onUpdateText('text', lines.map((l) => l.replace(/^•\s*/, '')).join('\n'));
      } else {
        onUpdateText('text', lines.map((l) => `• ${l.replace(/^(\d+\.\s*|•\s*)/, '')}`).join('\n'));
      }
    } else {
      if (isNumberList) {
        onUpdateText('text', lines.map((l) => l.replace(/^\d+\.\s*/, '')).join('\n'));
      } else {
        onUpdateText('text', lines.map((l, i) => `${i + 1}. ${l.replace(/^(\d+\.\s*|•\s*)/, '')}`).join('\n'));
      }
    }
  };

  const applyAdjustments = (newB: number, newC: number, newS: number, newBlur: number) => {
    const img = selectedObject as fabric.Image;
    if (!img) return;
    img.filters = [];

    if (newB !== 0 && (fabric.Image.filters as any).Brightness) {
      img.filters.push(new (fabric.Image.filters as any).Brightness({ brightness: newB / 100 }));
    }
    if (newC !== 0 && (fabric.Image.filters as any).Contrast) {
      img.filters.push(new (fabric.Image.filters as any).Contrast({ contrast: newC / 100 }));
    }
    if (newS !== 0 && (fabric.Image.filters as any).Saturation) {
      img.filters.push(new (fabric.Image.filters as any).Saturation({ saturation: newS / 100 }));
    }
    if (newBlur > 0 && (fabric.Image.filters as any).Blur) {
      img.filters.push(new (fabric.Image.filters as any).Blur({ blur: newBlur }));
    }

    img.applyFilters();
    img.canvas?.renderAll();
  };

  const resetImageAdjustments = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    setBlurVal(0);
    const img = selectedObject as fabric.Image;
    if (img && img.applyFilters) {
      img.filters = [];
      img.applyFilters();
      img.canvas?.renderAll();
    }
  };

  const handleCornerRoundingChange = (val: number) => {
    setCornerRounding(val);
    onUpdateObject('cornerRounding', val);
    if (rectObj) {
      onUpdateObject('rx', val);
      onUpdateObject('ry', val);
    }
  };

  if (!selectedObject) {
    return null;
  }

  const fontDef = getFontDefinition(currentFont);

  // REUSABLE POPOVERS

  // 1. Flip Popover
  const renderFlipPopover = () => (
    <div className="absolute left-0 top-full mt-2 w-44 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-1.5 z-50 text-xs text-gray-200 space-y-1">
      <button
        type="button"
        onClick={() => {
          onFlipH();
          setIsFlipOpen(false);
        }}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#222428] text-left transition-colors cursor-pointer text-gray-200 hover:text-white"
      >
        <FlipHorizontal className="w-4 h-4 text-purple-400 shrink-0" />
        <span>Flip horizontal</span>
      </button>
      <button
        type="button"
        onClick={() => {
          onFlipV();
          setIsFlipOpen(false);
        }}
        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#222428] text-left transition-colors cursor-pointer text-gray-200 hover:text-white"
      >
        <FlipVertical className="w-4 h-4 text-purple-400 shrink-0" />
        <span>Flip vertical</span>
      </button>
    </div>
  );

  // 2. Corner Rounding Popover
  const renderCornerRoundingPopover = () => (
    <div className="absolute left-0 top-full mt-2 w-64 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-3.5 z-50 text-xs text-gray-200 space-y-3">
      <div className="flex justify-between items-center font-bold text-white border-b border-[#28292d] pb-1.5">
        <span className="flex items-center gap-1.5">
          <CornerRoundingIcon />
          <span>Corner Rounding</span>
        </span>
        <span className="text-purple-400 font-mono">{cornerRounding}px</span>
      </div>

      <div>
        <input
          type="range"
          min={0}
          max={100}
          value={cornerRounding}
          onChange={(e) => handleCornerRoundingChange(Number(e.target.value))}
          className="w-full accent-purple-600 cursor-pointer"
        />
      </div>

      {/* Preset Chips */}
      <div className="grid grid-cols-5 gap-1 pt-1 border-t border-[#28292d]">
        {[
          { label: '0px', val: 0 },
          { label: '12px', val: 12 },
          { label: '24px', val: 24 },
          { label: '48px', val: 48 },
          { label: 'Max', val: 80 }
        ].map((preset) => (
          <button
            key={preset.label}
            type="button"
            onClick={() => handleCornerRoundingChange(preset.val)}
            className={`py-1 rounded border text-[10px] font-bold text-center cursor-pointer transition-colors ${
              cornerRounding === preset.val
                ? 'bg-purple-600 text-white border-purple-400'
                : 'bg-[#222428] hover:bg-[#2b2d33] border-[#343538] text-gray-300'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );

  // 3. Border Style Popover
  const renderBorderStylePopover = () => (
    <div className="absolute left-0 top-full mt-2 w-64 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-3.5 z-50 text-xs text-gray-200 space-y-3">
      <div className="flex justify-between items-center font-bold text-white border-b border-[#28292d] pb-1.5">
        <span className="flex items-center gap-1.5">
          <BorderStyleIcon />
          <span>Border Style</span>
        </span>
        <span className="text-purple-400 font-mono">{currentStrokeWidth}px</span>
      </div>

      {/* Border Width Slider & Color */}
      <div>
        <div className="flex justify-between font-semibold text-gray-300 mb-1">
          <span>Border Weight</span>
          <span className="text-purple-400">{currentStrokeWidth}px</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={0}
            max={24}
            value={currentStrokeWidth}
            onChange={(e) => onUpdateObject('strokeWidth', Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
          <label
            className="w-6 h-6 rounded cursor-pointer border border-[#343538] overflow-hidden relative shrink-0 shadow-xs"
            style={{ backgroundColor: currentStroke || '#8b5cf6' }}
            title="Border color"
          >
            <input
              type="color"
              value={currentStroke && currentStroke.startsWith('#') ? currentStroke : '#8b5cf6'}
              onChange={(e) => onUpdateObject('stroke', e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Border Dash Style */}
      <div>
        <div className="font-semibold text-gray-300 mb-1.5">Border Pattern</div>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => onUpdateObject('strokeDashArray', null)}
            className={`py-1.5 border rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
              !currentStrokeDash ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#222428] hover:bg-[#2b2d33] border-[#343538] text-gray-300'
            }`}
          >
            Solid
          </button>
          <button
            type="button"
            onClick={() => onUpdateObject('strokeDashArray', [12, 8])}
            className={`py-1.5 border rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
              currentStrokeDash && currentStrokeDash[0] === 12 ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#222428] hover:bg-[#2b2d33] border-[#343538] text-gray-300'
            }`}
          >
            Dashed
          </button>
          <button
            type="button"
            onClick={() => onUpdateObject('strokeDashArray', [4, 4])}
            className={`py-1.5 border rounded-lg text-[11px] font-semibold cursor-pointer transition-colors ${
              currentStrokeDash && currentStrokeDash[0] === 4 ? 'bg-purple-600 text-white border-purple-400' : 'bg-[#222428] hover:bg-[#2b2d33] border-[#343538] text-gray-300'
            }`}
          >
            Dotted
          </button>
        </div>
      </div>
    </div>
  );

  // 4. Transparency Popover
  const renderTransparencyPopover = () => (
    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-56 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-3.5 z-50 text-xs text-gray-200 space-y-3">
      <div className="flex justify-between font-bold text-gray-300">
        <span>Transparency</span>
        <span className="text-purple-400 font-mono">{localOpacity}%</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={localOpacity}
        onChange={(e) => {
          const val = Number(e.target.value);
          setLocalOpacity(val);
          onUpdateObject('opacity', val / 100);
        }}
        className="w-full accent-purple-600 cursor-pointer"
      />
      <div className="grid grid-cols-4 gap-1 pt-1 border-t border-[#28292d]">
        {[25, 50, 75, 100].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => {
              setLocalOpacity(preset);
              onUpdateObject('opacity', preset / 100);
            }}
            className={`py-1 rounded border text-[10px] font-semibold text-center cursor-pointer transition-colors ${
              localOpacity === preset
                ? 'bg-purple-600 text-white border-purple-400'
                : 'bg-[#222428] hover:bg-[#2b2d33] border-[#343538] text-gray-300'
            }`}
          >
            {preset}%
          </button>
        ))}
      </div>
    </div>
  );

  // 5. Animate Popover
  const renderAnimatePopover = () => (
    <div className="absolute left-0 top-full mt-2 w-64 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-3 z-50 text-xs text-gray-200 space-y-2">
      <div className="font-extrabold text-white border-b border-[#28292d] pb-1 flex items-center justify-between">
        <span>Entry Animations</span>
        <Play className="w-3 h-3 text-purple-400" />
      </div>
      <div className="grid grid-cols-2 gap-1.5 pt-1">
        {['None', 'Fade', 'Pan', 'Rise', 'Pop', 'Wipe', 'Breathe', 'Tumble'].map((anim) => (
          <button
            key={anim}
            type="button"
            onClick={() => {
              (selectedObject as any).animationType = anim.toLowerCase();
              setIsAnimateOpen(false);
            }}
            className="px-2.5 py-1.5 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] rounded-lg text-left text-xs font-semibold text-gray-200 hover:text-white transition-colors cursor-pointer"
          >
            {anim}
          </button>
        ))}
      </div>
    </div>
  );

  // 6. Position Popover
  const renderPositionPopover = () => (
    <div className="absolute right-0 top-full mt-2 w-64 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-3 z-50 text-xs text-gray-200 space-y-3">
      {/* Layer Ordering */}
      <div>
        <div className="font-bold text-gray-400 text-[10px] uppercase mb-1.5">Layer Ordering</div>
        <div className="grid grid-cols-2 gap-1">
          <button
            type="button"
            onClick={() => onBringForward()}
            className="px-2 py-1.5 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] rounded-lg text-left flex items-center justify-between text-gray-200 cursor-pointer"
          >
            <span>Forward</span>
            <ArrowUp className="w-3 h-3 text-purple-400" />
          </button>
          <button
            type="button"
            onClick={() => onSendBackward()}
            className="px-2 py-1.5 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] rounded-lg text-left flex items-center justify-between text-gray-200 cursor-pointer"
          >
            <span>Backward</span>
            <ArrowDown className="w-3 h-3 text-gray-400" />
          </button>
          <button
            type="button"
            onClick={() => onBringToFront()}
            className="px-2 py-1.5 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] rounded-lg text-left text-purple-400 font-bold cursor-pointer"
          >
            To Front
          </button>
          <button
            type="button"
            onClick={() => onSendToBack()}
            className="px-2 py-1.5 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] rounded-lg text-left text-gray-400 cursor-pointer"
          >
            To Back
          </button>
        </div>
      </div>

      {/* Align to Page */}
      <div className="border-t border-[#28292d] pt-2">
        <div className="font-bold text-gray-400 text-[10px] uppercase mb-1.5">Align to Page</div>
        <div className="grid grid-cols-3 gap-1">
          {['top', 'middle', 'bottom', 'left', 'center', 'right'].map((al) => (
            <button
              key={al}
              type="button"
              onClick={() => {
                if (onAlign) onAlign(al as any);
                else if (al === 'center') onAlignCenter();
                else if (al === 'middle') onAlignMiddle();
              }}
              className="px-2 py-1 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] rounded-lg text-center capitalize text-gray-200 cursor-pointer"
            >
              {al}
            </button>
          ))}
        </div>
      </div>

      {/* Dimensions & Position */}
      <div className="border-t border-[#28292d] pt-2">
        <div className="font-bold text-gray-400 text-[10px] uppercase mb-1.5">Dimensions & Position</div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-gray-400 block mb-0.5">X (px)</span>
            <input
              type="number"
              value={posX}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPosX(val);
                selectedObject.set('left', val);
                selectedObject.setCoords();
                selectedObject.canvas?.renderAll();
              }}
              className="w-full bg-[#222428] border border-[#343538] rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block mb-0.5">Y (px)</span>
            <input
              type="number"
              value={posY}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPosY(val);
                selectedObject.set('top', val);
                selectedObject.setCoords();
                selectedObject.canvas?.renderAll();
              }}
              className="w-full bg-[#222428] border border-[#343538] rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block mb-0.5">Width</span>
            <input
              type="number"
              value={posWidth}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPosWidth(val);
                selectedObject.scaleToWidth(val);
                selectedObject.setCoords();
                selectedObject.canvas?.renderAll();
              }}
              className="w-full bg-[#222428] border border-[#343538] rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <span className="text-[10px] text-gray-400 block mb-0.5">Height</span>
            <input
              type="number"
              value={posHeight}
              onChange={(e) => {
                const val = Number(e.target.value);
                setPosHeight(val);
                selectedObject.scaleToHeight(val);
                selectedObject.setCoords();
                selectedObject.canvas?.renderAll();
              }}
              className="w-full bg-[#222428] border border-[#343538] rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div className="col-span-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] text-gray-400 font-semibold">Rotate (°)</span>
              <span className="text-[11px] font-bold text-purple-400">
                {posAngle}° ({Math.round((posAngle / 360) * 100)}%) ↻
              </span>
            </div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <input
                type="number"
                min="0"
                max="360"
                data-testid="rotate-angle-input"
                value={posAngle}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setPosAngle(val);
                  if (onRotate) onRotate(val, false);
                  else {
                    const c = selectedObject.getCenterPoint();
                    selectedObject.set('angle', val);
                    selectedObject.setPositionByOrigin(c, 'center', 'center');
                    selectedObject.setCoords();
                    selectedObject.canvas?.renderAll();
                  }
                }}
                className="w-full bg-[#222428] border border-[#343538] rounded px-2 py-1 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
              />
            </div>
            {/* Quick Rotation Angle Presets */}
            <div className="grid grid-cols-4 gap-1">
              {[
                { label: '0°', val: 0 },
                { label: '-90° ↺', val: -90, dir: 'Counter-clockwise' },
                { label: '+90° ↻', val: 90, dir: 'Clockwise' },
                { label: '180°', val: 180, dir: 'Clockwise' }
              ].map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setPosAngle(p.val);
                    if (onRotate) onRotate(p.val, false, p.dir as any);
                  }}
                  className="py-1 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] text-gray-300 hover:text-white rounded text-[10px] font-bold cursor-pointer transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // 7. Style Button (Format Painter)
  const renderStyleButton = () => (
    <button
      type="button"
      onClick={() => {
        if (hasCopiedStyle && onPasteStyle) {
          onPasteStyle();
        } else if (onCopyStyle) {
          onCopyStyle();
        }
      }}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
        hasCopiedStyle
          ? 'bg-purple-600 text-white animate-pulse'
          : 'hover:bg-[#222428] text-gray-200'
      }`}
      title={hasCopiedStyle ? 'Click to paste copied style (Ctrl+Alt+V)' : 'Copy style (Ctrl+Alt+C)'}
    >
      <Paintbrush className="w-3.5 h-3.5 text-cyan-400" />
      <span className="hidden md:inline">Style</span>
    </button>
  );

  return (
    <div
      data-testid="contextual-toolbar"
      className="canva-toolbar canva-contextual-toolbar h-[46px] bg-[#18191b] border-b border-[#28292d] px-3 flex items-center justify-between z-30 select-none shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.4)] text-xs text-gray-200"
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* CASE 1: TEXT SELECTED */}
      {isText && (
        <div className="flex items-center gap-1.5 overflow-visible py-1">
          {/* Font Family Selector Dropdown */}
          <div className="relative" ref={fontSelectorRef}>
            <button
              ref={fontBtnRef}
              type="button"
              onClick={() => {
                if (fontBtnRef.current) {
                  const rect = fontBtnRef.current.getBoundingClientRect();
                  setFontMenuPos({ left: rect.left, top: rect.bottom + 6 });
                }
                setIsFontSelectorOpen(!isFontSelectorOpen);
              }}
              className="flex items-center justify-between gap-2 px-3 py-1.5 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] rounded-lg text-xs font-bold text-white w-40 sm:w-48 truncate transition-colors cursor-pointer"
              title="Change Font Family"
            >
              <span className="truncate" style={{ fontFamily: currentFont }}>
                {fontDef?.name || currentFont}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            </button>

            <CanvaFontSelector
              currentFont={currentFont}
              selectedText={selectedTextContent}
              isOpen={isFontSelectorOpen}
              onClose={() => setIsFontSelectorOpen(false)}
              onSelectFont={(fontId) => onUpdateText('fontFamily', fontId)}
              position={fontMenuPos}
              onOpenFontManager={onOpenFontManager}
            />
          </div>

          {/* Font Size Stepper */}
          <div className="flex items-center border border-[#343538] rounded-lg overflow-hidden bg-[#222428]">
            <button
              type="button"
              onClick={() => changeFontSize(-2)}
              className="p-1.5 text-gray-300 hover:bg-[#2b2d33] hover:text-white transition-colors cursor-pointer"
              title="Decrease font size"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <input
              type="number"
              value={currentFontSize}
              onChange={(e) => onUpdateText('fontSize', Number(e.target.value))}
              className="w-12 text-center text-xs font-bold bg-transparent border-0 text-white focus:outline-none py-1"
            />
            <button
              type="button"
              onClick={() => changeFontSize(2)}
              className="p-1.5 text-gray-300 hover:bg-[#2b2d33] hover:text-white transition-colors cursor-pointer"
              title="Increase font size"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Text Color Picker */}
          <div className="relative flex items-center">
            <label className="p-1.5 rounded-lg hover:bg-[#222428] cursor-pointer flex flex-col items-center justify-center transition-colors" title="Text color">
              <span className="font-black text-xs leading-none text-white">A</span>
              <span className="w-3.5 h-1 rounded-sm mt-0.5 shadow-xs" style={{ backgroundColor: currentFill }} />
              <input
                type="color"
                value={currentFill}
                onChange={(e) => onUpdateText('fill', e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Bold, Italic, Underline, Strikethrough, Text Case */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => onUpdateText('fontWeight', isBold ? 'normal' : 'bold')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBold ? 'bg-purple-600 text-white font-black' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onUpdateText('fontStyle', isItalic ? 'normal' : 'italic')}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isItalic ? 'bg-purple-600 text-white font-black' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onUpdateText('underline', !isUnderline)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isUnderline ? 'bg-purple-600 text-white font-black' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Underline (Ctrl+U)"
            >
              <Underline className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onUpdateText('linethrough', !isLinethrough)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isLinethrough ? 'bg-purple-600 text-white font-black' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Strikethrough"
            >
              <Strikethrough className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={cycleTextCase}
              className="px-1.5 py-1 rounded-lg transition-colors hover:bg-[#222428] text-gray-300 font-bold text-xs cursor-pointer"
              title="Text case (Uppercase / Lowercase / Title case)"
            >
              aA
            </button>
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Alignment */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => onUpdateText('textAlign', 'left')}
              className={`p-1.5 rounded-lg cursor-pointer ${
                currentAlign === 'left' ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Align left"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onUpdateText('textAlign', 'center')}
              className={`p-1.5 rounded-lg cursor-pointer ${
                currentAlign === 'center' ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Align center"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onUpdateText('textAlign', 'right')}
              className={`p-1.5 rounded-lg cursor-pointer ${
                currentAlign === 'right' ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Align right"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onUpdateText('textAlign', 'justify')}
              className={`p-1.5 rounded-lg cursor-pointer ${
                currentAlign === 'justify' ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Justify"
            >
              <AlignJustify className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Lists */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => toggleList('bullet')}
              className="p-1.5 rounded-lg hover:bg-[#222428] text-gray-300 cursor-pointer transition-colors"
              title="Bullet list"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => toggleList('number')}
              className="p-1.5 rounded-lg hover:bg-[#222428] text-gray-300 cursor-pointer transition-colors"
              title="Numbered list"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Spacing Popover */}
          <div className="relative" ref={spacingRef}>
            <button
              type="button"
              onClick={() => setIsSpacingOpen(!isSpacingOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isSpacingOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300'
              }`}
              title="Letter & line spacing"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>

            {isSpacingOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-3.5 z-50 text-xs space-y-3 text-gray-200">
                <div>
                  <div className="flex justify-between font-bold text-gray-300 mb-1">
                    <span>Letter Spacing</span>
                    <span className="text-purple-400 font-mono font-bold">{currentCharSpacing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={-20}
                      max={200}
                      value={currentCharSpacing}
                      onChange={(e) => onUpdateText('charSpacing', Number(e.target.value) * 10)}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                    <div className="flex items-center border border-[#343538] bg-[#222428] rounded-lg px-1 py-0.5 gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateText('charSpacing', Math.max(-200, (currentCharSpacing - 5) * 10))}
                        className="text-gray-400 hover:text-white px-1 text-xs font-bold cursor-pointer"
                      >
                        —
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateText('charSpacing', Math.min(2000, (currentCharSpacing + 5) * 10))}
                        className="text-gray-400 hover:text-white px-1 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between font-bold text-gray-300 mb-1">
                    <span>Line Spacing</span>
                    <span className="text-purple-400 font-mono font-bold">{currentLineHeight.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0.8}
                      max={2.5}
                      step={0.05}
                      value={currentLineHeight}
                      onChange={(e) => onUpdateText('lineHeight', Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                    <div className="flex items-center border border-[#343538] bg-[#222428] rounded-lg px-1 py-0.5 gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => onUpdateText('lineHeight', Math.max(0.8, Number((currentLineHeight - 0.05).toFixed(2))))}
                        className="text-gray-400 hover:text-white px-1 text-xs font-bold cursor-pointer"
                      >
                        —
                      </button>
                      <button
                        type="button"
                        onClick={() => onUpdateText('lineHeight', Math.min(2.5, Number((currentLineHeight + 0.05).toFixed(2))))}
                        className="text-gray-400 hover:text-white px-1 text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transparency (Authentic Checkerboard Icon) */}
          <div className="relative" ref={opacityRef}>
            <button
              type="button"
              onClick={() => setIsOpacityOpen(!isOpacityOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isOpacityOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300 hover:text-white'
              }`}
              title="Transparency"
            >
              <CheckerboardTransparencyIcon />
            </button>
            {isOpacityOpen && renderTransparencyPopover()}
          </div>

          {/* Text Background Highlight */}
          <div className="relative flex items-center">
            <label className="w-6 h-6 rounded-full border border-[#343538] cursor-pointer shadow-xs hover:scale-110 transition-transform overflow-hidden flex items-center justify-center" style={{ backgroundColor: currentTextBg === 'transparent' ? '#333' : currentTextBg }} title="Text background highlight">
              <input
                type="color"
                value={currentTextBg === 'transparent' ? '#ffffff' : currentTextBg}
                onChange={(e) => onUpdateObject('backgroundColor', e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Effects Pill Button */}
          <div className="relative" ref={effectsRef}>
            <button
              type="button"
              onClick={() => {
                if (onOpenEffectsDrawer) {
                  onOpenEffectsDrawer();
                } else {
                  setIsEffectsOpen(!isEffectsOpen);
                }
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isEffectsDrawerOpen || isEffectsOpen ? 'bg-purple-600 text-white' : 'bg-[#222428] hover:bg-[#2b2d33] text-gray-200 border border-[#343538]'
              }`}
              title="Effects"
            >
              <span>Effects</span>
            </button>

            {isEffectsOpen && (
              <div className="absolute left-0 top-full mt-2 w-72 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-4 z-50 text-xs space-y-3.5 text-gray-200">
                <div className="font-extrabold text-white border-b border-[#28292d] pb-1.5 flex items-center justify-between">
                  <span>Typography Effects</span>
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                </div>
                
                {/* Outline / Stroke */}
                <div>
                  <div className="flex justify-between font-bold text-gray-300 mb-1">
                    <span>Stroke / Border</span>
                    <span className="text-purple-400">{currentStrokeWidth}px</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="range"
                      min={0}
                      max={12}
                      value={currentStrokeWidth}
                      onChange={(e) => onUpdateObject('strokeWidth', Number(e.target.value))}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                    <input
                      type="color"
                      value={currentStroke}
                      onChange={(e) => onUpdateObject('stroke', e.target.value)}
                      className="w-6 h-6 rounded cursor-pointer border-0"
                    />
                  </div>
                </div>

                {/* Effect Presets Grid */}
                <div>
                  <div className="font-bold text-gray-300 mb-1.5">Effect Style</div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateObject('shadow', null);
                        onUpdateObject('strokeWidth', 0);
                        onUpdateObject('backgroundColor', 'transparent');
                      }}
                      className="py-1.5 px-2 bg-[#222428] border border-[#343538] rounded-lg text-[11px] font-medium hover:bg-[#2b2d33] text-center cursor-pointer text-gray-300"
                    >
                      None
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateObject('shadow', new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 4, offsetY: 4 }))}
                      className="py-1.5 px-2 border border-purple-500/50 bg-purple-950/40 rounded-lg text-[11px] font-bold text-purple-300 text-center cursor-pointer"
                    >
                      Drop Shadow
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateObject('shadow', new fabric.Shadow({ color: '#ea580c', blur: 18, offsetX: 0, offsetY: 0 }))}
                      className="py-1.5 px-2 border border-amber-500/50 bg-amber-950/40 rounded-lg text-[11px] font-bold text-amber-300 text-center cursor-pointer"
                    >
                      Kesari Glow
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        onUpdateObject('fill', 'transparent');
                        onUpdateObject('stroke', '#8b5cf6');
                        onUpdateObject('strokeWidth', 2);
                      }}
                      className="py-1.5 px-2 border border-indigo-500/50 bg-indigo-950/40 rounded-lg text-[11px] font-bold text-indigo-300 text-center cursor-pointer"
                    >
                      Hollow
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateObject('shadow', new fabric.Shadow({ color: 'rgba(0,0,0,0.4)', blur: 24, offsetX: 0, offsetY: 12 }))}
                      className="py-1.5 px-2 bg-[#222428] border border-[#343538] rounded-lg text-[11px] font-bold text-gray-200 text-center cursor-pointer"
                    >
                      Soft Lift
                    </button>
                    <button
                      type="button"
                      onClick={() => onUpdateObject('shadow', new fabric.Shadow({ color: '#00f0ff', blur: 20, offsetX: 0, offsetY: 0 }))}
                      className="py-1.5 px-2 border border-cyan-500/50 bg-cyan-950/40 rounded-lg text-[11px] font-bold text-cyan-300 text-center cursor-pointer"
                    >
                      Neon Cyan
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Animate Pill Button */}
          <div className="relative" ref={animateRef}>
            <button
              type="button"
              onClick={() => setIsAnimateOpen(!isAnimateOpen)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isAnimateOpen ? 'bg-purple-600 text-white' : 'bg-[#222428] hover:bg-[#2b2d33] text-gray-200 border border-[#343538]'
              }`}
              title="Animate"
            >
              <span>Animate</span>
            </button>
            {isAnimateOpen && renderAnimatePopover()}
          </div>

          {/* Position Pill Button */}
          <div className="relative" ref={positionRef}>
            <button
              type="button"
              onClick={() => setIsPositionOpen(!isPositionOpen)}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isPositionOpen ? 'bg-purple-600 text-white' : 'bg-[#222428] hover:bg-[#2b2d33] text-gray-200 border border-[#343538]'
              }`}
              title="Position"
            >
              <span>Position</span>
            </button>
            {isPositionOpen && renderPositionPopover()}
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Style Button */}
          {renderStyleButton()}

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Dedicated Marathi Typography & Tools Section */}
          {onOpenMarathiKeyboard && (
            <button
              type="button"
              onClick={onOpenMarathiKeyboard}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 border border-purple-500/40 shrink-0"
              title="Marathi Unicode InScript Keyboard & Phonetic Typing Assistant"
            >
              <Keyboard className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">मराठी कीबोर्ड</span>
            </button>
          )}

          {onOpenLegacyConverter && (
            <button
              type="button"
              onClick={onOpenLegacyConverter}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer bg-[#222428] hover:bg-[#2b2d33] text-gray-300 hover:text-white border border-[#343538] shrink-0"
              title="Legacy Font Converter (Kruti Dev / Shivaji ⇄ Unicode)"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">लिपी रूपांतर</span>
            </button>
          )}

          {onOpenFontManager && (
            <button
              type="button"
              onClick={onOpenFontManager}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer bg-[#222428] hover:bg-[#2b2d33] text-gray-300 hover:text-white border border-[#343538] shrink-0"
              title="Font Administration & Typography Manager"
            >
              <Type className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden sm:inline">फॉन्ट व्यवस्थापक</span>
            </button>
          )}
        </div>
      )}

      {/* CASE 2: SHAPE SELECTED */}
      {isShape && (
        <div className="flex items-center gap-1.5 overflow-visible py-1 text-xs">
          {/* Fill Color */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-[#222428] border border-[#343538] rounded-lg">
            <span className="font-semibold text-gray-300 text-xs">Color:</span>
            <label className="w-5 h-5 rounded cursor-pointer border border-[#3e4045] overflow-hidden relative shrink-0" style={{ backgroundColor: currentFill }} title="Shape Fill Color">
              <input
                type="color"
                value={currentFill.startsWith('#') ? currentFill : '#ffffff'}
                onChange={(e) => onUpdateObject('fill', e.target.value)}
                className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
              />
            </label>
          </div>

          {/* Color Palette Dots */}
          <div className="flex items-center gap-1 px-1">
            {paletteColors.map((color, idx) => (
              <label
                key={idx}
                className="w-5 h-5 rounded-full border border-[#3e4045] shadow-xs cursor-pointer hover:scale-115 transition-transform overflow-hidden relative inline-block shrink-0"
                style={{ backgroundColor: color }}
                title={`Color: ${color}`}
              >
                <input
                  type="color"
                  value={color.startsWith('#') ? color : '#ffffff'}
                  onChange={(e) => handleColorChange(idx, e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
              </label>
            ))}
          </div>

          {/* Border Style Button (≡) */}
          <div className="relative" ref={borderStyleRef}>
            <button
              type="button"
              onClick={() => setIsBorderStyleOpen(!isBorderStyleOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBorderStyleOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300 hover:text-white'
              }`}
              title="Border style"
            >
              <BorderStyleIcon />
            </button>
            {isBorderStyleOpen && renderBorderStylePopover()}
          </div>

          {/* Corner Rounding Button (╭) */}
          <div className="relative" ref={cornerRoundingRef}>
            <button
              type="button"
              onClick={() => setIsCornerRoundingOpen(!isCornerRoundingOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isCornerRoundingOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300 hover:text-white'
              }`}
              title="Corner rounding"
            >
              <CornerRoundingIcon />
            </button>
            {isCornerRoundingOpen && renderCornerRoundingPopover()}
          </div>

          {/* Flip Dropdown Button */}
          <div className="relative" ref={flipRef}>
            <button
              type="button"
              onClick={() => setIsFlipOpen(!isFlipOpen)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isFlipOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-200'
              }`}
              title="Flip"
            >
              <span>Flip</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {isFlipOpen && renderFlipPopover()}
          </div>

          {/* Transparency (🏁) */}
          <div className="relative" ref={opacityRef}>
            <button
              type="button"
              onClick={() => setIsOpacityOpen(!isOpacityOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isOpacityOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300 hover:text-white'
              }`}
              title="Transparency"
            >
              <CheckerboardTransparencyIcon />
            </button>
            {isOpacityOpen && renderTransparencyPopover()}
          </div>

          {/* Animate Pill Button */}
          <div className="relative" ref={animateRef}>
            <button
              type="button"
              onClick={() => setIsAnimateOpen(!isAnimateOpen)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isAnimateOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-200'
              }`}
              title="Animate"
            >
              <span>Animate</span>
            </button>
            {isAnimateOpen && renderAnimatePopover()}
          </div>

          {/* Position Pill Button */}
          <div className="relative" ref={positionRef}>
            <button
              type="button"
              onClick={() => setIsPositionOpen(!isPositionOpen)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isPositionOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-200'
              }`}
              title="Position"
            >
              <span>Position</span>
            </button>
            {isPositionOpen && renderPositionPopover()}
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Style Button */}
          {renderStyleButton()}
        </div>
      )}

      {/* CASE 3: IMAGE / GRAPHIC SELECTED (Matching Canva Screenshot exactly) */}
      {(isImage || (!isText && !isShape && !isSelection && !isGroup)) && (
        <div className="flex items-center gap-1.5 overflow-visible py-1 text-xs">
          {/* 1. Edit Pill Button with Photo Adjustments Popover */}
          <div className="relative" ref={imageAdjustRef}>
            <button
              type="button"
              onClick={() => setIsImageAdjustOpen(!isImageAdjustOpen)}
              className={`px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isImageAdjustOpen ? 'bg-purple-600 text-white' : 'bg-[#222428] hover:bg-[#2b2d33] text-gray-200 border border-[#343538]'
              }`}
              title="Edit image"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-300" />
              <span>Edit</span>
            </button>

            {isImageAdjustOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl p-3.5 z-50 text-xs space-y-3 text-gray-200">
                <div className="flex items-center justify-between font-bold text-white border-b border-[#28292d] pb-1.5">
                  <span>Photo Adjustments</span>
                  <button
                    type="button"
                    onClick={resetImageAdjustments}
                    className="text-[10px] text-purple-400 font-bold hover:underline cursor-pointer"
                  >
                    Reset
                  </button>
                </div>

                {/* Brightness */}
                <div>
                  <div className="flex justify-between font-semibold text-gray-300 mb-1">
                    <span className="flex items-center gap-1"><Sun className="w-3 h-3 text-amber-400" /> Brightness</span>
                    <span className="text-purple-400 font-mono">{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min={-100}
                    max={100}
                    value={brightness}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setBrightness(v);
                      applyAdjustments(v, contrast, saturation, blurVal);
                    }}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                {/* Contrast */}
                <div>
                  <div className="flex justify-between font-semibold text-gray-300 mb-1">
                    <span className="flex items-center gap-1"><Contrast className="w-3 h-3 text-indigo-400" /> Contrast</span>
                    <span className="text-purple-400 font-mono">{contrast}%</span>
                  </div>
                  <input
                    type="range"
                    min={-100}
                    max={100}
                    value={contrast}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setContrast(v);
                      applyAdjustments(brightness, v, saturation, blurVal);
                    }}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                {/* Saturation */}
                <div>
                  <div className="flex justify-between font-semibold text-gray-300 mb-1">
                    <span className="flex items-center gap-1"><Palette className="w-3 h-3 text-rose-400" /> Saturation</span>
                    <span className="text-purple-400 font-mono">{saturation}%</span>
                  </div>
                  <input
                    type="range"
                    min={-100}
                    max={100}
                    value={saturation}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setSaturation(v);
                      applyAdjustments(brightness, contrast, v, blurVal);
                    }}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                {/* Blur */}
                <div>
                  <div className="flex justify-between font-semibold text-gray-300 mb-1">
                    <span className="flex items-center gap-1">Blur</span>
                    <span className="text-purple-400 font-mono">{blurVal}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={40}
                    value={blurVal}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setBlurVal(v);
                      applyAdjustments(brightness, contrast, saturation, v);
                    }}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>

                {/* Preset Filters */}
                <div className="border-t border-[#28292d] pt-2">
                  <span className="font-bold text-gray-300 block mb-1.5">Preset Filters</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const img = selectedObject as fabric.Image;
                        if (img.applyFilters) {
                          img.filters = [];
                          img.applyFilters();
                          img.canvas?.renderAll();
                        }
                      }}
                      className="px-2 py-1 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] text-gray-200 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      Normal
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const img = selectedObject as fabric.Image;
                        if (img.applyFilters) {
                          img.filters = [new (fabric.Image.filters as any).Grayscale()];
                          img.applyFilters();
                          img.canvas?.renderAll();
                        }
                      }}
                      className="px-2 py-1 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] text-gray-200 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      B&W
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const img = selectedObject as fabric.Image;
                        if (img.applyFilters) {
                          img.filters = [new (fabric.Image.filters as any).Sepia()];
                          img.applyFilters();
                          img.canvas?.renderAll();
                        }
                      }}
                      className="px-2 py-1 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] text-gray-200 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      Vintage
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const img = selectedObject as fabric.Image;
                        if (img.applyFilters) {
                          img.filters = [new (fabric.Image.filters as any).Invert()];
                          img.applyFilters();
                          img.canvas?.renderAll();
                        }
                      }}
                      className="px-2 py-1 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] text-gray-200 rounded text-[11px] font-semibold cursor-pointer"
                    >
                      Invert
                    </button>
                  </div>
                </div>

                {/* Remove BG Tool inside Edit */}
                {onRemoveBg && (
                  <div className="border-t border-[#28292d] pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveBg();
                        setIsImageAdjustOpen(false);
                      }}
                      className="w-full py-1.5 px-3 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 border border-purple-500/40 font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer text-xs"
                    >
                      <Wand2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>Remove Background</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* 2. Replace Pill Button */}
          <input
            type="file"
            ref={replaceFileRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file && onReplaceImage) {
                onReplaceImage(file);
              }
              e.target.value = '';
            }}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => replaceFileRef.current?.click()}
            className="px-3 py-1.5 rounded-lg font-semibold bg-[#222428] hover:bg-[#2b2d33] text-gray-200 border border-[#343538] transition-colors cursor-pointer flex items-center gap-1.5"
            title="Replace image"
          >
            <span>Replace</span>
          </button>

          {/* 3. Color Palette Dots (⚫ ⚪ 🟠 🟡 ⚪) */}
          <div className="flex items-center gap-1 px-1">
            {paletteColors.map((color, idx) => (
              <label
                key={idx}
                className="w-5 h-5 rounded-full border border-[#3e4045] shadow-xs cursor-pointer hover:scale-115 transition-transform overflow-hidden relative inline-block shrink-0"
                style={{ backgroundColor: color }}
                title={`Color: ${color}`}
              >
                <input
                  type="color"
                  value={color.startsWith('#') ? color : '#ffffff'}
                  onChange={(e) => handleColorChange(idx, e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
              </label>
            ))}
          </div>

          {/* 4. Border Style Button (≡) */}
          <div className="relative" ref={borderStyleRef}>
            <button
              type="button"
              onClick={() => setIsBorderStyleOpen(!isBorderStyleOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isBorderStyleOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300 hover:text-white'
              }`}
              title="Border style"
            >
              <BorderStyleIcon />
            </button>
            {isBorderStyleOpen && renderBorderStylePopover()}
          </div>

          {/* 5. Corner Rounding Button (╭) */}
          <div className="relative" ref={cornerRoundingRef}>
            <button
              type="button"
              onClick={() => setIsCornerRoundingOpen(!isCornerRoundingOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isCornerRoundingOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300 hover:text-white'
              }`}
              title="Corner rounding"
            >
              <CornerRoundingIcon />
            </button>
            {isCornerRoundingOpen && renderCornerRoundingPopover()}
          </div>

          {/* 6. Crop Tool Button (⯄) */}
          <button
            type="button"
            onClick={onOpenCropModal}
            className="p-1.5 rounded-lg hover:bg-[#222428] text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Crop"
          >
            <CropIcon />
          </button>

          {/* 7. Flip Dropdown Button (Flip ▾) */}
          <div className="relative" ref={flipRef}>
            <button
              type="button"
              onClick={() => setIsFlipOpen(!isFlipOpen)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isFlipOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-200'
              }`}
              title="Flip"
            >
              <span>Flip</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {isFlipOpen && renderFlipPopover()}
          </div>

          {/* 8. Transparency Button (🏁 with tooltip "Transparency") */}
          <div className="relative" ref={opacityRef}>
            <button
              type="button"
              onClick={() => setIsOpacityOpen(!isOpacityOpen)}
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                isOpacityOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-300 hover:text-white'
              }`}
              title="Transparency"
            >
              <CheckerboardTransparencyIcon />
            </button>
            {isOpacityOpen && renderTransparencyPopover()}
          </div>

          {/* 9. Animate Pill Button */}
          <div className="relative" ref={animateRef}>
            <button
              type="button"
              onClick={() => setIsAnimateOpen(!isAnimateOpen)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isAnimateOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-200'
              }`}
              title="Animate"
            >
              <span>Animate</span>
            </button>
            {isAnimateOpen && renderAnimatePopover()}
          </div>

          {/* 10. Position Pill Button */}
          <div className="relative" ref={positionRef}>
            <button
              type="button"
              onClick={() => setIsPositionOpen(!isPositionOpen)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                isPositionOpen ? 'bg-purple-600 text-white' : 'hover:bg-[#222428] text-gray-200'
              }`}
              title="Position"
            >
              <span>Position</span>
            </button>
            {isPositionOpen && renderPositionPopover()}
          </div>

          {/* Divider */}
          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* 11. Style Button (🖌️ Style) */}
          {renderStyleButton()}
        </div>
      )}

      {/* CASE 4: ACTIVE SELECTION (Multiple elements) */}
      {isSelection && (
        <div className="flex items-center gap-2 overflow-visible py-1 text-xs">
          <span className="font-bold text-gray-300 text-xs bg-[#222428] px-2.5 py-1 rounded-lg border border-[#343538]">
            Multiple items selected
          </span>
          {onGroup && (
            <button
              type="button"
              onClick={onGroup}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-xs"
              title="Group elements (Ctrl+G)"
            >
              <Group className="w-3.5 h-3.5" />
              <span>Group</span>
            </button>
          )}
          {onDistribute && (
            <div className="flex items-center gap-1 ml-1 border-l border-[#2d2e30] pl-2">
              <button
                type="button"
                onClick={() => onDistribute('horizontal')}
                className="px-2 py-1 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] text-gray-200 rounded text-[11px] font-semibold cursor-pointer"
                title="Distribute horizontally"
              >
                Distribute H
              </button>
              <button
                type="button"
                onClick={() => onDistribute('vertical')}
                className="px-2 py-1 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] text-gray-200 rounded text-[11px] font-semibold cursor-pointer"
                title="Distribute vertically"
              >
                Distribute V
              </button>
            </div>
          )}

          {/* Flip Dropdown */}
          <div className="relative" ref={flipRef}>
            <button
              type="button"
              onClick={() => setIsFlipOpen(!isFlipOpen)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-[#222428] text-gray-200 cursor-pointer"
              title="Flip"
            >
              <span>Flip</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {isFlipOpen && renderFlipPopover()}
          </div>

          {/* Transparency */}
          <div className="relative" ref={opacityRef}>
            <button
              type="button"
              onClick={() => setIsOpacityOpen(!isOpacityOpen)}
              className="p-1.5 rounded-lg hover:bg-[#222428] text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Transparency"
            >
              <CheckerboardTransparencyIcon />
            </button>
            {isOpacityOpen && renderTransparencyPopover()}
          </div>

          {/* Position */}
          <div className="relative" ref={positionRef}>
            <button
              type="button"
              onClick={() => setIsPositionOpen(!isPositionOpen)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#222428] text-gray-200 cursor-pointer"
              title="Position"
            >
              <span>Position</span>
            </button>
            {isPositionOpen && renderPositionPopover()}
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Style */}
          {renderStyleButton()}
        </div>
      )}

      {/* CASE 5: GROUP SELECTED */}
      {isGroup && (
        <div className="flex items-center gap-2 overflow-visible py-1 text-xs">
          <span className="font-bold text-gray-300 text-xs bg-[#222428] px-2.5 py-1 rounded-lg border border-[#343538]">
            Group
          </span>
          {onUngroup && (
            <button
              type="button"
              onClick={onUngroup}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#222428] hover:bg-[#2b2d33] border border-[#343538] text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
              title="Ungroup elements (Ctrl+Shift+G)"
            >
              <Ungroup className="w-3.5 h-3.5" />
              <span>Ungroup</span>
            </button>
          )}

          {/* Flip Dropdown */}
          <div className="relative" ref={flipRef}>
            <button
              type="button"
              onClick={() => setIsFlipOpen(!isFlipOpen)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-[#222428] text-gray-200 cursor-pointer"
              title="Flip"
            >
              <span>Flip</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
            {isFlipOpen && renderFlipPopover()}
          </div>

          {/* Transparency */}
          <div className="relative" ref={opacityRef}>
            <button
              type="button"
              onClick={() => setIsOpacityOpen(!isOpacityOpen)}
              className="p-1.5 rounded-lg hover:bg-[#222428] text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Transparency"
            >
              <CheckerboardTransparencyIcon />
            </button>
            {isOpacityOpen && renderTransparencyPopover()}
          </div>

          {/* Position */}
          <div className="relative" ref={positionRef}>
            <button
              type="button"
              onClick={() => setIsPositionOpen(!isPositionOpen)}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#222428] text-gray-200 cursor-pointer"
              title="Position"
            >
              <span>Position</span>
            </button>
            {isPositionOpen && renderPositionPopover()}
          </div>

          <div className="h-4 w-px bg-[#2d2e30]" />

          {/* Style */}
          {renderStyleButton()}
        </div>
      )}

      {/* RIGHT SIDE ACTIONS: Rotate 90°, Duplicate, Lock, Delete */}
      <div className="flex items-center gap-1 shrink-0 ml-auto pl-2 border-l border-[#2d2e30]">
        {/* Quick Smooth Rotate 90° with Live Angle */}
        <button
          type="button"
          onClick={() => {
            if (onRotate) onRotate(90, false, 'Clockwise');
            else if (selectedObject) {
              const current = selectedObject.angle || 0;
              selectedObject.rotate((current + 90) % 360);
              selectedObject.setCoords();
              selectedObject.canvas?.renderAll();
            }
          }}
          data-testid="toolbar-rotate-btn"
          className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[#222428] text-gray-300 hover:text-white transition-colors cursor-pointer group"
          title="Rotate 90° clockwise"
        >
          <RotateCw className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-90 transition-transform duration-300" />
          <span className="text-[11px] font-bold text-gray-300">
            {Math.round(((selectedObject?.angle || 0) % 360 + 360) % 360)}°
          </span>
        </button>

        {/* Duplicate */}
        {onDuplicate && (
          <button
            type="button"
            onClick={onDuplicate}
            className="p-1.5 rounded-lg hover:bg-[#222428] text-gray-300 hover:text-white transition-colors cursor-pointer"
            title="Duplicate (Ctrl+D)"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Lock / Unlock */}
        {onToggleLock && (
          <button
            type="button"
            onClick={onToggleLock}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
              isLocked
                ? 'bg-amber-600 text-white'
                : 'hover:bg-[#222428] text-gray-300 hover:text-white'
            }`}
            title={isLocked ? 'Unlock element' : 'Lock element'}
          >
            {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          </button>
        )}

        {/* Delete */}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="p-1.5 rounded-lg hover:bg-rose-950/40 text-gray-300 hover:text-rose-400 transition-colors cursor-pointer"
            title="Delete (Del / Backspace)"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};