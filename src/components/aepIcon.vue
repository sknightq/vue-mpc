<template>
  <svg
    version="1.1"
    :class="klass"
    :role="label ? 'img' : 'presentation'"
    :aria-label="label"
    :x="x"
    :y="y"
    :width="width"
    :height="height"
    :viewBox="box"
    :style="style"
  >
    <template
      v-for="(value, key, j) in icon"
      v-if="(key === 'circles'||key === 'rects'||key === 'paths'||key === 'polygons') && value.length > 0"
    >
      <circle
        v-if="key === 'circles' && value.length > 0"
        v-for="(circle, k) in value"
        :key="`circle-${j}-${k}`"
        v-bind="circle"
      ></circle>
      <rect
        v-if="key === 'rects'"
        v-for="(rect, k) in value"
        :key="`rect-${j}-${k}`"
        v-bind="rect"
      ></rect>
      <path
        v-if="key === 'paths'"
        v-for="(path, k) in value"
        :key="`path-${j}-${k}`"
        v-bind="path"
      />
      <polygon
        v-if="key === 'polygons'"
        v-for="(polygon, k) in value"
        :key="`polygon-${j}-${k}`"
        v-bind="polygon"
      />
    </template>
  </svg>
</template>

<style>
.aep-icon {
  display: inline-block;
  fill: currentColor;
}

.aep-flip-horizontal {
  transform: scale(-1, 1);
}

.aep-flip-vertical {
  transform: scale(1, -1);
}

.aep-spin {
  animation: fa-spin 1s 0s infinite linear;
}

.aep-inverse {
  color: #fff;
}

.aep-pulse {
  animation: fa-spin 1s infinite steps(8);
}

@keyframes aep-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<script>
let icons = []
export default {
  name: 'icon',
  props: {
    name: {
      type: String,
      validator(val) {
        if (val) {
          if (!(val in icons)) {
            console.warn(
              `Invalid prop: prop "name" is referring to an unregistered icon "${val}".` +
                '\nPlease make sure you have imported this icon before using it.'
            )
            return false
          }
          return true
        }
        console.warn('Invalid prop: prop "name" is required.')
        return false
      }
    },
    scale: [Number, String],
    spin: Boolean,
    inverse: Boolean,
    pulse: Boolean,
    flip: {
      validator(val) {
        return val === 'horizontal' || val === 'vertical'
      }
    },
    label: String
  },
  data() {
    return {
      x: false,
      y: false,
      childrenWidth: 0,
      childrenHeight: 0,
      outerScale: 1,
      types: ['circles,rects,paths,polygons']
    }
  },
  computed: {
    normalizedScale() {
      let scale = this.scale
      scale = typeof scale === 'undefined' ? 1 : Number(scale)
      if (isNaN(scale) || scale <= 0) {
        console.warn(
          'Invalid prop: prop "scale" should be a number over 0.',
          this
        )
        return this.outerScale
      }
      return scale * this.outerScale
    },
    klass() {
      const classes = {
        'aep-icon': true,
        'aep-spin': this.spin,
        'aep-flip-horizontal': this.flip === 'horizontal',
        'aepflip-vertical': this.flip === 'vertical',
        'aep-inverse': this.inverse,
        'aep-pulse': this.pulse
      }
      classes[`aep-${this.name}`] = true
      return classes
    },
    icon() {
      if (this.name) {
        return icons[this.name]
      }
      return null
    },
    box() {
      if (this.icon) {
        return `0 0 ${this.icon.width} ${this.icon.height}`
      }
      return `0 0 ${this.width} ${this.height}`
    },
    ratio() {
      if (!this.icon) {
        return 1
      }
      let { width, height } = this.icon
      return Math.max(width, height) / 16
    },
    width() {
      return (
        this.childrenWidth ||
        (this.icon && (this.icon.width / this.ratio) * this.normalizedScale) ||
        0
      )
    },
    height() {
      return (
        this.childrenHeight ||
        (this.icon && (this.icon.height / this.ratio) * this.normalizedScale) ||
        0
      )
    },
    style() {
      if (this.normalizedScale === 1) {
        return false
      }
      return {
        fontSize: this.normalizedScale + 'em'
      }
    },
    raw() {
      // generate unique id for each icon's SVG element with ID
      if (!this.icon || !this.icon.raw) {
        return null
      }
      let raw = this.icon.raw
      let ids = {}
      raw = raw.replace(
        /\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g,
        (match, quote, id) => {
          let uniqueId = getId()
          ids[id] = uniqueId
          return ` id="${uniqueId}"`
        }
      )
      raw = raw.replace(
        /#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g,
        (match, rawId, _, pointerId) => {
          let id = rawId || pointerId
          if (!id || !ids[id]) {
            return match
          }

          return `#${ids[id]}`
        }
      )

      return raw
    }
  },
  mounted() {
    if (this.icon) {
      return
    }
    this.$children.forEach(child => {
      child.outerScale = this.normalizedScale
    })
    let width = 0
    let height = 0
    this.$children.forEach(child => {
      width = Math.max(width, child.width)
      height = Math.max(height, child.height)
    })
    this.childrenWidth = width
    this.childrenHeight = height
    this.$children.forEach(child => {
      child.x = (width - child.width) / 2
      child.y = (height - child.height) / 2
    })
  },
  register(data) {
    for (let name in data) {
      let icon = data[name]
      icons[name] = icon
    }
  }
}

let cursor = 0xd4937
function getId() {
  return `aep-${(cursor++).toString(16)}`
}
</script>
