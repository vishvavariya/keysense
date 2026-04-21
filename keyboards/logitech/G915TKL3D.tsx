'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { KeyDef, KeyboardLayout } from '@/lib/types';
import { withAlpha } from '../_base/color';
import { CaseStyle, ModelProps } from '../_base/types';
import { getLockCodeForKey } from '../_base/lockKeys';

type G915Palette = {
  shellA: string;
  shellB: string;
  shellC: string;
  key: string;
  keyMod: string;
  white: string;
  dim: string;
  cyan: string;
  green: string;
  amber: string;
  orange: string;
  magenta: string;
  violet: string;
};

interface G915TKL3DStageProps extends ModelProps {
  layout: KeyboardLayout;
  caseStyle: CaseStyle;
  colors: G915Palette;
  fontStack: string;
  unitSizeCap?: number;
}

interface FaceInsets {
  x: number;
  top: number;
  bottom: number;
}

interface KeyLayoutRect {
  keyDef: KeyDef;
  left: number;
  top: number;
  width: number;
  height: number;
  gap: number;
  capLeft: number;
  capTop: number;
  capWidth: number;
  capHeight: number;
  faceLeft: number;
  faceTop: number;
  faceWidth: number;
  faceHeight: number;
  faceInsets: FaceInsets;
  centerX: number;
  centerY: number;
}

const iconOpticalFit: Partial<Record<string, { scale: number; x: number; y: number }>> = {
  'game-mode': { scale: 1, x: 0, y: 0 },
  lightspeed: { scale: 1, x: 0, y: 0 },
  bluetooth: { scale: 1, x: 0, y: 0 },
  brightness: { scale: 1, x: 0, y: 0 },
  'prev-track': { scale: 1, x: 0, y: 0 },
  'play-pause': { scale: 1, x: 0, y: 0 },
  'next-track': { scale: 1, x: 0, y: 0 },
  mute: { scale: 1, x: 0, y: 0 },
  windows: { scale: 0.88, x: 0, y: 0.1 },
  'menu-lines': { scale: 0.9, x: 0, y: 0 },
};

const geometryCache = new Map<string, THREE.BufferGeometry>();

function createBrushedTexture(baseColor: string, highlightColor: string, shadowColor: string) {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1536;
  canvas.height = 768;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, highlightColor);
  gradient.addColorStop(0.42, baseColor);
  gradient.addColorStop(1, shadowColor);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < 1800; i += 1) {
    const y = Math.random() * canvas.height;
    const x = Math.random() * canvas.width * 0.2;
    const width = canvas.width * (0.72 + Math.random() * 0.28);
    const alpha = 0.012 + Math.random() * 0.026;
    ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(Math.min(canvas.width, x + width), y);
    ctx.stroke();
  }

  for (let i = 0; i < 1200; i += 1) {
    const y = Math.random() * canvas.height;
    const x = Math.random() * canvas.width * 0.14;
    const width = canvas.width * (0.78 + Math.random() * 0.22);
    const alpha = 0.008 + Math.random() * 0.014;
    ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(Math.min(canvas.width, x + width), y);
    ctx.stroke();
  }

  const vignette = ctx.createLinearGradient(0, 0, canvas.width, 0);
  vignette.addColorStop(0, 'rgba(0,0,0,0.18)');
  vignette.addColorStop(0.08, 'rgba(0,0,0,0)');
  vignette.addColorStop(0.92, 'rgba(0,0,0,0)');
  vignette.addColorStop(1, 'rgba(0,0,0,0.18)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  texture.anisotropy = 8;
  return texture;
}

function getRoundedGeometry(width: number, height: number, depth: number, radius: number, segments = 6) {
  const r = Math.max(0.5, Math.min(radius, width / 2 - 0.5, height / 2 - 0.5, depth / 2 - 0.2));
  const key = `${width.toFixed(2)}:${height.toFixed(2)}:${depth.toFixed(2)}:${r.toFixed(2)}:${segments}`;
  const cached = geometryCache.get(key);
  if (cached) return cached;
  const geometry = new RoundedBoxGeometry(width, height, depth, segments, r);
  geometryCache.set(key, geometry);
  return geometry;
}

function getCircleGeometry(radius: number, depth: number, segments = 48) {
  const key = `circle:${radius.toFixed(2)}:${depth.toFixed(2)}:${segments}`;
  const cached = geometryCache.get(key);
  if (cached) return cached;
  const geometry = new THREE.CylinderGeometry(radius, radius, depth, segments, 1, false);
  geometry.rotateX(Math.PI / 2);
  geometryCache.set(key, geometry);
  return geometry;
}

