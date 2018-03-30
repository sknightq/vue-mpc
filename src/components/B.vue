<template>
  <div>
    <h1>{{title}}</h1>
    <p>{{content}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: 'components B title',
      content: 'components B content'
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  color: red;
}
</style>
