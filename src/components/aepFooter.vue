<template>
  <div class="footer">
    <footer class="clearfix">
      <slot name="left-btns"></slot>
      <ul class="footer-buttons">
        <li
          v-for="(button,index) in buttons"
          v-bind:key="index"
          v-on:click="clickTrigger(button.label)"
        >
          <button
            class="btn"
            type="button"
          >{{button.text}}</button>
        </li>
      </ul>
    </footer>
  </div>
</template>
<script>
export default {
  name: 'aepFooter',
  props: {
    buttons: {
      type: Array,
      default: () => [],
      required: true
    },
    pageType: {
      type: String,
      validator: val => ['content', 'popup', 'screen'].includes(val),
      default: 'content'
    }
  },
  data() {
    return {}
  },
  created() {
    // add methods dynamically
    // if buttons array is [{label:'close', text: '关闭'}，{label:'confirm', text: '确认'}]
    // which will create 'close' and 'confirm' methods
    for (let i = 0; i < this.buttons.length; i++) {
      this[this.buttons[i].label] = btnLabel => {
        const method = this.toLowerHyphen(btnLabel)
        if (this.$listeners && this.$listeners[method]) {
          this.$emit(method, this.closeCallback)
        } else {
          this.closeCallback()
        }
      }
    }
  },
  methods: {
    toLowerHyphen(str) {
      var temp = str.replace(/[A-Z]/g, function(match) {
        return '-' + match.toLowerCase()
      })
      return temp
    },
    clickTrigger(buttonLabel) {
      // invoke other methods like 'close' or 'confirm'
      this[buttonLabel](buttonLabel)
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
.footer {
  height: 60px;
  padding: 16px 14px;
  background-image: linear-gradient(
    to right,
    $color-footer-left,
    $color-footer-right
  );
}
ul.footer-buttons {
  float: right;
  li {
    display: inline-block;
    .btn {
      min-width: 74px;
    }
  }
  li + li {
    margin-left: 10px;
  }
}
</style>
