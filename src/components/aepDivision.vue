<template>
  <div class="aep-ad clearfix">
    <select name="province" id="province" v-model="provinceSelected.name" v-bind:value="provinceSelected.name" v-on:change="changeprovince" v-bind:disabled="readonly">
      <option v-for="(province, index) in provinces" v-bind:key="index" v-bind:value="province.name">{{province.name}}</option>
    </select>
    <select name="city" id="city" v-model="citySelected.name" v-bind:value="citySelected.name" v-on:change="changeCity" v-bind:disabled="readonly">
      <option v-for="(city, index) in cities" v-bind:key="index" v-bind:value="city.name">{{city.name}}</option>
    </select>
    <select name="area" id="area" v-model="areaSelected.name" v-bind:value="areaSelected.name" v-on:change="changeArea" v-bind:disabled="readonly">
      <option v-for="(area, index) in areas" v-bind:key="index" v-bind:value="area.name">{{area.name}}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'aepDivison',
  props: {
    readonly: {
      type: Boolean,
      default: false
    },
    pca: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultDivision: {
      type: Object,
      default: () => {
        return {
          pronvice: '浙江省',
          city: '宁波市',
          area: '鄞州区'
        }
      }
    },
    selectedArea: {
      type: Object,
      default: () => {
        return {
          province: '',
          city: '',
          area: ''
        }
      }
    }
  },
  data() {
    return {
      provinces: this.pca,
      cities: [],
      areas: [],
      provinceSelected: {
        code: '',
        name: !this.selectedArea.province
          ? this.defaultDivision.province
          : this.selectedArea.province
      },
      citySelected: {
        code: '',
        name: !this.selectedArea.city
          ? this.defaultDivision.city
          : this.selectedArea.city
      },
      areaSelected: {
        code: '',
        name: !this.selectedArea.area
          ? this.defaultDivision.area
          : this.selectedArea.area
      }
    }
  },
  watch: {
    selectedArea: {
      handler() {
        this.provinceSelected = {
          code: '',
          name: !this.selectedArea.province
            ? this.defaultDivision.province
            : this.selectedArea.province
        }
        this.citySelected = {
          code: '',
          name: !this.selectedArea.city
            ? this.defaultDivision.city
            : this.selectedArea.city
        }
        this.areaSelected = {
          code: '',
          name: !this.selectedArea.area
            ? this.defaultDivision.area
            : this.selectedArea.area
        }
        this.changeprovince()
      },
      deep: true
    }
  },
  created() {
    this.changeprovince()
  },
  methods: {
    changeprovince() {
      let matching = false
      for (let i = 0; i < this.provinces.length; i++) {
        if (this.provinces[i].name === this.provinceSelected.name) {
          matching = true
          this.provinceSelected = {
            name: this.provinces[i].name,
            code: this.provinces[i].code
          }
          this.cities = this.provinces[i].children
          break
        }
      }
      if (!matching) {
        this.provinceSelected = {
          name: this.provinces[0].name,
          code: this.provinces[0].code
        }
        this.cities = this.provinces[0].children
      }
      this.changeCity()
      this.updateDivison()
    },
    changeCity() {
      let matching = false
      for (let i = 0; i < this.cities.length; i++) {
        if (this.cities[i].name === this.citySelected.name) {
          matching = true
          this.citySelected = {
            name: this.cities[i].name,
            code: this.cities[i].code
          }
          this.areas = this.cities[i].children
          break
        }
      }
      if (!matching) {
        this.citySelected = {
          name: this.cities[0].name,
          code: this.cities[0].code
        }
        this.areas = this.cities[0].children
      }
      this.changeArea()
      this.updateDivison()
    },
    changeArea() {
      let matching = false
      for (let i = 0; i < this.areas.length; i++) {
        if (this.areas[i].name === this.areaSelected.name) {
          matching = true
          this.areaSelected = {
            name: this.areas[i].name,
            code: this.areas[i].code
          }
          break
        }
      }
      if (!matching) {
        this.areaSelected = {
          name: this.areas[0].name,
          code: this.areas[0].code
        }
      }
      this.updateDivison()
    },
    updateDivison() {
      this.$emit('change', {
        province: this.provinceSelected,
        city: this.citySelected,
        area: this.areaSelected
      })
    }
  }
}
</script>
<style lang="scss">
.aep-ad {
  select {
    float: left;
    display: block;
    width: 32%;
    font-size: 12px;
    padding: 3px 0;
    border: none;
    option {
      font-size: 12px;
    }
  }
  select + select {
    margin-left: 2%;
  }
}
</style>
