<template>
  <div class="wrapper">
    <p>Dashboard Left Count: {{count}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  created() {

  },
  beforeRouteUpdate(to, from, next) {
      console.log(to)
      console.log(from)
  },
  mounted() {

  }
}
</script>
<style lang="scss">

</style>

