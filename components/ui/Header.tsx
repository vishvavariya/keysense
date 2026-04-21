'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { VolumeControl } from './VolumeControl';
import { LogoMark } from './LogoMark';

interface HeaderProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onMuteToggle: () => void;
}

const navLinks = [
  { href: '/', label: 'Keyboards' },
  { href: '/compare', label: 'Compare' },
  { href: '/typing-test', label: 'Typing Test' },
];

export const Header: React.FC<HeaderProps> = ({ volume, muted, onVolumeChange, onMuteToggle }) => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="KeySense home">
          <motion.div
            className="relative h-9 w-9"
            whileHover={{ scale: 1.08, rotate: -4 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <LogoMark className="h-full w-full drop-shadow-[0_8px_18px_rgba(99,102,241,0.28)]" />
          </motion.div>
          <span className="text-lg font-bold text-white/90 tracking-tight">
            Key
            <span className="bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
              Sense
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-white/50 hover:text-white/70'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/[0.08] rounded-lg"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <VolumeControl
            volume={volume}
            muted={muted}
            onVolumeChange={onVolumeChange}
            onMuteToggle={onMuteToggle}
          />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
            aria-label="Menu"
          >
            <span className="text-lg">{mobileOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/[0.06] bg-black/80 backdrop-blur-2xl"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-6 py-3 text-sm font-medium border-b border-white/[0.04] ${
                pathname === link.href ? 'text-violet-400' : 'text-white/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </header>
  );
};
