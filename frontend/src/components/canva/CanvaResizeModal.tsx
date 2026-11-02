import React, { useState } from 'react';
import { Sliders, X, Check, Smartphone, Monitor, Image as ImageIcon, FileText } from 'lucide-react';

interface CanvaResizeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentWidth: number;
  currentHeight: number;
  onResize: (width: number, height: number) => void;
}

interface DimensionPreset {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  icon: React.ElementType;
}

const PRESETS: DimensionPreset[] = [
  { id: 'canva-poster', name: 'Canva Poster (Portrait)', category: 'Poster', width: 1080, height: 1350, icon: FileText },
  { id: 'wall-poster', name: 'Standard Print Wall Poster (18 × 24 in)', category: 'Poster', width: 1728, height: 2304, icon: FileText },
  { id: 'a4-poster', name: 'A4 Print Poster / Flyer', category: 'Print', width: 842, height: 1191, icon: FileText },
  { id: 'a3-poster', name: 'A3 Grand Print Poster', category: 'Print', width: 1191, height: 1684, icon: FileText },
  { id: 'insta-square', name: 'Instagram Square Post', category: 'Social Media', width: 1080, height: 1080, icon: Smartphone },
  { id: 'insta-story', name: 'Instagram Story / WhatsApp Status', category: 'Social Media', width: 1080, height: 1920, icon: Smartphone },
  { id: 'fb-post', name: 'Facebook Landscape Post', category: 'Social Media', width: 1200, height: 630, icon: Monitor },
  { id: 'yt-thumb', name: 'YouTube Video Thumbnail', category: 'Video', width: 1280, height: 720, icon: Monitor },
  { id: 'flex-banner', name: 'Flex Banner (Landscape)', category: 'Outdoor', width: 1920, height: 1080, icon: ImageIcon },
];

export const CanvaResizeModal: React.FC<CanvaResizeModalProps> = ({
  isOpen,
  onClose,
  currentWidth,
  currentHeight,
  onResize,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>('insta-square');
  const [width, setWidth] = useState<number>(currentWidth);
  const [height, setHeight] = useState<number>(currentHeight);

  if (!isOpen) return null;

  const handleSelectPreset = (preset: DimensionPreset) => {
    setSelectedPreset(preset.id);
    setWidth(preset.width);
    setHeight(preset.height);
  };

  const handleApply = () => {
    onResize(width, height);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none p-4">
      <div className="bg-[#1e2023] text-white w-full max-w-md rounded-2xl shadow-2xl border border-[#343538] overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-[#2b2d31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-base text-white">Resize Canvas</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          
          {/* Custom Dimension Inputs */}
          <div>
            <label className="font-bold text-gray-300 block mb-1.5">Custom Dimensions (px)</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[11px] text-gray-400 block mb-1">Width (px)</span>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  min={100}
                  max={4000}
                  className="w-full bg-[#18191b] border border-[#343538] rounded-xl px-3 py-2 font-bold text-white focus:outline-none focus:border-[#8b3dff]"
                />
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block mb-1">Height (px)</span>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  min={100}
                  max={4000}
                  className="w-full bg-[#18191b] border border-[#343538] rounded-xl px-3 py-2 font-bold text-white focus:outline-none focus:border-[#8b3dff]"
                />
              </div>
            </div>
          </div>

          {/* Popular Presets */}
          <div>
            <label className="font-bold text-gray-300 block mb-1.5">Popular Dimensions</label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto">
              {PRESETS.map((p) => {
                const Icon = p.icon;
                const isSelected = width === p.width && height === p.height;

                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-amber-400/15 border-amber-400 text-white font-bold'
                        : 'bg-[#18191b] border-[#343538] text-gray-300 hover:bg-[#252627]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-400' : 'text-gray-400'}`} />
                      <div>
                        <p className="text-xs truncate max-w-[220px]">{p.name}</p>
                        <p className="text-[10px] text-gray-400">{p.width} × {p.height} px ({p.category})</p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#18191b] border-t border-[#2b2d31]">
          <button
            onClick={handleApply}
            className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white rounded-xl font-black text-xs shadow-md transition-all cursor-pointer"
          >
            Apply Resize ({width} × {height} px)
          </button>
        </div>

      </div>
    </div>
  );
};
