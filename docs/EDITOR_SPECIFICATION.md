# Poster & Graphic Design Editor Technical Specification

## 1. System Overview
The Marathi Design Studio Editor is a Canva-grade vector graphics editor built with React 19, TypeScript, and Fabric.js 5.3, providing an **English-only application interface** capable of creating posters with **Devanagari (Marathi)**, Latin (English), and mixed bilingual typography.

---

## 2. Editor Layout & Structural Hierarchy

### A. Top Toolbar (`CanvaHeader.tsx`)
- **Brand Home Button**: Instant navigation back to `/dashboard`.
- **File Dropdown Menu**:
  - Create New Design
  - Save to Cloud (`Ctrl+S`)
  - Make a Copy / Duplicate Document
  - Resize Canvas (Dimensions & presets)
  - Download High-Res Export (PNG, JPG, PDF)
- **Document Title**: Inline editable title input with auto-save synchronization.
- **Auto-Save Status**: Real-time cloud persistence indicator (`All changes saved`, `Saving to cloud...`, `Unsaved changes`).
- **Undo / Redo**: History stack management with disabled states and `Ctrl+Z` / `Ctrl+Y` shortcuts.
- **Resize Modal**: Canvas dimension modifier with presets for Instagram Post, Festival Poster, Banner, Business Card, YouTube Thumbnail, A4 Flyer.
- **AI Magic Button**: Quick launcher for Marathi copywriting and design brief assistant.
- **Download / Export**: Triggers high-resolution export modal with scale multiplier up to 3x (300 DPI print scale).

### B. Left Sidebar Dock (`CanvaDock.tsx`)
A 72px sleek vertical dock hosting 19 specialized creative tool entry points:
1. **Templates (`templates`)**: 28+ authentic Marathi starter templates across 8 categories.
2. **Layouts (`layouts`)**: Preset grid structures (Hero Poster, 50/50 Split Promotion, Festive Mahotsav).
3. **Elements (`elements`)**: Geometric shapes, lines, arrows, stars, Marathi festive badges, and scalable SVGs.
4. **Text (`text`)**: Headings (52px), Subheadings (32px), Body text (20px), AMS Calligraphy presets, quotes.
5. **Fonts (`fonts`)**: Interactive Marathi font library with live typing tester and one-click application.
6. **Uploads (`uploads`)**: User media manager supporting drag-and-drop PNG, JPG, SVG up to 25MB.
7. **Photos (`photos`)**: Categorized Maharashtra cultural, fort, festival, and business stock photography.
8. **Videos (`videos`)**: Motion background loops, video trimmer UI, and honest cloud rendering setup.
9. **Audio (`audio`)**: Festive royalty-free tracks (Dhol Tasha, Shehnai, Bansuri) with audition player.
10. **Background (`background`)**: Solid color palette, Marathi signature gradients (Kesari Sunrise, Royal Maratha, Maroon Velvet, Golden Haldi).
11. **Draw (`draw`)**: Freehand brush with width slider (1–40px) and custom color palette.
12. **Charts (`charts`)**: Vector chart generator for Bar, Pie, Line, and Donut charts with live data editing.
13. **Tables (`tables`)**: Interactive table generator with configurable rows, columns, and color themes.
14. **Frames (`frames`)**: Photo frame masks (Circle, Smartphone Mockup, Floral Arch, Stamp).
15. **Grids (`grids`)**: Multi-photo collage grid layouts.
16. **Brand Kit (`brand`)**: Standardized brand color palettes, typography, and logo presets.
17. **Projects (`projects`)**: Quick access to saved designs for cross-project page insertion.
18. **Apps (`apps`)**: Integration directory and **Built-in QR Code Generator** (custom text, color, scale).
19. **AI Studio (`ai`)**: Devanagari AI headline copywriting and layout assistant modal.
20. **Layers (`layers`)**: Visual layer stack with reorder up/down, visibility toggle, lock/unlock, delete.

