<script setup>
import { inject } from 'vue'
import WordCard from '@/components/WordCard.vue'

// Provide a default fallback in case inject fails
const gameState = inject('gameState', { words: [] })
</script>

<template>
  <main class="container my-1">
    <WordCard
      v-for="(word, index) in gameState.words"
      :key="index"
      :number="index + 1"
      :word="word"
    />
  </main>
</template>
