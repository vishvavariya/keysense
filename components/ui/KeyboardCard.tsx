'use client';

import React from 'react';
import Link from 'next/link';
import { KeyboardModel } from '@/lib/types';
import { getModel } from '@/keyboards/_base';

interface KeyboardCardProps {
  keyboard: KeyboardModel;
}

const categoryColors: Record<string, string> = {
  gaming: 'bg-red-500/20 text-red-400 border-red-500/30',
  productivity: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  enthusiast: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  budget: 'bg-green-500/20 text-green-400 border-green-500/30',
};

function Silhouette({ keyboard }: { keyboard: KeyboardModel }) {
  const model = getModel(keyboard.id);
  const isApple = keyboard.visualTheme === 'apple-magic' || keyboard.brand === 'Apple';
  const isG915 = keyboard.visualTheme === 'g915' || keyboard.id === 'logitech-g915-tkl';
  const layout = model?.layout;
  const viewBoxWidth = layout?.width ?? 14;
  const viewBoxHeight = layout?.height ?? 6;
  const unit = 10;
  const gap = 0.9;

  // Classify by layout type or switch type for profile height
  const isLowProfile = isApple || isG915 || keyboard.switchType.toLowerCase().includes('scissor');
  const hasMechanicalSwitches =
    keyboard.category === 'enthusiast' ||
    keyboard.category === 'budget' ||
    keyboard.switchType.toLowerCase().includes('gateron') ||
    keyboard.switchType.toLowerCase().includes('cherry') ||
    keyboard.switchType.toLowerCase().includes('tactile quiet');

  // Wider keyboards (full-size) need more vertical space
  const isFullSize = viewBoxWidth > 18;
  const is75 = viewBoxWidth > 14 && viewBoxWidth <= 18;

  const containerHeight = isLowProfile
    ? (isFullSize ? '52%' : '46%')
    : hasMechanicalSwitches
      ? (isFullSize ? '64%' : is75 ? '60%' : '58%')
      : (isFullSize ? '56%' : '50%');

  const containerWidth = isFullSize ? '92%' : is75 ? '84%' : '78%';

  const borderRadius = isApple ? 14 : hasMechanicalSwitches ? 10 : 8;

  return (
    <div
      className="rounded-lg opacity-90 group-hover:opacity-100 transition-opacity relative shadow-[0_10px_30px_rgba(0,0,0,0.45)] flex flex-col"
      style={{
        width: containerWidth,
        height: containerHeight,
        background: isApple
          ? 'linear-gradient(180deg, #ffffff, #e8e8ea)'
          : `linear-gradient(145deg, ${keyboard.color}, ${keyboard.keycapColor})`,
        borderRadius,
        padding: isApple ? '6px 8px' : isG915 ? '14px 8px 8px 8px' : '8px',
        border: isApple ? '1px solid #d0d0d2' : '1px solid rgba(0,0,0,0.4)',
      }}
    >
      {isG915 && <div className="absolute top-2 right-2.5 w-7 h-1.5 rounded-full bg-black/50" />}
      {keyboard.id === 'keychron-q1-pro' && (
        <div className="absolute top-1.5 right-2 w-5 h-5 rounded-full bg-black/60 border border-white/10" />
      )}
      {layout ? (
        <svg
          className="w-full h-full"
          viewBox={`0 0 ${viewBoxWidth * unit} ${viewBoxHeight * unit}`}
          preserveAspectRatio="xMidYMid meet"
        >
          {layout.keys.map((keyDef) => {
            const keyW = (keyDef.w ?? 1) * unit - gap;
            const keyH = (keyDef.h ?? 1) * unit - gap;
            const x = keyDef.x * unit + gap * 0.5;
            const y = keyDef.y * unit + gap * 0.5;
            const fill = keyDef.isAccent
              ? keyboard.accentColor
              : keyDef.isModifier
                ? keyboard.color
                : keyboard.keycapColor;
            const opacity = keyDef.isAccent ? 0.95 : keyDef.isModifier ? 0.8 : 0.68;
            const radius = keyDef.shape === 'circle'
              ? Math.min(keyW, keyH) / 2
              : isApple
                ? 2.4
                : hasMechanicalSwitches
                  ? 1.8
                  : 2.8;

            return (
              <rect
                key={`${keyboard.id}-${keyDef.code}-${keyDef.x}-${keyDef.y}`}
                x={x}
                y={y}
                width={Math.max(1, keyW)}
                height={Math.max(1, keyH)}
                rx={radius}
                fill={fill}
                opacity={opacity}
                stroke={isApple ? 'rgba(180,180,184,0.85)' : 'rgba(0,0,0,0.18)'}
                strokeWidth={0.45}
              />
            );
          })}
        </svg>
      ) : (
        <div className="w-full h-full grid grid-cols-14 grid-rows-5 gap-[2px]">
          {Array.from({ length: 70 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: isApple ? '#f4f4f4' : keyboard.keycapColor,
                opacity: isApple ? 1 : 0.55 + ((i * 37) % 35) / 100,
                borderRadius: isApple ? 2 : 1.5,
                border: isApple ? '1px solid #dcdcde' : 'none',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const KeyboardCardComponent: React.FC<KeyboardCardProps> = ({ keyboard }) => {
  return (
    <Link href={`/keyboard/${keyboard.id}`}>
      <div className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm overflow-hidden cursor-pointer transition-transform duration-200 hover:-translate-y-1">
        <div
          className="h-40 flex items-center justify-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${keyboard.color}40, ${keyboard.color}20)` }}
        >
          <Silhouette keyboard={keyboard} />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: `radial-gradient(circle at 50% 80%, ${keyboard.accentColor}15, transparent 60%)` }}
          />
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider">{keyboard.brand}</p>
              <h3 className="text-base font-semibold text-white/90 mt-0.5">{keyboard.model}</h3>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium capitalize ${categoryColors[keyboard.category]}`}>
              {keyboard.category}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>{keyboard.switchType}</span>
            <span>•</span>
            <span className="capitalize">{keyboard.soundProfile}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
            <span className="text-lg font-bold text-white/80">${keyboard.price}</span>
            <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors">
              Try it →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const KeyboardCard = React.memo(KeyboardCardComponent);
