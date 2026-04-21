'use client';

import React from 'react';
import { CaseStyle } from './types';
import { adjustColor } from './color';

interface BaseShellProps {
  width: number;
  height: number;
  caseStyle: CaseStyle;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
}

// Frame technique inspired by jkantner's CodePen — horizontal linear
// gradient (left→right light shift) + top-left ambient shadow + thin
// inset ring for the aluminum edge.
const BaseShellComponent: React.FC<BaseShellProps> = ({
  width,
  height,
  caseStyle,
  children,
  headerContent,
  footerContent,
}) => {
  const { frameColor, cornerRadius, padTop, padBottom, padX, frameMaterial, hasPlate } = caseStyle;
  const [gLeft, , gRight] = caseStyle.frameGradient ?? [
    adjustColor(frameColor, -10),
    frameColor,
    adjustColor(frameColor, 10),
  ];

  const materialOverlay =
    frameMaterial === 'aluminum-brushed'
      ? `repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)`
      : frameMaterial === 'aluminum-anodized'
      ? `radial-gradient(circle at 30% 20%, rgba(255,255,255,0.05) 0%, transparent 40%)`
      : frameMaterial === 'plastic-gloss'
      ? `linear-gradient(160deg, rgba(255,255,255,0.1) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.1) 100%)`
      : 'none';

  // Outer shadow — high-fidelity hardware shadow from the requested Codepen
  const outerShadow = `
    0 5px 0 0 ${adjustColor(frameColor, -15)},
    0 8px 18px 4px rgba(0,0,0,0.62)
  `;

  const plateColor = caseStyle.plateColor ?? adjustColor(frameColor, -40, -10);

  return (
    <div
      className="relative mx-auto"
      style={{
        width: width + padX * 2,
        height: height + padTop + padBottom,
        borderRadius: cornerRadius,
        padding: `${padTop}px ${padX}px ${padBottom}px ${padX}px`,
        background: `${materialOverlay}, linear-gradient(90deg, ${gLeft} 0%, ${gRight} 100%)`,
        boxShadow: outerShadow,
      }}
    >
      {headerContent}

      {hasPlate ? (
        <div
          className="relative"
          style={{
            width,
            height,
            borderRadius: Math.max(4, cornerRadius - 8),
            backgroundColor: plateColor,
            boxShadow: caseStyle.plateInsetShadow
              ? `inset 0 4px 10px rgba(0,0,0,0.75), inset 0 1px 3px rgba(0,0,0,0.9)`
              : 'none',
            overflow: 'hidden',
            borderTop: `1px solid ${adjustColor(plateColor, -10)}`,
            borderBottom: `1px solid ${adjustColor(plateColor, 10)}`,
          }}
        >
          {children}
        </div>
      ) : (
        <div className="relative" style={{ width, height }}>
          {children}
        </div>
      )}

      {footerContent}
    </div>
  );
};

export const BaseShell = React.memo(BaseShellComponent);
