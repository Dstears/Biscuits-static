<template>
  <h5>
    {{ message }}
  </h5>
</template>

<script>
export default {
  data () {
    return {
      message: null
    }
  },
  mounted () {
    this.$get('hello').then(res => {
      this.message = res.data
    })
  }
}
</script>

<style scoped>

</style>
