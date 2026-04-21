import React, { useCallback, useMemo, useRef, useState } from 'react';
import { KeyboardLayout, KeyDef, KeyboardLockCode } from '@/lib/types';
import { CaseStyle, RGBConfig } from '../../_base/types';
import { BaseShell } from '../../_base/BaseShell';
import { K380Key } from './K380Key';
import { getLockCodeForKey, isLockKeyActive } from '../../_base/lockKeys';

interface K380CanvasProps {
  layout: KeyboardLayout;
  caseStyle: CaseStyle;
  rgb: RGBConfig;
  keycapColor: string;
  modifierColor: string;
  accentColor: string;
  legendColor: string;
  fontStack: string;
  pressedKeys: Set<string>;
  lockKeys?: Set<KeyboardLockCode>;
  lockLightKeys?: Set<string>;
  onKeyDown?: (code: string) => void;
  onKeyUp?: (code: string) => void;
  onLockKeyToggle?: (code: KeyboardLockCode) => void;
  maxWidth?: number;
  headerContent?: React.ReactNode;
  unitSizeCap?: number;
}

export const K380Canvas: React.FC<K380CanvasProps> = ({
  layout,
  caseStyle,
  keycapColor,
  modifierColor,
  accentColor,
  legendColor,
  fontStack,
  pressedKeys,
  lockKeys,
  lockLightKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth = 900,
  headerContent,
  unitSizeCap = 54,
}) => {
  const [mousePressed, setMousePressed] = useState<Set<string>>(new Set());
  const mousePressedRef = useRef<Set<string>>(new Set());

  const unitSize = useMemo(() => {
    const available = maxWidth - caseStyle.padX * 2;
    return Math.max(4, Math.min(unitSizeCap, available / layout.width));
  }, [maxWidth, layout.width, caseStyle.padX, unitSizeCap]);

  const totalWidth = layout.width * unitSize;
  const totalHeight = layout.height * unitSize;

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

  const getKeyColor = (keyDef: KeyDef) => {
    if (keyDef.isAccent) return accentColor;
    if (keyDef.isModifier) return modifierColor;
    return keycapColor;
  };

  return (
    <div className="flex justify-center relative" style={{ maxWidth: maxWidth + caseStyle.padX * 2 }}>
      <BaseShell
        width={totalWidth}
        height={totalHeight}
        caseStyle={caseStyle}
        headerContent={headerContent}
      >
        <div className="relative w-full h-full">
          {layout.keys.map((keyDef) => {
            const pressed = pressedKeys.has(keyDef.code) || mousePressed.has(keyDef.code);
            const lockLight = lockLightKeys?.has(keyDef.code) ?? false;
            const locked = isLockKeyActive(keyDef, lockKeys);
            return (
              <K380Key
                key={keyDef.code}
                keyDef={keyDef}
                isPressed={pressed}
                unitSize={unitSize}
                baseColor={getKeyColor(keyDef)}
                legendColor={legendColor}
                fontStack={fontStack}
                lockLight={lockLight}
                isLocked={locked}
                onMouseDown={() => handleMouseDown(keyDef.code)}
                onMouseUp={() => handleMouseUp(keyDef.code)}
              />
            );
          })}
        </div>
      </BaseShell>
    </div>
  );
};
