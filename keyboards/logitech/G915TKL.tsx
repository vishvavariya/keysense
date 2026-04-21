'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { KeyDef, KeyboardLayout, SwitchSound } from '@/lib/types';
import { CaseStyle, RGBConfig, SoundSignature, ModelDef, ModelProps } from '../_base/types';

const G915TKL3DStage = dynamic(
  () => import('./G915TKL3D').then((mod) => mod.G915TKL3DStage),
  { ssr: false }
);

const c = {
  shellA: '#686f79',
  shellB: '#474f58',
  shellC: '#2c323a',
  key: '#161b21',
  keyMod: '#1b2026',
  white: '#eef2f7',
  dim: '#949ba7',
  cyan: '#4ad2ff',
  green: '#7dff7b',
  amber: '#ffd44f',
  orange: '#ff9d54',
  magenta: '#ff64dc',
  violet: '#9585ff',
};

const controlRow: KeyDef[] = [
  { code: 'Wireless', label: '', icon: 'lightspeed', x: 1.84, y: 0.18, w: 0.76, h: 0.76, shape: 'circle', variant: 'media', isModifier: true, legendColor: c.white },
  { code: 'Bluetooth', label: '', icon: 'bluetooth', x: 2.7, y: 0.18, w: 0.76, h: 0.76, shape: 'circle', variant: 'media', isModifier: true, legendColor: c.white },
  { code: 'GameMode', label: '', icon: 'game-mode', x: 3.56, y: 0.18, w: 0.76, h: 0.76, shape: 'circle', variant: 'media', isModifier: true, legendColor: c.white },
  { code: 'Brightness', label: '', icon: 'brightness', x: 4.42, y: 0.18, w: 0.76, h: 0.76, shape: 'circle', variant: 'media', isModifier: true, legendColor: c.green },
];

const mediaRow: KeyDef[] = [
  { code: 'MediaTrackPrevious', label: '', icon: 'prev-track', x: 10.72, y: 0.18, w: 0.76, h: 0.76, shape: 'circle', variant: 'media', isModifier: true, legendColor: '#c0aeff' },
  { code: 'MediaPlayPause', label: '', icon: 'play-pause', x: 11.58, y: 0.18, w: 0.76, h: 0.76, shape: 'circle', variant: 'media', isModifier: true, legendColor: '#c0aeff' },
  { code: 'MediaTrackNext', label: '', icon: 'next-track', x: 12.44, y: 0.18, w: 0.76, h: 0.76, shape: 'circle', variant: 'media', isModifier: true, legendColor: '#c0aeff' },
  { code: 'VolumeMute', label: '', icon: 'mute', x: 13.3, y: 0.18, w: 0.76, h: 0.76, shape: 'circle', variant: 'media', isModifier: true, legendColor: '#c0aeff' },
];

const numberY = 2.3;
const topY = 3.42;
const homeY = 4.54;
const bottomY = 5.66;
const modY = 6.95;

const fnRow: KeyDef[] = [
  { code: 'Escape', label: 'Esc', x: 0, y: 1, isModifier: true, legendPosition: 'center', legendColor: c.cyan },
  { code: 'F1', label: 'F1', x: 2, y: 1, isModifier: true, legendColor: c.green },
  { code: 'F2', label: 'F2', x: 3, y: 1, isModifier: true, legendColor: c.green },
  { code: 'F3', label: 'F3', x: 4, y: 1, isModifier: true, legendColor: '#c4f060' },
  { code: 'F4', label: 'F4', x: 5, y: 1, isModifier: true, legendColor: '#e8e35a' },
  { code: 'F5', label: 'F5', x: 6.5, y: 1, isModifier: true, legendColor: c.amber },
  { code: 'F6', label: 'F6', x: 7.5, y: 1, isModifier: true, legendColor: c.orange },
  { code: 'F7', label: 'F7', x: 8.5, y: 1, isModifier: true, legendColor: c.orange },
  { code: 'F8', label: 'F8', x: 9.5, y: 1, isModifier: true, legendColor: '#ff6d8f' },
  { code: 'F9', label: 'F9', x: 11, y: 1, isModifier: true, legendColor: '#d48fff' },
  { code: 'F10', label: 'F10', x: 12, y: 1, isModifier: true, legendColor: '#c68dff' },
  { code: 'F11', label: 'F11', x: 13, y: 1, isModifier: true, legendColor: '#b38bff' },
  { code: 'F12', label: 'F12', x: 14, y: 1, isModifier: true, legendColor: '#a88cff' },
];

