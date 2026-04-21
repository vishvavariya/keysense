'use client';

import React from 'react';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import { CaseStyle, RGBConfig, SoundSignature, ModelDef, ModelProps } from '../_base/types';
import { K380Canvas } from './components/K380Canvas';

// Logitech K380 (classic multi-device model).
// Matches the rounded-key layout with yellow Easy-Switch buttons,
// centered Logitech wordmark, and compact arrow cluster from the product sheets.

const fnRow: KeyDef[] = [
  { code: 'Escape', label: 'esc', x: 0, y: 0, w: 0.95, h: 0.82, isModifier: true },
  { code: 'EasySwitch1', label: '1', icon: 'easy-switch', x: 1.15, y: 0, w: 0.95, h: 0.82, isAccent: true, shape: 'circle' },
  { code: 'EasySwitch2', label: '2', icon: 'easy-switch', x: 2.15, y: 0, w: 0.95, h: 0.82, isAccent: true, shape: 'circle' },
  { code: 'EasySwitch3', label: '3', icon: 'easy-switch', x: 3.15, y: 0, w: 0.95, h: 0.82, isAccent: true, shape: 'circle' },
  { code: 'F4', label: 'F4', icon: 'home', x: 4.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'F5', label: 'F5', icon: 'app-switch', x: 5.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'F6', label: 'F6', icon: 'menu-lines', x: 6.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'F7', label: 'F7', icon: 'browser-back', x: 7.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'F8', label: 'F8', icon: 'prev-track', x: 8.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'F9', label: 'F9', icon: 'play-pause', x: 9.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'F10', label: 'F10', icon: 'next-track', x: 10.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'F11', label: 'F11', icon: 'mute', x: 11.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'F12', label: 'F12', icon: 'volume-up', x: 12.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'Insert', label: 'ins', icon: 'volume-down', x: 13.15, y: 0, w: 0.95, h: 0.82, isModifier: true, shape: 'circle' },
  { code: 'Delete', label: 'del', x: 14.2, y: 0, w: 1, h: 0.82, isModifier: true },
];

const numberRow: KeyDef[] = [
  { code: 'Backquote', label: '`', label2: '~', x: 0, y: 1.05, shape: 'circle' },
  { code: 'Digit1', label: '1', label2: '!', x: 1, y: 1.05, shape: 'circle' },
  { code: 'Digit2', label: '2', label2: '@', x: 2, y: 1.05, shape: 'circle' },
  { code: 'Digit3', label: '3', label2: '#', x: 3, y: 1.05, shape: 'circle' },
  { code: 'Digit4', label: '4', label2: '$', x: 4, y: 1.05, shape: 'circle' },
  { code: 'Digit5', label: '5', label2: '%', x: 5, y: 1.05, shape: 'circle' },
  { code: 'Digit6', label: '6', label2: '^', x: 6, y: 1.05, shape: 'circle' },
  { code: 'Digit7', label: '7', label2: '&', x: 7, y: 1.05, shape: 'circle' },
  { code: 'Digit8', label: '8', label2: '*', x: 8, y: 1.05, shape: 'circle' },
  { code: 'Digit9', label: '9', label2: '(', x: 9, y: 1.05, shape: 'circle' },
  { code: 'Digit0', label: '0', label2: ')', x: 10, y: 1.05, shape: 'circle' },
  { code: 'Minus', label: '-', label2: '_', x: 11, y: 1.05, shape: 'circle' },
  { code: 'Equal', label: '=', label2: '+', x: 12, y: 1.05, shape: 'circle' },
  { code: 'Backspace', label: 'back', x: 13, y: 1.05, w: 1.85, isModifier: true },
];

