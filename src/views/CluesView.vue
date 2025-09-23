<script setup>
import { inject, computed } from 'vue'
import { useRoute } from 'vue-router'

const gameState = inject('gameState')
const dispatch = inject('dispatch')
const route = useRoute()
const clueSet = computed(() => route.params.set)
</script>

<template>
  <main class="container my-1">
    <div v-if="gameState.codes.length < 1" class="alert alert-info">Draw codes to give clues</div>
    <ul v-for="i in gameState.codes.length" class="list-group mb-3" :key="i">
      <!-- clue set number  -->
      <h4>Guess #0{{ i }} - {{ clueSet }}</h4>

      <li v-for="(clue, cidx) in gameState[clueSet][i - 1]" :key="cidx" class="list-group-item">
        <div class="d-flex gap-1 align-items-center">
          <!-- text input: grows to fill space -->
          <input
            type="text"
            v-model="clue.clue"
            class="form-control flex-grow-1"
            placeholder="Enter clue"
          />

          <!-- guess select: fixed width -->
          <select v-model="clue.guess" class="flex-shrink-0 no-arrow-select" style="width: 40px">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
          </select>

          <!-- correct select: fixed width -->
          <select v-model="clue.correct" class="flex-shrink-0 no-arrow-select" style="width: 40px">
            <option :value="1">1</option>
            <option :value="2">2</option>
            <option :value="3">3</option>
            <option :value="4">4</option>
          </select>
        </div>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.no-arrow-select {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  /* center align the text */
  text-align: center;
  /* rounded borders */
  border-radius: var(--bs-border-radius);
  padding: 0.375rem 0.75rem;
  background-color: var(--bs-white);
  border-color: var(--bs-gray-300);
}
</style>