const navCluster: KeyDef[] = [
  { code: 'PrintScreen', label: 'PrtSc', x: 15.5, y: 1, isModifier: true, legendPosition: 'center', legendColor: '#a88cff' },
  { code: 'ScrollLock', label: 'ScrLk', x: 16.5, y: 1, isModifier: true, legendPosition: 'center', legendColor: '#a88cff' },
  { code: 'Pause', label: 'Pause', x: 17.5, y: 1, isModifier: true, legendPosition: 'center', legendColor: '#a88cff' },
  { code: 'Insert', label: 'Ins', x: 15.5, y: numberY, isModifier: true, legendPosition: 'center', legendColor: c.amber },
  { code: 'Home', label: 'Home', x: 16.5, y: numberY, isModifier: true, legendPosition: 'center', legendColor: c.amber },
  { code: 'PageUp', label: 'PgUp', x: 17.5, y: numberY, isModifier: true, legendPosition: 'center', legendColor: c.orange },
  { code: 'Delete', label: 'Del', x: 15.5, y: topY, isModifier: true, legendPosition: 'center', legendColor: '#ff6d8f' },
  { code: 'End', label: 'End', x: 16.5, y: topY, isModifier: true, legendPosition: 'center', legendColor: '#ff6d8f' },
  { code: 'PageDown', label: 'PgDn', x: 17.5, y: topY, isModifier: true, legendPosition: 'center', legendColor: '#ff6d8f' },
];

const numberRow: KeyDef[] = [
  { code: 'Backquote', label: '`', label2: '~', x: 0, y: numberY, legendColor: c.cyan },
  { code: 'Digit1', label: '1', label2: '!', x: 1, y: numberY, legendColor: c.cyan },
  { code: 'Digit2', label: '2', label2: '@', x: 2, y: numberY, legendColor: '#6cf0d8' },
  { code: 'Digit3', label: '3', label2: '#', x: 3, y: numberY, legendColor: '#76f39a' },
  { code: 'Digit4', label: '4', label2: '$', x: 4, y: numberY, legendColor: '#8aee62' },
  { code: 'Digit5', label: '5', label2: '%', x: 5, y: numberY, legendColor: '#b5eb58' },
  { code: 'Digit6', label: '6', label2: '^', x: 6, y: numberY, legendColor: '#dccf59' },
  { code: 'Digit7', label: '7', label2: '&', x: 7, y: numberY, legendColor: c.amber },
  { code: 'Digit8', label: '8', label2: '*', x: 8, y: numberY, legendColor: '#ffbd60' },
  { code: 'Digit9', label: '9', label2: '(', x: 9, y: numberY, legendColor: '#ff9a64' },
  { code: 'Digit0', label: '0', label2: ')', x: 10, y: numberY, legendColor: '#ff6878' },
  { code: 'Minus', label: '-', label2: '_', x: 11, y: numberY, legendColor: c.magenta },
  { code: 'Equal', label: '=', label2: '+', x: 12, y: numberY, legendColor: c.magenta },
  { code: 'Backspace', label: 'Backspace', x: 13, y: numberY, w: 2, isModifier: true, legendPosition: 'center' },
];

