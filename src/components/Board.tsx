import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOARD_SQUARES, SQUARES_PER_ROW, TOTAL_ROWS } from '../constants/boardData';
import type { Player } from '../types/game';
import bgImage from '../assets/impact_bg.png';

interface BoardProps {
  players: Player[];
  currentPlayerIndex: number;
}

export const Board: React.FC<BoardProps> = ({ players, currentPlayerIndex }) => {
  return (
    <div className="relative w-full h-full p-2 lg:p-6 premium-card overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-black/20 to-black/95" />

      <div 
        className="grid relative z-20"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${SQUARES_PER_ROW}, 1fr)`,
          gridTemplateRows: `repeat(${TOTAL_ROWS}, 1fr)`,
          width: '100%',
          height: '100%',
          gap: '12px',
          aspectRatio: `${SQUARES_PER_ROW} / ${TOTAL_ROWS}`,
          maxWidth: '100%',
          maxHeight: '100%',
        }}
      >
        {/* Render Squares */}
        {BOARD_SQUARES.map((square) => {
          const isEvenRow = square.row % 2 === 0;
          const gridColumn = isEvenRow ? square.col + 1 : SQUARES_PER_ROW - square.col;
          
          return (
            <motion.div
              key={square.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: square.id * 0.005 }}
              className="relative flex items-center justify-center rounded-xl lg:rounded-2xl border backdrop-blur-xl transition-all duration-500 group overflow-hidden"
              style={{
                gridColumn: `${gridColumn} / span 1`,
                gridRow: `${square.row + 1} / span 1`,
                width: '100%',
                height: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                borderColor: getSquareColor(square.type),
                color: 'white',
                boxShadow: `inset 0 0 20px ${getSquareColor(square.type)}25, 0 4px 15px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Highlight Effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                style={{ backgroundColor: getSquareColor(square.type) }}
              />

              {/* Tile numbering */}
              <div className="absolute top-1 left-1.5 text-[9px] font-black opacity-40 group-hover:opacity-100 transition-opacity tracking-tight">
                {String(square.id).padStart(2, '0')}
              </div>

              <div className="flex flex-col items-center justify-center text-center w-full h-full p-1 lg:p-3 relative z-10">
                <span 
                  className="font-black select-none tracking-tighter leading-[1.15] text-wrap drop-shadow-lg" 
                  style={{ 
                    fontSize: 'clamp(7.5px, 1.35vh, 12px)',
                    textShadow: square.type !== 'NORMAL' ? `0 0 15px ${getSquareColor(square.type)}` : '0 2px 4px rgba(0,0,0,0.8)'
                  }}
                >
                  {square.label}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Render Players */}
        <AnimatePresence>
          {players.map((player, index) => {
            const square = BOARD_SQUARES[player.position];
            const isEvenRow = square.row % 2 === 0;
            const gridColumn = isEvenRow ? square.col + 1 : SQUARES_PER_ROW - square.col;
            
            return (
              <motion.div
                key={player.id}
                initial={false}
                animate={{
                  gridColumn: `${gridColumn} / span 1`,
                  gridRow: `${square.row + 1} / span 1`,
                  x: (players.indexOf(player) - (players.length - 1) / 2) * 10,
                  y: (players.indexOf(player) - (players.length - 1) / 2) * 2,
                  zIndex: players.indexOf(player) === currentPlayerIndex ? 100 : 50,
                  scale: players.indexOf(player) === currentPlayerIndex ? 1.3 : 1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="absolute self-center justify-self-center w-6 h-6 lg:w-9 lg:h-9 rounded-full border-2 border-white/80 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center text-white font-black text-[10px] lg:text-sm"
                style={{
                  backgroundColor: player.color,
                  boxShadow: `0 0 15px ${player.color}66, 0 4px 10px rgba(0,0,0,0.8)`,
                  pointerEvents: 'none',
                }}
              >
                {index + 1}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

const getSquareColor = (type: string) => {
  switch (type) {
    case 'START': return '#86bc25';
    case 'GOAL': return '#86bc25';
    case 'PAYDAY': return '#3498db';
    case 'TRAINING': return '#e67e22';
    case 'PROJECT_SUCCESS': return '#27ae60';
    case 'PROMOTION': return '#a855f7';
    case 'TROUBLE': return '#ef4444';
    default: return 'rgba(255, 255, 255, 0.1)';
  }
};
