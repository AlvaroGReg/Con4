<script setup lang="ts">
import { BOARD_COLUMNS, type Board } from '../types/game'

const props = defineProps<{
    board: Board
    disabled: boolean
}>()

const emit = defineEmits<{
    selectColumn: [column: number]
}>()

function isColumnFull(column: number): boolean {
    return props.board[0]?.[column] !== null
}
</script>

<template>
    <div class="game-board" aria-label="Connect 4 board">
        <button v-for="column in BOARD_COLUMNS" :key="column" class="board-column"
            :disabled="disabled || isColumnFull(column - 1)" type="button" @click="emit('selectColumn', column - 1)"
            :aria-label="`Play in column ${column}`">
            <span v-for="(row, rowIndex) in board" :key="rowIndex" class="board-cell" :class="{
                'cell-red': row[column - 1] === 'red',
                'cell-yellow': row[column - 1] === 'yellow',
            }" />
        </button>
    </div>
</template>

<style scoped>
.game-board {
    background: #3264d9;
    border: clamp(0.25rem, 1vw, 0.5rem) solid #244da9;
    border-radius: 1.25rem;
    box-shadow: 0 0.6rem 0 #183679, 0 1.5rem 3rem rgb(4 13 38 / 40%);
    display: grid;
    gap: clamp(0.25rem, 1vw, 0.5rem);
    grid-template-columns: repeat(7, minmax(0, 1fr));
    padding: clamp(0.5rem, 2vw, 1rem);

    .board-column {
        background: none;
        border: 0;
        cursor: pointer;
        display: grid;
        gap: clamp(0.25rem, 1vw, 0.5rem);
        padding: 0;

        &:focus-visible {
            border-radius: 999px;
            outline: 0.2rem solid #ffcf4a;
            outline-offset: 0.2rem;
        }

        &:not(:disabled):hover .board-cell:not(.cell-red):not(.cell-yellow) {
            background: #d7e2ff;
            transform: translateY(-0.15rem);
        }

        .board-cell {
            aspect-ratio: 1;
            background: #0d205b;
            border-radius: 50%;
            box-shadow: inset 0 0.22rem 0.2rem rgb(0 0 0 / 30%);
            display: block;
            transition: background-color 150ms ease, transform 150ms ease;

            &.cell-red {
                background: #fa5661;
                box-shadow: inset 0 0.22rem 0 #ff8a8f, inset 0 -0.2rem 0 #c63645;
            }

            &.cell-yellow {
                background: #ffcf4a;
                box-shadow: inset 0 0.22rem 0 #ffe897, inset 0 -0.2rem 0 #d69b14;
            }
        }
    }
}
</style>
