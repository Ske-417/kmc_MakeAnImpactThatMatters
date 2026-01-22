import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PassThroughBonus } from '../types/game';

interface BonusIndicatorProps {
  bonuses: PassThroughBonus[];
}

export const BonusIndicator: React.FC<BonusIndicatorProps> = ({ bonuses }) => {
  if (bonuses.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 flex-shrink-0">
      <AnimatePresence>
        {bonuses.map((bonus, index) => (
          <motion.div
            key={`${bonus.type}-${index}`}
            initial={{ x: 30, opacity: 0, scale: 0.8 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: 30, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md bg-white/10 border border-primary/40 shadow-[0_0_15px_rgba(134,188,37,0.2)]"
            style={{
              backgroundColor: bonus.type === 'PROMOTION' ? 'rgba(134, 188, 37, 0.15)' : 'rgba(255, 215, 0, 0.15)'
            }}
          >
            <span className="text-2xl">{bonus.icon}</span>
            <span className="text-xs font-bold text-white whitespace-nowrap">{bonus.label}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
