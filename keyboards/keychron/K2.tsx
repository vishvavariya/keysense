'use client';

import React from 'react';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import { CaseStyle, RGBConfig, SoundSignature, ModelDef, ModelProps } from '../_base/types';
import { K2Canvas } from './components/K2Canvas';

// Keychron K2 V2 — 75% wireless mechanical, Mac/Win hybrid.
// 84 keys with the dedicated right-side nav column and Mac-style media legends.
// F-row grouped: Esc | F1–F4 | F5–F8 | F9–F12 | del

const fnRow: KeyDef[] = [
  { code: 'Escape', label: 'Esc', x: 0, y: 0, isAccent: true },
  // Group 1: F1–F4 (0.25u gap after Esc)
  { code: 'F1', label: 'F1', icon: 'brightness-down', x: 1.25, y: 0, isModifier: true },
  { code: 'F2', label: 'F2', icon: 'brightness-up', x: 2.25, y: 0, isModifier: true },
  { code: 'F3', label: 'F3', icon: 'mission-control', x: 3.25, y: 0, isModifier: true },
  { code: 'F4', label: 'F4', icon: 'launchpad', x: 4.25, y: 0, isModifier: true },
  // Group 2: F5–F8 (0.25u gap)
  { code: 'F5', label: 'F5', icon: 'keyboard-light-down', x: 5.5, y: 0, isModifier: true },
  { code: 'F6', label: 'F6', icon: 'keyboard-light-up', x: 6.5, y: 0, isModifier: true },
  { code: 'F7', label: 'F7', icon: 'prev-track', x: 7.5, y: 0, isModifier: true },
  { code: 'F8', label: 'F8', icon: 'play-pause', x: 8.5, y: 0, isModifier: true },
  // Group 3: F9–F12 (0.25u gap)
  { code: 'F9', label: 'F9', icon: 'next-track', x: 9.75, y: 0, isModifier: true },
  { code: 'F10', label: 'F10', icon: 'mute', x: 10.75, y: 0, isModifier: true },
  { code: 'F11', label: 'F11', icon: 'volume-down', x: 11.75, y: 0, isModifier: true },
  { code: 'F12', label: 'F12', icon: 'volume-up', x: 12.75, y: 0, isModifier: true },
  // Nav column
  { code: 'Delete', label: 'del', x: 15, y: 0, isModifier: true },
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
  { code: 'Backspace', label: 'backspace', x: 13, y: 1, w: 2 , isModifier: true },
  { code: 'PageUp', label: 'pgup', x: 15, y: 1 , isModifier: true },
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
  { code: 'Backslash', label: '\\', label2: '|', x: 13.5, y: 2, w: 1.5 },
  { code: 'PageDown', label: 'pgdn', x: 15, y: 2 , isModifier: true },
];

const homeRow: KeyDef[] = [
  { code: 'CapsLock', label: 'Caps Lock', x: 0, y: 3, w: 1.75 , isModifier: true },
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
  { code: 'Enter', label: 'Enter', x: 12.75, y: 3, w: 2.25 , isModifier: true },
  { code: 'Home', label: 'home', x: 15, y: 3 , isModifier: true },
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
  { code: 'ShiftRight', label: 'Shift', x: 12.25, y: 4, w: 1.75 , isModifier: true },
  { code: 'ArrowUp', label: '↑', x: 14, y: 4 , isModifier: true },
  { code: 'End', label: 'end', x: 15, y: 4 , isModifier: true },
];

const spaceRow: KeyDef[] = [
  { code: 'ControlLeft', label: 'ctrl', x: 0, y: 5, w: 1.25 , isModifier: true },
  { code: 'AltLeft', label: 'option', x: 1.25, y: 5, w: 1.25 , isModifier: true },
  { code: 'MetaLeft', label: 'command', x: 2.5, y: 5, w: 1.25 , isModifier: true },
  { code: 'Space', label: '', x: 3.75, y: 5, w: 6.25 },
  { code: 'MetaRight', label: '⌘', x: 10, y: 5 , isModifier: true },
  { code: 'Fn', label: 'Fn', x: 11, y: 5 , isModifier: true },
  { code: 'ControlRight', label: 'ctrl', x: 12, y: 5 , isModifier: true },
  { code: 'ArrowLeft', label: '←', x: 13, y: 5 , isModifier: true },
  { code: 'ArrowDown', label: '↓', x: 14, y: 5 , isModifier: true },
  { code: 'ArrowRight', label: '→', x: 15, y: 5 , isModifier: true },
];

export const layout: KeyboardLayout = {
  id: 'keychron-k2',
  name: 'Keychron K2',
  type: 'ansi-75',
  width: 16,
  height: 6,
  keys: [...fnRow, ...numberRow, ...topRow, ...homeRow, ...bottomRow, ...spaceRow],
};

export const caseStyle: CaseStyle = {
  frameColor: '#1e2024',
  frameGradient: ['#2a2d33', '#1e2024', '#141618'],
  cornerRadius: 10,
  padTop: 18,
  padBottom: 14,
  padX: 12,
  frameMaterial: 'plastic-matte',
  hasPlate: true,
  plateColor: '#18191d',
  plateInsetShadow: true,
  deepShadow: true,
  gapRatio: 0.06,
};

export const rgb: RGBConfig = {
  enabled: true,
  mode: 'breathe',
  palette: ['#4A90D9', '#7c3aed'],
  intensity: 0.55,
  underglow: false,
};

export const sound: SoundSignature = {
  base: 'tactile',
  pitch: 0.9,
  body: 1.1,
  click: 0.55,
  noise: 0.6,
  decay: 1.0,
  resonance: 1.1,
  url: 'https://raw.githubusercontent.com/orhun/daktilo/main/sounds/cherryMxBrown/3.wav',
};

const fontStack = `'Inter', 'Overpass Mono', system-ui, sans-serif`;
const capsLockBacklight = new Set(['CapsLock']);

function KeychronHeader() {
  return (
    <div aria-hidden className="absolute top-2 left-4 opacity-50 pointer-events-none">
      <span style={{ fontFamily: fontStack, fontSize: 8, letterSpacing: 2, color: '#6b7078', fontWeight: 700 }}>
        KEYCHRON
      </span>
    </div>
  );
}

const K2Component: React.FC<ModelProps> = ({
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
  rgbOverride,
}) => (
  <K2Canvas
    layout={layout}
    caseStyle={caseStyle}
    rgb={{ ...rgb, ...rgbOverride }}
    keycapColor="#484c55"
    modifierColor="#303338"
    accentColor="#d55328"
    legendColor="#d8dade"
    fontStack={fontStack}
    pressedKeys={pressedKeys}
    lockKeys={lockKeys}
    lockBacklightKeys={capsLockBacklight}
    onKeyDown={onKeyDown}
    onKeyUp={onKeyUp}
    onLockKeyToggle={onLockKeyToggle}
    maxWidth={maxWidth}
    headerContent={<KeychronHeader />}
    unitSizeCap={50}
  />
);

export const k2: ModelDef = {
  id: 'keychron-k2',
  brand: 'Keychron',
  model: 'K2',
  layout,
  profile: 'oem-flat',
  caseStyle,
  rgb,
  sound,
  keycapColor: '#484c55',
  modifierColor: '#303338',
  accentColor: '#d55328',
  legendColor: '#d8dade',
  fontStack,
  Component: K2Component,
};
