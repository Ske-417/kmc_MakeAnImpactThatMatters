import { useState, useCallback } from 'react';
import type { Player, GameState, Career, GameSquare } from '../types/game';
import { BOARD_SQUARES } from '../constants/boardData';

const INITIAL_MONEY = 100000; // 10万円

export const useGameEngine = () => {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentPlayerIndex: 0,
    isGameOver: false,
    turnCount: 1,
  });

  const [isSpinning, setIsSpinning] = useState(false);
  const [lastSpinResult, setLastSpinResult] = useState<number | null>(null);
  const [hasSpun, setHasSpun] = useState(false);

  const initializeGame = useCallback((names: string[]) => {
    setGameState({
      players: names.map((name, index) => ({
        id: `p${index}`,
        name,
        position: 0,
        money: INITIAL_MONEY,
        career: 'Analyst',
        isMarried: false,
        children: 0,
        inventory: [],
        color: [`#86bc25`, `#435b14`, `#a6d353`, `#a6a6a6`][index % 4],
      })),
      currentPlayerIndex: 0,
      isGameOver: false,
      turnCount: 1,
    });
    setLastSpinResult(null);
    setHasSpun(false);
  }, []);

  const movePlayer = useCallback((steps: number) => {
    setGameState((prev) => {
      const currentPlayer = prev.players[prev.currentPlayerIndex];
      let newPosition = currentPlayer.position + steps;
      
      // Overflow check
      if (newPosition >= BOARD_SQUARES.length) {
        newPosition = BOARD_SQUARES.length - 1;
      }

      const newPlayers = [...prev.players];
      const updatedPlayer = { ...currentPlayer, position: newPosition };
      
      // Handle Square Logic
      const landedSquare = BOARD_SQUARES[newPosition];
      applySquareEffect(updatedPlayer, landedSquare);

      newPlayers[prev.currentPlayerIndex] = updatedPlayer;

      return {
        ...prev,
        players: newPlayers,
      };
    });
  }, []);

  const applySquareEffect = (player: Player, square: GameSquare) => {
    switch (square.type) {
      case 'PAYDAY':
        player.money += getSalary(player.career);
        break;
      case 'PROMOTION':
        promotePlayer(player);
        break;
      case 'PROJECT_SUCCESS':
        // Dynamic reward based on ID/Career
        player.money += square.id * 10000;
        break;
      case 'TRAINING':
        player.money -= 50000;
        break;
      case 'TROUBLE':
        player.money -= (square.id * 5000); // More trouble later in career
        break;
      case 'MARRIAGE':
        if (!player.isMarried) {
          player.isMarried = true;
          player.money -= 50000;
        }
        break;
      case 'NORMAL':
        if (square.id === 1) player.money += 20000;
        if (square.id === 15) player.money += 100000;
        break;
      case 'GOAL':
        player.career = 'President';
        break;
    }
  };

  const promotePlayer = (player: Player) => {
    const careerPath: Career[] = ['Analyst', 'Consultant', 'SeniorConsultant', 'Manager', 'SeniorManager', 'Partner', 'President'];
    const currentIndex = careerPath.indexOf(player.career);
    if (currentIndex < careerPath.length - 1) {
      player.career = careerPath[currentIndex + 1];
    }
  };

  const getSalary = (career: Career): number => {
    const salaries: Record<Career, number> = {
      Analyst: 500000,
      Consultant: 750000,
      SeniorConsultant: 1000000,
      Manager: 1500000,
      SeniorManager: 2000000,
      Partner: 5000000,
      President: 10000000,
    };
    return salaries[career];
  };

  const nextTurn = useCallback(() => {
    setGameState((prev) => {
      const nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      return {
        ...prev,
        currentPlayerIndex: nextIndex,
        turnCount: prev.currentPlayerIndex === prev.players.length - 1 ? prev.turnCount + 1 : prev.turnCount,
      };
    });
    setLastSpinResult(null);
    setHasSpun(false);
  }, []);

  const spin = useCallback(() => {
    if (isSpinning || hasSpun) return;
    setIsSpinning(true);
    setHasSpun(true);
    
    // Simulate spin delay
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      setLastSpinResult(result);
      movePlayer(result);
      setIsSpinning(false);
    }, 1500);
  }, [isSpinning, hasSpun, movePlayer]);

  return {
    gameState,
    spin,
    isSpinning,
    hasSpun,
    lastSpinResult,
    nextTurn,
    initializeGame,
  };
};
