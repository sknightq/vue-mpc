<template>
  <div class="aepAcrossList" ref="aepAcrossList" v-on:mouseenter="mainenter" v-on:mouseleave="mainleave">
    <div class="overflow-div" ref="overflowDiv" :style="{'max-width':($refs.aepAcrossList?$refs.aepAcrossList.clientWidth:100) - (2 * (listheight.split('px')[0]) - 20) + 'px'}">
      <ul class="across-ul content-ul" ref="contentbox" :style="{'height':listheight,'width':(mydata.length)*(listheight.split('px')[0])-((mydata.length-1)*10)+'px','left':ulleft}">
        <div class="between-div-left" v-on:click="selecti = -1"><i :class="selecti === -1?'active':''"></i></div>
        <li v-for="(item, i) in mydata" :key="i" :style="{'height':listheight,'width':listheight.split('px')[0] - 10 + 'px'}">
          <div class="item-div" v-drag :id="'box'+i">
            <slot name="listitem" v-bind:itemdata="item"></slot>
            <div class="wtemp" v-if="iswtemp"></div>
          </div>
          <div class="between-div" v-on:click="selecti = i"><i :class="selecti === i?'active':''"></i></div>
        </li>
      </ul>
      <div :class="ishover?'myscroll ishover':'myscroll'">
        <span :style="{'width':myscrollwidth+'%'}" v-dragscroll ref="myscroll"></span>
      </div>
    </div>
    <ul class="across-ul handel-ul">
      <li class="handel-li" :style="{'height':listheight,'width':listheight.split('px')[0] - 10 + 'px'}">
        <div class="item-div">
          <div class="i-box" v-on:click="add" style="cursor:pointer;">
            <svg class="svgicon" t="1548642768604" fill="#2772a5" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1098" xmlns:xlink="http://www.w3.org/1999/xlink" width="40" height="40"><path d="M864 480H544V160c0-17.7-14.3-32-32-32s-32 14.3-32 32v320H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h320v320c0 17.7 14.3 32 32 32s32-14.3 32-32V544h320c17.7 0 32-14.3 32-32s-14.3-32-32-32z" p-id="1099"></path></svg>
          </div>
        </div>
      </li>
      <li class="handel-li" :style="{'height':listheight,'width':listheight.split('px')[0] - 10 + 'px'}" ref="deletebox">
        <div class="item-div">
          <div class="i-box">
            <svg t="1548643729485" :class="isDelete?'svgicon active':'svgicon'" fill="#2772a5" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4522" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M647.971299 839.844793c15.030321 0 27.241434-12.196787 27.241434-27.240411L675.212734 485.705124c0-15.043624-12.211113-27.241434-27.241434-27.241434s-27.241434 12.19781-27.241434 27.241434l0 326.899258C620.729865 827.648007 632.939955 839.844793 647.971299 839.844793zM511.763105 839.844793c15.030321 0 27.240411-12.196787 27.240411-27.240411L539.003516 485.705124c0-15.043624-12.21009-27.241434-27.240411-27.241434-15.031345 0-27.242458 12.19781-27.242458 27.241434l0 326.899258C484.52167 827.648007 496.73176 839.844793 511.763105 839.844793zM375.555933 839.844793c15.030321 0 27.241434-12.196787 27.241434-27.240411L402.797367 485.705124c0-15.043624-12.211113-27.241434-27.241434-27.241434-15.031345 0-27.242458 12.19781-27.242458 27.241434l0 326.899258C348.313475 827.648007 360.524588 839.844793 375.555933 839.844793zM811.418882 186.048323 647.971299 186.048323l0-54.482869c0-30.088272-24.39562-54.482869-54.482869-54.482869L430.038802 77.082586c-30.088272 0-54.482869 24.394596-54.482869 54.482869l0 54.482869L212.106304 186.048323c-30.088272 0-54.482869 24.39562-54.482869 54.483892l0 54.482869c0 30.087249 24.394596 54.482869 54.482869 54.482869l0 490.346841c0 60.177568 48.790216 108.965737 108.966761 108.965737l381.381104 0c60.175521 0 108.964714-48.789193 108.964714-108.965737L811.418882 349.497952c30.089295 0 54.482869-24.39562 54.482869-54.482869L865.901751 240.531192C865.902774 210.443943 841.509201 186.048323 811.418882 186.048323zM430.038802 158.806889c0-15.043624 12.211113-27.241434 27.241434-27.241434l108.966761 0c15.030321 0 27.241434 12.19781 27.241434 27.241434l0 27.241434c-26.41665 0-163.449629 0-163.449629 0L430.038802 158.806889zM756.936013 839.844793c0 30.087249-24.393573 54.482869-54.481845 54.482869L321.073064 894.327662c-30.088272 0-54.483892-24.39562-54.483892-54.482869L266.589173 349.497952l490.346841 0L756.936013 839.844793zM784.177448 295.015084 239.347738 295.015084c-15.030321 0-27.241434-12.19781-27.241434-27.242458 0-15.043624 12.211113-27.241434 27.241434-27.241434l544.829709 0c15.030321 0 27.241434 12.19781 27.241434 27.241434C811.418882 282.817274 799.208792 295.015084 784.177448 295.015084z" p-id="4523"></path></svg>
            <div class="check-icon-box" v-if="isDelete">
              <div class="svg-box" v-on:click="deleteItem">
                <svg t="1548646643648" class="icon" fill="#fff" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3046" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M1004.915759 186.032977c-11.563106-11.563106-30.289198-11.665434-41.954632-0.204657L366.489058 775.342061 61.24353 470.096532c-11.563106-11.563106-30.391526-11.563106-41.954632 0s-11.563106 30.391526 0 41.954632l326.018187 326.018187c5.832717 5.832717 13.405016 8.697911 20.977316 8.697911 7.572299 0 15.144599-2.865194 20.874988-8.595583l617.551714-610.184071C1016.274208 216.424503 1016.376536 197.698411 1004.915759 186.032977z" p-id="3047"></path></svg>
              </div>
              <div class="svg-box" v-on:click="isDelete = false">
                <svg t="1548646702518" class="icon" fill="#fff" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4025" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M512 557.223994l249.203712 249.203712c12.491499 12.491499 32.730449 12.489452 45.221948-0.002047s12.493545-32.730449 0.002047-45.221948L557.223994 512l249.203712-249.203712c12.491499-12.491499 12.489452-32.730449-0.002047-45.221948s-32.730449-12.493545-45.221948-0.002047L512 466.776006 262.796288 217.572294c-12.491499-12.491499-32.729425-12.490475-45.220924 0.001023-6.246261 6.246261-9.370415 14.429641-9.370415 22.610974s3.121084 16.365736 9.367345 22.610974L466.774983 512 217.572294 761.203712c-6.246261 6.246261-9.367345 14.428617-9.367345 22.610974s3.125177 16.365736 9.370415 22.610974c12.491499 12.491499 32.729425 12.493545 45.220924 0.002047L512 557.223994z" p-id="4026"></path></svg>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'aepAcrossList',
  props: {
    data: {
      type: Object / Array,
      default: () => {
        return []
      }
    },
    defaultitem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    listheight: {
      type: String,
      default: '80px'
    }
  },
  watch: {
    data() {
      this.mydata = this.data
      setTimeout(() => {
        this.scrolltemp = Math.random()
      }, 0)
    }
  },
  mounted() {
    this.mydata = this.data
    setTimeout(() => {
      this.scrolltemp = Math.random()
    }, 0)
  },
  computed: {
    myscrollwidth() {
      var x = this.scrolltemp
      var maxwidth = (this.$refs.aepAcrossList ? this.$refs.aepAcrossList.clientWidth : 100) - (2 * (this.listheight.split('px')[0]) - 20)
      var ulwidth = (this.$refs.contentbox ? this.$refs.contentbox.clientWidth : 0)
      if (maxwidth > ulwidth) {
        return 0
      }
      var val = maxwidth / ulwidth * 100
      return val + x - x
    }
  },
  data() {
    return {
      mydata: [],
      isDelete: false,
      // 选中中间杠
      selecti: null,
      // 选中列表
      clicki: -1,
      scrolltemp: 0,
      ulleft: 0,
      ishover: false,
      iswtemp: false
    }
  },
  directives: {
    drag: {
      bind: function (el, binding, vnode) {
        var vm = vnode.context
        let odiv = el
        let moveleft = 0
        var moveclientX = 0
        var paddingwidth = 5
        var index = odiv.id.split('box')[1]
        odiv.onmousedown = (e) => {
          vm.clicki = index
          moveleft = 0
          moveclientX = odiv.parentElement.offsetLeft
          vm.iswtemp = false
          // time = new Date().getTime()
          // 算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft
          let disY = e.clientY - odiv.offsetTop
          document.onmousemove = (e) => {
            // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX
            let top = e.clientY - disY
            // 移动当前元素
            if (top < -10) {
              top = -10
            }
            if (top > 10) {
              top = 10
            }
            odiv.style['z-index'] = 1000
            odiv.children[0].style['box-shadow'] = '2px 2px 2px #aaa'
            odiv.style.left = left + 'px'
            odiv.style.top = top + 'px'
            moveleft = left
            vm.iswtemp = true
          }
          document.onmouseup = (e) => {
            vm.iswtemp = false
            // 计算是否接触
            var maxwidth = (vm.$refs.aepAcrossList ? vm.$refs.aepAcrossList.clientWidth : 100) - (2 * (vm.listheight.split('px')[0]) - 20)
            var addwidth = vm.$refs.contentbox.clientWidth
            if (vm.$refs.contentbox.clientWidth > maxwidth) {
              addwidth = maxwidth
            }
            let moveboxWidth = e.target.clientWidth - paddingwidth * 2
            let moveboxLeft = moveleft + vm.$refs.contentbox.offsetLeft + moveclientX
            let deleteboxWidth = vm.$refs.deletebox.clientWidth - paddingwidth * 2
            let deleteboxLeft = vm.$refs.deletebox.offsetLeft + addwidth
            if (moveboxWidth + moveboxLeft >= deleteboxLeft && deleteboxWidth + deleteboxLeft > moveboxLeft) {
              vm.isDelete = true
            }
            // 取消样式
            odiv.style['z-index'] = 0
            odiv.children[0].style['box-shadow'] = ''
            odiv.style.left = 0 + 'px'
            odiv.style.top = 0 + 'px'
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    },
    dragscroll: {
      bind: function (el, binding, vnode) {
        var vm = vnode.context
        let odiv = el
        odiv.onmousedown = (e) => {
          let fwidth = e.target.parentElement.clientWidth
          let disX = e.clientX - odiv.offsetLeft
          document.onmousemove = (e) => {
            let left = e.clientX - disX
            // 移动当前元素
            if (left < 0) {
              left = 0
            } else if ((left / fwidth) * 100 > (100 - vm.myscrollwidth)) {
              left = 100 - vm.myscrollwidth + '%'
            } else {
              left = left / fwidth
            }
            vm.ulleft = '-' + (left * vm.$refs.contentbox.clientWidth) + 'px'
            odiv.style.left = left * 100 + '%'
          }
          document.onmouseup = (e) => {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  },
  methods: {
    update() {
      this.mydata = JSON.parse(JSON.stringify(this.data))
      setTimeout(() => {
        this.scrolltemp = Math.random()
      }, 0)
    },
    add() {
      this.data.splice(this.selecti + 1, 0, JSON.parse(JSON.stringify(this.defaultitem)))
      this.outputData()
    },
    deleteItem() {
      this.data.splice(this.clicki, 1)
      this.isDelete = false
      this.outputData()
      this.$refs.myscroll.style.left = 0
      this.$refs.contentbox.style.left = 0
    },
    outputData() {
      setTimeout(() => {
        this.scrolltemp = Math.random()
      }, 0)
      this.$emit('datachange', this.mydata)
    },
    mainenter(e) {
      this.ishover = true
    },
    mainleave(e) {
      this.ishover = false
    }
  }
}
</script>
<style lang="scss">
.aepAcrossList {
  overflow: hidden;
  background: #f6f6f6;
  .overflow-div{
    float: left;
    position: relative;
  }
  .content-ul{
    position:absolute;
    left:0;
  }
  .across-ul{
    position: relative;
    padding-left: 5px;
    float:left;
    li{
      float:left;
      position: relative;
      -webkit-user-select:none;
      -moz-user-select:none;
      -ms-user-select:none;
      user-select:none;
    }
    .item-div{
      height:100%;
      width:100%;
      padding: 10px 5px;
      box-sizing: border-box;
      position: absolute;
    }
    .between-div{
      height:100%;
      width:10px;
      display: block;
      position: absolute;
      right:-5px;
      top:0px;
      cursor: text;
      i.active{
        background: #e6e6e6;
        border-radius: 1px;
        width:2px;
        display: block;
        margin: 0 auto;
        height:calc(100% - 10px);
        margin-top: 5px;
        animation:bets 1.4s infinite;
        -webkit-animation:bets 1.4s infinite;
      }
    }
    .svgicon{
      position: absolute;
      top:0;
      bottom: 0;
      left:0;
      right:0;
      margin:auto;
      width:20px;
      height:20px;
      text-align: center;
    }
    .svgicon.active{
      top:0;
      bottom:50%;
      left:0;
      right: 0;
      margin: auto;
    }
  }
  .handel-ul{
    padding-left: 0;
    float:left;
    background: #f6f6f6;
  }
  .between-div-left{
    float:left;
    height:100%;
    width:10px;
    display: block;
    position: absolute;
    left:0px;
    top:0px;
    z-index: 100;
    cursor: text;
    i.active{
      background: #e6e6e6;
      border-radius: 1px;
      width:2px;
      display: block;
      margin: 0 auto;
      height:calc(100% - 10px);
      margin-top: 5px;
      animation:bets 1.4s infinite;
      -webkit-animation:bets 1.4s infinite;
    }
  }
  .handel-li{
    .i-box{
      width:100%;
      height:100%;
      background: #efefef;
      position:relative;
    }
  }
  .handel-li:nth-child(1){
    cursor: pointer;
  }
  .check-icon-box{
    width:100%;
    height:50%;
    position: relative;
    .svg-box{
      position: relative;
      width:50%;
      height:100%;
      float: left;
      margin-top: 50%;
    }
    .svg-box:nth-child(1){
      background: #8f2f28;
    }
    .svg-box:nth-child(2){
      background: #adadad;
    }
    .icon{
      position:absolute;
      top:0;
      bottom:0;
      left:0;
      right: 0;
      margin: auto;
      width:20px;
      height:20px;
      cursor: pointer;
    }
  }
  .myscroll{
    position: absolute;
    bottom:1px;
    height:8px;
    width:100%;
    opacity: 0;
    transition: opacity 0.4s;
    -moz-transition: opacity 0.4s;
    -webkit-transition: opacity 0.4s;
    -o-transition: opacity 0.4s;
    span{
      display: block;
      position: absolute;
      background-color: #aaa;
      height:100%;
      border-radius: 4px;
    }
  }
  .ishover{
    opacity: 1;
  }
  .wtemp{
    position: absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
  }
}

@keyframes bets
  {
    0% { opacity: 1; }
    49% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 0; }
  }
@-webkit-keyframes bets
  {
    0% { opacity: 1; }
    49% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 0; }
  }
</style>
