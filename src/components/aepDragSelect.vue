<template>
  <div class="aep-drag-select-wrapper" @mousedown="onMouseDown">
    <slot name="select-area"></slot>
    <div class="drag-box-list">
      <ul>
        <li>
          <div class="aep-drag-select-box" :style="selectionBoxStyling"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aep-drag-select',
  props: {
    multipleSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectedItems: [],
      boxsStatus: [
        {
          mouseDown: false,
          startPoint: null,
          endPoint: null
        }
      ]
    }
  },
  computed: {
    currentBoxIndex() {
      if (!this.multipleSelect) {
        return 0
      } else {
        return this.mouseDown.length
      }
    },
    selectionBox() {
      // Only set styling when necessary
      if (
        !this.boxsStatus[this.currentBoxIndex].mouseDown ||
        !this.boxsStatus[this.currentBoxIndex].startPoint ||
        !this.boxsStatus[this.currentBoxIndex].endPoint
      ) {
        return {}
      }
      const clientRect = this.$el.getBoundingClientRect()
      const scroll = this.getScroll()
      // Calculate position and dimensions of the selection box
      const left =
        Math.min(
          this.boxsStatus[this.currentBoxIndex].startPoint.x,
          this.boxsStatus[this.currentBoxIndex].endPoint.x
        ) -
        clientRect.left -
        scroll.x
      const top =
        Math.min(
          this.boxsStatus[this.currentBoxIndex].startPoint.y,
          this.boxsStatus[this.currentBoxIndex].endPoint.y
        ) -
        clientRect.top -
        scroll.y
      const width = Math.abs(
        this.boxsStatus[this.currentBoxIndex].startPoint.x -
          this.boxsStatus[this.currentBoxIndex].endPoint.x
      )
      const height = Math.abs(
        this.boxsStatus[this.currentBoxIndex].startPoint.y -
          this.boxsStatus[this.currentBoxIndex].endPoint.y
      )
      // Return the styles to be applied
      return {
        left,
        top,
        width,
        height
      }
    },
    selectionBoxStyling() {
      // Only set styling when necessary
      if (
        !this.boxsStatus[this.currentBoxIndex].mouseDown ||
        !this.boxsStatus[this.currentBoxIndex].startPoint ||
        !this.boxsStatus[this.currentBoxIndex].endPoint
      ) {
        return {}
      }
      const { left, top, width, height } = this.selectionBox
      // Return the styles to be applied
      return {
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`
      }
    }
  },
  created() {},
  methods: {
    getScroll() {
      // If we're on the server, default to 0,0
      if (typeof document === 'undefined') {
        return {
          x: 0,
          y: 0
        }
      }
      return {
        x:
          this.$el.scrollLeft ||
          document.body.scrollLeft ||
          document.documentElement.scrollLeft,
        y:
          this.$el.scrollTop ||
          document.body.scrollTop ||
          document.documentElement.scrollTop
      }
    },
    onMouseDown(event) {
      // Ignore right clicks
      if (event.button === 2) {
        return
      }
      // Register begin point
      this.boxsStatus[this.currentBoxIndex].mouseDown = true
      this.boxsStatus[this.currentBoxIndex].startPoint = {
        x: event.pageX,
        y: event.pageY
      }
      // Start listening for mouse move and up events
      window.addEventListener('mousemove', this.onMouseMove)
      window.addEventListener('mouseup', this.onMouseUp)
    },
    onMouseMove(event) {
      // Update the end point position
      if (this.boxsStatus[this.currentBoxIndex].mouseDown) {
        this.boxsStatus[this.currentBoxIndex].endPoint = {
          x: event.pageX,
          y: event.pageY
        }
      }
    },
    onMouseUp() {
      // Clean up event listeners
      window.removeEventListener('mousemove', this.onMouseMove)
      window.removeEventListener('mouseup', this.onMouseUp)
      this.$emit('selected', this.selectionBox)
      if (!this.multipleSelect) {
        // Reset state
        this.boxsStatus[this.currentBoxIndex].mouseDown = false
        this.boxsStatus[this.currentBoxIndex].startPoint = null
        this.boxsStatus[this.currentBoxIndex].endPoint = null
      } else {
        this.boxsStatus.push({
          mouseDown: false,
          startPoint: null,
          endPoint: null
        })
      }
    }
  }
}
</script>
<style lang="scss">
.aep-drag-select-wrapper {
  position: relative;
  user-select: none;
}
.aep-drag-select-box {
  position: absolute;
  background: rgba(0, 162, 255, 0.4);
  z-index: 99;
}
</style>
