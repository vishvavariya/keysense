'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { keyboards, brands } from '@/data/keyboards';
import { KeyboardCard } from '@/components/ui/KeyboardCard';
import { FilterBar } from '@/components/ui/FilterBar';
import { KeyboardStage, getModel } from '@/keyboards/_base';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useSound } from '@/components/providers/SoundProvider';

export default function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const { pressedKeys, lockKeys, setOnKeyDown, toggleLockKey } = useKeyPress();
  const { playKeySound } = useSound();
  const [heroKbIndex, setHeroKbIndex] = useState(
    keyboards.findIndex((kb) => kb.id === 'keychron-q1-pro') >= 0
      ? keyboards.findIndex((kb) => kb.id === 'keychron-q1-pro')
      : 0
  );
  const heroKb = keyboards[heroKbIndex];
  const heroModel = getModel(heroKb.id);
  const [containerWidth, setContainerWidth] = useState(900);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOnKeyDown(() => {
      if (heroModel) playKeySound(heroModel.sound);
      else playKeySound(heroKb.soundProfile);
    });
  }, [setOnKeyDown, playKeySound, heroKb.soundProfile, heroModel]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filtered = keyboards.filter((kb) => {
    if (selectedBrand !== 'all' && kb.brand !== selectedBrand) return false;
    return true;
  });

  const cycleHeroKb = useCallback(() => {
    setHeroKbIndex((prev) => (prev + 1) % keyboards.length);
  }, []);

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-950/20 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12">
          <motion.div
            className="text-center mb-10 sm:mb-14"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-white/90">Feel Every </span>
              <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                Keystroke
              </span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/40 max-w-xl mx-auto leading-relaxed">
              Experience real keyboards digitally. See, press, and hear {keyboards.length} keyboards
              from the world&apos;s top brands — compared side by side.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              <motion.button
                onClick={() => document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Browse Keyboards
              </motion.button>
              <motion.button
                onClick={cycleHeroKb}
                className="px-6 py-3 rounded-xl text-sm font-medium border border-white/10 text-white/60 hover:text-white/80 hover:bg-white/5 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Try Another ↻
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            ref={containerRef}
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="text-center mb-4">
              <span className="text-xs text-white/30 uppercase tracking-widest">Now playing</span>
              <p className="text-sm text-white/60 font-medium mt-1">
                {heroKb.brand} {heroKb.model}
                <span className="text-white/30 ml-2">• {heroKb.switchType} • {heroKb.soundProfile}</span>
              </p>
            </div>
            <div className="overflow-x-auto pb-4">
              <KeyboardStage
                keyboardId={heroKb.id}
                pressedKeys={pressedKeys}
                lockKeys={lockKeys}
                onKeyDown={() => heroModel && playKeySound(heroModel.sound)}
                onLockKeyToggle={toggleLockKey}
                maxWidth={Math.min(containerWidth, 900)}
              />
            </div>
            <p className="text-center text-xs text-white/20 mt-4 hidden sm:block">
              ↑ Start typing on your keyboard to hear it ↑
            </p>
          </motion.div>
        </div>
      </section>

      <section id="browse" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <h2 className="text-2xl sm:text-3xl font-bold text-white/90 mb-2">Explore Keyboards</h2>
          <p className="text-sm text-white/40 mb-8">
            {keyboards.length} curated keyboards across {brands.length} brands
          </p>

          <FilterBar
            brands={brands}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
          />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((kb) => (
              <KeyboardCard key={kb.id} keyboard={kb} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-white/30">
              <p className="text-4xl mb-3">🔍</p>
              <p>No keyboards match your filters</p>
            </div>
          )}
        </motion.div>
      </section>

      <footer className="border-t border-white/[0.06] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <span>© 2026 KeySense. Built for keyboard enthusiasts.</span>
          <span>Per-model visuals, profiles & sound signatures.</span>
        </div>
      </footer>
    </div>
  );
}
