import React from 'react';
import type { Player } from '../types/game';
import { Briefcase, Heart, Baby, Coins } from 'lucide-react';

interface StatusPanelProps {
  players: Player[];
  currentPlayerIndex: number;
  turnCount: number;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ players, currentPlayerIndex, turnCount }) => {
  return (
    <div className="flex flex-col gap-4 p-6 premium-card w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">全員のステータス</h2>
        <div className="text-sm bg-white/20 px-3 py-1 rounded-full">Turn {turnCount}</div>
      </div>

      <div className="space-y-4">
        {players.map((player, idx) => (
          <div
            key={player.id}
            className={`p-4 rounded-xl transition-all duration-300 border-2 ${
              idx === currentPlayerIndex 
                ? 'bg-white/30 border-white shadow-lg scale-105' 
                : 'bg-white/10 border-transparent opacity-70'
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: player.color }} 
              />
              <span className="font-bold text-lg">{player.name} {idx === currentPlayerIndex && '👈'}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Coins size={16} className="text-yellow-400" />
                <span>{player.money.toLocaleString()}円</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-blue-400" />
                <span>{player.career}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={16} className="text-pink-400" />
                <span>{player.isMarried ? '既婚' : '未婚'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Baby size={16} className="text-green-400" />
                <span>子供: {player.children}人</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
