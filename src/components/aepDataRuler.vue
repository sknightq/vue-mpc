<template>
  <div class="dataRuler">
    <div class="ruler-big-box">
      <div class="alarmbox">
        <span>超标值</span>
        <div class="rulerActive" :style="{'margin':ruler.margin,'width':'calc(100% - '+(ruler.leftwidth+ruler.rightwidth)+'px)'}">
          <div class="myalarm alarmMin" :style="{'left':alarmleft}">
            <div class="inputbox">
              <div class="mycheckbox" v-on:click="check1=!check1">
                <svg class="checksvg" viewBox="5 5 20 20">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <circle :class="check1?'check':'nocheck'" cx="15" cy="15" r="9"/>
                    <g>
                      <rect x="12.3" y="15.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.0386 16.8516)" fill="#FFFFFF" width="10" height="1.3"/>
                      <rect x="12" y="14.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.5637 13.9901)" fill="#FFFFFF" width="1.3" height="5.5"/>
                    </g>
                  </g>
                </svg>
              </div>
              <input v-if="check1" v-model="alarmMin"/>
            </div>
            <i class="after"></i>
          </div>
          <div class="myalarm alarmMax" :style="{'right':alarmright}">
            <div class="inputbox">
              <div class="mycheckbox" v-on:click="check2=!check2">
                <svg class="checksvg" viewBox="5 5 20 20">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <circle :class="check2?'check':'nocheck'" cx="15" cy="15" r="9"/>
                    <g>
                      <rect x="12.3" y="15.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.0386 16.8516)" fill="#FFFFFF" width="10" height="1.3"/>
                      <rect x="12" y="14.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.5637 13.9901)" fill="#FFFFFF" width="1.3" height="5.5"/>
                    </g>
                  </g>
                </svg>
              </div>
              <input v-if="check2" v-model="alarmMax"/>
            </div>
            <i class="after"></i>
          </div>
        </div>
      </div>
      <div class="rulerbox">
        <div ref="leftd1" :class="mintext===infText?'d1span minval widthzero':'d1span minval'" v-if="mintext !== ''"><span v-html="sete(mintext, true)"></span></div>
        <div class="dataRulercontent" :style="{'width':contentWidth}">
          <ul class="colorRuler">
            <li v-for="(item, i) in rulerData" :key="i" :style="{'background':item.color, 'width': subt(item.length, rulerLength) * 100 +'%'}"></li>
          </ul>
          <ul class="scaleRuler">
            <li v-for="(item, i) in scaleData" :key="i" :style="{'width': subt(item.length, rulerLength) * 100 +'%'}">
              <span v-html="sete(item.text)"></span>
            </li>
          </ul>
        </div>
        <div ref="rightd1" class="d1span maxval" v-if="maxtext !== ''"><span v-html="sete(maxtext, true)"></span></div>
      </div>
      <div class="alarmbox">
        <span class="title">预警值</span>
        <div class="rulerActive" :style="{'margin':ruler.margin,'width':'calc(100% - '+(ruler.leftwidth+ruler.rightwidth)+'px)'}">
          <div class="warning alarmMin" :style="{'left':warningleft}">
            <div class="inputbox">
              <div class="mycheckbox" v-on:click="check3=!check3">
                <svg class="checksvg" viewBox="5 5 20 20">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <circle :class="check3?'check':'nocheck'" cx="15" cy="15" r="9"/>
                    <g>
                      <rect x="12.3" y="15.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.0386 16.8516)" fill="#FFFFFF" width="10" height="1.3"/>
                      <rect x="12" y="14.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.5637 13.9901)" fill="#FFFFFF" width="1.3" height="5.5"/>
                    </g>
                  </g>
                </svg>
              </div>
              <input v-if="check3" v-model="ewMin"/>
            </div>
            <i class="after"></i>
          </div>
          <div class="warning alarmMax" :style="{'right':warningright}">
            <div class="inputbox">
              <div class="mycheckbox" v-on:click="check4=!check4">
                <svg class="checksvg" viewBox="5 5 20 20">
                  <g xmlns="http://www.w3.org/2000/svg">
                    <circle :class="check4?'check':'nocheck'" cx="15" cy="15" r="9"/>
                    <g>
                      <rect x="12.3" y="15.1" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -6.0386 16.8516)" fill="#FFFFFF" width="10" height="1.3"/>
                      <rect x="12" y="14.6" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -8.5637 13.9901)" fill="#FFFFFF" width="1.3" height="5.5"/>
                    </g>
                  </g>
                </svg>
              </div>
              <input v-if="check4" v-model="ewMax"/>
            </div>
            <i class="after"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="rbutton" v-on:click="ise = !ise">
      <span v-if="!ise">线性刻度</span>
      <span v-if="ise">对数刻度</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aepDataRuler',
  props: {
    rulerdata: {
      type: Array,
      default: () => {
        return []
      }
    },
    scale: {
      type: Number,
      default: 0
    },
    alarm: {
      type: Object,
      default: () => {
        return {
          alarmMin: null,
          alarmMax: null,
          warningMin: null,
          warningMax: null
        }
      }
    }
  },
  data() {
    return {
      MATHTEMP: 100000000,
      data: [],
      // 刻度单位值
      myscale: 0,
      // 最大值，最小值
      tomin: 0,
      tomax: 0,
      // 颜色块值
      rulerData: [],
      // 颜色块长度
      rulerLength: 0,
      // 刻度值
      scaleData: [],
      // 最大最小值刻度显示
      mintext: '',
      maxtext: '',
      // 负无限 text
      infText: '-∞',
      // 输入报警值
      alarmMin: '',
      alarmMax: '',
      // 输入预警值
      ewMin: '',
      ewMax: '',
      // 刻度尺信息
      ruler: {},
      // 是否是对数刻度
      ise: false,
      // 是否选中
      check1: false,
      check2: false,
      check3: false,
      check4: false
    }
  },
  watch: {
    rulerdata() {
      this.data = JSON.parse(JSON.stringify(this.rulerdata))
    },
    scale() {
      this.myscale = this.scale
    },
    'alarm.alarmMin': function() {
      this.setinputData()
    },
    'alarm.alarmMax': function() {
      this.setinputData()
    },
    'alarm.warningMin': function() {
      this.setinputData()
    },
    'alarm.warningMax': function() {
      this.setinputData()
    },
    alarmMin() {
      this.outputData()
    },
    alarmMax() {
      this.outputData()
    },
    ewMin() {
      this.outputData()
    },
    ewMax() {
      this.outputData()
    },
    check1() {
      this.outputData()
    },
    check2() {
      this.outputData()
    },
    check3() {
      this.outputData()
    },
    check4() {
      this.outputData()
    }
  },
  computed: {
    contentWidth() {
      var w = 100
      if (this.mintext !== '' && this.mintext !== this.infText) {
        w = w - 10
      }
      if (this.maxtext !== '') {
        w = w - 10
      }
      w = w + '%'
      return w
    },
    alarmleft() {
      var val = ((this.alarmMin - this.tomin) * 100 / this.rulerLength)
      if (val < 0) {
        val = 0
      } else if (val > 100) {
        val = 100
      }
      return val + '%'
    },
    alarmright() {
      var val = ((this.alarmMax - this.tomin) * 100 / this.rulerLength)
      if (val < 0) {
        val = 0
      } else if (val > 100) {
        val = 100
      }
      if (!this.alarmMax) {
        val = 100
      }
      val = 100 - val
      return val + '%'
    },
    warningleft() {
      var val = ((this.ewMin - this.tomin) * 100 / this.rulerLength)
      if (val < 0) {
        val = 0
      } else if (val > 100) {
        val = 100
      }
      return val + '%'
    },
    warningright() {
      var val = ((this.ewMax - this.tomin) * 100 / this.rulerLength)
      if (val < 0) {
        val = 0
      } else if (val > 100) {
        val = 100
      }
      if (!this.ewMax) {
        val = 100
      }
      val = 100 - val
      return val + '%'
    }
  },
  mounted() {
    this.update()
  },
  methods: {
    update() {
      var self = this
      setTimeout(() => {
        self.data = JSON.parse(JSON.stringify(self.rulerdata))
        self.setScaleData()
        if (self.scale === 0) {
          self.setScale()
        } else {
          self.myscale = self.scale
        }
        self.setinputData()
        self.setData()
      }, 0)
    },
    sum(a, b) {
      return (a * this.MATHTEMP + b * this.MATHTEMP) / this.MATHTEMP
    },
    subt(a, b) {
      return (a * this.MATHTEMP) / (b * this.MATHTEMP)
    },
    sete(num, isruler) {
      if (!this.ise) {
        return num
      } else {
        var i = 0
        if (num > 1) {
          while (num > 1) {
            num = num / 10
            i++
          }
          if (num < 1) {
            num = num * 10
            i--
          }
        } else {
          while (num < 1) {
            num = num * 10
            i--
          }
        }
        if (i === 0) {
          i = ''
        }
        var color = '#ffffff'
        if (isruler) {
          color = '#2772a5'
        }
        return num + '*10<sup><svg width="30" height="10" viewBox="0 0 30 10"><text font-size="10" x="4" y="1em" fill="' + color + '">' + i + '<text></svg></sup>'
      }
    },
    // 计算刻度值
    setScale() {
      var min, max
      this.data.forEach((item, i) => {
        if (i === 0) {
          min = item.min
          max = item.max
        }
        if (item.min < min) {
          min = item.min
        }
        if (item.max > max) {
          max = item.max
        }
      })
      this.tomin = JSON.parse(JSON.stringify(min))
      this.tomax = JSON.parse(JSON.stringify(max))
      var scaletemp = (this.subt(this.sum(max, min * -1), this.data.length + 1))
      this.myscale = this.setRoundData(scaletemp)
      if (this.data[0].min === null) {
        this.data[0].min = this.sum(this.data[0].max, this.myscale * -1)
        this.tomin = this.data[0].min
      }
      if (this.data[this.data.length - 1].max === null) {
        this.data[this.data.length - 1].max = this.sum(this.data[this.data.length - 1].min, this.myscale)
        this.tomax = this.data[this.data.length - 1].max
      }
    },
    // 设置刻度值
    setScaleData() {
      this.mintext = ''
      this.maxtext = ''
      if (this.rulerdata[0].min !== null) {
        this.mintext = this.rulerdata[0].min
      } else {
        this.mintext = this.infText
      }
      if (this.rulerdata[this.rulerdata.length - 1].max !== null) {
        this.maxtext = this.rulerdata[this.rulerdata.length - 1].max
      }
    },
    // 设置输入框内值
    setinputData() {
      if (this.alarm.alarmMin !== null) {
        this.check1 = true
        this.alarmMin = this.alarm.alarmMin
      } else {
        this.check1 = false
      }
      if (this.alarm.alarmMax !== null) {
        this.check2 = true
        this.alarmMax = this.alarm.alarmMax
      } else {
        this.check2 = false
      }
      if (this.alarm.warningMin !== null) {
        this.check3 = true
        this.ewMin = this.alarm.warningMin
      } else {
        this.check3 = false
      }
      if (this.alarm.warningMax !== null) {
        this.check4 = true
        this.ewMax = this.alarm.warningMax
      } else {
        this.check4 = false
      }
    },
    // 计算修约
    setRoundData(scaletemp) {
      if (scaletemp < 1) {
        const zerolength = (scaletemp + '').split('.')[0].split('').length
        const powd = Math.pow(10, zerolength)
        return Math.round(scaletemp * powd) / powd
      } else {
        const numlength = (scaletemp.toFixed(5) + '').split('.')[0].split('').length
        const powd = Math.pow(10, numlength - 1)
        return Math.round(scaletemp / powd) * powd
      }
    },
    // 计算margin
    rulerActiveMargin() {
      var left = this.$refs.leftd1 ? this.$refs.leftd1.offsetWidth : 0
      var right = this.$refs.rightd1 ? this.$refs.rightd1.offsetWidth : 0
      var margin = '0 ' + right + 'px 0 ' + left + 'px'
      this.ruler = {
        margin: margin,
        leftwidth: left,
        rightwidth: right
      }
    },
    // 设置数据
    setData() {
      var self = this
      var rulerData = []
      var scaleData = []
      self.rulerLength = 0
      this.data.forEach((item, i) => {
        var itemTemp = item
        if (item.min !== null && item.max !== null) {
          itemTemp.length = self.sum(item.max, item.min * -1)
          rulerData.push(itemTemp)
          if (i === 0) {
            var scaled = this.setRoundData(self.sum(self.tomin, self.myscale))
            scaleData.push({
              text: scaled,
              length: scaled - self.tomin
            })
          }
        }
      })
      while (self.sum(scaleData[scaleData.length - 1].text, self.myscale) <= this.tomax) {
        scaleData.push({
          text: self.sum(scaleData[scaleData.length - 1].text, self.myscale),
          length: self.myscale
        })
      }
      rulerData.forEach(item => {
        self.rulerLength = self.sum(self.rulerLength, item.length)
      })
      this.rulerData = rulerData
      this.scaleData = scaleData
      setTimeout(() => {
        self.rulerActiveMargin()
      }, 100)
    },
    outputData() {
      var alarm = {
        alarmMin: this.alarmMin,
        alarmMax: this.alarmMax,
        warningMin: this.ewMin,
        warningMax: this.ewMax
      }
      if (!this.check1) {
        alarm.alarmMin = null
      }
      if (!this.check2) {
        alarm.alarmMax = null
      }
      if (!this.check3) {
        alarm.warningMin = null
      }
      if (!this.check4) {
        alarm.warningMax = null
      }
      this.$emit('alarmchange', alarm)
    }
  }
}
</script>
<style lang="scss" scoped>
.dataRuler{
  position: relative;
  overflow: hidden;
  height: 80px;
}
.colorRuler{
  overflow: hidden;
  li{
    float: left;
    height:20px;
  }
}
.dataRulercontent{
  overflow: hidden;
  float: left;
  height: 20px;
  position: relative;
}
.scaleRuler{
  width: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  li{
    height: 20px;
    float: left;
    border-right: 2px solid #fff;
    color: #fff;
    position: relative;
    box-sizing: border-box;
    span{
      position: absolute;
      bottom: 0px;
      font-size: 12px;
      left: calc(100% + 5px);
      min-width:30px;
    }
    .ismin{
      left: calc(100% + 5px);
    }
  }
}
.rulerbox{
  height:20px;
}
.d1span{
  float: left;
  color: #2772a5;
  background: #d1d1d1;
  width:10%;
  height: 20px;
  position: relative;
  box-sizing: border-box;
  font-size: 12px;
  span{
    position: absolute;
    z-index: 100;
    bottom: 0;
    min-width:30px;
  }
}
.minval{
  border-right: 2px solid #fff;
  span{
    left: calc(100% + 5px);
  }
}
.maxval{
  border-left: 2px solid #fff;
}
.widthzero{
  width:0px;
  border: 0;
}
.alarmbox{
  height: 30px;
  font-size: 13px;
  position: relative;
  .title{
    position: absolute;
    bottom: 0;
  }
}
.rulerActive{
  height: 30px;
  font-size: 13px;
  position: absolute;
  left: 0;
  top:0;
}
.inputbox{
  background: #fff;
  width:60px;
  height:20px;
  position: absolute;
  input{
    width:40px;
    border: 0;
    height: 20px;
    outline: none;
    text-align: right;
    position: absolute;
    z-index: 100;
    left:20px;
    top:0;
  }
}
.mycheckbox{
  position: absolute;
  left:0;
  top:0;
  width:60px;
  height:20px;
  background: #fff;
  z-index: 100;
  cursor: pointer;
}
.myalarm{
  position: absolute;
  top:0;
  height:30px;
  overflow: hidden;
  transition: all 0.5s ease 0.5s;
  -moz-transition: all 0.5s ease 0.5s;
  -webkit-transition: all 0.5s ease 0.5s;
  -o-transition: all 0.5s ease 0.5s;
}
.alarmMin{
  width:60px;
}
.alarmMin .after{
  width:20px;
  height:20px;
  position: absolute;
  top:5px;
  left:-10px;
  background: #d1d1d1;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
}
.alarmMax{
  width:60px;
}
.alarmMax .after{
  width:20px;
  height:20px;
  position: absolute;
  top:5px;
  right:-10px;
  background: #d1d1d1;
  transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
}
.warning{
  position: absolute;
  top:0;
  height:30px;
  overflow: hidden;
  transition: all 0.5s ease 0.5s;
  -moz-transition: all 0.5s ease 0.5s;
  -webkit-transition: all 0.5s ease 0.5s;
  -o-transition: all 0.5s ease 0.5s;
  .inputbox{
    bottom: 0;
  }
}
.ruler-big-box{
  float: left;
  width:calc(100% - 90px);
}
.rbutton{
  background: #2772a5;
  color: #fff;
  text-align: center;
  margin-left: 4px;
  width:85px;
  line-height: 20px;
  margin-top: 30px;
  float: left;
  cursor: pointer;
  font-size: 13px;
}
.check{
  fill: #2772a5;
}
.nocheck{
  fill: #e0e0e0;
}
.checksvg {
  width:16px;
  height:16px;
  margin: 2px;
}
</style>
