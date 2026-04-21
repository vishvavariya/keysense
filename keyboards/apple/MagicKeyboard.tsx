'use client';

import React from 'react';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import {
  CaseStyle, RGBConfig, SoundSignature, ModelDef, ModelProps,
} from '../_base/types';
import { AppleCanvas } from './components/AppleCanvas';

// Apple Magic Keyboard (USB-C, compact ANSI).
// Matches the current Apple layout with full-height function keys,
// a top-right lock key, and the globe key on the bottom row.

const fnY = 0;
const mainY = 1;

const fnRow: KeyDef[] = [
  { code: 'Escape', label: 'esc', x: 0, y: fnY, w: 1.5, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'F1', label: 'F1', icon: 'brightness-down', x: 1.5, y: fnY, isModifier: true },
  { code: 'F2', label: 'F2', icon: 'brightness-up', x: 2.5, y: fnY, isModifier: true },
  { code: 'F3', label: 'F3', icon: 'mission-control', x: 3.5, y: fnY, isModifier: true },
  { code: 'F4', label: 'F4', icon: 'search', x: 4.5, y: fnY, isModifier: true },
  { code: 'F5', label: 'F5', icon: 'dictation', x: 5.5, y: fnY, isModifier: true },
  { code: 'F6', label: 'F6', icon: 'do-not-disturb', x: 6.5, y: fnY, isModifier: true },
  { code: 'F7', label: 'F7', icon: 'prev-track', x: 7.5, y: fnY, isModifier: true },
  { code: 'F8', label: 'F8', icon: 'play-pause', x: 8.5, y: fnY, isModifier: true },
  { code: 'F9', label: 'F9', icon: 'next-track', x: 9.5, y: fnY, isModifier: true },
  { code: 'F10', label: 'F10', icon: 'mute', x: 10.5, y: fnY, isModifier: true },
  { code: 'F11', label: 'F11', icon: 'volume-down', x: 11.5, y: fnY, isModifier: true },
  { code: 'F12', label: 'F12', icon: 'volume-up', x: 12.5, y: fnY, isModifier: true },
  { code: 'Lock', label: '', icon: 'lock', x: 13.5, y: fnY, w: 1.5, isModifier: true },
];

const numberRow: KeyDef[] = [
  { code: 'Backquote', label: '`', label2: '~', x: 0, y: mainY },
  { code: 'Digit1', label: '1', label2: '!', x: 1, y: mainY },
  { code: 'Digit2', label: '2', label2: '@', x: 2, y: mainY },
  { code: 'Digit3', label: '3', label2: '#', x: 3, y: mainY },
  { code: 'Digit4', label: '4', label2: '$', x: 4, y: mainY },
  { code: 'Digit5', label: '5', label2: '%', x: 5, y: mainY },
  { code: 'Digit6', label: '6', label2: '^', x: 6, y: mainY },
  { code: 'Digit7', label: '7', label2: '&', x: 7, y: mainY },
  { code: 'Digit8', label: '8', label2: '*', x: 8, y: mainY },
  { code: 'Digit9', label: '9', label2: '(', x: 9, y: mainY },
  { code: 'Digit0', label: '0', label2: ')', x: 10, y: mainY },
  { code: 'Minus', label: '-', label2: '_', x: 11, y: mainY },
  { code: 'Equal', label: '=', label2: '+', x: 12, y: mainY },
  { code: 'Backspace', label: 'delete', x: 13, y: mainY, w: 2, isModifier: true, legendPosition: 'bottom-left' },
];

const topRow: KeyDef[] = [
  { code: 'Tab', label: 'tab', x: 0, y: mainY + 1, w: 1.5, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'KeyQ', label: 'Q', x: 1.5, y: mainY + 1 },
  { code: 'KeyW', label: 'W', x: 2.5, y: mainY + 1 },
  { code: 'KeyE', label: 'E', x: 3.5, y: mainY + 1 },
  { code: 'KeyR', label: 'R', x: 4.5, y: mainY + 1 },
  { code: 'KeyT', label: 'T', x: 5.5, y: mainY + 1 },
  { code: 'KeyY', label: 'Y', x: 6.5, y: mainY + 1 },
  { code: 'KeyU', label: 'U', x: 7.5, y: mainY + 1 },
  { code: 'KeyI', label: 'I', x: 8.5, y: mainY + 1 },
  { code: 'KeyO', label: 'O', x: 9.5, y: mainY + 1 },
  { code: 'KeyP', label: 'P', x: 10.5, y: mainY + 1 },
  { code: 'BracketLeft', label: '[', label2: '{', x: 11.5, y: mainY + 1 },
  { code: 'BracketRight', label: ']', label2: '}', x: 12.5, y: mainY + 1 },
  { code: 'Backslash', label: '\\', label2: '|', x: 13.5, y: mainY + 1, w: 1.5 },
];

const homeRow: KeyDef[] = [
  { code: 'CapsLock', label: 'caps lock', x: 0, y: mainY + 2, w: 1.75, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'KeyA', label: 'A', x: 1.75, y: mainY + 2 },
  { code: 'KeyS', label: 'S', x: 2.75, y: mainY + 2 },
  { code: 'KeyD', label: 'D', x: 3.75, y: mainY + 2 },
  { code: 'KeyF', label: 'F', x: 4.75, y: mainY + 2 },
  { code: 'KeyG', label: 'G', x: 5.75, y: mainY + 2 },
  { code: 'KeyH', label: 'H', x: 6.75, y: mainY + 2 },
  { code: 'KeyJ', label: 'J', x: 7.75, y: mainY + 2 },
  { code: 'KeyK', label: 'K', x: 8.75, y: mainY + 2 },
  { code: 'KeyL', label: 'L', x: 9.75, y: mainY + 2 },
  { code: 'Semicolon', label: ';', label2: ':', x: 10.75, y: mainY + 2 },
  { code: 'Quote', label: "'", label2: '"', x: 11.75, y: mainY + 2 },
  { code: 'Enter', label: 'return', x: 12.75, y: mainY + 2, w: 2.25, isModifier: true, legendPosition: 'bottom-left' },
];

