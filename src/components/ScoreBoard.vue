<script setup lang="ts">
import { computed } from 'vue'
import type { GameStatus, Player, SessionScore } from '../types/game'

const props = defineProps<{
    currentPlayer: Player
    score: SessionScore
    status: GameStatus
    winner: Player | null
}>()

const emit = defineEmits<{
    nextGame: []
    resetScore: []
}>()

const statusMessage = computed(() => {
    if (props.status === 'won') {
        return `${props.winner === 'red' ? 'Red' : 'Yellow'} wins`
    }

    if (props.status === 'draw') {
        return 'Board full'
    }

    return `${props.currentPlayer === 'red' ? 'Red' : 'Yellow'} to play`
})

</script>

<template>
    <aside class="scoreboard" aria-live="polite">
        <p class="scoreboard-label">Game status</p>
        <p class="scoreboard-status" :class="`status-${winner ?? currentPlayer}`">
            {{ statusMessage }}
        </p>
        <div class="scoreboard-divider"></div>
        <p class="scoreboard-label">Session score</p>
        <dl class="scoreboard-scores">
            <div>
                <dt><span class="scoreboard-token token-red"></span>Red</dt>
                <dd>{{ score.red }}</dd>
            </div>
            <div>
                <dt><span class="scoreboard-token token-yellow"></span>Yellow</dt>
                <dd>{{ score.yellow }}</dd>
            </div>
        </dl>
        <div class="scoreboard-actions">
            <button type="button" class="button-primary" @click="emit('nextGame')">Next game</button>
            <button type="button" class="button-secondary" @click="emit('resetScore')">Reset score</button>
        </div>
    </aside>
</template>

<style scoped>
.scoreboard {
    background: #17234d;
    border: 1px solid #2c3c70;
    border-radius: 1rem;
    color: #f8f9ff;
    padding: 1.25rem;

    .scoreboard-label {
        color: #9daedb;
        font-size: 0.7rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        margin: 0;
        text-transform: uppercase;
    }

    .scoreboard-divider {
        height: 1px;
        margin: 1.5rem 0;
        background: #2c3c70;
    }

    .scoreboard-status {
        margin: 0.5rem 0 0;
        font-size: 1.2rem;
        font-weight: 800;

        &.status-red {
            color: #ff8990;
        }

        &.status-yellow {
            color: #ffdc70;
        }
    }

    .scoreboard-scores {
        display: grid;
        gap: 0.75rem;
        margin: 0.75rem 0 0;

        div {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        dt {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: #d8dff5;
        }

        dd {
            margin: 0;
            font-size: 1.4rem;
            font-weight: 800;
        }

        .scoreboard-token {
            width: 0.8rem;
            aspect-ratio: 1;
            border-radius: 50%;
        }

        .token-red {
            background: #fa5661;
        }

        .token-yellow {
            background: #ffcf4a;
        }
    }

    .scoreboard-actions {
        display: grid;
        gap: 0.5rem;
        margin-top: 1.5rem;

        button {
            border-radius: 0.5rem;
            cursor: pointer;
            font: inherit;
            font-weight: 700;
            padding: 0.7rem 0.8rem;
        }

        .button-primary {
            background: #ffcf4a;
            border: 1px solid #ffcf4a;
            color: #17234d;
        }

        .button-secondary {
            background: transparent;
            border: 1px solid #5f72ae;
            color: #d8dff5;
        }
    }
}
</style>
