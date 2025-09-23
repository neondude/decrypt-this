<script setup>
import { inject, ref } from 'vue'

const gameState = inject('gameState')
const dispatch = inject('dispatch')

const words = gameState.value.words
const ours = gameState.value.ours
const theirs = gameState.value.theirs

const ourMappedClues = {}
// Flatten "ours" once so we don’t keep looping deeply
const flatOurs = ours.flat()

for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
  const cluesForWord = flatOurs
    .filter((clue) => clue && clue.correct === wordIndex + 1)
    .map((clue) => clue.clue)

  ourMappedClues[wordIndex] = cluesForWord
}

const theirMappedClues = {}
const flatTheirs = theirs.flat()
for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
  const cluesForWord = flatTheirs
    .filter((clue) => clue && clue.correct === wordIndex + 1)
    .map((clue) => clue.clue)

  theirMappedClues[wordIndex] = cluesForWord
}

function addGuess(wordIndex) {
  if (!gameState.value.guesses[wordIndex]) {
    return
  }
  dispatch({
    type: 'ADD_EMPTY_GUESS',
    payload: { wordIndex },
  })
}
</script>

<template>
  <main class="container my-1">
    <h1 class="text-center">Their Clues</h1>
    <div class="accordion my-2" id="theirCluesAccordion">
      <div
        v-for="(clues, theirsIndex) in theirMappedClues"
        :key="theirsIndex"
        class="accordion-item"
      >
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseTheirs"
            aria-expanded="true"
          >
            <span class="mx-1 badge rounded-pill text-bg-dark"> {{ Number(theirsIndex) + 1 }}</span>
            Unknown Word
          </button>
        </h2>
        <div id="collapseTheirs" class="accordion-collapse collapse">
          <div class="accordion-body">
            <ul>
              <li v-for="(clue, index) in clues" :key="index">
                {{ clue }}
              </li>
            </ul>
            <div v-for="(guess, guessIndex) in gameState.guesses[theirsIndex]" :key="guessIndex">
              <input
                type="text"
                class="form-control my-1"
                placeholder="Enter your guess"
                v-model="gameState.guesses[theirsIndex][guessIndex]"
              />
            </div>
            <button class="btn btn-outline-dark" @click="addGuess(theirsIndex)">Add Guess</button>
          </div>
        </div>
      </div>
    </div>
    <h1 class="text-center">Our Clues</h1>
    <div class="accordion" id="ourCluesAccordion">
      <div v-for="(clues, index) in ourMappedClues" :key="index" class="accordion-item">
        <h2 class="accordion-header">
          <button
            class="accordion-button"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseOurs"
            aria-expanded="true"
          >
            {{ gameState.words[index] }}
          </button>
        </h2>
        <div id="collapseOurs" class="accordion-collapse collapse">
          <div class="accordion-body">
            <ul>
              <li v-for="(clue, index) in clues" :key="index">
                {{ clue }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
