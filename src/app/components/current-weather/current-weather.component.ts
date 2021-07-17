import {Component, OnInit} from '@angular/core';
import {WeatherService} from "../../services/weatherService/weather.service";
import {Weather} from "../../model/weather/Weather";
import {ToolsService} from "../../tools/tools.service";
import {ProgressBarService} from "../../services/progressBarService/progress-bar.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.sass']
})
export class CurrentWeatherComponent implements OnInit {

  // Weather status icon for today.
  public weatherIconSunnyUrl: string = "https://www.metaweather.com/static/img/weather/c.svg";

  // Position in format: [latitude, longitude]
  private yourPosition: number[] | undefined;

  // Client near city. Used for show Client near city on GUI.
  public mostNearCityName: string = "";

  // Client near city weather.
  public nearCityWeather: Weather | undefined;

  // Client city temperature for today forecast.
  public currentTemperature: number = 0;

  constructor(public weatherService: WeatherService,
              private toolsService: ToolsService,
              private progressBarService: ProgressBarService) {
  }

  ngOnInit(): void {
    // Show loading.
    this.progressBarService.changeProgressBar(true);

    // Get client position.
    navigator.geolocation.getCurrentPosition(position => {
      this.yourPosition = [position.coords.latitude, position.coords.longitude]; // Store client position.

      // Search cities around client, based on his position.
      this.weatherService.searchNearCities(position.coords.latitude, position.coords.longitude).subscribe(r => {
        this.mostNearCityName = this.toolsService.findCityNameByDistance(    // Find only one near city and store it for show on view.
          this.toolsService.findNearCity(this.toolsService.getDistances(r)), r);

        // Search weather in client near city.
        this.weatherService.searchWeatherByCityWoeid(this.toolsService.findCityWoeidByName(this.mostNearCityName, r)).subscribe(r => {
          this.nearCityWeather = r;                                                                   // Store Weather.
          this.currentTemperature = this.nearCityWeather.consolidated_weather[0].the_temp;            // Store temperature for today forecast [0].
          this.weatherIconSunnyUrl = this.toolsService.resolveWeatherIcon(this.nearCityWeather);      // Show right icon.
          this.progressBarService.changeProgressBar(false);                                     // Hide progress bar.
          // this.averageTemperature = Tools.calculateAverageTemperature(this.nearWeather)            // I make mistake, array of days aha.

        }, error => {
          // Cannot search weather in city.
          this.progressBarService.changeProgressBar(false);
        });
      }, error => {
        // Cannot search city by client distance.
        this.progressBarService.changeProgressBar(false);
      });
    }, error => {
      //Cannot get client position.
      this.progressBarService.changeProgressBar(false);
    });
  }

}
