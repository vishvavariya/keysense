'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useSoundEngine } from '@/hooks/useSoundEngine';
import { SwitchSound } from '@/lib/types';
import { SoundSignature } from '@/keyboards/_base/types';

interface SoundContextValue {
  playKeySound: (profileOrSig: SwitchSound | SoundSignature, soundUrl?: string) => void;
  volume: number;
  muted: boolean;
  setVolume: (v: number) => void;
  toggleMute: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const engine = useSoundEngine();
  const [volume, setVolumeState] = useState(0.7);
  const [muted, setMutedState] = useState(false);

  const setVolume = useCallback(
    (v: number) => {
      const clamped = Math.max(0, Math.min(1, v));
      setVolumeState(clamped);
      engine.setVolume(clamped);

      // Volume changes from controls like the Q1 Pro knob should wake audio
      // back up when raised above zero, matching hardware knob behavior.
      if (clamped > 0 && muted) {
        setMutedState(false);
        engine.setMuted(false);
      }
    },
    [engine, muted]
  );

  const toggleMute = useCallback(() => {
    setMutedState((prev) => {
      engine.setMuted(!prev);
      return !prev;
    });
  }, [engine]);

  return (
    <SoundContext.Provider value={{ playKeySound: engine.playKeySound, volume, muted, setVolume, toggleMute }}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
