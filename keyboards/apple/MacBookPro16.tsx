'use client';

import React from 'react';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import { CaseStyle, RGBConfig, SoundSignature, ModelDef, ModelProps } from '../_base/types';
import { AppleCanvas } from './components/AppleCanvas';

// MacBook Pro 16" (M-series) internal keyboard.
// Distinctive features:
// - Full-height function row with Touch ID power button on far right
// - 14 function keys total (Esc wider at 1.25u, then F1-F12, then Touch ID)
// - Standard ANSI stagger
// - Inverted-T arrow cluster (half-height up/down)
// - No numpad, no nav cluster
// - Mac bottom row: fn / control / option / command / space / command / option / arrows
// - Compact form factor (14.25u wide)

// ─── Function Row (y = 0) — full-height, continuous ─────
const fnRow: KeyDef[] = [
  { code: 'Escape', label: 'esc', x: 0, y: 0, w: 1.5, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'F1', label: 'F1', icon: 'brightness-down', x: 1.5, y: 0, isModifier: true },
  { code: 'F2', label: 'F2', icon: 'brightness-up', x: 2.5, y: 0, isModifier: true },
  { code: 'F3', label: 'F3', icon: 'mission-control', x: 3.5, y: 0, isModifier: true },
  { code: 'F4', label: 'F4', icon: 'search', x: 4.5, y: 0, isModifier: true },
  { code: 'F5', label: 'F5', icon: 'dictation', x: 5.5, y: 0, isModifier: true },
  { code: 'F6', label: 'F6', icon: 'do-not-disturb', x: 6.5, y: 0, isModifier: true },
  { code: 'F7', label: 'F7', icon: 'prev-track', x: 7.5, y: 0, isModifier: true },
  { code: 'F8', label: 'F8', icon: 'play-pause', x: 8.5, y: 0, isModifier: true },
  { code: 'F9', label: 'F9', icon: 'next-track', x: 9.5, y: 0, isModifier: true },
  { code: 'F10', label: 'F10', icon: 'mute', x: 10.5, y: 0, isModifier: true },
  { code: 'F11', label: 'F11', icon: 'volume-down', x: 11.5, y: 0, isModifier: true },
  { code: 'F12', label: 'F12', icon: 'volume-up', x: 12.5, y: 0, isModifier: true },
  { code: 'TouchID', label: '', x: 13.5, y: 0, w: 1.5, isModifier: true, isTouchID: true },
];

// ─── Number Row (y = 1) ─────────────────────────────────
const numberRow: KeyDef[] = [
  { code: 'Backquote', label: '`', label2: '~', x: 0, y: 1 },
  { code: 'Digit1', label: '1', label2: '!', x: 1, y: 1 },
  { code: 'Digit2', label: '2', label2: '@', x: 2, y: 1 },
  { code: 'Digit3', label: '3', label2: '#', x: 3, y: 1 },
  { code: 'Digit4', label: '4', label2: '$', x: 4, y: 1 },
  { code: 'Digit5', label: '5', label2: '%', x: 5, y: 1 },
  { code: 'Digit6', label: '6', label2: '^', x: 6, y: 1 },
  { code: 'Digit7', label: '7', label2: '&', x: 7, y: 1 },
  { code: 'Digit8', label: '8', label2: '*', x: 8, y: 1 },
  { code: 'Digit9', label: '9', label2: '(', x: 9, y: 1 },
  { code: 'Digit0', label: '0', label2: ')', x: 10, y: 1 },
  { code: 'Minus', label: '-', label2: '_', x: 11, y: 1 },
  { code: 'Equal', label: '=', label2: '+', x: 12, y: 1 },
  { code: 'Backspace', label: 'delete', x: 13, y: 1, w: 1.25 , isModifier: true , legendPosition: 'bottom-left' },
];

