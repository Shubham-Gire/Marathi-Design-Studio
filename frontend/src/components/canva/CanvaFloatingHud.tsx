import React, { useRef } from 'react';
import {
  MessageSquarePlus,
  Lock,
  Unlock,
  CopyPlus,
  Trash2,
  MoreHorizontal,
  RotateCw,
  RotateCcw
} from 'lucide-react';

export interface FloatingHudPosition {
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
}

interface CanvaFloatingHudProps {
  position: FloatingHudPosition | null;
  isLocked: boolean;
  onToggleLock: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onOpenContextMenu: (e: React.MouseEvent) => void;
  onComment?: () => void;
  onMagicWand?: () => void;
  onRotate?: (angleOrDelta?: number, immediate?: boolean, direction?: 'Clockwise' | 'Counter-clockwise') => void;
  onStartInteractiveRotate?: (e: React.MouseEvent) => void;
}

export const CanvaFloatingHud: React.FC<CanvaFloatingHudProps> = ({
  position,
  isLocked,
  onToggleLock,
  onDuplicate,
  onDelete,
  onOpenContextMenu,
  onComment,
  onRotate,
  onStartInteractiveRotate,
}) => {
  const moreBtnRef = useRef<HTMLButtonElement>(null);

  if (!position) return null;

  // The HUD floats directly above the element center
  const hudX = position.x;
  const hudY = position.y - 14; // 14px above top boundary

  // Rotation indicator handle floats directly below the element
  const rotX = position.x;
  const rotY = position.y + position.height + 22;

  const handleMoreClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (moreBtnRef.current) {
      const rect = moreBtnRef.current.getBoundingClientRect();
      // Pass synthetic event with the button's position
      const customEvent = {
        ...e,
        clientX: rect.left,
        clientY: rect.bottom + 6,
        stopPropagation: () => e.stopPropagation(),
        preventDefault: () => e.preventDefault(),
      } as unknown as React.MouseEvent;
      onOpenContextMenu(customEvent);
    } else {
      onOpenContextMenu(e);
    }
  };

  return (
    <>
      {/* 1. TOP QUICK-ACTION HUD CAPSULE (Exact Canva Style) */}
      <div
        id="floating-quick-hud"
        data-testid="floating-quick-hud"
        style={{
          left: `${hudX}px`,
          top: `${hudY}px`,
        }}
        className="canva-floating-hud absolute -translate-x-1/2 -translate-y-full z-40 flex items-center bg-[#18191b] text-gray-200 border border-[#2f3136] rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.5)] px-1.5 py-1 gap-0.5 text-xs select-none backdrop-blur-md animate-in fade-in zoom-in-95 duration-100"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Comment Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onComment) onComment();
          }}
          className="p-1.5 hover:bg-[#282a2e] hover:text-white rounded-lg transition-colors text-gray-300 cursor-pointer"
          title="Add comment (Ctrl+Alt+N)"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
        </button>

        {/* Lock / Unlock Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
            isLocked
              ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
              : 'hover:bg-[#282a2e] hover:text-white text-gray-300'
          }`}
          title={isLocked ? 'Unlock element' : 'Lock element'}
        >
          {isLocked ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
        </button>

        {/* Duplicate Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="p-1.5 hover:bg-[#282a2e] hover:text-white rounded-lg transition-colors text-gray-300 cursor-pointer"
          title="Duplicate (Ctrl+D)"
        >
          <CopyPlus className="w-3.5 h-3.5" />
        </button>

        {/* Delete Action */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 hover:bg-red-500/20 hover:text-red-400 text-gray-300 rounded-lg transition-colors cursor-pointer"
          title="Delete (Del)"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <div className="h-3 w-px bg-[#2d2e30] mx-0.5" />

        {/* More Options (...) - Triggers Context Menu */}
        <button
          ref={moreBtnRef}
          onClick={handleMoreClick}
          className="p-1.5 hover:bg-[#282a2e] hover:text-white rounded-lg transition-colors text-gray-300 cursor-pointer"
          title="More options (Right-click)"
        >
          <MoreHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. BOTTOM CIRCULAR ROTATION HANDLE (Interactive Mouse-Direction Rotation) */}
      <div
        id="canva-rotation-handle"
        data-testid="canva-rotation-handle"
        style={{
          left: `${rotX}px`,
          top: `${rotY}px`,
        }}
        className="canva-floating-hud canva-rotation-handle absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto flex flex-col items-center group select-none"
      >
        <button
          type="button"
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (onStartInteractiveRotate) {
              onStartInteractiveRotate(e);
            }
          }}
          title="Drag to rotate smoothly in direction of mouse pointer (Shift to snap 15°)"
          data-testid="hud-rotate-btn"
          className="w-7 h-7 rounded-full bg-white text-gray-800 hover:text-purple-600 hover:border-[#8b3dff] hover:scale-110 active:scale-95 border border-gray-300 shadow-[0_2px_8px_rgba(0,0,0,0.25)] flex items-center justify-center cursor-grab active:cursor-grabbing transition-all select-none"
        >
          <RotateCw className="w-3.5 h-3.5 text-gray-800 hover:text-purple-600 transition-colors" />
        </button>
      </div>
    </>
  );
};
