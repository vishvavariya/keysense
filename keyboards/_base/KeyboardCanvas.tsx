'use client';

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { BaseKey } from './BaseKey';
import { BaseShell } from './BaseShell';
import { useRGB } from './useRGB';
import { KeyboardLayout } from '@/lib/types';
import { CaseStyle, KeycapProfile, RGBConfig } from './types';
import { withAlpha } from './color';
import { getLockCodeForKey, isLockKeyActive } from './lockKeys';
import type { KeyboardLockCode } from '@/lib/types';

interface KeyboardCanvasProps {
  layout: KeyboardLayout;
  profile: KeycapProfile;
  caseStyle: CaseStyle;
  rgb: RGBConfig;
  keycapColor: string;
  modifierColor?: string;
  accentColor: string;
  legendColor: string;
  modifierLegendColor?: string;
  fontStack: string;
  pressedKeys: Set<string>;
  lockKeys?: Set<KeyboardLockCode>;
  lockLightKeys?: Set<string>;
  onKeyDown?: (code: string) => void;
  onKeyUp?: (code: string) => void;
  onLockKeyToggle?: (code: KeyboardLockCode) => void;
  maxWidth?: number;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  unitSizeCap?: number;
}

export const KeyboardCanvas: React.FC<KeyboardCanvasProps> = ({
  layout,
  profile,
  caseStyle,
  rgb,
  keycapColor,
  modifierColor,
  accentColor,
  legendColor,
  modifierLegendColor,
  fontStack,
  pressedKeys,
  lockKeys,
  lockLightKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth = 900,
  headerContent,
  footerContent,
  unitSizeCap = 54,
}) => {
  // Track mouse-clicked keys locally so they animate even when no physical keyboard event fires
  const [mousePressed, setMousePressed] = useState<Set<string>>(new Set());
  const mousePressedRef = useRef<Set<string>>(new Set());

  const unitSize = useMemo(() => {
    const available = maxWidth - caseStyle.padX * 2;
    return Math.max(4, Math.min(unitSizeCap, available / layout.width));
  }, [maxWidth, layout.width, caseStyle.padX, unitSizeCap]);

  const totalWidth = layout.width * unitSize;
  const totalHeight = layout.height * unitSize;

  const { colorFor } = useRGB(rgb);

  const handleMouseDown = useCallback(
    (code: string) => {
      if (!mousePressedRef.current.has(code)) {
        const next = new Set(mousePressedRef.current);
        next.add(code);
        mousePressedRef.current = next;
        setMousePressed(new Set(next));
        const lockCode = getLockCodeForKey(code);
        if (lockCode) onLockKeyToggle?.(lockCode);
        onKeyDown?.(code);
      }
    },
    [onKeyDown, onLockKeyToggle]
  );

  const handleMouseUp = useCallback(
    (code: string) => {
      const next = new Set(mousePressedRef.current);
      next.delete(code);
      mousePressedRef.current = next;
      setMousePressed(new Set(next));
      onKeyUp?.(code);
    },
    [onKeyUp]
  );

  // Global mouseup to prevent keys getting stuck
  React.useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (mousePressedRef.current.size > 0) {
        mousePressedRef.current.forEach(code => onKeyUp?.(code));
        mousePressedRef.current = new Set();
        setMousePressed(new Set());
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [onKeyUp]);

  const reactiveColor = rgb.enabled && rgb.mode === 'reactive' ? (rgb.color ?? accentColor) : null;

  const underglow = rgb.enabled && rgb.underglow && (
    <div
      aria-hidden
      className="absolute pointer-events-none"
      style={{
        left: caseStyle.padX * 0.5,
        right: caseStyle.padX * 0.5,
        bottom: -6,
        height: 12,
        borderRadius: 10,
        background: `radial-gradient(ellipse at center, ${withAlpha(rgb.color ?? accentColor, 0.7)} 0%, transparent 70%)`,
        filter: 'blur(6px)',
        opacity: rgb.intensity ?? 0.8,
      }}
    />
  );

  return (
    <div className="flex justify-center relative" style={{ maxWidth: maxWidth + caseStyle.padX * 2 }}>
      <div className="relative">
        <BaseShell
          width={totalWidth}
          height={totalHeight}
          caseStyle={caseStyle}
          headerContent={headerContent}
          footerContent={footerContent}
        >
          <div className="relative w-full h-full">
            {layout.keys.map((keyDef) => {
              // Merge physical keyboard events + mouse click events
              const pressed = pressedKeys.has(keyDef.code) || mousePressed.has(keyDef.code);
              const lockLight = lockLightKeys?.has(keyDef.code) ?? false;
              const locked = isLockKeyActive(keyDef, lockKeys);
              let keyRgbColor: string | undefined;
              if (rgb.enabled) {
                if (reactiveColor) {
                  keyRgbColor = pressed ? reactiveColor : undefined;
                } else {
                  keyRgbColor = colorFor(keyDef);
                }
              }
              return (
                <BaseKey
                  key={keyDef.code}
                  keyDef={keyDef}
                  isPressed={pressed}
                  unitSize={unitSize}
                  profile={profile}
                  keycapColor={keycapColor}
                  modifierColor={modifierColor}
                  legendColor={legendColor}
                  modifierLegendColor={modifierLegendColor}
                  accentColor={accentColor}
                  fontStack={fontStack}
                  rgb={rgb}
                  rgbColorForKey={keyRgbColor}
                  gapRatio={caseStyle.gapRatio}
                  lockLight={lockLight}
                  isLocked={locked}
                  onMouseDown={() => handleMouseDown(keyDef.code)}
                  onMouseUp={() => handleMouseUp(keyDef.code)}
                />
              );
            })}
          </div>
        </BaseShell>
        {underglow}
      </div>
    </div>
  );
};
