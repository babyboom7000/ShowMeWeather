import { Component, OnInit } from '@angular/core';
import {LocationService} from "../../services/locationService/location-service.service";

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.sass']
})
export class CurrentWeatherComponent implements OnInit {

  constructor(public locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getCurrentLocation(); // Get position when component load.
  }

}
