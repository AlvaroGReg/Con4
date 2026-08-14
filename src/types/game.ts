export const BOARD_COLUMNS = 7
export const BOARD_ROWS = 6

export type Player = 'red' | 'yellow'

export type Cell = Player | null

export type Board = Cell[][]

export type GameStatus = 'playing' | 'won' | 'draw'

export interface SessionScore {
  red: number
  yellow: number
}

export interface GameState {
  board: Board
  currentPlayer: Player
  startingPlayer: Player
  status: GameStatus
  winner: Player | null
  score: SessionScore
}