function getFaceInsets(keyDef: KeyDef, unitSize: number): FaceInsets {
  if (keyDef.shape === 'circle') {
    const mediaInset = keyDef.variant === 'media' ? Math.max(2, unitSize * 0.052) : Math.max(2, unitSize * 0.075);
    return {
      x: mediaInset,
      top: mediaInset,
      bottom: mediaInset,
    };
  }

  return {
    x: Math.max(4, unitSize * 0.13),
    top: Math.max(4, unitSize * 0.09),
    bottom: Math.max(5, unitSize * 0.14),
  };
}

function getHeaderMetrics(caseStyle: CaseStyle, unitSize: number) {
  return {
    badgeLeft: caseStyle.padX + unitSize * 5.56,
    badgeTop: 6,
    badgeWidth: unitSize * 2.18,
    badgeHeight: unitSize * 1.02,
    indicatorLeft: caseStyle.padX + unitSize * 8.04,
    indicatorTop: 15,
    rollerLeft: caseStyle.padX + unitSize * 15.06,
    rollerTop: 6,
    rollerWidth: unitSize * 2.42,
    rollerHeight: unitSize * 0.92,
    logoLeft: caseStyle.padX + unitSize * 0.06,
    logoTop: 19,
    logoSize: unitSize * 1.02,
  };
}

function toWorldX(left: number, width: number, boardWidth: number) {
  return left + width / 2 - boardWidth / 2;
}

function toWorldY(top: number, height: number, boardHeight: number) {
  return boardHeight / 2 - (top + height / 2);
}

function GLogo({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 167.032 167.032" fill="none" aria-hidden className="w-full h-full">
      <path
        d="m 128.75863,143.48741 h 34.69195 V 68.460106 H 87.927649 V 102.72745 H 128.75863 Z M 87.459929,7.8840332e-5 C 41.220466,7.8840332e-5 3.5814188,37.277199 3.5814188,83.517342 c 0,46.239448 37.6390472,83.514578 83.8785102,83.514578 v -34.76691 c -27.242972,0 -48.752347,-22.2219 -48.752347,-48.747668 0,-27.244993 21.509375,-48.748333 48.752347,-48.748333 z"
        fill={color}
      />
    </svg>
  );
}

function KeyIcon({ icon, color }: { icon: string; color: string }) {
  const viewBox = '-2 -2 28 28';
  const common = {
    stroke: color,
    fill: 'none',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    vectorEffect: 'non-scaling-stroke' as const,
  };

  switch (icon) {
    case 'lightspeed':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path {...common} d="M3.5 10.2c5-5 12-5 17 0" />
          <path {...common} d="M6.5 13.2c3.2-3.2 8.8-3.2 12 0" />
          <path {...common} d="M9.5 16.2c1.6-1.6 3.4-1.6 5 0" />
          <circle cx="12" cy="19" r="1.5" fill={color} stroke="none" />
        </svg>
      );
    case 'bluetooth':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path {...common} d="M8.5 5.5 16 12l-7.5 6.5V5.5Z" />
          <path {...common} d="M5 8.5 16 18.5" />
          <path {...common} d="M5 15.5 16 5.5" />
        </svg>
      );
    case 'game-mode':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <circle cx="12" cy="5.8" r="2.8" fill={color} />
          <path d="M12 8.6v6.6" stroke={color} strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M6.5 19c0-1.6 1.3-2.9 2.9-2.9h5.2c1.6 0 2.9 1.3 2.9 2.9 0 .6-.5 1.1-1.1 1.1H7.6c-.6 0-1.1-.5-1.1-1.1Z" fill={color} />
        </svg>
      );
    case 'brightness':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path d="M12 2 13.5 10.5 22 12l-8.5 1.5L12 22l-1.5-8.5L2 12l8.5-1.5Z" fill={color} stroke={color} strokeWidth="0.8" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      );
    case 'prev-track':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path d="M6 5.5v13" stroke={color} strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="m18 6-7 6 7 6V6Z" fill={color} />
          <path d="m12 6-6 6 6 6V6Z" fill={color} />
        </svg>
      );
    case 'play-pause':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path d="m6 5 9 7-9 7V5Z" fill={color} />
          <path d="M18 6v12" stroke={color} strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M21.2 6v12" stroke={color} strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      );
    case 'next-track':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path d="M18 5.5v13" stroke={color} strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="m6 6 7 6-7 6V6Z" fill={color} />
          <path d="m12 6 6 6-6 6V6Z" fill={color} />
        </svg>
      );
    case 'mute':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path d="M4 9h4l5-4.5v15L8 15H4V9Z" fill={color} />
          <path d="m16 9.5 5 5" stroke={color} strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="m21 9.5-5 5" stroke={color} strokeWidth="2.4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      );
    case 'windows':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path d="M3 5.5 10 4v7H3V5.5Zm8 5.5V3.8L21 2v9h-10Zm-8 2h7v7L3 18.5V13Zm8 0h10v9.2L11 20.2V13Z" fill={color} />
        </svg>
      );
    case 'menu-lines':
      return (
        <svg viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden className="w-full h-full" style={{ overflow: 'visible' }}>
          <path {...common} d="M5 7.5h14" />
          <path {...common} d="M5 12h14" />
          <path {...common} d="M5 16.5h14" />
        </svg>
      );
    default:
      return null;
  }
}

