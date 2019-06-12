<template>
  <div class="header enable-mouse-event">
    <header>
      <h1 class="title">{{title}}</h1>
      <h2 class="sub-title">{{subTitle}}</h2>
      <ul v-if="tabs">
        <li></li>
      </ul>
      <span class="fullscreen" v-if="fullscreen" v-on:click="fullZoom">
        <icon name="expand" v-if="!isfullscreen"></icon>
        <icon name="contract" v-if="isfullscreen"></icon>
      </span>
      <span class="prev" v-if="tabs">
        <icon name="angle-left"></icon>
      </span>
      <span class="next" v-if="tabs">
        <icon name="angle-right"></icon>
      </span>
      <span class="count" v-show="count > 0">{{count}}</span>
      <span class="add" v-if="tabs">
        <icon name="plus"></icon>
      </span>
      <span class="delete" v-if="tabs">
        <icon name="minus"></icon>
      </span>
      <span class="close" v-on:click="close">
        <icon name="close"></icon>
      </span>
    </header>
  </div>
</template>
<script>
import Icon from '@/components/aepIcon.vue'
export default {
  name: 'aepHeader',
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      default: '',
      required: true
    },
    subTitle: {
      type: String,
      default: ''
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    tabs: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
      default: 0
    },
    pageType: {
      type: String,
      validator: val => ['content', 'popup', 'screen'].includes(val),
      default: 'content'
    },
    closeType: {
      type: String,
      default: ''
    },
    closeId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isfullscreen: false
    }
  },
  methods: {
    fullZoom() {
      if (!this.isfullscreen) {
        window.aepMaximize(0)
      } else {
        window.aepRestore()
      }
      this.isfullscreen = !this.isfullscreen
      this.$parent.resize()
    },
    close() {
      if (this.$listeners && this.$listeners.close) {
        this.$emit('close', this.closeCallback)
      } else {
        this.closeCallback()
      }
    },
    closeCallback() {
      if (this.pageType === 'content') {
        window.aepCloseContentPage()
      } else if (this.pageType === 'popup') {
        window.aepClosePopupBox(this.closeType, this.closeId)
      } else if (this.pageType === 'screen') {
        window.aepCloseScreenBox(this.closeType, this.closeId)
      }
    }
  }
}
</script>
<style lang="scss">
header {
  background-image: linear-gradient(
    to right,
    $color-header-left,
    $color-header-right
  );
  color: $color-white;
  padding: 2px 10px;
  position: relative;
  height: 64px;
  h1 {
    font-size: 15px;
    line-height: 21px;
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 0;
  }
  h2 {
    font-size: 13.5px;
    line-height: 19px;
    font-weight: normal;
    margin-top: 0;
    margin-bottom: 0;
  }
  .close {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 24px;
    opacity: 0.5;
    line-height: 18px;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
  .fullscreen {
    position: absolute;
    top: 7px;
    right: 35px;
    text-align: center;
    opacity: 0.5;
    line-height: 18px;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
  }
  .count {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: $color-blue;
    font-size: 12px;
    border-radius: 14px;
    padding: 3px 8px;
    min-width: 20px;
    height: 20px;
    text-align: center;
  }
}
</style>
