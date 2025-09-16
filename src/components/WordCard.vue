<script setup>
const props = defineProps({
  number: {
    type: Number,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="card text-center my-2">
    <div class="card-body">
      <h1 class="display-1">{{ word }}</h1>
      <h2 class="card-title">
        <span class="circle-number">{{ number }}</span>
      </h2>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #f8f9fa;
}
.circle-number {
  display: inline-block;
  width: 40px; /* adjust size */
  height: 40px; /* adjust size */
  line-height: 40px; /* vertically center the text */
  border-radius: 50%; /* makes it circular */
  background-color: #222;
  color: white;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}
</style>
