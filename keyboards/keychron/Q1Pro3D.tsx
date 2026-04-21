'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import { useSound } from '@/components/providers/SoundProvider';
import { adjustColor } from '../_base/color';
import { CaseStyle, ModelProps } from '../_base/types';
import { LockLight } from '../_base/LockLight';
import { getLockCodeForKey, isLockKeyActive } from '../_base/lockKeys';

/* ── Types ─────────────────────────────────────────────────── */

interface Q1Pro3DStageProps extends ModelProps {
  layout: KeyboardLayout;
  caseStyle: CaseStyle;
  keycapColor: string;
  modifierColor: string;
  accentColor: string;
  legendColor: string;
  fontStack: string;
  unitSizeCap?: number;
}

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

/* ── Keycap Component — tuned to match the reference Q1 Pro ─ */

function KeyIcon({ icon, color, size }: { icon: string; color: string; size: number }) {
  const common = {
    stroke: color,
    fill: 'none',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (icon) {
    case 'brightness-down':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="M12 4v2.5" />
          <path {...common} d="M12 17.5V20" />
          <path {...common} d="M4 12h2.5" />
          <path {...common} d="M17.5 12H20" />
          <path {...common} d="m6.6 6.6 1.9 1.9" />
          <path {...common} d="m15.5 15.5 1.9 1.9" />
          <path {...common} d="m17.4 6.6-1.9 1.9" />
          <path {...common} d="m8.5 15.5-1.9 1.9" />
        </svg>
      );
    case 'brightness-up':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="1.8" fill="none" />
          <path {...common} d="M12 3v3.4" />
          <path {...common} d="M12 17.6V21" />
          <path {...common} d="M3 12h3.4" />
          <path {...common} d="M17.6 12H21" />
          <path {...common} d="m5.2 5.2 2.3 2.3" />
          <path {...common} d="m16.5 16.5 2.3 2.3" />
          <path {...common} d="m18.8 5.2-2.3 2.3" />
          <path {...common} d="m7.5 16.5-2.3 2.3" />
        </svg>
      );
    case 'app-switch':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <rect x="4.5" y="7" width="8.5" height="6.8" rx="1.2" stroke={color} strokeWidth="1.8" fill="none" />
          <rect x="11" y="10.2" width="8.5" height="6.8" rx="1.2" stroke={color} strokeWidth="1.8" fill="none" />
        </svg>
      );
    case 'launchpad':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          {[6, 12, 18].flatMap((x) => [6, 12, 18].map((y) => (
            <rect key={`${x}-${y}`} x={x - 1.5} y={y - 1.5} width="3" height="3" rx="0.5" fill={color} />
          )))}
        </svg>
      );
    case 'keyboard-light-down':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M5 15.5h14" />
          <path {...common} d="M8.5 10.5h7" />
          <path {...common} d="M12 5v4" />
          <path {...common} d="M9.2 7.6h5.6" />
        </svg>
      );
    case 'keyboard-light-up':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M5 15.5h14" />
          <path {...common} d="M8.5 10.5h7" />
          <path {...common} d="M12 4v5" />
          <path {...common} d="m9 6.2 3 3 3-3" />
        </svg>
      );
    case 'prev-track':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M7 6v12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="m17 7-6 5 6 5V7Z" fill={color} />
          <path d="m12 7-6 5 6 5V7Z" fill={color} opacity="0.92" />
        </svg>
      );
    case 'play-pause':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="m7 6 8 6-8 6V6Z" fill={color} />
          <path d="M17 7.2v9.6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="M20 7.2v9.6" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case 'next-track':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M17 6v12" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <path d="m7 7 6 5-6 5V7Z" fill={color} opacity="0.92" />
          <path d="m12 7 6 5-6 5V7Z" fill={color} />
        </svg>
      );
    case 'mute':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M5 10h4l4-4v12l-4-4H5v-4Z" fill={color} />
          <path {...common} d="m16.4 9.5 3.2 5" />
        </svg>
      );
    case 'volume-down':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M5 10h4l4-4v12l-4-4H5v-4Z" fill={color} />
          <path {...common} d="M16.6 9.7a3.2 3.2 0 0 1 0 4.6" />
        </svg>
      );
    case 'volume-up':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
          <path d="M5 10h4l4-4v12l-4-4H5v-4Z" fill={color} />
          <path {...common} d="M16.3 9.4a4.2 4.2 0 0 1 0 5.2" />
          <path {...common} d="M18.7 7.4a7 7 0 0 1 0 9.2" />
        </svg>
      );
    default:
      return null;
  }
}

