import { Component, OnInit } from '@angular/core';
import {WeatherService} from "../../services/weatherService/weather.service";
import {Weather} from "../../model/weather/Weather";
import {ToolsService} from "../../tools/tools.service";
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
  public weatherByUserSearch: Weather | undefined;
  public result: number = 0;
  public weatherIconUrl: string = "https://www.metaweather.com/static/img/weather/c.svg";
  public history: string[] = [];

  constructor(public weatherService: WeatherService,
              private toolsService: ToolsService,
              private progressBarService: ProgressBarService) { }

  ngOnInit(): void {
    // Show loading when screen appear.
    this.progressBarService.changeProgressBar(true);

    // Get data for history datatables.
    this.history = JSON.parse(<string>localStorage.getItem("citiesHistory"));
  }

  // Validator for search city input field.
  userCitySearchFormControl = new FormControl('', [
    Validators.required
  ]);
  matcher = new MyErrorStateMatcher();

  /**
   * User want to find city weather.
   */
  public searchCity() {
    // Show loading again when user click to search button.
    this.progressBarService.changeProgressBar(true);

    this.weatherService.searchCityByName(this.cityFromUser).subscribe(r => {
      this.weatherService.searchWeatherByCityWoeid(r[0].woeid).subscribe(value => {
        this.weatherByUserSearch = value;
        this.result = this.weatherByUserSearch.consolidated_weather[0].the_temp;
        this.weatherIconUrl = this.toolsService.resolveWeatherIcon(this.weatherByUserSearch);
        this.progressBarService.changeProgressBar(false);

        // History.
        if(this.history === null) {
          this.history = [];
        }
        this.history.push(this.weatherByUserSearch.title);
        localStorage.setItem("citiesHistory", JSON.stringify(this.history));

      }, error => {});
    }, error => {});
  }

}
