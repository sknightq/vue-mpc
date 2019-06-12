<template>
  <transition name="fade">
    <div class="aep-alert" v-bind:class="typeClass" v-show="visible">
      <div class="aep-alert-content">
        <span class="aep-alert-title" v-if="title">{{ title }}</span>
        <slot>
          <p class="aep-alert-description" v-if="description">{{ description }}</p>
        </slot>
        <icon class="aep-alert-closebtn" v-on:click.native="close"></icon>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'info'
    }
  },
  data() {
    return {
      alertType: this.type || 'info',
      visible: true
    }
  },
  computed: {
    typeClass() {
      return `aep-alert-${this.alertType}`
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.aep-alert {
  &.aep-alert-info {
    background-color: #f4f4f5;
    color: #909399;
  }
  &.aep-alert-warning {
    background-color: #fdf6ec;
    color: #e6a23c;
  }
  &.aep-alert-error {
    background-color: #fef0f0;
    color: #f56c6c;
  }
  &.aep-alert-success {
    background-color: #f0f9eb;
    color: #67c23a;
  }
}
</style>
