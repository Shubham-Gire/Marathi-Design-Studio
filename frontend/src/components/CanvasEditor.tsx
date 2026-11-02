import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import jsPDF from 'jspdf';
import {
  Plus,
  CopyPlus,
  FileText,
  Clock,
  Sparkles,
  Maximize2,
  ChevronUp,
  ChevronDown,
  ArrowUpToLine,
  Lock,
  Unlock,
  Trash2,
  RotateCw,
  RotateCcw
} from 'lucide-react';
import { CanvaHeader } from './canva/CanvaHeader';
import { CanvaToolbar } from './canva/CanvaToolbar';
import { CanvaDock, CanvaTabId } from './canva/CanvaDock';
import { CanvaDrawer, FontCombination } from './canva/CanvaDrawer';
import { CanvaBottomBar } from './canva/CanvaBottomBar';
import { CanvaExportModal } from './canva/CanvaExportModal';
import { CanvaResizeModal } from './canva/CanvaResizeModal';
import { CanvaShortcutsModal } from './canva/CanvaShortcutsModal';
import { CanvaContextMenu, ContextMenuPosition } from './canva/CanvaContextMenu';
import { CanvaRulers } from './canva/CanvaRulers';
import { CanvaPresentationModal } from './canva/CanvaPresentationModal';
import { CanvaFloatingHud, FloatingHudPosition } from './canva/CanvaFloatingHud';
import { CanvaTimerModal } from './canva/CanvaTimerModal';
import { CanvaNotesDrawer } from './canva/CanvaNotesDrawer';
import { CanvaShareModal } from './canva/CanvaShareModal';
import { CanvaVersionHistoryModal } from './canva/CanvaVersionHistoryModal';
import { CanvaDrawFloatingToolbar, CanvaDrawToolType, CanvaBrushStyle } from './canva/CanvaDrawFloatingToolbar';
import { CanvaTextEffectsDrawer, createTextCurvePath, TextEffectStyle } from './canva/CanvaTextEffectsDrawer';
import { CanvaCropModal } from './canva/CanvaCropModal';
import { CanvaMarathiKeyboard } from './canva/CanvaMarathiKeyboard';
import { CanvaLegacyConverterModal } from './canva/CanvaLegacyConverterModal';
import { CanvaFontManagerModal } from './canva/CanvaFontManagerModal';
import { CALLIGRAPHY_PRESETS } from '../config/calligraphyPresets';
import { AiAssistantModal } from './AiAssistantModal';
import { IntegrationSetupModal, IntegrationDetails } from './IntegrationSetupModal';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Template, AiBriefResponse, DesignElement } from '../types';
import { CalligraphyItem } from '../config/calligraphyPresets';
import { MARATHI_FONTS } from '../config/marathiFonts';
import { LinkModal, AltTextModal, ElementTimingModal, CommentModal } from './canva/CanvaElementModals';

// Custom Canva Selection Theme for Fabric Objects
if (fabric && fabric.Object) {
  fabric.Object.prototype.borderColor = '#8b5cf6';
  fabric.Object.prototype.cornerColor = '#ffffff';
  fabric.Object.prototype.cornerStrokeColor = '#8b5cf6';
  fabric.Object.prototype.cornerSize = 10;
  fabric.Object.prototype.cornerStyle = 'circle';
  fabric.Object.prototype.transparentCorners = false;
  fabric.Object.prototype.borderScaleFactor = 2;
  fabric.Object.prototype.padding = 4;
  fabric.Object.prototype.borderDashArray = undefined;
  fabric.Object.prototype.centeredRotation = true;
  fabric.Object.prototype.setControlVisible('mtr', false);
}

// Double-click and triple-click on any text box selects all text
if (fabric && fabric.IText) {
  (fabric.IText.prototype as any).doubleClickHandler = function (this: fabric.IText, options: any) {
    if (!this.isEditing) {
      this.enterEditing(options?.e);
    }
    this.selectAll();
    this.renderCursorOrSelection();
    if (this.hiddenTextarea) {
      this.hiddenTextarea.focus();
      this.hiddenTextarea.select();
    }
    if (this.canvas) {
      this.canvas.requestRenderAll();
    }
    setTimeout(() => {
      if (this.isEditing) {
        this.selectAll();
        this.renderCursorOrSelection();
        if (this.hiddenTextarea) {
          this.hiddenTextarea.focus();
          this.hiddenTextarea.select();
        }
        if (this.canvas) {
          this.canvas.requestRenderAll();
        }
      }
    }, 20);
  };

  (fabric.IText.prototype as any).tripleClickHandler = function (this: fabric.IText, options: any) {
    if (!this.isEditing) {
      this.enterEditing(options?.e);
    }
    this.selectAll();
    this.renderCursorOrSelection();
    if (this.hiddenTextarea) {
      this.hiddenTextarea.focus();
      this.hiddenTextarea.select();
    }
    if (this.canvas) {
      this.canvas.requestRenderAll();
    }
  };
}

// Defensive patch for Fabric 5.3 stylesToArray on multi-line textboxes
if ((fabric as any).util && (fabric as any).util.stylesToArray) {
  const origStylesToArray = (fabric as any).util.stylesToArray;
  (fabric as any).util.stylesToArray = function (styles: any, text: string) {
    if (!styles) styles = {};
    try {
      return origStylesToArray.call(this, styles, text);
    } catch {
      return [];
    }
  };
}

interface PagePreviewCardProps {
  pageJson: string;
  width: number;
  height: number;
  zoomLevel: number;
  pageIndex: number;
  onClick: () => void;
}

