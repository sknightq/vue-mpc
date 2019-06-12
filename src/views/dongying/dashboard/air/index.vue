<template>
  <div class="wrapper">
    <p>in dashboard air</p>
    <button type="button" @click="add">增加</button>
    <nav>
      <router-link to="/left">left</router-link> |
      <router-link to="/right">right</router-link>
    </nav>
    <router-view></router-view>
  
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {

  },
  mounted() {

  },
  beforeRouteUpdate(to, from, next) {
      console.log(to)
      console.log(from)
  },
  methods:{
    add() {
      this.$store.commit('increment')
    }
  }
}
</script>
<style lang="scss">

</style>

