'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardLockCode } from '@/lib/types';
import { lockKeyCodes } from '@/keyboards/_base/lockKeys';

export function useKeyPress() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [lockKeys, setLockKeys] = useState<Set<KeyboardLockCode>>(new Set());
  const pressedRef = useRef<Set<string>>(new Set());
  const lockRef = useRef<Set<KeyboardLockCode>>(new Set());
  const onKeyDownRef = useRef<((code: string) => void) | null>(null);
  const onKeyUpRef = useRef<((code: string) => void) | null>(null);

  useEffect(() => {
    const syncLockState = (e: KeyboardEvent) => {
      const next = new Set<KeyboardLockCode>();
      lockKeyCodes.forEach((code) => {
        if (e.getModifierState(code)) next.add(code);
      });
      lockRef.current = next;
      setLockKeys(new Set(next));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for most keys to avoid browser shortcuts interfering
      if (!e.metaKey && !e.ctrlKey) {
        e.preventDefault();
      }
      syncLockState(e);
      const code = e.code;
      if (!pressedRef.current.has(code)) {
        pressedRef.current = new Set(pressedRef.current).add(code);
        setPressedKeys(new Set(pressedRef.current));
        onKeyDownRef.current?.(code);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      syncLockState(e);
      const code = e.code;
      const next = new Set(pressedRef.current);
      next.delete(code);
      pressedRef.current = next;
      setPressedKeys(new Set(next));
      onKeyUpRef.current?.(code);
    };

    // Blur — release all keys
    const handleBlur = () => {
      pressedRef.current = new Set();
      setPressedKeys(new Set());
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const setOnKeyDown = useCallback((fn: (code: string) => void) => {
    onKeyDownRef.current = fn;
  }, []);

  const setOnKeyUp = useCallback((fn: (code: string) => void) => {
    onKeyUpRef.current = fn;
  }, []);

  const toggleLockKey = useCallback((code: KeyboardLockCode) => {
    const next = new Set(lockRef.current);
    if (next.has(code)) next.delete(code);
    else next.add(code);
    lockRef.current = next;
    setLockKeys(new Set(next));
  }, []);

  return { pressedKeys, lockKeys, setOnKeyDown, setOnKeyUp, toggleLockKey };
}
