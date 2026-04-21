'use client';

import React from 'react';
import { Header } from '@/components/ui/Header';
import { useSound } from '@/components/providers/SoundProvider';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { volume, muted, setVolume, toggleMute } = useSound();

  return (
    <>
      <Header
        volume={volume}
        muted={muted}
        onVolumeChange={setVolume}
        onMuteToggle={toggleMute}
      />
      <main className="flex-1">{children}</main>
    </>
  );
};
