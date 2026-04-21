'use client';

import React from 'react';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import { CaseStyle, RGBConfig, SoundSignature, ModelDef, ModelProps } from '../_base/types';
import { MXMechanicalCanvas } from './components/MXMechanicalCanvas';

// Logitech MX Mechanical (full-size, US Mac layout).
// Standard ANSI widths: 2u backspace, 1.5u backslash, 2.75u right shift.
// Main area 15u → 0.5u gap → nav 3u → 0.25u gap → numpad 4u = 22.75u total.

const fnRow: KeyDef[] = [
  { code: 'Escape', label: 'esc', x: 0, y: 0, isModifier: true },
  { code: 'F1', label: 'F1', icon: 'brightness-down', x: 1.5, y: 0, isModifier: true },
  { code: 'F2', label: 'F2', icon: 'brightness-up', x: 2.5, y: 0, isModifier: true },
  { code: 'F3', label: 'F3', icon: 'app-switch', x: 3.5, y: 0, isModifier: true },
  { code: 'F4', label: 'F4', icon: 'launchpad', x: 4.5, y: 0, isModifier: true },
  { code: 'F5', label: 'F5', icon: 'keyboard-light-down', x: 5.75, y: 0, isModifier: true },
  { code: 'F6', label: 'F6', icon: 'keyboard-light-up', x: 6.75, y: 0, isModifier: true },
  { code: 'F7', label: 'F7', icon: 'prev-track', x: 7.75, y: 0, isModifier: true },
  { code: 'F8', label: 'F8', icon: 'play-pause', x: 8.75, y: 0, isModifier: true },
  { code: 'F9', label: 'F9', icon: 'next-track', x: 10, y: 0, isModifier: true },
  { code: 'F10', label: 'F10', icon: 'mute', x: 11, y: 0, isModifier: true },
  { code: 'F11', label: 'F11', icon: 'volume-down', x: 12, y: 0, isModifier: true },
  { code: 'F12', label: 'F12', icon: 'volume-up', x: 13, y: 0, isModifier: true },
  // EasySwitch — circled numbers to distinguish from numpad/number row
  { code: 'EasySwitch1', label: '①', x: 15.5, y: 0, isModifier: true },
  { code: 'EasySwitch2', label: '②', x: 16.5, y: 0, isModifier: true },
  { code: 'EasySwitch3', label: '③', x: 17.5, y: 0, isModifier: true },
  // Utility row
  { code: 'Calculator', label: '', icon: 'calculator', x: 18.75, y: 0, isModifier: true },
  { code: 'Capture', label: '', icon: 'capture', x: 19.75, y: 0, isModifier: true },
  { code: 'Search', label: '', icon: 'search', x: 20.75, y: 0, isModifier: true },
  { code: 'Lock', label: '', icon: 'lock', x: 21.75, y: 0, isModifier: true },
];

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
  { code: 'Backspace', label: 'backspace', x: 13, y: 1, w: 2, isModifier: true },
  // Nav cluster
  { code: 'Insert', label: 'ins', x: 15.5, y: 1, isModifier: true },
  { code: 'Home', label: 'home', x: 16.5, y: 1, isModifier: true },
  { code: 'PageUp', label: 'pg up', x: 17.5, y: 1, isModifier: true },
  // Numpad
  { code: 'NumpadClear', label: 'clear', x: 18.75, y: 1, isModifier: true },
  { code: 'NumpadDivide', label: '/', x: 19.75, y: 1 },
  { code: 'NumpadMultiply', label: '*', x: 20.75, y: 1 },
  { code: 'NumpadSubtract', label: '−', x: 21.75, y: 1 },
];

const topRow: KeyDef[] = [
  { code: 'Tab', label: 'tab', x: 0, y: 2, w: 1.5, isModifier: true },
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
  { code: 'Backslash', label: '\\', label2: '|', x: 13.5, y: 2, w: 1.5 },
  // Nav cluster
  { code: 'Delete', label: 'del', x: 15.5, y: 2, isModifier: true },
  { code: 'End', label: 'end', x: 16.5, y: 2, isModifier: true },
  { code: 'PageDown', label: 'pg dn', x: 17.5, y: 2, isModifier: true },
  // Numpad
  { code: 'Numpad7', label: '7', x: 18.75, y: 2 },
  { code: 'Numpad8', label: '8', x: 19.75, y: 2 },
  { code: 'Numpad9', label: '9', x: 20.75, y: 2 },
  { code: 'NumpadAdd', label: '+', x: 21.75, y: 2, h: 2 },
];

const homeRow: KeyDef[] = [
  { code: 'CapsLock', label: 'caps', x: 0, y: 3, w: 1.75, isModifier: true },
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
  { code: 'Enter', label: 'enter', x: 12.75, y: 3, w: 2.25, isModifier: true },
  // Numpad
  { code: 'Numpad4', label: '4', x: 18.75, y: 3 },
  { code: 'Numpad5', label: '5', x: 19.75, y: 3 },
  { code: 'Numpad6', label: '6', x: 20.75, y: 3 },
];

