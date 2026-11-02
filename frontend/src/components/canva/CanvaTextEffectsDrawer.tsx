import React from 'react';
import { fabric } from 'fabric';
import { ChevronLeft, Sparkles, Sliders, Type } from 'lucide-react';

export type TextEffectStyle =
  | 'none'
  | 'shadow'
  | 'lift'
  | 'hollow'
  | 'splice'
  | 'outline'
  | 'echo'
  | 'glitch'
  | 'neon'
  | 'retro70s'
  | 'background';

export interface CanvaTextEffectsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedObject: fabric.Object | null;
  onUpdateText: (prop: string, val: any) => void;
  onUpdateObject: (prop: string, val: any) => void;
  curvature: number;
  onSetCurvature: (val: number) => void;
  currentEffectStyle: TextEffectStyle;
  onSetEffectStyle: (style: TextEffectStyle) => void;
  letterSpacing: number;
  onSetLetterSpacing: (val: number) => void;
  lineHeight: number;
  onSetLineHeight: (val: number) => void;
}

export function createTextCurvePath(text: string, fontSize: number, curvature: number): fabric.Path | null {
  if (!curvature || Math.abs(curvature) < 1) return null;
  const textLen = text ? text.length : 1;
  const approxW = textLen * fontSize * 0.65;
  const angle = 2 * Math.PI * (Math.abs(curvature) / 100);
  const radius = Math.max(approxW / angle, 50);

  const halfAngle = angle / 2;
  const x1 = -radius * Math.sin(halfAngle);
  const y1 = radius * (1 - Math.cos(halfAngle));
  const x2 = radius * Math.sin(halfAngle);
  const y2 = y1;

  // curvature > 0: arch upwards (sweep = 0); curvature < 0: bowl downwards (sweep = 1)
  const sweep = curvature > 0 ? 0 : 1;
  const pathStr = `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${radius.toFixed(1)} ${radius.toFixed(1)} 0 0 ${sweep} ${x2.toFixed(1)} ${y2.toFixed(1)}`;

  return new fabric.Path(pathStr, {
    visible: false,
    fill: '',
    stroke: '',
  });
}

