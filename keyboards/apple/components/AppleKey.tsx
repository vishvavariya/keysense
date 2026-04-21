import React from 'react';
import { KeyDef } from '../../_base/types';
import { adjustColor } from '../../_base/color';
import { LockLight } from '../../_base/LockLight';

interface AppleKeyProps {
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

export const AppleKey: React.FC<AppleKeyProps> = ({
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
  const depth = unitSize * 0.05;
  const travel = unitSize * 0.03;

  const currentY = isPressed ? travel : 0;
  const currentDepth = Math.max(0, depth - currentY);

  const topFaceBase = adjustColor(baseColor, 0);

  const dropShadow = `0 ${currentDepth}px 1px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)`;

  const fontSize = unitSize * (keyDef.isModifier ? 0.22 : 0.28);
  const fontWeight = 400;

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
        {lockLight && <LockLight active={isLocked} unitSize={unitSize} color="#34c759" />}
        <div
          className="absolute inset-0 flex flex-col pointer-events-none"
          style={{
            padding: unitSize * 0.1,
            justifyContent: keyDef.legendPosition === 'bottom-left' ? 'flex-end' : 'center',
            alignItems: keyDef.legendPosition === 'bottom-left' ? 'flex-start' : 'center',
            fontFamily: fontStack,
            color: legendColor,
            fontWeight,
            fontSize,
            lineHeight: 1.1,
          }}
        >
          {keyDef.label}
          {keyDef.label2 && (
            <span style={{ fontSize: fontSize * 0.8, marginTop: 4 }}>
              {keyDef.label2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
