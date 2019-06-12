<template>
  <div class="aep-message" v-show="show" :class="{'aep-message-center':isCenter}">
    <div class="aep-message-heading" v-if="hasTitle">
        {{title}}
        <span class="close-btn" v-on:click="messageClose">
            <icon name="close"></icon>
        </span>
    </div>
    <div class="aep-message-content">
        {{content}}
        <span class="close-btn" v-on:click="messageClose" v-if="!hasTitle">
            <icon name="close"></icon>
        </span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    hasTitle: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示信息'
    },
    content: {
      type: String,
      default: ''
    },
    isCenter: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      timeout: null,
      interval: 3000
    }
  },
  watch: {
    show: newValue => {
      if (newValue) {
        this.autoHide()
      }
    }
  },
  methods: {
    messageClose() {
      if (this.timeout) {
        window.clearTimeout(this.timeout)
      }
      this.show = false
    },
    autoHide() {
      this.timeout = window.setTimeout(() => {
        this.show = false
      }, this.interval)
    }
  }
}
</script>
<style lang="scss">
.aep-message {
  background-color: $color-white;
  position: relative;
}
.aep-message-heading {
  background-color: $color-main;
  color: $color-white;
  padding: 5px;
  .close-btn {
    float: right;
    vertical-align: middle;
    cursor: pointer;
  }
}
.aep-message-content {
  //background-color: $color-footer-bg;
  padding: 5px;
  .close-btn {
    vertical-align: middle;
    cursor: pointer;
  }
}
.aep-message-center {
  position: absolute;
  width: 150px;
  left: 50%;
  margin-left: -75px;
  top: 40%;
}
</style>
