import {Weather} from "../model/weather/Weather";

export class Tools {

  static calculateAverageTemperature(weather: Weather[]): string {
    let temperatures: number[] = [];
    for (let t of weather[0].consolidated_weather) {
      temperatures.push(t.the_temp);
    }
    const sum = temperatures.reduce((a, b) => a + b, 0);
    return ((sum / temperatures.length) || 0).toFixed(0);
  }

  static resolveWeatherIcon(nearWeather: Weather[]): string {
    switch(nearWeather[0].consolidated_weather[0].weather_state_name) {
      case "Clear": {
        return "https://www.metaweather.com/static/img/weather/c.svg";
      }
      case "Light Cloud": {
        return "https://www.metaweather.com/static/img/weather/lc.svg";
      }
      case "Showers": {
        return "https://www.metaweather.com/static/img/weather/s.svg";
      }
      // TODO: Others..
      default: {
        return "https://www.metaweather.com/static/img/weather/c.svg";
      }
    }
  }
}
