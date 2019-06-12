<template>
  <div class="aeplist">
    <ul>
      <li class="aeplist-item" v-for="(item,i) in listData" v-bind:key="i" :class="i == selectIndex && showConfirm && confirmType==='multiple'?'show-confirm':''">
        <div v-on:click="selectItem(item,i)" class="aeplist-item-box" v-bind:class="i == selectIndex?'active':''">
          <slot name="list-item" v-bind:item="item">
            <div class="item-main">
              <h3>{{item.name}}</h3>
              <p class="item-tips">{{item.subname}}</p>
            </div>
          </slot>
        </div>
        <div class="delete-confirm"  v-if="confirmType==='multiple'" v-bind:class="i == selectIndex && showConfirm?'active':''">
          <button class="btn btn-confirm" v-on:click="deleteConfirm">确认删除</button>
          <button class="btn btn-cancel" v-on:click="deleteCancel">取消删除</button>
        </div>
      </li>
    </ul>
    <div class="bottom-confirm" v-if="confirmType==='single'">
      <div class="delete-confirm"  v-bind:class="showConfirm?'active':''">
        <p class="delete-confirm-content">{{confirmContent}}</p>
        <button class="btn btn-confirm" v-on:click="deleteConfirm">确认删除</button>
        <button class="btn btn-cancel" v-on:click="deleteCancel">取消删除</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aepList',
  props: {
    listData: {
      type: Array,
      default: () => {
        return []
      }
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    // 确认框位置，single:列表底部，multiple:跟随在每个item下面
    confirmType: {
      type: String,
      default: 'single'
    },
    confirmContent: {
      type: String,
      default: '确认删除此项？'
    }
  },
  mounted() {},
  data() {
    return {
      selectIndex: -1
    }
  },
  watch: {},
  methods: {
    selectItem(item, i) {
      this.$emit('select-item', item)
      this.selectIndex = i
    },
    deleteCancel() {
      this.$emit('delete-cancel')
    },
    deleteConfirm() {
      if (
        this.selectIndex >= 0 &&
        this.listData instanceof Array &&
        this.listData.length > 0
      ) {
        this.$emit('delete-confirm', this.listData[this.selectIndex])
      }
    }
  }
}
</script>
<style lang="scss">
.aeplist {
  position: relative;
}
.aeplist-item {
  height: 45px;
  transition: height ease-in 0.2s;
  position: relative;
  &:nth-of-type(even) {
    background-image: linear-gradient(
      to right,
      $color-even-left,
      $color-even-right
    );
  }
  &:nth-of-type(odd) {
    background-image: linear-gradient(
      to right,
      $color-even-right,
      $color-even-right
    );
  }
  &.show-confirm {
    height: 80px;
  }
  &.selected {
    background-color: $color-lighten-blue;
  }
  .item-main {
    height: 45px;
    padding: 6px 8px;
    width: 100%;
    cursor: pointer;
  }
  .aep-eye {
    position: absolute;
    top: 13px;
    right: 5px;
    cursor: pointer;
    color: $color-main;
  }
  h3 {
    font-size: 13.5px;
    line-height: 19px;
    margin: 0;
    color: $color-black;
  }
  .item-tips {
    margin: 0;
    font-size: 12px;
    line-height: 17px;
    color: $color-darken-gray;
    min-height: 12px;
  }
  h3,
  .item-tips {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.delete-confirm {
  height: 0;
  transition: height 0.4s;
  -moz-transition: height 0.4s;
  -webkit-transition: height 0.4s;
  -o-transition: height 0.4s;
  overflow: hidden;
  .btn {
    width: 50%;
    float: left;
    height: 30px;
    font-size: 12px;
    color: $color-white;
    &.btn-confirm {
      background-color: $color-red;
    }
    &.btn-cancel {
      background-color: $color-gray;
    }
  }
  &.active {
    height: 30px;
  }
}
.bottom-confirm {
  position: absolute;
  bottom: 0;
  width: 100%;
  .delete-confirm {
    font-size: 13.5px;
    line-height: 19px;
    .btn {
      height: 36px;
      padding: 9px 0 8px;
    }
    &.active {
      height: 72px;
    }
    .delete-confirm-content {
      background-image: linear-gradient(
        to right,
        $color-bottom-left,
        $color-bottom-right
      );
      margin-top: 0;
      margin-bottom: 0;
      text-align: center;
      height: 36px;
      padding: 9px 0 8px;
      font-weight: bold;
    }
  }
}
.aeplist-item-box {
  &:hover,
  &.active {
    background-image: linear-gradient(
      to right,
      $color-item-left,
      $color-item-right
    );
  }
}
</style>
