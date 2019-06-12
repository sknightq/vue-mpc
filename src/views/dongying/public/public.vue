<template>
  <div class="wrapper">
    <aep-header :title="title" :count="count"></aep-header>
    <div class="contents">
      <div class="con-box">
        <label class="con-label">所属平台</label>
        <select v-model="platformType" class="plat-style">
          <option v-for="(item,idx) in platform" :key="idx" :value="item.type">{{item.name}}</option>
        </select>
      </div>
      <div class="con-box time-box">
        <label class="con-label">时间范围</label>
        <date-picker v-model="sDate" lang="zh" format="YYYY-MM-DD"></date-picker>
        <icon name="angle-right" scale="0.8"></icon>
        <date-picker v-model="eDate" lang="zh" format="YYYY-MM-DD"></date-picker>
        <button class="btn btns" v-on:click="getDetail(1)">搜索</button>
      </div>
      <div class="table-box" ref="tableBox" :style="{'height':isDelete?'calc(100% - 17rem)':''}">
        <table>
          <tr class="list-title">
            <th>发表时间</th>
            <th>平台</th>
            <th>正面评论</th>
            <th>负面评论</th>
          </tr>
          <tr
            class="list-item"
            @click="clickItem(item,idx)"
            v-for="(item,idx) in publish"
            :key="idx"
            :style="{'background-color':index == idx?'#dfe7f1':''}"
          >
            <td class="list-contents">{{item.time}}</td>
            <td class="list-contents">{{item.TypeName}}</td>
            <td class="list-contents">{{item.PosNum}}</td>
            <td class="list-contents">{{item.NegNum}}</td>
          </tr>
        </table>
      </div>
      <div v-show="isDelete">
        <div class="plat-isdelete">确认删除此项？</div>
        <div>
          <button v-on:click="deletePlat" class="delete">删除</button>
          <button v-on:click="cancelDelete" class="cancel">取消</button>
        </div>
      </div>
      <div v-show="isShow" class="plat-units">
        <div class="add-unit">
          <label class="con-label">所属平台</label>
          <select v-model="platUnit.Type" class="plat-style all-plat">
            <option
              v-for="(item,idx) in platform"
              :key="idx"
              v-show="idx !== 0"
              :value="item.type"
            >{{item.name}}</option>
          </select>
        </div>

        <div class="pos-comments">
          <label class="con-label">正面评论</label>
          <div class="plat-set">
            <input v-model="platUnit.PosNum" type="text" class="publish-num">
            <icon v-on:click.native="addposNum" name="angle-left" scale="0.8" class="add-arrow"></icon>
            <icon
              v-on:click.native="deleteposNum"
              name="angle-right"
              scale="0.8"
              class="plus-arrow"
            ></icon>
          </div>
        </div>

        <div class="pos-comments">
          <label class="con-label">负面评论</label>
          <div class="plat-set">
            <input v-model="platUnit.NegNum" type="text" class="publish-num">
            <icon v-on:click.native="addnegNum" name="angle-left" scale="0.8" class="add-arrow"></icon>
            <icon
              v-on:click.native="deletenegNum"
              name="angle-right"
              scale="0.8"
              class="plus-arrow"
            ></icon>
          </div>
        </div>
      </div>
      <div v-show="isShow">
        <button v-on:click="confirmPlat" class="confirm">保存</button>
        <button v-on:click="cancelPlat" class="cancel">取消</button>
      </div>
    </div>

    <aep-bottom-tool
      :list-page-total="listPageTotal"
      v-on:add-item="addItem"
      v-on:render-list="getDetail"
      v-on:remove-item="changeStatus"
      ref="bottomTool"
    ></aep-bottom-tool>
    <aep-footer v-bind:buttons="buttons"></aep-footer>
  </div>
