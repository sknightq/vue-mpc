<template>
  <div class="aep-textarea" contenteditable="true" @input="updateHtml"></div>
</template>
<script>
export default {
  props: ['value'],
  mounted() {
    this.$el.innerHTML = this.value
  },
  // watch: {
  //   value(v) {
  //     this.$el.innerHTML = v
  //   }
  // },
  methods: {
    updateHtml(e) {
      this.$emit('input', e.target.innerHTML)
    }
  }
}
</script>
<style lang="scss">
.aep-textarea {
  width: 100%;
  resize: none;
  height: 90px;
  border: 1px solid $color-border-base;
  padding: 5px;
  font-size: 12px;
  overflow: auto;
  background-color: #fff;
  cursor: text;
}
</style>
