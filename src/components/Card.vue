<template>
  <section class="flex">
    <div class="flex-none w-48 relative">
      <slot name="left"></slot>
    </div>
    <div class="flex-auto p-6">
      <slot name="right"></slot>
    </div>
  </section>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'card',
  setup() {}
})
</script>
<style lang="postcss"></style>