function KeycapMesh({
  rect,
  boardWidth,
  boardHeight,
  colors,
  pressed,
}: {
  rect: KeyLayoutRect;
  boardWidth: number;
  boardHeight: number;
  colors: G915Palette;
  pressed: boolean;
}) {
  const isCircle = rect.keyDef.shape === 'circle';
  const isMedia = rect.keyDef.variant === 'media';
  const isModifier = rect.keyDef.isModifier;
  const baseColor = isModifier ? colors.keyMod : colors.key;

  const baseDepth = isCircle ? 7.8 : isMedia ? 7.8 : 9.6;
  const faceDepth = isCircle ? 4.4 : isMedia ? 4.1 : 3.2;
  const downshift = pressed ? -1.2 : 0;

  const radius = isCircle
    ? rect.capWidth / 2
    : Math.max(2.2, Math.min(rect.capWidth, rect.capHeight) * 0.11);
  const faceRadius = isCircle
    ? rect.faceWidth / 2
    : Math.max(1.2, Math.min(rect.faceWidth, rect.faceHeight) * 0.08);

  const baseGeometry = useMemo(() => (
    isCircle
      ? getCircleGeometry(rect.capWidth / 2, baseDepth)
      : getRoundedGeometry(rect.capWidth, rect.capHeight, baseDepth, radius)
  ), [baseDepth, isCircle, radius, rect.capHeight, rect.capWidth]);

  const faceGeometry = useMemo(() => (
    isCircle
      ? getCircleGeometry(rect.faceWidth / 2, faceDepth)
      : getRoundedGeometry(rect.faceWidth, rect.faceHeight, faceDepth, faceRadius)
  ), [faceDepth, faceRadius, isCircle, rect.faceHeight, rect.faceWidth]);

  const glowColor = rect.keyDef.legendColor ?? colors.cyan;
  const baseMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: isCircle ? 0.34 : 0.48,
    metalness: isCircle ? 0.16 : 0.05,
  }), [baseColor, isCircle]);

  const faceMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: isCircle ? '#2a3139' : '#343b44',
    roughness: isCircle ? 0.28 : 0.22,
    metalness: isCircle ? 0.08 : 0.05,
    clearcoat: isCircle ? 0.34 : 0.38,
    clearcoatRoughness: isCircle ? 0.44 : 0.36,
    emissive: new THREE.Color(isCircle ? '#090c10' : '#080b0f'),
    emissiveIntensity: isCircle ? 0.08 : 0.04,
  }), [isCircle]);

  const haloGeometry = useMemo(() => (
    getRoundedGeometry(rect.capWidth * 0.9, rect.capHeight * 0.9, 1.6, Math.max(2, radius))
  ), [radius, rect.capHeight, rect.capWidth]);
  const contactShadowGeometry = useMemo(() => (
    getRoundedGeometry(rect.capWidth * 0.94, rect.capHeight * 0.94, 1.2, Math.max(2, radius))
  ), [radius, rect.capHeight, rect.capWidth]);

  const x = toWorldX(rect.capLeft, rect.capWidth, boardWidth);
  const y = toWorldY(rect.capTop, rect.capHeight, boardHeight);
  const haloOpacity = rect.keyDef.label || rect.keyDef.icon ? 0.05 : 0.02;

  return (
    <group position={[x, y, 24.6 + downshift]}>
      {!isCircle && (
        <mesh geometry={contactShadowGeometry} position={[0, -rect.capHeight * 0.04, -4.8]}>
          <meshBasicMaterial color="#000000" transparent opacity={0.055} />
        </mesh>
      )}
      {!isCircle && (
        <mesh geometry={haloGeometry} position={[0, -rect.capHeight * 0.025, -4.2]}>
          <meshBasicMaterial color={glowColor} transparent opacity={haloOpacity * 0.55} />
        </mesh>
      )}
      <mesh geometry={baseGeometry} castShadow receiveShadow>
        <primitive object={baseMaterial} attach="material" />
      </mesh>
      <mesh geometry={faceGeometry} position={[0, rect.capHeight * 0.01, baseDepth * 0.24 + faceDepth * 0.5]} castShadow receiveShadow>
        <primitive object={faceMaterial} attach="material" />
      </mesh>
      {!(isCircle || isMedia) && (
        <mesh geometry={faceGeometry} position={[0, rect.capHeight * 0.018, baseDepth * 0.24 + faceDepth + 0.25]}>
          <meshBasicMaterial color="#edf3fb" transparent opacity={0.11} />
        </mesh>
      )}
    </group>
  );
}

