'use client';

import React from 'react';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import { CaseStyle, RGBConfig, SoundSignature, ModelDef, ModelProps } from '../_base/types';
import { MXKeysCanvas } from './components/MXKeysCanvas';

// Logitech MX Keys (full-size, US hybrid legends).
// Uses the centered logi mark, Easy-Switch row, and numpad/nav legends from the
// official top-view product images.

const fnRow: KeyDef[] = [
  { code: 'Escape', label: 'esc', x: 0, y: 0, isModifier: true },
  { code: 'F1', label: 'F1', icon: 'brightness-down', x: 1.25, y: 0, isModifier: true },
  { code: 'F2', label: 'F2', icon: 'brightness-up', x: 2.25, y: 0, isModifier: true },
  { code: 'F3', label: 'F3', icon: 'keyboard-light-down', x: 3.25, y: 0, isModifier: true },
  { code: 'F4', label: 'F4', icon: 'keyboard-light-up', x: 4.25, y: 0, isModifier: true },
  { code: 'F5', label: 'F5', icon: 'dictation', x: 5.25, y: 0, isModifier: true },
  { code: 'F6', label: 'F6', icon: 'emoji', x: 6.25, y: 0, isModifier: true },
  { code: 'F7', label: 'F7', icon: 'capture', x: 7.25, y: 0, isModifier: true },
  { code: 'F8', label: 'F8', icon: 'mic-mute', x: 8.25, y: 0, isModifier: true },
  { code: 'F9', label: 'F9', icon: 'prev-track', x: 9.25, y: 0, isModifier: true },
  { code: 'F10', label: 'F10', icon: 'play-pause', x: 10.25, y: 0, isModifier: true },
  { code: 'F11', label: 'F11', icon: 'next-track', x: 11.25, y: 0, isModifier: true },
  { code: 'F12', label: 'F12', icon: 'mute', x: 12.25, y: 0, isModifier: true },
  { code: 'EasySwitch1', label: '1', icon: 'easy-switch', x: 13.5, y: 0, isModifier: true },
  { code: 'EasySwitch2', label: '2', icon: 'easy-switch', x: 14.5, y: 0, isModifier: true },
  { code: 'EasySwitch3', label: '3', icon: 'easy-switch', x: 15.5, y: 0, isModifier: true },
  { code: 'Calculator', label: '', icon: 'calculator', x: 17, y: 0, isModifier: true },
  { code: 'Capture', label: '', icon: 'capture', x: 18, y: 0, isModifier: true },
  { code: 'Search', label: '', icon: 'search', x: 19, y: 0, isModifier: true },
  { code: 'Lock', label: '', icon: 'lock', x: 20, y: 0, isModifier: true },
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
  { code: 'Backspace', label: 'backspace', x: 13, y: 1, w: 1.5 , isModifier: true },
  { code: 'Insert', label: 'insert', x: 14.5, y: 1 , isModifier: true },
  { code: 'Home', label: 'home', x: 15.5, y: 1 , isModifier: true },
  { code: 'PageUp', label: 'page up', x: 16.5, y: 1 , isModifier: true },
  { code: 'NumpadClear', label: 'clear', x: 17.75, y: 1, isModifier: true },
  { code: 'NumpadDivide', label: '/', x: 18.75, y: 1 },
  { code: 'NumpadMultiply', label: '*', x: 19.75, y: 1 },
  { code: 'NumpadSubtract', label: '−', x: 20.75, y: 1 },
];

const topRow: KeyDef[] = [
  { code: 'Tab', label: 'Tab', x: 0, y: 2, w: 1.5 , isModifier: true },
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
  { code: 'Backslash', label: '\\', label2: '|', x: 13.5, y: 2, w: 1 },
  { code: 'Delete', label: 'delete', x: 14.5, y: 2 , isModifier: true },
  { code: 'End', label: 'end', x: 15.5, y: 2 , isModifier: true },
  { code: 'PageDown', label: 'page down', x: 16.5, y: 2 , isModifier: true },
  { code: 'Numpad7', label: '7', label2: 'home', x: 17.75, y: 2 },
  { code: 'Numpad8', label: '8', x: 18.75, y: 2 },
  { code: 'Numpad9', label: '9', label2: 'pg up', x: 19.75, y: 2 },
  { code: 'NumpadAdd', label: '+', x: 20.75, y: 2, h: 2 },
];

const homeRow: KeyDef[] = [
  { code: 'CapsLock', label: 'Caps', x: 0, y: 3, w: 1.75 , isModifier: true },
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
  { code: 'Enter', label: 'Enter', x: 12.75, y: 3, w: 1.75 , isModifier: true },
  { code: 'Numpad4', label: '4', label2: '←', x: 17.75, y: 3 },
  { code: 'Numpad5', label: '5', x: 18.75, y: 3 },
  { code: 'Numpad6', label: '6', label2: '→', x: 19.75, y: 3 },
];

