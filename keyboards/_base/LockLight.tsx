import React from 'react';

interface LockLightProps {
  active: boolean;
  unitSize: number;
  color?: string;
}

export function LockLight({ active, unitSize, color = '#7dff7b' }: LockLightProps) {
  const size = Math.max(3.5, Math.min(7, unitSize * 0.13));
  const inset = Math.max(3, unitSize * 0.12);

  return (
    <span
      aria-hidden
      data-lock-light={active ? 'on' : 'off'}
      className="absolute pointer-events-none"
      style={{
        top: inset,
        right: inset,
        width: size,
        height: size,
        borderRadius: '50%',
        zIndex: 20,
        background: active ? color : 'rgba(255,255,255,0.16)',
        border: active ? '1px solid rgba(255,255,255,0.58)' : '1px solid rgba(0,0,0,0.38)',
        boxShadow: active
          ? `0 0 ${size * 1.15}px ${color}, 0 0 ${size * 2}px rgba(255,255,255,0.12)`
          : 'inset 0 1px 1px rgba(255,255,255,0.12)',
        opacity: active ? 0.96 : 0.5,
        transition: 'background 120ms ease, box-shadow 120ms ease, opacity 120ms ease',
      }}
    />
  );
}
