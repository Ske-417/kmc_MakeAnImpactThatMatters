import { useState } from 'react';
import { useGameEngine } from './hooks/useGameEngine';
import { Board } from './components/Board';
import { BOARD_SQUARES } from './constants/boardData';
import { Spinner } from './components/Spinner';
import { StatusPanel } from './components/StatusPanel';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

function App() {
  const [playerNames, setPlayerNames] = useState<string[]>(['プレイヤー1', 'プレイヤー2']);
  const [gameStarted, setGameStarted] = useState(false);
  const { gameState, spin, isSpinning, lastSpinResult, nextTurn } = useGameEngine(playerNames);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNextTurn = () => {
    if (gameState.players[gameState.currentPlayerIndex].position === 19) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    nextTurn();
  };

  if (!gameStarted) {
    return (
      <div className="board-container flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="premium-card p-10 max-w-md w-full text-center"
        >
          <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            人生ゲーム Web
          </h1>
          <p className="mb-8 opacity-80">夢と冒険の人生へ、いざ出発！</p>
          
          <div className="space-y-4 mb-8">
            {playerNames.map((name, i) => (
              <input
                key={i}
                type="text"
                value={name}
                onChange={(e) => {
                  const newNames = [...playerNames];
                  newNames[i] = e.target.value;
                  setPlayerNames(newNames);
                }}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                placeholder={`プレイヤー ${i + 1} の名前`}
              />
            ))}
          </div>

          <button onClick={handleStartGame} className="button-primary w-full">
            ゲームを始める
          </button>
        </motion.div>
      </div>
    );
  }

  const currentPlayer = gameState.players[gameState.currentPlayerIndex];

  return (
    <div className="board-container">
      <header className="w-full max-w-6xl flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">人生ゲーム Web</h1>
        <div className="bg-white/20 px-4 py-2 rounded-xl border border-white/10">
          現在の番: <span className="font-bold" style={{ color: currentPlayer.color }}>{currentPlayer.name}</span>
        </div>
      </header>

      <main className="game-grid">
        <div className="flex flex-col gap-6">
          <Board players={gameState.players} currentPlayerIndex={gameState.currentPlayerIndex} />
        </div>

        <div className="flex flex-col gap-6">
          <Spinner 
            onSpin={spin} 
            isSpinning={isSpinning} 
            lastResult={lastSpinResult} 
          />
          
          <AnimatePresence>
            {lastSpinResult && !isSpinning && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="premium-card p-6 border-l-4 border-primary"
              >
                <p className="text-sm opacity-70 mb-1">移動しました！</p>
                <h3 className="text-xl font-bold mb-2">
                  {BOARD_SQUARES[currentPlayer.position].label}
                </h3>
                <p className="text-sm opacity-90 italic">
                  "{BOARD_SQUARES[currentPlayer.position].description}"
                </p>
                <button 
                  onClick={handleNextTurn}
                  className="button-primary w-full mt-4"
                >
                  次のターンへ
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <StatusPanel 
            players={gameState.players} 
            currentPlayerIndex={gameState.currentPlayerIndex} 
            turnCount={gameState.turnCount}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
