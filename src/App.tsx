import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Board } from './components/Board';
import { Spinner } from './components/Spinner';
import { StatusPanel } from './components/StatusPanel';
import { useGameEngine } from './hooks/useGameEngine';
import { BOARD_SQUARES } from './constants/boardData';

function App() {
  const [playerNames, setPlayerNames] = useState<string[]>(['コンサルタント 1', 'コンサルタント 2']);
  const [gameStarted, setGameStarted] = useState(false);
  const { gameState, spin, isSpinning, lastSpinResult, nextTurn, initializeGame, hasSpun } = useGameEngine();

  const handleStartGame = () => {
    initializeGame(playerNames);
    setGameStarted(true);
  };

  const addPlayer = () => {
    if (playerNames.length < 4) {
      setPlayerNames([...playerNames, `コンサルタント ${playerNames.length + 1}`]);
    }
  };

  const removePlayer = (index: number) => {
    if (playerNames.length > 1) {
      const newNames = [...playerNames];
      newNames.splice(index, 1);
      setPlayerNames(newNames);
    }
  };

  const updatePlayerName = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleNextTurn = () => {
    const currentPlayer = gameState.players[gameState.currentPlayerIndex];
    const square = BOARD_SQUARES[currentPlayer.position];

    // Celebratory effects for promotions or big successes
    if (square.type === 'PROMOTION' || square.type === 'PROJECT_SUCCESS' || square.type === 'GOAL') {
      confetti({
        particleCount: square.type === 'GOAL' ? 200 : 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#86bc25', '#ffffff', '#000000', '#3498db']
      });
    }

    nextTurn();
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-black overflow-hidden bg-dot-pattern relative">
        {/* Full-page decorative background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] bg-primary/10 blur-[200px] pointer-events-none" />
        
        <div className="max-w-4xl w-full text-center relative z-10 py-10">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-8xl font-black mb-4 tracking-tighter text-white drop-shadow-[0_0_40px_rgba(134,188,37,0.3)]">
              DTC <span className="text-primary">人生ゲーム</span>
            </h1>
            <p className="text-[14px] opacity-60 mb-20 uppercase tracking-[0.6em] font-black">Make an impact that matters • v3.1</p>
          </motion.div>
          
          <div className="space-y-8 mb-32 max-w-xl mx-auto flex flex-col items-center">
            <AnimatePresence initial={false}>
              {playerNames.map((name, index) => (
                <motion.div 
                  key={index}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 30, opacity: 0 }}
                  className="flex gap-4 items-center group w-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-black opacity-40 group-focus-within:opacity-100 group-focus-within:border-primary transition-all duration-300 shrink-0">
                    0{index + 1}
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => updatePlayerName(index, e.target.value)}
                    className="input-field flex-grow py-5 text-lg"
                    placeholder={`名前を入力`}
                  />
                  {playerNames.length > 1 && (
                    <button 
                      onClick={() => removePlayer(index)}
                      className="w-14 h-14 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white/50 hover:bg-red-500/80 hover:border-red-500 hover:text-white transition-all duration-300 shrink-0 backdrop-blur-xl shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                    >
                      ✕
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex flex-col items-center gap-16">
            <div className="flex gap-10 w-full max-w-xl justify-center">
              <button 
                onClick={addPlayer} 
                disabled={playerNames.length >= 4}
                className="button-primary bg-primary text-black hover:bg-primary-light border-none normal-case py-5 px-10 flex-1 text-lg shadow-[0_0_30px_rgba(134,188,37,0.3)]"
                style={{ boxShadow: 'none' }}
              >
                プレイヤーを追加
              </button>
              <button onClick={handleStartGame} className="button-primary py-5 px-10 flex-1 text-lg shadow-[0_0_50px_rgba(134,188,37,0.4)]">
                キャリアを開始
              </button>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <main className="board-container bg-[#050505] relative">
      <header className="top-dashboard px-8 h-24">
        {/* Left: Player Info */}
        <div className="flex items-center gap-10 min-w-[300px]">
          <div className="flex flex-col border-l-4 border-primary pl-6">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-black mb-1">現在のプレイヤー</span>
            <div className="flex items-center gap-4">
              <motion.div 
                className="w-4 h-4 rounded-full"
                animate={{ 
                  backgroundColor: currentPlayer?.color,
                  boxShadow: `0 0 20px ${currentPlayer?.color}`
                }}
              />
              <span className="text-2xl font-black tracking-tight">{currentPlayer?.name}</span>
            </div>
          </div>
        </div>

        {/* Center: Event Display & Spinner */}
        <div className="flex-grow flex justify-center items-center gap-4 max-w-4xl relative">
          {/* Spinner (Always visible, acts as the number anchor) */}
          <div className="relative shrink-0 z-20">
            <Spinner onSpin={spin} isSpinning={isSpinning} lastResult={lastSpinResult} />
            {isSpinning && (
              <motion.div 
                className="absolute -inset-3 rounded-full border-2 border-primary/40 animate-ping pointer-events-none"
              />
            )}
          </div>

          <AnimatePresence mode="wait">
            {lastSpinResult !== null ? (
              <motion.div 
                key={`${gameState.currentPlayerIndex}-${lastSpinResult}`}
                initial={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
                animate={{ width: 'auto', opacity: 1, paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
                exit={{ width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/[0.04] border border-white/10 rounded-r-2xl rounded-l-2xl flex items-center overflow-hidden backdrop-blur-2xl shadow-2xl h-16 -ml-8 z-10 pl-6 pr-6"
              >
                 {/* Color Bar */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-1"
                  style={{ backgroundColor: currentPlayer?.color }}
                />

                {/* Spacer to push text past the spinner overlap */}
                <div className="w-4 shrink-0" />

                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="flex flex-col whitespace-nowrap min-w-[180px]"
                >
                  <span className="text-xs font-black text-primary uppercase tracking-widest mb-0.5 opacity-80">
                    {BOARD_SQUARES[currentPlayer.position].label}
                  </span>
                  <span className="text-sm text-white/90 leading-tight font-bold">
                    {BOARD_SQUARES[currentPlayer.position].description}
                  </span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-white text-sm font-black tracking-[0.5em] uppercase italic animate-pulse ml-4"
              >
                戦略的ムーブを待機中...
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Actions & Status */}
        <div className="flex items-center gap-8 min-w-[350px] justify-end">
          {hasSpun && !isSpinning && (
            <motion.button 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNextTurn} 
              className="button-primary py-4 px-10 text-xs font-black shadow-[0_0_30px_rgba(134,188,37,0.4)]"
            >
              次のプレイヤーへ »
            </motion.button>
          )}
          
          <div className="hover-status-container">
            <button className="flex items-center gap-4 bg-white/80 backdrop-blur-xl hover:bg-white p-2 pr-6 rounded-full transition-all duration-300 group shadow-[0_8px_32px_rgba(255,255,255,0.15)] border-none">
              <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-xl shadow-lg border-2 border-white">
                {gameState.players.length}
              </div>
              <span className="text-[10px] font-black tracking-[0.2em] uppercase text-black/80 shadow-sm group-hover:text-black transition-colors">ステータスダッシュボード</span>
            </button>
            <div className="hover-status-content pt-4">
              <StatusPanel 
                players={gameState.players} 
                currentPlayerIndex={gameState.currentPlayerIndex} 
                turnCount={gameState.turnCount}
              />
            </div>
          </div>
        </div>

        {/* Global Accent Line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[3px]"
          animate={{ backgroundColor: currentPlayer?.color }}
          transition={{ duration: 0.8 }}
        />
      </header>

      <section className="game-grid p-6 lg:p-12 overflow-hidden items-stretch">
        <Board players={gameState.players} currentPlayerIndex={gameState.currentPlayerIndex} />
      </section>
    </main>
  );
}

export default App;
