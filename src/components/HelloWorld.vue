<template>
  <h1>{{ msg }}</h1>
  <p>
    <a class="text-vue-green" href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a>
    |
    <a class="text-vue-green" href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button class="bg-vue-green text-white py-0.5 px-1.5" @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code>
    to test hot module replacement.
  </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>