function HardwareMesh({
  boardWidth,
  boardHeight,
  rect,
  color,
  faceColor,
  depth = 11,
}: {
  boardWidth: number;
  boardHeight: number;
  rect: { left: number; top: number; width: number; height: number; radius: number };
  color: string;
  faceColor?: string;
  depth?: number;
}) {
  const geometry = useMemo(() => getRoundedGeometry(rect.width, rect.height, depth, rect.radius), [depth, rect.height, rect.radius, rect.width]);
  const faceGeometry = useMemo(() => getRoundedGeometry(rect.width - 4, rect.height - 4, Math.max(2, depth - 4), Math.max(2, rect.radius - 2)), [depth, rect.height, rect.radius, rect.width]);
  const x = toWorldX(rect.left, rect.width, boardWidth);
  const y = toWorldY(rect.top, rect.height, boardHeight);

  return (
    <group position={[x, y, 22]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color={color} roughness={0.36} metalness={0.26} />
      </mesh>
      {faceColor && (
        <mesh geometry={faceGeometry} position={[0, 0, depth * 0.2 + 1.2]} castShadow receiveShadow>
          <meshPhysicalMaterial color={faceColor} roughness={0.28} metalness={0.12} clearcoat={0.34} clearcoatRoughness={0.42} />
        </mesh>
      )}
    </group>
  );
}

function RollerMesh({
  boardWidth,
  boardHeight,
  left,
  top,
  width,
  height,
}: {
  boardWidth: number;
  boardHeight: number;
  left: number;
  top: number;
  width: number;
  height: number;
}) {
  const housingGeometry = useMemo(() => getRoundedGeometry(width, height, 12, 10), [height, width]);
  const x = toWorldX(left, width, boardWidth);
  const y = toWorldY(top, height, boardHeight);

  return (
    <group position={[x, y, 22]}>
      <mesh geometry={housingGeometry} castShadow receiveShadow>
        <meshStandardMaterial color="#12171c" roughness={0.42} metalness={0.18} />
      </mesh>
      <mesh position={[0, 0, 4.4]}>
        <boxGeometry args={[width * 0.78, height * 0.54, 5.4]} />
        <meshStandardMaterial color="#07090c" roughness={0.56} metalness={0.1} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 8.2]}>
        <cylinderGeometry args={[height * 0.24, height * 0.24, width * 0.68, 44]} />
        <meshStandardMaterial color="#6f7882" roughness={0.24} metalness={0.82} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 8.25]}>
        <torusGeometry args={[height * 0.19, height * 0.03, 12, 48]} />
        <meshStandardMaterial color="#1a2026" roughness={0.56} metalness={0.16} />
      </mesh>
    </group>
  );
}

