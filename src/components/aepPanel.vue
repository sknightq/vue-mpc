<template>
  <div class="aep-panel">
    <div class="aep-panel-heading">
      {{title}}
      <span class="close-btn" v-if="close" v-on:click="handleClose">
        <icon name="close"></icon>
      </span>
    </div>
    <slot name="body" class="aep-panel-body"></slot>
    <div class="aep-panel-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    close: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    handleClose() {
      console.log('panel close')
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.aep-panel {
  background-color: $color-white;
  position: relative;
  height: 100%;
}
.aep-panel-heading {
  background-color: $color-main;
  color: #fff;
  padding: 10px;
  .close-btn {
    float: right;
    cursor: pointer;
  }
}
.aep-panel-body {
  padding: 10px;
}
.aep-panel-footer {
  background-color: $color-footer-bg;
}
</style>