const topRow: KeyDef[] = [
  { code: 'Tab', label: 'Tab', x: 0, y: topY, w: 1.5, isModifier: true, legendPosition: 'center' },
  { code: 'KeyQ', label: 'Q', x: 1.5, y: topY },
  { code: 'KeyW', label: 'W', x: 2.5, y: topY },
  { code: 'KeyE', label: 'E', x: 3.5, y: topY },
  { code: 'KeyR', label: 'R', x: 4.5, y: topY },
  { code: 'KeyT', label: 'T', x: 5.5, y: topY },
  { code: 'KeyY', label: 'Y', x: 6.5, y: topY },
  { code: 'KeyU', label: 'U', x: 7.5, y: topY },
  { code: 'KeyI', label: 'I', x: 8.5, y: topY },
  { code: 'KeyO', label: 'O', x: 9.5, y: topY },
  { code: 'KeyP', label: 'P', x: 10.5, y: topY },
  { code: 'BracketLeft', label: '[', label2: '{', x: 11.5, y: topY },
  { code: 'BracketRight', label: ']', label2: '}', x: 12.5, y: topY },
  { code: 'Backslash', label: '\\', label2: '|', x: 13.5, y: topY, w: 1.5 },
];

const homeRow: KeyDef[] = [
  { code: 'CapsLock', label: 'Caps', x: 0, y: homeY, w: 1.75, isModifier: true, legendPosition: 'center' },
  { code: 'KeyA', label: 'A', x: 1.75, y: homeY },
  { code: 'KeyS', label: 'S', x: 2.75, y: homeY },
  { code: 'KeyD', label: 'D', x: 3.75, y: homeY },
  { code: 'KeyF', label: 'F', x: 4.75, y: homeY },
  { code: 'KeyG', label: 'G', x: 5.75, y: homeY },
  { code: 'KeyH', label: 'H', x: 6.75, y: homeY },
  { code: 'KeyJ', label: 'J', x: 7.75, y: homeY },
  { code: 'KeyK', label: 'K', x: 8.75, y: homeY },
  { code: 'KeyL', label: 'L', x: 9.75, y: homeY },
  { code: 'Semicolon', label: ';', label2: ':', x: 10.75, y: homeY },
  { code: 'Quote', label: "'", label2: '"', x: 11.75, y: homeY },
  { code: 'Enter', label: 'Enter', x: 12.75, y: homeY, w: 2.25, isModifier: true, legendPosition: 'center' },
];

const bottomRow: KeyDef[] = [
  { code: 'ShiftLeft', label: 'Shift', x: 0, y: bottomY, w: 2.25, isModifier: true, legendPosition: 'center' },
  { code: 'KeyZ', label: 'Z', x: 2.25, y: bottomY },
  { code: 'KeyX', label: 'X', x: 3.25, y: bottomY },
  { code: 'KeyC', label: 'C', x: 4.25, y: bottomY },
  { code: 'KeyV', label: 'V', x: 5.25, y: bottomY },
  { code: 'KeyB', label: 'B', x: 6.25, y: bottomY },
  { code: 'KeyN', label: 'N', x: 7.25, y: bottomY },
  { code: 'KeyM', label: 'M', x: 8.25, y: bottomY },
  { code: 'Comma', label: ',', label2: '<', x: 9.25, y: bottomY },
  { code: 'Period', label: '.', label2: '>', x: 10.25, y: bottomY },
  { code: 'Slash', label: '/', label2: '?', x: 11.25, y: bottomY },
  { code: 'ShiftRight', label: 'Shift', x: 12.25, y: bottomY, w: 2.75, isModifier: true, legendPosition: 'center' },
  { code: 'ArrowUp', label: '↑', x: 16.5, y: homeY, isModifier: true, legendPosition: 'center', legendColor: c.cyan },
];

const arrowCluster: KeyDef[] = [
  { code: 'ArrowLeft', label: '←', x: 15.5, y: bottomY, isModifier: true, legendPosition: 'center', legendColor: c.cyan },
  { code: 'ArrowDown', label: '↓', x: 16.5, y: bottomY, isModifier: true, legendPosition: 'center', legendColor: c.cyan },
  { code: 'ArrowRight', label: '→', x: 17.5, y: bottomY, isModifier: true, legendPosition: 'center', legendColor: c.cyan },
];

