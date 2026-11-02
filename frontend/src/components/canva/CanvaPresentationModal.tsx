import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize, Minimize } from 'lucide-react';

interface CanvaPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  pages: string[];
  currentPageIndex: number;
  currentCanvasDataUrl?: string;
  title: string;
}

export const CanvaPresentationModal: React.FC<CanvaPresentationModalProps> = ({
  isOpen,
  onClose,
  pages,
  currentPageIndex,
  currentCanvasDataUrl,
  title,
}) => {
  const [activePage, setActivePage] = useState(currentPageIndex);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setActivePage(currentPageIndex);
  }, [currentPageIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' || e.key === 'Space') {
        setActivePage((prev) => Math.min(pages.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActivePage((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pages.length, onClose]);

  if (!isOpen) return null;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col items-center justify-between select-none animate-in fade-in duration-200">
      
      {/* Top Floating Control Bar */}
      <div className="w-full h-14 px-6 flex items-center justify-between text-white bg-gradient-to-b from-black/80 to-transparent z-10">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm tracking-tight text-gray-200">{title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
            Page {activePage + 1} of {pages.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="Toggle Browser Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="Exit Presentation (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Presentation Stage */}
      <div className="flex-1 w-full flex items-center justify-center p-8 overflow-hidden relative">
        {currentCanvasDataUrl ? (
          <img
            src={currentCanvasDataUrl}
            alt={title}
            className="max-h-full max-w-full object-contain rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
          />
        ) : (
          <div className="text-gray-500 font-bold text-sm">Rendering slide preview...</div>
        )}

        {/* Previous Button */}
        {pages.length > 1 && (
          <button
            onClick={() => setActivePage((p) => Math.max(0, p - 1))}
            disabled={activePage <= 0}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md disabled:opacity-20 disabled:pointer-events-none transition-all"
            title="Previous Slide (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {pages.length > 1 && (
          <button
            onClick={() => setActivePage((p) => Math.min(pages.length - 1, p + 1))}
            disabled={activePage >= pages.length - 1}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md disabled:opacity-20 disabled:pointer-events-none transition-all"
            title="Next Slide (Right Arrow or Space)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Subtle Navigation Bar */}
      <div className="w-full h-12 px-6 flex items-center justify-center text-gray-400 text-xs bg-gradient-to-t from-black/80 to-transparent">
        <span>Use Left / Right arrow keys to navigate slides. Press Esc to exit.</span>
      </div>

    </div>
  );
};
