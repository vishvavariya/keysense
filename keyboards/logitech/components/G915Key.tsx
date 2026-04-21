import React from 'react';
import { KeyDef } from '../../_base/types';
import { adjustColor } from '../../_base/color';

interface G915KeyProps {
  keyDef: KeyDef;
  isPressed: boolean;
  unitSize: number;
  baseColor: string;
  legendColor: string;
  fontStack: string;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

export const G915Key: React.FC<G915KeyProps> = ({
  keyDef,
  isPressed,
  unitSize,
  baseColor,
  legendColor,
  fontStack,
  onMouseDown,
  onMouseUp,
}) => {
  const { x, y, w = 1, h = 1 } = keyDef;

  // GL switches are very closely spaced
  const gapRatio = 0.04;
  const gap = unitSize * gapRatio;
  
  const width = w * unitSize;
  const height = h * unitSize;
  const capW = width - gap * 2;
  const capH = height - gap * 2;
  
  // They are fairly rectangular with slight rounded corners
  const capRadius = unitSize * 0.12; 
  
  // Top face is almost entirely flat, with a small beveled skirt
  const topInsetX = unitSize * 0.08;
  const topInsetY = unitSize * 0.08;

  // Extremely low profile
  const depth = unitSize * 0.08;
  const travel = unitSize * 0.06;

  const currentY = isPressed ? travel : 0;
  const currentDepth = Math.max(0, depth - currentY);

  const skirtColor = adjustColor(baseColor, -8);
  const skirtGradient = `linear-gradient(180deg, ${baseColor} 0%, ${skirtColor} 100%)`;

  const topFaceBase = adjustColor(baseColor, 4);

  // Very subtle lighting, essentially flat
  const dropShadow = `0 ${currentDepth}px ${currentDepth * 1.2}px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.4)`;

  // Centered, medium-weight font
  const fontSize = unitSize * 0.28;
  const fontWeight = 600;

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
        className="relative shadow-sm transition-all duration-75"
        style={{
          width: capW,
          height: capH,
          borderRadius: capRadius,
          background: skirtGradient,
          boxShadow: dropShadow,
          transform: `translateY(${currentY}px)`,
        }}
      >
        <div
          className="absolute overflow-hidden flex flex-col items-center justify-center"
          style={{
            top: topInsetY,
            bottom: topInsetY,
            left: topInsetX,
            right: topInsetX,
            borderRadius: capRadius * 0.8,
            background: `linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.01) 15%, transparent 30%, rgba(0,0,0,0.15) 100%), ${topFaceBase}`,
            boxShadow: `inset 0 1px 0px rgba(255,255,255,0.1)`,
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center"
            style={{
              fontFamily: fontStack,
              color: legendColor,
              fontWeight,
              fontSize,
              lineHeight: 1.1,
              textShadow: '0 0 4px rgba(255,255,255,0.3)', // Simulating the backlight bleed
            }}
          >
            {keyDef.label}
            {keyDef.label2 && (
              <span style={{ fontSize: fontSize * 0.7, opacity: 0.8, marginTop: 4 }}>
                {keyDef.label2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