// ─── Top Row (y = 2) ────────────────────────────────────
const topRow: KeyDef[] = [
  { code: 'Tab', label: 'tab', x: 0, y: 2, w: 1.5 , isModifier: true , legendPosition: 'bottom-left' },
  { code: 'KeyQ', label: 'Q', x: 1.5, y: 2 },
  { code: 'KeyW', label: 'W', x: 2.5, y: 2 },
  { code: 'KeyE', label: 'E', x: 3.5, y: 2 },
  { code: 'KeyR', label: 'R', x: 4.5, y: 2 },
  { code: 'KeyT', label: 'T', x: 5.5, y: 2 },
  { code: 'KeyY', label: 'Y', x: 6.5, y: 2 },
  { code: 'KeyU', label: 'U', x: 7.5, y: 2 },
  { code: 'KeyI', label: 'I', x: 8.5, y: 2 },
  { code: 'KeyO', label: 'O', x: 9.5, y: 2 },
  { code: 'KeyP', label: 'P', x: 10.5, y: 2 },
  { code: 'BracketLeft', label: '[', label2: '{', x: 11.5, y: 2 },
  { code: 'BracketRight', label: ']', label2: '}', x: 12.5, y: 2 },
  { code: 'Backslash', label: '\\', label2: '|', x: 13.5, y: 2, w: 0.75 },
];

// ─── Home Row (y = 3) ───────────────────────────────────
const homeRow: KeyDef[] = [
  { code: 'CapsLock', label: 'caps lock', x: 0, y: 3, w: 1.75 , isModifier: true , legendPosition: 'bottom-left' },
  { code: 'KeyA', label: 'A', x: 1.75, y: 3 },
  { code: 'KeyS', label: 'S', x: 2.75, y: 3 },
  { code: 'KeyD', label: 'D', x: 3.75, y: 3 },
  { code: 'KeyF', label: 'F', x: 4.75, y: 3 },
  { code: 'KeyG', label: 'G', x: 5.75, y: 3 },
  { code: 'KeyH', label: 'H', x: 6.75, y: 3 },
  { code: 'KeyJ', label: 'J', x: 7.75, y: 3 },
  { code: 'KeyK', label: 'K', x: 8.75, y: 3 },
  { code: 'KeyL', label: 'L', x: 9.75, y: 3 },
  { code: 'Semicolon', label: ';', label2: ':', x: 10.75, y: 3 },
  { code: 'Quote', label: "'", label2: '"', x: 11.75, y: 3 },
  { code: 'Enter', label: 'return', x: 12.75, y: 3, w: 1.5 , isModifier: true , legendPosition: 'bottom-left' },
];

// ─── Bottom Row (y = 4) ─────────────────────────────────
const bottomRow: KeyDef[] = [
  { code: 'ShiftLeft', label: 'shift', x: 0, y: 4, w: 2.25 , isModifier: true , legendPosition: 'bottom-left' },
  { code: 'KeyZ', label: 'Z', x: 2.25, y: 4 },
  { code: 'KeyX', label: 'X', x: 3.25, y: 4 },
  { code: 'KeyC', label: 'C', x: 4.25, y: 4 },
  { code: 'KeyV', label: 'V', x: 5.25, y: 4 },
  { code: 'KeyB', label: 'B', x: 6.25, y: 4 },
  { code: 'KeyN', label: 'N', x: 7.25, y: 4 },
  { code: 'KeyM', label: 'M', x: 8.25, y: 4 },
  { code: 'Comma', label: ',', label2: '<', x: 9.25, y: 4 },
  { code: 'Period', label: '.', label2: '>', x: 10.25, y: 4 },
  { code: 'Slash', label: '/', label2: '?', x: 11.25, y: 4 },
  { code: 'ShiftRight', label: 'shift', x: 12.25, y: 4, w: 2 , isModifier: true , legendPosition: 'bottom-left' },
];

