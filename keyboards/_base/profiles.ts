import { KeycapProfile } from './types';

export interface ProfileParams {
  // Keycap top dish area (as fraction of key inner dims)
  topInsetTop: number;
  topInsetBottom: number;
  topInsetX: number;
  // Visual keycap travel on press (as fraction of unitSize)
  travel: number;
  // Shell depth simulated via shadow (as fraction of unitSize)
  depth: number;
  // Dish curvature: 0 = flat, 1 = strongly scooped
  dishCurve: number;
  // Corner radius factor * unitSize
  capRadius: number;
  topRadius: number;
  // Brightness deltas for realism (HSL shifts)
  topLightness: number;
  skirtFrontLightness: number;
  skirtBackLightness: number;
  // Font weight adjustment
  fontWeight: number;
  fontSizeRatio: number;       // font size as fraction of unitSize
  secondaryFontRatio: number;  // relative to primary
  // Legend position: 'center' | 'top-left' | 'bottom-center'
  legendPosition: 'center' | 'top-left' | 'bottom-center';
  // Press spring
  springStiffness: number;
  springDamping: number;
}

export const profiles: Record<KeycapProfile, ProfileParams> = {
  // Apple Magic / MacBook — flat chiclet, tight bevel, barely any skirt
  chiclet: {
    topInsetTop: 0.08,
    topInsetBottom: 0.1,
    topInsetX: 0.06,
    travel: 0.04,
    depth: 0.06,
    dishCurve: 0,
    capRadius: 0.12,
    topRadius: 0.08,
    topLightness: 2,
    skirtFrontLightness: -6,
    skirtBackLightness: 4,
    fontWeight: 500,
    fontSizeRatio: 0.26,
    secondaryFontRatio: 0.72,
    legendPosition: 'center',
    springStiffness: 1800,
    springDamping: 60,
  },

  // Logitech G915 GL Switches — perfectly flat with a tiny indentation, tight gaps
  'low-profile-gl': {
    topInsetTop: 0.09,
    topInsetBottom: 0.14,
    topInsetX: 0.13,
    travel: 0.06,
    depth: 0.08,
    dishCurve: 0.04,
    capRadius: 0.08,
    topRadius: 0.035,
    topLightness: 0,
    skirtFrontLightness: -18,
    skirtBackLightness: -4,
    fontWeight: 600,
    fontSizeRatio: 0.22,
    secondaryFontRatio: 0.72,
    legendPosition: 'center',
    springStiffness: 1500,
    springDamping: 50,
  },

  // Logitech MX Keys / G915 — circular dish cut into chiclet
  'low-profile': {
    topInsetTop: 0.1,
    topInsetBottom: 0.14,
    topInsetX: 0.08,
    travel: 0.06,
    depth: 0.08,
    dishCurve: 0.7,
    capRadius: 0.14,
    topRadius: 0.4,           // circular dish
    topLightness: 3,
    skirtFrontLightness: -10,
    skirtBackLightness: 6,
    fontWeight: 600,
    fontSizeRatio: 0.26,
    secondaryFontRatio: 0.72,
    legendPosition: 'center',
    springStiffness: 1500,
    springDamping: 50,
  },

  // Logitech MX Mechanical — low-profile but flat-ish
  'low-profile-flat': {
    topInsetTop: 0.08,
    topInsetBottom: 0.14,
    topInsetX: 0.08,
    travel: 0.08,
    depth: 0.1,
    dishCurve: 0.3,
    capRadius: 0.14,
    topRadius: 0.12,
    topLightness: 4,
    skirtFrontLightness: -12,
    skirtBackLightness: 8,
    fontWeight: 600,
    fontSizeRatio: 0.24,
    secondaryFontRatio: 0.72,
    legendPosition: 'center',
    springStiffness: 1400,
    springDamping: 45,
  },

  // Keychron Q1 Pro — OEM/OSA/KSA sculpted, tall keycaps, spherical scoop, thick bottom skirt
  'oem-sculpted': {
    topInsetTop: 0.08,
    topInsetBottom: 0.22,
    topInsetX: 0.16,
    travel: 0.14,
    depth: 0.2,
    dishCurve: 0.8,
    capRadius: 0.16,
    topRadius: 0.25,
    topLightness: 6,
    skirtFrontLightness: -20,
    skirtBackLightness: 15,
    fontWeight: 600,          // KSA legends are bold but not ultra-bold
    fontSizeRatio: 0.26,      // Larger centered text
    secondaryFontRatio: 0.7,
    legendPosition: 'center', // KSA profile uses centered legends
    springStiffness: 1100,
    springDamping: 38,
  },

  // Keychron K2 — OEM but on low board, slightly shorter travel
  'oem-flat': {
    topInsetTop: 0.06,
    topInsetBottom: 0.2,
    topInsetX: 0.12,
    travel: 0.1,
    depth: 0.14,
    dishCurve: 0.4,
    capRadius: 0.15,
    topRadius: 0.12,
    topLightness: 4,
    skirtFrontLightness: -13,
    skirtBackLightness: 10,
    fontWeight: 700,
    fontSizeRatio: 0.22,
    secondaryFontRatio: 0.7,
    legendPosition: 'center',
    springStiffness: 1200,
    springDamping: 40,
  },

  // Keychron Q1 Pro — OSA profile (spherical scoop, premium matte PBT look)
  'osa': {
    topInsetTop: 0.08,
    topInsetBottom: 0.22,
    topInsetX: 0.16,
    travel: 0.14,
    depth: 0.2,
    dishCurve: 0.8,
    capRadius: 0.16,
    topRadius: 0.32,          // Spherical, soft corners
    topLightness: 0,
    skirtFrontLightness: -10,
    skirtBackLightness: 10,
    fontWeight: 500,
    fontSizeRatio: 0.23,
    secondaryFontRatio: 0.7,
    legendPosition: 'top-left',
    springStiffness: 1100,
    springDamping: 38,
  },
};