function Keycap({
  keyDef, unitSize, baseColor, legendColor, fontStack,
  isPressed, lockLight, isLocked, onDown, onUp,
}: {
  keyDef: KeyDef;
  unitSize: number;
  baseColor: string;
  legendColor: string;
  fontStack: string;
  isPressed: boolean;
  lockLight: boolean;
  isLocked: boolean;
  onDown: () => void;
  onUp: () => void;
}) {
  const { x, y, w = 1, h = 1 } = keyDef;

  const gap = unitSize * 0.042;
  const width = w * unitSize;
  const height = h * unitSize;
  const capW = width - gap * 2;
  const capH = height - gap * 2;
  const capR = unitSize * 0.14;
  const inTop = unitSize * 0.1;
  const inBot = unitSize * 0.16;
  const inX = unitSize * 0.12;
  const faceR = unitSize * 0.18;
  const travel = unitSize * 0.11;
  const yOff = isPressed ? travel : 0;
  const shadowDepth = isPressed ? 1 : unitSize * 0.12;
  const wallColor = baseColor;
  const faceColor = adjustColor(baseColor, 8);
  const effectiveLegendColor = keyDef.legendColor ?? legendColor;
  const label = keyDef.label;
  const labelLength = Math.max(1, label.length);
  const faceW = capW - inX * 2;
  const faceH = capH - inTop - inBot;
  const isBottomLeft = keyDef.legendPosition === 'bottom-left';
  const isDualLegend = Boolean(keyDef.label2);
  const hasIconLabel = Boolean(keyDef.icon && keyDef.label);
  const hasIconOnly = Boolean(keyDef.icon && !keyDef.label);

  const centerFontSize = Math.max(
    8,
    Math.min(faceH * 0.44, faceW / Math.max(2.6, labelLength * 0.5), unitSize * 0.24)
  );
  const bottomLeftFontSize = Math.max(
    6,
    Math.min(faceH * 0.34, faceW / Math.max(3, labelLength * 0.34), unitSize * 0.2)
  );
  const dualPrimarySize = Math.max(8, Math.min(faceH * 0.42, faceW * 0.44, unitSize * 0.22));
  const dualSecondarySize = Math.max(6, Math.min(faceH * 0.24, faceW * 0.2, unitSize * 0.11));
  const fnLabelSize = Math.max(7, Math.min(unitSize * 0.17, faceW * 0.36));

  const legendStyle: React.CSSProperties = {
    fontFamily: fontStack,
    color: effectiveLegendColor,
    fontWeight: 550,
    textShadow: '0 1px 1px rgba(0,0,0,0.34)',
    pointerEvents: 'none',
  };

  return (
    <div
      className="absolute select-none"
      style={{
        left: x * unitSize + gap,
        top: y * unitSize + gap,
        width: capW,
        height: capH,
      }}
      onPointerDown={(e) => { e.preventDefault(); onDown(); }}
      onPointerUp={onUp}
      onPointerLeave={onUp}
      onTouchStart={(e) => { e.preventDefault(); onDown(); }}
      onTouchEnd={(e) => { e.preventDefault(); onUp(); }}
    >
      <div
        className="absolute inset-0 transition-transform duration-[60ms]"
        style={{
          borderRadius: capR,
          background: `linear-gradient(180deg, ${adjustColor(wallColor, 10)} 0%, ${adjustColor(wallColor, 2)} 35%, ${adjustColor(wallColor, -9)} 100%)`,
          border: `1px solid ${adjustColor(wallColor, -16)}`,
          boxShadow: `
            0 ${shadowDepth}px ${shadowDepth * 2}px rgba(0,0,0,0.58),
            0 ${shadowDepth * 0.35}px ${shadowDepth * 0.7}px rgba(0,0,0,0.35),
            inset 0 1px 0 rgba(255,255,255,0.08)
          `,
          transform: `translateY(${yOff}px)`,
        }}
        >
          {lockLight && <LockLight active={isLocked} unitSize={unitSize} color="#E0645F" />}

          <div
            className="absolute inset-x-0 top-0"
          style={{
            height: unitSize * 0.16,
            borderTopLeftRadius: capR,
            borderTopRightRadius: capR,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, transparent 100%)',
            opacity: isPressed ? 0.55 : 0.9,
          }}
        />

        <div
          className="absolute"
          style={{
            top: inTop,
            bottom: inBot,
            left: inX,
            right: inX,
            borderRadius: faceR,
            background: `radial-gradient(ellipse 94% 82% at 50% 34%, ${adjustColor(faceColor, 9)} 0%, ${adjustColor(faceColor, 1)} 46%, ${adjustColor(faceColor, -12)} 100%)`,
            boxShadow: `
              inset 0 ${unitSize * 0.06}px ${unitSize * 0.11}px rgba(0,0,0,0.36),
              inset 0 -${unitSize * 0.025}px ${unitSize * 0.045}px rgba(255,255,255,0.12),
              inset ${unitSize * 0.03}px 0 ${unitSize * 0.07}px rgba(0,0,0,0.16),
              inset -${unitSize * 0.03}px 0 ${unitSize * 0.07}px rgba(0,0,0,0.16),
              0 1px 2px rgba(0,0,0,0.25)
            `,
            overflow: 'hidden',
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse at 50% 24%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 34%, transparent 72%)',
              opacity: isPressed ? 0.5 : 1,
            }}
          />

          {isDualLegend ? (
            <div className="absolute inset-0" style={legendStyle}>
              <span
                style={{
                  position: 'absolute',
                  top: unitSize * 0.05,
                  left: unitSize * 0.09,
                  fontSize: dualSecondarySize,
                  lineHeight: 1,
                  opacity: 0.72,
                }}
              >
                {keyDef.label2}
              </span>
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '58%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: dualPrimarySize,
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </div>
          ) : hasIconLabel ? (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center"
              style={{ ...legendStyle, gap: unitSize * 0.035 }}
            >
              <KeyIcon icon={keyDef.icon!} color={effectiveLegendColor} size={Math.max(11, unitSize * 0.29)} />
              <span
                style={{
                  fontSize: fnLabelSize,
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </span>
            </div>
          ) : hasIconOnly ? (
            <div className="absolute inset-0 flex items-center justify-center" style={legendStyle}>
              <KeyIcon icon={keyDef.icon!} color={effectiveLegendColor} size={Math.max(10, unitSize * 0.26)} />
            </div>
          ) : isBottomLeft ? (
            <div
              className="absolute inset-0 flex items-center justify-start"
              style={{
                ...legendStyle,
                paddingLeft: unitSize * 0.11,
                paddingRight: unitSize * 0.08,
                transform: `translateY(${unitSize * 0.01}px)`,
              }}
            >
              <span
                style={{
                  fontSize: bottomLeftFontSize,
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  letterSpacing: labelLength > 7 ? '-0.012em' : '0',
                }}
              >
                {label}
              </span>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center" style={legendStyle}>
              <span
                style={{
                  fontSize: centerFontSize,
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                  letterSpacing: labelLength > 5 ? '-0.02em' : '0',
                }}
              >
                {label}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Rotary Knob ───────────────────────────────────────────── */

function RotaryKnob({
  unitSize,
  padX,
  padTop,
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
}: {
  unitSize: number;
  padX: number;
  padTop: number;
  volume: number;
  muted: boolean;
  onVolumeChange: (value: number) => void;
  onToggleMute: () => void;
}) {
  const gap = unitSize * 0.042;
  const socketSize = unitSize - gap * 2;
  const size = socketSize * 0.88;
  const left = padX + unitSize * 15.25 + gap;
  const top = padTop + gap;
  const inset = (socketSize - size) / 2;
  const displayVolume = muted ? 0 : volume;
  const angle = -135 + displayVolume * 270;
  const dragRef = useRef<{
    pointerId: number | null;
    startX: number;
    startY: number;
    startVolume: number;
    moved: boolean;
  }>({
    pointerId: null,
    startX: 0,
    startY: 0,
    startVolume: displayVolume,
    moved: false,
  });
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startVolume: displayVolume,
      moved: false,
    };
    setIsDragging(true);
  }, [displayVolume]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const dx = event.clientX - dragRef.current.startX;
    const dy = dragRef.current.startY - event.clientY;
    const delta = (dx + dy) / 180;
    const next = clamp01(dragRef.current.startVolume + delta);

    if (Math.abs(dx) + Math.abs(dy) > 4) {
      dragRef.current.moved = true;
    }

    onVolumeChange(next);
  }, [onVolumeChange]);

  const finishPointer = useCallback((event: React.PointerEvent<HTMLDivElement>, fromClick: boolean) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const moved = dragRef.current.moved;
    dragRef.current.pointerId = null;
    dragRef.current.moved = false;
    setIsDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (fromClick && !moved) {
      onToggleMute();
    }
  }, [onToggleMute]);

  const handleWheel = useCallback((event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const direction = event.deltaY === 0 ? 0 : event.deltaY > 0 ? -1 : 1;
    if (direction === 0) return;
    onVolumeChange(clamp01(displayVolume + direction * 0.05));
  }, [displayVolume, onVolumeChange]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      event.preventDefault();
      onVolumeChange(clamp01(displayVolume + 0.05));
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      event.preventDefault();
      onVolumeChange(clamp01(displayVolume - 0.05));
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      onVolumeChange(0);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      onVolumeChange(1);
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggleMute();
    }
  }, [displayVolume, onToggleMute, onVolumeChange]);

  return (
    <div
      role="slider"
      tabIndex={0}
      aria-label="Keyboard volume knob"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(displayVolume * 100)}
      aria-valuetext={muted ? 'Muted' : `${Math.round(displayVolume * 100)} percent`}
      className={`absolute select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      style={{
        zIndex: 20,
        width: socketSize,
        height: socketSize,
        top,
        left,
        borderRadius: unitSize * 0.16,
        background: 'linear-gradient(180deg, #23262b 0%, #14161a 100%)',
        border: '1px solid rgba(255,255,255,0.04)',
        boxShadow: `
          inset 0 ${unitSize * 0.04}px ${unitSize * 0.09}px rgba(0,0,0,0.78),
          inset 0 1px 0 rgba(255,255,255,0.05),
          0 1px 2px rgba(0,0,0,0.35)
        `,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={(event) => finishPointer(event, true)}
      onPointerCancel={(event) => finishPointer(event, false)}
      onWheel={handleWheel}
      onKeyDown={handleKeyDown}
    >
      <div
        className="absolute rounded-full"
        style={{
          inset,
          background: 'linear-gradient(180deg, #2f3339 0%, #13161a 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: `
            0 ${unitSize * 0.03}px ${unitSize * 0.06}px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.08),
            inset 0 -2px 5px rgba(0,0,0,0.66)
          `,
        }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'repeating-conic-gradient(from 0deg, rgba(255,255,255,0.08) 0deg, rgba(255,255,255,0.08) 1deg, transparent 1deg, transparent 4deg)',
            opacity: 0.35,
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            inset: '14%',
            background: 'radial-gradient(circle at 38% 34%, #363b44 0%, #272b33 34%, #181b20 68%, #101216 100%)',
            boxShadow: `
              inset 0 ${size * 0.05}px ${size * 0.1}px rgba(0,0,0,0.52),
              inset 0 -${size * 0.03}px ${size * 0.05}px rgba(255,255,255,0.04)
            `,
          }}
        >
          <div
            className="absolute left-1/2 top-[12%] origin-bottom -translate-x-1/2 rounded-full"
            style={{
              width: Math.max(2, size * 0.045),
              height: size * 0.2,
              background: muted
                ? 'rgba(129,138,148,0.45)'
                : 'linear-gradient(180deg, rgba(236,241,246,0.95) 0%, rgba(188,195,203,0.85) 100%)',
              boxShadow: muted ? 'none' : '0 0 3px rgba(255,255,255,0.25)',
              transform: `translateX(-50%) rotate(${angle}deg)`,
            }}
          />
        </div>
      </div>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: '1px solid rgba(0,0,0,0.45)',
          opacity: 0.5,
          borderRadius: unitSize * 0.16,
        }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 28%)',
          boxShadow: `
            inset 0 1px 0 rgba(255,255,255,0.04)
          `,
        }}
      />
    </div>
  );
}

/* ── Main Stage ────────────────────────────────────────────── */

export function Q1Pro3DStage({
  layout, caseStyle, keycapColor, modifierColor, accentColor,
  legendColor, fontStack, pressedKeys, lockKeys, lockLightKeys, onKeyDown, onKeyUp, onLockKeyToggle,
  maxWidth, unitSizeCap = 54,
}: Q1Pro3DStageProps) {
  const { volume, muted, setVolume, toggleMute } = useSound();
  const [mouseDown, setMouseDown] = useState<Set<string>>(new Set());
  const mousePressedRef = useRef<Set<string>>(new Set());

  const mw = maxWidth ?? 900;
  const unitSize = useMemo(() => {
    const available = mw - caseStyle.padX * 2;
    return Math.max(4, Math.min(unitSizeCap, available / layout.width));
  }, [mw, layout.width, caseStyle.padX, unitSizeCap]);

  const totalW = layout.width * unitSize;
  const totalH = layout.height * unitSize;

  const handleDown = useCallback((code: string) => {
    if (!mousePressedRef.current.has(code)) {
      const next = new Set(mousePressedRef.current);
      next.add(code);
      mousePressedRef.current = next;
      setMouseDown(new Set(next));
      const lockCode = getLockCodeForKey(code);
      if (lockCode) onLockKeyToggle?.(lockCode);
      onKeyDown?.(code);
    }
  }, [onKeyDown, onLockKeyToggle]);

  const handleUp = useCallback((code: string) => {
    const next = new Set(mousePressedRef.current);
    next.delete(code);
    mousePressedRef.current = next;
    setMouseDown(new Set(next));
    onKeyUp?.(code);
  }, [onKeyUp]);

  useEffect(() => {
    const globalUp = () => {
      if (mousePressedRef.current.size > 0) {
        mousePressedRef.current.forEach((c) => onKeyUp?.(c));
        mousePressedRef.current = new Set();
        setMouseDown(new Set());
      }
    };
    window.addEventListener('pointerup', globalUp);
    return () => window.removeEventListener('pointerup', globalUp);
  }, [onKeyUp]);

  const getKeyColor = (kd: KeyDef) => {
    if (kd.isAccent) return accentColor;
    if (kd.isModifier) return modifierColor;
    return keycapColor;
  };

  // Case styling
  const cs = caseStyle;
  const frameGrad = cs.frameGradient ?? [
    adjustColor(cs.frameColor, 8),
    cs.frameColor,
    adjustColor(cs.frameColor, -8),
  ];

  const plateColor = cs.plateColor ?? adjustColor(cs.frameColor, -40, -10);

  return (
    <div
      data-keyboard-canvas
      className="flex justify-center relative"
      style={{ maxWidth: mw + cs.padX * 2 }}
    >
      {/* Case shell */}
      <div
        className="relative mx-auto"
        style={{
          width: totalW + cs.padX * 2,
          height: totalH + cs.padTop + cs.padBottom,
          borderRadius: cs.cornerRadius,
          padding: `${cs.padTop}px ${cs.padX}px ${cs.padBottom}px ${cs.padX}px`,
          background: `
            radial-gradient(ellipse 92% 58% at 30% 12%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.03) 42%, transparent 72%),
            linear-gradient(180deg, ${frameGrad[0]} 0%, ${frameGrad[1]} 34%, ${frameGrad[2]} 100%)
          `,
          boxShadow: `
            0 3px 0 0 ${adjustColor(cs.frameColor, -16)},
            0 10px 18px rgba(0,0,0,0.38),
            0 22px 36px rgba(0,0,0,0.22),
            inset 0 1px 0 rgba(255,255,255,0.16),
            inset 0 -1px 0 rgba(0,0,0,0.32)
          `,
          border: '1px solid rgba(10,10,12,0.9)',
        }}
      >
        {/* Subtle top bezel light */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 pointer-events-none"
          style={{
            height: cs.padTop,
            borderRadius: `${cs.cornerRadius}px ${cs.cornerRadius}px 0 0`,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 52%, transparent 100%)',
          }}
        />

        {/* KEYCHRON branding */}
        <div
          aria-hidden
          className="absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            fontFamily: fontStack,
            fontSize: Math.max(6, unitSize * 0.13),
            letterSpacing: 1.8,
            color: '#7a7d82',
            fontWeight: 600,
            opacity: 0.45,
          }}
        >
          KEYCHRON
        </div>

        {/* Rotary knob */}
        <RotaryKnob
          unitSize={unitSize}
          padX={cs.padX}
          padTop={cs.padTop}
          volume={volume}
          muted={muted}
          onVolumeChange={setVolume}
          onToggleMute={toggleMute}
        />

        {/* Switch plate */}
        <div
          className="relative"
          style={{
            width: totalW,
            height: totalH,
            borderRadius: Math.max(4, cs.cornerRadius - 8),
            background: `linear-gradient(180deg, ${adjustColor(plateColor, -2)} 0%, ${plateColor} 34%, ${adjustColor(plateColor, 4)} 100%)`,
            boxShadow: cs.plateInsetShadow
              ? `inset 0 8px 18px rgba(0,0,0,0.72), inset 0 -2px 8px rgba(255,255,255,0.02), inset 0 1px 2px rgba(255,255,255,0.03)`
              : 'none',
            overflow: 'hidden',
            border: `1px solid ${adjustColor(plateColor, -12)}`,
          }}
        >
          {/* Keys */}
          {layout.keys.map((kd) => {
            const pressed = pressedKeys.has(kd.code) || mouseDown.has(kd.code);
            const lockLight = lockLightKeys?.has(kd.code) ?? false;
            const locked = isLockKeyActive(kd, lockKeys);
            return (
              <Keycap
                key={kd.code}
                keyDef={kd}
                unitSize={unitSize}
                baseColor={getKeyColor(kd)}
                legendColor={legendColor}
                fontStack={fontStack}
                isPressed={pressed}
                lockLight={lockLight}
                isLocked={locked}
                onDown={() => handleDown(kd.code)}
                onUp={() => handleUp(kd.code)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
