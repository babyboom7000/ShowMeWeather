import {Weather} from "../model/weather/Weather";

export class Tools {
  static calculateAverageTemperature(weather: Weather[]): string {
    let temperatures: number[] = [];
    for (let t of weather[0].consolidated_weather) {
      temperatures.push(t.the_temp);
    }

    const sum = temperatures.reduce((a, b) => a + b, 0);
    return ((sum / temperatures.length) || 0).toFixed(2);
  }
}
