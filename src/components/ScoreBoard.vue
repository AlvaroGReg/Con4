<script setup lang="ts">
import { computed } from 'vue'
import type { GameStatus, Player } from '../types/game'

const props = defineProps<{
    currentPlayer: Player
    status: GameStatus
}>()

const statusMessage = computed(() => {
    if (props.status === 'draw') {
        return 'Board full'
    }

    return `${props.currentPlayer === 'red' ? 'Red' : 'Yellow'} to play`
})

</script>

<template>
    <aside class="scoreboard" aria-live="polite">
        <p class="scoreboard-label">Game status</p>
        <p class="scoreboard-status" :class="`status-${currentPlayer}`">
            {{ statusMessage }}
        </p>
        <div class="scoreboard-divider"></div>
        <p class="scoreboard-label">Session score</p>
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
}
</style>
