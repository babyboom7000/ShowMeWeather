import {Component, OnInit} from '@angular/core';
import { City } from 'src/app/model/city';
import {WeatherService} from "../../services/weatherService/weather.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.sass']
})
export class CurrentWeatherComponent implements OnInit {

  public cities: City[] = [];
  resultByPosition: any;

  constructor(public weatherService: WeatherService) {
  }

  ngOnInit(): void {
    // Get position and search nearest cities.
    navigator.geolocation.getCurrentPosition(position => {
      this.weatherService.searchNearCities(position.coords.latitude, position.coords.longitude).subscribe(result => {
        this.resultByPosition = result;
      });
    });

    this.weatherService.searchCityByName("London")
      .subscribe(result => {
        this.cities = result;
      })
  }

}
