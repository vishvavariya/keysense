'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onMuteToggle: () => void;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({
  volume,
  muted,
  onVolumeChange,
  onMuteToggle,
}) => {
  const [showSlider, setShowSlider] = useState(false);

  const icon = muted || volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊';

  return (
    <div
      className="relative flex items-center gap-2"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <motion.button
        onClick={onMuteToggle}
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-lg"
        whileTap={{ scale: 0.9 }}
        aria-label={muted ? 'Unmute' : 'Mute'}
      >
        {icon}
      </motion.button>

      {showSlider && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 100 }}
          exit={{ opacity: 0, width: 0 }}
          className="overflow-hidden"
        >
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-full accent-violet-500 h-1.5 rounded-full appearance-none bg-white/10 cursor-pointer"
            aria-label="Volume"
          />
        </motion.div>
      )}
    </div>
  );
};
