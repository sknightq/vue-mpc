<template>
  <div id="app">
    <p>You are in module
      <strong>A</strong> page
    </p>
    <a v-bind:href="path" v-on:click="changePath">Click here to enjoy the vue-router （switch the components）</a>
    <router-view/>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pathFlag: false,
      path: '/views/moduleA/home.html#/b'
    }
  },
  // 实例初始化最之前，无法获取到data里的数据
  beforeCreate() {},
  // 在挂载开始之前被调用
  beforeMount() {},
  // 已成功挂载，相当ready()
  mounted() {
    class Dog {
      constructor() {
        this.name = 'dfsb'
        this.age = '25'

        this.eatShit = function() {
          console.log('So delicous !')
        }
        this.fuckLcc = function() {
          console.log('Where is my dick ?')
        }
      }
    }

    const dog = new Dog()
    console.log(dog)
    for (let attr in Dog.prototype) {
      console.log(attr)
    }
    for (let attr in dog) {
      console.log(attr)
    }
  },
  // 相关操作事件
  methods: {
    changePath() {
      if (!this.pathFlag) {
        this.path = '/views/moduleA/home.html#/'
      } else {
        this.path = '/views/moduleA/home.html#/b'
      }
      this.pathFlag = !this.pathFlag
    }
  }
}
</script>

<style lang="scss">

</style>
