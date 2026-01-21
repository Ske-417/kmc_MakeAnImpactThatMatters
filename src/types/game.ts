export type Career = 'Analyst' | 'Consultant' | 'SeniorConsultant' | 'Manager' | 'SeniorManager' | 'Partner' | 'President';

export interface Player {
  id: string;
  name: string;
  position: number;
  money: number;
  career: Career;
  isMarried: boolean;
  children: number;
  inventory: string[];
  color: string;
}

export type SquareType = 
  | 'START' 
  | 'PROMOTION' 
  | 'PROJECT_SUCCESS' 
  | 'PAYDAY' 
  | 'STOP' 
  | 'TRAINING' 
  | 'NORMAL' 
  | 'MARRIAGE'
  | 'TROUBLE'
  | 'GOAL';

export interface GameSquare {
  id: number;
  type: SquareType;
  label: string;
  description: string;
  onLand?: (player: Player) => Partial<Player> | void;
  color?: string;
  x?: number; // For visual board positioning
  y?: number;
  row: number;
  col: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  isGameOver: boolean;
  turnCount: number;
}