const bottomRow: KeyDef[] = [
  { code: 'ShiftLeft', label: 'Shift', x: 0, y: 4, w: 2.25 , isModifier: true },
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
  { code: 'ShiftRight', label: 'Shift', x: 12.25, y: 4, w: 2.25 , isModifier: true },
  { code: 'ArrowUp', label: '↑', x: 15.75, y: 4 , isModifier: true },
  { code: 'Numpad1', label: '1', label2: 'end', x: 17.75, y: 4 },
  { code: 'Numpad2', label: '2', label2: '↓', x: 18.75, y: 4 },
  { code: 'Numpad3', label: '3', label2: 'pg dn', x: 19.75, y: 4 },
];

const spaceRow: KeyDef[] = [
  { code: 'ControlLeft', label: 'Ctrl', x: 0, y: 5, w: 1.25 , isModifier: true },
  { code: 'MetaLeft', label: 'start', label2: 'opt', x: 1.25, y: 5, w: 1.25 , isModifier: true },
  { code: 'AltLeft', label: 'alt', label2: 'cmd', x: 2.5, y: 5, w: 1.25 , isModifier: true },
  { code: 'Space', label: '', x: 4.75, y: 5, w: 6.25 },
  { code: 'AltRight', label: 'alt', label2: 'cmd', x: 11, y: 5, w: 1.25 , isModifier: true },
  { code: 'Fn', label: 'fn', x: 12.25, y: 5, w: 1 , isModifier: true },
  { code: 'ControlRight', label: 'ctrl', x: 13.25, y: 5, w: 1.25 , isModifier: true },
  { code: 'ArrowLeft', label: '←', x: 14.75, y: 5 , isModifier: true },
  { code: 'ArrowDown', label: '↓', x: 15.75, y: 5 , isModifier: true },
  { code: 'ArrowRight', label: '→', x: 16.75, y: 5 , isModifier: true },
  { code: 'Numpad0', label: '0', label2: 'ins', x: 17.75, y: 5, w: 2 },
  { code: 'NumpadDecimal', label: '.', label2: 'del', x: 19.75, y: 5 },
  { code: 'NumpadEnter', label: 'enter', x: 20.75, y: 4, h: 2 },
];

export const layout: KeyboardLayout = {
  id: 'logitech-mx-keys',
  name: 'Logitech MX Keys',
  type: 'ansi-full',
  width: 21.75,
  height: 6,
  keys: [...fnRow, ...numberRow, ...topRow, ...homeRow, ...bottomRow, ...spaceRow],
};

export const caseStyle: CaseStyle = {
  frameColor: '#1d1d20',
  frameGradient: ['#28282c', '#1f1f22', '#121215'],
  cornerRadius: 10,
  padTop: 12,
  padBottom: 12,
  padX: 14,
  frameMaterial: 'aluminum-brushed',
  hasPlate: false,
  deepShadow: true,
  gapRatio: 0.04,
};

export const rgb: RGBConfig = {
  enabled: true,
  mode: 'static',
  color: '#f5f5f7',
  intensity: 0.35,
  underglow: false,
};

export const sound: SoundSignature = {
  base: 'linear',
  damped: true,
  pitch: 0.9,
  body: 0.7,
  click: 0.1,
  noise: 0.4,
  decay: 0.5,
  url: 'https://raw.githubusercontent.com/orhun/daktilo/main/sounds/cherryMxRed/3.wav',
};

const fontStack = `'Quicksand', 'Inter', system-ui, sans-serif`;
const capsLockKeyLed = new Set(['CapsLock']);

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
        <span style={{ fontFamily: fontStack, fontSize: 10, letterSpacing: 1, color: '#8a8a90', fontWeight: 600 }}>logi</span>
      </div>
    </>
  );
}

const MXKeysComponent: React.FC<ModelProps> = ({
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
  rgbOverride,
}) => (
  <MXKeysCanvas
    layout={layout}
    caseStyle={caseStyle}
    rgb={{ ...rgb, ...rgbOverride }}
    keycapColor="#28282c"
    modifierColor="#1f1f22"
    accentColor="#00B956"
    legendColor="#e6e6e8"
    fontStack={fontStack}
    pressedKeys={pressedKeys}
    lockKeys={lockKeys}
    lockLightKeys={capsLockKeyLed}
    onKeyDown={onKeyDown}
    onKeyUp={onKeyUp}
    onLockKeyToggle={onLockKeyToggle}
    maxWidth={maxWidth}
    headerContent={<LogiBrand />}
    unitSizeCap={44}
  />
);

export const mxKeys: ModelDef = {
  id: 'logitech-mx-keys',
  brand: 'Logitech',
  model: 'MX Keys',
  layout,
  profile: 'low-profile',
  caseStyle,
  rgb,
  sound,
  keycapColor: '#2d2d30',
  accentColor: '#00B956',
  legendColor: '#e6e6e8',
  fontStack,
  Component: MXKeysComponent,
};