</template>
<script>
import "@/assets/icons/angle-first";
import "@/assets/icons/angle-last";
import "@/assets/icons/angle-left";
import "@/assets/icons/angle-right";
import "@/assets/icons/search";
import "@/assets/icons/slash";
import "@/assets/icons/plus";
import "@/assets/icons/minus";
import "@/assets/icons/close";
import "@/assets/icons/eye";
import datePicker from "vue2-datepicker";
import moment from "moment";
import axios from '@/assets/scripts/customAxios';
import icon from "@/components/aepIcon.vue";
import aepHeader from "@/components/aepHeader.vue";
import aepFooter from "@/components/aepFooter.vue";
import aepBottomTool from "@/components/aepBottomTool.vue";
import util from "@/assets/scripts/utils.js";
export default {
  components: {
    aepHeader,
    aepFooter,
    aepBottomTool,
    icon,
    datePicker,
    moment
  },
  data() {
    return {
      title: "公众参与",
      count: 0,
      buttons: [
        { id: 0, label: "confirm", text: "确认" },
        {
          id: 1,
          label: "close",
          text: "关闭"
        }
      ],
      listPageTotal: 1,
      listPagePer: 10,
      listPageStart: 1,
      listPageCurrent: 1,
      isShow: false,
      isDelete: false,
      isAdd: true,
      index: -1,
      platform: [
        { type: 0, name: "全部" },
        { type: 1, name: "新闻" },
        { type: 2, name: "论坛" },
        { type: 3, name: "平煤" },
        { type: 4, name: "微博" },
        { type: 5, name: "微信" },
        { type: 6, name: "视频" },
        { type: 7, name: "评论" },
        { type: 8, name: "博客" },
        { type: 9, name: "APP" },
        { type: 10, name: "其他" }
      ],
      platformType: 0,
      sDate: moment().format("YYYY-MM-DD 00:00:00"),
      eDate: moment().format("YYYY-MM-DD 23:59:59"),
      selectItem: {},
      publish: [],
      platUnit: {
        Type: 1,
        PosNum: 0,
        NegNum: 0
      }
    };
  },
  created() {},
  mounted() {
    this.getDetail(this.listPageStart);
  },
  methods: {
    getDetail(currentPageIndex) {
      var self = this;
      self.listPageCurrent = currentPageIndex; //记录当前页数
      var param = {
        //stime: moment(self.sDate).format(),
        stime: moment(self.sDate).format(),
        //etime: moment(self.eDate).format(),
        etime: moment(self.eDate).format(),
        pnum: currentPageIndex - 1,
        psiz: self.listPagePer
      };
      if (self.platformType !== 0) {
        param.type = self.platformType;
      }else{
        param.type = '';
      }
      //var params = util.objectToparams(param);
      axios.get("/participant", {params:param}).then(resp => {
        if (resp.data.Data instanceof Array && resp.data.Data.length > 0) {
          self.count = resp.data.Total;
          self.listPageTotal = Math.ceil(resp.data.Total / self.listPagePer); //总页数
          resp.data.Data.forEach(function(item, idx) {
            item.time = item.Date.substring(0, item.Date.indexOf("T"));
            if (item.Type < 11) {
              item.TypeName = self.platform[item.Type].name;
            }
          });
          self.publish = resp.data.Data;
          console.log(self.publish);
        } else {
          self.publish = [];
          self.listPageTotal = 1;
          self.listPageStart = 1;
          
        }
      });
      self.isShow = false;
    },
    //修改正面评论
    addposNum() {
      this.platUnit.PosNum = this.platUnit.PosNum + 1;
    },
    deleteposNum() {
      if (this.platUnit.PosNum > 0) {
        this.platUnit.PosNum = this.platUnit.PosNum - 1;
      } else {
        this.platUnit.PosNum = 0;
      }
    },
    //修改负面评论
    addnegNum() {
      this.platUnit.NegNum = this.platUnit.NegNum + 1;
    },
    deletenegNum() {
      if (this.platUnit.NegNum > 0) {
        this.platUnit.NegNum = this.platUnit.NegNum - 1;
      } else {
        this.platUnit.NegNum = 0;
      }
    },
    clickItem(item, idx) {
      var self = this;
      self.index = idx;
      self.selectItem = item;
      self.isShow = true;
      self.isAdd = false;
      self.isDelete = !self.isShow;
      self.platUnit = JSON.parse(JSON.stringify(self.selectItem));
    },
    confirmPlat() {
      var self = this;
      console.log(self.platUnit);
      var obj = {
        ID: self.platUnit.ID,
        Type: self.platUnit.Type,
        PosNum: parseInt(self.platUnit.PosNum, 10),
        NegNum: parseInt(self.platUnit.NegNum, 10)
      };
      if (self.isAdd) {
        axios.post("/participant", obj).then(resp => {
          if (resp) {
            self.platUnit = {
              Type: 1,
              PosNum: 0,
              NegNum: 0
            };
            self.getDetail(self.listPageCurrent);
          }
        });
      } else {
        axios
          .put("/participant/" + self.platUnit.ID, self.platUnit)
          .then(resp => {
            if (resp.data) {
              self.isShow = false;
              self.platUnit = {
                Type: 1,
                PosNum: 0,
                NegNum: 0
              };
              self.getDetail(self.listPageCurrent);
            }
          });
      }
    },
    deletePlat() {
      axios.delete("/participant/" + this.selectItem.ID).then(resp => {
        if (resp.data === null) {
          if (this.index > -1) {
            this.publish.splice(this.index, 1);
            this.isDelete = false;
            this.getDetail(this.listPageCurrent);
          }
        }
      });
    },
    cancelPlat() {
      this.isShow = false;
    },
    addItem() {
      this.isShow = true;
      //this.$refs.tableBox.height =
      this.isDelete = false;
      this.isAdd = true;
      this.platUnit = {
        Type: 1,
        PosNum: 0,
        NegNum: 0
      };
    },
    cancelDelete() {
      this.isDelete = false;
    },
    changeStatus() {
      this.isDelete = true;
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" >
html {
  font-size: 62.5%;
}
body {
  font-size: 1.4rem;
}
input {
  border: 0;
}
button {
  border: 0;
}
.wrapper {
  height: 100%;
  background-color: $color-lighten-gray;
}
.contents {
  height: calc(100% - 124px - 36px);
}
.contents .con-box {
  padding: 1rem;
}
.contents .time-box {
  padding-top: 0;
}
.contents .con-label {
  display: block;
  padding-bottom: 0.5rem;
}
.plat-style {
  height: 2.3rem;
  line-height: 2.3rem;
  width: 30%;
  padding-left: 0.5rem;
  background: url("../../../static/images/arrow.png") no-repeat scroll 60px
    center #fff;
}
.mx-datepicker {
  width: 38% !important;
}
.mx-input-wrapper .mx-input {
  height: 2.3rem !important;
  border-radius: 0 !important;
  border: 0 !important;
  box-shadow: none !important;
  padding: 0 0 0 0.5rem;
}
.mx-input-wrapper .mx-input-append {
  padding: 6px 0 6px 0;
  width: 23px;
  right: -1px;
}
.con-box .btns {
  padding: 0 0.5rem 0 0.5rem!important;
  height: 2.3rem;
  float: right;
}
.table-box {
  height: calc(100% - 20rem);
  overflow-y: auto;
}
table {
  width: 100%;
  border-collapse: collapse;
}
tr:nth-child(2n-1) {
  background-color: #f6f6f7;
}
tr:nth-child(2n) {
  background-color: #efeff0;
}
table .list-title {
  background-color: #d9d9d8;
}
table .list-title th {
  padding: 1rem 0;
  font-weight: normal;
}
table .list-contents {
  text-align: center;
  padding: 1rem 0;
}
.list-item:hover {
  background-color: #dfe7f1;
}
.contents .plat-units {
  background-color: #e6e7e7;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}
.plat-isdelete {
  background-color: #e6e7e7;
  padding: 1rem;
  text-align: center;
}
.contents .add-unit {
  width: 32%;
  margin-right: 1rem;
}
.add-unit .all-plat {
  width: 100%;
}
.contents .pos-comments {
  width: 27%;
}
.pos-comments .publish-num {
  height: 2.3rem;
  width: 100%;
}
.pos-comments .plat-set {
  position: relative;
}
.plat-set .add-arrow {
  transform: rotate(90deg);
  position: absolute;
  top: 0;
  right: 0.2rem;
  color: #a7a4a4;
}
.plat-set .plus-arrow {
  position: absolute;
  transform: rotate(90deg);
  bottom: 0;
  right: 0.2rem;
  color: #a7a4a4;
}
.confirm {
  width: 50%;
  height: 2.5rem;
  color: #fff;
  background-color: #266f9e;
}
.delete {
  width: 50%;
  height: 2.5rem;
  color: #fff;
  background-color: #8b2e28;
}
.cancel {
  width: 50%;
  height: 2.5rem;
  color: #fff;
  background-color: #acadad;
}
</style>
