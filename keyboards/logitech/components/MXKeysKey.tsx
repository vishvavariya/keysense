import React from 'react';
import { KeyDef } from '../../_base/types';
import { adjustColor } from '../../_base/color';
import { LockLight } from '../../_base/LockLight';
import { KeyIcon } from '../../_base/KeyIcon';

interface MXKeysKeyProps {
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

export const MXKeysKey: React.FC<MXKeysKeyProps> = ({
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
  
  const capRadius = unitSize * 0.12; 
  
  // Extremely low profile
  const depth = unitSize * 0.08;
  const travel = unitSize * 0.04;

  const currentY = isPressed ? travel : 0;
  const currentDepth = Math.max(0, depth - currentY);

  const topFaceBase = adjustColor(baseColor, 0);

  // Distinctive MX Keys spherical scoop (dish)
  const dishShadow = `radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.15) 0%, transparent 60%)`;

  const dropShadow = `0 ${currentDepth}px 2px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.3)`;

  const fontSize = unitSize * 0.22;
  const fontWeight = 500;
  const hasIcon = Boolean(keyDef.icon);
  const hasLabel = Boolean(keyDef.label);
  const iconSize = Math.max(9, Math.min(capW, capH) * (hasLabel ? 0.25 : 0.42));

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
          boxShadow: dropShadow,
          transform: `translateY(${currentY}px)`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            margin: unitSize * 0.06,
            borderRadius: capRadius * 0.8,
            background: dishShadow,
            boxShadow: `inset 0 1px 2px rgba(0,0,0,0.2), inset 0 -1px 1px rgba(255,255,255,0.1)`,
          }}
        />
        {lockLight && <LockLight active={isLocked} unitSize={unitSize} color="#00b956" />}
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
              {hasLabel && (
                <span style={{ fontSize: fontSize * 0.72, marginTop: 2 }}>
                  {keyDef.label}
                </span>
              )}
            </>
          ) : (
            <>
              {keyDef.label}
              {keyDef.label2 && (
                <span style={{ fontSize: fontSize * 0.8, marginTop: 4 }}>
                  {keyDef.label2}
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
