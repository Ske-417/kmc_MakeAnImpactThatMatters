import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  onSpin: () => void;
  isSpinning: boolean;
  lastResult: number | null;
}

export const Spinner: React.FC<SpinnerProps> = ({ onSpin, isSpinning, lastResult }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 premium-card">
      <div className="relative w-48 h-48 mb-8">
        <motion.div
          animate={isSpinning ? { rotate: 360 * 5 + (lastResult ? (lastResult - 1) * 60 : 0) } : {}}
          transition={isSpinning ? { duration: 1.5, ease: "easeOut" } : { duration: 0 }}
          className="w-full h-full rounded-full border-8 border-white flex items-center justify-center relative overflow-hidden"
          style={{
            background: 'conic-gradient(#FF6B6B 0deg 60deg, #4ECDC4 60deg 120deg, #FFE66D 120deg 180deg, #6C5CE7 180deg 240deg, #A29BFE 240deg 300deg, #FD79A8 300deg 360deg)',
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((num, i) => (
            <div
              key={num}
              className="absolute font-bold text-2xl text-white"
              style={{
                transform: `rotate(${i * 60 + 30}deg) translateY(-60px)`,
              }}
            >
              {num}
            </div>
          ))}
          {/* Spinner Needle center */}
          <div className="absolute w-4 h-4 bg-white rounded-full shadow-md z-10" />
        </motion.div>
        
        {/* Indicator */}
        <div 
          className="absolute top-0 left-1/2 -ml-2 -mt-4 w-4 h-8 bg-white"
          style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}
        />
      </div>

      <button
        onClick={onSpin}
        disabled={isSpinning}
        className="button-primary w-full max-w-[200px]"
      >
        {isSpinning ? '回転中...' : 'ルーレットを回す'}
      </button>

      {lastResult && !isSpinning && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.5 }}
          className="mt-4 text-4xl font-extrabold text-white"
        >
          {lastResult}
        </motion.div>
      )}
    </div>
  );
};
