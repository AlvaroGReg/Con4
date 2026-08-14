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


export function playMove(state: GameState, column: number): GameState {
    if (state.status !== 'playing' || column < 0 || column >= BOARD_COLUMNS || !Number.isInteger(column)) {
        return state
    }

    const row = getAvailableRow(state.board, column)

    if (row === null) {
        return state
    }

    const board = state.board.map((currentRow) => [...currentRow])
    const boardRow = board[row]

    if (!boardRow) {
        return state
    }

    boardRow[column] = state.currentPlayer

    // const winner = getWinner(board)

    if (isBoardFull(board)) {
        return { ...state, board, status: 'draw' }
    }

    return { ...state, board, currentPlayer: getNextPlayer(state.currentPlayer) }
}

export function isBoardFull(board: Board): boolean {
    return board[0]?.every((cell) => cell !== null) ?? false
}

export function getNextPlayer(player: Player): Player {
    return player === 'red' ? 'yellow' : 'red'
}

function getAvailableRow(board: Board, column: number): number | null {
    for (let row = BOARD_ROWS - 1; row >= 0; row -= 1) {
        if (board[row]?.[column] === null) {
            return row
        }
    }

    return null
}