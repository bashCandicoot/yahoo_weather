<template>
  <div>
    {{ weather }}
  </div>
</template>

<script>
import WeatherService from '@/services/WeatherService';

export default {
  name: 'Weather',
  data: function() {
    return {
      weather: null
    };
  },
  // props: {
  //   msg: String
  // },
  created() {
    this.getWeather({city:'London'})
  },
  methods: {
    getWeather(city) {
      this.weather = WeatherService.getWeather(city);
    }
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
