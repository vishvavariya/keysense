import React from 'react';
import { KeyDef } from '../../_base/types';
import { adjustColor } from '../../_base/color';
import { KeyIcon } from '../../_base/KeyIcon';
import { LockLight } from '../../_base/LockLight';

interface K380KeyProps {
  keyDef: KeyDef;
  isPressed: boolean;
  unitSize: number;
  baseColor: string;
  legendColor: string;
  fontStack: string;
  lockLight?: boolean;
  isLocked?: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

export const K380Key: React.FC<K380KeyProps> = ({
  keyDef,
  isPressed,
  unitSize,
  baseColor,
  legendColor,
  fontStack,
  lockLight = false,
  isLocked = false,
  onMouseDown,
  onMouseUp,
}) => {
  const { x, y, w = 1, h = 1 } = keyDef;

  const gapRatio = 0.05;
  const gap = unitSize * gapRatio;
  
  const width = w * unitSize;
  const height = h * unitSize;
  const capW = width - gap * 2;
  const capH = height - gap * 2;
  
  // K380 keys are fully circular (or pill-shaped for wider keys)
  const isCircular = w <= 1.25 && h <= 1.25;
  const capRadius = isCircular ? Math.min(capW, capH) / 2 : unitSize * 0.25; 
  
  const depth = unitSize * 0.06;
  const travel = unitSize * 0.04;

  const currentY = isPressed ? travel : 0;
  const currentDepth = Math.max(0, depth - currentY);

  const topFaceBase = adjustColor(baseColor, 0);

  // Slight inner convex shading
  const innerShadow = `inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.1)`;
  const dropShadow = `0 ${currentDepth}px 2px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)`;

  const fontSize = unitSize * 0.22;
  const fontWeight = 500;
  const iconSize = Math.max(9, Math.min(capW, capH) * (keyDef.label ? 0.28 : 0.42));
  const hasIcon = Boolean(keyDef.icon);

  return (
    <div
      className="absolute flex items-center justify-center select-none"
      style={{
        left: x * unitSize,
        top: y * unitSize,
        width,
        height,
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={(e) => { e.preventDefault(); onMouseDown(); }}
      onTouchEnd={(e) => { e.preventDefault(); onMouseUp(); }}
    >
      <div
        className="relative shadow-sm transition-all duration-[50ms]"
        style={{
          width: capW,
          height: capH,
          borderRadius: capRadius,
          background: topFaceBase,
          boxShadow: `${dropShadow}, ${innerShadow}`,
          transform: `translateY(${currentY}px)`,
        }}
      >
        {lockLight && <LockLight active={isLocked} unitSize={unitSize} color="#f1c63e" />}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center"
          style={{
            fontFamily: fontStack,
            color: legendColor,
            fontWeight,
            fontSize,
            lineHeight: 1.1,
          }}
        >
          {hasIcon ? (
            <>
              <KeyIcon icon={keyDef.icon!} color={legendColor} size={iconSize} />
              {keyDef.label && (
                <span style={{ fontSize: fontSize * 0.72, marginTop: 2 }}>
                  {keyDef.label}
                </span>
              )}
            </>
          ) : (
            <>
              {keyDef.label2 && (
                <span style={{ fontSize: fontSize * 0.75, marginBottom: 2, opacity: 0.78 }}>
                  {keyDef.label2}
                </span>
              )}
              {keyDef.label}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
