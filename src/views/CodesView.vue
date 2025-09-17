<script setup>
import { inject } from 'vue'
import CodeCard from '@/components/CodeCard.vue'

const gameState = inject('gameState')
const dispatch = inject('dispatch')

// a three digit code as a string. The digits should be between 1 and 4 and unique.
function generateCode() {
  const digits = ['1', '2', '3', '4']

  // Shuffle digits using Fisher–Yates
  for (let i = digits.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[digits[i], digits[j]] = [digits[j], digits[i]]
  }

  return digits.slice(0, 3).join('')
}

function addCode() {
  const code = generateCode()
  dispatch({ type: 'ADD_CODE', payload: code })
}
</script>

<template>
  <main class="container my-1">
    <CodeCard v-for="(code, index) in gameState.codes" :key="index" :code="code" />
    <div class="text-center">
      <button class="btn btn-primary mt-3" @click="addCode()">Draw Code</button>
    </div>
  </main>
</template>
