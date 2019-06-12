<template>
  <div class="aep-location-wrapper form-group-section">
    <div class="form-group">
      <label for="location-coordinate" v-show="showCoordinateLabel">{{coordinateText}}</label>
      <input class="inline-block coordinate-input" type="text" id="location-coordinate" v-bind:value="coordinate" placeholder="0.000000 E, 0.000000 N" v-on:blur="getLocation($event)" v-bind:readonly="isReadOnly" :style="inputStyle">
      <icon name="target" scale=1.875 v-on:click.native="selectPoint" v-show="!isReadOnly"></icon>
    </div>
    <div class="form-group" v-if="hasAddress">
      <label for="location-address" v-show="showAddressLabel">{{addressText}}</label>
      <textarea class="address-area" id="location-addresss" v-model="selectAddress" v-bind:readonly="isReadOnly" v-on:blur="getLngLat($event)"></textarea>
    </div>
  </div>
</template>
<script>
export default {
  name: 'aepLocation',
  props: {
    showCoordinateLabel: {
      type: Boolean,
      default: false
    },
    showAddressLabel: {
      type: Boolean,
      default: false
    },
    coordinateText: {
      type: String,
      default: '经纬度'
    },
    addressText: {
      type: String,
      default: '详细地址'
    },
    address: {
      type: String,
      default: ''
    },
    hasAddress: {
      type: Boolean,
      default: false
    },
    isReadOnly: {
      type: Boolean,
      default: false
    },
    lng: {
      type: Number,
      default: 0
    },
    lat: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectAddress: this.address,
      selectLng: parseFloat(this.lng),
      selectLat: parseFloat(this.lat),
      inputWidth: 300
    }
  },
  watch: {
    lng(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.selectLng = newVal
      }
    },
    lat(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.selectLat = newVal
      }
    },
    address(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.selectAddress = newVal
      }
    }
  },
  computed: {
    coordinate() {
      if (this.selectLng === 0 && this.selectLat === 0) {
        return ''
      }
      return this.selectLng.toFixed(6) + 'E,' + this.selectLat.toFixed(6) + 'N'
    },
    inputStyle() {
      return {
        width: this.inputWidth + 'px'
      }
    }
  },
  created() {
    const totalW =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    this.inputWidth = totalW - (this.isReadOnly ? 0 : 50)
    if (this.lng && this.lat) {
      this.getAddress(this.lng, this.lat)
    }
  },
  methods: {
    selectPoint() {
      window.aepHideAllMenus()
      document.addEventListener('mapClick', this.mapClickEvent)
    },
    mapClickEvent(e) {
      this.selectLng = e.detail.lng
      this.selectLat = e.detail.lat
      this.getAddress(this.selectLng, this.selectLat, () => {
        window.aepShowAllMenus()
        document.removeEventListener('mapClick', this.mapClickEvent)
      })
    },
    getLocation(e) {
      // console.log('e: %O', e)
      if (e.target.value !== '') {
        const values = e.target.value.split(',')
        let lng = 0
        let lat = 0
        // 经度
        if (!isNaN(values[0])) {
          lng = values[0]
        } else if (
          values[0].slice(-1).toLowerCase() === 'e' &&
          !isNaN(values[0].slice(0, -1))
        ) {
          lng = values[0].slice(0, -1)
        } else {
          // TODO: best way to use custom message popup
          alert('错误的经纬度格式')
          return
        }
        // 纬度
        if (!isNaN(values[1])) {
          lat = values[1]
        } else if (
          values[1].slice(-1).toLowerCase() === 'n' &&
          !isNaN(values[1].slice(0, -1))
        ) {
          lat = values[1].slice(0, -1)
        } else {
          // TODO: best way to use custom message popup
          alert('错误的经纬度格式')
          return
        }
        this.getAddress(lng, lat)
      }
    },
    getAddress(lng, lat, callback) {
      window.aepGetLocation(
        parseFloat(lng),
        parseFloat(lat),
        'wgs84',
        address => {
          let newAddress = ''
          if (typeof address === 'object' && address !== null) {
            newAddress =
              address.province +
              address.city +
              address.district +
              address.street +
              address.streetNumber
          } else if (typeof address === 'string') {
            newAddress = address
          }
          this.selectAddress = newAddress
          if (typeof callback === 'function') {
            callback()
          }
          this.$emit('get-location-info', {
            address: this.selectAddress,
            lng: this.selectLng,
            lat: this.selectLat
          })
        }
      )
    },
    getLngLat(event) {
      const address = event.target.value
      if (address !== '') {
        window.aepGetLngLat(address, e => {
          if (!e) {
            alert('错误地址或地址未知')
          } else {
            this.selectLng = e.lng
            this.selectLat = e.lat
            this.selectAddress = address
            this.$emit('get-location-info', {
              address: this.selectAddress,
              lng: this.selectLng,
              lat: this.selectLat
            })
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
.aep-location-wrapper {
  .form-group {
    > input.coordinate-input {
      width: 85%;
      border: none;
      font-size: 14px;
      line-height: 20px;
      padding: 5px 4px;
      &.is-read-only {
        width: 100%;
      }
    }
    > input.coordinate-input + svg {
      color: $color-main;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }
  }
  .address-area {
    padding: 5px;
    min-height: 50px;
  }
}
</style>