function G915BoardScene({
  boardWidth,
  boardHeight,
  unitSize,
  caseStyle,
  colors,
  positionedKeys,
  pressedKeys,
  capsLockOn,
}: {
  boardWidth: number;
  boardHeight: number;
  unitSize: number;
  caseStyle: CaseStyle;
  colors: G915Palette;
  positionedKeys: KeyLayoutRect[];
  pressedKeys: Set<string>;
  capsLockOn: boolean;
}) {
  const header = useMemo(() => getHeaderMetrics(caseStyle, unitSize), [caseStyle, unitSize]);
  const shellGeometry = useMemo(() => getRoundedGeometry(boardWidth, boardHeight, 22, 14), [boardHeight, boardWidth]);
  const plateGeometry = useMemo(() => getRoundedGeometry(boardWidth - 8, boardHeight - 8, 16, 12), [boardHeight, boardWidth]);
  const plateSheenGeometry = useMemo(() => getRoundedGeometry(boardWidth - 18, boardHeight - 18, 2.2, 10), [boardHeight, boardWidth]);
  const shadowGeometry = useMemo(() => getRoundedGeometry(boardWidth + 18, boardHeight + 20, 2, 18), [boardHeight, boardWidth]);
  const shellTexture = useMemo(
    () => createBrushedTexture('#444b53', '#6a727b', '#313840'),
    []
  );
  const plateTexture = useMemo(
    () => createBrushedTexture('#5b636d', '#7a838d', '#464d56'),
    []
  );

  return (
    <group position={[0, 0, 0]}>
      <ambientLight intensity={1.22} color="#dfe7f0" />
      <hemisphereLight intensity={0.72} groundColor="#161b21" color="#dbe3ed" />
      <spotLight
        position={[-boardWidth * 0.18, boardHeight * 0.42, 320]}
        angle={0.58}
        penumbra={0.52}
        intensity={2.18}
        color="#f7fbff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00003}
      />
      <directionalLight position={[boardWidth * 0.22, -boardHeight * 0.18, 220]} intensity={0.62} color="#b5c7dc" />
      <pointLight position={[-boardWidth * 0.22, -boardHeight * 0.18, 140]} intensity={0.28} color="#4fc5e0" />

      <mesh geometry={shadowGeometry} position={[0, -12, -16]}>
        <meshBasicMaterial color="#000000" transparent opacity={0.14} />
      </mesh>

      <mesh geometry={shellGeometry} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={colors.shellB} roughness={0.3} metalness={0.56} map={shellTexture ?? undefined} />
      </mesh>
      <mesh geometry={plateGeometry} position={[0, 0, 9]} castShadow receiveShadow>
        <meshPhysicalMaterial color={colors.shellA} roughness={0.18} metalness={0.68} clearcoat={0.2} clearcoatRoughness={0.44} map={plateTexture ?? undefined} />
      </mesh>
      <mesh geometry={plateSheenGeometry} position={[0, 0, 17.1]} receiveShadow>
        <meshBasicMaterial color="#eef4fb" transparent opacity={0.1} />
      </mesh>

      <HardwareMesh
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        rect={{ left: header.badgeLeft, top: header.badgeTop, width: header.badgeWidth, height: header.badgeHeight, radius: 10 }}
        color="#1d2228"
        faceColor="#262d35"
        depth={10}
      />
      <RollerMesh
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        left={header.rollerLeft}
        top={header.rollerTop}
        width={header.rollerWidth}
        height={header.rollerHeight}
      />

      <mesh position={[toWorldX(header.indicatorLeft, 6, boardWidth), toWorldY(header.indicatorTop, 6, boardHeight), 29]}>
        <sphereGeometry args={[2.35, 16, 16]} />
        <meshBasicMaterial color="#2d3239" />
      </mesh>
      <mesh position={[toWorldX(header.indicatorLeft, 6, boardWidth), toWorldY(header.indicatorTop + 18, 6, boardHeight), 29]}>
        <sphereGeometry args={[2.15, 16, 16]} />
        <meshBasicMaterial color={capsLockOn ? colors.green : '#2d3239'} />
      </mesh>
      {capsLockOn && (
        <mesh position={[toWorldX(header.indicatorLeft, 11, boardWidth), toWorldY(header.indicatorTop + 13, 11, boardHeight), 25.4]}>
          <circleGeometry args={[5.1, 28]} />
          <meshBasicMaterial color={colors.green} transparent opacity={0.08} />
        </mesh>
      )}

      {capsLockOn && (
        <pointLight
          position={[toWorldX(header.indicatorLeft, 6, boardWidth), toWorldY(header.indicatorTop + 18, 6, boardHeight), 38]}
          intensity={0.14}
          distance={42}
          color={colors.green}
        />
      )}

      {positionedKeys.map((rect) => (
        <KeycapMesh
          key={rect.keyDef.code}
          rect={rect}
          boardWidth={boardWidth}
          boardHeight={boardHeight}
          colors={colors}
          pressed={pressedKeys.has(rect.keyDef.code)}
        />
      ))}
    </group>
  );
}

