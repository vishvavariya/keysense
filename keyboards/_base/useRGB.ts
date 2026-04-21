'use client';

import { useEffect, useRef, useState } from 'react';
import { RGBConfig } from './types';
import { KeyDef } from '@/lib/types';

// Stream per-key RGB colors at 20fps for wave/breathe modes. Reactive mode
// is driven externally via pressedKeys; that path is already reactive.
export function useRGB(rgb: RGBConfig) {
  const [tick, setTick] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    if (!rgb.enabled) return;
    if (rgb.mode === 'static' || rgb.mode === 'reactive') return;
    startRef.current = performance.now();
    const loop = (t: number) => {
      setTick(Math.floor((t - startRef.current) / 50));
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rgb.enabled, rgb.mode]);

  const colorFor = (k: KeyDef): string | undefined => {
    if (!rgb.enabled) return undefined;
    if (rgb.mode === 'static') return rgb.color;
    const palette = rgb.palette && rgb.palette.length > 0 ? rgb.palette : [rgb.color ?? '#7c3aed'];
    if (rgb.mode === 'wave') {
      const phase = (k.x * 0.3 + k.y * 0.15 + tick * 0.04) % palette.length;
      const i = Math.floor(phase);
      const next = (i + 1) % palette.length;
      const mix = phase - i;
      return mixHex(palette[i], palette[next], mix);
    }
    if (rgb.mode === 'breathe') {
      const phase = (Math.sin(tick * 0.05) + 1) / 2;
      return mixHex(palette[0], palette[palette.length - 1], phase);
    }
    return rgb.color;
  };

  return { colorFor };
}

function mixHex(a: string | undefined, b: string | undefined, t: number): string {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `#${[r, g, bl].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

function hexToRgb(hex: string | undefined): [number, number, number] {
  if (!hex) hex = '#888888';
  let h = hex.replace(/^#/, '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
