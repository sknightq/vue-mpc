<template>
  <div class="wrapper">
    <p>Dashboard Right Count: {{count}}</p>
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
  mounted() {

  }
}
</script>
<style lang="scss">

</style>

