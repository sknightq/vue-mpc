<template>
  <div class="aep-upload-wrapper">
    <div class="aep-upload-inner">
      <label class="group-label" v-show="showLabel">{{groupTitle}}</label>
      <input type="text" class="file-name" v-model="selectFilesName" placeholder="请先上传文件再修改文件名">
      <label :for="`upload-file-${name}`" class="file-label">{{selectLabel}}</label>
      <input :id="`upload-file-${name}`" class="file-select" :name="name" type="file" :accept="filesAccepted" :multiple="multiple" v-on:change="filesSelected" />
      <button class="upload-btn btn" type="button" v-on:click="uploadFiles">{{buttonText}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aepUpload',
  props: {
    name: {
      type: String,
      required: true
    },
    showLabel: {
      type: Boolean,
      default: false
    },
    // title
    groupTitle: {
      type: String,
      default: '文件上传'
    },
    // 文件选择按钮文字
    selectLabel: {
      type: String,
      default: '...'
    },
    // 上传按钮文字
    buttonText: {
      type: String,
      default: '确定'
    },
    // 多文件上传
    multiple: {
      type: Boolean,
      default: false
    },
    // 上传文件类型限制
    fileTypes: {
      type: Array,
      default() {
        return [
          'application/msword',
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.documen'
        ]
      }
    }
  },
  computed: {
    filesAccepted() {
      return this.fileTypes.join(',')
    }
  },
  data() {
    return {
      files: [],
      selectFilesName: ''
    }
  },
  methods: {
    filesSelected(e) {
      this.files = e.target.files
      const filesNameString = []
      for (let i = 0; i < this.files.length; i++) {
        let file = this.files[i]
        // 第一个参数是input[type="file"]的name
        filesNameString.push(file.name)
      }

      this.selectFilesName = filesNameString.join(',')
    },
    uploadFiles() {
      let formData = new FormData()
      const newFileNames = this.getModifiedFileName()
      if (newFileNames instanceof Array) {
        for (let i = 0; i < this.files.length; i++) {
          let file = this.files[i]
          // 第一个参数是input[type="file"]的name
          formData.append(this.name, file, newFileNames[i])
        }
        this.$emit('upload', formData)
      } else if (typeof newFileNames === 'string') {
        alert(newFileNames)
      }
    },
    getModifiedFileName() {
      const newFileNames = this.selectFilesName.split(',')
      if (this.selectFilesName.length === 0) {
        return '请先选择文件'
      }
      if (newFileNames.length !== this.files.length) {
        return '文件名个数和文件个数不匹配, 多文件之间用","分隔'
      }
      // for (let i = 0; i < newFileNames.length; i++) {
      //   const nameArray = newFileNames[i].split('.')
      //   if (nameArray.length !== 2) {
      //     return '请用[文件名.文件后缀]格式修改文件名, 多文件之间用","分隔'
      //   }
      // TODO: detect the extensions of files
      // }
      return newFileNames
    }
  }
}
</script>
<style lang="scss">
.aep-upload-wrapper .aep-upload-inner {
  > buton,
  > input,
  > label {
    display: inline-block;
    vertical-align: middle;
    height: 24px;
  }
  .file-name {
    width: 20%;
    font-size: 12px;
    line-height: 18px;
    padding: 3px 4px;
    border: none;
  }
  > label {
    &.group-label {
      display: block;
      margin-bottom: 5px;
    }
    &.file-label {
      background-color: $color-main;
      color: $color-white;
      padding: 4px 7px;
      cursor: pointer;
      margin-bottom: 0;
      height: 24px;
    }
  }
  > button {
    width: auto;
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
    height: 24px;
    font-size: 12px;
    padding: 2px 10px;
    min-width: auto;
  }
  .file-select {
    width: 0;
    height: 0;
    overflow: hidden;
    opacity: 0;
    padding: 0;
  }
}
</style>
