<script setup lang="ts">
import { ref } from 'vue'
import GameBoard from './components/GameBoard.vue'
import { createGame } from './utils/game'
import ScoreBoard from './components/ScoreBoard.vue';

const game = ref(createGame('red'))

</script>

<template>
    <main class="game">
        <header class="game-header">
            <h1>Con<span>4</span></h1>
        </header>
        <section class="game__content" aria-label="Con4 game">
            <GameBoard :board="game.board" />
            <ScoreBoard></ScoreBoard>
        </section>
    </main>
</template>

<style scoped>
.game {
    margin: 0 auto;
    padding: clamp(1.5rem, 5vw, 4rem) clamp(1rem, 4vw, 2.5rem);
    width: min(100%, 68rem);

    .game-header {
        margin-bottom: clamp(2rem, 5vw, 2rem);

        h1 {
            margin: 0;
            color: #f8f9ff;
            font-size: clamp(3rem, 8vw, 5.5rem);
            letter-spacing: -0.09em;
            line-height: 0.9;

            &span {
                color: #ffcf4a;
            }
        }
    }

    .game__content {
        display: grid;
        grid-template-columns: minmax(0, 1fr) minmax(12rem, 15rem);
        align-items: start;
        gap: clamp(1.25rem, 4vw, 3rem);
    }

    @media (max-width: 42rem) {
        .game__content {
            grid-template-columns: 1fr;
        }
    }
}

</style>
