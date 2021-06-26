import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weatherService/weather.service";
import {Weather} from "../../model/weather/Weather";
import {Tools} from "../../tools/Tools";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-search-weather',
  templateUrl: './search-weather.component.html',
  styleUrls: ['./search-weather.component.sass']
})
export class SearchWeatherComponent implements OnInit {

  public cityFromUser: string = "";
  public weatherByUserSearch: Weather[] = [];
  public result: number = 0;
  weatherIconUrl: string = "https://www.metaweather.com/static/img/weather/c.svg";

  // TODO: Fill real values from backend.
  options: string[] = ["Vienna","Prague","London"];

  constructor(public weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  userCitySearchFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);



  /**
   * User want to find city weather.
   */
  public searchCity() {
    this.weatherService.searchCityByName(this.cityFromUser).subscribe(r => {
      this.weatherService.searchWeatherByCityWoeid(r[0].woeid).subscribe(value => {
        this.weatherByUserSearch[0] = value;
        this.result = this.weatherByUserSearch[0].consolidated_weather[0].the_temp;
        this.weatherIconUrl = Tools.resolveWeatherIcon(this.weatherByUserSearch);
        // this.result = Tools.calculateAverageTemperature(this.weatherByUserSearch);
      });
    });
  }

}
