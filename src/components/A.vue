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
      title: 'components A title',
      content: 'components A content'
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  color: blue;
}
</style>
