import React from 'react';
import { motion } from 'framer-motion';
import type { Player } from '../types/game';

interface FlipEventDisplayProps {
  lastSpinResult: number | null;
  currentPlayer: Player;
  displayContent: { label: string; description: string } | null;
}

export const FlipEventDisplay: React.FC<FlipEventDisplayProps> = ({ lastSpinResult, currentPlayer, displayContent }) => {
  const isFlipped = lastSpinResult !== null;

  return (
    // Scene Container
    <div 
      className="relative group perspective-1000 z-10 flip-card-responsive"
      style={{ alignSelf: 'center' }}
    >
      {/* FRONT FACE: Waiting... */}
      <motion.div 
        className="absolute inset-0 backface-hidden flex items-center justify-center backdrop-blur-md bg-black/40 rounded-full border border-white/20"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ 
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transformStyle: "preserve-3d",
          transformOrigin: "center center"
        }}
      >
        <span className="text-sm font-bold text-white tracking-widest animate-pulse">
          戦略的ムーブを待機中...
        </span>
      </motion.div>

      {/* BACK FACE: Result */}
      <motion.div 
        className="absolute inset-0 backface-hidden flex items-center justify-start backdrop-blur-md bg-white/[0.08] rounded-full border border-primary/30 shadow-[0_0_15px_rgba(134,188,37,0.1)] overflow-hidden"
        initial={{ rotateX: 180 }}
        animate={{ rotateX: isFlipped ? 360 : 180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ 
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
          backgroundColor: currentPlayer?.color ? `${currentPlayer.color}20` : 'rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingLeft: '32px',
          paddingRight: '32px'
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
      </motion.div>
    </div>
  );
};