const topRow: KeyDef[] = [
  { code: 'Tab', label: 'tab', x: 0, y: 2.05, w: 1.5, isModifier: true },
  { code: 'KeyQ', label: 'Q', x: 1.5, y: 2.05, shape: 'circle' },
  { code: 'KeyW', label: 'W', x: 2.5, y: 2.05, shape: 'circle' },
  { code: 'KeyE', label: 'E', x: 3.45, y: 2.05, shape: 'circle' },
  { code: 'KeyR', label: 'R', x: 4.45, y: 2.05, shape: 'circle' },
  { code: 'KeyT', label: 'T', x: 5.45, y: 2.05, shape: 'circle' },
  { code: 'KeyY', label: 'Y', x: 6.45, y: 2.05, shape: 'circle' },
  { code: 'KeyU', label: 'U', x: 7.45, y: 2.05, shape: 'circle' },
  { code: 'KeyI', label: 'I', x: 8.45, y: 2.05, shape: 'circle' },
  { code: 'KeyO', label: 'O', x: 9.45, y: 2.05, shape: 'circle' },
  { code: 'KeyP', label: 'P', x: 10.45, y: 2.05, shape: 'circle' },
  { code: 'BracketLeft', label: '[', label2: '{', x: 11.45, y: 2.05, shape: 'circle' },
  { code: 'BracketRight', label: ']', label2: '}', x: 12.45, y: 2.05, shape: 'circle' },
  { code: 'Backslash', label: '\\', label2: '|', x: 13.45, y: 2.05, w: 1.4, shape: 'circle' },
];

const homeRow: KeyDef[] = [
  { code: 'CapsLock', label: 'caps lock', x: 0, y: 3.05, w: 1.75, isModifier: true },
  { code: 'KeyA', label: 'A', x: 1.75, y: 3.05, shape: 'circle' },
  { code: 'KeyS', label: 'S', x: 2.75, y: 3.05, shape: 'circle' },
  { code: 'KeyD', label: 'D', x: 3.75, y: 3.05, shape: 'circle' },
  { code: 'KeyF', label: 'F', x: 4.75, y: 3.05, shape: 'circle' },
  { code: 'KeyG', label: 'G', x: 5.75, y: 3.05, shape: 'circle' },
  { code: 'KeyH', label: 'H', x: 6.75, y: 3.05, shape: 'circle' },
  { code: 'KeyJ', label: 'J', x: 7.75, y: 3.05, shape: 'circle' },
  { code: 'KeyK', label: 'K', x: 8.75, y: 3.05, shape: 'circle' },
  { code: 'KeyL', label: 'L', x: 9.75, y: 3.05, shape: 'circle' },
  { code: 'Semicolon', label: ';', label2: ':', x: 10.75, y: 3.05, shape: 'circle' },
  { code: 'Quote', label: "'", label2: '"', x: 11.75, y: 3.05, shape: 'circle' },
  { code: 'Enter', label: 'enter', x: 12.75, y: 3.05, w: 2.1, isModifier: true },
];

const bottomRow: KeyDef[] = [
  { code: 'ShiftLeft', label: 'shift', x: 0, y: 4.05, w: 2.25, isModifier: true },
  { code: 'KeyZ', label: 'Z', x: 2.25, y: 4.05, shape: 'circle' },
  { code: 'KeyX', label: 'X', x: 3.25, y: 4.05, shape: 'circle' },
  { code: 'KeyC', label: 'C', x: 4.25, y: 4.05, shape: 'circle' },
  { code: 'KeyV', label: 'V', x: 5.25, y: 4.05, shape: 'circle' },
  { code: 'KeyB', label: 'B', x: 6.25, y: 4.05, shape: 'circle' },
  { code: 'KeyN', label: 'N', x: 7.25, y: 4.05, shape: 'circle' },
  { code: 'KeyM', label: 'M', x: 8.25, y: 4.05, shape: 'circle' },
  { code: 'Comma', label: ',', label2: '<', x: 9.25, y: 4.05, shape: 'circle' },
  { code: 'Period', label: '.', label2: '>', x: 10.25, y: 4.05, shape: 'circle' },
  { code: 'Slash', label: '/', label2: '?', x: 11.25, y: 4.05, shape: 'circle' },
  { code: 'ShiftRight', label: 'shift', x: 12.25, y: 4.05, w: 1.55, isModifier: true },
  { code: 'ArrowUp', label: '↑', x: 13.9, y: 4.05, w: 0.95, h: 0.95, isModifier: true },
];

