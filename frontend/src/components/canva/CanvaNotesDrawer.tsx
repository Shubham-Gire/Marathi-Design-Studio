import React from 'react';
import { FileText, X } from 'lucide-react';

interface CanvaNotesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notes: string;
  onNotesChange: (notes: string) => void;
  currentPageNumber: number;
}

export const CanvaNotesDrawer: React.FC<CanvaNotesDrawerProps> = ({
  isOpen,
  onClose,
  notes,
  onNotesChange,
  currentPageNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-12 left-0 right-0 z-40 bg-[#1e2023] border-t border-[#343538] text-gray-200 h-44 shadow-2xl p-4 flex flex-col animate-in slide-in-from-bottom-6 duration-200">
      <div className="flex items-center justify-between pb-2 border-b border-[#2d2e30]">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-purple-400" />
          <span className="font-extrabold text-xs text-white uppercase tracking-wider">
            Presenter Notes (Page {currentPageNumber})
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <textarea
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        placeholder="Type talking points, speaker notes, or Marathi transcription cues for this design slide..."
        className="flex-1 w-full bg-transparent resize-none pt-3 text-xs text-gray-300 placeholder-gray-500 focus:outline-none font-sans leading-relaxed"
      />
    </div>
  );
};
