<template>
  <div class="bottom-tool clearfix">
    <transition name="fade">
      <slot name="form"></slot>
    </transition>
    <div class="tool-wrapper">
      <section
        class="bottom-tool-left"
        v-if="showAddDelete"
      >
        <button
          class="tool-btn"
          type="button"
          v-on:click="addItem"
        >
          <icon
            name="plus"
            scale=1
          ></icon>
        </button>
        <button
          class="tool-btn"
          type="button"
          v-on:click="removeItem"
        >
          <icon
            name="minus"
            scale=1
          ></icon>
        </button>
      </section>
      <section
        class="bottom-tool-right"
        v-show="pageTotal > 0"
      >
        <button
          class="tool-btn"
          type="button"
          v-on:click="first"
        >
          <icon
            name="angle-first"
            scale=1
          ></icon>
        </button>
        <button
          class="tool-btn"
          type="button"
          v-on:click="prev"
        >
          <icon
            name="angle-left"
            scale=1
          ></icon>
        </button>
        <input
          class="current-page"
          type="text"
          v-bind:value="pageCurrent"
          v-on:input="check($event)"
          v-on:keyup.13="jump($event)"
          v-bind:style="currentPageStyle"
        >
        <icon
          name="slash"
          scale=1
        ></icon>
        <span class="total-page">{{pageTotal}}</span>
        <button
          class="tool-btn"
          type="button"
          v-on:click="next"
        >
          <icon
            name="angle-right"
            scale=1
          ></icon>
        </button>
        <button
          class="tool-btn"
          type="button"
          v-on:click="last"
        >
          <icon
            name="angle-last"
            scale=1
          ></icon>
        </button>
      </section>
    </div>
  </div>
</template>
<script>
import icon from '@/components/aepIcon.vue'
export default {
   components: {
    icon
  },
  props: {
    listPageTotal: {
      type: Number,
      default: 1
    },
    showAddDelete: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      pageCurrent: 1 // 当前页数
    }
  },
  computed: {
    // 总共页数
    pageTotal() {
      return this.listPageTotal || 1
    },
    currentPageStyle() {
      return {
        width: this.pageCurrent.toString().length * 12 + 'px'
      }
    }
  },
  methods: {
    first() {
      this.setListParams(1)
    },
    last() {
      this.setListParams(this.pageTotal)
    },
    prev() {
      this.setListParams(this.pageCurrent - 1)
    },
    next() {
      this.setListParams(this.pageCurrent + 1)
    },
    check(e) {
      if (!isNaN(e.target.value) && e.target.value !== '') {
        var pageIndex = parseInt(e.target.value, 10)
        if (pageIndex < 1) {
          // NOTE: inoder to set the value back to 1, because the original value may be 1
          this.pageCurrent = -1
          this.pageCurrent = 1
        } else if (pageIndex > this.pageTotal) {
          // NOTE: inoder to set the value back to pageTotal, because the original value may be pageTotal
          this.pageCurrent = -1
          this.pageCurrent = this.pageTotal
        } else {
          this.pageCurrent = pageIndex
        }
      } else {
        // NOTE: inoder to set the value back to 1, because the original value may be 1
        this.pageCurrent = -1
        this.pageCurrent = 1
      }
    },
    jump(e) {
      this.setListParams(parseInt(e.target.value, 10))
    },
    setListParams(pageIndex) {
      // 未传参数的话就默认当前页
      if (!pageIndex) {
        pageIndex = this.pageCurrent
      }
      if (pageIndex >= 1 && pageIndex <= this.pageTotal) {
        this.pageCurrent = pageIndex
        // 这里直接请求
        this.$emit('render-list', pageIndex)
      }
    },
    addItem() {
      this.$emit('add-item')
    },
    removeItem() {
      this.$emit('remove-item')
    }
  }
}
</script>
<style lang="scss">
.bottom-tool {
  background-image: linear-gradient(
    to right,
    $color-bottom-left,
    $color-bottom-right
  );
  .tool-wrapper {
    padding: 0 14px;
    &:after {
      clear: both;
      display: table;
      content: '';
    }
  }
  .bottom-tool-left {
    float: left;
    height: 100%;
    height: 36px;
    button + button {
      margin-left: 10px;
    }
  }
  .bottom-tool-right {
    float: right;
    height: 100%;
    height: 36px;
  }
  .current-page {
    border: none;
    min-width: 20px;
    width: 20px;
    text-align: center;
    vertical-align: middle;
    padding: 3px;
    font-size: 10px;
  }
  .total-page {
    display: inline-block;
    vertical-align: middle;
    font-size: 10px;
  }
  button.tool-btn {
    padding: 0;
    cursor: pointer;
    border: none;
    background-color: transparent;
    vertical-align: middle;
    height: 100%;
    outline: none;
  }
  svg.aep-icon {
    color: $color-main;
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
