import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BOARD_SQUARES } from '../constants/boardData';
import type { Player } from '../types/game';

interface BoardProps {
  players: Player[];
  currentPlayerIndex: number;
}

export const Board: React.FC<BoardProps> = ({ players, currentPlayerIndex }) => {
  return (
    <div className="relative w-full max-w-4xl p-10 premium-card overflow-auto" style={{ height: '700px' }}>
      <div className="relative" style={{ minWidth: '500px', minHeight: '700px' }}>
        {/* Render Squares */}
        {BOARD_SQUARES.map((square) => (
          <motion.div
            key={square.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: square.id * 0.05 }}
            className="absolute flex items-center justify-center p-2 text-xs font-bold text-center border-2 rounded-xl"
            style={{
              left: `${square.x}px`,
              top: `${square.y}px`,
              width: '100px',
              height: '80px',
              backgroundColor: getSquareColor(square.type),
              borderColor: 'rgba(255,255,255,0.3)',
              color: 'white',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
              zIndex: 1,
            }}
          >
            <div className="flex flex-col items-center">
              <span className="leading-tight">{square.label}</span>
              {square.type === 'PAYDAY' && <span className="text-[10px] mt-1">💰報酬</span>}
              {square.type === 'TROUBLE' && <span className="text-[10px] mt-1">⚠️トラブル</span>}
              {square.type === 'PROMOTION' && <span className="text-[10px] mt-1">📈昇進</span>}
            </div>
          </motion.div>
        ))}

        {/* Render Players */}
        <AnimatePresence>
          {players.map((player) => {
            const square = BOARD_SQUARES[player.position];
            return (
              <motion.div
                key={player.id}
                initial={false}
                animate={{
                  left: `${square.x + 20}px`,
                  top: `${square.y + 20}px`,
                  zIndex: players.indexOf(player) === currentPlayerIndex ? 100 : 50,
                  scale: players.indexOf(player) === currentPlayerIndex ? 1.2 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute w-10 h-10 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold"
                style={{
                  backgroundColor: player.color,
                }}
              >
                {player.name[0]}
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
    case 'START': return '#2ecc71';
    case 'GOAL': return '#f1c40f';
    case 'PAYDAY': return '#3498db';
    case 'CAREER_CHOICE': return '#9b59b6';
    case 'STOP': return '#e74c3c';
    case 'TRAINING': return '#e67e22';
    case 'PROJECT_SUCCESS': return '#27ae60';
    case 'PROMOTION': return '#8e44ad';
    case 'TROUBLE': return '#c0392b';
    default: return 'rgba(255, 255, 255, 0.1)';
  }
};
