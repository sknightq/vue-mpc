<template>
  <div class="wrapper">
    <p>I'm in iframe other</p>
    <div>
      <button type="button" v-on:click="add(1)">+1</button>
      <button type="button" v-on:click="add(2)">+2</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0
    }
  },
  methods: {
    add(num) {
      const mainIframe = top.document.getElementById('main')
      mainIframe.contentWindow.updateView(num)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
