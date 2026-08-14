import { BOARD_COLUMNS, BOARD_ROWS, type Board, type GameState, type Player, type SessionScore } from '../types/game'

export function createBoard(): Board {
    return Array.from({ length: BOARD_ROWS }, () => Array.from({ length: BOARD_COLUMNS }, () => null))
}

export function createGame(startingPlayer: Player, score: SessionScore = { red: 0, yellow: 0 }): GameState {
    return {
        board: createBoard(),
        currentPlayer: startingPlayer,
        startingPlayer,
        status: 'playing',
        winner: null,
        score: { ...score },
    }
}
