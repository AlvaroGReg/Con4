import { BOARD_COLUMNS, BOARD_ROWS, type Board, type GameState, type Player, type SessionScore } from '../types/game'

const WINNING_DIRECTIONS = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
] as const

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

    const winner = getWinner(board)

    if (winner) {
        return {
            ...state,
            board,
            status: 'won',
            winner,
            score: { ...state.score, [winner]: state.score[winner] + 1 },
        }
    }

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

export function getWinner(board: Board): Player | null {
    for (let row = 0; row < BOARD_ROWS; row += 1) {
        for (let column = 0; column < BOARD_COLUMNS; column += 1) {
            const player = board[row]?.[column] ?? null

            if (player && WINNING_DIRECTIONS.some(([rowStep, columnStep]) => hasFourInLine(board, row, column, rowStep, columnStep, player))) {
                return player
            }
        }
    }
    return null
}

function hasFourInLine(
    board: Board,
    row: number,
    column: number,
    rowStep: number,
    columnStep: number,
    player: Player,
): boolean {
    return Array.from({ length: 4 }, (_, index) => {
        const nextRow = row + rowStep * index
        const nextColumn = column + columnStep * index

        return nextRow >= 0 && nextRow < BOARD_ROWS && nextColumn >= 0 && nextColumn < BOARD_COLUMNS && board[nextRow]?.[nextColumn] === player
    }).every(Boolean)
}
