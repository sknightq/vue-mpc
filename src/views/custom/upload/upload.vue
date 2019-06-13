<template>
  <div class="wrapper">
    <aep-header title="发表上传" v-on:close="close"></aep-header>
    <div class="main">
      <div class="title-div">
        <div class="title-title">标题</div>
        <input v-model="knowledge.title" class="title-input" placeholder="请输入标题">
      </div>
      <div class="content-div">
        <div class="content-title">文本内容</div>
        <textarea v-model="knowledge.content" class="content-textarea" placeholder="请输入内容"/>
      </div>
      <div class="file-div">
        <ul class="file-list">
          <li
            v-for="(file,findex) in knowledge.files"
            :key="findex"
            :class="{'file-selected':findex===selectedFileIndex}"
            v-on:click="selectFile(findex)"
          >
            <a :href="`/go/storage/download/${file.id}`" target="_blank" class="file-icon">
              <icon :name="getFileExt(file.name)" scale="2.1875" class="media-object"></icon>
            </a>
            <div class="file-info">
              <div class="file-name">{{file.name}}</div>
              <div class="file-date">上传时间：{{file.date}}</div>
            </div>
            <div class="file-size">{{getFileSize(file.size, 0)}}</div>
          </li>
        </ul>
        <div class="file-operation">
          <div v-on:click="deleteFile">
            <icon name="minus" color="#2272a6" class="icon-minus"></icon>
          </div>
          <aep-upload name="file" v-on:upload="upload" button-text="上传" ref="updateInput"></aep-upload>
        </div>
      </div>
    </div>
    <aep-footer :buttons="buttons" v-on:confirm="confirm" v-on:close="close"></aep-footer>
  </div>
</template>

<script>
import "@/assets/icons/files/avi";
import "@/assets/icons/files/doc";
import "@/assets/icons/files/empty";
import "@/assets/icons/files/jpg";
import "@/assets/icons/files/mp3";
import "@/assets/icons/files/mp4";
import "@/assets/icons/files/pdf";
import "@/assets/icons/files/png";
import "@/assets/icons/files/ppt";
import "@/assets/icons/files/rtf";
import "@/assets/icons/files/txt";
import "@/assets/icons/files/xls";
import "@/assets/icons/files/zip";
import "@/assets/icons/angle-left";
import "@/assets/icons/angle-right";
import "@/assets/icons/close";
import "@/assets/icons/contract";
import "@/assets/icons/expand";
import "@/assets/icons/minus";
import "@/assets/icons/plus";

import axios from '@/assets/scripts/customAxios';
import moment from "moment";
import aepHeader from "@/components/aepHeader";
import aepFooter from "@/components/aepFooter";
import aepUpload from "@/components/aepUpload";
import icon from "@/components/aepIcon";

