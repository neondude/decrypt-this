<script setup>
import { ref } from 'vue'

// const props = defineProps({
//   code: {
//     type: Object,
//     required: true,

//   }
// })
</script>

<template>
  <div class="card text-center my-2">
    <div v-if="!hidden" class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <!-- editable div -->
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: #f8f9fa;
}
</style>
