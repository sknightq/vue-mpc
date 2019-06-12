<template>
  <div class="jump-wrapper" v-bind:style="{width:datatype.jumpWidth + 'px'}">
    <div class="choicedlists" v-bind:style="{height:datatype.topHight + 'px'}">
      <ul>
        <li class="listunit" @click="clickChoicedList(item,index)" v-for="(item,index) in choicedData" v-bind:key="index" :class="{bgcblue:deleteNum === index}">
          <icon name="microscope" scale="1.5"></icon>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="icons">
      <icon name="angle-up" scale="1.5" @click.native="addChoiced" style="width:25%"></icon>
      <icon name="angle-down" scale="1.5" @click.native="deleteChoiced" style="width:25%"></icon>
      <icon name="angle-double-up" scale="1.5" @click.native="addAll" style="width:25%"></icon>
      <icon name="angle-double-down" scale="1.5" @click.native="deleteAll" style="width:25%"></icon>
    </div>
    <div class="totallist" v-bind:style="{height:datatype.bottomHight + 'px'}">
      <div class="searchbar">
        <icon name="search" scale="1.5"></icon>
        <input type="text" v-model="keyword" v-on:keyup.13="searchKeyword">
      </div>
      <ul>
        <li class="listunit" @click="clickTotalList(item,index)" v-for="(item,index) in datas" v-bind:key="index" :class="{bgcblue:clickNum === index}">
          <icon name="microscope" scale="1.5"></icon>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    totalData: {
      type: Array,
      default: () => [],
      required: true
    },
    choiceList: {
      type: Array,
      default: () => [],
      required: true
    },
    datatype: {
      type: Object,
      default: () => [],
      required: true
    }
  },
  data() {
    return {
      allData: this.totalData,
      datas: this.totalData,
      choicedData: this.choiceList,
      clickNum: -1,
      clickContent: '',
      deleteNum: -1,
      deleteContent: '',
      keyword: ''
    }
  },
  computed: {},
  watch: {
    allData: function() {
      this.$emit('sendMsg', { remin: this.allData, choiced: this.choicedData })
      this.datas = this.allData
    }
  },
  created() {},
  methods: {
    // 搜索关键字
    searchKeyword() {
      var self = this
      console.log(self.datas)
      if (self.datatype.type === 1) {
        self.datas = self.keyword
          ? self.allData.filter(function(item) {
              return item.name.includes(self.keyword)
            })
          : self.allData
      }
      if (self.datatype.type === 2) {
        self.$emit('filter', self.keyword)
      }
    },
    clickTotalList(item, index) {
      this.clickNum = index
      this.clickContent = item
      this.detainDelete = true
      this.$emit('select', item)
    },
    clickChoicedList(item, index) {
      this.deleteNum = index
      this.deleteContent = item
      this.detainAdd = true
      this.$emit('select', item)
    },
    addChoiced() {
      if (!isNaN(this.clickNum) && this.clickNum >= 0) {
        this.allData.splice(this.clickNum, 1)
        this.choicedData.push(this.clickContent)
        this.clickNum = -1
        this.$emit('add', {})
      }
    },
    deleteChoiced() {
      if (!isNaN(this.deleteNum) && this.deleteNum >= 0) {
        this.choicedData.splice(this.deleteNum, 1)
        this.allData.push(this.deleteContent)
        this.deleteNum = -1
        this.$emit('delete', {
          remin: this.allData,
          choiced: this.choicedData
        })
      }
    },
    addAll() {
      this.choicedData = this.choicedData.concat(this.allData)
      this.allData = []
    },
    deleteAll() {
      this.allData = this.allData.concat(this.choicedData)
      console.log(this.allData)
      this.choicedData = []
    }
  }
}
</script>
<style lang="scss">
.jump-wrapper {
  //width: 70%;
  padding-top: 20px;
  padding-left: 23px;
  padding-right: 23px;
  font-size: 15px;
  margin: 0 auto;
}
.choicedlists {
  //height: 120px;
  overflow-y: auto;
  border: 1px solid $color-gray;
}
.icons {
  margin: 15px auto;
  height: 24px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  > svg {
    top: 0;
    color: $color-blue;
    vertical-align: middle;
  }
}
.totallist {
  border: 1px solid $color-gray;
  //height: 200px;
  overflow-y: auto;
}
.listunit:hover {
  background-color: $color-lighten-blue;
}
.listunit {
  text-align: left;
  padding: 5px 0;
  height: 40px;
  line-height: 30px;
  > svg {
    color: $color-gray;
    margin-left: 8px;
  }
  span {
    margin-left: 8px;
  }
}
.bgcblue {
  background-color: $color-lighten-blue;
}
.searchbar {
  position: relative;
  width: 100%;
  height: 33px;
  line-height: 33px;
  border-bottom: 1px solid $color-gray;
  text-align: left;
  > svg {
    position: absolute;
    padding-top: 1px;
    color: $color-gray;
    top: 4px;
    left: 9px;
  }
  input {
    border: 0;
    width: 100%;
    max-width: 100%;
    outline: none;
    padding-left: 30px;
  }
}
</style>
