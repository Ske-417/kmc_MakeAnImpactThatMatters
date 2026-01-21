import React from 'react';
import type { Player } from '../types/game';
import { motion } from 'framer-motion';
import { Briefcase, Heart, Baby, Coins, Target } from 'lucide-react';

interface StatusPanelProps {
  players: Player[];
  currentPlayerIndex: number;
  turnCount: number;
}

export const StatusPanel: React.FC<StatusPanelProps> = ({ players, currentPlayerIndex, turnCount }) => {
  return (
    <div className="flex flex-col gap-5 p-8 w-full shadow-2xl border border-white/10 bg-nearly-black backdrop-blur-3xl rounded-3xl">
      <div className="flex justify-between items-end mb-2 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-white">エグゼクティブ <span className="text-primary text-glow">名簿</span></h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white font-bold mt-1">Impact 監視パネル</p>
        </div>
        <div className="text-xs font-black bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white tracking-widest uppercase">
          年度 {turnCount}
        </div>
      </div>

      <div className="space-y-4">
        {players.map((player, idx) => (
          <motion.div
            key={player.id}
            initial={false}
            animate={{ 
              scale: idx === currentPlayerIndex ? 1.02 : 1,
              opacity: idx === currentPlayerIndex ? 1 : 0.7
            }}
            className={`p-5 rounded-2xl transition-all duration-500 border relative overflow-hidden ${
              idx === currentPlayerIndex 
                ? 'bg-white/[0.08] border-primary/50 shadow-[0_0_30px_rgba(134,188,37,0.15)] ring-1 ring-primary/20' 
                : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
            }`}
          >
            {idx === currentPlayerIndex && (
              <div className="absolute top-0 right-0 p-3">
                <Target size={14} className="text-primary animate-pulse" />
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <div 
                className="w-4 h-4 rounded-full shadow-lg" 
                style={{ 
                  backgroundColor: player.color,
                  boxShadow: `0 0 10px ${player.color}`
                }} 
              />
              <span className="font-black text-lg tracking-tight text-white">{player.name}</span>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-xs font-bold">
              <div className="flex items-center gap-5 text-white">
                <Coins size={14} className="text-primary/70" />
                <span className="tracking-wide">¥{player.money.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-5 text-white">
                <Briefcase size={14} className="text-primary/70" />
                <span className="tracking-wide">{getLocalizedCareer(player.career)}</span>
              </div>
              <div className="flex items-center gap-5 text-white">
                <Heart size={14} className="text-primary/70" />
                <span className="tracking-wide">{player.isMarried ? '既婚' : '未婚'}</span>
              </div>
              <div className="flex items-center gap-5 text-white">
                <Baby size={14} className="text-primary/70" />
                <span className="tracking-wide">資産 (子供): {player.children}人</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const getLocalizedCareer = (career: string) => {
  switch (career) {
    case 'Analyst': return 'アナリスト';
    case 'Consultant': return 'コンサルタント';
    case 'SeniorConsultant': return 'シニアコンサルタント';
    case 'Manager': return 'マネジャー';
    case 'SeniorManager': return 'シニアマネジャー';
    case 'Partner': return 'パートナー';
    case 'President': return '社長';
    default: return career;
  }
};