const SIZE_UNIT = 1024;
export default {
  components: {
    aepHeader,
    aepFooter,
    aepUpload,
    icon
  },
  data() {
    return {
      buttons: [
        { index: 0, label: "confirm", text: "确定" },
        { index: 1, label: "close", text: "关闭" }
      ],
      units: ['B', 'KB', 'MB', 'GB', 'TB'],
      knowledge: {
        id: "",
        title: "",
        content: "",
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
        files: []
      },
      selectedFileIndex: -1,
      exts: [
        "avi",
        "doc",
        "jpg",
        "mp3",
        "mp4",
        "pdf",
        "png",
        "ppt",
        "rtf",
        "txt",
        "xls",
        "zip"
      ],
      status: null,
      pageType: "content",
      pageInst: "upload",
      preFunc: null,
      preParams: null,
      prePageType: null,
      prePageInst: null
    };
  },
  created() {
    var self = this;
    aepRegisterUIElement(self.pageType, self.pageInst);
    document.addEventListener("aepBeforeOpen", params => {
      if (params.detail) {
        self.status = params.detail.status;
        self.knowledge.id = params.detail.id;
        self.preFunc = params.detail.preFunc;
        self.preParams = params.detail.preParams;
        self.prePageType = params.detail.prePageType;
        self.prePageInst = params.detail.prePageInst;
        self.getData();
      }
    });
  },
  methods: {
    getFileSize(size, deep) {
      const res = size / (SIZE_UNIT ** deep)
      if (res < SIZE_UNIT) {
        return  Math.round(res) + this.units[deep]
      }else{
        return this.getFileSize(size, deep + 1)
      }
    },
    getData() {
      var self = this;
      if (self.status === "upd" && self.knowledge.id) {
        return axios.get("/knowledge/" + self.knowledge.id).then(resp => {
          if (resp.status === 200 && resp.data instanceof Object) {
            self.knowledge.title = resp.data.Title;
            self.knowledge.content = resp.data.Content;
            self.knowledge.date = moment(resp.data.Date).format(
              "YYYY-MM-DD HH:mm:ss"
            );
            if (resp.data.URI) {
              var ps = resp.data.URI.map(uri => {
                return self.getFile(uri);
              });
              Promise.all(ps).then(resps => {
                self.knowledge.files.push(...resps);
              });
            }
          }
        });
      } else return;
    },
    getFile(id) {
      var file = {
        id: id,
        name: "",
        size: 0,
        date: moment().format("YYYY-MM-DD")
      };
      if (!id) return file;
      return axios.get("/storage/" + id).then(resp => {
        if (resp.status === 200 && resp.data instanceof Object) {
          file.name = resp.data.Name;
          file.size = resp.data.Size;
          file.date = moment(resp.data.Date).format("YYYY-MM-DD");
        }
        return file;
      });
    },
    getFileExt(name) {
      var arr = name.split(".");
      var ext = arr[arr.length - 1].toLowerCase();
      if (ext === "docx") ext = "doc";
      else if (ext === "pptx") ext = "ppt";
      else if (ext === "xlsx") ext = "xls";
      if (this.exts.filter(e => e === ext)[0] !== undefined) {
        return ext;
      } else {
        return "empty";
      }
    },
    selectFile(findex) {
      this.selectedFileIndex = findex;
    },
    deleteFile() {
      if (this.selectedFileIndex !== -1) {
        this.knowledge.files.splice(this.selectedFileIndex, 1);
        this.selectedFileIndex = -1;
      }
    },
    upload(formData) {
      var self = this;
      axios({
        method: "post",
        url: "/storage",
        "Content-Type": "form-data",
        data: formData
      })
        .then(resp => {
          if (resp.status === 200 && resp.data instanceof Object) {
            var file = {
              id: resp.data.ID,
              name: resp.data.Name,
              size: resp.data.Size,
              date: moment().format("YYYY-MM-DD")
            };
            self.knowledge.files.push(file);
            self.$refs.updateInput.selectFilesName = "";
          } else {
            console.error("上传失败");
          }
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    confirm() {
      var self = this;
      if (self.status === "add") {
        var params = {
          Title: self.knowledge.title,
          Content: self.knowledge.content,
          URI: self.knowledge.files.map(file => file.id)
        };
        axios.post("/knowledge", params).then(resp => {
          if (resp.status === 200) {
            if (self.preFunc && self.prePageType && self.prePageInst) {
              window.aepInvokeUIElement(
                self.preFunc,
                self.preParams,
                null,
                self.prePageType,
                self.prePageInst
              );
            }
            aepCloseContentPage();
          }
        });
      } else if (self.status === "upd") {
        var params = {
          ID: self.knowledge.id,
          Title: self.knowledge.title,
          Content: self.knowledge.content,
          URI: self.knowledge.files.map(file => file.id)
        };
       
        axios.put("/knowledge/" + params.ID, params).then(resp => {
          if (resp.status === 200) {
            if (self.preFunc && self.prePageType && self.prePageInst) {
              window.aepInvokeUIElement(
                self.preFunc,
                self.preParams,
                null,
                self.prePageType,
                self.prePageInst
              );
            }
            aepCloseContentPage();
          }
        });
      }
    },
    close(closeCallback) {
      closeCallback();
    }
  }
};
</script>
<style lang="scss" >
.wrapper {
  height: 100%;
}
.main {
  height: calc(100% - 64px - 60px);
  padding: 10px;
  background-color: #f5f5f5;
}
.title-div {
  margin-bottom: 15px;
}
.title-title {
  font-size: 13px;
  margin-bottom: 5px;
}
.title-input {
  width: 100%;
  font-size: 13px;
  padding: 5px 10px;
  background-color: white;
  border: none;
}
.content-div {
  margin-bottom: 15px;
  height: calc(100% - 43px - 30px - 189px);
}
.content-title {
  font-size: 13px;
  margin-bottom: 5px;
}
.content-textarea {
  resize: none;
  width: 100%;
  height: calc(100% - 19px);
  font-size: 13px;
  padding: 5px 10px;
  background-color: white;
  border: none;
}
.file-list {
  height: 160px;
  margin-bottom: 5px;
  background-color: white;
  overflow-y: auto;
}
.file-list > li {
  display: flex;
  padding: 10px;
}
.file-selected {
  background-color: #eee;
}
.file-icon {
  padding-right: 10px;
}
.file-info {
  flex: auto;
}
.file-name {
  font-size: 14px;
  padding-bottom: 5px;
}
.file-date {
  font-size: 12px;
  color: #888;
}
.file-size {
  font-size: 14px;
  align-self: center;
}
.file-operation {
  display: flex;
}
.icon-minus {
  vertical-align: middle;
  cursor: pointer;
}
.aep-upload-wrapper {
  float: right;
  text-align: right;
  width: 244px;
  flex: auto;
}
.aep-upload-wrapper .aep-upload-inner .file-name {
  width: 160px;
}
</style>