<template>
  <div class="aep-echarts" :id="`aep-echarts-${name}`"></div>
</template>
<script>
export default {
  name: 'aep-echarts',
  props: {
    name: {
      type: String,
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    },
    settings: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      chart: {}
    }
  },
  watch: {
    options: {
      handler(newVal) {
        this.chart.setOption(newVal)
      },
      deep: true
    }
  },
  create() {},
  mounted() {
    if (
      window.echarts &&
      window.echarts.init &&
      typeof window.echarts.init === 'function'
    ) {
      this.chart = window.echarts.init(this.$el, '', this.settings)
      this.chart.setOption(this.options)
      this.$emit('ready', this.chart)
    }
  },
  beforeDestroy() {}
}
</script>
