<template>
  <div class="factor-detail clearfix">
    <div class="factor-data">
      <p>
        <button type="button" class="btn factor-label" v-on:click="openChemical()" :title="factorName">{{ factorName }}</button>
        <button type="button" class="btn trace-source" v-on:click="openTraceSource()" :class="traceSourceStatus">{{traceSourceBtn}}</button>
      </p>
      <p>{{ sDateFormat }}>{{ eDateFormat }}</p>
      <p class="avg-value" :title="avgTitle">
        <label>平均值：<span v-for="(avg, i) in stationsAvg" v-bind:key="i">{{ avg.val }}({{ avg.name }})</span></label>
      </p>
      <p :title="valTitle" v-show="stationsVals.length">
        <label>
          范围：<span v-for="(station, i) in stationsVals" v-bind:key="i">{{ isVaildValue(station.vals, 0) }}->{{ isVaildValue(station.vals, station.vals.length - 1)}}{{ unit }}({{ station.name }})</span>
        </label>
      </p>
    </div>
    <div class="factor-analyze clearfix">
      <div class="custom-chart-item" v-on:dblclick="customChartDetail('city')" v-if="showCities">
        <custom-chart
          :chart-config="cityConfig"
          :external-config="stationsAvg"
          chart-type="city"
          chart-title="城市比较"
          :chart-colors="cityColors"
          :chart-mapping="cityMapping"
          :chart-unit="unit"
          :ref="'city'"
        ></custom-chart>
      </div>
      <div class="custom-chart-item" v-on:dblclick="customChartDetail('season')">
        <custom-chart :chart-config="seasonConfig" chart-type="season" chart-title="季节比较" :chart-colors="colors" :chart-unit="unit" :chart-mapping="seasonMapping" :ref="'season'"></custom-chart>
      </div>
    </div>
  </div>
</template>

