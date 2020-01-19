## Logs  
在aep-header挂载的生命周期里加上了默认调用整个页面鼠标事件无效的函数，但是又保留了对于有'enabel-mouse-event'的class html元素可以拖动，逻辑代码写在_LayoutVue.cstml中（来自**Mushroom**的贡献）。  
概括下：基于_LayoutVue.cshtml模板写的页面不用手动再写鼠标拖动禁用事件，默认只有页面的头部可以拖动，其他部分都是禁用的。

### 示例  

**_LayoutVue.cshtml**  

```
var disableMouseEvent = function () {
  var body = document.getElementsByTagName('body');
  for (var i = 0; i < body.length; i++) {
    aepDisableFWMouseEvent(body[i]);
  }
  var enable = document.getElementsByClassName('enable-mouse-event');
  for (var i = 0; i < enable.length; i++) {
    aepEnableFWMouseEvent(enable[i]);
  }
};
```

**aepHeader.vue**  

```
mounted() {
  if (typeof window.disableMouseEvent === 'function') {
    window.disableMouseEvent()
  }
}
```