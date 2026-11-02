import React, { useState } from 'react';
import { Download, X, Check, FileImage, FileText, Code2, Loader2, MousePointerClick } from 'lucide-react';

interface CanvaExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (format: 'png' | 'jpeg' | 'pdf' | 'svg', scale: number, transparent: boolean, selectionOnly?: boolean) => void;
  baseWidth: number;
  baseHeight: number;
  title: string;
  hasSelection?: boolean;
}

export const CanvaExportModal: React.FC<CanvaExportModalProps> = ({
  isOpen,
  onClose,
  onExport,
  baseWidth,
  baseHeight,
  title,
  hasSelection = false,
}) => {
  const [format, setFormat] = useState<'png' | 'jpeg' | 'pdf' | 'svg'>('png');
  const [scale, setScale] = useState<number>(1.5);
  const [transparent, setTransparent] = useState<boolean>(false);
  const [selectionOnly, setSelectionOnly] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentExportWidth = Math.round(baseWidth * scale);
  const currentExportHeight = Math.round(baseHeight * scale);

  const handleDownload = () => {
    setIsExporting(true);
    setTimeout(() => {
      onExport(format, scale, transparent, selectionOnly);
      setIsExporting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none p-4">
      <div className="bg-[#1e2023] text-white w-full max-w-md rounded-2xl shadow-2xl border border-[#343538] overflow-hidden animate-in fade-in zoom-in duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-[#2b2d31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#8b3dff]" />
            <h3 className="font-extrabold text-base text-white">Download Design</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          
          {/* File Type */}
          <div>
            <label className="font-bold text-gray-300 block mb-1.5">File Type</label>
            <div className="space-y-1.5">
              {[
                {
                  id: 'png',
                  name: 'PNG Image (Recommended)',
                  desc: 'Best for social media, high-res web graphics, and transparent logos',
                  icon: FileImage,
                },
                {
                  id: 'jpeg',
                  name: 'JPG / JPEG Image',
                  desc: 'Compact file size, fast loading for mobile & WhatsApp sharing',
                  icon: FileImage,
                },
                {
                  id: 'svg',
                  name: 'SVG Vector Graphic',
                  desc: 'Sharp, scalable vector graphics for animation, logos & web UI',
                  icon: Code2,
                },
                {
                  id: 'pdf',
                  name: 'PDF Document (Print Ready)',
                  desc: 'Ideal for physical posters, banners, visiting cards, and printing',
                  icon: FileText,
                },
              ].map((f) => {
                const Icon = f.icon;
                const isSelected = format === f.id;

                return (
                  <button
                    key={f.id}
                    onClick={() => setFormat(f.id as any)}
                    className={`w-full p-3 rounded-xl border text-left flex items-start gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#8b3dff]/15 border-[#8b3dff] text-white shadow-sm'
                        : 'bg-[#18191b] border-[#343538] text-gray-300 hover:bg-[#252627]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${isSelected ? 'text-[#8b3dff]' : 'text-gray-400'}`} />
                    <div className="flex-1">
                      <p className="font-extrabold text-xs">{f.name}</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">{f.desc}</p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#8b3dff] shrink-0 mt-0.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resolution Multiplier */}
          {format !== 'svg' && (
            <div>
              <div className="flex items-center justify-between font-bold text-gray-300 mb-1.5">
                <span>Resolution Scaling</span>
                <span className="text-[#8b3dff] font-extrabold">{scale}x ({currentExportWidth} × {currentExportHeight} px)</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { val: 1.0, label: '1x Standard' },
                  { val: 1.5, label: '1.5x HD' },
                  { val: 2.0, label: '2x Print' },
                  { val: 3.0, label: '3x Ultra' },
                ].map((s) => (
                  <button
                    key={s.val}
                    onClick={() => setScale(s.val)}
                    className={`py-2 rounded-lg font-bold border transition-colors cursor-pointer ${
                      scale === s.val
                        ? 'bg-[#8b3dff] border-[#8b3dff] text-white'
                        : 'bg-[#18191b] border-[#343538] text-gray-400 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Transparent Background (PNG / SVG only) */}
          {(format === 'png' || format === 'svg') && (
            <label className="flex items-center gap-2.5 p-2.5 bg-[#18191b] border border-[#343538] rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={transparent}
                onChange={(e) => setTransparent(e.target.checked)}
                className="w-4 h-4 rounded text-[#8b3dff] focus:ring-[#8b3dff] bg-[#222428] border-gray-600"
              />
              <div>
                <span className="font-bold text-white block">Transparent background</span>
                <span className="text-[10px] text-gray-400">Removes canvas background fill for cutout graphics</span>
              </div>
            </label>
          )}

          {/* Export Selected Element Only */}
          {hasSelection && (
            <label className="flex items-center gap-2.5 p-2.5 bg-[#18191b] border border-purple-500/40 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={selectionOnly}
                onChange={(e) => setSelectionOnly(e.target.checked)}
                className="w-4 h-4 rounded text-[#8b3dff] focus:ring-[#8b3dff] bg-[#222428] border-gray-600"
              />
              <div className="flex items-center gap-2">
                <MousePointerClick className="w-4 h-4 text-purple-400 shrink-0" />
                <div>
                  <span className="font-bold text-white block">Export selected element only</span>
                  <span className="text-[10px] text-gray-400">Downloads currently selected object with transparent bounds</span>
                </div>
              </div>
            </label>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#141517] border-t border-[#2b2d31] flex items-center justify-between">
          <span className="text-[11px] text-gray-400 font-medium truncate max-w-[200px]">
            {title || 'Untitled'}.{format === 'jpeg' ? 'jpg' : format}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border border-[#343538] text-gray-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="px-5 py-1.5 rounded-lg bg-gradient-to-r from-[#8b3dff] to-[#6366f1] hover:brightness-110 text-white font-extrabold flex items-center gap-1.5 shadow-md shadow-purple-900/30 transition-all cursor-pointer"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
