import React, { useEffect, useRef, useState } from 'react';
import {
  Copy,
  Scissors,
  Clipboard,
  Trash2,
  Lock,
  Unlock,
  ArrowUp,
  ArrowDown,
  Layers,
  ChevronRight,
  Sparkles,
  Paintbrush,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Component,
  MessageSquare,
  Link,
  Clock,
  UserCheck,
  Globe,
  Maximize2,
  Group,
  Ungroup,
  RotateCw
} from 'lucide-react';

export interface ContextMenuPosition {
  x: number;
  y: number;
}

export interface CanvaContextMenuProps {
  position: ContextMenuPosition | null;
  onClose: () => void;
  hasSelectedObject: boolean;
  isLocked: boolean;
  hasClipboard: boolean;
  hasCopiedStyle?: boolean;
  isText?: boolean;
  isGroup?: boolean;
  isSelection?: boolean;
  onGroup?: () => void;
  onUngroup?: () => void;
  onRotate?: (angle?: number, immediate?: boolean, direction?: 'Clockwise' | 'Counter-clockwise') => void;
  onCopy: () => void;
  onCopyStyle?: () => void;
  onPaste: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onBringForward: () => void;
  onSendBackward: () => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onFlipH?: () => void;
  onFlipV?: () => void;
  onToggleLock: () => void;
  onAlign: (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void;
  onDistribute?: (axis: 'horizontal' | 'vertical') => void;
  onSelectAll?: () => void;
  onAddText?: () => void;
  onCreateComponent?: () => void;
  onComment?: () => void;
  onAddLink?: () => void;
  onShowTiming?: () => void;
  onAltText?: () => void;
  onMagicWrite?: () => void;
  onTranslateText?: () => void;
}

export const CanvaContextMenu: React.FC<CanvaContextMenuProps> = ({
  position,
  onClose,
  hasSelectedObject,
  isLocked,
  hasClipboard,
  hasCopiedStyle = false,
  isText = false,
  isGroup = false,
  isSelection = false,
  onGroup,
  onUngroup,
  onRotate,
  onCopy,
  onCopyStyle,
  onPaste,
  onDuplicate,
  onDelete,
  onBringForward,
  onSendBackward,
  onBringToFront,
  onSendToBack,
  onToggleLock,
  onAlign,
  onSelectAll,
  onAddText,
  onCreateComponent,
  onComment,
  onAddLink,
  onShowTiming,
  onAltText,
  onMagicWrite,
  onTranslateText,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [showAlignSubmenu, setShowAlignSubmenu] = useState(false);
  const [showLayerSubmenu, setShowLayerSubmenu] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!position) return null;

  // Ensure menu stays within window bounds
  const menuWidth = 260;
  const menuHeight = 520;
  const left = Math.min(position.x, Math.max(10, window.innerWidth - menuWidth - 16));
  const top = Math.min(position.y, Math.max(10, window.innerHeight - menuHeight - 16));

  return (
    <div
      ref={menuRef}
      id="canva-context-menu"
      data-testid="canva-context-menu"
      style={{ left: `${left}px`, top: `${top}px` }}
      className="canva-context-menu fixed z-50 w-64 bg-[#18191b] text-gray-200 border border-[#2d2e30] rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.6)] py-1.5 text-xs select-none backdrop-blur-md animate-in fade-in zoom-in-95 duration-100 max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700"
      onMouseDown={(e) => e.stopPropagation()}
    >
      {hasSelectedObject ? (
        <>
          {/* 1. Copy */}
          <button
            onClick={() => { onCopy(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Copy className="w-3.5 h-3.5 text-gray-400" />
              <span>Copy</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+C</span>
          </button>

          {/* 2. Copy Style (Paint roller) */}
          <button
            onClick={() => { if (onCopyStyle) onCopyStyle(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Paintbrush className="w-3.5 h-3.5 text-purple-400" />
              <span>Copy style</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+Alt+C</span>
          </button>

          {/* 3. Paste */}
          <button
            onClick={() => { onPaste(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Clipboard className="w-3.5 h-3.5 text-gray-400" />
              <span>Paste</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+V</span>
          </button>

          {/* 4. Duplicate */}
          <button
            onClick={() => { onDuplicate(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Duplicate</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+D</span>
          </button>

          {/* 5. Delete */}
          <button
            onClick={() => { onDelete(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">DELETE</span>
          </button>

          {/* Group / Ungroup Button */}
          {(isGroup || isSelection || onGroup) && (
            <button
              onClick={() => {
                if (isGroup && onUngroup) {
                  onUngroup();
                } else if (onGroup) {
                  onGroup();
                }
                onClose();
              }}
              className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer text-purple-300 font-semibold"
            >
              <div className="flex items-center gap-2.5">
                {isGroup ? (
                  <>
                    <Ungroup className="w-3.5 h-3.5 text-purple-400" />
                    <span>Ungroup</span>
                  </>
                ) : (
                  <>
                    <Group className="w-3.5 h-3.5 text-purple-400" />
                    <span>Group</span>
                  </>
                )}
              </div>
              <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">
                {isGroup ? 'Ctrl+Shift+G' : 'Ctrl+G'}
              </span>
            </button>
          )}

          {/* Rotate 90° Action */}
          {onRotate && (
            <button
              onClick={() => {
                onRotate(90, false, 'Clockwise');
                onClose();
              }}
              className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <RotateCw className="w-3.5 h-3.5 text-sky-400" />
                <span>Rotate 90° Smoothly</span>
              </div>
              <span className="text-[10px] text-purple-400 font-mono bg-[#222326] px-1.5 py-0.5 rounded font-bold">
                +90° (25%) ↻
              </span>
            </button>
          )}

          <div className="border-t border-[#2d2e30] my-1" />

          {/* 6. Layer Submenu */}
          <div
            className="relative"
            onMouseEnter={() => setShowLayerSubmenu(true)}
            onMouseLeave={() => setShowLayerSubmenu(false)}
          >
            <button
              className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-3.5 h-3.5 text-purple-400" />
                <span>Layer</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {showLayerSubmenu && (
              <div className="absolute left-full top-0 -ml-1 w-48 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl py-1 z-50 text-xs">
                <button
                  onClick={() => { onBringForward(); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left cursor-pointer"
                >
                  <span>Bring forward</span>
                  <span className="text-[10px] text-gray-500 font-mono">Ctrl+]</span>
                </button>
                <button
                  onClick={() => { onSendBackward(); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left cursor-pointer"
                >
                  <span>Send backward</span>
                  <span className="text-[10px] text-gray-500 font-mono">Ctrl+[</span>
                </button>
                <button
                  onClick={() => { onBringToFront(); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left font-bold text-purple-400 cursor-pointer"
                >
                  <span>Bring to front</span>
                  <span className="text-[10px] text-gray-500 font-mono">Ctrl+Shift+]</span>
                </button>
                <button
                  onClick={() => { onSendToBack(); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left text-gray-400 cursor-pointer"
                >
                  <span>Send to back</span>
                  <span className="text-[10px] text-gray-500 font-mono">Ctrl+Shift+[</span>
                </button>
              </div>
            )}
          </div>

          {/* 7. Align to Page Submenu */}
          <div
            className="relative"
            onMouseEnter={() => setShowAlignSubmenu(true)}
            onMouseLeave={() => setShowAlignSubmenu(false)}
          >
            <button
              className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <AlignCenter className="w-3.5 h-3.5 text-sky-400" />
                <span>Align to page</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {showAlignSubmenu && (
              <div className="absolute left-full top-0 -ml-1 w-44 bg-[#18191b] border border-[#2d2e30] rounded-xl shadow-2xl py-1 z-50 text-xs">
                <button
                  onClick={() => { onAlign('top'); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white text-left cursor-pointer"
                >
                  Top
                </button>
                <button
                  onClick={() => { onAlign('middle'); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white text-left cursor-pointer"
                >
                  Middle
                </button>
                <button
                  onClick={() => { onAlign('bottom'); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white text-left cursor-pointer"
                >
                  Bottom
                </button>
                <div className="border-t border-[#2d2e30] my-1" />
                <button
                  onClick={() => { onAlign('left'); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white text-left cursor-pointer"
                >
                  Left
                </button>
                <button
                  onClick={() => { onAlign('center'); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white text-left cursor-pointer"
                >
                  Center
                </button>
                <button
                  onClick={() => { onAlign('right'); onClose(); }}
                  className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white text-left cursor-pointer"
                >
                  Right
                </button>
              </div>
            )}
          </div>

          <div className="border-t border-[#2d2e30] my-1" />

          {/* 8. Create Component */}
          <button
            onClick={() => { if (onCreateComponent) onCreateComponent(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Component className="w-3.5 h-3.5 text-indigo-400" />
              <span>Create component</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+Alt+K</span>
          </button>

          {/* 9. Comment */}
          <button
            onClick={() => { if (onComment) onComment(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Comment</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+Alt+N</span>
          </button>

          {/* 10. Lock / Unlock */}
          <button
            onClick={() => { onToggleLock(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              {isLocked ? (
                <>
                  <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Unlock</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lock</span>
                </>
              )}
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-500" />
          </button>

          {/* 11. Link */}
          <button
            onClick={() => { if (onAddLink) onAddLink(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Link className="w-3.5 h-3.5 text-blue-400" />
              <span>Link</span>
            </div>
            <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+K</span>
          </button>

          {/* 12. Show element timing */}
          <button
            onClick={() => { if (onShowTiming) onShowTiming(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Show element timing</span>
            </div>
          </button>

          {/* 13. Alternative text */}
          <button
            onClick={() => { if (onAltText) onAltText(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Alternative text</span>
            </div>
          </button>

          <div className="border-t border-[#2d2e30] my-1" />

          {/* 14. Magic Write */}
          <button
            onClick={() => { if (onMagicWrite) onMagicWrite(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer text-purple-300 hover:text-purple-200"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="font-semibold">Magic Write</span>
            </div>
          </button>

          {/* 15. Translate text */}
          <button
            onClick={() => { if (onTranslateText) onTranslateText(); onClose(); }}
            className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer text-gray-300"
          >
            <div className="flex items-center gap-2.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>Translate text</span>
            </div>
            <span className="text-[10px] text-amber-400">👑</span>
          </button>
        </>
      ) : (
        <>
          {/* Canvas Background Actions */}
          {hasClipboard && (
            <button
              onClick={() => { onPaste(); onClose(); }}
              className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Clipboard className="w-3.5 h-3.5 text-gray-400" />
                <span>Paste</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+V</span>
            </button>
          )}

          {onSelectAll && (
            <button
              onClick={() => { onSelectAll(); onClose(); }}
              className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
                <span>Select all objects</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">Ctrl+A</span>
            </button>
          )}

          {onAddText && (
            <button
              onClick={() => { onAddText(); onClose(); }}
              className="w-full px-3 py-1.5 hover:bg-[#27282b] hover:text-white flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Add text box</span>
              </div>
              <span className="text-[10px] text-gray-500 font-mono bg-[#222326] px-1.5 py-0.5 rounded">T</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};
