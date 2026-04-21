import React from 'react';
import { KeyDef } from '../../_base/types';
import { adjustColor } from '../../_base/color';
import { KeyIcon } from '../../_base/KeyIcon';
import { LockLight } from '../../_base/LockLight';

interface K2KeyProps {
  keyDef: KeyDef;
  isPressed: boolean;
  unitSize: number;
  baseColor: string;
  legendColor: string;
  fontStack: string;
  lockLight?: boolean;
  isLocked?: boolean;
  lockBacklight?: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
}

export const K2Key: React.FC<K2KeyProps> = ({
  keyDef,
  isPressed,
  unitSize,
  baseColor,
  legendColor,
  fontStack,
  lockLight = false,
  isLocked = false,
  lockBacklight = false,
  onMouseDown,
  onMouseUp,
}) => {
  const { x, y, w = 1, h = 1 } = keyDef;

  const gapRatio = 0.06;
  const gap = unitSize * gapRatio;

  const width = w * unitSize;
  const height = h * unitSize;
  const capW = width - gap * 2;
  const capH = height - gap * 2;

  const capRadius = unitSize * 0.12;

  const topInsetTop = unitSize * 0.09;
  const topInsetBottom = unitSize * 0.18;
  const topInsetX = unitSize * 0.12;
  const topRadius = unitSize * 0.08;

  const depth = unitSize * 0.22;
  const travel = unitSize * 0.14;

  const currentY = isPressed ? travel : 0;
  const currentDepth = Math.max(0, depth - currentY);

  const skirtFrontColor = adjustColor(baseColor, -14);
  const skirtSideColor = adjustColor(baseColor, -8);
  const skirtTopEdge = adjustColor(baseColor, 6);

  const topFaceBase = adjustColor(baseColor, 4);
  const topFaceDark = adjustColor(baseColor, -2);

  const dropShadow = isPressed
    ? '0 1px 2px rgba(0,0,0,0.5)'
    : `0 ${currentDepth}px 0 0 ${skirtFrontColor},
       0 ${currentDepth + 1}px 1px 0 ${adjustColor(baseColor, -20)},
       0 ${currentDepth + 2}px 6px 0 rgba(0,0,0,0.45),
       0 ${currentDepth + 4}px 12px -2px rgba(0,0,0,0.3)`;
  const lockBacklightShadow = lockBacklight
    ? `, 0 0 ${unitSize * 0.18}px rgba(213,83,40,0.68), 0 0 ${unitSize * 0.38}px rgba(213,83,40,0.26)`
    : '';

  const hasIcon = !!keyDef.icon;
  const hasLabel = !!keyDef.label;
  const hasDualLegend = !!keyDef.label2 && !hasIcon;
  const iconOnly = hasIcon && !hasLabel;
  const iconWithLabel = hasIcon && hasLabel;

  const baseFontSize = unitSize * 0.28;
  const singleFontSize =
    w >= 2 ? unitSize * 0.2 :
    w >= 1.5 ? unitSize * 0.22 :
    baseFontSize;

  const iconSize = Math.max(10, unitSize * 0.32);
  const smallIconSize = Math.max(8, unitSize * 0.22);

  const renderLegend = () => {
    if (iconOnly) {
      return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <KeyIcon icon={keyDef.icon!} color={legendColor} size={iconSize} />
        </div>
      );
    }

    if (iconWithLabel) {
      return (
        <div
          className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center"
          style={{ gap: unitSize * 0.01 }}
        >
          <KeyIcon icon={keyDef.icon!} color={legendColor} size={smallIconSize} />
          <span
            style={{
              fontFamily: fontStack,
              color: legendColor,
              fontWeight: 400,
              fontSize: baseFontSize * 0.65,
              lineHeight: 1,
              opacity: 0.8,
            }}
          >
            {keyDef.label}
          </span>
        </div>
      );
    }

    if (hasDualLegend) {
      return (
        <div
          className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center"
          style={{
            fontFamily: fontStack,
            color: legendColor,
            fontWeight: 400,
            gap: unitSize * 0.02,
          }}
        >
          <span style={{ fontSize: baseFontSize * 0.72, lineHeight: 1, opacity: 0.78 }}>
            {keyDef.label2}
          </span>
          <span style={{ fontSize: baseFontSize * 0.82, lineHeight: 1 }}>
            {keyDef.label}
          </span>
        </div>
      );
    }

    return (
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{
          fontFamily: fontStack,
          color: legendColor,
          fontWeight: 400,
          fontSize: singleFontSize,
          lineHeight: 1,
          letterSpacing: w >= 1.5 ? '0.02em' : '-0.01em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          padding: `0 ${unitSize * 0.04}px`,
        }}
      >
        {keyDef.label}
      </div>
    );
  };

  return (
    <div
      className="absolute select-none cursor-pointer"
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
        className="transition-transform duration-75"
        style={{
          position: 'absolute',
          left: gap,
          top: gap,
          width: capW,
          height: capH,
          borderRadius: capRadius,
          background: `linear-gradient(180deg, ${skirtTopEdge} 0%, ${baseColor} 30%, ${skirtSideColor} 70%, ${skirtFrontColor} 100%)`,
          boxShadow: `${dropShadow}${lockBacklightShadow}`,
          transform: `translateY(${currentY}px)`,
          border: `1px solid ${adjustColor(baseColor, -18)}`,
          borderTop: `1px solid ${adjustColor(baseColor, 8)}`,
        }}
        >
        {lockLight && <LockLight active={isLocked} unitSize={unitSize} color="#d55328" />}
        <div
          className="absolute overflow-hidden"
          style={{
            top: topInsetTop,
            bottom: topInsetBottom,
            left: topInsetX,
            right: topInsetX,
            borderRadius: topRadius,
            background: `linear-gradient(180deg, ${topFaceBase} 0%, ${topFaceDark} 100%)`,
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.07), inset 0 -1px 3px rgba(0,0,0,0.25)',
          }}
        >
          {renderLegend()}
        </div>
      </div>
    </div>
  );
};