// ─── Space Row (y = 5) — Mac layout with inverted-T arrows ─
const spaceRow: KeyDef[] = [
  { code: 'Fn', label: '', icon: 'globe', x: 0, y: 5 , isModifier: true },
  { code: 'ControlLeft', label: 'control', x: 1, y: 5 , isModifier: true , legendPosition: 'bottom-left' },
  { code: 'AltLeft', label: '⌥', x: 2, y: 5, w: 1.25 , isModifier: true , legendPosition: 'bottom-left' },
  { code: 'MetaLeft', label: '⌘', x: 3.25, y: 5, w: 1.25 , isModifier: true , legendPosition: 'bottom-left' },
  { code: 'Space', label: '', x: 4.5, y: 5, w: 5.25 },
  { code: 'MetaRight', label: '⌘', x: 9.75, y: 5, w: 1.25 , isModifier: true , legendPosition: 'bottom-left' },
  { code: 'AltRight', label: '⌥', x: 11, y: 5, w: 1.25 , isModifier: true , legendPosition: 'bottom-left' },
  // Inverted-T arrow cluster — left full-height, up half-height, down half-height, right full-height
  { code: 'ArrowLeft', label: '←', x: 12.25, y: 5 , isModifier: true },
  { code: 'ArrowUp', label: '↑', x: 13.25, y: 5, h: 0.5 , isModifier: true },
  { code: 'ArrowDown', label: '↓', x: 13.25, y: 5.5, h: 0.5 , isModifier: true },
  { code: 'ArrowRight', label: '→', x: 14.25, y: 5 , isModifier: true },
];

export const layout: KeyboardLayout = {
  id: 'macbook-pro-16',
  name: 'MacBook Pro 16 Keyboard',
  type: 'apple-magic-full',
  width: 15.25,
  height: 6,
  keys: [...fnRow, ...numberRow, ...topRow, ...homeRow, ...bottomRow, ...spaceRow],
};

export const caseStyle: CaseStyle = {
  frameColor: '#1a1a1c',
  frameGradient: ['#262628', '#17171a', '#0c0c0e'],
  cornerRadius: 22,
  padTop: 20,
  padBottom: 20,
  padX: 36, // extra horizontal room for speaker grilles
  frameMaterial: 'aluminum-anodized',
  hasPlate: true,
  plateColor: '#0a0a0b',
  plateInsetShadow: true,
  deepShadow: true,
  gapRatio: 0.025,
};

export const rgb: RGBConfig = { enabled: false, mode: 'static' };

export const sound: SoundSignature = {
  base: 'linear',
  damped: true,
  pitch: 0.95,
  body: 0.8,
  click: 0,
  noise: 0.32,
  decay: 0.6,
  url: 'https://raw.githubusercontent.com/orhun/daktilo/main/sounds/cherryMxRed/3.wav',
};

const fontStack = `'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`;
const capsLockKeyLed = new Set(['CapsLock']);

// Real MacBook Pro 16" has hexagonal speaker grilles flanking the keyboard.
// Approximate with a dot grid that sits on the shell beside the key plate.
function SpeakerGrilles() {
  const dots = Array.from({ length: 12 * 4 });
  const grill = (
    <div
      className="grid gap-[2px] opacity-60"
      style={{
        gridTemplateColumns: 'repeat(4, 3px)',
        gridAutoRows: '3px',
      }}
    >
      {dots.map((_, i) => (
        <div key={i} style={{ width: 3, height: 3, borderRadius: '50%', background: '#0a0a0b', boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)' }} />
      ))}
    </div>
  );
  return (
    <>
      <div aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">{grill}</div>
      <div aria-hidden className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">{grill}</div>
    </>
  );
}

const MacBookPro16Component: React.FC<ModelProps> = ({
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
  rgbOverride,
}) => {
  return (
    <AppleCanvas
      layout={layout}
      caseStyle={caseStyle}
      rgb={{ ...rgb, ...rgbOverride }}
      keycapColor="#141415"
      modifierColor="#141415"
      accentColor="#86868b"
      legendColor="#f5f5f7"
      fontStack={fontStack}
      pressedKeys={pressedKeys}
      lockKeys={lockKeys}
      lockLightKeys={capsLockKeyLed}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onLockKeyToggle={onLockKeyToggle}
      maxWidth={maxWidth}
      unitSizeCap={54}
      headerContent={<SpeakerGrilles />}
    />
  );
};

export const macBookPro16: ModelDef = {
  id: 'apple-macbook-pro-16',
  brand: 'Apple',
  model: 'MacBook Pro 16" Keyboard',
  layout,
  profile: 'chiclet',
  caseStyle,
  rgb,
  sound,
  keycapColor: '#232325',
  accentColor: '#86868b',
  legendColor: '#f5f5f7',
  fontStack,
  Component: MacBookPro16Component,
};
