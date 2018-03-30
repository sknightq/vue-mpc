<template>
  <div id="app">
    <p>现在是在module A page</p>
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {},
  // 相关操作事件
  methods: {}
}
</script>

<style lang="scss">

</style>
