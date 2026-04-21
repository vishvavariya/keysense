'use client';

import React, { useEffect, useRef } from 'react';
import { KeyDef } from '@/lib/types';
import { KeycapProfile, RGBConfig } from './types';
import { profiles } from './profiles';
import { adjustColor, withAlpha } from './color';
import { KeyIcon } from './KeyIcon';
import { LockLight } from './LockLight';

interface BaseKeyProps {
  keyDef: KeyDef;
  isPressed: boolean;
  unitSize: number;
  profile: KeycapProfile;
  keycapColor: string;
  modifierColor?: string;
  legendColor: string;
  modifierLegendColor?: string;
  accentColor: string;
  fontStack: string;
  rgb?: RGBConfig;
  rgbColorForKey?: string;
  gapRatio?: number;
  lockLight?: boolean;
  isLocked?: boolean;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
}

// Technique inspired by jkantner's CodePen (RJWrmE): single flat keycap color
// + multi-layer box-shadow for depth. No gradient. No separate dish element.
// Press flips the shadow direction. Cheap, fast, photo-realistic for chiclet.
//   - outer top-left ambient shadow (light source from bottom-right)
//   - thin outline ring
//   - inner bottom-right dark inset (recessed floor)
//   - inner top-left bright inset (highlight)
const BaseKeyComponent: React.FC<BaseKeyProps> = ({
  keyDef,
  isPressed,
  unitSize,
  profile,
  keycapColor,
  modifierColor,
  legendColor,
  modifierLegendColor,
  accentColor,
  fontStack,
  rgb,
  rgbColorForKey,
  gapRatio = 0.05,
  lockLight = false,
  isLocked = false,
  onMouseDown,
  onMouseUp,
}) => {
  const prevPressedRef = useRef(false);
  useEffect(() => {
    if (isPressed && !prevPressedRef.current) {
      prevPressedRef.current = true;
    } else if (!isPressed) {
      prevPressedRef.current = false;
    }
  }, [isPressed]);

  const p = profiles[profile];
  const isMediaKey = keyDef.variant === 'media';

  const baseColor = keyDef.isAccent
    ? accentColor
    : (keyDef.isModifier && modifierColor ? modifierColor : keycapColor);

  const w = (keyDef.w || 1) * unitSize;
  const h = (keyDef.h || 1) * unitSize;
  const gap = unitSize * gapRatio * (isMediaKey ? 0.72 : 1);

  const isSmall = (keyDef.w || 1) <= 1.25;
  const isLongLabel = keyDef.label.length > 3;
  let fontSize = Math.max(9, unitSize * p.fontSizeRatio * (isSmall ? 1 : 0.88));
  if (isLongLabel && p.legendPosition === 'center') fontSize *= 0.7;
  if (isMediaKey) fontSize *= 0.72;

  const hasSecondLabel = !!keyDef.label2;
  const legendPos = keyDef.legendPosition ?? p.legendPosition;
  const padLegend = legendPos === 'top-left' || legendPos === 'bottom-left'
    ? Math.max(2, unitSize * 0.12)
    : 0;

  // Scaled constants for responsive rendering
  const u = unitSize;
  const isRound = keyDef.shape === 'circle';
  const isGLProfile = profile === 'low-profile-gl' && !isMediaKey && !isRound;
  const capRadius = isRound
    ? Math.min(w, h) / 2
    : Math.max(2, unitSize * (p.capRadius * 0.9));
  const topInsetX = isRound
    ? Math.max(1, u * (isMediaKey ? 0.1 : 0.07))
    : Math.max(1, u * p.topInsetX);
  const topInsetTop = isRound
    ? Math.max(1, u * (isMediaKey ? 0.1 : 0.07))
    : Math.max(1, u * p.topInsetTop);
  const topInsetBottom = isRound
    ? Math.max(1, u * (isMediaKey ? 0.12 : 0.09))
    : Math.max(1, u * p.topInsetBottom);
  const topFaceInset = `${topInsetTop}px ${topInsetX}px ${topInsetBottom}px ${topInsetX}px`;
  const topFaceRadius = isRound
    ? Math.max(4, capRadius - u * 0.08)
    : Math.max(3, unitSize * Math.max(p.topRadius, p.capRadius * 0.62));

  // Shadow-flip logic from the requested Codepen (GRA0007 wZeJzY)
  const restShadow = `
    0 ${u * 0.02}px ${u * 0.04}px ${u * 0.02}px rgba(0,0,0,0.85),
    inset 0 ${u * 0.02}px ${u * 0.02}px 0 rgba(255,255,255,0.18)
  `;
  const pressShadow = `
    inset 0 ${u * 0.04}px ${u * 0.08}px 0 rgba(0,0,0,0.92),
    0 ${u * 0.015}px ${u * 0.015}px 0 rgba(255,255,255,0.08)
  `;

  // Media keys use the same logic but slightly more subtle
  const mediaRestShadow = restShadow;
  const mediaPressShadow = pressShadow;
  const shellGradient = isMediaKey
    ? `radial-gradient(circle at 36% 28%, ${adjustColor(baseColor, 16)} 0%, ${adjustColor(baseColor, 4)} 34%, ${adjustColor(baseColor, -14)} 68%, ${adjustColor(baseColor, -28)} 100%)`
    : isGLProfile
      ? `linear-gradient(180deg, ${adjustColor(baseColor, -6)} 0%, ${adjustColor(baseColor, -12)} 44%, ${adjustColor(baseColor, -22)} 100%)`
      : `linear-gradient(180deg, ${adjustColor(baseColor, p.skirtBackLightness, -4)} 0%, ${adjustColor(baseColor, -1, -2)} 48%, ${adjustColor(baseColor, p.skirtFrontLightness, -6)} 100%)`;
  const topFaceGradient = isMediaKey
    ? `radial-gradient(circle at 40% 32%, ${adjustColor(baseColor, 10)} 0%, ${adjustColor(baseColor, 2)} 48%, ${adjustColor(baseColor, -10)} 100%)`
    : isGLProfile
      ? `linear-gradient(180deg, ${adjustColor(baseColor, 5)} 0%, ${adjustColor(baseColor, 2)} 16%, ${adjustColor(baseColor, -1)} 72%, ${adjustColor(baseColor, -5)} 100%)`
      : `linear-gradient(180deg, ${adjustColor(baseColor, p.topLightness + 7)} 0%, ${adjustColor(baseColor, p.topLightness + 2)} 26%, ${adjustColor(baseColor, p.topLightness - 1)} 58%, ${adjustColor(baseColor, -6)} 100%)`;
  const faceShadow = isMediaKey
    ? `inset 0 1px 1px rgba(255,255,255,0.22), inset 0 -${u * 0.06}px ${u * 0.18}px rgba(0,0,0,0.38)`
    : isGLProfile
      ? `inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -${u * 0.05}px ${u * 0.12}px rgba(0,0,0,0.52), 0 ${u * 0.015}px ${u * 0.03}px rgba(0,0,0,0.26)`
      : `inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -${u * 0.07}px ${u * 0.2}px rgba(0,0,0,0.34), 0 ${u * 0.02}px ${u * 0.04}px rgba(0,0,0,0.3)`;
  const capBorder = isGLProfile
    ? `1px solid ${adjustColor(baseColor, -30)}`
    : 'none';
  const topFaceBorder = isGLProfile
    ? `1px solid ${adjustColor(baseColor, -16)}`
    : 'none';

  // RGB glow sits underneath key — backlit leak around edges
  const rgbColor = rgb?.enabled ? (rgbColorForKey ?? rgb.color ?? accentColor) : null;
  const rgbIntensity = rgb?.intensity ?? 0.6;
  const pressFxColor = keyDef.legendColor ?? rgbColor ?? accentColor;
  const showAmbientRgb = !(isMediaKey || keyDef.icon);
  const ambientRgbBackground = isGLProfile && rgbColor
    ? `radial-gradient(circle at 14% 90%, ${withAlpha(rgbColor, 0.72 * rgbIntensity)} 0%, ${withAlpha(rgbColor, 0.2 * rgbIntensity)} 18%, transparent 40%),
       linear-gradient(90deg, ${withAlpha(rgbColor, 0.24 * rgbIntensity)} 0%, ${withAlpha(rgbColor, 0.08 * rgbIntensity)} 16%, transparent 34%),
       linear-gradient(0deg, ${withAlpha(rgbColor, 0.28 * rgbIntensity)} 0%, ${withAlpha(rgbColor, 0.1 * rgbIntensity)} 16%, transparent 34%)`
    : rgbColor
      ? `radial-gradient(ellipse at 50% 85%, ${withAlpha(rgbColor, 0.75 * rgbIntensity)} 0%, ${withAlpha(rgbColor, 0.25 * rgbIntensity)} 45%, transparent 75%)`
      : undefined;

  const effectiveLegendColor = keyDef.legendColor
    ?? (keyDef.isAccent
      ? '#fff'
      : keyDef.isModifier && modifierLegendColor
        ? modifierLegendColor
        : legendColor);
  const isGLDualLegend = isGLProfile && hasSecondLabel && !keyDef.icon;

  const legendStyle: React.CSSProperties = {
    color: effectiveLegendColor,
    fontSize,
    fontFamily: fontStack,
    fontWeight: p.fontWeight,
    letterSpacing: unitSize < 30 ? '0' : '0.2px',
  };

  // Increased travel for a high-fidelity "mechanical" feel
  const travelPx = u * Math.max(0.12, p.travel * 2.5);

  return (
    <div
      className="absolute select-none cursor-pointer"
      style={{
        left: keyDef.x * unitSize,
        top: keyDef.y * unitSize,
        width: w,
        height: h,
        padding: gap,
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={(e) => { e.preventDefault(); onMouseDown?.(); }}
      onTouchEnd={onMouseUp}
    >
      {rgbColor && showAmbientRgb && (
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            inset: -gap * 1.4,
            borderRadius: capRadius * 1.4,
            background: ambientRgbBackground,
            filter: isGLProfile ? 'blur(1.5px)' : 'blur(3px)',
            opacity: isPressed ? (isGLProfile ? rgbIntensity * 0.9 : rgbIntensity * 1.3) : (isGLProfile ? rgbIntensity * 0.52 : rgbIntensity),
            transition: 'opacity 100ms ease-out',
            willChange: 'opacity',
          }}
        />
      )}

      {pressFxColor && (
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            inset: -gap * 0.55,
            borderRadius: capRadius * 1.08,
            boxShadow: isPressed
              ? `0 0 ${u * 0.22}px ${withAlpha(pressFxColor, 0.48)}, 0 0 ${u * 0.4}px ${withAlpha(pressFxColor, 0.18)}`
              : 'none',
            opacity: isPressed ? 1 : 0,
            transition: 'opacity 80ms ease-out, box-shadow 80ms ease-out',
          }}
        />
      )}

      {keyDef.isTouchID ? (
        <div
          className="relative w-full h-full rounded-lg flex items-center justify-center overflow-hidden"
          style={{
            background: '#18181a',
            boxShadow: restShadow,
            border: '1px solid #0a0a0b',
          }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: '44%',
              height: '44%',
              top: '34%',
              border: '1.5px solid rgba(255,255,255,0.82)',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.08)',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '16%',
              height: '16%',
              top: '48%',
              background: '#18181a',
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: '8%',
              height: '18%',
              top: '20%',
              background: '#f5f5f7',
              boxShadow: '0 0 0 1px rgba(0,0,0,0.35)',
            }}
          />
        </div>
      ) : (
        <div
          className="relative w-full h-full"
          style={{
            borderRadius: capRadius,
            background: shellGradient,
            border: capBorder,
            boxShadow: isMediaKey
              ? (isPressed ? mediaPressShadow : mediaRestShadow)
              : (isPressed ? pressShadow : restShadow),
            transform: isPressed ? `translate3d(0, ${travelPx}px, 0)` : 'translate3d(0,0,0)',
            filter: isPressed ? 'brightness(0.85)' : 'none',
            transition: 'transform 0.06s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.06s ease-out, filter 0.06s ease-out',
            willChange: 'transform, box-shadow, filter',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden
            className="absolute pointer-events-none"
            style={{
              inset: topFaceInset,
              borderRadius: topFaceRadius,
              background: topFaceGradient,
              border: topFaceBorder,
              boxShadow: faceShadow,
            }}
          >
            {lockLight && (
              <LockLight active={isLocked} unitSize={unitSize} color={pressFxColor ?? accentColor} />
            )}

            <div
              className="absolute inset-0"
              style={{
                borderRadius: topFaceRadius,
                background: isMediaKey
                  ? 'radial-gradient(circle at 48% 38%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 32%, transparent 65%)'
                  : isGLProfile
                    ? 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 16%, rgba(255,255,255,0) 26%, rgba(0,0,0,0.14) 100%)'
                    : `radial-gradient(ellipse at 50% ${38 + p.dishCurve * 10}%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 22%, rgba(0,0,0,${0.1 + p.dishCurve * 0.16}) 68%, transparent 100%)`,
                opacity: isPressed ? 0.78 : 1,
                transition: 'opacity 80ms ease-out',
              }}
            />
            <div
              className="absolute inset-x-0 top-0"
              style={{
                height: Math.max(2, u * 0.12),
                borderTopLeftRadius: topFaceRadius,
                borderTopRightRadius: topFaceRadius,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)',
                opacity: isPressed ? 0.45 : 0.85,
                transition: 'opacity 80ms ease-out',
              }}
            />
          </div>

          {pressFxColor && (
            <div
              aria-hidden
              className="absolute pointer-events-none"
              style={{
                inset: topFaceInset,
                borderRadius: topFaceRadius,
                background: `radial-gradient(circle at 50% 38%, ${withAlpha(pressFxColor, isPressed ? 0.34 : 0)} 0%, ${withAlpha(pressFxColor, isPressed ? 0.12 : 0)} 34%, transparent 72%)`,
                opacity: isPressed ? 1 : 0,
                transition: 'opacity 80ms ease-out',
              }}
            />
          )}
          <div
            className={`absolute z-10 flex flex-col leading-none ${
              legendPos === 'top-left' ? 'items-start justify-start' :
              legendPos === 'bottom-left' ? 'items-start justify-end' :
              'items-center justify-center'
            }`}
            style={{ inset: topFaceInset, padding: padLegend }}
          >
            {hasSecondLabel ? (
              isGLDualLegend ? (
                <div className="relative w-full h-full">
                  <span
                    style={{
                      ...legendStyle,
                      position: 'absolute',
                      left: '50%',
                      top: `${Math.max(5, u * 0.14)}px`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {keyDef.label}
                  </span>
                  <span
                    style={{
                      ...legendStyle,
                      position: 'absolute',
                      left: `${Math.max(4, u * 0.12)}px`,
                      bottom: `${Math.max(2, u * 0.08)}px`,
                      fontSize: fontSize * 0.62,
                      opacity: 0.78,
                    }}
                  >
                    {keyDef.label2}
                  </span>
                </div>
              ) : (
                <div
                  className={`flex flex-col ${
                    legendPos === 'center' ? 'items-center' : 'items-start'
                  }`}
                  style={{ gap: Math.max(1, unitSize * 0.015) }}
                >
                  <span style={{ ...legendStyle, fontSize: fontSize * 0.78, opacity: 0.8 }}>
                    {keyDef.label2}
                  </span>
                  <span style={legendStyle}>{keyDef.label}</span>
                </div>
              )
            ) : keyDef.icon ? (
              keyDef.label ? (
                <div
                  className={`flex flex-col ${
                    legendPos === 'center' ? 'items-center' : 'items-start'
                  }`}
                  style={{ gap: Math.max(2, unitSize * 0.06) }}
                >
                  <KeyIcon
                    icon={keyDef.icon}
                    color={effectiveLegendColor}
                    size={Math.max(10, Math.min(w, h) * (isMediaKey ? 0.42 : 0.32))}
                  />
                  <span style={{ ...legendStyle, fontSize: fontSize * 0.82, opacity: 0.92 }}>
                    {keyDef.label}
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <KeyIcon
                    icon={keyDef.icon}
                    color={effectiveLegendColor}
                    size={Math.max(12, Math.min(w, h) * (isMediaKey ? 0.52 : 0.46))}
                  />
                </div>
              )
            ) : (
              <span
                className={legendPos === 'center' ? 'text-center' : 'text-left'}
                style={{ ...legendStyle, maxWidth: w - 4, overflow: 'hidden' }}
              >
                {keyDef.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export const BaseKey = React.memo(BaseKeyComponent);
