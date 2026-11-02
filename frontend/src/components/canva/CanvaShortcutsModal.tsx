import React, { useEffect } from 'react';
import { X, Keyboard, Command } from 'lucide-react';

interface CanvaShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keys: string[];
  description: string;
}

export const CanvaShortcutsModal: React.FC<CanvaShortcutsModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories: { title: string; shortcuts: ShortcutItem[] }[] = [
    {
      title: 'Canvas & Selection',
      shortcuts: [
        { keys: ['Ctrl', 'C'], description: 'Copy selected element' },
        { keys: ['Ctrl', 'V'], description: 'Paste element onto canvas' },
        { keys: ['Ctrl', 'D'], description: 'Duplicate selected element' },
        { keys: ['Del', 'Backspace'], description: 'Delete selected element' },
        { keys: ['Arrow Keys'], description: 'Nudge element by 1px' },
        { keys: ['Shift', 'Arrows'], description: 'Nudge element by 10px' },
      ],
    },
    {
      title: 'Grouping & Layer Order',
      shortcuts: [
        { keys: ['Ctrl', 'G'], description: 'Group selected elements' },
        { keys: ['Ctrl', 'Shift', 'G'], description: 'Ungroup elements' },
        { keys: ['Position Tab'], description: 'Bring Forward / Send Backward' },
        { keys: ['Lock Icon'], description: 'Lock or Unlock element in place' },
      ],
    },
    {
      title: 'Document & View',
      shortcuts: [
        { keys: ['Ctrl', 'Z'], description: 'Undo last change' },
        { keys: ['Ctrl', 'Y'], description: 'Redo change' },
        { keys: ['Ctrl', 'S'], description: 'Save design to cloud' },
        { keys: ['Ctrl', 'Wheel'], description: 'Zoom artboard in / out' },
        { keys: ['?'], description: 'Open this keyboard shortcuts guide' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs select-none p-4 animate-in fade-in duration-150">
      <div className="bg-[#1e2023] text-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#343538] overflow-hidden">
        
        {/* Header */}
        <div className="p-4 border-b border-[#2b2d31] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#8b3dff]/20 text-[#8b3dff]">
              <Keyboard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Keyboard Shortcuts</h3>
              <p className="text-xs text-gray-400">Work faster with Canva-compatible productivity hotkeys</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
          {categories.map((cat) => (
            <div key={cat.title}>
              <h4 className="text-[11px] font-black uppercase text-gray-400 tracking-wider mb-2.5">
                {cat.title}
              </h4>
              <div className="space-y-1.5">
                {cat.shortcuts.map((sc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#18191b] border border-[#2b2d31] text-xs hover:border-gray-600 transition-colors"
                  >
                    <span className="text-gray-300 font-medium">{sc.description}</span>
                    <div className="flex items-center gap-1">
                      {sc.keys.map((k, ki) => (
                        <kbd
                          key={ki}
                          className="px-2 py-0.5 rounded bg-[#252627] border border-[#3b3c3e] text-gray-200 text-[11px] font-mono shadow-xs"
                        >
                          {k}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#18191b] border-t border-[#2b2d31] text-center text-xs text-gray-400">
          <span>Tip: Press <kbd className="px-1.5 py-0.5 bg-[#252627] rounded text-gray-300 border border-[#3b3c3e] font-mono text-[10px]">?</kbd> anywhere in the editor to open this helper.</span>
        </div>

      </div>
    </div>
  );
};
