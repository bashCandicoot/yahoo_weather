<template>
  <div id="app">
    <weather/>
  </div>
</template>

<script>
import Weather from './components/Weather.vue'

export default {
  name: 'app',
  components: {
    Weather
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
