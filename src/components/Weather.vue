<template>
  <div>
    <div class="City-temp">{{this.cityTemp}}</div>
    <div class="City-weather">{{this.cityWeather}}</div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import WeatherService from '@/services/WeatherService';
import MatrixService from '@/services/MatrixService'
import _ from 'lodash'

export default {
  name: 'Weather',
  data: function() {
    return {
      city: null,
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
  mounted() {
    setInterval( async () => {
      this.matrix.weather = await this.getWeather() 
      this.matrix.symbols = this.cityChars
    }, 8000);
    this.initCanvas() 
  },
  created() {
    window.addEventListener('resize', this.updateCanvas, false)
  },
  methods: {
    async getWeather() {
      const cities = this.cities.filter(city => city !== _.get(this, 'city.name'))
      const city = this.getRandomCity(cities);
      const weather = await WeatherService.getWeather(city);
      this.city = {...weather, name: city}
    },
    getRandomCity(cities) {
      return cities[Math.floor(Math.random() * Math.floor(cities.length))]
    },
    updateCanvas() {
      this.matrix.getCanvasSize()
      this.matrix.setFont()
      this.matrix.setSymbolStartYPositions()
    },
    async initCanvas() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      this.matrix = new MatrixService({canvas, ctx})
      this.updateCanvas()
      this.matrix.drawSymbolsInterval()
      this.matrix.weather = await this.getWeather() 
      this.matrix.symbols = this.cityChars
    }
  },
  computed: {
    cityChars() {
      return `${this.city.name}-`.split('').map(char => char.toUpperCase())
    },
    cityTemp() {
      return `${_.get(this, 'city.temp', '')}°C`
    },
    cityWeather() {
      return _.get(this, 'city.text')
    }
  }
}
</script>

<style scoped>
  .City-temp {
    font-size: 10vh;
    position: absolute;
    -webkit-transform: translate(-50%, 0); 
    left: 50%;
    top: 40%;
    opacity: 0.3;
  }
  .City-weather {
    font-size: 4vh;
    position: absolute;
    -webkit-transform: translate(-50%, 0); 
    left: 50%;
    top: 50%;
    opacity: 0.3;
  }
</style>
