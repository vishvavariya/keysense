'use client';

import React, { useEffect, useRef, useState, use } from 'react';
import { motion } from 'framer-motion';
import { getKeyboardById } from '@/data/keyboards';
import { KeyboardStage, getModel } from '@/keyboards/_base';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useSound } from '@/components/providers/SoundProvider';
import { SwitchSound } from '@/lib/types';
import Link from 'next/link';

const soundProfiles: { type: SwitchSound; label: string; desc: string }[] = [
  { type: 'linear', label: 'Linear', desc: 'Smooth & quiet' },
  { type: 'tactile', label: 'Tactile', desc: 'Bump feedback' },
  { type: 'clicky', label: 'Clicky', desc: 'Sharp click' },
];

export default function KeyboardDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const keyboard = getKeyboardById(id);
  const model = getModel(id);
  const { pressedKeys, lockKeys, setOnKeyDown, toggleLockKey } = useKeyPress();
  const { playKeySound } = useSound();
  const [activeSound, setActiveSound] = useState<SwitchSound>(keyboard?.soundProfile || 'linear');
  const [containerWidth, setContainerWidth] = useState(900);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOnKeyDown(() => {
      const variant = model?.soundVariants?.[activeSound];
      if (variant) {
        playKeySound(variant);
      } else if (model && model.sound.base === activeSound) {
        playKeySound(model.sound);
      } else {
        playKeySound(activeSound);
      }
    });
  }, [setOnKeyDown, playKeySound, activeSound, model]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!keyboard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-white/50 mb-4">Keyboard not found</p>
          <Link href="/" className="text-violet-400 hover:text-violet-300 text-sm">← Back to home</Link>
        </div>
      </div>
    );
  }

  const categoryColors: Record<string, string> = {
    gaming: 'text-red-400',
    productivity: 'text-blue-400',
    enthusiast: 'text-purple-400',
    budget: 'text-green-400',
  };

  const availableSoundProfiles = keyboard.supportedSoundProfiles ?? [keyboard.soundProfile];
  const hasSoundOptions = availableSoundProfiles.length > 1;

  const playActiveSound = () => {
    const variant = model?.soundVariants?.[activeSound];
    if (variant) playKeySound(variant);
    else if (model && model.sound.base === activeSound) playKeySound(model.sound);
    else playKeySound(activeSound);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="flex items-center gap-2 text-xs text-white/30">
          <Link href="/" className="hover:text-white/50 transition-colors">Keyboards</Link>
          <span>/</span>
          <span className="text-white/50">{keyboard.brand} {keyboard.model}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <p className="text-xs text-white/30 uppercase tracking-widest font-medium">{keyboard.brand}</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-white/90 mt-1">{keyboard.model}</h1>
            <p className="text-sm text-white/40 mt-2 max-w-lg">{keyboard.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-white/80">${keyboard.price}</span>
            <span className={`text-xs px-3 py-1 rounded-full border border-white/10 font-medium capitalize ${categoryColors[keyboard.category]}`}>
              {keyboard.category}
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={containerRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 py-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        <div className="overflow-x-auto pb-4">
          <KeyboardStage
            keyboardId={keyboard.id}
            pressedKeys={pressedKeys}
            lockKeys={lockKeys}
            onKeyDown={playActiveSound}
            onLockKeyToggle={toggleLockKey}
            maxWidth={Math.min(containerWidth, 1000)}
          />
        </div>
        <p className="text-center text-xs text-white/20 mt-3 hidden sm:block">
          Type on your keyboard or click keys to hear the sound
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className={`grid grid-cols-1 ${hasSoundOptions ? 'lg:grid-cols-2' : ''} gap-8`}>
          {hasSoundOptions && (
            <motion.div
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <h2 className="text-lg font-semibold text-white/80 mb-4">Sound Profile</h2>
              <div className="space-y-3">
                {soundProfiles
                  .filter((sp) => availableSoundProfiles.includes(sp.type))
                  .map((sp) => (
                    <button
                      key={sp.type}
                      onClick={() => setActiveSound(sp.type)}
                      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                        activeSound === sp.type
                          ? 'border-violet-500/40 bg-violet-500/10'
                          : 'border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className="text-left">
                        <p className={`text-sm font-medium ${activeSound === sp.type ? 'text-violet-300' : 'text-white/70'}`}>
                          {sp.label}
                        </p>
                        <p className="text-xs text-white/30 mt-0.5">{sp.desc}</p>
                      </div>
                      {activeSound === sp.type && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-5 h-5 rounded-full bg-violet-500 flex items-center justify-center"
                        >
                          <span className="text-white text-xs">✓</span>
                        </motion.div>
                      )}
                      {keyboard.soundProfile === sp.type && activeSound !== sp.type && (
                        <span className="text-[10px] text-white/20">Stock</span>
                      )}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}

          <motion.div
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
            initial={{ opacity: 0, x: hasSoundOptions ? 20 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-semibold text-white/80 mb-4">Specifications</h2>
            <div className="space-y-3">
              {[
                ['Switch', keyboard.switchType],
                ['Sound', keyboard.soundProfile],
                ['Layout', keyboard.layoutType.toUpperCase().replace('-', ' ')],
                ['Keycaps', keyboard.keycaps],
                ['Connectivity', keyboard.connectivity],
                ['Weight', keyboard.weight],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <span className="text-xs text-white/40">{label}</span>
                  <span className="text-sm text-white/70 font-medium">{value}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-xs text-white/30 mb-2">Features</p>
              <div className="flex flex-wrap gap-2">
                {keyboard.features.map((f) => (
                  <span key={f} className="text-[11px] px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/50">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/compare?left=${keyboard.id}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white/80 hover:bg-white/5 transition-colors"
          >
            Compare with another keyboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
