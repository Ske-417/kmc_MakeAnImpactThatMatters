import React from 'react';
import { motion } from 'framer-motion';
import { BOARD_SQUARES } from '../constants/boardData';
import { Player } from '../types/game';

interface FlipEventDisplayProps {
  lastSpinResult: number | null;
  currentPlayer: Player;
  displayContent: { label: string; description: string } | null;
}

export const FlipEventDisplay: React.FC<FlipEventDisplayProps> = ({ lastSpinResult, currentPlayer, displayContent }) => {
  const isFlipped = lastSpinResult !== null;

  return (
    // Scene Container
    <div className="relative h-16 w-[320px] group perspective-1000 z-10">
      <motion.div
        className="w-full h-full relative preserve-3d"
        initial={false}
        animate={{ 
          rotateX: isFlipped ? 180 : 0 
        }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ 
          transformStyle: "preserve-3d",
          transformOrigin: "center center" // Explicit center origin
        }}
      >
        {/* FRONT FACE: Waiting... */}
        <div 
          className="absolute inset-0 backface-hidden flex items-center justify-center backdrop-blur-md bg-black/40 rounded-full border border-white/20"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          <span className="text-sm font-bold text-white tracking-widest animate-pulse">
            戦略的ムーブを待機中...
          </span>
        </div>

        {/* BACK FACE: Result */}
        <div 
          className="absolute inset-0 backface-hidden flex items-center justify-start pl-6 pr-6 backdrop-blur-md bg-white/[0.08] rounded-full border border-primary/30 shadow-[0_0_15px_rgba(134,188,37,0.1)] overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateX(180deg)',
            backgroundColor: currentPlayer?.color ? `${currentPlayer.color}20` : 'rgba(255,255,255,0.08)'
          }}
        >
          {/* Color Accent */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-1.5"
            style={{ backgroundColor: currentPlayer?.color }}
          />
          
          {displayContent && (
            <div className="flex flex-col whitespace-nowrap overflow-hidden w-full text-left">
              <span className="text-[10px] font-black text-primary uppercase tracking-widest mb-0.5 opacity-90 truncate block">
                {displayContent.label}
              </span>
              <span className="text-xs font-bold text-white leading-tight truncate block">
                 {displayContent.description}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
