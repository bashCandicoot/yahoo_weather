import axios from 'axios';

export default {
	getWeather({city}) {
		const query = `select item.condition from weather.forecast where woeid in (select woeid from geo.places(1) where text='${city}') and u='c'`
		axios.get(`https://query.yahooapis.com/v1/public/yql?q=${query}`)
	}
}
