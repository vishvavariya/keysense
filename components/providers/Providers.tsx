'use client';

import React from 'react';
import { SoundProvider } from './SoundProvider';
import { AppShell } from './AppShell';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SoundProvider>
      <AppShell>{children}</AppShell>
    </SoundProvider>
  );
}
