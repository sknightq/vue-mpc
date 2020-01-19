import AepMessage from '../aepMessage.vue'
const messageAssistant = Vue => {
  const MsgConstructor = Vue.extend(AepMessage)
  let seed = 1
  let msgInstance
  let msgInstances = []
  let msgDistance = 10

  const Message = options => {
    options = options || {}
    let id = 'aepMsg_' + seed++
    msgInstance = new MsgConstructor({
      data: options
    })
    msgInstance.id = id
    // add event handler to hook close
    msgInstance.$on('close', params => {
      Message.close(params)
    })
    msgInstance.$mount()
    document.body.appendChild(msgInstance.$el)
    let verticalTopOffset = options.offset || 0
    let verticalBottomOffset = options.offset || 0
    let centerTotal = msgInstances.filter(item => {
      return item.position === 'center'
    }).length
    if (options.position === 'center') {
      centerTotal++
    }
    let centerCounts = 0
    msgInstances.forEach((item, index) => {
      if (item.position === 'top') {
        verticalTopOffset += item.$el.offsetHeight + msgDistance
        // topCount++
      } else if (item.position === 'bottom') {
        verticalBottomOffset += item.$el.offsetHeight + msgDistance
        // bottomCount++
      } else if (item.position === 'center') {
        // 当前这个msgIntance还没插入到数组中, 所以总数需要先+1
        msgInstances[index].counts = centerTotal - centerCounts
        centerCounts++
      }
    })
    msgInstance.offset =
      options.position === 'top'
        ? verticalTopOffset
        : options.position === 'bottom'
        ? verticalBottomOffset
        : options.offset
    msgInstance.visible = true
    // 越后面的，z-index越小，但至少保持大于99来覆盖页面其他元素
    msgInstance.$el.style.zIndex = 199 - seed
    msgInstances.push(msgInstance)

    return msgInstance
  }

  Message.close = function(params) {
    let len = msgInstances.length
    let index = -1
    let dyingInstance = null
    let dyingPostion = ''
    for (let i = 0; i < len; i++) {
      if (params.id === msgInstances[i].id) {
        index = i
        dyingInstance = msgInstances[i]
        dyingPostion = msgInstances[i].position
        msgInstances.splice(i, 1)
        break
      }
    }

    if (len > 1 && index !== -1 && index <= msgInstances.length) {
      //const removedHeight = msgInstances[index].$el.offsetHeight
      for (let i = index; i < len - 1; i++) {
        let dom = msgInstances[i].$el
        // if dying instance's position is same as current one, the current one should be changed the position
        if (
          dyingPostion === msgInstances[i].position &&
          dyingPostion !== 'center'
        ) {
          dom.style[dyingPostion] =
            parseInt(dom.style[dyingPostion], 10) -
            msgInstances[index].$el.offsetHeight -
            msgDistance +
            'px'
        }
      }
    }
    if (msgInstance[0]) {
      msgInstances[0].visible = true
    }
    dyingInstance.over()
  }

  Message.closeAll = function() {
    for (let i = msgInstances.length - 1; i >= 0; i--) {
      msgInstances[i].close()
    }
  }

  Vue.prototype.$aepMsg = Message
}
export default messageAssistant
