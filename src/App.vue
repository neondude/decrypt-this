<script setup>
import { provide, ref, watch } from 'vue'
import wordList from '@/utils/wordList.js'
import router from '@/router/index.js'

function createEmptyState() {
  return {
    words: wordList.sort(() => 0.5 - Math.random()).slice(0, 4),
    codes: [],
    ours: Array.from({ length: 8 }, () =>
      Array.from({ length: 3 }, () => ({ clue: '', guess: null, correct: null })),
    ),
    theirs: Array.from({ length: 8 }, () =>
      Array.from({ length: 3 }, () => ({ clue: '', guess: null, correct: null })),
    ),
    guesses: Array.from({ length: 4 }, () => []),
  }
}

function gameReducer(state, action) {
  switch (action.type) {
    case 'RESET':
      return createEmptyState()
    case 'ADD_CODE':
      return {
        ...state,
        codes: [...state.codes, action.payload],
      }
    case 'ADD_EMPTY_GUESS':
      const { wordIndex } = action.payload
      // new arrays have to be created for Vue reactivity to detect changes
      const newGuesses = [...state.guesses] // Create a new array
      newGuesses[wordIndex] = [...newGuesses[wordIndex], ''] // Create a new subarray
      return {
        ...state,
        guesses: newGuesses,
      }

    default:
      return state
  }
}
// Load from localStorage if available
const savedState = localStorage.getItem('gameState')
const initialState = savedState ? JSON.parse(savedState) : createEmptyState()

const gameState = ref(initialState)

// Dispatch function
function dispatch(action) {
  gameState.value = gameReducer(gameState.value, action)
}

// Provide both state and dispatch
provide('gameState', gameState)
provide('dispatch', dispatch)

// Watch for changes and save to localStorage
watch(
  gameState,
  (newState) => {
    localStorage.setItem('gameState', JSON.stringify(newState))
  },
  { deep: true },
)

const openResetModal = () => {
  if (confirm('Are you sure you want to reset the game?')) {
    dispatch({ type: 'RESET' })
    router.push({ name: 'words' })
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-md fixed-top bg-body-tertiary">
    <div class="container-md d-flex justify-content-center">
      <ul class="navbar-nav flex-row gap-1">
        <li class="nav-item">
          <RouterLink class="btn px-3" to="/">Words</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="btn px-3" to="/codes">Codes</RouterLink>
        </li>
        <li class="nav-item">
          <button class="btn btn-outline-danger px-3" type="button" @click="openResetModal">
            Reset
          </button>
        </li>
      </ul>
    </div>
  </nav>
  <nav class="navbar navbar-expand-md fixed-bottom bg-body-tertiary">
    <div class="container-md d-flex justify-content-center">
      <ul class="navbar-nav flex-row gap-1">
        <li class="nav-item">
          <RouterLink class="btn px-3" to="/clues/ours">Ours</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="btn px-3" to="/clues/theirs">Theirs</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="btn px-3" to="/grouped">Grouped</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <div style="height: 60px"></div>
  <RouterView />
  <div style="height: 60px"></div>
</template>

<style scoped></style>
