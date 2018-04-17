<template>
  <div class="wrapper">
    <p>I'm in iframe main</p>
    <div>
      total:{{total}}
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
    count(num) {
      this.total += num
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
