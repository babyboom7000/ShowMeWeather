import {Component, OnInit} from '@angular/core';
import {City} from 'src/app/model/city';
import {WeatherService} from "../../services/weatherService/weather.service";
import {Weather} from "../../model/weather/Weather";
import {Tools} from "../../tools/Tools";
import {ProgressBarService} from "../../services/progressBarService/progress-bar.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.sass']
})
export class CurrentWeatherComponent implements OnInit {

  // Get average weather fields.
  public yourPosition: number[] = []
  resultByPosition: City[] = [];
  mostNearCityName: string = "";
  nearWeather: Weather[] = [];
  currentTemperature: number = 0;

  // Weather status
  weatherIconUrl: string = "https://www.metaweather.com/static/img/weather/c.svg";

  constructor(public weatherService: WeatherService,
              private progressBarService: ProgressBarService) {
  }

  ngOnInit(): void {
    this.progressBarService.changeProgressBar(true);
    // Get position and search nearest cities.
    navigator.geolocation.getCurrentPosition(position => {                                                                          // Get position.
      this.yourPosition = [position.coords.latitude, position.coords.longitude];                                                                // Store client position.
      this.weatherService.searchNearCities(position.coords.latitude, position.coords.longitude).subscribe(result => {
        this.resultByPosition = result;                                                                                                         // find near cities around your position.
        this.mostNearCityName = this.findCityNameByDistance(this.findNearCity(this.getDistancesOnly(result)), result);                          // Find nearest city.
        this.weatherService.searchWeatherByCityWoeid(this.findCityWoeidByName(this.mostNearCityName, result)).subscribe(value => {
          this.nearWeather[0] = value;                                                                                                          // Get Weather.
          this.currentTemperature = this.nearWeather[0].consolidated_weather[0].the_temp;
          this.weatherIconUrl = Tools.resolveWeatherIcon(this.nearWeather);
          this.progressBarService.changeProgressBar(false);
          // this.averageTemperature = Tools.calculateAverageTemperature(this.nearWeather)                                                      // I make mistake, array of days aha.
        });
      });
    });
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

}
