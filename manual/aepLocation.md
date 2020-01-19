## Logs

1. 增加了是否显示大概范围的选项: if-circle, 默认false, 并需要和circle-address配合使用 （来自**Bevan**的贡献）  

2. 增加了是否可操作的选项(常用于弹出框时只展示无法更改): is-read-only, 默认false  
   
3. 对于错误的提示去掉了alert, 用外部aepMsg来展示, 外部接受函数时error-handler  

### 示例  

```
<aep-location 
  class="my-location" 
  ref="location" 
  v-on:select-point="selectPoint"
  v-on:get-location-info="getLocationInfo"
  v-on:error-handler="errorHandler"
  :lng="enterInfo.lng" 
  :lat="enterInfo.lat"
  :circle-address="circleAddress" 
  if-circle
  is-read-only>
  </aep-location>
```  

```
errorHandler(e) {
  this.$aepMsg({
    title: '',
    type: 'error',
    position: 'bottom',
    content: e.msg,
    duration: 2000,
    autoClose: true
  })
}
```
