import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weatherService/weather.service";
import {Weather} from "../../model/weather/Weather";
import {Tools} from "../../tools/Tools";

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.sass']
})
export class SearchWeatherComponent implements OnInit {

  public cityFromUser: string = "";
  public weatherByUserSearch: Weather[] = [];
  public result: string = "";

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  /**
   * User want to find city weather.
   */
  public searchCity() {
    this.weatherService.searchCityByName(this.cityFromUser).subscribe(r => {
      this.weatherService.searchWeatherByCityWoeid(r[0].woeid).subscribe(value => {
        this.weatherByUserSearch[0] = value;
        this.result = Tools.calculateAverageTemperature(this.weatherByUserSearch);
      });
    });
  }

}
