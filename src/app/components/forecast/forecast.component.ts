import {Component, Input, OnInit} from '@angular/core';
import {Weather} from "../../model/weather/Weather";

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.sass']
})
export class ForecastComponent implements OnInit {

  date: Date = new Date(Date.now());

  @Input()
  weather: Weather[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
