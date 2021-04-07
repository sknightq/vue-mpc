<template>
  <div class="flex flex-col">
    <header class="flex-grow-0 shadow">
      <Nav :items="menuItems" class="flex-row" />
    </header>
    <div class="container mx-auto flex-grow flex-wrap">
      <card>
        <template #left>
          <img alt="Vue logo" src="./assets/logo.png" />
        </template>
        <template #right>
          <HelloWorld msg="Hello Vue 3 + Vite" />
        </template>
      </card>
      <card>
        <template #left>
          <img alt="Vue logo" src="./assets/logo.png" />
        </template>
        <template #right>
          <HelloWorld msg="Hello Vue 3 + Vite" />
        </template>
      </card>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Card from '@/components/Card.vue'
import Nav from '@/components/Nav.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {
    Nav,
    Card,
    HelloWorld
  },
  setup() {
    const menuItems = ref([
      {
        url: '/src/views/home/',
        name: 'home'
      },
      {
        url: '/src/views/about/',
        name: 'about'
      }
    ])
    return {
      menuItems
    }
  }
})
</script>
