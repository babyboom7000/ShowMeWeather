import {Weather} from "../model/weather/Weather";
import {City} from "../model/city";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root', // Declares that this service should be created by the root application injector.
})
export class ToolsService {

  /**
   * Find lowest number
   * @param cities
   */
  getDistances(cities: City[]): number[] {
    let b: number[] = [];
    for (let entry of cities) {
      b.push(entry.distance);
    }
    return b;
  }

  /**
   * Find lowest number.
   * @param citiesId
   */
  findNearCity(citiesId: number[]): number {
    citiesId.sort((a, b) => a - b)
    return citiesId[0];
  }

  findCityNameByDistance(nearestCityDistance: number, cities: City[]): string {
    for (let c of cities) {
      if (c.distance === nearestCityDistance) {
        return c.title;
      }
    }
    return ""
  }

  findCityWoeidByName(cityName: string, cities: City[]): number {
    for (let c of cities) {
      if (c.title === cityName) {
        return c.woeid;
      }
    }
    return 0;
  }

  resolveWeatherIcon(nearWeather: Weather): string {
    switch(nearWeather.consolidated_weather[0].weather_state_name) {
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

  calculateAverageTemperature(weather: Weather[]): string {
    let temperatures: number[] = [];
    for (let t of weather[0].consolidated_weather) {
      temperatures.push(t.the_temp);
    }
    const sum = temperatures.reduce((a, b) => a + b, 0);
    return ((sum / temperatures.length) || 0).toFixed(0);
  }

}
