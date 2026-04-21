import { KeyDef, KeyboardLayout } from '@/lib/types';

// Shared ANSI rows used by multiple keyboards. Each model file can import
// and override positions / add model-specific keys.

// Standard ANSI function row — Esc, then 1u gap, F1–F4, 0.5u gap, F5–F8, 0.5u gap, F9–F12
export const ansiFnRow: KeyDef[] = [
  { code: 'Escape', label: 'Esc', x: 0, y: 0 },
  { code: 'F1', label: 'F1', x: 2, y: 0 },
  { code: 'F2', label: 'F2', x: 3, y: 0 },
  { code: 'F3', label: 'F3', x: 4, y: 0 },
  { code: 'F4', label: 'F4', x: 5, y: 0 },
  { code: 'F5', label: 'F5', x: 6.5, y: 0 },
  { code: 'F6', label: 'F6', x: 7.5, y: 0 },
  { code: 'F7', label: 'F7', x: 8.5, y: 0 },
  { code: 'F8', label: 'F8', x: 9.5, y: 0 },
  { code: 'F9', label: 'F9', x: 11, y: 0 },
  { code: 'F10', label: 'F10', x: 12, y: 0 },
  { code: 'F11', label: 'F11', x: 13, y: 0 },
  { code: 'F12', label: 'F12', x: 14, y: 0 },
];

export const ansiNumberRow = (y: number): KeyDef[] => ([
  { code: 'Backquote', label: '`', label2: '~', x: 0, y },
  { code: 'Digit1', label: '1', label2: '!', x: 1, y },
  { code: 'Digit2', label: '2', label2: '@', x: 2, y },
  { code: 'Digit3', label: '3', label2: '#', x: 3, y },
  { code: 'Digit4', label: '4', label2: '$', x: 4, y },
  { code: 'Digit5', label: '5', label2: '%', x: 5, y },
  { code: 'Digit6', label: '6', label2: '^', x: 6, y },
  { code: 'Digit7', label: '7', label2: '&', x: 7, y },
  { code: 'Digit8', label: '8', label2: '*', x: 8, y },
  { code: 'Digit9', label: '9', label2: '(', x: 9, y },
  { code: 'Digit0', label: '0', label2: ')', x: 10, y },
  { code: 'Minus', label: '-', label2: '_', x: 11, y },
  { code: 'Equal', label: '=', label2: '+', x: 12, y },
  { code: 'Backspace', label: 'Backspace', x: 13, y, w: 2 },
]);

export const ansiTopRow = (y: number): KeyDef[] => ([
  { code: 'Tab', label: 'Tab', x: 0, y, w: 1.5 },
  { code: 'KeyQ', label: 'Q', x: 1.5, y },
  { code: 'KeyW', label: 'W', x: 2.5, y },
  { code: 'KeyE', label: 'E', x: 3.5, y },
  { code: 'KeyR', label: 'R', x: 4.5, y },
  { code: 'KeyT', label: 'T', x: 5.5, y },
  { code: 'KeyY', label: 'Y', x: 6.5, y },
  { code: 'KeyU', label: 'U', x: 7.5, y },
  { code: 'KeyI', label: 'I', x: 8.5, y },
  { code: 'KeyO', label: 'O', x: 9.5, y },
  { code: 'KeyP', label: 'P', x: 10.5, y },
  { code: 'BracketLeft', label: '[', label2: '{', x: 11.5, y },
  { code: 'BracketRight', label: ']', label2: '}', x: 12.5, y },
  { code: 'Backslash', label: '\\', label2: '|', x: 13.5, y, w: 1.5 },
]);

export const ansiHomeRow = (y: number): KeyDef[] => ([
  { code: 'CapsLock', label: 'Caps Lock', x: 0, y, w: 1.75 },
  { code: 'KeyA', label: 'A', x: 1.75, y },
  { code: 'KeyS', label: 'S', x: 2.75, y },
  { code: 'KeyD', label: 'D', x: 3.75, y },
  { code: 'KeyF', label: 'F', x: 4.75, y },
  { code: 'KeyG', label: 'G', x: 5.75, y },
  { code: 'KeyH', label: 'H', x: 6.75, y },
  { code: 'KeyJ', label: 'J', x: 7.75, y },
  { code: 'KeyK', label: 'K', x: 8.75, y },
  { code: 'KeyL', label: 'L', x: 9.75, y },
  { code: 'Semicolon', label: ';', label2: ':', x: 10.75, y },
  { code: 'Quote', label: "'", label2: '"', x: 11.75, y },
  { code: 'Enter', label: 'Enter', x: 12.75, y, w: 2.25 },
]);

