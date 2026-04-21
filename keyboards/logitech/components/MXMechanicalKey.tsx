import React from 'react';
import { KeyDef } from '../../_base/types';
import { adjustColor } from '../../_base/color';
import { KeyIcon } from '../../_base/KeyIcon';
import { LockLight } from '../../_base/LockLight';

interface MXMechanicalKeyProps {
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

export const MXMechanicalKey: React.FC<MXMechanicalKeyProps> = ({
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

  const gapRatio = 0.05;
  const gap = unitSize * gapRatio;

  const width = w * unitSize;
  const height = h * unitSize;
  const capW = width - gap * 2;
  const capH = height - gap * 2;

  const capRadius = unitSize * 0.12;

  const topInsetX = unitSize * 0.1;
  const topInsetY = unitSize * 0.1;

  const depth = unitSize * 0.14;
  const travel = unitSize * 0.08;

  const currentY = isPressed ? travel : 0;
  const currentDepth = Math.max(0, depth - currentY);

  const skirtFront = adjustColor(baseColor, -10);
  const skirtTop = adjustColor(baseColor, 4);
  const topFace = adjustColor(baseColor, 5);
  const topFaceDark = adjustColor(baseColor, -1);

  const dropShadow = isPressed
    ? '0 1px 2px rgba(0,0,0,0.4)'
    : `0 ${currentDepth}px 0 0 ${skirtFront},
       0 ${currentDepth + 1}px 1px 0 ${adjustColor(baseColor, -16)},
       0 ${currentDepth + 2}px 5px 0 rgba(0,0,0,0.4),
       0 ${currentDepth + 3}px 10px -2px rgba(0,0,0,0.25)`;
  const lockBacklightShadow = lockBacklight
    ? `, 0 0 ${unitSize * 0.16}px rgba(240,242,246,0.64), 0 0 ${unitSize * 0.34}px rgba(147,224,93,0.24)`
    : '';

  const hasIcon = !!keyDef.icon;
  const hasLabel = !!keyDef.label;
  const hasDualLegend = !!keyDef.label2 && !hasIcon;
  const iconOnly = hasIcon && !hasLabel;
  const iconWithLabel = hasIcon && hasLabel;

  const baseFontSize = unitSize * 0.24;
  const singleFontSize =
    w >= 2 ? unitSize * 0.18 :
    w >= 1.5 ? unitSize * 0.2 :
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
              fontWeight: 500,
              fontSize: baseFontSize * 0.7,
              lineHeight: 1,
              opacity: 0.85,
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
            fontWeight: 500,
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
          fontWeight: 500,
          fontSize: singleFontSize,
          lineHeight: 1,
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
          background: `linear-gradient(180deg, ${skirtTop} 0%, ${baseColor} 40%, ${skirtFront} 100%)`,
          boxShadow: `${dropShadow}${lockBacklightShadow}`,
          transform: `translateY(${currentY}px)`,
          border: `1px solid ${adjustColor(baseColor, -14)}`,
          borderTop: `1px solid ${adjustColor(baseColor, 6)}`,
        }}
        >
        {lockLight && <LockLight active={isLocked} unitSize={unitSize} color="#93e05d" />}
        <div
          className="absolute overflow-hidden"
          style={{
            top: topInsetY,
            bottom: topInsetY,
            left: topInsetX,
            right: topInsetX,
            borderRadius: capRadius * 0.8,
            background: `linear-gradient(180deg, ${topFace} 0%, ${topFaceDark} 100%)`,
            boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.08), inset 0 -1px 2px rgba(0,0,0,0.18)',
          }}
        >
          {renderLegend()}
        </div>
      </div>
    </div>
  );
};
