import type { FC } from 'react';
import { KeyDef, KeyboardLayout, KeyboardLockCode, SwitchSound } from '@/lib/types';

export type KeycapProfile =
  | 'chiclet'         // Apple Magic, MacBook (flat, square-ish, tiny bevel)
  | 'low-profile'     // Logitech MX Keys (dished, circular concave)
  | 'low-profile-gl'  // Logitech G915 (flat with tiny indentation)
  | 'low-profile-flat' // MX Mechanical (flat-top low)
  | 'oem-sculpted'    // Keychron Q1 (OEM/Cherry profile, curved rows)
  | 'oem-flat'        // Keychron K2 (OEM but low board)
  | 'osa';            // Keychron Q1 Pro (Spherical scooped, top-left legends)

export interface CaseStyle {
  // Base frame
  frameColor: string;
  frameGradient?: [string, string, string]; // top, mid, bottom (lightness)
  cornerRadius: number;
  padTop: number;      // shell padding in px (above keys)
  padBottom: number;
  padX: number;
  frameMaterial: 'aluminum-anodized' | 'aluminum-brushed' | 'plastic-matte' | 'plastic-gloss';
  // Inner switch plate (where keys sit)
  hasPlate: boolean;           // false = floating keys (Apple-style)
  plateColor?: string;
  plateInsetShadow?: boolean;
  // Drop shadow under whole body
  deepShadow?: boolean;
  // gapRatio: Controls the gap between keys (e.g., 0.05 is 5% of unitSize). Default is 0.05.
  gapRatio?: number;
}

export interface RGBConfig {
  enabled: boolean;
  mode: 'static' | 'wave' | 'reactive' | 'breathe';
  color?: string;        // for static
  palette?: string[];    // for wave/breathe
  intensity?: number;    // 0..1
  underglow?: boolean;   // bottom edge bleed
}

// Per-keyboard sound signature — extends generic profile with unique params
export interface SoundSignature {
  base: SwitchSound;        // procedural family
  url?: string;             // optional specific sample
  pitch?: number;           // 0.6-1.6
  body?: number;            // low-freq mass
  click?: number;           // high-freq click
  noise?: number;           // broadband noise
  decay?: number;           // duration multiplier
  resonance?: number;       // filter Q
  damped?: boolean;         // scissor-style — no click, muted body
}

export interface ModelProps {
  pressedKeys: Set<string>;
  lockKeys?: Set<KeyboardLockCode>;
  lockLightKeys?: Set<string>;
  lockBacklightKeys?: Set<string>;
  onKeyDown?: (code: string) => void;
  onKeyUp?: (code: string) => void;
  onLockKeyToggle?: (code: KeyboardLockCode) => void;
  maxWidth?: number;
  rgbOverride?: Partial<RGBConfig>;
}

export interface ModelDef {
  id: string;
  brand: string;
  model: string;
  layout: KeyboardLayout;
  profile: KeycapProfile;
  caseStyle: CaseStyle;
  rgb: RGBConfig;
  sound: SoundSignature;
  soundVariants?: Partial<Record<SwitchSound, SoundSignature>>;
  keycapColor: string;
  modifierColor?: string;
  accentColor: string;
  legendColor: string;
  fontStack: string;        // CSS font-family, manufacturer-matched
  Component: FC<ModelProps>;
}

export type { KeyDef, KeyboardLayout, SwitchSound };