### C. Central Canvas Workspace (`CanvasEditor.tsx`)
- **Central Editable Canvas**: Fabric.js vector canvas supporting arbitrary aspect ratios and resolutions.
- **Stage Quick View Bar**: Floating pill above the canvas displaying live dimensions (`1080 × 1080 px`), zoom percentage (`55%`), and one-click toggles:
  - **Rulers Toggle** (`Ctrl+R`): Dynamic horizontal and vertical pixel rulers with live cursor tracking indicator lines.
  - **Margins Toggle**: 5% print safety bleed dashed guide overlay.
  - **Grid Toggle**: 20px precision alignment grid overlay.
  - **Fit to Screen**: Auto-scales the artboard to fit viewport margins.
- **Pan / Hand Tool**: Hold `Spacebar` or toggle `Hand Tool` to drag and pan freely across the workspace without displacing objects.
- **Smart Snapping**: Auto-aligns objects to canvas horizontal and vertical centers within a 12px threshold.
- **Right-Click Context Menu (`CanvaContextMenu.tsx`)**:
  - Copy (`Ctrl+C`), Cut (`Ctrl+X`), Paste (`Ctrl+V`), Duplicate (`Ctrl+D`)
  - Layer Order (Bring to Front, Bring Forward, Send Backward, Send to Back)
  - Align to Page (Left, Center H, Right, Top, Middle V, Bottom)
  - Flip Horizontal, Flip Vertical
  - Lock / Unlock Element
  - Delete Element (`Del`)

### D. Contextual Toolbar (`CanvaToolbar.tsx`)
Dynamically alters controls based on the selected object type:
- **For Text Objects**:
  - Font family dropdown with live Marathi preview.
  - Font size stepper (-2 / +2 px).
  - Text fill color with palette swatches.
  - Bold, Italic, Underline, and Case Transform (Uppercase, Lowercase, Title Case).
  - Alignment (Left, Center, Right).
  - Letter spacing (-20 to 200) and Line height (0.8 to 2.5).
  - Typography Effects: None, Drop Shadow, Kesari Glow, Hollow Outline, Soft Lift, Cyan Neon.
  - Background Highlight Pill: Custom colored badge behind text.
- **For Shape Objects**:
  - Shape fill color and palette swatches.
  - Border width and color picker.
  - Border styles: Solid, Dashed (`[12, 8]`), Dotted (`[4, 4]`).
  - Corner radius slider (`rx`, `ry`) for rectangles (0–120px).
  - Flip Horizontal and Flip Vertical.
- **For Image Objects**:
  - Flip Horizontal & Flip Vertical.
  - Adjustments panel: Brightness (-100 to +100), Contrast (-100 to +100), Saturation (-100 to +100), Blur (0 to 1).
  - One-click filters: Normal, B&W Grayscale, Vintage Sepia, Invert.
  - Honest AI Image Tools: Remove.bg cutout, Stability AI generative fill, Real-ESRGAN upscaler.
- **For Multiple Objects**:
  - Group (`Ctrl+G`) & Ungroup (`Ctrl+Shift+G`).
  - Distribute Horizontally & Distribute Vertically.

### E. Floating Bottom Bar (`CanvaBottomBar.tsx`)
- **Page Management**: Page switcher (`Page 1 of N`), Previous/Next buttons, Add Page, Duplicate Page, Delete Page.
- **Precision View Toggles**: Rulers, Margins, Grid, Hand/Pan tool.
- **Zoom Controls**: Zoom Out (-5%), Zoom Slider (10% to 200%), Zoom In (+5%), Zoom Percentage, Fit to Screen (`Maximize2`).
- **Fullscreen Presentation Mode (`CanvaPresentationModal.tsx`)**: Fullscreen slide deck preview with keyboard arrow navigation and Esc to exit.
- **Keyboard Shortcuts Modal (`CanvaShortcutsModal.tsx`)**: Searchable cheat sheet triggered by `?` key.

---

## 3. Storage Accounting (10 GB Dual Limits)
- **Template Library**: Strict 10.00 GB limit enforced server-side via `StorageAccountingService.java`.
- **Reusable Element Library**: Independent 10.00 GB limit enforced server-side.
- **SHA-256 Deduplication**: Identical asset byte arrays are rejected to preserve quota capacity.
- **Admin Storage Dashboard**: Full capacity metrics, usage bar charts, asset audit tables, and safe cache cleanup action at `/admin/storage`.
