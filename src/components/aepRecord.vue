<template>
  <div class="aeprecord">
    <slot name="record-head">
      <div class="record-head" v-if="head">
        <span v-if="head.title">{{head.title}}</span>
        <input v-if="head.input" v-model="inputValue" @keyup.enter="inputEnterEvent" @input="inputInputEvent" @focus="inputFocusEvent" placeholder="搜索" />
        <button v-if="head.superSearch" @click="superSearch">{{head.superSearch}}</button>
        <i class="record-head-totals">{{head.counts}}</i>
      </div>
    </slot>
    <ul class="record-list-box-ul" :style="{'height':height+'px'}">
      <li v-for="(item,i) in data" :key="i" v-bind:class="clickIndex === i?'record-list-box-li active':'record-list-box-li'">
        <div v-on:click="clickItem(item,i)">
          <slot name="record-item" v-bind:item="item">
            <div class="record-item-box">
              <p class="record-item-top">
                <span class="record-item-date">{{item[keyMap.date]}}</span>
                <span class="record-item-title">{{item[keyMap.title]}}</span>
              </p>
              <p class="record-item-subtitle">{{item[keyMap.subTitle]}}</p>
              <span v-if="item[keyMap.tag]" class="record-item-tag" :style="{'background':item[keyMap.tagColor]}">{{item[keyMap.tag]}}</span>
            </div>
          </slot>
        </div>
        <div v-bind:class="i === clickIndex && showConfirm?'active record-item-delete-box':'record-item-delete-box'">
          <button class="btn-confirm" v-on:click="deleteConfirm(item)">确认</button>
          <button class="btn-cancel" v-on:click="deleteCancel">取消</button>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'aepRecord',
  props: {
    head: {
      type: Object,
      default: () => {
        return {
          title: '标题',
          input: true,
          superSearch: '高级搜索',
          counts: 0
        }
      }
    },
    data: {
      type: Object / Array,
      default: () => {
        return []
      }
    },
    keyMap: {
      type: Object,
      default: () => {
        return {
          date: 'date',
          title: 'title',
          subTitle: 'subTitle',
          tag: 'tag',
          tagColor: 'tagColor'
        }
      }
    },
    showConfirm: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 200
    }
  },
  mounted() {},
  data() {
    return {
      inputValue: '',
      clickIndex: -1
    }
  },
  watch: {},
  methods: {
    clickItem(item, i) {
      this.clickIndex = i
      this.$emit('select-item', item)
    },
    deleteCancel() {
      this.$emit('delete-cancel')
    },
    deleteConfirm(item) {
      this.$emit('delete-confirm', item)
    },
    inputEnterEvent() {
      this.$emit('onenter', this.inputValue)
    },
    inputInputEvent() {
      this.$emit('oninput', this.inputValue)
    },
    inputFocusEvent() {
      if (this.inputValue === '[' + this.head.superSearch + ']') {
        this.inputValue = ''
      }
    },
    superSearch() {
      this.inputValue = '[' + this.head.superSearch + ']'
      this.$emit('super-search')
    }
  }
}
</script>
<style lang="scss">
.record-head {
  font-size: 14px;
  line-height: 20px;
  position: relative;
  height: 20px;
  margin-bottom: 2px;
  span {
    background: #2a6e9c;
    color: #fff;
    padding-left: 3px;
    width: 120px;
    float: left;
    margin-right: 2px;
  }
  input {
    width: 80px;
    height: 20px;
    float: left;
    margin-right: 2px;
  }
  button {
    width: 55px;
    color: #fff;
    font-size: 12px;
    float: left;
    padding: 0;
    border: 0;
    background: #2a6e9c;
    height: 20px;
    cursor: pointer;
  }
  i.record-head-totals {
    font-style: initial;
    display: block;
    position: absolute;
    right: 0px;
    bottom: 0px;
    color: #fff;
    background: #2a6e9c;
    line-height: 16px;
    font-size: 12px;
    border-radius: 8px;
    padding: 0 8px;
  }
}
.record-item-box {
  height: 36px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.record-item-top {
  font-size: 14px;
  line-height: 18px;
  margin: 0px;
  margin-left: 3px;
  .record-item-date {
    margin-right: 10px;
    font-size: 13px;
  }
}
.record-item-subtitle {
  font-size: 12px;
  line-height: 16px;
  margin: 0;
  margin-left: 16px;
}
.record-item-tag {
  color: #fff;
  position: absolute;
  right: 3px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  height: 16px;
  font-size: 14px;
  line-height: 16px;
  width: 50px;
  text-align: center;
}
.record-list-box-ul {
  overflow-y: auto;
  border: 1px solid #f5f6f8;
}
.record-list-box-li:hover {
  background: #e8f1f8;
}
.record-list-box-li.active {
  background: #e8f1f8;
}
.record-item-delete-box {
  overflow: hidden;
  height: 0px;
  transition: height 0.4s;
  -moz-transition: height 0.4s;
  -webkit-transition: height 0.4s;
  -o-transition: height 0.4s;
  button {
    border: 0;
    color: #fff;
    font-size: 12px;
    float: left;
    width: 50%;
    height: 25px;
    cursor: pointer;
    outline: none;
  }
  .btn-confirm {
    background-color: $color-red;
  }
  .btn-cancel {
    background-color: $color-gray;
  }
}
.record-item-delete-box.active {
  height: 25px;
}
</style>
