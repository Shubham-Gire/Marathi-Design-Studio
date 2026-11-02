/**
 * Design Engine Core Math and Utilities
 */

export interface Dimensions {
  width: number;
  height: number;
}

export interface Bounds {
  left: number;
  top: number;
  width: number;
  height: number;
}

/**
 * Calculates print safety bleed margins (standard 5% or 3mm equivalent)
 */
export function calculateBleedMargins(dim: Dimensions, percent = 0.05): Bounds {
  const insetX = dim.width * percent;
  const insetY = dim.height * percent;
  return {
    left: insetX,
    top: insetY,
    width: dim.width - insetX * 2,
    height: dim.height - insetY * 2
  };
}

/**
 * Snaps a coordinate value to a snap threshold
 */
export function snapToTarget(current: number, target: number, threshold = 10): { snapped: boolean; value: number } {
  if (Math.abs(current - target) <= threshold) {
    return { snapped: true, value: target };
  }
  return { snapped: false, value: current };
}

/**
 * Calculates export pixel multipliers for print resolutions
 * 1x: Screen resolution (72-96 DPI)
 * 2x: High DPI Retina (150-200 DPI)
 * 3x: 300 DPI Ultra Print Quality
 */
export function getExportScaleMultiplier(quality: 'screen' | 'high' | 'ultra_print'): number {
  switch (quality) {
    case 'screen':
      return 1.0;
    case 'high':
      return 2.0;
    case 'ultra_print':
      return 3.125; // 300 DPI multiplier for 96 DPI baseline
    default:
      return 1.5;
  }
}

/**
 * Sanitizes design titles for file downloads while preserving Devanagari Unicode
 */
export function sanitizeDesignFilename(title: string, defaultName = 'marathi-design'): string {
  const sanitized = (title || defaultName)
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
    .replace(/\s+/g, '_')
    .trim();
  return sanitized.length > 0 ? sanitized : defaultName;
}
