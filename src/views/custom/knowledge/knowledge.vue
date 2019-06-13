<template>
  <div class="wrapper">
    <aep-header title="环保知识" :count="total"></aep-header>
    <div class="contents">
      <div class="con-box">
        <label class="con-label">时间范围</label>
        <date-picker v-model="sDate" lang="zh" format="YYYY-MM-DD"></date-picker>
        <icon name="angle-right" scale="0.8"></icon>
        <date-picker v-model="eDate" lang="zh" format="YYYY-MM-DD"></date-picker>
        <button v-on:click="renderList(1)" class="btns">搜索</button>
      </div>
      <div class="table-box">
        <table>
          <tr
            v-on:click="clickItem(item,idx)"
            v-for="(item,idx) in knowledge"
            :key="idx"
            :style="{'background-color':index == idx?'#dfe7f1':''}"
          >
            <p class="list-title">{{item.title}}</p>
            <p class="list-time">{{item.date}}</p>
          </tr>
        </table>
      </div>

      <div v-show="isShow" class="plat-units">确认删除此项？</div>
      <div v-show="isShow">
        <button v-on:click="deleteKnowledge" class="confirm">删除</button>
        <button v-on:click="cancel" class="cancel">取消</button>
      </div>
    </div>

    <aep-bottom-tool
      :list-page-total="listPageTotal"
      v-on:render-list="renderList"
      v-on:add-item="addItem"
      v-on:remove-item="deleteItem"
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
import axios from '@/assets/scripts/customAxios';
import moment from "moment";
import icon from "@/components/aepIcon.vue";
import aepHeader from "@/components/aepHeader.vue";
import aepFooter from "@/components/aepFooter.vue";
import aepBottomTool from "@/components/aepBottomTool.vue";
export default {
  components: {
    aepHeader,
    aepFooter,
    aepBottomTool,
    icon,
    datePicker
  },
  data() {
    return {
      title: "",
      buttons: [
        {
          id: 1,
          label: "close",
          text: "关闭"
        }
      ],
      index: -1,
      listPageNum: 1,
      listPagePer: 10,
      isShow: false,
      sDate: moment()
        .subtract(1, "days")
        .format("YYYY-MM-DDT00:00:00+08:00"),
      eDate: moment().format("YYYY-MM-DDT00:00:00+08:00"),
      knowledge: [],
      total: 0,
      pageType: "customize",
      pageInst: "knowledge"
    };
  },
  created() {
    aepRegisterUIElement(this.pageType, this.pageInst);
    this.renderList(1);
  },
  computed: {
    listPageTotal() {
      const total = Math.ceil(this.total / this.listPagePer);
      if (!isNaN(total)) {
        return total;
      }
      return 1;
    }
  },
  methods: {
    renderList(pageNum) {
      var self = this;
      if (
        typeof pageNum === "number" &&
        !isNaN(pageNum) &&
        parseInt(pageNum) > 0
      )
      self.listPageNum = parseInt(pageNum);
      // var url =
      //   "/knowledge?pnum=" +
      //   (self.listPageNum - 1) +
      //   "&psiz=" +
      //   self.listPagePer +
      //   (self.sDate === null ? "" : "&stime=" + moment(self.sDate).format()) +
      //   (self.eDate === null
      //     ? ""
      //     : "&etime=" +
      //       moment(self.eDate)
      //         .add(1, "days")
      //         .format());
      let params = {
        pnum : self.listPageNum - 1,
        psize : self.listPagePer
      }
      if (self.sDate !== null) {
        params.stime = moment(self.sDate).format()
      }
      if (self.eDate !== null) {
        params.etime =  moment(self.eDate)
              .add(1, "days")
              .format()
      }
      axios.get('/knowledge', {params}).then(resp => {
        if (resp.status === 200 && resp.data instanceof Object) {
          self.knowledge = resp.data.Data.map(k => {
            return {
              id: k.ID,
              title: k.Title,
              date: moment(k.Date).format("YYYY-MM-DD HH:mm:ss")
            };
          });
          self.total = resp.data.Total;
        }
      });
    },
    clickItem(item, idx) {
      this.index = idx;
      const obj = {
        status: "upd",
        id: item.id,
        preFunc: "renderList",
        preParams: this.listPageNum,
        prePageType: this.pageType,
        prePageInst: this.pageInst
      };
      aepAddContentPage("/views/dongying/upload.html", 280, obj);
    },
    deleteKnowledge() {
      if (
        this.knowledge[this.index] !== undefined &&
        this.knowledge[this.index].id !== ""
      ) {
        axios
          .delete("/knowledge/" + this.knowledge[self.index].id)
          .then((resp)=>{
            if (resp.status === 200) {
              this.knowledge.splice(this.index, 1);
              this.isShow = false;
              this.index = -1;
              this.renderList(this.listPageNum);
            }
          });
      }
    },
    addItem() {
      const obj = {
        status: "add",
        id: "",
        preFunc: "renderList",
        preParams: this.listPageNum,
        prePageType: this.pageType,
        prePageInst: this.pageInst
      };
      aepAddContentPage("/views/dongying/upload.html", 280, obj);
    },
    deleteItem() {
      this.isShow = true;
    },
    cancel() {
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
  height: calc(100% - 136px - 36px);
}
.contents .con-box {
  margin: 1rem;
}
.contents .con-label {
  display: block;
  margin-bottom: 0.5rem;
}
.plat-style {
  height: 2.3rem;
  line-height: 2.3rem;
  width: 30%;
  padding-left: 0.5rem;
  background: url("/images/arrow.png") no-repeat scroll 10px center #fff;
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
.contents .plat-units {
  background-color: #e6e7e7;
  padding: 1rem;
  text-align: center;
}
.con-box .btns {
  border: none;
  background-color: #266f9e;
  height: 2.3rem;
  color: #fff;
  float: right;
}
.table-box {
  height: calc(100% - 11rem);
}
table {
  width: 100%;
  border-collapse: collapse;
}
table tr:nth-child(2n-1) {
  background-color: #efeff0;
}
table tr:nth-child(2n) {
  background-color: #f6f6f7;
}
table tr:hover {
  background-color: #dfe7f1;
}
tr .list-title {
  padding: 1rem 0 0 1.5rem;
  margin: 0;
}
tr .list-time {
  padding: 0.5rem 0 1rem 1.5rem;
  font-size: 1.2rem;
  color: #7a7b7b;
  margin: 0;
}
.confirm {
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
