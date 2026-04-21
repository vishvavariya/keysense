'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { keyboards } from '@/data/keyboards';
import { KeyboardStage, getModel } from '@/keyboards/_base';
import { useKeyPress } from '@/hooks/useKeyPress';
import { useSound } from '@/components/providers/SoundProvider';
import { useTypingTest } from '@/hooks/useTypingTest';

export default function TypingTestPage() {
  const { pressedKeys, lockKeys, setOnKeyDown, toggleLockKey } = useKeyPress();
  const { playKeySound } = useSound();
  const defaultIdx = Math.max(0, keyboards.findIndex((k) => k.id === 'keychron-q1-pro'));
  const [selectedKb, setSelectedKb] = useState(keyboards[defaultIdx] || keyboards[0]);
  const selectedModel = getModel(selectedKb.id);
  const { text, input, started, finished, wpm, accuracy, elapsed, handleChar, handleBackspace, reset } = useTypingTest();
  const [containerWidth, setContainerWidth] = useState(900);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOnKeyDown((code: string) => {
      if (selectedModel) playKeySound(selectedModel.sound);
      else playKeySound(selectedKb.soundProfile);

      if (code === 'Backspace') {
        handleBackspace();
        return;
      }

      const codeToChar: Record<string, string> = {
        Space: ' ', Comma: ',', Period: '.', Slash: '/', Semicolon: ';',
        Quote: "'", Minus: '-', Equal: '=',
        BracketLeft: '[', BracketRight: ']', Backslash: '\\',
      };

      if (codeToChar[code]) handleChar(codeToChar[code]);
      else if (code.startsWith('Key')) handleChar(code[3].toLowerCase());
      else if (code.startsWith('Digit')) handleChar(code[5]);
    });
  }, [setOnKeyDown, playKeySound, selectedKb, selectedModel, handleChar, handleBackspace]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const renderText = () => {
    return text.split('').map((char, i) => {
      let className = 'text-white/25';
      if (i < input.length) className = input[i] === char ? 'text-green-400' : 'text-red-400 bg-red-400/10';
      else if (i === input.length) className = 'text-white/80 border-b-2 border-violet-500';
      return (
        <span key={i} className={`${className} transition-colors duration-75`}>
          {char === ' ' && i < input.length && input[i] !== char ? '·' : char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl sm:text-3xl font-bold text-white/90">Typing Test</h1>
          <p className="text-sm text-white/40 mt-2">Test your speed while hearing your favorite keyboard</p>
        </motion.div>

        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <select
            value={selectedKb.id}
            onChange={(e) => setSelectedKb(keyboards.find((k) => k.id === e.target.value) || keyboards[0])}
            className="px-4 py-2.5 rounded-xl text-sm bg-white/[0.04] border border-white/[0.08] text-white/70 outline-none cursor-pointer hover:bg-white/[0.06] transition-colors"
          >
            {keyboards.map((kb) => (
              <option key={kb.id} value={kb.id} className="bg-zinc-900">
                {kb.brand} {kb.model}
              </option>
            ))}
          </select>

          <motion.button
            onClick={reset}
            className="px-4 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white/50 hover:text-white/70 hover:bg-white/5 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            Reset ↻
          </motion.button>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          {[
            { label: 'WPM', value: started ? wpm : '—', color: 'text-violet-400' },
            { label: 'Accuracy', value: started ? `${accuracy}%` : '—', color: 'text-emerald-400' },
            { label: 'Time', value: started ? `${elapsed.toFixed(1)}s` : '—', color: 'text-amber-400' },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-center">
              <p className="text-xs text-white/30 mb-1">{stat.label}</p>
              <p className={`text-2xl sm:text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <motion.div
          className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          {finished ? (
            <div className="text-center py-8">
              <p className="text-4xl mb-4">🎉</p>
              <p className="text-xl font-bold text-white/80">Test Complete!</p>
              <div className="mt-4 flex justify-center gap-8 text-sm">
                <div><span className="text-white/30">Speed: </span><span className="text-violet-400 font-bold text-lg">{wpm} WPM</span></div>
                <div><span className="text-white/30">Accuracy: </span><span className="text-emerald-400 font-bold text-lg">{accuracy}%</span></div>
              </div>
              <motion.button
                onClick={reset}
                className="mt-6 px-6 py-3 rounded-xl text-sm font-semibold bg-violet-600 text-white hover:bg-violet-500 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                Try Again
              </motion.button>
            </div>
          ) : (
            <div>
              <p className="text-sm text-white/30 mb-4">
                {started ? 'Keep typing...' : 'Start typing to begin the test'}
              </p>
              <p className="text-lg sm:text-xl leading-relaxed font-mono tracking-wide break-words">
                {renderText()}
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          className="mt-8 overflow-x-auto pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <KeyboardStage
            keyboardId={selectedKb.id}
            pressedKeys={pressedKeys}
            lockKeys={lockKeys}
            onKeyDown={() => (selectedModel ? playKeySound(selectedModel.sound) : playKeySound(selectedKb.soundProfile))}
            onLockKeyToggle={toggleLockKey}
            maxWidth={Math.min(containerWidth, 950)}
          />
        </motion.div>
      </div>
    </div>
  );
}