function LegendContent({
  keyDef,
  legendColor,
  unitSize,
  faceWidth,
  faceHeight,
}: {
  keyDef: KeyDef;
  legendColor: string;
  unitSize: number;
  faceWidth: number;
  faceHeight: number;
}) {
  const glow = `0 0 ${Math.max(4, unitSize * 0.24)}px ${withAlpha(legendColor, 0.22)}`;
  const labelLength = keyDef.label.length;
  const widthSafeFontSize = faceWidth / Math.max(1.8, labelLength * 0.62);
  const heightSafeFontSize = faceHeight * 0.48;
  const baseFontSize = Math.max(
    7,
    Math.min(
      heightSafeFontSize,
      widthSafeFontSize,
      unitSize * (
        labelLength > 7
          ? 0.145
          : labelLength > 5
            ? 0.158
            : labelLength > 3
              ? 0.176
              : 0.2
      )
    )
  );
  const letterSpacing = labelLength > 5 ? '0.04em' : labelLength > 3 ? '0.02em' : '0';

  if (keyDef.icon) {
    const fit = iconOpticalFit[keyDef.icon] ?? { scale: 1, x: 0, y: 0 };
    const iconSize = keyDef.shape === 'circle'
      ? Math.max(13, Math.min(faceWidth, faceHeight) * 0.64)
      : Math.max(12, Math.min(faceWidth, faceHeight) * 0.7);

    return (
      <div className="flex items-center justify-center w-full h-full">
        <div
          style={{
            width: iconSize,
            height: iconSize,
            filter: `drop-shadow(${glow})`,
            padding: keyDef.shape === 'circle' ? 1.5 : 0,
            overflow: 'visible',
            transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})`,
            transformOrigin: 'center center',
          }}
        >
          <KeyIcon icon={keyDef.icon} color={legendColor} />
        </div>
      </div>
    );
  }

  if (keyDef.label2) {
    const topFontSize = Math.max(9, Math.min(faceHeight * 0.42, faceWidth * 0.36, unitSize * 0.22));
    const bottomFontSize = Math.max(7, Math.min(faceHeight * 0.24, faceWidth * 0.22, unitSize * 0.13));

    return (
      <div className="relative w-full h-full">
        <span
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: Math.max(2, unitSize * 0.06),
            color: legendColor,
            fontSize: topFontSize,
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: '0.01em',
            whiteSpace: 'nowrap',
            textShadow: glow,
          }}
        >
          {keyDef.label}
        </span>
        <span
          className="absolute"
          style={{
            left: Math.max(2, unitSize * 0.04),
            bottom: Math.max(1, unitSize * 0.02),
            color: legendColor,
            opacity: 0.8,
            fontSize: bottomFontSize,
            fontWeight: 600,
            lineHeight: 1,
            whiteSpace: 'nowrap',
            textShadow: glow,
          }}
        >
          {keyDef.label2}
        </span>
      </div>
    );
  }

  return (
    <span
      className="text-center"
      style={{
        color: legendColor,
        fontSize: baseFontSize,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing,
        whiteSpace: 'nowrap',
        textShadow: glow,
      }}
    >
      {keyDef.label}
    </span>
  );
}

function KeyLegendLayer({
  unitSize,
  caseStyle,
  colors,
  fontStack,
  positionedKeys,
  pressedKeys,
  onPressStart,
  onPressEnd,
}: {
  unitSize: number;
  caseStyle: CaseStyle;
  colors: G915Palette;
  fontStack: string;
  positionedKeys: KeyLayoutRect[];
  pressedKeys: Set<string>;
  onPressStart: (code: string) => void;
  onPressEnd: (code: string) => void;
}) {
  const header = useMemo(() => getHeaderMetrics(caseStyle, unitSize), [caseStyle, unitSize]);

  return (
    <div className="absolute inset-0" style={{ fontFamily: fontStack }}>
      {positionedKeys.map((rect) => {
        const { keyDef } = rect;
        const pressed = pressedKeys.has(keyDef.code);
        const legendColor = keyDef.legendColor ?? colors.white;

        return (
          <button
            key={keyDef.code}
            type="button"
            tabIndex={-1}
            aria-label={keyDef.label || keyDef.code}
            data-key-code={keyDef.code}
            className="absolute border-0 bg-transparent p-0"
            style={{
              left: rect.faceLeft,
              top: rect.faceTop,
              width: rect.faceWidth,
              height: rect.faceHeight,
              transform: pressed ? 'translateY(1px)' : 'translateY(0)',
              transition: 'transform 70ms ease-out',
              overflow: 'visible',
            }}
            onPointerDown={(event) => {
              event.preventDefault();
              onPressStart(keyDef.code);
            }}
            onPointerUp={() => onPressEnd(keyDef.code)}
            onPointerLeave={() => onPressEnd(keyDef.code)}
            >
              <div
                className={`absolute flex leading-none ${
                  keyDef.label2
                    ? ''
                  : keyDef.icon
                    ? 'items-center justify-center'
                    : 'items-center justify-center'
              }`}
              style={{
                inset: 0,
                pointerEvents: 'none',
                overflow: 'visible',
              }}
            >
              <LegendContent
                keyDef={keyDef}
                legendColor={legendColor}
                unitSize={unitSize}
                faceWidth={rect.faceWidth}
                faceHeight={rect.faceHeight}
              />
            </div>
          </button>
        );
      })}

      <div
        className="absolute pointer-events-none"
        style={{
          left: header.logoLeft,
          top: header.logoTop,
          width: header.logoSize,
          height: header.logoSize,
          filter: `drop-shadow(0 0 ${Math.max(4, unitSize * 0.2)}px ${withAlpha(colors.cyan, 0.3)})`,
        }}
      >
        <GLogo color={colors.cyan} />
      </div>
    </div>
  );
}

function HeaderOverlay({
  unitSize,
  caseStyle,
  capsLockOn,
}: {
  unitSize: number;
  caseStyle: CaseStyle;
  capsLockOn: boolean;
}) {
  const header = useMemo(() => getHeaderMetrics(caseStyle, unitSize), [caseStyle, unitSize]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div
        className="absolute"
        style={{
          left: header.badgeLeft,
          top: header.badgeTop,
          width: header.badgeWidth,
          height: header.badgeHeight,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#838d97',
          fontSize: Math.max(6.5, unitSize * 0.116),
          letterSpacing: 0.78,
          textShadow: '0 1px 0 rgba(0,0,0,0.4)',
        }}
      >
        <div style={{ width: Math.max(12, unitSize * 0.3), height: Math.max(12, unitSize * 0.3), opacity: 0.55, marginBottom: Math.max(3, unitSize * 0.06) }}>
          <KeyIcon icon="lightspeed" color="#68727d" />
        </div>
        <div>LIGHTSPEED</div>
      </div>

      <div
        className="absolute"
        style={{
          left: header.indicatorLeft + 10,
          top: header.indicatorTop - 2,
          color: '#6d7781',
          fontSize: Math.max(6, unitSize * 0.142),
          fontWeight: 500,
          letterSpacing: 0.25,
          lineHeight: 1.6,
          textShadow: '0 1px 0 rgba(0,0,0,0.45)',
        }}
      >
        <div>BATTERY</div>
        <div style={{ marginTop: 6, color: capsLockOn ? '#a7ef9c' : '#6d7781' }}>CAPS LOCK</div>
      </div>
    </div>
  );
}

export function G915TKL3DStage({
  layout,
  caseStyle,
  colors,
  fontStack,
  pressedKeys,
  lockKeys,
  onKeyDown,
  onKeyUp,
  onLockKeyToggle,
  maxWidth,
  unitSizeCap = 48,
}: G915TKL3DStageProps) {
  const [mousePressed, setMousePressed] = useState<Set<string>>(new Set());
  const capsLockOn = lockKeys?.has('CapsLock') ?? false;

  useEffect(() => {
    const handlePointerUp = () => {
      if (mousePressed.size === 0) return;
      mousePressed.forEach((code) => onKeyUp?.(code));
      setMousePressed(new Set());
    };
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, [mousePressed, onKeyUp]);

  const canvasMaxWidth = maxWidth ?? 900;
  const viewportPadX = Math.max(14, Math.min(20, canvasMaxWidth * 0.02));
  const viewportPadY = Math.max(18, Math.min(24, canvasMaxWidth * 0.024));
  const availableBoardWidth = Math.max(120, canvasMaxWidth - viewportPadX * 2);
  const unitSize = Math.max(4, Math.min(unitSizeCap, (availableBoardWidth - caseStyle.padX * 2) / layout.width));
  const boardWidth = layout.width * unitSize + caseStyle.padX * 2;
  const boardHeight = layout.height * unitSize + caseStyle.padTop + caseStyle.padBottom;

  const positionedKeys = useMemo<KeyLayoutRect[]>(() => {
    const gapRatio = caseStyle.gapRatio ?? 0.04;

    return layout.keys.map((keyDef) => {
      const keyWidth = (keyDef.w || 1) * unitSize;
      const keyHeight = (keyDef.h || 1) * unitSize;
      const gap = unitSize * gapRatio * (keyDef.variant === 'media' ? 0.72 : 1);
      const capLeft = caseStyle.padX + keyDef.x * unitSize + gap;
      const capTop = caseStyle.padTop + keyDef.y * unitSize + gap;
      const capWidth = keyWidth - gap * 2;
      const capHeight = keyHeight - gap * 2;
      const faceInsets = getFaceInsets(keyDef, unitSize);
      const faceLeft = capLeft + faceInsets.x;
      const faceTop = capTop + faceInsets.top;
      const faceWidth = capWidth - faceInsets.x * 2;
      const faceHeight = capHeight - faceInsets.top - faceInsets.bottom;

      return {
        keyDef,
        left: caseStyle.padX + keyDef.x * unitSize,
        top: caseStyle.padTop + keyDef.y * unitSize,
        width: keyWidth,
        height: keyHeight,
        gap,
        capLeft,
        capTop,
        capWidth,
        capHeight,
        faceLeft,
        faceTop,
        faceWidth,
        faceHeight,
        faceInsets,
        centerX: capLeft + capWidth / 2,
        centerY: capTop + capHeight / 2,
      };
    });
  }, [caseStyle.gapRatio, caseStyle.padTop, caseStyle.padX, layout.keys, unitSize]);

  const mergedPressed = useMemo(() => {
    const next = new Set<string>(pressedKeys);
    mousePressed.forEach((code) => next.add(code));
    return next;
  }, [mousePressed, pressedKeys]);

  const handlePressStart = (code: string) => {
    setMousePressed((prev) => {
      if (prev.has(code)) return prev;
      const next = new Set(prev);
      next.add(code);
      return next;
    });
    const lockCode = getLockCodeForKey(code);
    if (lockCode) onLockKeyToggle?.(lockCode);
    onKeyDown?.(code);
  };

  const handlePressEnd = (code: string) => {
    setMousePressed((prev) => {
      if (!prev.has(code)) return prev;
      const next = new Set(prev);
      next.delete(code);
      return next;
    });
    onKeyUp?.(code);
  };

  return (
    <div
      data-keyboard-canvas
      className="relative mx-auto"
      style={{
        width: boardWidth + viewportPadX * 2,
        height: boardHeight + viewportPadY * 2,
        minWidth: boardWidth + viewportPadX * 2,
        overflow: 'visible',
      }}
    >
      <div
        className="absolute"
        style={{
          left: viewportPadX,
          top: viewportPadY,
          width: boardWidth,
          height: boardHeight,
          transform: 'scale(1)',
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          filter: 'drop-shadow(0 14px 22px rgba(0,0,0,0.18))',
        }}
      >
        <Canvas
          shadows
          orthographic
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 1000], zoom: 1, near: 0.1, far: 4000 }}
          onCreated={({ gl }) => {
            gl.toneMappingExposure = 1.18;
          }}
          style={{ position: 'absolute', inset: 0 }}
        >
          <G915BoardScene
            boardWidth={boardWidth}
            boardHeight={boardHeight}
            unitSize={unitSize}
            caseStyle={caseStyle}
            colors={colors}
            positionedKeys={positionedKeys}
            pressedKeys={mergedPressed}
            capsLockOn={capsLockOn}
          />
        </Canvas>

        <HeaderOverlay
          unitSize={unitSize}
          caseStyle={caseStyle}
          capsLockOn={capsLockOn}
        />

        <KeyLegendLayer
          unitSize={unitSize}
          caseStyle={caseStyle}
          colors={colors}
          fontStack={fontStack}
          positionedKeys={positionedKeys}
          pressedKeys={mergedPressed}
          onPressStart={handlePressStart}
          onPressEnd={handlePressEnd}
        />
      </div>
    </div>
  );
}