<script>
// styles is in env-analyze
export default {
  name: 'aepFactorComb',
  components: {
    'custom-chart': CustomChart
  },
  props: {
    factorName: {
      type: String
    },
    factorId: {
      type: String
    },
    chemicalId: {
      type: String
    },
    factorType: {
      type: Number
    },
    stationsId: {
      type: Array
    },
    unit: {
      type: String
    },
    colors: {
      type: Array
    },
    sDate: {
      type: [Date, String]
    },
    eDate: {
      type: [Date, String]
    },
    // 是否显示城市对比，企业排口不显示
    showCities: {
      type: Boolean,
      default: true
    },
    // 平均值对比的api配置
    factorsAverage: {
      type: Object
    },
    // 城市对比的api配置
    factorsCities: {
      type: Object
    },
    // 季节对比的api配置
    factorsSeasons: {
      type: Object
    },
    // 是否要Resize子组件（城市对比和季节对比chart resize）
    isResize: {
      type: Boolean,
      default: false
    },
    // 因子id是否和化学品ID绑定
    isBinding: {
      type: Boolean,
      default: false
    },
    openType: {
      type: String,
      default: 'contentPage'
    },
    popupPathPreffix: {
      type: String,
      default: ''
    },
    rangeApi: {
      type: Object
    },
    dataTypeSelected: {
      type: String
    },
    dataFromSelected: {
      type: Number,
      default: 0
    },
    traceSourceStatus:{
      type: String,
      default: 'ready'
    }
    
  },
  data() {
    return {
      stationsAvg: [],
      cityConfig: {},
      seasonConfig: {},
      stationsVals: [],
      minValue: 0,
      vType: 0,
      containerWidth: 0,
      cityMapping: {
        value: 'val',
        name: 'name',
        colorKey: 'id'
      },
      seasonMapping: {
        value: 'Val',
        colorKey: 'Stid',
        groupKey: 'Season'
      },
      traceSourceBtn: {
        'ready': '溯源',
        'loading': '创建中',
        'finished': '关闭'
      }
    }
  },
  computed: {
    avgTitle() {
      var title = ''
      for (var i = 0; i < this.stationsAvg.length; i++) {
        title +=
          '[' + this.stationsAvg[i].name + ':' + this.stationsAvg[i].val + '] '
      }
      return title
    },
    valTitle() {
      var title = ''
      for (var i = 0; i < this.stationsVals.length; i++) {
        if (JSON.stringify(this.stationsVals[i]) !== '{}') {
          var len = this.stationsVals[i].vals.length
          title +=
            '[' +
            this.stationsVals[i].vals[0].val +
            ',' +
            this.stationsVals[i].vals[len - 1].val +
            '](' +
            this.stationsVals[i].name +
            ') '
        }
      }
      return title
    },
    cityColors() {
      var self = this
      var otherColor = 'rgb(254,188,56)'
      var tempColors = {
        '': otherColor
      }
      self.stationsId.forEach((stationId, index) => {
        tempColors[stationId] = self.colors[index]
      })
      return tempColors
    },
    seasonColors() {
      var self = this
      var otherColor = 'rgb(254,188,56)'
      var tempColors = {
        '': otherColor
      }
      self.stationsId.forEach((stationId, index) => {
        tempColors[stationId] = self.colors[index]
      })
      return tempColors
    },
    sDateFormat() {
      if (this.isValidDate(this.sDate)) {
        return this.formatDate(this.sDate)
      } else if (typeof this.sDate === 'string') {
        return this.sDate.substr(0, 10)
      } else {
        console.error(new Error('Invalid sDate value in factor-comb.js'))
      }
      return ''
    },
    eDateFormat() {
      if (this.isValidDate(this.eDate)) {
        return this.formatDate(this.eDate)
      } else if (typeof this.eDate === 'string') {
        return this.eDate.substr(0, 10)
      } else {
        console.log(new Error('Invalid eDate value in factor-comb.js'))
      }
      return ''
    },
    subTitle() {
      return (
        this.factorName +
        '-' +
        this.stationsAvg
          .map(function(avg) {
            return avg.name
          })
          .join(',')
      )
    }
  },
  watch: {
    isResize(newResize, oldResize) {
      if (newResize !== oldResize) {
        for (var i = 0; i < this.$children.length; i++) {
          this.$children[i].resize()
        }
      }
    },
    sDate() {
      this.getFactorAvarage()
      if (this.showCities) {
        this.cityConfig = this.getFactorCity()
        this.getFactoryRange()
      }
      this.seasonConfig = this.getFactorySeason()
    },
    eDate() {
      this.getFactorAvarage()
      if (this.showCities) {
        this.cityConfig = this.getFactorCity()
        this.getFactoryRange()
      }
      this.seasonConfig = this.getFactorySeason()
    },
    dataTypeSelected() {
      this.getFactorAvarage()
      if (this.showCities) {
        this.getFactoryRange()
      }
    },
    unit(newUnit) {
      if (newUnit === 'ppbv') {
        this.vType = 0
      } else if (newUnit === 'μg/m³') {
        this.vType = 5
      } else {
        this.vType = 0
      }
    }
  },
  created() {
    this.getFactorAvarage()
    if (this.showCities) {
      this.cityConfig = this.getFactorCity()
      this.getFactoryRange()
    }
    this.seasonConfig = this.getFactorySeason()
  },
  methods: {
    isVaildValue(array, index) {
      if (array instanceof Array && typeof array[index] === 'number') {
        return array[index]
      }else{
        return ''
      }
    },
    // detect the Date object whether is an instance of Date
    isValidDate(date) {
      return (
        date &&
        Object.prototype.toString.call(date) === '[object Date]' &&
        !isNaN(date)
      )
    },
    // formate a date to 'YYYY-MM-DD'
    formatDate(date) {
      var year = date.getFullYear()
      var month = ('00' + (date.getMonth() + 1)).slice(-2)
      var day = ('00' + date.getDate()).slice(-2)
      return [year, month, day].join('-')
    },
    openTraceSource() {
      var self = this
      if (self.factorType !== undefined) {
        if (self.factorType === 0) {
          self.$emit('trace-source', self.chemicalId)
        } else {
          alert('无对应化学品信息，无法溯源')
        }
      } else {
        window.aepConsumeService(
          'Com_Shared_GetFactorsByid',
          {
            id: [self.chemicalId]
          },
          function(resp) {
            if (resp[0] && resp[0][0] && resp[0][0].isbinding) {
              self.$emit('trace-source', self.chemicalId)
            } else {
              alert('无对应化学品信息，无法溯源')
            }
          }
        )
      }
    },
    openChemical() {
      var self = this
      if (this.factorType !== undefined) {
        if (this.factorType === 0) {
          self.openFactorPage()
        } else {
          alert('无对应化学品详情')
        }
      } else {
        window.aepConsumeService(
          'Com_Shared_GetFactorsByid',
          {
            id: [self.chemicalId]
          },
          function(resp) {
            if (resp[0] && resp[0][0] && resp[0][0].isbinding) {
              self.openFactorPage()
            } else {
              alert('无对应化学品详情')
            }
          }
        )
      }
    },
    openFactorPage() {
      var self = this
      var pagePath = shareurl + 'Chemical/EnvironmentStandard' //"http://gx.azuratech.com:30001/Chemical/ChemicalDetail";
      //var pagePath = "http://localhost:30003/" + 'Chemical/EnvironmentStandard';
      if (self.openType === 'contentPage') {
        window.aepAddContentPage(
          pagePath,
          400,
          {
            id: self.chemicalId,
            modtype: 'other',
            mode: 'DETAIL',
            dis: 'DIS',
            shareUrl: shareurl,
            pageType: 'content'
          },
          'chemicalDetail',
          'chemicalDetail123',
          {}
        )
      } else if (
        self.openType === 'screenBox' ||
        self.openType === 'popupBox'
      ) {
        window.aepGetMapRegion(function(bounds) {
          var lng = (bounds.NE.lng + bounds.SW.lng) / 2
          var lat = (bounds.NE.lat + bounds.SW.lat) / 2
          window.aepAddPopupBox(
            pagePath,
            300,
            600,
            lng,
            lat,
            'wgs84',
            {
              id: self.chemicalId,
              modtype: 'other',
              mode: 'DETAIL'
            },
            'chemicalDetail',
            'chemicalDetail123'
            //{offset: {x: 100, y: 100}}
          )
        })
      }
    },
    getFactorAvarage() {
      var self = this
      window
        .aepAxios(self.factorsAverage.method, self.factorsAverage.url, {
          refIds: self.stationsId,
          fromType: self.dataFromSelected,
          facId: self.factorId,
          sDate: self.sDateFormat,
          eDate: self.eDateFormat,
          vType: self.vType,
          dataType: 0,
          dType: self.dataTypeSelected
        })
        .then(function(resp) {
          self.stationsAvg = resp.data
        })
        .catch(function(error) {
          console.log(error)
        })
    },
    getFactoryRange() {
      var self = this
      window
        .aepAxios(self.rangeApi.method, self.rangeApi.url, {
          refIds: self.stationsId,
          fromType: self.dataFromSelected,
          facId: self.factorId,
          sDate: self.sDateFormat,
          eDate: self.eDateFormat,
          dType: self.dataTypeSelected,
          vType: self.vType,
          dataType: 0
        })
        .then(function(resp) {
          if (resp && resp.data instanceof Array) {
            self.stationsVals = resp.data.map(function(station) {
              if (station.vals instanceof Array && station.vals.length) {
                return {
                  id: station.id,
                  name: station.name,
                  vals: station.vals.sort(function(a, b) {
                    return a.val - b.val
                  })
                }
              } else {
                return {}
              }
            })
          }
        })
    },
    getFactorCity() {
      return {
        method: this.factorsCities.method,
        url: this.factorsCities.url,
        params: {
          facId: this.factorId,
          subType: 0,
          vType: 0
        }
      }
    },
    getFactorySeason() {
      return {
        method: this.factorsSeasons.method,
        url: this.factorsSeasons.url,
        params: {
          refIds: this.stationsId,
          fromType: this.dataFromSelected,
          facId: this.factorId,
          eDate: this.eDateFormat,
          vType: 0,
          dataType: 0
        }
      }
    },
    customChartDetail(type) {
      this.$refs[type].openNewPage(
        this.subTitle,
        '',
        this.openType,
        this.popupPathPreffix
      )
    }
  }
}
</script>