const spaceRow: KeyDef[] = [
  { code: 'ControlLeft', label: 'ctrl', x: 0, y: 5.05, w: 1.1, isModifier: true },
  { code: 'Fn', label: 'fn', x: 1.1, y: 5.05, w: 1.1, isModifier: true },
  { code: 'MetaLeft', label: 'start', x: 2.2, y: 5.05, w: 1.1, isModifier: true },
  { code: 'AltLeft', label: 'alt', x: 3.3, y: 5.05, w: 1.1, isModifier: true },
  { code: 'Space', label: '', x: 4.4, y: 5.05, w: 4.9, isModifier: true },
  { code: 'AltRight', label: 'alt', x: 9.3, y: 5.05, w: 1.1, isModifier: true },
  { code: 'ControlRight', label: 'ctrl', x: 10.4, y: 5.05, w: 1.1, isModifier: true },
  { code: 'ArrowLeft', label: '←', x: 12.95, y: 5.05, w: 0.95, h: 0.95, isModifier: true },
  { code: 'ArrowDown', label: '↓', x: 13.9, y: 5.05, w: 0.95, h: 0.95, isModifier: true },
  { code: 'ArrowRight', label: '→', x: 14.85, y: 5.05, w: 0.95, h: 0.95, isModifier: true },
];

export const layout: KeyboardLayout = {
  id: 'logitech-k380',
  name: 'Logitech K380',
  type: 'logitech-k380',
  width: 16,
  height: 6.05,
  keys: [...fnRow, ...numberRow, ...topRow, ...homeRow, ...bottomRow, ...spaceRow],
};

export const caseStyle: CaseStyle = {
  frameColor: '#414851',
  frameGradient: ['#5a636e', '#414851', '#2b3036'],
  cornerRadius: 28,
  padTop: 22,
  padBottom: 20,
  padX: 18,
  frameMaterial: 'plastic-matte',
  hasPlate: false,
  deepShadow: true,
  gapRatio: 0.06,
};

export const rgb: RGBConfig = {
  enabled: false,
  mode: 'static',
};

export const sound: SoundSignature = {
  base: 'linear',
  damped: true,
  pitch: 1.08,
  body: 0.45,
  click: 0.06,
  noise: 0.18,
  decay: 0.42,
};

const fontStack = `'Quicksand', 'Inter', system-ui, sans-serif`;

function K380Header({ activeEasySwitch }: { activeEasySwitch: number | null }) {
  const indicator = (left: number, slot: number) => {
    const active = activeEasySwitch === slot;
    return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 8,
        left,
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: active ? '#f1c63e' : 'rgba(255,255,255,0.16)',
        boxShadow: active ? '0 0 6px rgba(241,198,62,0.62)' : 'inset 0 1px 1px rgba(255,255,255,0.12)',
        opacity: active ? 0.88 : 0.5,
      }}
    />
    );
  };

  return (
    <>
      <div aria-hidden className="absolute top-1 left-1/2 -translate-x-1/2 pointer-events-none opacity-72">
        <span style={{ fontFamily: fontStack, fontSize: 8, letterSpacing: 0.9, color: '#d7dce3' }}>logitech</span>
      </div>
      {indicator(53, 1)}
      {indicator(73, 2)}
      {indicator(93, 3)}
    </>
  );
}

const K380Component: React.FC<ModelProps> = ({
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
  rgbOverride,
}) => {
  const [activeEasySwitch, setActiveEasySwitch] = React.useState<number | null>(null);

  const handleKeyDown = React.useCallback(
    (code: string) => {
      const slot = code.match(/^EasySwitch([1-3])$/)?.[1];
      if (slot) setActiveEasySwitch(Number(slot));
      onKeyDown?.(code);
    },
    [onKeyDown]
  );

  return (
    <K380Canvas
      layout={layout}
      caseStyle={caseStyle}
      rgb={{ ...rgb, ...rgbOverride }}
      keycapColor="#515861"
      modifierColor="#3a4048"
      accentColor="#f1c63e"
      legendColor="#eef2f7"
      fontStack={fontStack}
      pressedKeys={pressedKeys}
      lockKeys={lockKeys}
      onKeyDown={handleKeyDown}
      onKeyUp={onKeyUp}
      onLockKeyToggle={onLockKeyToggle}
      maxWidth={maxWidth}
      headerContent={<K380Header activeEasySwitch={activeEasySwitch} />}
      unitSizeCap={46}
    />
  );
};

export const k380: ModelDef = {
  id: 'logitech-k380',
  brand: 'Logitech',
  model: 'K380',
  layout,
  profile: 'low-profile',
  caseStyle,
  rgb,
  sound,
  keycapColor: '#515861',
  modifierColor: '#3a4048',
  accentColor: '#f1c63e',
  legendColor: '#eef2f7',
  fontStack,
  Component: K380Component,
};
