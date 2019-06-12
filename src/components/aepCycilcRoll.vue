<template>
  <div name="cyclicroll" :style="{height:boxHeight}" class="cyclicroll" ref="cyclicroll" v-on:mouseenter="mouseenter" v-on:mouseleave="mouseleave">
    <div :id="'p'+id" :class="'css'+id" :ref="'fa'+id">
      <div :ref="'ref'+id">
        <slot></slot>
      </div>
      <div ref="copy" :class="active?'active':'none'"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    boxHeight: {
      type: String,
      default: '100px'
    },
    speed: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      id: '',
      myheight: 0,
      active: true
    }
  },
  created() {
    this.id = parseInt(Math.random() * 10000)
  },
  mounted() {
    this.update()
    if(window.PerfectScrollbar) {
      new PerfectScrollbar(this.$refs.cyclicroll)
    }
  },
  methods: {
    update() {
      setTimeout(()=>{
        this.getHeight()
      },0)
    },
    mouseenter() {
      var dom = document.getElementById('style' + this.id)
      this.active = false
      if(dom){
        dom.remove()
      }
    },
    mouseleave() {
      var dom = document.getElementById('style' + this.id)
      this.active = true
      if(!dom && this.$refs.cyclicroll.clientHeight < this.myheight){
        this.addKeyFrames('-' + this.myheight + 'px')
      }
    },
    getHeight() {
      this.myheight = this.$refs['ref' + this.id].clientHeight
      if(this.$refs.cyclicroll.clientHeight < this.myheight) {
        var el = this.$refs['fa'+this.id]
        var child = el.childNodes[0].innerHTML
        var doo = this.$refs.copy
        doo.innerHTML = child
        if(el.childNodes.length === 0){
          el.appendChild(doo)
        }
        this.addKeyFrames('-' + this.myheight + 'px')
      }
    },
    addKeyFrames(y) {
      var style = document.createElement('style')
      style.type = 'text/css'
      style.id = 'style' + this.id
      var keyFrames = '\
      @-webkit-keyframes cssSTYLE {\
        0% {\
          -webkit-transform: translate3d(0, 0, 0);\
          transform: translate3d(0, 0, 0);\
        }\
        100% {\
          -webkit-transform: translate3d(0, HEIGHT_VALUE, 0);\
          transform: translate3d(0, HEIGHT_VALUE, 0);\
        }\
      }\
      @keyframes cssSTYLE {\
        0% {\
          -webkit-transform: translate3d(0, 0, 0);\
          transform: translate3d(0, 0, 0);\
        }\
        100% {\
          -webkit-transform: translate3d(0, HEIGHT_VALUE, 0);\
          transform: translate3d(0, HEIGHT_VALUE, 0);\
        }\
      }\
      .cssSTYLE {\
        -webkit-animation: SPEEDs cssSTYLE linear infinite normal;\
        animation: SPEEDs cssSTYLE linear infinite normal;\
        position: relative;\
      }'
      var x = keyFrames.replace(/HEIGHT_VALUE/g, y)
      var z = x.replace(/STYLE/g, this.id)
      var s = z.replace(/SPEED/g, this.myheight / (this.speed * 10))
      style.innerHTML = s
      document.getElementsByTagName('head')[0].appendChild(style)
    }
  }
}
</script>
<style lang="scss" scoped>
.cyclicroll {
  position: relative;
  overflow-y: auto;
}
.none {
  display: none;
}
.active {
  display: block;
}
</style>