const bottomRow: KeyDef[] = [
  { code: 'ShiftLeft', label: 'shift', x: 0, y: mainY + 3, w: 2.25, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'KeyZ', label: 'Z', x: 2.25, y: mainY + 3 },
  { code: 'KeyX', label: 'X', x: 3.25, y: mainY + 3 },
  { code: 'KeyC', label: 'C', x: 4.25, y: mainY + 3 },
  { code: 'KeyV', label: 'V', x: 5.25, y: mainY + 3 },
  { code: 'KeyB', label: 'B', x: 6.25, y: mainY + 3 },
  { code: 'KeyN', label: 'N', x: 7.25, y: mainY + 3 },
  { code: 'KeyM', label: 'M', x: 8.25, y: mainY + 3 },
  { code: 'Comma', label: ',', label2: '<', x: 9.25, y: mainY + 3 },
  { code: 'Period', label: '.', label2: '>', x: 10.25, y: mainY + 3 },
  { code: 'Slash', label: '/', label2: '?', x: 11.25, y: mainY + 3 },
  { code: 'ShiftRight', label: 'shift', x: 12.25, y: mainY + 3, w: 2.75, isModifier: true, legendPosition: 'bottom-left' },
];

const spaceRow: KeyDef[] = [
  { code: 'Globe', label: '', icon: 'globe', x: 0, y: mainY + 4, isModifier: true },
  { code: 'ControlLeft', label: 'control', x: 1, y: mainY + 4, w: 1, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'AltLeft', label: 'option', x: 2, y: mainY + 4, w: 1, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'MetaLeft', label: 'command', x: 3, y: mainY + 4, w: 1.25, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'Space', label: '', x: 4.25, y: mainY + 4, w: 5.5 },
  { code: 'MetaRight', label: 'command', x: 9.75, y: mainY + 4, w: 1.25, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'AltRight', label: 'option', x: 11, y: mainY + 4, w: 1, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'ArrowLeft', label: '◂', x: 12, y: mainY + 4, w: 1, isModifier: true },
  { code: 'ArrowUp', label: '▴', x: 13, y: mainY + 4, w: 1, h: 0.5, isModifier: true },
  { code: 'ArrowDown', label: '▾', x: 13, y: mainY + 4.5, w: 1, h: 0.5, isModifier: true },
  { code: 'ArrowRight', label: '▸', x: 14, y: mainY + 4, w: 1, isModifier: true },
];

export const layout: KeyboardLayout = {
  id: 'apple-magic-full',
  name: 'Apple Magic Keyboard',
  type: 'apple-magic-full',
  width: 15,
  height: mainY + 5,
  keys: [...fnRow, ...numberRow, ...topRow, ...homeRow, ...bottomRow, ...spaceRow],
};

export const caseStyle: CaseStyle = {
  frameColor: '#d1d1d5',
  frameGradient: ['#b9b9bd', '#d3d3d7', '#ececef'],
  cornerRadius: 22,
  padTop: 10,
  padBottom: 12,
  padX: 10,
  frameMaterial: 'aluminum-anodized',
  hasPlate: false,
  deepShadow: true,
  gapRatio: 0.05,
};

export const rgb: RGBConfig = { enabled: false, mode: 'static' };

export const sound: SoundSignature = {
  base: 'linear',
  damped: true,
  pitch: 1.3,
  body: 0.3,
  click: 0,
  noise: 0.2,
  decay: 0.5,
  url: 'https://raw.githubusercontent.com/orhun/daktilo/main/sounds/cherryMxRed/3.wav',
};

const fontStack = `'SF Pro Display', -apple-system, BlinkMacSystemFont, system-ui, sans-serif`;
const capsLockKeyLed = new Set(['CapsLock']);

const MagicKeyboardComponent: React.FC<ModelProps> = ({
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
  rgbOverride,
}) => (
  <AppleCanvas
    layout={layout}
    caseStyle={caseStyle}
    rgb={{ ...rgb, ...rgbOverride }}
    keycapColor="#f4f4f6"
    modifierColor="#f4f4f6"
    accentColor="#007AFF"
    legendColor="#8a8a8f"
    fontStack={fontStack}
    pressedKeys={pressedKeys}
    lockKeys={lockKeys}
    lockLightKeys={capsLockKeyLed}
    onKeyDown={onKeyDown}
    onKeyUp={onKeyUp}
    onLockKeyToggle={onLockKeyToggle}
    maxWidth={maxWidth}
    unitSizeCap={46}
  />
);

export const magicKeyboard: ModelDef = {
  id: 'apple-magic-keyboard',
  brand: 'Apple',
  model: 'Magic Keyboard',
  layout,
  profile: 'chiclet',
  caseStyle,
  rgb,
  sound,
  keycapColor: '#fafafb',
  accentColor: '#007AFF',
  legendColor: '#6f6f75',
  fontStack,
  Component: MagicKeyboardComponent,
};