export const CanvaTextEffectsDrawer: React.FC<CanvaTextEffectsDrawerProps> = ({
  isOpen,
  onClose,
  selectedObject,
  onUpdateText,
  onUpdateObject,
  curvature,
  onSetCurvature,
  currentEffectStyle,
  onSetEffectStyle,
  letterSpacing,
  onSetLetterSpacing,
  lineHeight,
  onSetLineHeight,
}) => {
  if (!isOpen) return null;

  const isText =
    selectedObject &&
    (selectedObject.type === 'text' ||
      selectedObject.type === 'i-text' ||
      selectedObject.type === 'textbox');

  const isCurved = Math.abs(curvature) > 0;

  // Handle setting curvature from input or steppers
  const handleCurvatureChange = (newVal: number) => {
    const clamped = Math.max(-100, Math.min(100, newVal));
    onSetCurvature(clamped);
  };

  // Stepper helper
  const stepCurvature = (delta: number) => {
    handleCurvatureChange((curvature || 0) + delta);
  };

  // Letter spacing steppers
  const stepLetterSpacing = (delta: number) => {
    const updated = Math.max(-50, Math.min(500, letterSpacing + delta));
    onSetLetterSpacing(updated);
  };

  // Line spacing steppers
  const stepLineHeight = (delta: number) => {
    const updated = Math.max(0.5, Math.min(3.0, Number((lineHeight + delta).toFixed(2))));
    onSetLineHeight(updated);
  };

  return (
    <div
      data-testid="canva-text-effects-drawer"
      onMouseDown={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      className="canva-text-effects-drawer relative w-[340px] bg-[#252627] text-gray-200 border-r border-[#343538] flex flex-col h-full overflow-y-auto scrollbar-none z-20 shrink-0 select-none animate-in fade-in slide-in-from-left-2 duration-150"
    >
      {/* Edge Collapse Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-10 bg-[#252627] border border-[#343538] text-gray-400 hover:text-white rounded-r-lg flex items-center justify-center shadow-lg z-30 transition-all cursor-pointer"
        title="Collapse Effects panel"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
      </button>

      {/* Header */}
      <div className="p-4 border-b border-[#343538] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h2 className="text-sm font-extrabold text-white">Effects</h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-white text-xs cursor-pointer p-1"
        >
          ✕
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* ========================================================================= */}
        {/* 1. SHAPE SECTION: NONE vs CURVE (Matching Canva Screenshot Exactly) */}
        {/* ========================================================================= */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-gray-200 block">Shape</span>

          <div className="grid grid-cols-2 gap-3">
            {/* 1. None (Straight Text) */}
            <button
              type="button"
              onClick={() => onSetCurvature(0)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                !isCurved
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744] text-gray-300'
              }`}
              title="Straight text"
            >
              <div className="w-16 h-12 flex items-center justify-center">
                <span className="text-sm font-black text-gray-200 tracking-wider">ABCD</span>
              </div>
              <span className="text-xs font-semibold text-gray-200">None</span>
            </button>

            {/* 2. Curve (Arched Text ABCD) */}
            <button
              type="button"
              onClick={() => onSetCurvature(curvature !== 0 ? curvature : 28)}
              className={`p-3 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all cursor-pointer ${
                isCurved
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744] text-gray-300'
              }`}
              title="Curved text"
            >
              <div className="w-16 h-12 flex items-center justify-center">
                {/* Authentic Canva Arched ABCD SVG */}
                <svg width="64" height="36" viewBox="0 0 64 36" fill="none">
                  <path
                    id="curve-preview-icon"
                    d="M 6 28 A 28 28 0 0 1 58 28"
                    fill="none"
                    stroke="none"
                  />
                  <text
                    fill="#c084fc"
                    fontSize="13"
                    fontWeight="900"
                    textAnchor="middle"
                    dominantBaseline="central"
                  >
                    <textPath href="#curve-preview-icon" startOffset="50%">
                      ABCD
                    </textPath>
                  </text>
                </svg>
              </div>
              <span className="text-xs font-semibold text-gray-200">Curve</span>
            </button>
          </div>

          {/* Curve Slider with Stepper (- [28] +) */}
          {isCurved && (
            <div className="pt-2 space-y-2 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">Curve</span>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={-100}
                  max={100}
                  value={curvature}
                  onChange={(e) => handleCurvatureChange(Number(e.target.value))}
                  className="flex-1 accent-purple-600 cursor-pointer h-1.5 bg-[#3a3c48] rounded-lg"
                />

                {/* Stepper Box: —  [28]  + (Exact Canva Style) */}
                <div className="flex items-center border border-[#3e4250] bg-[#1a1c22] rounded-xl px-2 py-1 gap-1.5 shrink-0 shadow-xs">
                  <button
                    type="button"
                    onClick={() => stepCurvature(-1)}
                    className="text-gray-400 hover:text-white px-1 text-sm font-black cursor-pointer transition-colors"
                    title="Decrease curve"
                  >
                    —
                  </button>
                  <input
                    type="number"
                    value={curvature}
                    onChange={(e) => handleCurvatureChange(Number(e.target.value))}
                    className="w-8 text-center text-xs font-black text-white bg-transparent border-0 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => stepCurvature(1)}
                    className="text-gray-400 hover:text-white px-1 text-sm font-black cursor-pointer transition-colors"
                    title="Increase curve"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 2. ADVANCED / STYLES SECTION (Neon Lights, TV Static, 70s, Hollow, etc.) */}
        {/* ========================================================================= */}
        <div className="space-y-3 pt-2 border-t border-[#343538]">
          <span className="text-xs font-bold text-gray-200 block">Advanced</span>

          <div className="grid grid-cols-3 gap-2.5">
            {/* 1. Neon Lights (Image Reference) */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('neon')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'neon'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="Neon Lights Glow"
            >
              <span className="text-lg font-black text-fuchsia-300 drop-shadow-[0_0_8px_#ec4899] drop-shadow-[0_0_14px_#a855f7]">
                AG
              </span>
              <span className="text-[10px] font-bold text-gray-300">Neon Lights</span>
            </button>

            {/* 2. TV Static / Glitch (Image Reference) */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('glitch')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'glitch'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="TV Static Glitch"
            >
              <span className="text-lg font-black text-cyan-300 drop-shadow-[-2px_-1px_0_#ec4899]">
                Ag
              </span>
              <span className="text-[10px] font-bold text-gray-300">TV Static</span>
            </button>

            {/* 3. 70s Retro (Image Reference) */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('retro70s')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'retro70s'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="70s Retro Layered"
            >
              <span className="text-lg font-black text-amber-400 drop-shadow-[2.5px_2.5px_0_#b45309]">
                Ag
              </span>
              <span className="text-[10px] font-bold text-gray-300">70s</span>
            </button>

            {/* 4. Shadow */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('shadow')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'shadow'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="Drop Shadow"
            >
              <span className="text-lg font-black text-white drop-shadow-[2.5px_2.5px_2px_rgba(0,0,0,0.85)]">
                Aa
              </span>
              <span className="text-[10px] font-bold text-gray-300">Shadow</span>
            </button>

            {/* 5. Lift */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('lift')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'lift'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="Elevated Lift"
            >
              <span className="text-lg font-black text-white drop-shadow-[0_6px_8px_rgba(0,0,0,0.7)]">
                Aa
              </span>
              <span className="text-[10px] font-bold text-gray-300">Lift</span>
            </button>

            {/* 6. Hollow */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('hollow')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'hollow'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="Hollow Outline"
            >
              <span
                className="text-lg font-black text-transparent"
                style={{ WebkitTextStroke: '1.5px #ffffff' }}
              >
                Aa
              </span>
              <span className="text-[10px] font-bold text-gray-300">Hollow</span>
            </button>

            {/* 7. Splice */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('splice')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'splice'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="Splice"
            >
              <span
                className="text-lg font-black text-transparent drop-shadow-[2.5px_2.5px_0_#a855f7]"
                style={{ WebkitTextStroke: '1.5px #ffffff' }}
              >
                Aa
              </span>
              <span className="text-[10px] font-bold text-gray-300">Splice</span>
            </button>

            {/* 8. Outline */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('outline')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'outline'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="Outline"
            >
              <span
                className="text-lg font-black text-white"
                style={{ WebkitTextStroke: '1.5px #a855f7' }}
              >
                Aa
              </span>
              <span className="text-[10px] font-bold text-gray-300">Outline</span>
            </button>

            {/* 9. Background Highlight */}
            <button
              type="button"
              onClick={() => onSetEffectStyle('background')}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[82px] border transition-all cursor-pointer ${
                currentEffectStyle === 'background'
                  ? 'border-2 border-purple-500 bg-[#2e263d] shadow-sm'
                  : 'bg-[#1b1c20] hover:bg-[#22242a] border-[#343744]'
              }`}
              title="Background Highlight"
            >
              <span className="text-xs font-black text-gray-900 bg-amber-300 px-2 py-0.5 rounded shadow-xs">
                Aa
              </span>
              <span className="text-[10px] font-bold text-gray-300">Background</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. LETTER SPACING & LINE SPACING SECTION */}
        {/* ========================================================================= */}
        <div className="space-y-4 pt-2 border-t border-[#343538]">
          <div className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-xs font-bold text-gray-200">Spacing</span>
          </div>

          {/* Letter Spacing */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">Letter Spacing</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={-20}
                max={200}
                value={Math.round(letterSpacing / 10)}
                onChange={(e) => onSetLetterSpacing(Number(e.target.value) * 10)}
                className="flex-1 accent-purple-600 cursor-pointer h-1.5 bg-[#3a3c48] rounded-lg"
              />
              <div className="flex items-center border border-[#3e4250] bg-[#1a1c22] rounded-xl px-2 py-1 gap-1.5 shrink-0 shadow-xs">
                <button
                  type="button"
                  onClick={() => stepLetterSpacing(-10)}
                  className="text-gray-400 hover:text-white px-1 text-sm font-black cursor-pointer transition-colors"
                  title="Decrease letter spacing"
                >
                  —
                </button>
                <span className="w-7 text-center text-xs font-black text-white">
                  {Math.round(letterSpacing / 10)}
                </span>
                <button
                  type="button"
                  onClick={() => stepLetterSpacing(10)}
                  className="text-gray-400 hover:text-white px-1 text-sm font-black cursor-pointer transition-colors"
                  title="Increase letter spacing"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Line Spacing */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-300">Line Spacing</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={0.8}
                max={2.5}
                step={0.05}
                value={lineHeight}
                onChange={(e) => onSetLineHeight(Number(e.target.value))}
                className="flex-1 accent-purple-600 cursor-pointer h-1.5 bg-[#3a3c48] rounded-lg"
              />
              <div className="flex items-center border border-[#3e4250] bg-[#1a1c22] rounded-xl px-2 py-1 gap-1.5 shrink-0 shadow-xs">
                <button
                  type="button"
                  onClick={() => stepLineHeight(-0.05)}
                  className="text-gray-400 hover:text-white px-1 text-sm font-black cursor-pointer transition-colors"
                  title="Decrease line spacing"
                >
                  —
                </button>
                <span className="w-7 text-center text-xs font-black text-white">
                  {lineHeight.toFixed(2)}
                </span>
                <button
                  type="button"
                  onClick={() => stepLineHeight(0.05)}
                  className="text-gray-400 hover:text-white px-1 text-sm font-black cursor-pointer transition-colors"
                  title="Increase line spacing"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
