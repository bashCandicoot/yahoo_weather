<template>
      <canvas ref="canvas"></canvas>
</template>

<script>
import WeatherService from '@/services/WeatherService';
import MatrixService from '@/services/MatrixService'
import _ from 'lodash'

export default {
  name: 'Weather',
  data: function() {
    return {
      weather: null,
      matrix: null,
      cities: [
        'London',
        'Tokyo',
        'Melbourne',
        'Montreal',
        'Paris',
        'Munich',
        'Berlin',
        'Zurich',
      ]
    };
  },
  created() {
    window.addEventListener('resize', this.updateCanvas, false)
  },
  mounted() {
    setInterval( async () => {
      this.matrix.weather = await this.getWeather() 
      this.matrix.symbols = this.cityChars
    }, 3000);
    this.initCanvas() 
  },
  methods: {
    async getWeather() {
      const cities = this.cities.filter(city => city !== _.get(this, 'weather.city'))
      const city = this.getRandomCity(cities);
      const weather = await WeatherService.getWeather(city);
      this.weather = {...weather, city}
    },
    getRandomCity(cities) {
      return cities[Math.floor(Math.random() * Math.floor(cities.length))]
    },
    updateCanvas() {
      this.matrix.getCanvasSize()
      this.matrix.setFont()
      this.matrix.setSymbolStartYPositions()
    },
    initCanvas() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      this.matrix = new MatrixService({canvas, ctx})
      this.updateCanvas()
      this.matrix.drawSymbolsInterval()
    }
  },
  computed: {
    cityChars() {
      return this.weather.city.split('').map(char => char.toUpperCase())
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
