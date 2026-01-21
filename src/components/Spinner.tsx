import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  onSpin: () => void;
  isSpinning: boolean;
  lastResult: number | null;
}

export const Spinner: React.FC<SpinnerProps> = ({ onSpin, isSpinning, lastResult }) => {
  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSpin}
        disabled={isSpinning}
        className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-black/60 border-2 border-primary flex items-center justify-center relative backdrop-blur-xl shadow-[0_0_30px_rgba(134,188,37,0.3)] disabled:opacity-80 transition-shadow duration-500 overflow-hidden"
      >
        {/* Animated Spin Ring */}
        {isSpinning && (
          <motion.div
            className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 0.6, repeat: Infinity, ease: "linear" }}
          />
        )}
        
        {/* Decorative inner glow */}
        <div className="absolute inset-2 rounded-full bg-primary/5 blur-md" />

        <div className="flex flex-col items-center justify-center relative z-10">
          {isSpinning ? (
            <span className="text-2xl font-black text-primary animate-pulse italic">...</span>
          ) : lastResult !== null ? (
            <motion.span 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-4xl lg:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(134,188,37,0.6)]"
            >
              {lastResult}
            </motion.span>
          ) : (
            <span className="text-[10px] lg:text-xs font-black text-primary tracking-widest uppercase">Spin</span>
          )}
        </div>
      </motion.button>
      
      {/* Background decoration */}
      <div className="absolute -inset-1 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};
