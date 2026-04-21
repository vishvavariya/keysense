import React from 'react';
import { KeyDef } from '../../_base/types';
import { adjustColor } from '../../_base/color';

interface Q1ProKeyProps {
  keyDef: KeyDef;
  isPressed: boolean;
  unitSize: number;
  baseColor: string;
  legendColor: string;
  fontStack: string;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

// Highly tailored component exclusively for the Keychron Q1 Pro's OSA keycaps.
export const Q1ProKey: React.FC<Q1ProKeyProps> = ({
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

  // Geometry tailored exactly to OSA profile proportions
  const gapRatio = 0.05; // 5% gap around physical key
  const gap = unitSize * gapRatio;
  
  // Outer dimensions
  const width = w * unitSize;
  const height = h * unitSize;
  
  // Physical cap dimensions (minus gap)
  const capW = width - gap * 2;
  const capH = height - gap * 2;
  
  const capRadius = unitSize * 0.16; // Slight rounding of outer skirt
  
  // Top face dimensions
  const topInsetTop = unitSize * 0.10;
  const topInsetBottom = unitSize * 0.22;
  const topInsetX = unitSize * 0.16;
  const topRadius = unitSize * 0.32; // More spherical top corners

  // Height and travel simulation
  const depth = unitSize * 0.20;
  const travel = unitSize * 0.14;

  const currentY = isPressed ? travel : 0;
  const currentDepth = Math.max(0, depth - currentY);

  // Hyper-realistic Matte PBT Colors
  // We use the baseColor but gently adjust lightness for the skirt to simulate lighting.
  const skirtFrontColor = adjustColor(baseColor, -18); // Deeper front shadow
  const skirtBackColor = adjustColor(baseColor, 15);   // Sharper back highlight
  const skirtGradient = `linear-gradient(180deg, ${skirtBackColor} 0%, ${baseColor} 25%, ${skirtFrontColor} 100%)`;

  // For the spherical top face scoop
  // Light from above: top inside wall is shadowed, bottom inside wall is highlighted.
  const topFaceBase = adjustColor(baseColor, 3);
  const scoopShadow = `radial-gradient(ellipse at 50% 20%, rgba(0,0,0,0.15) 0%, transparent 70%, rgba(255,255,255,0.05) 100%)`;

  // Drop shadow grounding the key on the plate
  const dropShadow = `0 ${currentDepth}px ${currentDepth * 1.5}px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)`;

  // Typography - top-left aligned for OSA profile
  const fontSize = unitSize * 0.23;

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
      {/* Outer physical key cap (skirt) */}
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
        {/* Top sculpted face */}
        <div
          className="absolute overflow-hidden"
          style={{
            top: topInsetTop,
            bottom: topInsetBottom,
            left: topInsetX,
            right: topInsetX,
            borderRadius: topRadius,
            background: `${scoopShadow}, ${topFaceBase}`,
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,0.15), 
              inset 0 -1px 3px rgba(0,0,0,0.35),
              0 1.5px 3px rgba(0,0,0,0.45)
            `,
          }}
        >
          {/* Legends: Centered for Keychron OSA */}
          <div
            className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center text-center"
            style={{
              fontFamily: fontStack,
              color: legendColor,
              fontWeight: 600, // Slightly bolder for realism
              fontSize: fontSize * 1.1, // Slightly larger
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
              textShadow: '0 1px 1px rgba(0,0,0,0.3)',
            }}
          >
            {keyDef.label}
            {keyDef.label2 && (
              <span style={{ fontSize: fontSize * 0.75, opacity: 0.85, marginTop: 2 }}>
                {keyDef.label2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
