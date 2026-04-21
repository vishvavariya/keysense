'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { keyboards } from '@/data/keyboards';
import { KeyboardStage, getModel } from '@/keyboards/_base';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useSound } from '@/components/providers/SoundProvider';

function Selector({ value, onChange, label, options }: { value: string; onChange: (v: string) => void; label: string; options: { id: string; brand: string; model: string }[] }) {
  return (
    <div>
      <label className="text-[10px] text-white/30 uppercase tracking-widest block mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl text-sm bg-white/[0.04] border border-white/[0.08] text-white/70 outline-none cursor-pointer hover:bg-white/[0.06] transition-colors"
      >
        {options.map((kb) => (
          <option key={kb.id} value={kb.id} className="bg-zinc-900">
            {kb.brand} {kb.model}
          </option>
        ))}
      </select>
    </div>
  );
}

function SpecRow({ label, left, right }: { label: string; left: string; right: string }) {
  return (
    <div className="grid grid-cols-3 py-2 border-b border-white/[0.04] last:border-0 text-xs">
      <span className="text-white/40">{label}</span>
      <span className="text-white/70 text-center font-medium">{left}</span>
      <span className="text-white/70 text-center font-medium">{right}</span>
    </div>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const { pressedKeys, lockKeys, setOnKeyDown, toggleLockKey } = useKeyPress();
  const { playKeySound } = useSound();
  const [leftId, setLeftId] = useState(searchParams.get('left') || keyboards[0].id);
  const [rightId, setRightId] = useState(searchParams.get('right') || keyboards[2]?.id || keyboards[0].id);
  const leftKb = keyboards.find((k) => k.id === leftId) || keyboards[0];
  const rightKb = keyboards.find((k) => k.id === rightId) || keyboards[0];
  const leftModel = getModel(leftKb.id);
  const rightModel = getModel(rightKb.id);
  const [containerWidth, setContainerWidth] = useState(600);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOnKeyDown(() => {
      if (leftModel) playKeySound(leftModel.sound);
      else playKeySound(leftKb.soundProfile);
      setTimeout(() => {
        if (rightModel) playKeySound(rightModel.sound);
        else playKeySound(rightKb.soundProfile);
      }, 30);
    });
  }, [setOnKeyDown, playKeySound, leftKb.soundProfile, rightKb.soundProfile, leftModel, rightModel]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const kbWidth = Math.min(containerWidth, 580);

  return (
    <div className="min-h-screen" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white/90">Compare Keyboards</h1>
          <p className="text-sm text-white/40 mt-2">Type on your keyboard to hear both side by side</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Selector value={leftId} onChange={setLeftId} label="Keyboard A" options={keyboards} />
          <Selector value={rightId} onChange={setRightId} label="Keyboard B" options={keyboards} />
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="text-center mb-3">
              <p className="text-sm font-medium text-white/60">{leftKb.brand} <span className="text-white/80">{leftKb.model}</span></p>
              <p className="text-[10px] text-white/30 capitalize">{leftKb.switchType} • {leftKb.soundProfile}</p>
            </div>
            <div className="overflow-x-auto pb-4">
              <KeyboardStage
                keyboardId={leftKb.id}
                pressedKeys={pressedKeys}
                lockKeys={lockKeys}
                onKeyDown={() => (leftModel ? playKeySound(leftModel.sound) : playKeySound(leftKb.soundProfile))}
                onLockKeyToggle={toggleLockKey}
                maxWidth={kbWidth}
              />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <div className="text-center mb-3">
              <p className="text-sm font-medium text-white/60">{rightKb.brand} <span className="text-white/80">{rightKb.model}</span></p>
              <p className="text-[10px] text-white/30 capitalize">{rightKb.switchType} • {rightKb.soundProfile}</p>
            </div>
            <div className="overflow-x-auto pb-4">
              <KeyboardStage
                keyboardId={rightKb.id}
                pressedKeys={pressedKeys}
                lockKeys={lockKeys}
                onKeyDown={() => (rightModel ? playKeySound(rightModel.sound) : playKeySound(rightKb.soundProfile))}
                onLockKeyToggle={toggleLockKey}
                maxWidth={kbWidth}
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <h2 className="text-lg font-semibold text-white/80 mb-4">Spec Comparison</h2>
          <div className="grid grid-cols-3 pb-2 border-b border-white/[0.08] text-[10px] text-white/30 uppercase tracking-widest">
            <span>Spec</span>
            <span className="text-center">{leftKb.brand}</span>
            <span className="text-center">{rightKb.brand}</span>
          </div>
          <SpecRow label="Switch" left={leftKb.switchType} right={rightKb.switchType} />
          <SpecRow label="Sound" left={leftKb.soundProfile} right={rightKb.soundProfile} />
          <SpecRow label="Layout" left={leftKb.layoutType} right={rightKb.layoutType} />
          <SpecRow label="Keycaps" left={leftKb.keycaps} right={rightKb.keycaps} />
          <SpecRow label="Connectivity" left={leftKb.connectivity} right={rightKb.connectivity} />
          <SpecRow label="Weight" left={leftKb.weight} right={rightKb.weight} />
          <SpecRow label="Price" left={`$${leftKb.price}`} right={`$${rightKb.price}`} />
        </motion.div>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white/30">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}