const bottomRow: KeyDef[] = [
  { code: 'ShiftLeft', label: 'shift', x: 0, y: 4, w: 2.25, isModifier: true },
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
  { code: 'ShiftRight', label: 'shift', x: 12.25, y: 4, w: 2.75, isModifier: true },
  // Arrow
  { code: 'ArrowUp', label: '↑', x: 16.5, y: 4, isModifier: true },
  // Numpad
  { code: 'Numpad1', label: '1', x: 18.75, y: 4 },
  { code: 'Numpad2', label: '2', x: 19.75, y: 4 },
  { code: 'Numpad3', label: '3', x: 20.75, y: 4 },
  { code: 'NumpadEnter', label: 'enter', x: 21.75, y: 4, h: 2, isModifier: true },
];

const spaceRow: KeyDef[] = [
  { code: 'ControlLeft', label: 'ctrl', x: 0, y: 5, w: 1.25, isModifier: true },
  { code: 'MetaLeft', label: 'opt', x: 1.25, y: 5, w: 1.25, isModifier: true },
  { code: 'AltLeft', label: 'cmd', x: 2.5, y: 5, w: 1.25, isModifier: true },
  { code: 'Space', label: '', x: 3.75, y: 5, w: 6.25 },
  { code: 'AltRight', label: 'cmd', x: 10, y: 5, w: 1.25, isModifier: true },
  { code: 'Fn', label: 'fn', x: 11.25, y: 5, w: 1, isModifier: true },
  { code: 'ControlRight', label: 'ctrl', x: 12.25, y: 5, w: 1.25, isModifier: true },
  // Arrows
  { code: 'ArrowLeft', label: '←', x: 15.5, y: 5, isModifier: true },
  { code: 'ArrowDown', label: '↓', x: 16.5, y: 5, isModifier: true },
  { code: 'ArrowRight', label: '→', x: 17.5, y: 5, isModifier: true },
  // Numpad
  { code: 'Numpad0', label: '0', x: 18.75, y: 5, w: 2 },
  { code: 'NumpadDecimal', label: '.', x: 20.75, y: 5 },
];

export const layout: KeyboardLayout = {
  id: 'logitech-mx-mechanical',
  name: 'Logitech MX Mechanical',
  type: 'ansi-full',
  width: 22.75,
  height: 6,
  keys: [...fnRow, ...numberRow, ...topRow, ...homeRow, ...bottomRow, ...spaceRow],
};

export const caseStyle: CaseStyle = {
  frameColor: '#484b51',
  frameGradient: ['#666a72', '#4d5158', '#35383f'],
  cornerRadius: 10,
  padTop: 14,
  padBottom: 14,
  padX: 14,
  frameMaterial: 'aluminum-brushed',
  hasPlate: true,
  plateColor: '#2b2d32',
  plateInsetShadow: true,
  deepShadow: true,
  gapRatio: 0.045,
};

export const rgb: RGBConfig = {
  enabled: true,
  mode: 'static',
  color: '#f5f7fb',
  intensity: 0.24,
  underglow: false,
};

export const sound: SoundSignature = {
  base: 'tactile',
  pitch: 0.92,
  body: 1.0,
  click: 0.38,
  noise: 0.48,
  decay: 0.92,
  resonance: 0.78,
  url: 'https://raw.githubusercontent.com/orhun/daktilo/main/sounds/cherryMxBrown/2.wav',
};

const fontStack = `'Quicksand', 'Inter', system-ui, sans-serif`;
const capsLockBacklight = new Set(['CapsLock']);

function LogiBrand() {
  return (
    <>
      <div
        aria-hidden
        className="absolute top-4 right-5 pointer-events-none"
        style={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.16)',
          boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.12)',
          opacity: 0.48,
        }}
      />
      <div aria-hidden className="absolute top-2.5 left-1/2 -translate-x-1/2 opacity-60 pointer-events-none">
        <span style={{ fontFamily: fontStack, fontSize: 10, letterSpacing: 1, color: '#b5b8be', fontWeight: 600 }}>logi</span>
      </div>
    </>
  );
}

const MXMechanicalComponent: React.FC<ModelProps> = ({
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
  rgbOverride,
}) => (
  <MXMechanicalCanvas
    layout={layout}
    caseStyle={caseStyle}
    rgb={{ ...rgb, ...rgbOverride }}
    keycapColor="#32353a"
    modifierColor="#23262b"
    accentColor="#93e05d"
    legendColor="#f0f2f6"
    fontStack={fontStack}
    pressedKeys={pressedKeys}
    lockKeys={lockKeys}
    lockBacklightKeys={capsLockBacklight}
    onKeyDown={onKeyDown}
    onKeyUp={onKeyUp}
    onLockKeyToggle={onLockKeyToggle}
    maxWidth={maxWidth}
    headerContent={<LogiBrand />}
    unitSizeCap={44}
  />
);

export const mxMechanical: ModelDef = {
  id: 'logitech-mx-mechanical',
  brand: 'Logitech',
  model: 'MX Mechanical',
  layout,
  profile: 'low-profile-flat',
  caseStyle,
  rgb,
  sound,
  keycapColor: '#32353a',
  modifierColor: '#23262b',
  accentColor: '#93e05d',
  legendColor: '#f0f2f6',
  fontStack,
  Component: MXMechanicalComponent,
};
