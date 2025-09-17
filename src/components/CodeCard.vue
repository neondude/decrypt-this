<script setup>
import { ref } from 'vue'

const props = defineProps({
  code: {
    type: String,
    required: false,
  },
  hide: {
    type: Boolean,
    default: true,
  },
})
function formatCode(code) {
  if (!code) return ''
  return code
    .split('') // Split into individual characters
    .join('.') // Join with dots
}

const displayTime = 3 // seconds
const hidden = ref(props.hide)

function toggleHidden() {
  hidden.value = !hidden.value
  if (!hidden.value) {
    // Auto-hide after 3 seconds
    setTimeout(() => {
      hidden.value = true
    }, displayTime * 1000)
  }
}
</script>

<template>
  <div @click="toggleHidden" class="card text-center my-2">
    <div v-if="!hidden" class="card-body">
      <h1 class="display-1">{{ formatCode(code) }}</h1>
      <div class="progress" role="progressbar">
        <div
          class="progress-bar move"
          style="width: 10%"
          :style="{ animationDuration: displayTime + 's' }"
        ></div>
      </div>
    </div>
    <div v-else class="card-body">
      <h2>Tap to Reveal</h2>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #f8f9fa;
}

.move {
  animation-name: moveLeftToRight;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes moveLeftToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(900%);
  }
}
</style>
