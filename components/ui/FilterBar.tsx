'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface FilterBarProps {
  brands: string[];
  selectedBrand: string | 'all';
  onBrandChange: (brand: string | 'all') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  brands,
  selectedBrand,
  onBrandChange,
}) => {
  const allBrands: (string | 'all')[] = ['all', ...brands];

  return (
    <div className="flex flex-wrap gap-2">
      {allBrands.map((brand) => {
        const isActive = selectedBrand === brand;
        const label = brand === 'all' ? 'All Brands' : brand;
        return (
          <motion.button
            key={brand}
            onClick={() => onBrandChange(brand)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
              isActive
                ? 'bg-violet-500/20 border-violet-500/40 text-violet-300'
                : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:text-white/70 hover:bg-white/[0.06]'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        );
      })}
    </div>
  );
};
