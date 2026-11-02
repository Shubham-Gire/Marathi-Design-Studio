import React, { useState } from 'react';
import { Crop, X, Check, RotateCcw, Maximize2, Square, Smartphone, Monitor } from 'lucide-react';

interface CanvaCropModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onApplyCrop: (croppedDataUrl: string) => void;
}

export const CanvaCropModal: React.FC<CanvaCropModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onApplyCrop,
}) => {
  const [aspectPreset, setAspectPreset] = useState<'free' | '1:1' | '16:9' | '4:5' | '9:16'>('free');
  const [insetPercent, setInsetPercent] = useState<number>(10);

  if (!isOpen) return null;

  const handleApply = () => {
    // Generate cropped image on offscreen HTML5 canvas
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const offscreen = document.createElement('canvas');
      const ctx = offscreen.getContext('2d');
      if (!ctx) return;

      const origW = img.naturalWidth || img.width;
      const origH = img.naturalHeight || img.height;

      let cropW = origW;
      let cropH = origH;
      let startX = 0;
      let startY = 0;

      if (aspectPreset === '1:1') {
        const side = Math.min(origW, origH) * (1 - insetPercent / 100);
        cropW = side;
        cropH = side;
        startX = (origW - cropW) / 2;
        startY = (origH - cropH) / 2;
      } else if (aspectPreset === '16:9') {
        cropW = origW * (1 - insetPercent / 100);
        cropH = (cropW * 9) / 16;
        if (cropH > origH) {
          cropH = origH * (1 - insetPercent / 100);
          cropW = (cropH * 16) / 9;
        }
        startX = (origW - cropW) / 2;
        startY = (origH - cropH) / 2;
      } else if (aspectPreset === '9:16') {
        cropH = origH * (1 - insetPercent / 100);
        cropW = (cropH * 9) / 16;
        if (cropW > origW) {
          cropW = origW * (1 - insetPercent / 100);
          cropH = (cropW * 16) / 9;
        }
        startX = (origW - cropW) / 2;
        startY = (origH - cropH) / 2;
      } else if (aspectPreset === '4:5') {
        cropH = origH * (1 - insetPercent / 100);
        cropW = (cropH * 4) / 5;
        if (cropW > origW) {
          cropW = origW * (1 - insetPercent / 100);
          cropH = (cropW * 5) / 4;
        }
        startX = (origW - cropW) / 2;
        startY = (origH - cropH) / 2;
      } else {
        // Freeform margin inset
        const insetX = (origW * insetPercent) / 200;
        const insetY = (origH * insetPercent) / 200;
        startX = insetX;
        startY = insetY;
        cropW = origW - insetX * 2;
        cropH = origH - insetY * 2;
      }

      offscreen.width = Math.max(10, Math.round(cropW));
      offscreen.height = Math.max(10, Math.round(cropH));

      ctx.drawImage(
        img,
        Math.round(startX),
        Math.round(startY),
        Math.round(cropW),
        Math.round(cropH),
        0,
        0,
        offscreen.width,
        offscreen.height
      );

      const croppedUrl = offscreen.toDataURL('image/png');
      onApplyCrop(croppedUrl);
      onClose();
    };
    img.src = imageUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-[#1e2023] text-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#343538] overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-[#2b2d31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crop className="w-5 h-5 text-purple-400" />
            <h3 className="font-extrabold text-base text-white">Crop Image</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preview Area */}
        <div className="p-6 bg-[#121315] flex items-center justify-center min-h-[260px] relative overflow-hidden">
          <div className="relative border-2 border-dashed border-purple-400 rounded-lg overflow-hidden shadow-2xl p-1 bg-black/40">
            <img
              src={imageUrl}
              alt="Crop Source"
              className="max-h-60 max-w-xs object-contain rounded transition-all"
              style={{
                clipPath: `inset(${insetPercent / 2}% ${insetPercent / 2}% ${insetPercent / 2}% ${insetPercent / 2}%)`
              }}
            />
            {/* Corner Crop Handles */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white" />
          </div>
        </div>

        {/* Controls */}
        <div className="p-5 space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-gray-300 uppercase mb-2">Aspect Ratio Presets</label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { id: 'free', label: 'Freeform', icon: Maximize2 },
                { id: '1:1', label: '1:1 Square', icon: Square },
                { id: '16:9', label: '16:9 Video', icon: Monitor },
                { id: '4:5', label: '4:5 Portrait', icon: Smartphone },
                { id: '9:16', label: '9:16 Story', icon: Smartphone },
              ].map((p) => {
                const Icon = p.icon;
                const isSel = aspectPreset === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setAspectPreset(p.id as any)}
                    className={`py-2 px-1 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                      isSel
                        ? 'bg-purple-600 border-purple-500 text-white shadow-sm'
                        : 'bg-[#18191b] border-[#343538] text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold">{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-1">
              <span>Crop Inset Depth</span>
              <span className="text-purple-400">{insetPercent}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={insetPercent}
              onChange={(e) => setInsetPercent(Number(e.target.value))}
              className="w-full h-1.5 bg-[#25262a] rounded-lg accent-purple-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#141517] border-t border-[#2b2d31] flex items-center justify-between">
          <button
            type="button"
            onClick={() => setInsetPercent(0)}
            className="text-xs text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Crop</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-[#343538] text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer text-xs"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Apply Crop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
