## aepMessage使用方式 

为了代替框架中用户体验较差的alert, 参考element UI里的Message组件重新了aepMessage。

### 参数
> 1. type: String [info, success, error, warning]，有4种类型信息，默认info
> 2. title: String，信息头，默认为空
> 3. content: String, 信息主体，默认为空
> 4. position: String, [bottom, top, center] 信息显示位置，默认是bottom
> 5. autoClose: Boolean, 信息框是否为自动关闭，默认是true
> 6. duration: Number, 信息框自动关闭前停留时间，如果autoClose为false, 此参数无效  

### 使用例子  
#### aepVue（UMD）下使用
```html
<link rel="stylesheet" href="../lib/packages/aepVue.css">
<script src="../lib/packages/aepVue.umd.min.js"></script>
...
// in method
this.$aepMsg({
  title: '提示信息',
  type: 'success',
  position: 'center',
  content: '成功',
})
```
#### Vue 单文件中使用
```javascript
import Vue from 'vue'
import messageAssistant from '@/components/assistants/aepMessage'
...
messageAssistant(Vue)
this.$aepMsg({
  title: '提示信息',
  type: 'error',
  position: 'center',
  content: '测试',
  duration: 3000,
  autoClose: false
})
```
### 参考文件
/public/umd.html  
your local server/example (npm run serve, click list item)  

### 注意  
无法使用在非Vue的页面上  
 
### 待完善 
- [ ] 样式，目前用最简单的，UI还在测试
- [ ] 未完全测试

