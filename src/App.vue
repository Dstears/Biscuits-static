<template>
    <div  id="app">
      <router-view/>
    </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    to (url) {
      this.$router.push({path: url})
    }
  }
}
</script>

<style>
#app {
  font-size: 14px;
  font-weight:400;
  color:#99ABB4;
  margin: 10px;
}
</style>
