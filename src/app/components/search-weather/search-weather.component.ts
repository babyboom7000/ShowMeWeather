import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weatherService/weather.service";
import {Weather} from "../../model/weather/Weather";
import {Tools} from "../../tools/Tools";
import {FormControl, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {ProgressBarService} from "../../services/progressBarService/progress-bar.service";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

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
  options: string[] = ["Vienna", "Prague", "London", "Munich"]; // TODO: Fill real values from backend.

  progressBarShow = false;

  constructor(public weatherService: WeatherService,
              private progressBarService: ProgressBarService) { }

  ngOnInit(): void {
    this.progressBarService.changeProgressBar(true);
  }

  userCitySearchFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  /**
   * User want to find city weather.
   */
  public searchCity() {
    this.progressBarService.changeProgressBar(true);
    this.weatherService.searchCityByName(this.cityFromUser).subscribe(r => {
      this.weatherService.searchWeatherByCityWoeid(r[0].woeid).subscribe(value => {
        this.weatherByUserSearch[0] = value;
        this.result = this.weatherByUserSearch[0].consolidated_weather[0].the_temp;
        this.weatherIconUrl = Tools.resolveWeatherIcon(this.weatherByUserSearch);
        this.progressBarService.changeProgressBar(false);
        // this.result = Tools.calculateAverageTemperature(this.weatherByUserSearch); // Mistake.
      });
    });
  }

}