const PagePreviewCard: React.FC<PagePreviewCardProps> = ({
  pageJson,
  width,
  height,
  zoomLevel,
  pageIndex,
  onClick,
}) => {
  const scaledW = Math.round(width * zoomLevel);
  const scaledH = Math.round(height * zoomLevel);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, el.width, el.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, el.width, el.height);

    if (pageJson && pageJson.trim().length > 0) {
      try {
        const offCanvas = new fabric.StaticCanvas(null, { width, height });
        offCanvas.loadFromJSON(JSON.parse(pageJson), () => {
          offCanvas.renderAll();
          const offEl = offCanvas.getElement();
          if (offEl) {
            ctx.drawImage(offEl, 0, 0, el.width, el.height);
          }
          offCanvas.dispose();
        });
      } catch (e) {
        console.error('Error rendering preview for page', pageIndex, e);
      }
    }
  }, [pageJson, width, height, zoomLevel]);

  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer transition-all duration-200 select-none rounded-sm overflow-hidden"
      style={{
        width: `${scaledW}px`,
        height: `${scaledH}px`,
        boxShadow: '0 16px 64px -8px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      }}
      title={`Click to edit Page ${pageIndex + 1}`}
    >
      <canvas
        ref={canvasRef}
        width={scaledW}
        height={scaledH}
        className="w-full h-full block bg-white"
      />
      {/* Hover action overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-[#8b3dff]/10 border-2 border-transparent group-hover:border-[#8b3dff] transition-all flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 bg-[#18191b]/95 text-purple-300 font-bold text-xs px-3.5 py-1.5 rounded-lg border border-[#8b3dff] shadow-2xl transition-opacity backdrop-blur-md">
          Click to edit Page {pageIndex + 1}
        </span>
      </div>
    </div>
  );
};

interface CanvasEditorProps {
  initialCanvasJson?: string;
  initialTitle?: string;
  projectId?: number;
  initialWidth?: number;
  initialHeight?: number;
  onSaveSuccess?: (savedProjectId: number) => void;
}

export const CanvasEditor: React.FC<CanvasEditorProps> = ({
  initialCanvasJson,
  initialTitle = 'Untitled Design',
  projectId,
  initialWidth,
  initialHeight,
  onSaveSuccess,
}) => {
  const { user, openAuthModal } = useAuth();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  // Editor State
  const [title, setTitle] = useState(initialTitle);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [currentProjectId, setCurrentProjectId] = useState<number | undefined>(projectId);
  const [canvasDimensions, setCanvasDimensions] = useState<{ width: number; height: number }>({
    width: initialWidth || 1080,
    height: initialHeight || 1080,
  });
  const canvasDimensionsRef = useRef(canvasDimensions);
  canvasDimensionsRef.current = canvasDimensions;
  const [canvasBgColor, setCanvasBgColor] = useState<string>('#ffffff');
  const [zoomLevel, setZoomLevel] = useState<number>(0.55);

  // Active Selection
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [canvasObjects, setCanvasObjects] = useState<fabric.Object[]>([]);

  // Canva Dock & Drawer
  const [activeTab, setActiveTab] = useState<CanvaTabId>('templates');
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Freehand Drawing & Tools (Whiteboard/Draw floating bar)
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [brushColor, setBrushColor] = useState('#ef4444');
  const [brushWidth, setBrushWidth] = useState(4);
  const [drawActiveTool, setDrawActiveTool] = useState<CanvaDrawToolType>('select');
  const [brushStyle, setBrushStyle] = useState<CanvaBrushStyle>('pen');

  // Text Effects & Curve Drawer (Matching Canva Screenshot)
  const [isTextEffectsDrawerOpen, setIsTextEffectsDrawerOpen] = useState(false);
  const [textCurvature, setTextCurvature] = useState<number>(0);
  const [textEffectStyle, setTextEffectStyle] = useState<TextEffectStyle>('none');

  // Modals
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isResizeModalOpen, setIsResizeModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeIntegration, setActiveIntegration] = useState<IntegrationDetails | null>(null);

  // Sidebar Data
  const [templates, setTemplates] = useState<Template[]>([]);
  const [userMedia, setUserMedia] = useState<any[]>(() => {
    try {
      const cached = localStorage.getItem('marathi_user_media');
      return cached ? JSON.parse(cached) : [];
    } catch (e) {
      return [];
    }
  });
  const [isUploading, setIsUploading] = useState(false);

  // Undo / Redo Stacks
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef<number>(-1);
  const isUndoRedoActionRef = useRef<boolean>(false);

  // Clipboard Reference
  const clipboardRef = useRef<fabric.Object | null>(null);

  // Multi-Page Support
  const [pages, setPages] = useState<string[]>(['']);
  const [pageTitles, setPageTitles] = useState<string[]>(['Page 1']);
  const [pageLocks, setPageLocks] = useState<boolean[]>([false]);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const pagesRef = useRef<string[]>(['']);
  pagesRef.current = pages;
  const currentPageIndexRef = useRef<number>(0);
  currentPageIndexRef.current = currentPageIndex;
  const hasLoadedInitialRef = useRef<boolean>(false);

  // Shortcuts Cheatsheet Modal
  const [isShortcutsModalOpen, setIsShortcutsModalOpen] = useState(false);

  // Precision View Controls (Rulers, Margins, Grid, Pan Tool & Interactive Guides)
  const [showRulers, setShowRulers] = useState(true);
  const [showMargins, setShowMargins] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [isPanMode, setIsPanMode] = useState(false);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedBounds, setSelectedBounds] = useState<{ left: number; top: number; width: number; height: number } | null>(null);
  const [horizontalGuides, setHorizontalGuides] = useState<number[]>([]);
  const [verticalGuides, setVerticalGuides] = useState<number[]>([]);

  // Canvas Right-Click Context Menu
  const [contextMenuPos, setContextMenuPos] = useState<ContextMenuPosition | null>(null);

  // Fullscreen Presentation Mode
  const [isPresentationOpen, setIsPresentationOpen] = useState(false);
  const [presentationDataUrl, setPresentationDataUrl] = useState<string>('');

  // Floating Contextual HUD
  const [floatingHudPos, setFloatingHudPos] = useState<FloatingHudPosition | null>(null);

  // Live Rotation Feedback Indicator (angle, percentage, direction)
  const [rotationIndicator, setRotationIndicator] = useState<{
    visible: boolean;
    angle: number;
    percentage: number;
    direction: 'Clockwise' | 'Counter-clockwise';
    x: number;
    y: number;
  } | null>(null);
  const hideRotationIndicatorTimerRef = useRef<any>(null);
  const rotationAnimRef = useRef<{
    rafId: number | null;
    currentAngle: number;
    targetAngle: number;
  }>({
    rafId: null,
    currentAngle: 0,
    targetAngle: 0,
  });

  // Presenter Notes & Stopwatch Timer
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [pageNotes, setPageNotes] = useState<Record<number, string>>({});
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  // Copied Style State for Paint Roller & Context Menu (Copy style / Paste style)
  const [copiedStyle, setCopiedStyle] = useState<any | null>(null);

  // Contextual Modals for Link, Alt Text, Timing, and Comments
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isAltTextModalOpen, setIsAltTextModalOpen] = useState(false);
  const [isTimingModalOpen, setIsTimingModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  // Share, Version History, and Image Crop Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [cropSourceUrl, setCropSourceUrl] = useState<string>('');

  // Marathi Typography Studio Modals
  const [isMarathiKeyboardOpen, setIsMarathiKeyboardOpen] = useState(false);
  const [isLegacyConverterOpen, setIsLegacyConverterOpen] = useState(false);
  const [isFontManagerOpen, setIsFontManagerOpen] = useState(false);

  // Drag Panning References
  const isPanningRef = useRef(false);
  const lastPanPosRef = useRef({ x: 0, y: 0 });

  // Pre-load top Marathi Calligraphy & Unicode Fonts into browser
  useEffect(() => {
    if (document.fonts) {
      const topFonts = [
        'Mukta',
        'Baloo 2',
        'Kalam',
        'Tillana',
        'Yatra One',
        'Rozha One',
        'SakalBharati',
        'Sarala',
        'AMS Aaditya',
        'AMS Lekhani',
        'Shivaji Unicode',
        'Tiro Devanagari Marathi'
      ];
      topFonts.forEach((f) => {
        document.fonts.load(`16px "${f}"`).catch(() => {});
      });
      MARATHI_FONTS.slice(0, 15).forEach((f) => {
        document.fonts.load(`16px "${f.id}"`).catch(() => {});
      });
    }
  }, []);

  // Contextual Floating HUD Position & Selection Bounds Updater for Rulers
  const updateFloatingHudPos = (obj?: fabric.Object | null) => {
    const target = obj !== undefined ? obj : fabricCanvasRef.current?.getActiveObject();
    if (!target || !fabricCanvasRef.current) {
      setFloatingHudPos(null);
      setSelectedBounds(null);
      return;
    }
    const bound = target.getBoundingRect(true, true);
    setFloatingHudPos({
      x: (bound.left + bound.width / 2) * zoomLevel,
      y: bound.top * zoomLevel,
      width: bound.width * zoomLevel,
      height: bound.height * zoomLevel,
      angle: target.angle || 0,
    });
    setSelectedBounds({
      left: bound.left,
      top: bound.top,
      width: bound.width,
      height: bound.height,
    });
  };

  // Live Rotation Indicator Updater
  const showRotationIndicator = (
    angle: number,
    percentage: number,
    direction: 'Clockwise' | 'Counter-clockwise',
    obj: fabric.Object,
    durationMs = 1200
  ) => {
    if (hideRotationIndicatorTimerRef.current) {
      clearTimeout(hideRotationIndicatorTimerRef.current);
      hideRotationIndicatorTimerRef.current = null;
    }
    const bound = obj.getBoundingRect(true, true);
    const x = (bound.left + bound.width / 2) * zoomLevel;
    const y = (bound.top + bound.height) * zoomLevel + 46;

    setRotationIndicator({
      visible: true,
      angle,
      percentage,
      direction,
      x,
      y,
    });

    if (durationMs > 0) {
      hideRotationIndicatorTimerRef.current = setTimeout(() => {
        setRotationIndicator((prev) => (prev ? { ...prev, visible: false } : null));
      }, durationMs);
    }
  };

  // Universal Drag-and-Drop Image Handler (Browser Images, Web URLs, Desktop Files, Drawer Assets)
  // Automatically adds image to Canvas AND saves it into the Upload Section (userMedia)
  const handleUniversalImageDrop = (e: DragEvent, dropCoords?: { x: number; y: number }) => {
    e.preventDefault();
    e.stopPropagation();

    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let dropX = canvasDimensions.width / 2;
    let dropY = canvasDimensions.height / 2;

    if (dropCoords) {
      dropX = dropCoords.x;
      dropY = dropCoords.y;
    } else {
      const stageWrapper = document.getElementById('fabric-stage-wrapper');
      if (stageWrapper) {
        const rect = stageWrapper.getBoundingClientRect();
        const zoom = canvas.getZoom() || 1;
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          dropX = (e.clientX - rect.left) / zoom;
          dropY = (e.clientY - rect.top) / zoom;
        }
      }
    }

    const addImageAtDrop = (imageUrl: string, fileOrName?: File | string) => {
      const processLoadedImage = (img: fabric.Image) => {
        if (!img || !img.width || !img.height) return;
        const maxDim = 420;
        let scale = 1;
        if (img.width > maxDim || img.height > maxDim) {
          scale = maxDim / Math.max(img.width, img.height);
        }
        img.set({
          left: Math.max(0, Math.min(canvasDimensions.width - 50, dropX - (img.width * scale) / 2)),
          top: Math.max(0, Math.min(canvasDimensions.height - 50, dropY - (img.height * scale) / 2)),
          scaleX: scale,
          scaleY: scale,
          cornerColor: '#8b3dff',
          cornerStyle: 'circle',
          borderColor: '#8b3dff',
          cornerSize: 12,
          transparentCorners: false,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();
        syncCanvasObjects();
        pushHistory();
        setSaveStatus('unsaved');

        // Save into Upload Section (userMedia) so it appears immediately in Uploads tab
        const assetName = typeof fileOrName === 'string' ? fileOrName : fileOrName?.name || 'Dropped Image';
        const newAsset = {
          id: Date.now() + Math.random(),
          url: imageUrl,
          name: assetName,
          size: typeof fileOrName === 'object' ? fileOrName.size : 0,
          type: typeof fileOrName === 'object' ? fileOrName.type : 'image/png',
          createdAt: new Date().toISOString(),
        };

        setUserMedia((prev) => {
          if (prev.some((m) => m.url === imageUrl)) return prev;
          const updated = [newAsset, ...prev];
          try {
            localStorage.setItem('marathi_user_media', JSON.stringify(updated));
          } catch (e) {}
          return updated;
        });

        // Automatically open Uploads drawer tab
        setActiveTab('uploads');
        setIsDrawerOpen(true);
      };

      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          if (img && img.width) {
            processLoadedImage(img);
          } else {
            fabric.Image.fromURL(imageUrl, (fallbackImg) => {
              if (fallbackImg) processLoadedImage(fallbackImg);
            });
          }
        },
        { crossOrigin: 'anonymous' }
      );
    };

    // 1. Check Local Files
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/') || /\.(png|jpe?g|webp|svg|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const dataUrl = event.target?.result as string;
          if (dataUrl) {
            addImageAtDrop(dataUrl, file);
          }
        };
        reader.readAsDataURL(file);

        if (user) {
          api.uploadMedia(file).then((uploadedAsset) => {
            if (uploadedAsset && uploadedAsset.url) {
              setUserMedia((prev) => {
                const filtered = prev.filter((m) => m.name !== file.name);
                return [uploadedAsset, ...filtered];
              });
            }
          }).catch(() => {});
        }
        return;
      }
    }

    // 2. Check internal application/json (from drawer)
    const jsonData = e.dataTransfer?.getData('application/json');
    if (jsonData) {
      try {
        const parsed = JSON.parse(jsonData);
        if (parsed.type === 'design-element' && parsed.element) {
          addDesignElement(parsed.element);
          return;
        }
        if (parsed.type === 'template' && parsed.template) {
          loadTemplate(parsed.template);
          return;
        }
        if (parsed.url) {
          addImageAtDrop(parsed.url, parsed.title || 'Drawer Asset');
          return;
        }
      } catch {}
    }

    // 3. Check HTML payload from dragged web page image (e.g. from Chrome, Edge, Firefox, Unsplash)
    const html = e.dataTransfer?.getData('text/html');
    if (html) {
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imgEl = doc.querySelector('img');
        if (imgEl && imgEl.src) {
          addImageAtDrop(imgEl.src, imgEl.alt || 'Web Image');
          return;
        }
      } catch {}
      const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (match && match[1]) {
        addImageAtDrop(match[1], 'Web Image');
        return;
      }
    }

    // 4. Check URI List (standard for browser image dragging)
    const uriList = e.dataTransfer?.getData('text/uri-list');
    if (uriList && uriList.trim().length > 0) {
      const firstUri = uriList.split('\n')[0].trim();
      if (firstUri.startsWith('http://') || firstUri.startsWith('https://') || firstUri.startsWith('data:image/')) {
        addImageAtDrop(firstUri, 'Web Image');
        return;
      }
    }

    // 5. Check URL standard (Edge)
    const edgeUrl = e.dataTransfer?.getData('URL');
    if (edgeUrl && edgeUrl.trim().length > 0) {
      const trimmed = edgeUrl.trim();
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/')) {
        addImageAtDrop(trimmed, 'Web Image');
        return;
      }
    }

    // 6. Check Plain Text URL
    const plainText = e.dataTransfer?.getData('text/plain');
    if (plainText && plainText.trim().length > 0) {
      const trimmed = plainText.trim();
      if (
        trimmed.startsWith('http://') ||
        trimmed.startsWith('https://') ||
        trimmed.startsWith('data:image/') ||
        /\.(png|jpe?g|webp|svg|gif)(\?.*)?$/i.test(trimmed)
      ) {
        addImageAtDrop(trimmed, 'Web Image');
        return;
      }
    }
  };

  // 1. Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      backgroundColor: canvasBgColor,
      preserveObjectStacking: true,
      selection: true,
      selectionColor: 'rgba(139, 92, 246, 0.15)',
      selectionBorderColor: '#8b5cf6',
      selectionLineWidth: 1.5,
    });

    fabricCanvasRef.current = fabricCanvas;
    (window as any).__fabricCanvas = fabricCanvas;

    // Load initial JSON or active page JSON
    if (!hasLoadedInitialRef.current && initialCanvasJson) {
      hasLoadedInitialRef.current = true;
      try {
        let parsed = typeof initialCanvasJson === 'string' ? JSON.parse(initialCanvasJson) : initialCanvasJson;

        // Multi-page document model restoration
        if (parsed && parsed.version === '2.0' && Array.isArray(parsed.pages)) {
          setPages(parsed.pages);
          pagesRef.current = parsed.pages;
          if (Array.isArray(parsed.pageTitles)) setPageTitles(parsed.pageTitles);
          if (Array.isArray(parsed.pageLocks)) setPageLocks(parsed.pageLocks);
          const activeIdx = parsed.currentPageIndex || 0;
          setCurrentPageIndex(activeIdx);
          currentPageIndexRef.current = activeIdx;
          const targetJson = parsed.pages[activeIdx];
          parsed = targetJson ? JSON.parse(targetJson) : null;
        }

        if (parsed && Array.isArray(parsed.objects)) {
          parsed.objects.forEach((obj: any) => {
            if (obj.type === 'textbox' || obj.type === 'text' || obj.type === 'i-text') {
              if (!obj.styles) obj.styles = {};
            }
          });
        }
        if (parsed) {
          fabricCanvas.loadFromJSON(parsed, () => {
            fabricCanvas.renderAll();
            syncCanvasObjects();
            pushHistory();
          });
        } else {
          pushHistory();
        }
      } catch (e) {
        console.error('Error loading initial JSON:', e);
        pushHistory();
      }
    } else {
      // Load current page JSON from pagesRef if available
      const activePageJson = pagesRef.current[currentPageIndex];
      if (activePageJson && activePageJson.trim().length > 0) {
        try {
          const parsed = JSON.parse(activePageJson);
          fabricCanvas.loadFromJSON(parsed, () => {
            fabricCanvas.renderAll();
            syncCanvasObjects();
            pushHistory();
          });
        } catch (e) {
          console.error('Error loading page JSON:', e);
          const bgRect = new fabric.Rect({
            left: 0,
            top: 0,
            width: canvasDimensions.width,
            height: canvasDimensions.height,
            fill: '#ffffff',
            selectable: false,
            name: 'background-layer',
          });
          fabricCanvas.add(bgRect);
          fabricCanvas.sendToBack(bgRect);
          syncCanvasObjects();
          pushHistory();
        }
      } else {
        // Default blank artboard background rect
        const bgRect = new fabric.Rect({
          left: 0,
          top: 0,
          width: canvasDimensions.width,
          height: canvasDimensions.height,
          fill: '#ffffff',
          selectable: false,
          name: 'background-layer',
        });
        fabricCanvas.add(bgRect);
        fabricCanvas.sendToBack(bgRect);
        syncCanvasObjects();
        pushHistory();
      }
    }

    // Event listeners
    fabricCanvas.on('selection:created', handleSelection);
    fabricCanvas.on('selection:updated', handleSelection);
    fabricCanvas.on('selection:cleared', handleSelectionCleared);

    // Double-click on text box automatically enters editing and selects all text
    fabricCanvas.on('mouse:dblclick', (opt: any) => {
      const target = opt?.target;
      if (target && (target instanceof fabric.IText || target.type === 'textbox' || target.type === 'i-text')) {
        const textObj = target as fabric.IText;
        if (!textObj.isEditing) {
          textObj.enterEditing(opt?.e);
        }
        textObj.selectAll();
        textObj.renderCursorOrSelection();
        if (textObj.hiddenTextarea) {
          textObj.hiddenTextarea.focus();
          textObj.hiddenTextarea.select();
        }
        fabricCanvas.requestRenderAll();
        setTimeout(() => {
          if (textObj.isEditing) {
            textObj.selectAll();
            textObj.renderCursorOrSelection();
            if (textObj.hiddenTextarea) {
              textObj.hiddenTextarea.focus();
              textObj.hiddenTextarea.select();
            }
            fabricCanvas.requestRenderAll();
          }
        }, 20);
      }
    });
    fabricCanvas.on('object:modified', (e: any) => {
      setSaveStatus('unsaved');
      syncCanvasObjects();
      pushHistory();
      updateFloatingHudPos();
      if (e?.target && typeof e.target.angle === 'number') {
        const norm = ((Math.round(e.target.angle) % 360) + 360) % 360;
        const pct = Math.round((norm / 360) * 100);
        showRotationIndicator(norm, pct, 'Clockwise', e.target, 1400);
      }
    });
    fabricCanvas.on('object:added', () => {
      if (!isUndoRedoActionRef.current) {
        setSaveStatus('unsaved');
        syncCanvasObjects();
      }
    });
    fabricCanvas.on('object:removed', () => {
      syncCanvasObjects();
      updateFloatingHudPos();
    });

    // Smart Snapping to Canvas Center & HUD position update
    fabricCanvas.on('object:moving', (e) => {
      const obj = e.target;
      if (!obj) return;
      const snapDist = 12;
      const canvasW = canvasDimensions.width;
      const canvasH = canvasDimensions.height;
      const objCenterX = (obj.left || 0) + (obj.getScaledWidth() / 2);
      const objCenterY = (obj.top || 0) + (obj.getScaledHeight() / 2);

      if (Math.abs(objCenterX - canvasW / 2) < snapDist) {
        obj.set({ left: (canvasW / 2) - (obj.getScaledWidth() / 2) });
      }
      if (Math.abs(objCenterY - canvasH / 2) < snapDist) {
        obj.set({ top: (canvasH / 2) - (obj.getScaledHeight() / 2) });
      }
      updateFloatingHudPos(obj);
    });

    fabricCanvas.on('object:scaling', (e) => {
      updateFloatingHudPos(e.target);
    });

    let lastDragAngle = 0;
    fabricCanvas.on('object:rotating', (e) => {
      const obj = e.target;
      if (!obj) return;
      updateFloatingHudPos(obj);

      const rawAngle = obj.angle || 0;
      const normalized = ((Math.round(rawAngle) % 360) + 360) % 360;
      const pct = Math.round((normalized / 360) * 100);
      const diff = rawAngle - lastDragAngle;
      const dir: 'Clockwise' | 'Counter-clockwise' = diff >= 0 ? 'Clockwise' : 'Counter-clockwise';
      lastDragAngle = rawAngle;

      showRotationIndicator(normalized, pct, dir, obj, 0);
    });

    // Mouse Wheel Zoom (Ctrl + Wheel or Trackpad Pinch)
    fabricCanvas.on('mouse:wheel', (opt) => {
      if (opt.e.ctrlKey || opt.e.metaKey) {
        opt.e.preventDefault();
        opt.e.stopPropagation();
        const delta = opt.e.deltaY;
        setZoomLevel((currentZoom) => {
          let next = currentZoom - delta * 0.0015;
          next = Math.max(0.15, Math.min(3.0, next));
          const canvas = fabricCanvasRef.current;
          if (canvas) {
            canvas.setZoom(next);
            canvas.setWidth(canvasDimensionsRef.current.width * next);
            canvas.setHeight(canvasDimensionsRef.current.height * next);
            canvas.renderAll();
          }
          return next;
        });
      }
    });

    // Cursor Tracking for Rulers & Guides
    fabricCanvas.on('mouse:move', (opt) => {
      if (opt.pointer) {
        setCursorPos({
          x: Math.round(opt.pointer.x),
          y: Math.round(opt.pointer.y),
        });
      }
    });
    fabricCanvas.on('mouse:out', () => {
      setCursorPos(null);
    });

    // Canvas Context Menu (Right Click) & Native Drag-and-Drop
    const upperCanvas = (fabricCanvas as any).upperCanvasEl;
    if (upperCanvas) {
      upperCanvas.oncontextmenu = (e: MouseEvent) => {
        e.preventDefault();
        setContextMenuPos({ x: e.clientX, y: e.clientY });
      };

      upperCanvas.addEventListener('dragover', (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
      });

      // Deselect active element when clicking on canvas background / empty area / unselectable layers
      fabricCanvas.on('mouse:down', (opt) => {
        // If target is an active/editing text object or selectable text, never discard
        if (opt.target && ((opt.target as any).isEditing || opt.target.type === 'textbox' || opt.target.type === 'i-text' || opt.target.type === 'text')) {
          return;
        }

        if (!opt.target || opt.target.name === 'background-layer' || !opt.target.selectable) {
          fabricCanvas.discardActiveObject();
          fabricCanvas.requestRenderAll();
          handleSelectionCleared();
        }
      });

      // Comprehensive Drag-and-Drop: Browser images, URLs, Local files & Drawer elements
      upperCanvas.addEventListener('drop', (e: DragEvent) => {
        const rect = upperCanvas.getBoundingClientRect();
        const zoom = fabricCanvas.getZoom() || 1;
        const dropX = (e.clientX - rect.left) / zoom;
        const dropY = (e.clientY - rect.top) / zoom;
        handleUniversalImageDrop(e, { x: dropX, y: dropY });
      });
    }

    // Fit canvas initially to container
    const handleWindowResize = () => {
      fitCanvasToContainer();
    };
    fitCanvasToContainer();
    window.addEventListener('resize', handleWindowResize);

    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        setIsSpacePressed(true);
      } else if (e.ctrlKey && e.key.toLowerCase() === 'r') {
        e.preventDefault();
        setShowRulers((prev) => !prev);
      } else if (e.ctrlKey && e.key.toLowerCase() === 'a' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        selectAllObjects();
      } else if (e.ctrlKey && e.key.toLowerCase() === 'x' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        cutSelected();
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        deleteSelected();
      } else if (e.key === '?' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        setIsShortcutsModalOpen((prev) => !prev);
      } else if (e.ctrlKey && e.key.toLowerCase() === 'g' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        if (e.shiftKey) {
          ungroupSelected();
        } else {
          groupSelected();
        }
      } else if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'c' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        handleCopyStyle();
      } else if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'v' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        handlePasteStyle();
      } else if (e.ctrlKey && e.key.toLowerCase() === 'b' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        const active = fabricCanvas.getActiveObject() as fabric.Textbox;
        if (active && (active.type === 'textbox' || active.type === 'text' || active.type === 'i-text')) {
          const isB = active.fontWeight === 'bold' || active.fontWeight === '700';
          updateTextProp('fontWeight', isB ? 'normal' : 'bold');
        }
      } else if (e.ctrlKey && e.key.toLowerCase() === 'i' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        const active = fabricCanvas.getActiveObject() as fabric.Textbox;
        if (active && (active.type === 'textbox' || active.type === 'text' || active.type === 'i-text')) {
          updateTextProp('fontStyle', active.fontStyle === 'italic' ? 'normal' : 'italic');
        }
      } else if (e.ctrlKey && e.key.toLowerCase() === 'u' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        const active = fabricCanvas.getActiveObject() as fabric.Textbox;
        if (active && (active.type === 'textbox' || active.type === 'text' || active.type === 'i-text')) {
          updateTextProp('underline', !active.underline);
        }
      } else if (e.ctrlKey && e.key === 'c' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        copySelected();
      } else if (e.ctrlKey && e.key === 'v' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        pasteClipboard();
      } else if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      } else if (e.ctrlKey && e.key === 'y') {
        e.preventDefault();
        redo();
      } else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleSave();
      } else if (e.ctrlKey && e.key === 'd' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        duplicateSelected();
      } else if (e.key.toLowerCase() === 't' && !(fabricCanvas.getActiveObject() as any)?.isEditing) {
        e.preventDefault();
        addText();
      } else if (e.key.toLowerCase() === 'r' && !(fabricCanvas.getActiveObject() as any)?.isEditing && !e.ctrlKey) {
        e.preventDefault();
        addShape('rect');
      } else if (e.key.toLowerCase() === 'c' && !(fabricCanvas.getActiveObject() as any)?.isEditing && !e.ctrlKey) {
        e.preventDefault();
        addShape('circle');
      } else if (e.key.toLowerCase() === 'l' && !(fabricCanvas.getActiveObject() as any)?.isEditing && !e.ctrlKey) {
        e.preventDefault();
        addShape('line');
      } else if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        const active = fabricCanvas.getActiveObject();
        if (active && !(active as any).isEditing) {
          e.preventDefault();
          const step = e.shiftKey ? 10 : 1;
          if (e.key === 'ArrowUp') active.set({ top: (active.top || 0) - step });
          if (e.key === 'ArrowDown') active.set({ top: (active.top || 0) + step });
          if (e.key === 'ArrowLeft') active.set({ left: (active.left || 0) - step });
          if (e.key === 'ArrowRight') active.set({ left: (active.left || 0) + step });
          fabricCanvas.renderAll();
          updateFloatingHudPos(active);
          pushHistory();
          setSaveStatus('unsaved');
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleWindowResize);
      try {
        fabricCanvas.dispose();
      } catch (e) {}
    };
  }, [currentPageIndex]);

  // Initial Sidebar Data Load
  useEffect(() => {
    loadSidebarData();
  }, []);

  // Keep Floating HUD synced on zoom changes or object updates
  useEffect(() => {
    if (selectedObject) {
      updateFloatingHudPos(selectedObject);
    } else {
      setFloatingHudPos(null);
    }
  }, [zoomLevel, selectedObject]);

  // Helper to determine if a clicked target belongs to contextual formatting tools, floating HUD, popovers, font selection, or modals
  const isToolbarOrPopover = (target: HTMLElement | null): boolean => {
    if (!target) return false;
    return !!(
      target.closest('[data-testid="contextual-toolbar"]') ||
      target.closest('.canva-contextual-toolbar') ||
      target.closest('.canva-toolbar') ||
      target.closest('#floating-quick-hud') ||
      target.closest('.canva-floating-hud') ||
      target.closest('#canva-rotation-handle') ||
      target.closest('.canva-rotation-handle') ||
      target.closest('[data-testid="hud-rotate-btn"]') ||
      target.closest('#canva-context-menu') ||
      target.closest('.canva-context-menu') ||
      target.closest('#canva-rotation-indicator-badge') ||
      target.closest('.canva-rotation-indicator') ||
      target.closest('#hud-rotation-info-badge') ||
      target.closest('.canva-font-selector') ||
      target.closest('[data-testid="canva-font-selector"]') ||
      target.closest('.canva-marathi-keyboard') ||
      target.closest('#canva-marathi-keyboard') ||
      target.closest('.popover-panel') ||
      target.closest('[role="dialog"]') ||
      target.closest('.canva-modal') ||
      target.closest('.color-picker-popover') ||
      target.closest('[data-font-card="true"]') ||
      target.closest('[data-testid="canva-text-effects-drawer"]') ||
      target.closest('.canva-text-effects-drawer') ||
      target.closest('[data-testid="canva-draw-floating-toolbar"]') ||
      target.closest('aside')
    );
  };

  // Viewport Container Pan Handlers & Deselect when clicking outside active elements
  const handleContainerMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isInsideCanvas = target.closest('#fabric-stage-wrapper') || target.closest('.canvas-container');

    if (!isInsideCanvas && !isToolbarOrPopover(target)) {
      const canvas = fabricCanvasRef.current;
      if (canvas && canvas.getActiveObject()) {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        setSelectedObject(null);
        setSelectedType(null);
        setFloatingHudPos(null);
        setSelectedBounds(null);
      }
    }

    if (isPanMode || isSpacePressed) {
      isPanningRef.current = true;
      lastPanPosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  // Global Outside-Click Deselection and Dragover Safety
  useEffect(() => {
    const handleGlobalPointerDown = (e: MouseEvent | PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Do not deselect if clicking inside canvas (Fabric handles internal selection/deselection)
      if (target.closest('.canvas-container') || target.closest('#fabric-stage-wrapper')) {
        return;
      }

      // Do not deselect if interacting with formatting toolbars, floating HUD, popovers, or font selection
      if (isToolbarOrPopover(target)) {
        return;
      }

      const canvas = fabricCanvasRef.current;
      if (canvas && canvas.getActiveObject()) {
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        setSelectedObject(null);
        setSelectedType(null);
        setFloatingHudPos(null);
        setSelectedBounds(null);
      }
    };

    const handleGlobalDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    window.addEventListener('pointerdown', handleGlobalPointerDown, true);
    window.addEventListener('mousedown', handleGlobalPointerDown, true);
    window.addEventListener('dragover', handleGlobalDragOver);
    return () => {
      window.removeEventListener('pointerdown', handleGlobalPointerDown, true);
      window.removeEventListener('mousedown', handleGlobalPointerDown, true);
      window.removeEventListener('dragover', handleGlobalDragOver);
    };
  }, []);

  const handleViewportDrop = (e: React.DragEvent) => {
    if ((e.target as HTMLElement)?.closest('canvas.upper-canvas')) {
      return; // Handled directly by upperCanvas drop listener
    }
    handleUniversalImageDrop(e.nativeEvent);
  };

  const handleContainerMouseMove = (e: React.MouseEvent) => {
    if (isPanningRef.current && containerRef.current) {
      const dx = e.clientX - lastPanPosRef.current.x;
      const dy = e.clientY - lastPanPosRef.current.y;
      containerRef.current.scrollLeft -= dx;
      containerRef.current.scrollTop -= dy;
      lastPanPosRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleContainerMouseUp = () => {
    isPanningRef.current = false;
  };

  // Fullscreen Presentation Mode Start
  const handleStartPresentation = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({ format: 'png', multiplier: 1.5 });
    setPresentationDataUrl(dataUrl);
    setIsPresentationOpen(true);
  };

  const syncCanvasObjects = () => {
    if (!fabricCanvasRef.current) return;
    setCanvasObjects([...fabricCanvasRef.current.getObjects()]);
  };

  const loadSidebarData = async () => {
    try {
      const tmpls = await api.getTemplates();
      setTemplates(tmpls);
    } catch (e) {}

    if (user) {
      try {
        const media = await api.getUserMedia();
        setUserMedia(media);
      } catch (e) {}
    }
  };

  // Zoom & Fitting (Synchronized with Poster Dimensions)
  const fitCanvasToContainer = (targetWidth?: number, targetHeight?: number) => {
    if (!containerRef.current || !fabricCanvasRef.current) return;
    const w = targetWidth ?? canvasDimensionsRef.current.width;
    const h = targetHeight ?? canvasDimensionsRef.current.height;
    const containerWidth = containerRef.current.clientWidth - 100;
    const containerHeight = containerRef.current.clientHeight - 100;
    const scale = Math.min(
      containerWidth / w,
      containerHeight / h,
      0.75
    );
    const newZoom = Math.max(0.15, scale);
    setZoom(newZoom, w, h);
  };

  const setZoom = (zoom: number, targetWidth?: number, targetHeight?: number) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const w = targetWidth ?? canvasDimensionsRef.current.width;
    const h = targetHeight ?? canvasDimensionsRef.current.height;
    setZoomLevel(zoom);
    canvas.setZoom(zoom);
    canvas.setWidth(w * zoom);
    canvas.setHeight(h * zoom);
    canvas.renderAll();
  };

  // Undo / Redo History
  const pushHistory = () => {
    if (isUndoRedoActionRef.current || !fabricCanvasRef.current) return;
    const json = JSON.stringify(fabricCanvasRef.current.toJSON());
    const nextIndex = historyIndexRef.current + 1;
    historyRef.current = historyRef.current.slice(0, nextIndex);
    historyRef.current.push(json);
    historyIndexRef.current = historyRef.current.length - 1;
  };

  const undo = () => {
    if (historyIndexRef.current <= 0 || !fabricCanvasRef.current) return;
    isUndoRedoActionRef.current = true;
    historyIndexRef.current--;
    const state = historyRef.current[historyIndexRef.current];
    fabricCanvasRef.current.loadFromJSON(state, () => {
      fabricCanvasRef.current?.renderAll();
      syncCanvasObjects();
      isUndoRedoActionRef.current = false;
      setSaveStatus('unsaved');
      updateFloatingHudPos();
    });
  };

  const redo = () => {
    if (historyIndexRef.current >= historyRef.current.length - 1 || !fabricCanvasRef.current) return;
    isUndoRedoActionRef.current = true;
    historyIndexRef.current++;
    const state = historyRef.current[historyIndexRef.current];
    fabricCanvasRef.current.loadFromJSON(state, () => {
      fabricCanvasRef.current?.renderAll();
      syncCanvasObjects();
      isUndoRedoActionRef.current = false;
      setSaveStatus('unsaved');
      updateFloatingHudPos();
    });
  };

  // Selection handlers
  const handleSelection = () => {
    const obj = fabricCanvasRef.current?.getActiveObject();
    if (!obj) return;
    setSelectedObject(obj);
    setSelectedType(obj.type || null);
    setIsLocked(!!obj.lockMovementX);
    setTextCurvature((obj as any).curvature || 0);
    setTextEffectStyle((obj as any).textEffectStyle || 'none');
    updateFloatingHudPos(obj);
  };

  const handleSelectionCleared = () => {
    setSelectedObject(null);
    setSelectedType(null);
    setFloatingHudPos(null);
    setSelectedBounds(null);
    setRotationIndicator(null);
    setIsTextEffectsDrawerOpen(false);
    if (rotationAnimRef.current.rafId !== null) {
      cancelAnimationFrame(rotationAnimRef.current.rafId);
      rotationAnimRef.current.rafId = null;
    }
  };

  // Interactive Canva Guide Handlers
  const handleAddHorizontalGuide = (y: number) => {
    const clampedY = Math.round(Math.max(0, Math.min(canvasDimensions.height, y)));
    setHorizontalGuides((prev) => (prev.includes(clampedY) ? prev : [...prev, clampedY]));
  };

  const handleAddVerticalGuide = (x: number) => {
    const clampedX = Math.round(Math.max(0, Math.min(canvasDimensions.width, x)));
    setVerticalGuides((prev) => (prev.includes(clampedX) ? prev : [...prev, clampedX]));
  };

  const handleUpdateHorizontalGuide = (index: number, y: number) => {
    const clampedY = Math.round(Math.max(0, Math.min(canvasDimensions.height, y)));
    setHorizontalGuides((prev) => {
      const next = [...prev];
      next[index] = clampedY;
      return next;
    });
  };

  const handleUpdateVerticalGuide = (index: number, x: number) => {
    const clampedX = Math.round(Math.max(0, Math.min(canvasDimensions.width, x)));
    setVerticalGuides((prev) => {
      const next = [...prev];
      next[index] = clampedX;
      return next;
    });
  };

  const handleRemoveHorizontalGuide = (index: number) => {
    setHorizontalGuides((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveVerticalGuide = (index: number) => {
    setVerticalGuides((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearAllGuides = () => {
    setHorizontalGuides([]);
    setVerticalGuides([]);
  };

  // Update Text Props (Font, Size, Weight, Alignment, Spacing)
  const updateTextProp = (prop: string, val: any) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const obj = canvas.getActiveObject() as fabric.Textbox;
    if (!obj || !(obj.type === 'textbox' || obj.type === 'i-text' || obj.type === 'text')) return;

    if (prop === 'fontFamily') {
      // Immediately set the font on the Fabric text object so user sees instant change
      obj.set('fontFamily', val);
      obj.initDimensions();
      obj.setCoords();
      canvas.requestRenderAll();
      updateFloatingHudPos(obj);
      pushHistory();
      setSaveStatus('unsaved');

      // Then load via FontFace API to ensure font metric accuracy
      if (document.fonts) {
        document.fonts.load(`48px "${val}"`).then(() => {
          obj.initDimensions();
          obj.setCoords();
          canvas.requestRenderAll();
          updateFloatingHudPos(obj);
        }).catch(() => {
          canvas.requestRenderAll();
        });
      }
    } else if (prop === 'fontSize') {
      obj.set('fontSize', Number(val));
      obj.initDimensions();
      obj.setCoords();
      canvas.renderAll();
      updateFloatingHudPos(obj);
      pushHistory();
      setSaveStatus('unsaved');
    } else if (prop === 'fill') {
      obj.set('fill', val);
      canvas.renderAll();
      pushHistory();
      setSaveStatus('unsaved');
    } else if (prop === 'fontWeight') {
      obj.set('fontWeight', val);
      obj.initDimensions();
      obj.setCoords();
      canvas.renderAll();
      updateFloatingHudPos(obj);
      pushHistory();
      setSaveStatus('unsaved');
    } else if (prop === 'fontStyle') {
      obj.set('fontStyle', val);
      obj.initDimensions();
      obj.setCoords();
      canvas.renderAll();
      updateFloatingHudPos(obj);
      pushHistory();
      setSaveStatus('unsaved');
    } else if (prop === 'underline') {
      obj.set('underline', val);
      canvas.renderAll();
      pushHistory();
      setSaveStatus('unsaved');
    } else if (prop === 'linethrough') {
      (obj as any).set('linethrough', !!val);
      canvas.renderAll();
      pushHistory();
      setSaveStatus('unsaved');
    } else if (prop === 'text') {
      obj.set('text', val);
      obj.initDimensions();
      obj.setCoords();
      canvas.renderAll();
      updateFloatingHudPos(obj);
      pushHistory();
      setSaveStatus('unsaved');
    } else if (prop === 'textAlign') {
      obj.set('textAlign', val);
      canvas.renderAll();
      pushHistory();
    } else if (prop === 'lineHeight') {
      obj.set('lineHeight', val);
      canvas.renderAll();
      pushHistory();
    } else if (prop === 'charSpacing') {
      obj.set('charSpacing', val);
      canvas.renderAll();
      pushHistory();
    } else if (prop === 'shadow') {
      obj.set('shadow', val ? new fabric.Shadow(val) : undefined);
      canvas.renderAll();
      pushHistory();
    } else if (prop === 'stroke') {
      obj.set('stroke', val);
      canvas.renderAll();
      pushHistory();
    } else if (prop === 'strokeWidth') {
      obj.set('strokeWidth', val);
      canvas.renderAll();
      pushHistory();
    } else if (prop === 'textBackgroundColor') {
      obj.set('textBackgroundColor', val);
      canvas.renderAll();
      pushHistory();
    }
    updateFloatingHudPos(obj);
    setSaveStatus('unsaved');
  };

  // Insert Marathi text from Keyboard / Phonetic Assistant into active textbox or new textbox
  const handleInsertMarathiText = (text: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (active && (active.type === 'textbox' || active.type === 'i-text' || active.type === 'text')) {
      const t = active as fabric.Textbox;
      const current = t.text || '';
      t.set('text', current + text);
      t.initDimensions();
      t.setCoords();
      canvas.renderAll();
      updateFloatingHudPos(t);
      pushHistory();
      setSaveStatus('unsaved');
    } else {
      addText(text, 48, 'normal', 'Mukta');
    }
  };

  // Apply Legacy Converted text to active textbox
  const handleApplyLegacyConvertedText = (converted: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (active && (active.type === 'textbox' || active.type === 'i-text' || active.type === 'text')) {
      const t = active as fabric.Textbox;
      t.set('text', converted);
      t.initDimensions();
      t.setCoords();
      canvas.renderAll();
      updateFloatingHudPos(t);
      pushHistory();
      setSaveStatus('unsaved');
    } else {
      addText(converted, 48, 'normal', 'Mukta');
    }
  };

  // Update Non-Text Object Props (fill, opacity, stroke, corner radius)
  const updateObjectProp = (prop: string, val: any) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) return;

    if (prop === 'fill') {
      obj.set('fill', val);
    } else if (prop === 'opacity') {
      const numVal = Number(val);
      obj.set('opacity', numVal);
      if (obj.type === 'activeSelection') {
        (obj as fabric.ActiveSelection).getObjects().forEach((child) => child.set('opacity', numVal));
      } else if (obj.type === 'group') {
        (obj as fabric.Group).getObjects().forEach((child) => child.set('opacity', numVal));
      }
    } else if (prop === 'stroke') {
      obj.set('stroke', val);
      (obj as any).strokeUniform = true;
      obj.dirty = true;
    } else if (prop === 'strokeWidth') {
      obj.set('strokeWidth', Number(val));
      (obj as any).strokeUniform = true;
      obj.dirty = true;
    } else if (prop === 'rx' || prop === 'ry') {
      (obj as any).set({ rx: Number(val), ry: Number(val) });
      obj.dirty = true;
    } else if (prop === 'cornerRounding') {
      const radius = Number(val);
      (obj as any).cornerRounding = radius;
      if (obj.type === 'rect') {
        (obj as fabric.Rect).set({ rx: radius, ry: radius });
        obj.dirty = true;
      } else if (obj.type === 'image') {
        const img = obj as fabric.Image;
        if (radius <= 0) {
          img.clipPath = undefined;
        } else {
          const clipRect = new fabric.Rect({
            originX: 'center',
            originY: 'center',
            left: 0,
            top: 0,
            width: img.width,
            height: img.height,
            rx: radius / (img.scaleX || 1),
            ry: radius / (img.scaleY || 1),
          });
          img.clipPath = clipRect;
        }
        img.dirty = true;
      }
    } else if (prop === 'strokeDashArray') {
      obj.set('strokeDashArray', val);
      obj.dirty = true;
    }
    canvas.renderAll();
    updateFloatingHudPos(obj);
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Copy Style & Paste Style Engine (Paint Roller Tool)
  const handleCopyStyle = () => {
    const active = fabricCanvasRef.current?.getActiveObject();
    if (!active) return;
    const isTxt = active.type === 'textbox' || active.type === 'text' || active.type === 'i-text';
    if (isTxt) {
      const t = active as fabric.Textbox;
      setCopiedStyle({
        type: 'text',
        fontFamily: t.fontFamily,
        fontSize: t.fontSize,
        fontWeight: t.fontWeight,
        fontStyle: t.fontStyle,
        underline: t.underline,
        linethrough: (t as any).linethrough,
        fill: t.fill,
        textAlign: t.textAlign,
        charSpacing: (t as any).charSpacing,
        lineHeight: t.lineHeight,
        shadow: t.shadow,
        backgroundColor: t.backgroundColor,
      });
    } else {
      setCopiedStyle({
        type: 'object',
        fill: active.fill,
        stroke: active.stroke,
        strokeWidth: active.strokeWidth,
        opacity: active.opacity,
        rx: (active as any).rx,
        ry: (active as any).ry,
        strokeDashArray: active.strokeDashArray,
      });
    }
  };

  const handlePasteStyle = () => {
    const active = fabricCanvasRef.current?.getActiveObject();
    if (!active || !copiedStyle) return;
    if (copiedStyle.type === 'text' && (active.type === 'textbox' || active.type === 'text' || active.type === 'i-text')) {
      (active as any).set({
        fontFamily: copiedStyle.fontFamily,
        fontSize: copiedStyle.fontSize,
        fontWeight: copiedStyle.fontWeight,
        fontStyle: copiedStyle.fontStyle,
        underline: copiedStyle.underline,
        linethrough: copiedStyle.linethrough,
        fill: copiedStyle.fill,
        textAlign: copiedStyle.textAlign,
        charSpacing: copiedStyle.charSpacing,
        lineHeight: copiedStyle.lineHeight,
        shadow: copiedStyle.shadow,
        backgroundColor: copiedStyle.backgroundColor,
      });
    } else if (copiedStyle.type === 'object') {
      (active as any).set({
        fill: copiedStyle.fill,
        stroke: copiedStyle.stroke,
        strokeWidth: copiedStyle.strokeWidth,
        opacity: copiedStyle.opacity,
        rx: copiedStyle.rx,
        ry: copiedStyle.ry,
        strokeDashArray: copiedStyle.strokeDashArray,
      });
    }
    fabricCanvasRef.current?.renderAll();
    pushHistory();
    setSaveStatus('unsaved');
    updateFloatingHudPos(active);
  };

  // Magic Write: AI Content Refiner & Headline Generator
  const handleMagicWrite = () => {
    const active = fabricCanvasRef.current?.getActiveObject() as fabric.Textbox;
    if (!active || !(active.type === 'textbox' || active.type === 'text' || active.type === 'i-text')) {
      setIsAiModalOpen(true);
      return;
    }
    const current = active.text || '';
    const polishOptions = [
      'Experience elevated living with premium design and refined details.',
      'A space crafted for those who value comfort and exclusivity.',
      'Unmatched architectural excellence in prime location.',
      'Discover your dream home with bespoke luxury and tranquility.',
      '॥ भव्य गृहप्रवेश सोहळा व स्नेहभोजन ॥',
      '॥ श्री स्वामी समर्थ प्रसन्न ॥'
    ];
    // Find next polish variant or pick first
    const nextIdx = Math.floor(Math.random() * polishOptions.length);
    active.set('text', polishOptions[nextIdx]);
    fabricCanvasRef.current?.renderAll();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Translate Text: English <-> Marathi & Hindi
  const handleTranslateText = () => {
    const active = fabricCanvasRef.current?.getActiveObject() as fabric.Textbox;
    if (!active || !(active.type === 'textbox' || active.type === 'text' || active.type === 'i-text')) return;
    const current = active.text || '';
    const hasMarathi = /[\u0900-\u097F]/.test(current);
    if (hasMarathi) {
      // Devanagari to English sample translation
      active.set({
        text: 'Exclusive Real Estate & Architecture',
        fontFamily: 'Libre Baskerville',
      });
    } else {
      // English to Marathi
      active.set({
        text: '॥ भव्य गृहप्रकल्प व वास्तुरचना ॥',
        fontFamily: 'AMS Aaditya',
      });
    }
    fabricCanvasRef.current?.renderAll();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Canvas Background Updates
  const updateCanvasBackground = (color: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    setCanvasBgColor(color);
    canvas.setBackgroundColor(color, () => canvas.renderAll());
    pushHistory();
    setSaveStatus('unsaved');
  };

  const setGradientBackground = (type: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let grad: any;
    if (type === 'kesari') {
      grad = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvasDimensions.width, y2: canvasDimensions.height },
        colorStops: [
          { offset: 0, color: '#c2410c' },
          { offset: 0.5, color: '#ea580c' },
          { offset: 1, color: '#f59e0b' },
        ],
      });
    } else if (type === 'royal-blue') {
      grad = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvasDimensions.width, y2: canvasDimensions.height },
        colorStops: [
          { offset: 0, color: '#0f172a' },
          { offset: 0.6, color: '#1e3a8a' },
          { offset: 1, color: '#2563eb' },
        ],
      });
    } else if (type === 'maroon') {
      grad = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvasDimensions.width, y2: canvasDimensions.height },
        colorStops: [
          { offset: 0, color: '#450a0a' },
          { offset: 0.5, color: '#881337' },
          { offset: 1, color: '#991b1b' },
        ],
      });
    } else if (type === 'studio-silver') {
      grad = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvasDimensions.width, y2: canvasDimensions.height },
        colorStops: [
          { offset: 0, color: '#0f172a' },
          { offset: 0.5, color: '#27272a' },
          { offset: 1, color: '#3f3f46' },
        ],
      });
    } else if (type === 'sunset-dusk') {
      grad = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvasDimensions.width, y2: canvasDimensions.height },
        colorStops: [
          { offset: 0, color: '#3b0764' },
          { offset: 0.5, color: '#7e22ce' },
          { offset: 1, color: '#f43f5e' },
        ],
      });
    } else if (type === 'midnight-neon') {
      grad = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvasDimensions.width, y2: canvasDimensions.height },
        colorStops: [
          { offset: 0, color: '#020617' },
          { offset: 0.5, color: '#1e1b4b' },
          { offset: 1, color: '#06b6d4' },
        ],
      });
    } else if (type === 'emerald-forest') {
      grad = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvasDimensions.width, y2: canvasDimensions.height },
        colorStops: [
          { offset: 0, color: '#022c22' },
          { offset: 0.5, color: '#065f46' },
          { offset: 1, color: '#14b8a6' },
        ],
      });
    } else {
      grad = new fabric.Gradient({
        type: 'linear',
        coords: { x1: 0, y1: 0, x2: canvasDimensions.width, y2: canvasDimensions.height },
        colorStops: [
          { offset: 0, color: '#d97706' },
          { offset: 0.5, color: '#f59e0b' },
          { offset: 1, color: '#fbbf24' },
        ],
      });
    }

    canvas.setBackgroundColor(grad as any, () => canvas.renderAll());
    pushHistory();
    setSaveStatus('unsaved');
  };

  const setBackgroundImage = (url: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    fabric.Image.fromURL(
      url,
      (img) => {
        if (!img) return;
        img.set({
          scaleX: canvasDimensions.width / (img.width || 1),
          scaleY: canvasDimensions.height / (img.height || 1),
          originX: 'left',
          originY: 'top',
        });
        canvas.setBackgroundImage(img, () => canvas.renderAll());
        pushHistory();
        setSaveStatus('unsaved');
      },
      { crossOrigin: 'anonymous' }
    );
  };

  // Add Marathi Text
  const addText = (
    text = 'येथे मराठी मजकूर लिहा',
    size = 48,
    weight = 'bold',
    family = 'Mukta',
    color = '#0f172a',
    shadow: any = null
  ) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const loadAndPlace = () => {
      const textbox = new fabric.Textbox(text, {
        left: canvasDimensions.width / 2 - 340,
        top: canvasDimensions.height / 2 - 50,
        width: 680,
        fontSize: size,
        fontWeight: weight,
        fontFamily: family,
        fill: color,
        textAlign: 'center',
        cornerColor: '#8b3dff',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
        cornerSize: 12,
        transparentCorners: false,
        shadow: shadow ? new fabric.Shadow(shadow) : undefined,
      });

      canvas.add(textbox);
      canvas.setActiveObject(textbox);
      handleSelection();
      canvas.renderAll();
      syncCanvasObjects();
      pushHistory();
      setSaveStatus('unsaved');
    };

    loadAndPlace();
    if (document.fonts) {
      document.fonts.load(`16px "${family}"`).then(() => canvas.requestRenderAll()).catch(() => {});
    }
  };

  // Add Calligraphy Preset
  const addCalligraphy = (item: CalligraphyItem) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const placeItem = () => {
      const textbox = new fabric.Textbox(item.text, {
        left: canvasDimensions.width / 2 - 380,
        top: canvasDimensions.height / 2 - 60,
        width: 760,
        fontSize: item.fontSize,
        fontWeight: item.fontWeight || 'bold',
        fontFamily: item.fontFamily,
        fill: item.fill,
        stroke: item.stroke,
        strokeWidth: item.strokeWidth || 0,
        textAlign: 'center',
        shadow: item.shadow ? new fabric.Shadow(item.shadow) : undefined,
        cornerColor: '#8b3dff',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
        cornerSize: 12,
        transparentCorners: false,
      });

      canvas.add(textbox);
      canvas.setActiveObject(textbox);
      handleSelection();
      canvas.renderAll();
      syncCanvasObjects();
      pushHistory();
      setSaveStatus('unsaved');
    };

    placeItem();
    if (document.fonts) {
      document.fonts.load(`16px "${item.fontFamily}"`).then(() => canvas.requestRenderAll()).catch(() => {});
    }
  };

  // Add Styled Font Combination (Matching Canva Image 4)
  const addFontCombination = (combo: FontCombination) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const cx = canvasDimensions.width / 2;
    const cy = canvasDimensions.height / 2;

    const placeCombo = () => {
      if (combo.subtitle) {
        const subtitleObj = new fabric.Textbox(combo.subtitle, {
          left: cx - 250,
          top: cy - 45,
          width: 500,
          fontSize: combo.subtitleSize || 22,
          fontFamily: combo.subtitleFont || 'Mukta',
          fontWeight: combo.subtitleWeight || 'bold',
          fill: combo.subtitleColor || '#38bdf8',
          textAlign: 'center',
          charSpacing: combo.letterSpacing ? combo.letterSpacing * 30 : 60,
          cornerColor: '#8b3dff',
          cornerStyle: 'circle',
          borderColor: '#8b3dff',
        });
        canvas.add(subtitleObj);
      }

      const titleObj = new fabric.Textbox(combo.title, {
        left: cx - 350,
        top: combo.subtitle ? cy + 15 : cy - 30,
        width: 700,
        fontSize: combo.titleSize || 52,
        fontFamily: combo.titleFont || 'Mukta',
        fontWeight: combo.titleWeight || 'bold',
        fill: combo.titleColor || '#ffffff',
        textAlign: 'center',
        shadow: combo.shadow ? new fabric.Shadow(combo.shadow) : undefined,
        cornerColor: '#8b3dff',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
      });

      canvas.add(titleObj);
      canvas.setActiveObject(titleObj);
      handleSelection();
      canvas.renderAll();
      syncCanvasObjects();
      pushHistory();
      setSaveStatus('unsaved');
    };

    // Place combination immediately on canvas for responsive interaction
    placeCombo();
    if (document.fonts) {
      if (combo.titleFont) document.fonts.load(`16px "${combo.titleFont}"`).then(() => canvas.requestRenderAll()).catch(() => {});
      if (combo.subtitleFont) document.fonts.load(`16px "${combo.subtitleFont}"`).then(() => canvas.requestRenderAll()).catch(() => {});
    }
  };

  // Add Shapes
  const addShape = (type: 'rect' | 'circle' | 'triangle' | 'star' | 'line' | 'arrow', color = '#ea580c') => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let obj: fabric.Object;
    const cx = canvasDimensions.width / 2;
    const cy = canvasDimensions.height / 2;

    if (type === 'rect') {
      obj = new fabric.Rect({
        left: cx - 200,
        top: cy - 120,
        width: 400,
        height: 240,
        fill: color,
        rx: 12,
        ry: 12,
      });
    } else if (type === 'circle') {
      obj = new fabric.Circle({
        left: cx - 150,
        top: cy - 150,
        radius: 150,
        fill: color,
      });
    } else if (type === 'triangle') {
      obj = new fabric.Triangle({
        left: cx - 150,
        top: cy - 150,
        width: 300,
        height: 260,
        fill: color,
      });
    } else if (type === 'star') {
      const points = [
        { x: 150, y: 0 },
        { x: 185, y: 105 },
        { x: 295, y: 105 },
        { x: 205, y: 170 },
        { x: 240, y: 275 },
        { x: 150, y: 210 },
        { x: 60, y: 275 },
        { x: 95, y: 170 },
        { x: 5, y: 105 },
        { x: 115, y: 105 },
      ];
      obj = new fabric.Polygon(points, {
        left: cx - 150,
        top: cy - 150,
        fill: color,
      });
    } else if (type === 'arrow') {
      const arrowPoints = [
        { x: 0, y: 30 },
        { x: 240, y: 30 },
        { x: 240, y: 0 },
        { x: 320, y: 45 },
        { x: 240, y: 90 },
        { x: 240, y: 60 },
        { x: 0, y: 60 },
      ];
      obj = new fabric.Polygon(arrowPoints, {
        left: cx - 160,
        top: cy - 45,
        fill: color,
      });
    } else {
      obj = new fabric.Line([cx - 200, cy, cx + 200, cy], {
        stroke: color,
        strokeWidth: 6,
      });
    }

    obj.set({
      cornerColor: '#8b3dff',
      cornerStyle: 'circle',
      borderColor: '#8b3dff',
      cornerSize: 12,
      transparentCorners: false,
    });

    canvas.add(obj);
    canvas.setActiveObject(obj);
    handleSelection();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Add Festive Marathi Banners and Badges
  const addBannerBadge = (type: 'banner' | 'badge' | 'seal') => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const cx = canvasDimensions.width / 2;
    const cy = canvasDimensions.height / 2;

    if (type === 'banner') {
      const rect = new fabric.Rect({
        left: cx - 350,
        top: cy - 50,
        width: 700,
        height: 100,
        fill: '#ea580c',
        rx: 16,
        ry: 16,
        shadow: new fabric.Shadow({ color: 'rgba(234, 88, 12, 0.4)', blur: 12, offsetX: 0, offsetY: 4 }),
      });
      const text = new fabric.Textbox('॥ भव्य उद्घाटन व महासेल ॥', {
        left: cx - 320,
        top: cy - 25,
        width: 640,
        fontSize: 38,
        fontWeight: 'bold',
        fontFamily: 'Mukta',
        fill: '#ffffff',
        textAlign: 'center',
      });
      const group = new fabric.Group([rect, text], {
        left: cx - 350,
        top: cy - 50,
        cornerColor: '#8b3dff',
      });
      canvas.add(group);
      canvas.setActiveObject(group);
    } else if (type === 'badge') {
      const circle = new fabric.Circle({
        left: cx - 110,
        top: cy - 110,
        radius: 110,
        fill: '#dc2626',
        stroke: '#fef08a',
        strokeWidth: 6,
        shadow: new fabric.Shadow({ color: 'rgba(220, 38, 38, 0.4)', blur: 10, offsetX: 0, offsetY: 4 }),
      });
      const text1 = new fabric.Textbox('थेट ५०%', {
        left: cx - 90,
        top: cy - 70,
        width: 180,
        fontSize: 44,
        fontWeight: 'bold',
        fontFamily: 'Baloo 2',
        fill: '#ffffff',
        textAlign: 'center',
      });
      const text2 = new fabric.Textbox('सवलत', {
        left: cx - 80,
        top: cy - 10,
        width: 160,
        fontSize: 32,
        fontWeight: 'bold',
        fontFamily: 'Mukta',
        fill: '#fef08a',
        textAlign: 'center',
      });
      const group = new fabric.Group([circle, text1, text2], {
        left: cx - 110,
        top: cy - 110,
        cornerColor: '#8b3dff',
      });
      canvas.add(group);
      canvas.setActiveObject(group);
    } else {
      const circle = new fabric.Circle({
        left: cx - 100,
        top: cy - 100,
        radius: 100,
        fill: '#d97706',
        stroke: '#ffffff',
        strokeWidth: 4,
      });
      const text = new fabric.Textbox('१००% अस्सल\nमराठमोळा', {
        left: cx - 90,
        top: cy - 50,
        width: 180,
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Tillana Calligraphy',
        fill: '#ffffff',
        textAlign: 'center',
      });
      const group = new fabric.Group([circle, text], {
        left: cx - 100,
        top: cy - 100,
        cornerColor: '#8b3dff',
      });
      canvas.add(group);
      canvas.setActiveObject(group);
    }

    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Add Centralized Reusable Design Element (Scalable SVG or Graphic)
  const addDesignElement = (element: DesignElement) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const cx = canvasDimensions.width / 2;
    const cy = canvasDimensions.height / 2;
    const targetWidth = element.defaultWidth || 140;
    const targetHeight = element.defaultHeight || 140;

    if (element.svgData) {
      fabric.loadSVGFromString(element.svgData, (objects, options) => {
        if (!objects || objects.length === 0) return;
        const obj = fabric.util.groupSVGElements(objects, options);
        const origW = obj.width || 100;
        const origH = obj.height || 100;
        const scaleX = targetWidth / origW;
        const scaleY = targetHeight / origH;
        const scale = Math.min(scaleX, scaleY);

        obj.set({
          left: cx - (origW * scale) / 2,
          top: cy - (origH * scale) / 2,
          scaleX: scale,
          scaleY: scale,
          cornerColor: '#8b3dff',
          cornerStyle: 'circle',
          borderColor: '#8b3dff',
          cornerSize: 12,
          transparentCorners: false,
        });

        canvas.add(obj);
        canvas.setActiveObject(obj);
        canvas.renderAll();
        syncCanvasObjects();
        pushHistory();
        setSaveStatus('unsaved');
      });
    } else if (element.assetUrl) {
      fabric.Image.fromURL(element.assetUrl, (img) => {
        const origW = img.width || 100;
        const origH = img.height || 100;
        const scale = Math.min(targetWidth / origW, targetHeight / origH);
        img.set({
          left: cx - (origW * scale) / 2,
          top: cy - (origH * scale) / 2,
          scaleX: scale,
          scaleY: scale,
          cornerColor: '#8b3dff',
          cornerStyle: 'circle',
          borderColor: '#8b3dff',
          cornerSize: 12,
          transparentCorners: false,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        handleSelection();
        canvas.renderAll();
        syncCanvasObjects();
        pushHistory();
        setSaveStatus('unsaved');
      });
    }
  };

  // Add Image to Canvas
  const addImageToCanvas = (url: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    fabric.Image.fromURL(
      url,
      (img) => {
        if (img.width && img.width > 600) {
          img.scaleToWidth(500);
        }
        img.set({
          left: canvasDimensions.width / 2 - 250,
          top: canvasDimensions.height / 2 - 200,
          cornerColor: '#8b3dff',
          cornerStyle: 'circle',
          borderColor: '#8b3dff',
          cornerSize: 12,
          transparentCorners: false,
        });
        canvas.add(img);
        canvas.setActiveObject(img);
        handleSelection();
        canvas.renderAll();
        syncCanvasObjects();
        pushHistory();
        setSaveStatus('unsaved');
      },
      { crossOrigin: 'anonymous' }
    );
  };

  // Load Template into Canvas (Maintains Exact Poster Dimensions)
  const loadTemplate = (tmpl: Template) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    try {
      const targetW = tmpl.width || 1080;
      const targetH = tmpl.height || 1080;
      setCanvasDimensions({ width: targetW, height: targetH });
      canvasDimensionsRef.current = { width: targetW, height: targetH };
      canvas.setWidth(targetW * zoomLevel);
      canvas.setHeight(targetH * zoomLevel);

      canvas.loadFromJSON(tmpl.canvasJson, () => {
        canvas.renderAll();
        fitCanvasToContainer(targetW, targetH);
        syncCanvasObjects();
        pushHistory();
        setTitle(tmpl.titleMr);
        setSaveStatus('unsaved');
      });
    } catch (e) {
      console.error('Failed to load template:', e);
    }
  };

  // Apply AI Design Proposal
  const applyAiDesignProposal = (p: AiBriefResponse) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.clear();

    // Background
    const bg = new fabric.Rect({
      left: 0,
      top: 0,
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      fill: p.backgroundColor,
      selectable: false,
    });
    canvas.add(bg);

    // Border
    const border = new fabric.Rect({
      left: 30,
      top: 30,
      width: canvasDimensions.width - 60,
      height: canvasDimensions.height - 60,
      fill: 'transparent',
      stroke: p.accentColor,
      strokeWidth: 4,
      selectable: false,
    });
    canvas.add(border);

    // Headline
    const head = new fabric.Textbox(p.headerText, {
      left: 90,
      top: 180,
      width: canvasDimensions.width - 180,
      fontSize: 56,
      fontFamily: p.recommendedFont || 'Rozha One',
      fontWeight: 'bold',
      fill: p.textColor,
      textAlign: 'center',
    });
    canvas.add(head);

    // Subtext
    const sub = new fabric.Textbox(p.subText, {
      left: 110,
      top: 400,
      width: canvasDimensions.width - 220,
      fontSize: 36,
      fontFamily: 'Noto Sans Devanagari',
      fill: p.textColor,
      textAlign: 'center',
    });
    canvas.add(sub);

    // Footer badge
    const badge = new fabric.Rect({
      left: canvasDimensions.width / 2 - 300,
      top: canvasDimensions.height - 200,
      width: 600,
      height: 80,
      fill: p.accentColor,
      rx: 16,
      ry: 16,
    });
    canvas.add(badge);

    const foot = new fabric.Textbox(p.footerText, {
      left: canvasDimensions.width / 2 - 280,
      top: canvasDimensions.height - 180,
      width: 560,
      fontSize: 26,
      fontFamily: 'Mukta',
      fontWeight: 'bold',
      fill: '#ffffff',
      textAlign: 'center',
    });
    canvas.add(foot);

    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setTitle(p.title);
    setSaveStatus('unsaved');
  };

  // Layer Operations
  const bringForward = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    canvas.bringForward(obj);
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
  };

  const sendBackward = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    canvas.sendBackwards(obj);
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
  };

  const bringToFront = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    canvas.bringToFront(obj);
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
  };

  const sendToBack = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    canvas.sendToBack(obj);
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
  };

  const deleteSelected = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    canvas.remove(obj);
    canvas.discardActiveObject();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  const duplicateSelected = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    obj.clone((cloned: fabric.Object) => {
      cloned.set({
        left: (cloned.left || 0) + 30,
        top: (cloned.top || 0) + 30,
        evented: true,
        cornerColor: '#8b3dff',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
        cornerSize: 12,
        transparentCorners: false,
      });
      canvas.add(cloned);
      canvas.setActiveObject(cloned);
      handleSelection();
      canvas.renderAll();
      syncCanvasObjects();
      pushHistory();
      setSaveStatus('unsaved');
    });
  };

  // Clipboard (Copy & Paste)
  const copySelected = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    obj.clone((cloned: fabric.Object) => {
      clipboardRef.current = cloned;
    });
  };

  const cutSelected = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    copySelected();
    deleteSelected();
  };

  const pasteClipboard = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !clipboardRef.current) return;
    clipboardRef.current.clone((clonedObj: fabric.Object) => {
      canvas.discardActiveObject();
      clonedObj.set({
        left: (clonedObj.left || 0) + 20,
        top: (clonedObj.top || 0) + 20,
        evented: true,
        cornerColor: '#8b3dff',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
        cornerSize: 12,
        transparentCorners: false,
      });
      if (clonedObj.type === 'activeSelection') {
        (clonedObj as fabric.ActiveSelection).canvas = canvas;
        (clonedObj as fabric.ActiveSelection).forEachObject((o) => {
          canvas.add(o);
        });
        clonedObj.setCoords();
      } else {
        canvas.add(clonedObj);
      }
      if (clipboardRef.current) {
        clipboardRef.current.top = (clipboardRef.current.top || 0) + 20;
        clipboardRef.current.left = (clipboardRef.current.left || 0) + 20;
      }
      canvas.setActiveObject(clonedObj);
      handleSelection();
      canvas.renderAll();
      syncCanvasObjects();
      pushHistory();
      setSaveStatus('unsaved');
    });
  };

  // Group & Ungroup Elements
  const groupSelected = () => {
    const canvas = fabricCanvasRef.current;
    const activeObj = canvas?.getActiveObject();
    if (!canvas || !activeObj || activeObj.type !== 'activeSelection') return;
    const group = (activeObj as fabric.ActiveSelection).toGroup();
    group.set({
      cornerColor: '#8b3dff',
      cornerStyle: 'circle',
      borderColor: '#8b3dff',
      cornerSize: 12,
      transparentCorners: false,
    });
    canvas.setActiveObject(group);
    handleSelection();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  const ungroupSelected = () => {
    const canvas = fabricCanvasRef.current;
    const activeObj = canvas?.getActiveObject();
    if (!canvas || !activeObj || activeObj.type !== 'group') return;
    const selection = (activeObj as fabric.Group).toActiveSelection();
    canvas.setActiveObject(selection);
    handleSelection();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Rotate Selected Object with Smooth Animation and Percentage + Direction Feedback (Rotates around Center)
  const rotateSelected = (
    deltaOrAngle = 90,
    immediate = false,
    forcedDirection?: 'Clockwise' | 'Counter-clockwise'
  ) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj) return;

    const initialCenter = obj.getCenterPoint();
    const currentAngle = obj.angle || 0;
    let targetAngle: number;
    let direction: 'Clockwise' | 'Counter-clockwise';

    const isAbsolute =
      typeof deltaOrAngle === 'number' &&
      deltaOrAngle >= 0 &&
      deltaOrAngle <= 360 &&
      deltaOrAngle !== 90 &&
      deltaOrAngle !== -90 &&
      deltaOrAngle !== 180 &&
      deltaOrAngle !== -180;

    if (isAbsolute) {
      targetAngle = deltaOrAngle;
      direction = forcedDirection || (targetAngle >= currentAngle ? 'Clockwise' : 'Counter-clockwise');
    } else {
      const step = deltaOrAngle;
      const baseAngle =
        rotationAnimRef.current.rafId !== null
          ? rotationAnimRef.current.targetAngle
          : currentAngle;
      targetAngle = baseAngle + step;
      direction = forcedDirection || (step >= 0 ? 'Clockwise' : 'Counter-clockwise');
    }

    if (rotationAnimRef.current.rafId !== null) {
      cancelAnimationFrame(rotationAnimRef.current.rafId);
      rotationAnimRef.current.rafId = null;
    }

    if (immediate) {
      const normalized = ((Math.round(targetAngle) % 360) + 360) % 360;
      const percentage = Math.round((normalized / 360) * 100);
      obj.set('angle', normalized);
      obj.setPositionByOrigin(initialCenter, 'center', 'center');
      obj.setCoords();
      canvas.requestRenderAll();
      updateFloatingHudPos(obj);
      showRotationIndicator(normalized, percentage, direction, obj, 0);
      return;
    }

    // Smooth Animation Mode (240ms duration with cubic ease-out)
    const startAngle = obj.angle || 0;
    const startTime = performance.now();
    const duration = 240;
    rotationAnimRef.current.targetAngle = targetAngle;

    const animateStep = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Cubic ease-out: smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 3);
      const intermediateAngle = startAngle + (targetAngle - startAngle) * eased;

      obj.set('angle', intermediateAngle);
      obj.setPositionByOrigin(initialCenter, 'center', 'center');
      obj.setCoords();
      canvas.requestRenderAll();
      updateFloatingHudPos(obj);

      const norm = ((Math.round(intermediateAngle) % 360) + 360) % 360;
      const pct = Math.round((norm / 360) * 100);
      showRotationIndicator(norm, pct, direction, obj, 0);

      if (progress < 1) {
        rotationAnimRef.current.rafId = requestAnimationFrame(animateStep);
      } else {
        rotationAnimRef.current.rafId = null;
        const finalNormalized = ((Math.round(targetAngle) % 360) + 360) % 360;
        obj.set('angle', finalNormalized);
        obj.setPositionByOrigin(initialCenter, 'center', 'center');
        obj.setCoords();
        canvas.renderAll();
        updateFloatingHudPos(obj);
        pushHistory();
        setSaveStatus('unsaved');

        const finalPct = Math.round((finalNormalized / 360) * 100);
        showRotationIndicator(finalNormalized, finalPct, direction, obj, 1400);
      }
    };

    rotationAnimRef.current.rafId = requestAnimationFrame(animateStep);
  };

  // Interactive Smooth Mouse-Direction Rotation Handler (Always Rotates Around Center Point)
  const handleStartInteractiveRotate = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const obj = canvas.getActiveObject();
    if (!obj || obj.lockMovementX || obj.lockRotation) return;

    // Get upper canvas DOM rectangle in viewport coordinates
    const upperCanvas = (canvas as any).upperCanvasEl;
    if (!upperCanvas) return;
    const canvasRect = upperCanvas.getBoundingClientRect();
    const zoom = canvas.getZoom() || 1;

    // True center point of the object in canvas virtual coordinates (Preserved during entire rotation)
    const initialCenter = obj.getCenterPoint();

    // Exact center point of the object on user's screen
    const centerScreenX = canvasRect.left + initialCenter.x * zoom;
    const centerScreenY = canvasRect.top + initialCenter.y * zoom;

    // Current angle of the object normalized to [0, 360)
    const initialObjAngle = ((obj.angle || 0) % 360 + 360) % 360;

    // Initial mouse angle relative to the element center
    const initialMouseAngle =
      Math.atan2(e.clientY - centerScreenY, e.clientX - centerScreenX) * (180 / Math.PI);

    // Angular offset between mouse position and object angle
    const angleOffset = initialMouseAngle - initialObjAngle;

    let lastAngle = initialObjAngle;
    let rafId: number | null = null;
    let hasMoved = false;

    // Set cursor to grabbing on body while dragging
    document.body.style.cursor = 'grabbing';
    document.body.style.userSelect = 'none';

    const handlePointerMove = (moveEvt: MouseEvent) => {
      moveEvt.preventDefault();
      hasMoved = true;

      const currentMouseAngle =
        Math.atan2(moveEvt.clientY - centerScreenY, moveEvt.clientX - centerScreenX) * (180 / Math.PI);

      let targetAngle = currentMouseAngle - angleOffset;
      let normalized = ((targetAngle % 360) + 360) % 360;

      // Shift key snaps to 15-degree increments
      if (moveEvt.shiftKey) {
        normalized = Math.round(normalized / 15) * 15;
      } else {
        // Magnetic snap to cardinal and diagonal angles (0, 45, 90, 135, 180, 225, 270, 315)
        const snapAngles = [0, 45, 90, 135, 180, 225, 270, 315, 360];
        for (const snap of snapAngles) {
          if (Math.abs(normalized - snap) < 2.5) {
            normalized = snap === 360 ? 0 : snap;
            break;
          }
        }
      }

      // Compute direction from angle delta
      let angleDelta = normalized - lastAngle;
      if (angleDelta > 180) angleDelta -= 360;
      if (angleDelta < -180) angleDelta += 360;
      const direction: 'Clockwise' | 'Counter-clockwise' =
        angleDelta >= 0 ? 'Clockwise' : 'Counter-clockwise';
      lastAngle = normalized;

      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rounded = Math.round(normalized);
        obj.set('angle', rounded);
        obj.setPositionByOrigin(initialCenter, 'center', 'center');
        obj.setCoords();
        canvas.requestRenderAll();
        updateFloatingHudPos(obj);

        const pct = Math.round((rounded / 360) * 100);
        showRotationIndicator(rounded, pct, direction, obj, 0);
      });
    };

    const handlePointerUp = () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      if (rafId !== null) cancelAnimationFrame(rafId);

      if (hasMoved) {
        const finalAngle = ((Math.round(obj.angle || 0) % 360) + 360) % 360;
        obj.set('angle', finalAngle);
        obj.setPositionByOrigin(initialCenter, 'center', 'center');
        obj.setCoords();
        canvas.renderAll();
        updateFloatingHudPos(obj);
        pushHistory();
        setSaveStatus('unsaved');

        const finalPct = Math.round((finalAngle / 360) * 100);
        showRotationIndicator(finalAngle, finalPct, 'Clockwise', obj, 800);
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: false });
    window.addEventListener('mouseup', handlePointerUp, { passive: false });
  };

  // Select All Objects on Canvas
  const selectAllObjects = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.discardActiveObject();
    const sel = new fabric.ActiveSelection(
      canvas.getObjects().filter((o) => o.name !== 'background-layer' && !o.lockMovementX),
      { canvas }
    );
    canvas.setActiveObject(sel);
    canvas.requestRenderAll();
    handleSelection();
  };

  // Multi-Page Switching & Creation
  const handlePageChange = (targetIndex: number) => {
    if (targetIndex === currentPageIndex) return;
    if (targetIndex < 0 || targetIndex >= pages.length) return;
    const canvas = fabricCanvasRef.current;
    if (canvas) {
      const currentJson = JSON.stringify(canvas.toJSON());
      const updatedPages = [...pages];
      updatedPages[currentPageIndex] = currentJson;
      setPages(updatedPages);
      pagesRef.current = updatedPages;
    }
    setCurrentPageIndex(targetIndex);
  };

  // Add Page Below (+ Add page) or at specific index
  const handleAddPage = (insertIndex?: number) => {
    const canvas = fabricCanvasRef.current;
    const currentJson = canvas ? JSON.stringify(canvas.toJSON()) : '';
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = currentJson;

    const targetIdx = insertIndex !== undefined ? insertIndex : updatedPages.length;
    updatedPages.splice(targetIdx, 0, '');
    setPages(updatedPages);
    pagesRef.current = updatedPages;

    const updatedTitles = [...pageTitles];
    updatedTitles.splice(targetIdx, 0, `Page ${targetIdx + 1}`);
    setPageTitles(updatedTitles);

    const updatedLocks = [...pageLocks];
    updatedLocks.splice(targetIdx, 0, false);
    setPageLocks(updatedLocks);

    setCurrentPageIndex(targetIdx);
    setSaveStatus('unsaved');
  };

  // Add Page Up (Add page directly above current page)
  const handleAddPageAbove = () => {
    handleAddPage(currentPageIndex);
  };

  const handleDuplicatePage = (indexToDup?: number) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const currentJson = JSON.stringify(canvas.toJSON());
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = currentJson;

    const idx = indexToDup !== undefined ? indexToDup : currentPageIndex;
    const dupJson = updatedPages[idx] || currentJson;
    const insertIdx = idx + 1;

    updatedPages.splice(insertIdx, 0, dupJson);
    setPages(updatedPages);
    pagesRef.current = updatedPages;

    const updatedTitles = [...pageTitles];
    const currentTitle = pageTitles[idx] || `Page ${idx + 1}`;
    const isDefault = !currentTitle || /^Page\s+\d+(\s*\(Copy\))?$/i.test(currentTitle.trim());
    const newTitle = isDefault ? `Page ${insertIdx + 1}` : `${currentTitle} (Copy)`;
    updatedTitles.splice(insertIdx, 0, newTitle);
    setPageTitles(updatedTitles);

    const updatedLocks = [...pageLocks];
    updatedLocks.splice(insertIdx, 0, pageLocks[idx] || false);
    setPageLocks(updatedLocks);

    setCurrentPageIndex(insertIdx);
    setSaveStatus('unsaved');
  };

  const handleDeletePage = (indexToDel?: number) => {
    if (pages.length <= 1) return;
    const canvas = fabricCanvasRef.current;
    const idx = indexToDel !== undefined ? indexToDel : currentPageIndex;

    const currentJson = canvas ? JSON.stringify(canvas.toJSON()) : '';
    const currentPages = [...pages];
    currentPages[currentPageIndex] = currentJson;

    const updatedPages = currentPages.filter((_, i) => i !== idx);
    const updatedTitles = pageTitles.filter((_, i) => i !== idx);
    const updatedLocks = pageLocks.filter((_, i) => i !== idx);
    const newIndex = Math.min(idx, updatedPages.length - 1);

    setPages(updatedPages);
    pagesRef.current = updatedPages;
    setPageTitles(updatedTitles);
    setPageLocks(updatedLocks);
    setCurrentPageIndex(newIndex);
    setSaveStatus('unsaved');
  };

  const handleMovePageUp = (idx?: number) => {
    const activeIdx = idx !== undefined ? idx : currentPageIndex;
    if (activeIdx <= 0 || !fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    const currentJson = JSON.stringify(canvas.toJSON());
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = currentJson;

    const tempPage = updatedPages[activeIdx];
    updatedPages[activeIdx] = updatedPages[activeIdx - 1];
    updatedPages[activeIdx - 1] = tempPage;

    const updatedTitles = [...pageTitles];
    const tempTitle = updatedTitles[activeIdx];
    updatedTitles[activeIdx] = updatedTitles[activeIdx - 1];
    updatedTitles[activeIdx - 1] = tempTitle;

    const updatedLocks = [...pageLocks];
    const tempLock = updatedLocks[activeIdx];
    updatedLocks[activeIdx] = updatedLocks[activeIdx - 1];
    updatedLocks[activeIdx - 1] = tempLock;

    const newIndex = activeIdx - 1;
    setPages(updatedPages);
    pagesRef.current = updatedPages;
    setPageTitles(updatedTitles);
    setPageLocks(updatedLocks);
    setCurrentPageIndex(newIndex);
    setSaveStatus('unsaved');
  };

  const handleMovePageDown = (idx?: number) => {
    const activeIdx = idx !== undefined ? idx : currentPageIndex;
    if (activeIdx >= pages.length - 1 || !fabricCanvasRef.current) return;
    const canvas = fabricCanvasRef.current;
    const currentJson = JSON.stringify(canvas.toJSON());
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = currentJson;

    const tempPage = updatedPages[activeIdx];
    updatedPages[activeIdx] = updatedPages[activeIdx + 1];
    updatedPages[activeIdx + 1] = tempPage;

    const updatedTitles = [...pageTitles];
    const tempTitle = updatedTitles[activeIdx];
    updatedTitles[activeIdx] = updatedTitles[activeIdx + 1];
    updatedTitles[activeIdx + 1] = tempTitle;

    const updatedLocks = [...pageLocks];
    const tempLock = updatedLocks[activeIdx];
    updatedLocks[activeIdx] = updatedLocks[activeIdx + 1];
    updatedLocks[activeIdx + 1] = tempLock;

    const newIndex = activeIdx + 1;
    setPages(updatedPages);
    pagesRef.current = updatedPages;
    setPageTitles(updatedTitles);
    setPageLocks(updatedLocks);
    setCurrentPageIndex(newIndex);
    setSaveStatus('unsaved');
  };

  const handleToggleLockCurrentPage = () => {
    const updatedLocks = [...pageLocks];
    const newLockState = !updatedLocks[currentPageIndex];
    updatedLocks[currentPageIndex] = newLockState;
    setPageLocks(updatedLocks);
    setSaveStatus('unsaved');

    const canvas = fabricCanvasRef.current;
    if (canvas) {
      canvas.forEachObject((obj) => {
        if (obj.name !== 'background-layer') {
          obj.set({
            selectable: !newLockState,
            evented: !newLockState,
            lockMovementX: newLockState,
            lockMovementY: newLockState,
            lockRotation: newLockState,
            lockScalingX: newLockState,
            lockScalingY: newLockState,
            hasControls: !newLockState,
          });
        }
      });
      canvas.discardActiveObject();
      canvas.renderAll();
      setSelectedObject(null);
    }
  };

  const handleUpdatePageTitle = (newTitle: string, index?: number) => {
    const targetIdx = index !== undefined ? index : currentPageIndex;
    const updatedTitles = [...pageTitles];
    updatedTitles[targetIdx] = newTitle;
    setPageTitles(updatedTitles);
    setSaveStatus('unsaved');
  };

  const toggleLockSelected = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!obj) return;
    const locked = !obj.lockMovementX;
    obj.set({
      lockMovementX: locked,
      lockMovementY: locked,
      lockRotation: locked,
      lockScalingX: locked,
      lockScalingY: locked,
      hasControls: !locked,
    });
    setIsLocked(locked);
    canvas?.renderAll();
  };

  const flipH = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    obj.set('flipX', !obj.flipX);
    canvas.renderAll();
    pushHistory();
  };

  const flipV = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    obj.set('flipY', !obj.flipY);
    canvas.renderAll();
    pushHistory();
  };

  const alignCenter = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    obj.centerH();
    canvas.renderAll();
    updateFloatingHudPos(obj);
    pushHistory();
  };

  const alignMiddle = () => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;
    obj.centerV();
    canvas.renderAll();
    updateFloatingHudPos(obj);
    pushHistory();
  };

  // Alignment to Page (left, center, right, top, middle, bottom)
  const alignSelected = (alignment: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => {
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject();
    if (!canvas || !obj) return;

    const w = canvasDimensions.width;
    const h = canvasDimensions.height;
    const objW = obj.getScaledWidth();
    const objH = obj.getScaledHeight();

    if (alignment === 'left') obj.set({ left: 0 });
    else if (alignment === 'center') obj.centerH();
    else if (alignment === 'right') obj.set({ left: w - objW });
    else if (alignment === 'top') obj.set({ top: 0 });
    else if (alignment === 'middle') obj.centerV();
    else if (alignment === 'bottom') obj.set({ top: h - objH });

    canvas.renderAll();
    updateFloatingHudPos(obj);
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Distribute Selected Objects
  const distributeSelected = (axis: 'horizontal' | 'vertical') => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject() as fabric.ActiveSelection;
    if (!canvas || !active || active.type !== 'activeSelection') return;

    const objects = active.getObjects();
    if (objects.length < 3) return;

    if (axis === 'horizontal') {
      objects.sort((a, b) => (a.left || 0) - (b.left || 0));
      const first = objects[0].left || 0;
      const last = objects[objects.length - 1].left || 0;
      const step = (last - first) / (objects.length - 1);
      objects.forEach((o, i) => o.set({ left: first + step * i }));
    } else {
      objects.sort((a, b) => (a.top || 0) - (b.top || 0));
      const first = objects[0].top || 0;
      const last = objects[objects.length - 1].top || 0;
      const step = (last - first) / (objects.length - 1);
      objects.forEach((o, i) => o.set({ top: first + step * i }));
    }

    canvas.renderAll();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Toggle Freehand Drawing Mode
  const toggleDrawingMode = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const next = !isDrawingMode;
    setIsDrawingMode(next);
    canvas.isDrawingMode = next;
    if (next && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = brushColor;
      canvas.freeDrawingBrush.width = brushWidth;
    }
  };

  const updateBrushColor = (c: string) => {
    setBrushColor(c);
    const canvas = fabricCanvasRef.current;
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = c;
    }
  };

  const updateBrushWidth = (w: number) => {
    setBrushWidth(w);
    const canvas = fabricCanvasRef.current;
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = w;
    }
  };

  // Brush Styles: Pen, Marker, Highlighter, Eraser
  const updateBrushStyle = (style: CanvaBrushStyle) => {
    setBrushStyle(style);
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    if (style === 'highlighter') {
      const hex = brushColor.startsWith('#') ? brushColor : '#facc15';
      const r = parseInt(hex.slice(1, 3), 16) || 250;
      const g = parseInt(hex.slice(3, 5), 16) || 204;
      const b = parseInt(hex.slice(5, 7), 16) || 21;
      const rgba = `rgba(${r}, ${g}, ${b}, 0.38)`;
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = rgba;
        canvas.freeDrawingBrush.width = 24;
      }
      setBrushWidth(24);
    } else if (style === 'marker') {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = 14;
      }
      setBrushWidth(14);
    } else if (style === 'pen') {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = brushColor;
        canvas.freeDrawingBrush.width = 4;
      }
      setBrushWidth(4);
    } else if (style === 'eraser') {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = canvasBgColor || '#ffffff';
        canvas.freeDrawingBrush.width = 24;
      }
    }
  };

  // Clear all freehand drawings from canvas
  const clearAllDrawings = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const paths = canvas.getObjects().filter((obj) => obj.type === 'path');
    paths.forEach((p) => canvas.remove(p));
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Add Canva-style Sticky Note with editable text
  const addStickyNote = (color = '#fef08a') => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const cx = canvasDimensions.width / 2;
    const cy = canvasDimensions.height / 2;

    const note = new fabric.Textbox('Type your note...', {
      left: cx - 110,
      top: cy - 110,
      width: 220,
      height: 220,
      backgroundColor: color,
      fill: '#1f2937',
      fontSize: 20,
      fontFamily: 'Mukta',
      textAlign: 'center',
      padding: 20,
      shadow: new fabric.Shadow({
        color: 'rgba(0,0,0,0.18)',
        blur: 14,
        offsetX: 3,
        offsetY: 6,
      }),
      cornerColor: '#8b3dff',
      cornerStyle: 'circle',
      borderColor: '#8b3dff',
      cornerSize: 12,
      transparentCorners: false,
    });

    (note as any).isStickyNote = true;
    canvas.add(note);
    canvas.setActiveObject(note);
    handleSelection();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Set Text Curvature (Curved text matching Canva Shape -> Curve)
  const handleSetTextCurvature = (val: number) => {
    setTextCurvature(val);
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject() as fabric.Text | fabric.IText;
    if (!canvas || !obj) return;
    if (obj.type !== 'text' && obj.type !== 'i-text' && obj.type !== 'textbox') return;

    (obj as any).curvature = val;
    if (val === 0) {
      (obj as any).path = undefined;
      (obj as any).set?.({ path: undefined });
    } else {
      const path = createTextCurvePath(obj.text || 'Text', obj.fontSize || 40, val);
      (obj as any).path = path;
      (obj as any).set?.({ path: path });
    }
    obj.setCoords();
    canvas.renderAll();
    updateFloatingHudPos(obj);
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Set Text Effect Style (Neon, TV Static Glitch, 70s, Shadow, Lift, Hollow, etc.)
  const handleSetTextEffectStyle = (style: TextEffectStyle) => {
    setTextEffectStyle(style);
    const canvas = fabricCanvasRef.current;
    const obj = canvas?.getActiveObject() as fabric.Text | fabric.IText;
    if (!canvas || !obj) return;
    if (obj.type !== 'text' && obj.type !== 'i-text' && obj.type !== 'textbox') return;

    (obj as any).textEffectStyle = style;

    if (style === 'none') {
      obj.set({
        shadow: null as any,
        strokeWidth: 0,
        backgroundColor: 'transparent',
      });
    } else if (style === 'neon') {
      obj.set({
        shadow: new fabric.Shadow({ color: '#e879f9', blur: 30, offsetX: 0, offsetY: 0 }),
        fill: '#ffffff',
        stroke: '#ec4899',
        strokeWidth: 1.5,
      });
    } else if (style === 'glitch') {
      obj.set({
        shadow: new fabric.Shadow({ color: '#06b6d4', blur: 0, offsetX: -3, offsetY: -2 }),
        fill: '#ec4899',
        strokeWidth: 0,
      });
    } else if (style === 'retro70s') {
      obj.set({
        shadow: new fabric.Shadow({ color: '#b45309', blur: 0, offsetX: 4, offsetY: 4 }),
        fill: '#f59e0b',
        strokeWidth: 0,
      });
    } else if (style === 'shadow') {
      obj.set({
        shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.6)', blur: 12, offsetX: 5, offsetY: 5 }),
        strokeWidth: 0,
      });
    } else if (style === 'lift') {
      obj.set({
        shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.45)', blur: 24, offsetX: 0, offsetY: 12 }),
        strokeWidth: 0,
      });
    } else if (style === 'hollow') {
      const strokeColor = (typeof obj.fill === 'string' && obj.fill !== 'transparent' ? obj.fill : '#ffffff') as string;
      obj.set({
        fill: 'transparent',
        stroke: strokeColor,
        strokeWidth: 2,
        shadow: null as any,
      });
    } else if (style === 'splice') {
      obj.set({
        fill: 'transparent',
        stroke: '#ffffff',
        strokeWidth: 2,
        shadow: new fabric.Shadow({ color: '#8b5cf6', blur: 0, offsetX: 4, offsetY: 4 }),
      });
    } else if (style === 'outline') {
      obj.set({
        stroke: '#8b5cf6',
        strokeWidth: 3,
      });
    } else if (style === 'echo') {
      obj.set({
        shadow: new fabric.Shadow({ color: 'rgba(139, 92, 246, 0.6)', blur: 0, offsetX: 8, offsetY: 8 }),
      });
    } else if (style === 'background') {
      obj.set({
        backgroundColor: '#fef08a',
        padding: 8,
        shadow: null as any,
      });
    }

    obj.setCoords();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Interactive Chart Tool
  const addChart = (type: 'bar' | 'pie' | 'line' | 'donut', data: { label: string; value: number; color: string }[]) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const cx = canvasDimensions.width / 2;
    const cy = canvasDimensions.height / 2;
    const total = data.reduce((acc, d) => acc + d.value, 0) || 1;
    const elements: fabric.Object[] = [];

    // Background Container
    const bg = new fabric.Rect({
      left: cx - 220,
      top: cy - 160,
      width: 440,
      height: 320,
      fill: '#1e293b',
      rx: 16,
      ry: 16,
    });
    elements.push(bg);

    if (type === 'bar') {
      const maxVal = Math.max(...data.map((d) => d.value), 1);
      const barW = 55;
      const spacing = 20;
      const startX = cx - 220 + 40;
      const baseY = cy + 90;

      data.forEach((d, i) => {
        const barH = (d.value / maxVal) * 180;
        const bar = new fabric.Rect({
          left: startX + i * (barW + spacing),
          top: baseY - barH,
          width: barW,
          height: barH,
          fill: d.color,
          rx: 6,
          ry: 6,
        });
        const lbl = new fabric.Textbox(d.label, {
          left: startX + i * (barW + spacing),
          top: baseY + 8,
          width: barW,
          fontSize: 12,
          fill: '#94a3b8',
          textAlign: 'center',
          fontFamily: 'Mukta',
        });
        elements.push(bar, lbl);
      });
    } else {
      let curAngle = 0;
      data.forEach((d) => {
        const sweep = (d.value / total) * 360;
        const wedge = new fabric.Circle({
          left: cx - 100,
          top: cy - 120,
          radius: 100,
          startAngle: (curAngle * Math.PI) / 180,
          endAngle: ((curAngle + sweep) * Math.PI) / 180,
          fill: d.color,
        });
        curAngle += sweep;
        elements.push(wedge);
      });
      if (type === 'donut') {
        const hole = new fabric.Circle({
          left: cx - 50,
          top: cy - 70,
          radius: 50,
          fill: '#1e293b',
        });
        elements.push(hole);
      }
    }

    const group = new fabric.Group(elements, {
      left: cx - 220,
      top: cy - 160,
      cornerColor: '#8b3dff',
    });
    canvas.add(group);
    canvas.setActiveObject(group);
    handleSelection();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Interactive Table Tool
  const addTable = (rows: number, cols: number, theme: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const cx = canvasDimensions.width / 2;
    const cy = canvasDimensions.height / 2;
    const cellW = 120;
    const cellH = 40;
    const tableW = cols * cellW;
    const tableH = rows * cellH;
    const startX = cx - tableW / 2;
    const startY = cy - tableH / 2;
    const elements: fabric.Object[] = [];

    const headerBg = theme === 'kesari' ? '#ea580c' : theme === 'royal' ? '#1e3a8a' : '#1e293b';

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isHeader = r === 0;
        const cell = new fabric.Rect({
          left: startX + c * cellW,
          top: startY + r * cellH,
          width: cellW,
          height: cellH,
          fill: isHeader ? headerBg : r % 2 === 0 ? '#ffffff' : '#f8fafc',
          stroke: '#cbd5e1',
          strokeWidth: 1,
        });
        const text = new fabric.Textbox(isHeader ? `स्तंभ ${c + 1}` : `नोंद ${r},${c + 1}`, {
          left: startX + c * cellW + 10,
          top: startY + r * cellH + 10,
          width: cellW - 20,
          fontSize: isHeader ? 14 : 12,
          fontWeight: isHeader ? 'bold' : 'normal',
          fill: isHeader ? '#ffffff' : '#0f172a',
          textAlign: 'center',
          fontFamily: 'Mukta',
        });
        elements.push(cell, text);
      }
    }

    const group = new fabric.Group(elements, {
      left: startX,
      top: startY,
      cornerColor: '#8b3dff',
    });
    canvas.add(group);
    canvas.setActiveObject(group);
    handleSelection();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Photo Frames
  const addFrame = (frameType: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const cx = canvasDimensions.width / 2;
    const cy = canvasDimensions.height / 2;

    let frameObj: fabric.Object;
    if (frameType === 'circle') {
      frameObj = new fabric.Circle({
        left: cx - 120,
        top: cy - 120,
        radius: 120,
        fill: '#f1f5f9',
        stroke: '#8b3dff',
        strokeWidth: 4,
        strokeDashArray: [6, 4],
      });
    } else if (frameType === 'phone') {
      frameObj = new fabric.Rect({
        left: cx - 100,
        top: cy - 180,
        width: 200,
        height: 360,
        rx: 28,
        ry: 28,
        fill: '#f8fafc',
        stroke: '#0f172a',
        strokeWidth: 8,
      });
    } else {
      frameObj = new fabric.Rect({
        left: cx - 130,
        top: cy - 170,
        width: 260,
        height: 340,
        rx: 130,
        ry: 130,
        fill: '#fffbeb',
        stroke: '#d97706',
        strokeWidth: 4,
        strokeDashArray: [8, 4],
      });
    }

    canvas.add(frameObj);
    canvas.setActiveObject(frameObj);
    handleSelection();
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Poster Layout Presets
  const addLayout = (layoutType: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.clear();
    const w = canvasDimensions.width;
    const h = canvasDimensions.height;

    if (layoutType === 'hero') {
      // Top header banner
      const topBar = new fabric.Rect({
        left: 0,
        top: 0,
        width: w,
        height: 120,
        fill: '#ea580c',
        selectable: false,
      });
      const topTxt = new fabric.Textbox('॥ श्री गणेशाय नमः ॥', {
        left: 40,
        top: 40,
        width: w - 80,
        fontSize: 34,
        fill: '#ffffff',
        fontFamily: 'Mukta',
        fontWeight: 'bold',
        textAlign: 'center',
      });
      // Center hero card
      const card = new fabric.Rect({
        left: 60,
        top: 180,
        width: w - 120,
        height: h - 360,
        fill: '#ffffff',
        rx: 24,
        ry: 24,
        shadow: new fabric.Shadow({ color: 'rgba(0,0,0,0.1)', blur: 20, offsetX: 0, offsetY: 6 }),
      });
      const mainTitle = new fabric.Textbox('महा-उत्सव २०२६', {
        left: 100,
        top: 240,
        width: w - 200,
        fontSize: 64,
        fontWeight: 'bold',
        fill: '#0f172a',
        textAlign: 'center',
        fontFamily: 'Rozha One',
      });
      const subtitle = new fabric.Textbox('भव्य प्रदर्शन व सांस्कृतिक मेळावा', {
        left: 120,
        top: 360,
        width: w - 240,
        fontSize: 34,
        fill: '#ea580c',
        textAlign: 'center',
        fontFamily: 'Baloo 2',
      });
      // Footer info bar
      const foot = new fabric.Rect({
        left: 0,
        top: h - 140,
        width: w,
        height: 140,
        fill: '#0f172a',
        selectable: false,
      });
      const footTxt = new fabric.Textbox('स्थळ: शनिवार वाडा मैदान, पुणे • वेळ: सकाळी १० ते रात्री ९', {
        left: 40,
        top: h - 90,
        width: w - 80,
        fontSize: 22,
        fill: '#ffffff',
        fontFamily: 'Mukta',
        textAlign: 'center',
      });
      canvas.add(topBar, topTxt, card, mainTitle, subtitle, foot, footTxt);
    } else if (layoutType === 'split') {
      const leftCol = new fabric.Rect({
        left: 0,
        top: 0,
        width: w / 2,
        height: h,
        fill: '#0f172a',
        selectable: false,
      });
      const rightCol = new fabric.Rect({
        left: w / 2,
        top: 0,
        width: w / 2,
        height: h,
        fill: '#fef3c7',
        selectable: false,
      });
      const leftTxt = new fabric.Textbox('SPECIAL\nOFFER', {
        left: 40,
        top: h / 2 - 100,
        width: w / 2 - 80,
        fontSize: 54,
        fontWeight: 'bold',
        fill: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Montserrat',
      });
      const rightTxt = new fabric.Textbox('खास सवलत\nधमाका', {
        left: w / 2 + 40,
        top: h / 2 - 90,
        width: w / 2 - 80,
        fontSize: 50,
        fontWeight: 'bold',
        fill: '#b45309',
        textAlign: 'center',
        fontFamily: 'Mukta',
      });
      canvas.add(leftCol, rightCol, leftTxt, rightTxt);
    } else {
      // Festive layout
      const bg = new fabric.Rect({
        left: 0,
        top: 0,
        width: w,
        height: h,
        fill: '#450a0a',
        selectable: false,
      });
      const goldBorder = new fabric.Rect({
        left: 30,
        top: 30,
        width: w - 60,
        height: h - 60,
        fill: 'transparent',
        stroke: '#f59e0b',
        strokeWidth: 4,
        selectable: false,
      });
      const festiveHead = new fabric.Textbox('॥ सहर्ष निमंत्रण ॥', {
        left: 60,
        top: 140,
        width: w - 120,
        fontSize: 50,
        fontWeight: 'bold',
        fill: '#fef08a',
        textAlign: 'center',
        fontFamily: 'Rozha One',
      });
      canvas.add(bg, goldBorder, festiveHead);
    }

    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // QR Code Placer
  const addQrCode = (text: string, color: string) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}&color=${color.replace('#', '')}`;
    fabric.Image.fromURL(qrUrl, (img) => {
      img.set({
        left: canvasDimensions.width / 2 - 100,
        top: canvasDimensions.height / 2 - 100,
        scaleX: 0.7,
        scaleY: 0.7,
        cornerColor: '#8b3dff',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
      });
      canvas.add(img);
      canvas.setActiveObject(img);
      handleSelection();
      canvas.renderAll();
      syncCanvasObjects();
      pushHistory();
      setSaveStatus('unsaved');
    }, { crossOrigin: 'anonymous' });
  };

  // Apply Brand Palette
  const applyBrandPalette = (colors: string[]) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || !colors || colors.length === 0) return;

    if (colors[0]) {
      updateCanvasBackground(colors[0]);
    }
    const objects = canvas.getObjects().filter((o) => o.name !== 'background-layer');
    objects.forEach((obj, idx) => {
      const color = colors[(idx + 1) % colors.length];
      if ((obj as any).text) {
        obj.set('fill', color);
      } else if (obj.type === 'rect' || obj.type === 'circle' || obj.type === 'triangle') {
        obj.set('fill', color);
      }
    });
    canvas.renderAll();
    syncCanvasObjects();
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Open Image Crop Modal
  const handleOpenCropModal = () => {
    const active = fabricCanvasRef.current?.getActiveObject() as fabric.Image;
    if (!active || active.type !== 'image') return;
    const src = (active as any)._element?.src || (active as any).getSrc?.() || '';
    if (src) {
      setCropSourceUrl(src);
      setIsCropModalOpen(true);
    }
  };

  // Apply Cropped Image
  const handleApplyCrop = (croppedUrl: string) => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject() as fabric.Image;
    if (!canvas || !active || active.type !== 'image') return;

    const left = active.left;
    const top = active.top;
    const angle = active.angle;
    const scaleX = active.scaleX;
    const scaleY = active.scaleY;

    fabric.Image.fromURL(croppedUrl, (newImg) => {
      newImg.set({
        left,
        top,
        angle,
        scaleX,
        scaleY,
        cornerColor: '#8b3dff',
        cornerStyle: 'circle',
        borderColor: '#8b3dff',
        cornerSize: 12,
        transparentCorners: false,
      });
      canvas.remove(active);
      canvas.add(newImg);
      canvas.setActiveObject(newImg);
      canvas.renderAll();
      syncCanvasObjects();
      pushHistory();
      setSaveStatus('unsaved');
    }, { crossOrigin: 'anonymous' });
  };

  // Replace Active Image
  const handleReplaceImage = (file: File) => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject() as fabric.Image;
    if (!canvas || !active || active.type !== 'image') return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (!dataUrl) return;

      const left = active.left;
      const top = active.top;
      const angle = active.angle;
      const origW = active.width || 300;
      const origH = active.height || 300;
      const origScaleX = active.scaleX || 1;
      const origScaleY = active.scaleY || 1;
      const targetDisplayW = origW * origScaleX;
      const targetDisplayH = origH * origScaleY;

      fabric.Image.fromURL(dataUrl, (newImg) => {
        const newW = newImg.width || 300;
        const newH = newImg.height || 300;
        newImg.set({
          left,
          top,
          angle,
          scaleX: targetDisplayW / newW,
          scaleY: targetDisplayH / newH,
          cornerColor: '#8b3dff',
          cornerStyle: 'circle',
          borderColor: '#8b3dff',
          cornerSize: 12,
          transparentCorners: false,
        });
        canvas.remove(active);
        canvas.add(newImg);
        canvas.setActiveObject(newImg);
        canvas.renderAll();
        syncCanvasObjects();
        pushHistory();
        setSaveStatus('unsaved');
      }, { crossOrigin: 'anonymous' });
    };
    reader.readAsDataURL(file);
  };

  // 1-Click Background Cutout / Remover
  const handleRemoveBg = () => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject() as fabric.Image;
    if (!canvas || !active || active.type !== 'image') return;

    const imgEl = (active as any)._element as HTMLImageElement;
    if (!imgEl) return;

    const offscreen = document.createElement('canvas');
    offscreen.width = imgEl.naturalWidth || imgEl.width;
    offscreen.height = imgEl.naturalHeight || imgEl.height;
    const ctx = offscreen.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(imgEl, 0, 0);
    const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
    const data = imgData.data;

    const bgR = data[0];
    const bgG = data[1];
    const bgB = data[2];
    const tolerance = 40;

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (
        (r > 235 && g > 235 && b > 235) ||
        (Math.abs(r - bgR) < tolerance && Math.abs(g - bgG) < tolerance && Math.abs(b - bgB) < tolerance)
      ) {
        data[i + 3] = 0;
      }
    }
    ctx.putImageData(imgData, 0, 0);
    const cutoutUrl = offscreen.toDataURL('image/png');
    handleApplyCrop(cutoutUrl);
  };

  // Save current design as a reusable custom Template
  const handleSaveAsTemplate = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let thumbUrl: string | undefined = undefined;
    try {
      thumbUrl = canvas.toDataURL({ format: 'png', quality: 0.4, multiplier: 0.2 });
    } catch {}

    const templateData: Template = {
      id: Date.now(),
      titleMr: title || 'माझे सानुकूल टेम्पलेट',
      descriptionMr: 'वापरकर्त्याने सेव्ह केलेले संपादनक्षम डिझाईन टेम्पलेट',
      categorySlug: 'my-templates',
      planTier: 'FREE',
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      thumbnailUrl: thumbUrl,
      canvasJson: JSON.stringify(canvas.toJSON()),
      tags: 'Custom, Saved, My Template, Canva',
      isPublished: true,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing: Template[] = JSON.parse(localStorage.getItem('canva_user_templates') || '[]');
      existing.unshift(templateData);
      localStorage.setItem('canva_user_templates', JSON.stringify(existing));
      setTemplates((prev) => [templateData, ...prev.filter((p) => p.id !== templateData.id)]);
      setActiveTab('templates');
      setIsDrawerOpen(true);
      alert(`टेम्पलेट "${templateData.titleMr}" यशस्वीरित्या सेव्ह केले! आता कोणताही वापरकर्ता हे संपादित करू शकतो.`);
    } catch {
      alert('Template saved to session!');
    }
  };

  // Save active object or group as Reusable Component
  const handleCreateComponent = () => {
    const canvas = fabricCanvasRef.current;
    const active = canvas?.getActiveObject();
    if (!canvas || !active) return;

    const componentData = {
      id: Date.now(),
      name: (active as any).text ? `Text: ${((active as any).text).slice(0, 20)}` : `${active.type || 'Object'} Component`,
      type: active.type,
      json: JSON.stringify(active.toJSON()),
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('canva_reusable_components') || '[]');
      existing.unshift(componentData);
      localStorage.setItem('canva_reusable_components', JSON.stringify(existing));
      alert(`Component "${componentData.name}" saved to your Reusable Brand Assets!`);
    } catch {
      alert('Component saved to session!');
    }
  };

  // Restore previous snapshot from Version History
  const handleRestoreVersion = (index: number) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas || index < 0 || index >= historyRef.current.length) return;

    historyIndexRef.current = index;
    const state = historyRef.current[index];
    canvas.loadFromJSON(JSON.parse(state), () => {
      canvas.renderAll();
      syncCanvasObjects();
      setSaveStatus('unsaved');
    });
  };

  // Resize Canvas Dimensions (Instantly Synchronizes Rulers & Viewport)
  const handleResizeCanvas = (newWidth: number, newHeight: number) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    setCanvasDimensions({ width: newWidth, height: newHeight });
    canvasDimensionsRef.current = { width: newWidth, height: newHeight };
    canvas.setWidth(newWidth * zoomLevel);
    canvas.setHeight(newHeight * zoomLevel);
    canvas.renderAll();
    fitCanvasToContainer(newWidth, newHeight);
    pushHistory();
    setSaveStatus('unsaved');
  };

  // Cloud Save
  const handleSave = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    setSaveStatus('saving');
    try {
      // Capture active page into pages array
      const currentJson = JSON.stringify(canvas.toJSON());
      const updatedPages = [...pages];
      updatedPages[currentPageIndex] = currentJson;
      setPages(updatedPages);

      // Serialize full multi-page document schema
      const multiPageDoc = {
        version: '2.0',
        pages: updatedPages,
        pageTitles,
        pageLocks,
        currentPageIndex,
      };
      const canvasJson = JSON.stringify(multiPageDoc);
      const thumbnailData = canvas.toDataURL({
        format: 'png',
        multiplier: 0.25,
      });

      if (currentProjectId) {
        await api.updateProject(currentProjectId, {
          title,
          canvasJson,
          thumbnailData,
        });
        setSaveStatus('saved');
      } else {
        const created = await api.createProject({
          title,
          width: canvasDimensions.width,
          height: canvasDimensions.height,
          canvasJson,
          thumbnailData,
        });
        setCurrentProjectId(created.id);
        setSaveStatus('saved');
        if (onSaveSuccess) onSaveSuccess(created.id);
      }
    } catch (err: any) {
      console.error('Failed to save design:', err);
      setSaveStatus('unsaved');
    }
  };

  // Duplicate entire project document (Make a copy)
  const handleDuplicateProject = async () => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    if (!currentProjectId) {
      await handleSave();
      return;
    }
    try {
      setSaveStatus('saving');
      const duplicated = await api.duplicateProject(currentProjectId);
      setCurrentProjectId(duplicated.id);
      setTitle(duplicated.title);
      setSaveStatus('saved');
    } catch (e: any) {
      setSaveStatus('unsaved');
      alert(e.message || 'Failed to duplicate project');
    }
  };

  // High-Resolution Export
  const handleExport = (
    format: 'png' | 'jpeg' | 'pdf' | 'svg',
    scale = 1.5,
    transparent = false,
    selectionOnly = false
  ) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const sanitizedTitle = (title || 'marathi-design').replace(/[^a-zA-Z0-9\u0900-\u097F_-]/g, '_');

    // Selection-only export
    if (selectionOnly && selectedObject) {
      const dataUrl = selectedObject.toDataURL({
        format: format === 'jpeg' ? 'jpeg' : 'png',
        multiplier: scale,
      });
      const link = document.createElement('a');
      link.download = `${sanitizedTitle}-selection.${format === 'jpeg' ? 'jpg' : 'png'}`;
      link.href = dataUrl;
      link.click();
      return;
    }

    // SVG Vector Export
    if (format === 'svg') {
      const svgData = canvas.toSVG();
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `${sanitizedTitle}.svg`;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      return;
    }

    canvas.discardActiveObject();
    canvas.renderAll();

    // Background handling for transparent PNG
    const originalBg = canvas.backgroundColor;
    const bgObjects = canvas.getObjects().filter((o) => o.name === 'background-layer');
    if (format === 'png' && transparent) {
      bgObjects.forEach((b) => b.set('visible', false));
      canvas.setBackgroundColor('transparent', () => canvas.renderAll());
    }

    const executeExport = () => {
      if (format === 'png') {
        const dataUrl = canvas.toDataURL({
          format: 'png',
          multiplier: scale,
        });
        const link = document.createElement('a');
        link.download = `${sanitizedTitle}.png`;
        link.href = dataUrl;
        link.click();
      } else if (format === 'jpeg') {
        const dataUrl = canvas.toDataURL({
          format: 'jpeg',
          quality: 0.95,
          multiplier: scale,
        });
        const link = document.createElement('a');
        link.download = `${sanitizedTitle}.jpg`;
        link.href = dataUrl;
        link.click();
      } else if (format === 'pdf') {
        const dataUrl = canvas.toDataURL({
          format: 'png',
          multiplier: scale,
        });
        const orientation = canvasDimensions.width > canvasDimensions.height ? 'landscape' : 'portrait';
        const pdf = new jsPDF({
          orientation,
          unit: 'px',
          format: [canvasDimensions.width, canvasDimensions.height],
        });
        pdf.addImage(dataUrl, 'PNG', 0, 0, canvasDimensions.width, canvasDimensions.height);

        // Multi-page export collation
        if (pages.length > 1) {
          for (let i = 0; i < pages.length; i++) {
            if (i === currentPageIndex) continue;
            const pageJsonStr = pages[i];
            if (pageJsonStr && pageJsonStr.trim().length > 0) {
              try {
                const offCanvasEl = document.createElement('canvas');
                offCanvasEl.width = canvasDimensions.width;
                offCanvasEl.height = canvasDimensions.height;
                const offCanvas = new fabric.Canvas(offCanvasEl, {
                  width: canvasDimensions.width,
                  height: canvasDimensions.height,
                });
                const parsed = JSON.parse(pageJsonStr);
                offCanvas.loadFromJSON(parsed, () => {
                  offCanvas.renderAll();
                  const pageDataUrl = offCanvas.toDataURL({ format: 'png', multiplier: scale });
                  pdf.addPage([canvasDimensions.width, canvasDimensions.height], orientation);
                  pdf.addImage(pageDataUrl, 'PNG', 0, 0, canvasDimensions.width, canvasDimensions.height);
                  offCanvas.dispose();
                });
              } catch (err) {
                console.error('Error rendering page ' + (i + 1) + ' for PDF export', err);
              }
            }
          }
        }

        pdf.save(`${sanitizedTitle}.pdf`);
      }
    };

    // Ensure all typography and custom fonts are fully loaded into browser context before exporting
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(executeExport).catch(executeExport);
    } else {
      executeExport();
    }

    // Restore background if modified
    if (format === 'png' && transparent) {
      bgObjects.forEach((b) => b.set('visible', true));
      canvas.setBackgroundColor(originalBg || '#ffffff', () => canvas.renderAll());
    }
  };

  // Upload Media
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      openAuthModal('login');
      return;
    }

    setIsUploading(true);
    try {
      const asset = await api.uploadMedia(file);
      setUserMedia((prev) => [asset, ...prev]);
      if (asset.url) {
        addImageToCanvas(asset.url);
      }
    } catch (err: any) {
      alert('Upload error: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Create New Design
  const handleNewDesign = () => {
    if (saveStatus === 'unsaved' && !window.confirm('Creating a new design will discard unsaved changes. Continue?')) {
      return;
    }
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    canvas.clear();
    const bgRect = new fabric.Rect({
      left: 0,
      top: 0,
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      fill: '#ffffff',
      selectable: false,
    });
    canvas.add(bgRect);
    canvas.renderAll();
    syncCanvasObjects();
    setTitle('Untitled Design');
    setCurrentProjectId(undefined);
    pushHistory();
    setSaveStatus('saved');
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0e1318] select-none">
      
      {/* 1. TOP CANVA MAIN HEADER */}
      <CanvaHeader
        title={title}
        onTitleChange={(t) => { setTitle(t); setSaveStatus('unsaved'); }}
        saveStatus={saveStatus}
        canUndo={historyIndexRef.current > 0}
        canRedo={historyIndexRef.current < historyRef.current.length - 1}
        onUndo={undo}
        onRedo={redo}
        onSave={handleSave}
        onNewDesign={handleNewDesign}
        onDuplicate={handleDuplicateProject}
        onOpenResizeModal={() => setIsResizeModalOpen(true)}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onSaveAsTemplate={handleSaveAsTemplate}
        onOpenVersionHistory={() => setIsVersionHistoryOpen(true)}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        canvasDimensions={canvasDimensions}
        zoomLevel={zoomLevel}
        onFitCanvas={fitCanvasToContainer}
        onSelectDimensions={handleResizeCanvas}
        showRulers={showRulers}
        onToggleRulers={() => setShowRulers(!showRulers)}
        showMargins={showMargins}
        onToggleMargins={() => setShowMargins(!showMargins)}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
      />

      {/* 2. CANVA CONTEXTUAL TOOLBAR - Render ONLY when an element is selected */}
      {selectedObject && (
        <CanvaToolbar
          selectedObject={selectedObject}
          selectedType={selectedType}
          canvasBackgroundColor={canvasBgColor}
          canvasDimensions={canvasDimensions}
          onUpdateText={updateTextProp}
          onUpdateObject={updateObjectProp}
          onUpdateCanvasBackground={updateCanvasBackground}
          onBringForward={bringForward}
          onSendBackward={sendBackward}
          onBringToFront={bringToFront}
          onSendToBack={sendToBack}
          onDuplicate={duplicateSelected}
          onDelete={deleteSelected}
          onToggleLock={toggleLockSelected}
          isLocked={isLocked}
          onFlipH={flipH}
          onFlipV={flipV}
          onAlignCenter={alignCenter}
          onAlignMiddle={alignMiddle}
          onAlign={alignSelected}
          onDistribute={distributeSelected}
          onGroup={groupSelected}
          onUngroup={ungroupSelected}
          onRotate={rotateSelected}
          onOpenAiTool={(details) => setActiveIntegration(details)}
          onCopyStyle={handleCopyStyle}
          onPasteStyle={handlePasteStyle}
          hasCopiedStyle={!!copiedStyle}
          onOpenCropModal={handleOpenCropModal}
          onReplaceImage={handleReplaceImage}
          onRemoveBg={handleRemoveBg}
          onOpenMarathiKeyboard={() => setIsMarathiKeyboardOpen(true)}
          onOpenLegacyConverter={() => setIsLegacyConverterOpen(true)}
          onOpenFontManager={() => setIsFontManagerOpen(true)}
          onOpenEffectsDrawer={() => setIsTextEffectsDrawerOpen(!isTextEffectsDrawerOpen)}
          isEffectsDrawerOpen={isTextEffectsDrawerOpen}
        />
      )}

      {/* 3. WORKSPACE (Dock + Drawer + Central Canvas) */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* LEFT CANVA DOCK */}
        <CanvaDock
          activeTab={activeTab}
          isDrawerOpen={isDrawerOpen}
          onSelectTab={(tab) => {
            if (activeTab === tab && isDrawerOpen) {
              setIsDrawerOpen(false);
            } else {
              setActiveTab(tab);
              setIsDrawerOpen(true);
              setIsTextEffectsDrawerOpen(false);
            }
          }}
        />

        {/* TEXT EFFECTS & CURVE DRAWER (Shape: Curve, Advanced: Neon, Glitch, 70s, Spacing) */}
        {isTextEffectsDrawerOpen && (selectedType === 'text' || selectedType === 'i-text' || selectedType === 'textbox') && (
          <CanvaTextEffectsDrawer
            isOpen={isTextEffectsDrawerOpen}
            onClose={() => setIsTextEffectsDrawerOpen(false)}
            selectedObject={selectedObject}
            onUpdateText={updateTextProp}
            onUpdateObject={updateObjectProp}
            curvature={textCurvature}
            onSetCurvature={handleSetTextCurvature}
            currentEffectStyle={textEffectStyle}
            onSetEffectStyle={handleSetTextEffectStyle}
            letterSpacing={(selectedObject as any)?.charSpacing || 0}
            onSetLetterSpacing={(val) => updateTextProp('charSpacing', val)}
            lineHeight={(selectedObject as any)?.lineHeight || 1.16}
            onSetLineHeight={(val) => updateTextProp('lineHeight', val)}
          />
        )}

        {/* FLOATING DRAW / TOOLS TOOLBAR (Matching Canva Tools Pill) */}
        {activeTab === 'draw' && isDrawerOpen && (
          <CanvaDrawFloatingToolbar
            isOpen={activeTab === 'draw' && isDrawerOpen}
            onClose={() => {
              setIsDrawerOpen(false);
              const canvas = fabricCanvasRef.current;
              if (canvas) canvas.isDrawingMode = false;
              setIsDrawingMode(false);
              setDrawActiveTool('select');
            }}
            activeTool={drawActiveTool}
            onSelectTool={(tool) => {
              setDrawActiveTool(tool);
              const canvas = fabricCanvasRef.current;
              if (!canvas) return;
              if (tool === 'pen') {
                setIsDrawingMode(true);
                canvas.isDrawingMode = true;
                if (canvas.freeDrawingBrush) {
                  canvas.freeDrawingBrush.color = brushColor;
                  canvas.freeDrawingBrush.width = brushWidth;
                }
              } else {
                setIsDrawingMode(false);
                canvas.isDrawingMode = false;
              }
            }}
            isDrawingMode={isDrawingMode}
            brushColor={brushColor}
            onSetBrushColor={updateBrushColor}
            brushWidth={brushWidth}
            onSetBrushWidth={updateBrushWidth}
            brushStyle={brushStyle}
            onSetBrushStyle={updateBrushStyle}
            onClearDrawings={clearAllDrawings}
            onAddShape={(st) => addShape(st as any)}
            onAddLine={() => addShape('line')}
            onAddStickyNote={addStickyNote}
            onAddText={(t) => addText(t as any)}
            onAddCalligraphy={() => {
              if (CALLIGRAPHY_PRESETS && CALLIGRAPHY_PRESETS.length > 0) {
                addCalligraphy(CALLIGRAPHY_PRESETS[0]);
              }
            }}
            onAddTable={(r = 3, c = 3, t = 'purple') => addTable(r, c, t)}
          />
        )}

        {/* LEFT COLLAPSIBLE FLYOUT DRAWER (For all tabs except draw and effects) */}
        <CanvaDrawer
          activeTab={activeTab}
          isOpen={isDrawerOpen && activeTab !== 'draw' && !(isTextEffectsDrawerOpen && (selectedType === 'text' || selectedType === 'i-text' || selectedType === 'textbox'))}
          onClose={() => setIsDrawerOpen(false)}
          templates={templates}
          onSelectTemplate={loadTemplate}
          canvasDimensions={canvasDimensions}
          onSaveAsTemplate={handleSaveAsTemplate}
          onAddText={addText}
          onUpdateText={updateTextProp}
          onAddCalligraphy={addCalligraphy}
          onAddShape={addShape}
          onAddBannerBadge={addBannerBadge}
          onAddDesignElement={addDesignElement}
          userMedia={userMedia}
          onUploadMedia={handleFileUpload}
          isUploading={isUploading}
          onAddImageToCanvas={addImageToCanvas}
          onOpenAiModal={() => setIsAiModalOpen(true)}
          canvasBackgroundColor={canvasBgColor}
          onSetCanvasBackground={updateCanvasBackground}
          onSetGradientBackground={setGradientBackground}
          onSetBackgroundImage={setBackgroundImage}
          canvasObjects={canvasObjects}
          selectedObject={selectedObject}
          onSelectCanvasObject={(obj) => {
            const canvas = fabricCanvasRef.current;
            if (!canvas) return;
            canvas.setActiveObject(obj);
            canvas.renderAll();
          }}
          onReorderObject={(obj, direction) => {
            const canvas = fabricCanvasRef.current;
            if (!canvas) return;
            if (direction === 'up') canvas.bringForward(obj);
            else canvas.sendBackwards(obj);
            canvas.renderAll();
            syncCanvasObjects();
            pushHistory();
          }}
          onDeleteObject={(obj) => {
            const canvas = fabricCanvasRef.current;
            if (!canvas) return;
            canvas.remove(obj);
            canvas.renderAll();
            syncCanvasObjects();
            pushHistory();
          }}
          onToggleLockObject={(obj) => {
            const canvas = fabricCanvasRef.current;
            if (!canvas) return;
            const locked = !obj.lockMovementX;
            obj.set({
              lockMovementX: locked,
              lockMovementY: locked,
              lockRotation: locked,
              lockScalingX: locked,
              lockScalingY: locked,
              hasControls: !locked,
            });
            canvas.renderAll();
            syncCanvasObjects();
          }}
          isDrawingMode={isDrawingMode}
          onToggleDrawingMode={toggleDrawingMode}
          brushColor={brushColor}
          onSetBrushColor={updateBrushColor}
          brushWidth={brushWidth}
          onSetBrushWidth={updateBrushWidth}
          onAddChart={addChart}
          onAddTable={addTable}
          onAddFrame={addFrame}
          onAddLayout={addLayout}
          onAddQrCode={addQrCode}
          onSelectBrandPalette={applyBrandPalette}
          onOpenIntegration={(details) => setActiveIntegration(details)}
          onAddFontCombination={addFontCombination}
          onSwitchTab={(tab) => {
            setActiveTab(tab);
            setIsDrawerOpen(true);
          }}
        />

        {/* CENTER CANVA STAGE CONTAINER (Clean Dark Theme Workspace) */}
        <div className="flex-1 flex flex-col bg-[#0e1318] min-w-0 h-full relative overflow-hidden">
          {/* SCROLLABLE / ZOOMABLE CANVA ARTBOARD VIEWPORT */}
          <div
            ref={containerRef}
            onMouseDown={handleContainerMouseDown}
            onMouseMove={handleContainerMouseMove}
            onMouseUp={handleContainerMouseUp}
            onDragOver={(e) => {
              e.preventDefault();
              if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
            }}
            onDrop={handleViewportDrop}
            className={`flex-1 bg-[#0e1318] py-8 px-10 flex flex-col items-center justify-start relative overflow-auto ${
              isPanMode || isSpacePressed ? 'cursor-grab active:cursor-grabbing select-none' : ''
            }`}
          >
            {/* VERTICAL MULTI-PAGE STACK */}
            <div className="flex flex-col items-center gap-10 w-full">
              {pages.map((pageJson, pageIdx) => {
                const isActive = pageIdx === currentPageIndex;
                const rawTitle = pageTitles[pageIdx] || '';
                const isDefaultTitle = !rawTitle || /^Page\s+\d+(\s*\(Copy\))?$/i.test(rawTitle.trim());
                const displayCustomTitle = isDefaultTitle ? '' : rawTitle;

                return (
                  <div
                    key={`page-stack-${pageIdx}`}
                    id={`artboard-page-${pageIdx}`}
                    className="flex flex-col items-center w-full transition-all"
                  >
                    {/* CANVA ARTBOARD PAGE HEADER BAR */}
                    <div
                      className="flex items-center justify-between pb-2.5 text-xs select-none pointer-events-auto transition-all z-20 w-full"
                      style={{
                        width: `${Math.max(480, canvasDimensions.width * zoomLevel)}px`,
                      }}
                    >
                      {/* Left: Page Title & Order Navigation */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="flex items-center gap-1.5 bg-[#18191b]/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#2d2e30] shadow-xs">
                          <span className="font-extrabold text-white whitespace-nowrap text-xs">
                            Page {pageIdx + 1}
                          </span>
                          {displayCustomTitle && <span className="text-gray-500">-</span>}
                          <input
                            type="text"
                            value={displayCustomTitle}
                            placeholder="Add page title"
                            onChange={(e) => handleUpdatePageTitle(e.target.value, pageIdx)}
                            className="text-xs font-semibold text-white bg-transparent border-none outline-none focus:text-purple-400 w-28 sm:w-40 placeholder:text-gray-500 placeholder:italic"
                          />
                        </div>

                        {/* Move Page Up / Move Page Down / Delete */}
                        <div className="flex items-center gap-0.5 bg-[#18191b]/95 backdrop-blur-md p-0.5 rounded-lg border border-[#2d2e30] shadow-xs">
                          <button
                            type="button"
                            onClick={() => handleMovePageUp(pageIdx)}
                            disabled={pageIdx === 0}
                            title="Move page up"
                            className="p-1 text-gray-400 hover:text-white hover:bg-[#282a2e] rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMovePageDown(pageIdx)}
                            disabled={pageIdx >= pages.length - 1}
                            title="Move page down"
                            className="p-1 text-gray-400 hover:text-white hover:bg-[#282a2e] rounded disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-colors"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                          {pages.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeletePage(pageIdx)}
                              title="Delete page"
                              className="p-1 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Page Actions (Lock, Duplicate, Add Page Up) */}
                      <div className="flex items-center gap-1 bg-[#18191b]/95 backdrop-blur-md p-1 rounded-lg border border-[#2d2e30] shadow-xs shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setPageLocks((prev) => {
                              const next = [...prev];
                              next[pageIdx] = !next[pageIdx];
                              return next;
                            });
                          }}
                          title={pageLocks[pageIdx] ? 'Unlock page' : 'Lock page'}
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            pageLocks[pageIdx]
                              ? 'bg-amber-500/20 text-amber-400 font-bold'
                              : 'text-gray-400 hover:text-white hover:bg-[#282a2e]'
                          }`}
                        >
                          {pageLocks[pageIdx] ? (
                            <Lock className="w-3.5 h-3.5 text-amber-400" />
                          ) : (
                            <Unlock className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDuplicatePage(pageIdx)}
                          title="Duplicate page"
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-[#282a2e] rounded transition-colors cursor-pointer"
                        >
                          <CopyPlus className="w-3.5 h-3.5" />
                        </button>

                        {/* Add Page Up / Add Page Above Button */}
                        <button
                          type="button"
                          onClick={() => handleAddPage(pageIdx)}
                          title="Add page up (Add page above current page)"
                          data-testid="add-page-up-btn"
                          className="flex items-center gap-1 px-2.5 py-1 text-gray-200 hover:text-purple-300 hover:bg-[#282a2e] font-bold rounded transition-colors cursor-pointer"
                        >
                          <ArrowUpToLine className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-[11px] font-bold whitespace-nowrap">Add page up</span>
                        </button>
                      </div>
                    </div>

                    {/* ARTBOARD BOX (Active Fabric Canvas OR High-Fidelity Page Preview) */}
                    {isActive ? (
                      <div
                        className={`relative transition-all duration-200 ${showRulers ? 'mt-8 ml-8' : 'mt-2'}`}
                        style={{
                          boxShadow: '0 16px 64px -8px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        {/* Isolated Overlays */}
                        <div className="absolute inset-0 pointer-events-none z-20 overflow-visible">
                          <CanvaRulers
                            width={canvasDimensions.width}
                            height={canvasDimensions.height}
                            zoomLevel={zoomLevel}
                            showRulers={showRulers}
                            showMargins={showMargins}
                            showGrid={showGrid}
                            cursorPos={cursorPos}
                            selectedBounds={selectedBounds}
                            horizontalGuides={horizontalGuides}
                            verticalGuides={verticalGuides}
                            onAddHorizontalGuide={handleAddHorizontalGuide}
                            onAddVerticalGuide={handleAddVerticalGuide}
                            onUpdateHorizontalGuide={handleUpdateHorizontalGuide}
                            onUpdateVerticalGuide={handleUpdateVerticalGuide}
                            onRemoveHorizontalGuide={handleRemoveHorizontalGuide}
                            onRemoveVerticalGuide={handleRemoveVerticalGuide}
                            onClearAllGuides={handleClearAllGuides}
                            onSelectDimensions={handleResizeCanvas}
                          />

                          {/* Contextual Floating Quick-Action HUD directly above element */}
                          <div className="pointer-events-auto">
                            <CanvaFloatingHud
                              position={floatingHudPos}
                              isLocked={isLocked}
                              onToggleLock={toggleLockSelected}
                              onDuplicate={duplicateSelected}
                              onDelete={deleteSelected}
                              onOpenContextMenu={(e) => {
                                setContextMenuPos({ x: e.clientX, y: e.clientY });
                              }}
                              onComment={() => setIsCommentModalOpen(true)}
                              onMagicWand={handleMagicWrite}
                              onRotate={rotateSelected}
                              onStartInteractiveRotate={handleStartInteractiveRotate}
                            />
                          </div>

                          {/* Live Floating Canva-style Rotation Pill / Tooltip */}
                          {rotationIndicator && rotationIndicator.visible && (
                            <div
                              id="canva-rotation-indicator-badge"
                              data-testid="canva-rotation-indicator"
                              style={{
                                left: `${rotationIndicator.x}px`,
                                top: `${rotationIndicator.y}px`,
                              }}
                              className="absolute -translate-x-1/2 z-50 pointer-events-none flex items-center gap-1.5 px-3 py-1 bg-[#18191b]/95 border border-[#8b3dff] text-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.6)] backdrop-blur-md text-xs font-semibold select-none animate-in fade-in zoom-in-95 duration-100"
                            >
                              {rotationIndicator.direction === 'Counter-clockwise' ? (
                                <RotateCcw className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              ) : (
                                <RotateCw className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                              )}
                              <span className="font-extrabold text-white text-[13px]">
                                {rotationIndicator.angle}°
                              </span>
                              <span className="text-purple-300 font-bold bg-purple-500/25 px-1.5 py-0.5 rounded text-[11px]">
                                {rotationIndicator.percentage}%
                              </span>
                              <span className="text-[11px] text-gray-300 font-medium">
                                {rotationIndicator.direction}
                              </span>
                            </div>
                          )}

                          {/* Live Circular Curve Guide (Matching Canva Screenshot Exactly) */}
                          {selectedObject &&
                            (selectedType === 'text' || selectedType === 'i-text' || selectedType === 'textbox') &&
                            Math.abs(textCurvature) > 0 &&
                            floatingHudPos && (
                              (() => {
                                const textLen = (selectedObject as any).text?.length || 4;
                                const fontSize = (selectedObject as any).fontSize || 40;
                                const approxW = textLen * fontSize * 0.65;
                                const angle = 2 * Math.PI * (Math.abs(textCurvature) / 100);
                                const radius = Math.max(approxW / angle, 50);
                                const rScaled = radius * zoomLevel;

                                const cx = floatingHudPos.x;
                                const cy = textCurvature > 0
                                  ? floatingHudPos.y + rScaled
                                  : floatingHudPos.y - rScaled;

                                return (
                                  <svg
                                    className="absolute inset-0 pointer-events-none z-30 overflow-visible"
                                    style={{ width: '100%', height: '100%' }}
                                    data-testid="canva-curve-guide-circle"
                                  >
                                    <circle
                                      cx={cx}
                                      cy={cy}
                                      r={rScaled}
                                      stroke="#a855f7"
                                      strokeWidth="1.8"
                                      fill="none"
                                      opacity="0.85"
                                    />
                                  </svg>
                                );
                              })()
                            )}
                        </div>

                        {/* Static container for Fabric.js canvas */}
                        <div id="fabric-stage-wrapper">
                          <canvas ref={canvasRef} key={`fabric-canvas-${currentPageIndex}`} />
                        </div>
                      </div>
                    ) : (
                      <div className="mt-2">
                        <PagePreviewCard
                          pageJson={pageJson}
                          width={canvasDimensions.width}
                          height={canvasDimensions.height}
                          zoomLevel={zoomLevel}
                          pageIndex={pageIdx}
                          onClick={() => handlePageChange(pageIdx)}
                        />
                      </div>
                    )}

                    {/* Divider: Add Page between pages if not the last page */}
                    {pageIdx < pages.length - 1 && (
                      <div className="my-6 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={() => handleAddPage(pageIdx + 1)}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#18191b] hover:bg-[#25272a] border border-[#2d2e30] rounded-full text-xs font-semibold text-gray-300 hover:text-purple-300 transition-colors shadow-sm cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5 text-purple-400" />
                          <span>Add page</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Full-width Add Page Pill Button directly below all pages (Matching Canva Image 1) */}
            <div className="mt-8 mb-12 flex items-center justify-center">
              <div className="flex items-center bg-[#18191b] hover:bg-[#202226] border border-[#2d2e30] rounded-xl overflow-hidden shadow-lg transition-colors">
                <button
                  onClick={() => handleAddPage()}
                  className="px-5 py-2.5 flex items-center gap-2 text-xs font-bold text-gray-200 hover:text-white cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-purple-400" />
                  <span>Add page</span>
                </button>
                <button
                  onClick={() => handleDuplicatePage()}
                  title="Duplicate page"
                  className="px-3 py-2.5 border-l border-[#2d2e30] text-gray-400 hover:text-white cursor-pointer"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* 4. CANVA FLOATING BOTTOM BAR (Matching Canva Image 1) */}
      <CanvaBottomBar
        zoomLevel={zoomLevel}
        onZoomChange={setZoom}
        onFitScreen={fitCanvasToContainer}
        currentPage={currentPageIndex + 1}
        totalPages={pages.length}
        onAddPage={handleAddPage}
        onAddPageAbove={handleAddPageAbove}
        onDuplicatePage={handleDuplicatePage}
        onDeletePage={handleDeletePage}
        onPageChange={handlePageChange}
        onToggleShortcuts={() => setIsShortcutsModalOpen(true)}
        showRulers={showRulers}
        onToggleRulers={() => setShowRulers(!showRulers)}
        showMargins={showMargins}
        onToggleMargins={() => setShowMargins(!showMargins)}
        showGrid={showGrid}
        onToggleGrid={() => setShowGrid(!showGrid)}
        isPanMode={isPanMode}
        onTogglePanMode={() => setIsPanMode(!isPanMode)}
        onStartPresentation={handleStartPresentation}
        isNotesOpen={isNotesOpen}
        onToggleNotes={() => setIsNotesOpen(!isNotesOpen)}
        isTimerOpen={isTimerOpen}
        onToggleTimer={() => setIsTimerOpen(!isTimerOpen)}
        onToggleMarathiKeyboard={() => setIsMarathiKeyboardOpen(!isMarathiKeyboardOpen)}
      />

      {/* 5. MODALS & OVERLAYS */}
      <CanvaContextMenu
        position={contextMenuPos}
        onClose={() => setContextMenuPos(null)}
        hasSelectedObject={!!selectedObject}
        isLocked={isLocked}
        hasClipboard={!!clipboardRef.current}
        hasCopiedStyle={!!copiedStyle}
        isText={selectedType === 'textbox' || selectedType === 'text' || selectedType === 'i-text'}
        isGroup={selectedType === 'group'}
        isSelection={selectedType === 'activeSelection'}
        onGroup={groupSelected}
        onUngroup={ungroupSelected}
        onRotate={rotateSelected}
        onCopy={copySelected}
        onCopyStyle={handleCopyStyle}
        onPaste={copiedStyle ? handlePasteStyle : pasteClipboard}
        onDuplicate={duplicateSelected}
        onDelete={deleteSelected}
        onBringForward={bringForward}
        onSendBackward={sendBackward}
        onBringToFront={bringToFront}
        onSendToBack={sendToBack}
        onFlipH={flipH}
        onFlipV={flipV}
        onToggleLock={toggleLockSelected}
        onAlign={alignSelected}
        onDistribute={distributeSelected}
        onSelectAll={selectAllObjects}
        onAddText={() => addText()}
        onCreateComponent={handleCreateComponent}
        onComment={() => setIsCommentModalOpen(true)}
        onAddLink={() => setIsLinkModalOpen(true)}
        onShowTiming={() => setIsTimingModalOpen(true)}
        onAltText={() => setIsAltTextModalOpen(true)}
        onMagicWrite={handleMagicWrite}
        onTranslateText={handleTranslateText}
      />

      <LinkModal
        isOpen={isLinkModalOpen}
        onClose={() => setIsLinkModalOpen(false)}
        initialUrl={(selectedObject as any)?.linkUrl || ''}
        onSave={(url) => {
          if (selectedObject) {
            (selectedObject as any).linkUrl = url;
            setSaveStatus('unsaved');
          }
        }}
      />

      <AltTextModal
        isOpen={isAltTextModalOpen}
        onClose={() => setIsAltTextModalOpen(false)}
        initialAlt={(selectedObject as any)?.altText || ''}
        onSave={(alt) => {
          if (selectedObject) {
            (selectedObject as any).altText = alt;
            setSaveStatus('unsaved');
          }
        }}
      />

      <ElementTimingModal
        isOpen={isTimingModalOpen}
        onClose={() => setIsTimingModalOpen(false)}
        initialTiming={(selectedObject as any)?.animationTiming || { duration: 1.5, delay: 0 }}
        onSave={(timing) => {
          if (selectedObject) {
            (selectedObject as any).animationTiming = timing;
            setSaveStatus('unsaved');
          }
        }}
      />

      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSave={(comment) => {
          alert('Design feedback recorded: ' + comment);
        }}
      />

      <CanvaPresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        pages={pages}
        currentPageIndex={currentPageIndex}
        currentCanvasDataUrl={presentationDataUrl}
        title={title}
      />

      <CanvaNotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentPageNumber={currentPageIndex + 1}
        notes={pageNotes[currentPageIndex] || ''}
        onNotesChange={(text) => setPageNotes((prev) => ({ ...prev, [currentPageIndex]: text }))}
      />

      <CanvaTimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
      />

      {/* 6. MARATHI TYPOGRAPHY, KEYBOARD, CONVERTER & FONT MANAGER */}
      <CanvaMarathiKeyboard
        isOpen={isMarathiKeyboardOpen}
        onClose={() => setIsMarathiKeyboardOpen(false)}
        onInsertText={handleInsertMarathiText}
        selectedText={(selectedObject as fabric.Textbox)?.text || ''}
      />

      <CanvaLegacyConverterModal
        isOpen={isLegacyConverterOpen}
        onClose={() => setIsLegacyConverterOpen(false)}
        initialText={(selectedObject as fabric.Textbox)?.text || ''}
        onApplyToCanvas={handleApplyLegacyConvertedText}
      />

      <CanvaFontManagerModal
        isOpen={isFontManagerOpen}
        onClose={() => setIsFontManagerOpen(false)}
        onFontSelected={(fontId) => updateTextProp('fontFamily', fontId)}
      />

      <CanvaExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        baseWidth={canvasDimensions.width}
        baseHeight={canvasDimensions.height}
        title={title}
        hasSelection={!!selectedObject}
      />

      <CanvaShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        designTitle={title}
        projectId={currentProjectId}
      />

      <CanvaVersionHistoryModal
        isOpen={isVersionHistoryOpen}
        onClose={() => setIsVersionHistoryOpen(false)}
        historySnapshots={historyRef.current}
        currentHistoryIndex={historyIndexRef.current}
        onRestoreVersion={handleRestoreVersion}
        designTitle={title}
      />

      <CanvaCropModal
        isOpen={isCropModalOpen}
        onClose={() => setIsCropModalOpen(false)}
        imageUrl={cropSourceUrl}
        onApplyCrop={handleApplyCrop}
      />

      <CanvaResizeModal
        isOpen={isResizeModalOpen}
        onClose={() => setIsResizeModalOpen(false)}
        currentWidth={canvasDimensions.width}
        currentHeight={canvasDimensions.height}
        onResize={handleResizeCanvas}
      />

      <CanvaShortcutsModal
        isOpen={isShortcutsModalOpen}
        onClose={() => setIsShortcutsModalOpen(false)}
      />

      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onAddTextToCanvas={(txt, size, col, wt) => addText(txt, size, wt, 'Mukta', col)}
        onApplyDesignProposal={applyAiDesignProposal}
      />

      <IntegrationSetupModal
        isOpen={!!activeIntegration}
        onClose={() => setActiveIntegration(null)}
        integration={activeIntegration}
      />

    </div>
  );
};
