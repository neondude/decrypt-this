<script setup>
import { provide, ref, watch } from 'vue'

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_WORD':
      return {
        ...state,
        words: [...state.words, action.payload],
      }
    case 'REMOVE_WORD':
      return {
        ...state,
        words: state.words.filter((w) => w !== action.payload),
      }
    case 'RESET':
      return {
        words: [],
      }
    default:
      return state
  }
}

// Load from localStorage if available
const savedState = localStorage.getItem('gameState')
const initialState = savedState
  ? JSON.parse(savedState)
  : { words: ['verylargeness', 'words', 'here', 'coding'] }

const gameState = ref(initialState)

// Dispatch function
function dispatch(action) {
  gameState.value = reducer(gameState.value, action)
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
</script>

<template>
  <nav class="navbar navbar-expand-md fixed-top bg-body-tertiary">
    <div class="container-md d-flex justify-content-center">
      <ul class="navbar-nav flex-row">
        <li class="nav-item">
          <RouterLink class="nav-link px-3" to="/">Words</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link px-3" to="/about">Codes</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link px-3" to="/about">Reset</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <nav class="navbar navbar-expand-md fixed-bottom bg-body-tertiary">
    <div class="container-md d-flex justify-content-center">
      <ul class="navbar-nav flex-row">
        <li class="nav-item">
          <RouterLink class="nav-link px-3" to="/">Ours</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link px-3" to="/about">Theirs</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link px-3" to="/about">Score</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
  <div style="height: 60px"></div>
  <RouterView />
  <div style="height: 60px"></div>
</template>

<style scoped></style>
