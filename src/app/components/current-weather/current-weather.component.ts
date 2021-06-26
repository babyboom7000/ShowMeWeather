import {Component, OnInit} from '@angular/core';
import {City} from 'src/app/model/city';
import {WeatherService} from "../../services/weatherService/weather.service";
import {Weather} from "../../model/weather/Weather";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.sass']
})
export class CurrentWeatherComponent implements OnInit {

  public yourPosition: number[] = []
  public cities: City[] = [];
  resultByPosition: City[] = [];
  mostNearCityName: string = "";
  nearWeather: Weather[] = [];
  averageWeather: string = "";

  constructor(public weatherService: WeatherService) {
  }

  ngOnInit(): void {
    // Get position and search nearest cities.
    navigator.geolocation.getCurrentPosition(position => {                                                                          // Get position.
      this.yourPosition = [position.coords.latitude, position.coords.longitude];                                                                // Store client position.
      this.weatherService.searchNearCities(position.coords.latitude, position.coords.longitude).subscribe(result => {
        this.resultByPosition = result;                                                                                                         // find near cities around your position.
        this.mostNearCityName = this.findCityNameByDistance(this.findNearCity(this.getDistancesOnly(result)), result);                          // Find nearest city.
        this.weatherService.searchWeatherByCityWoeid(this.findCityWoeidByName(this.mostNearCityName, result)).subscribe(value => {
          this.nearWeather[0] = value;                                                                                                          // Get Weather.
          this.averageWeather = this.calculateAverageTemperature(this.nearWeather)
        });
      });
    });

    /*this.weatherService.searchCityByName("London")
      .subscribe(result => {
        this.cities = result;
      })*/
  }

  /**
   * Find lowest number
   * @param cities
   */
  getDistancesOnly(cities: City[]): number[] {
    let b: number[] = [];
    for (let entry of cities) {
      b.push(entry.distance);
    }
    return b;
  }

  /**
   * Find lowest number
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

  calculateAverageTemperature(weather: Weather[]): string {
    let temperatures: number[] = [];
    for (let t of weather[0].consolidated_weather) {
      temperatures.push(t.the_temp);
    }

    const sum = temperatures.reduce((a, b) => a + b, 0);
    return ((sum / temperatures.length) || 0).toFixed(2);
  }

}