export const ansiBottomRow = (y: number): KeyDef[] => ([
  { code: 'ShiftLeft', label: 'Shift', x: 0, y, w: 2.25 },
  { code: 'KeyZ', label: 'Z', x: 2.25, y },
  { code: 'KeyX', label: 'X', x: 3.25, y },
  { code: 'KeyC', label: 'C', x: 4.25, y },
  { code: 'KeyV', label: 'V', x: 5.25, y },
  { code: 'KeyB', label: 'B', x: 6.25, y },
  { code: 'KeyN', label: 'N', x: 7.25, y },
  { code: 'KeyM', label: 'M', x: 8.25, y },
  { code: 'Comma', label: ',', label2: '<', x: 9.25, y },
  { code: 'Period', label: '.', label2: '>', x: 10.25, y },
  { code: 'Slash', label: '/', label2: '?', x: 11.25, y },
  { code: 'ShiftRight', label: 'Shift', x: 12.25, y, w: 2.75 },
]);

// Standard ANSI space row (Windows-style: Ctrl/Win/Alt/Space/Alt/Win/Menu/Ctrl)
export const ansiSpaceRow = (y: number): KeyDef[] => ([
  { code: 'ControlLeft', label: 'Ctrl', x: 0, y, w: 1.25 },
  { code: 'MetaLeft', label: 'Win', x: 1.25, y, w: 1.25 },
  { code: 'AltLeft', label: 'Alt', x: 2.5, y, w: 1.25 },
  { code: 'Space', label: '', x: 3.75, y, w: 6.25 },
  { code: 'AltRight', label: 'Alt', x: 10, y, w: 1.25 },
  { code: 'MetaRight', label: 'Win', x: 11.25, y, w: 1.25 },
  { code: 'ContextMenu', label: 'Menu', x: 12.5, y, w: 1.25 },
  { code: 'ControlRight', label: 'Ctrl', x: 13.75, y, w: 1.25 },
]);

// Standard ANSI TKL nav cluster — 3×2 block (Ins/Home/PgUp above Del/End/PgDn)
export const ansiNavCluster = (xOffset: number, yStart: number): KeyDef[] => ([
  { code: 'Insert', label: 'Ins', x: xOffset, y: yStart },
  { code: 'Home', label: 'Home', x: xOffset + 1, y: yStart },
  { code: 'PageUp', label: 'PgUp', x: xOffset + 2, y: yStart },
  { code: 'Delete', label: 'Del', x: xOffset, y: yStart + 1 },
  { code: 'End', label: 'End', x: xOffset + 1, y: yStart + 1 },
  { code: 'PageDown', label: 'PgDn', x: xOffset + 2, y: yStart + 1 },
]);

// Standard ANSI arrow cluster (inverted T)
export const ansiArrowCluster = (xOffset: number, y: number): KeyDef[] => ([
  { code: 'ArrowUp', label: '↑', x: xOffset + 1, y: y },
  { code: 'ArrowLeft', label: '←', x: xOffset, y: y + 1 },
  { code: 'ArrowDown', label: '↓', x: xOffset + 1, y: y + 1 },
  { code: 'ArrowRight', label: '→', x: xOffset + 2, y: y + 1 },
]);

// Standard ANSI numpad (4×5 block)
export const ansiNumpad = (xOffset: number, yStart: number): KeyDef[] => ([
  { code: 'NumLock', label: 'Num', x: xOffset, y: yStart },
  { code: 'NumpadDivide', label: '/', x: xOffset + 1, y: yStart },
  { code: 'NumpadMultiply', label: '*', x: xOffset + 2, y: yStart },
  { code: 'NumpadSubtract', label: '−', x: xOffset + 3, y: yStart },
  { code: 'Numpad7', label: '7', x: xOffset, y: yStart + 1 },
  { code: 'Numpad8', label: '8', x: xOffset + 1, y: yStart + 1 },
  { code: 'Numpad9', label: '9', x: xOffset + 2, y: yStart + 1 },
  { code: 'NumpadAdd', label: '+', x: xOffset + 3, y: yStart + 1, h: 2 },
  { code: 'Numpad4', label: '4', x: xOffset, y: yStart + 2 },
  { code: 'Numpad5', label: '5', x: xOffset + 1, y: yStart + 2 },
  { code: 'Numpad6', label: '6', x: xOffset + 2, y: yStart + 2 },
  { code: 'Numpad1', label: '1', x: xOffset, y: yStart + 3 },
  { code: 'Numpad2', label: '2', x: xOffset + 1, y: yStart + 3 },
  { code: 'Numpad3', label: '3', x: xOffset + 2, y: yStart + 3 },
  { code: 'NumpadEnter', label: 'Enter', x: xOffset + 3, y: yStart + 3, h: 2 },
  { code: 'Numpad0', label: '0', x: xOffset, y: yStart + 4, w: 2 },
  { code: 'NumpadDecimal', label: '.', x: xOffset + 2, y: yStart + 4 },
]);

export type { KeyboardLayout };
