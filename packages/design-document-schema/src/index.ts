/**
 * Design Document Schema Specification for Marathi Design Studio
 * Enforces JSON structure for multi-page Fabric.js vector canvas documents.
 */

export interface CanvasObjectShadow {
  color: string;
  blur: number;
  offsetX: number;
  offsetY: number;
}

export interface CanvasBaseObjectSchema {
  type: string;
  version?: string;
  originX?: 'left' | 'center' | 'right';
  originY?: 'top' | 'center' | 'bottom';
  left: number;
  top: number;
  width: number;
  height: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDashArray?: number[] | null;
  scaleX?: number;
  scaleY?: number;
  angle?: number;
  flipX?: boolean;
  flipY?: boolean;
  opacity?: number;
  shadow?: CanvasObjectShadow | null;
  visible?: boolean;
  selectable?: boolean;
  lockMovementX?: boolean;
  lockMovementY?: boolean;
  lockRotation?: boolean;
  lockScalingX?: boolean;
  lockScalingY?: boolean;
  name?: string;
}

export interface CanvasTextboxSchema extends CanvasBaseObjectSchema {
  type: 'textbox' | 'i-text' | 'text';
  text: string;
  fontSize: number;
  fontWeight: string | number;
  fontFamily: string;
  fontStyle?: 'normal' | 'italic';
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  charSpacing?: number;
  underline?: boolean;
  backgroundColor?: string;
}

export interface CanvasRectSchema extends CanvasBaseObjectSchema {
  type: 'rect';
  rx?: number;
  ry?: number;
}

export interface CanvasCircleSchema extends CanvasBaseObjectSchema {
  type: 'circle';
  radius: number;
}

export interface CanvasImageSchema extends CanvasBaseObjectSchema {
  type: 'image';
  src: string;
  crossOrigin?: string;
  filters?: any[];
}

export interface CanvasPageSchema {
  version: string;
  background?: string;
  objects: (CanvasTextboxSchema | CanvasRectSchema | CanvasCircleSchema | CanvasImageSchema | CanvasBaseObjectSchema)[];
}

export interface MultiPageDesignDocument {
  id?: number;
  title: string;
  width: number;
  height: number;
  unit: 'px' | 'mm' | 'in';
  dpi: number;
  pageCount: number;
  pages: CanvasPageSchema[];
  createdAt?: string;
  updatedAt?: string;
}