const spaceRow: KeyDef[] = [
  { code: 'ControlLeft', label: 'Ctrl', x: 0, y: modY, w: 1.25, isModifier: true, legendPosition: 'center' },
  { code: 'MetaLeft', label: '', icon: 'windows', x: 1.25, y: modY, w: 1.25, isModifier: true, legendPosition: 'center' },
  { code: 'AltLeft', label: 'Alt', x: 2.5, y: modY, w: 1.25, isModifier: true, legendPosition: 'center' },
  { code: 'Space', label: '', x: 4, y: modY, w: 7 },
  { code: 'AltRight', label: 'Alt', x: 11, y: modY, w: 1, isModifier: true, legendPosition: 'center' },
  { code: 'Fn', label: 'Fn', x: 12, y: modY, w: 1, isModifier: true, legendPosition: 'center' },
  { code: 'ContextMenu', label: '', icon: 'menu-lines', x: 13, y: modY, w: 1, isModifier: true, legendPosition: 'center' },
  { code: 'ControlRight', label: 'Ctrl', x: 14, y: modY, w: 1, isModifier: true, legendPosition: 'center' },
];

export const layout: KeyboardLayout = {
  id: 'logitech-g915-tkl',
  name: 'Logitech G915 TKL',
  type: 'ansi-tkl',
  width: 18.5,
  height: 8.05,
  keys: [...controlRow, ...mediaRow, ...fnRow, ...navCluster, ...numberRow, ...topRow, ...homeRow, ...bottomRow, ...arrowCluster, ...spaceRow],
};

export const caseStyle: CaseStyle = {
  frameColor: c.shellB,
  frameGradient: [c.shellA, c.shellB, c.shellC],
  cornerRadius: 6,
  padTop: 28,
  padBottom: 24,
  padX: 20,
  frameMaterial: 'aluminum-brushed',
  hasPlate: false,
  deepShadow: true,
  gapRatio: 0.05,
};

export const rgb: RGBConfig = {
  enabled: true,
  mode: 'wave',
  palette: [c.cyan, c.green, c.amber, c.orange, c.magenta, c.violet],
  intensity: 0.28,
  underglow: false,
};

export const sound: SoundSignature = {
  base: 'tactile',
  pitch: 1.32,
  body: 1.25,
  click: 0.85,
  noise: 0.58,
  decay: 1.1,
  resonance: 0.9,
  url: '/sounds/logitech-g915/gl-tactile.mp3',
};

export const soundVariants: Partial<Record<SwitchSound, SoundSignature>> = {
  tactile: sound,
  linear: {
    base: 'linear',
    pitch: 1.28,
    body: 1.1,
    click: 0.2,
    noise: 0.5,
    decay: 1.0,
    resonance: 0.85,
    url: '/sounds/logitech-g915/gl-linear.mp3',
  },
  clicky: {
    base: 'clicky',
    pitch: 1.35,
    body: 1.15,
    click: 1.25,
    noise: 0.72,
    decay: 1.1,
    resonance: 1.0,
    url: '/sounds/logitech-g915/gl-clicky.mp3',
  },
};

const fontStack = `'Inter', 'Montserrat', system-ui, sans-serif`;
const unitSizeCap = 47;

const G915TKLComponent: React.FC<ModelProps> = ({
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
}) => {
  return (
    <G915TKL3DStage
      layout={layout}
      caseStyle={caseStyle}
      colors={c}
      fontStack={fontStack}
      pressedKeys={pressedKeys}
      lockKeys={lockKeys}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onLockKeyToggle={onLockKeyToggle}
      maxWidth={maxWidth}
      unitSizeCap={unitSizeCap}
    />
  );
};

export const g915Tkl: ModelDef = {
  id: 'logitech-g915-tkl',
  brand: 'Logitech',
  model: 'G915 TKL',
  layout,
  profile: 'low-profile-gl',
  caseStyle,
  rgb,
  sound,
  soundVariants,
  keycapColor: c.key,
  modifierColor: c.keyMod,
  accentColor: c.cyan,
  legendColor: c.white,
  fontStack,
  Component: G915TKLComponent,
};
