<template>
  <ul class="flex flex-row list-none ml-auto">
    <li class="nav-item" v-for="(item, name) in items" :key="name">
      <a class="nav-item-a" :href="item.url">{{ item.name }}</a>
    </li>
  </ul>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'nav',
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {}
})
</script>
<style lang="postcss">
.nav-item-a {
  @apply px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug hover:opacity-75;
}
</style>
