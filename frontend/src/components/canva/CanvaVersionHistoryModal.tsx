import React from 'react';
import { History, X, Clock, RotateCcw, Check, FileCheck } from 'lucide-react';

interface CanvaVersionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historySnapshots: string[];
  currentHistoryIndex: number;
  onRestoreVersion: (index: number) => void;
  designTitle: string;
}

export const CanvaVersionHistoryModal: React.FC<CanvaVersionHistoryModalProps> = ({
  isOpen,
  onClose,
  historySnapshots,
  currentHistoryIndex,
  onRestoreVersion,
  designTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-[#1e2023] text-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#343538] overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-[#2b2d31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-purple-400" />
            <div>
              <h3 className="font-extrabold text-base text-white">Version History</h3>
              <p className="text-[11px] text-gray-400">{designTitle || 'Untitled Design'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Snapshots List */}
        <div className="p-5 overflow-y-auto space-y-2 text-xs flex-1">
          {historySnapshots.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="font-bold">No previous versions yet</p>
              <p className="text-[11px]">As you edit, snapshots are automatically created.</p>
            </div>
          ) : (
            historySnapshots.map((_, idx) => {
              const isCurrent = idx === currentHistoryIndex;
              const stepNumber = idx + 1;
              const isLatest = idx === historySnapshots.length - 1;

              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between transition-colors ${
                    isCurrent
                      ? 'bg-purple-950/40 border-purple-500/80 text-white'
                      : 'bg-[#18191b] border-[#343538] text-gray-300 hover:bg-[#222428]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                      isCurrent ? 'bg-purple-600 text-white' : 'bg-[#2b2d33] text-gray-400'
                    }`}>
                      v{stepNumber}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs">
                          {isLatest ? 'Current Working Version' : `Snapshot #` + stepNumber}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 text-[10px] font-black">
                            Active
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400 block mt-0.5">
                        Autosaved snapshot with all layers and typography
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCurrent ? (
                      <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        <span>Loaded</span>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          onRestoreVersion(idx);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#2b2d33] hover:bg-purple-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Restore</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 bg-[#141517] border-t border-[#2b2d31] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#2b2d33] hover:bg-[#34363d] text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
