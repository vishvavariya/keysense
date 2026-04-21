'use client';

import React from 'react';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import { CaseStyle, RGBConfig, SoundSignature, ModelDef, ModelProps } from '../_base/types';
import { Q1Pro3DStage } from './Q1Pro3D';

// Keychron Q1 Pro — black knob version.
// Matches the darker official top shot with the separated delete key,
// right-side nav column, and a cleaner top frame around the rotary knob.

const fnRow: KeyDef[] = [
  { code: 'Escape', label: 'esc', x: 0, y: 0, isAccent: true },
  { code: 'F1', label: 'F1', icon: 'brightness-down', x: 1.25, y: 0, isModifier: true },
  { code: 'F2', label: 'F2', icon: 'brightness-up', x: 2.25, y: 0, isModifier: true },
  { code: 'F3', label: 'F3', icon: 'app-switch', x: 3.25, y: 0, isModifier: true },
  { code: 'F4', label: 'F4', icon: 'launchpad', x: 4.25, y: 0, isModifier: true },
  { code: 'F5', label: 'F5', icon: 'keyboard-light-down', x: 5.5, y: 0, isModifier: true },
  { code: 'F6', label: 'F6', icon: 'keyboard-light-up', x: 6.5, y: 0, isModifier: true },
  { code: 'F7', label: 'F7', icon: 'prev-track', x: 7.5, y: 0, isModifier: true },
  { code: 'F8', label: 'F8', icon: 'play-pause', x: 8.5, y: 0, isModifier: true },
  { code: 'F9', label: 'F9', icon: 'next-track', x: 9.75, y: 0, isModifier: true },
  { code: 'F10', label: 'F10', icon: 'mute', x: 10.75, y: 0, isModifier: true },
  { code: 'F11', label: 'F11', icon: 'volume-down', x: 11.75, y: 0, isModifier: true },
  { code: 'F12', label: 'F12', icon: 'volume-up', x: 12.75, y: 0, isModifier: true },
  { code: 'Delete', label: 'del', x: 14, y: 0, isModifier: true },
];

const numberRow: KeyDef[] = [
  { code: 'Backquote', label: '`', label2: '~', x: 0, y: 1, isModifier: true },
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
  { code: 'Backspace', label: '← backspace', x: 13, y: 1, w: 2, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'PageUp', label: 'pgup', x: 15.25, y: 1, isModifier: true },
];

const topRow: KeyDef[] = [
  { code: 'Tab', label: 'tab ⇥', x: 0, y: 2, w: 1.5, isModifier: true, legendPosition: 'bottom-left' },
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
  { code: 'Backslash', label: '\\', label2: '|', x: 13.5, y: 2, w: 1.5, isModifier: true },
  { code: 'PageDown', label: 'pgdn', x: 15.25, y: 2, isModifier: true },
];

const homeRow: KeyDef[] = [
  { code: 'CapsLock', label: 'caps lock', x: 0, y: 3, w: 1.75, isModifier: true, legendPosition: 'bottom-left' },
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
  { code: 'Enter', label: '↵ enter', x: 12.75, y: 3, w: 2.25, isAccent: true, legendPosition: 'bottom-left' },
  { code: 'Home', label: 'home', x: 15.25, y: 3, isModifier: true },
];

const bottomRow: KeyDef[] = [
  { code: 'ShiftLeft', label: '⇧ shift', x: 0, y: 4, w: 2.25, isModifier: true, legendPosition: 'bottom-left' },
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
  { code: 'ShiftRight', label: '⇧ shift', x: 12.25, y: 4, w: 1.75, isModifier: true, legendPosition: 'bottom-left' },
  { code: 'ArrowUp', label: '↑', x: 14.25, y: 4, isModifier: true },
];

const spaceRow: KeyDef[] = [
  { code: 'ControlLeft', label: 'control', x: 0, y: 5, w: 1.25, isModifier: true },
  { code: 'AltLeft', label: 'option', x: 1.25, y: 5, w: 1.25, isModifier: true },
  { code: 'MetaLeft', label: '⌘', x: 2.5, y: 5, w: 1.25, isModifier: true },
  { code: 'Space', label: '', x: 3.75, y: 5, w: 6.25 },
  { code: 'MetaRight', label: '⌘', x: 10, y: 5, isModifier: true },
  { code: 'Fn', label: 'fn', x: 11, y: 5, isModifier: true },
  { code: 'ControlRight', label: 'ctrl', x: 12, y: 5, isModifier: true },
  { code: 'ArrowLeft', label: '←', x: 13.25, y: 5, isModifier: true },
  { code: 'ArrowDown', label: '↓', x: 14.25, y: 5, isModifier: true },
  { code: 'ArrowRight', label: '→', x: 15.25, y: 5, isModifier: true },
];

export const layout: KeyboardLayout = {
  id: 'keychron-q1-pro',
  name: 'Keychron Q1 Pro',
  type: 'ansi-75',
  width: 16.25,
  height: 6,
  keys: [...fnRow, ...numberRow, ...topRow, ...homeRow, ...bottomRow, ...spaceRow],
};

export const caseStyle: CaseStyle = {
  frameColor: '#4a4b50',
  frameGradient: ['#65676d', '#47494f', '#2c2d31'],
  cornerRadius: 10,
  padTop: 30,
  padBottom: 18,
  padX: 22,
  frameMaterial: 'aluminum-anodized',
  hasPlate: true,
  plateColor: '#17191d',
  plateInsetShadow: true,
  deepShadow: true,
  gapRatio: 0.042,
};

export const rgb: RGBConfig = {
  enabled: false,
  mode: 'static',
};

export const sound: SoundSignature = {
  base: 'tactile',
  pitch: 0.78,
  body: 1.45,
  click: 0.46,
  noise: 0.48,
  decay: 1.08,
  resonance: 1.34,
  url: 'https://raw.githubusercontent.com/orhun/daktilo/main/sounds/cherryMxBrown/3.wav',
};

const fontStack = `'Inter', 'Overpass Mono', system-ui, sans-serif`;

const Q1ProComponent: React.FC<ModelProps> = ({
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
}) => {
  return (
    <Q1Pro3DStage
      layout={layout}
      caseStyle={caseStyle}
      keycapColor="#4B6177"
      modifierColor="#344556"
      accentColor="#E0645F"
      legendColor="#E7EEF6"
      fontStack={fontStack}
      pressedKeys={pressedKeys}
      lockKeys={lockKeys}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onLockKeyToggle={onLockKeyToggle}
      maxWidth={maxWidth}
      unitSizeCap={56}
    />
  );
};

export const q1Pro: ModelDef = {
  id: 'keychron-q1-pro',
  brand: 'Keychron',
  model: 'Q1 Pro',
  layout,
  profile: 'osa',
  caseStyle,
  rgb,
  sound,
  keycapColor: '#4B6177',
  modifierColor: '#344556',
  accentColor: '#E0645F',
  legendColor: '#E7EEF6',
  fontStack,
  Component: Q1ProComponent,
};
