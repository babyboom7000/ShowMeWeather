import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { City } from 'src/app/model/city';
import {Weather} from "../../model/weather/Weather";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private getWeatherByLatLong = "/api/location/search/";
  private getWeatherByWoeid = "/api/location/";


  constructor(private httpClient: HttpClient) {
  }

  /**
   * GET city id.
   * @param city
   */
  public searchCityByName(city: string): Observable<City[]> {
    const params = new HttpParams({fromString: 'query=' + city});
    return this.httpClient.get<City[]>(this.getWeatherByLatLong, {responseType: 'json', params});
  }

  /**
   * GET all cities weather around position.
   * @param latitude
   * @param longitude
   */
  public searchNearCities(latitude: number, longitude: number): Observable<City[]> {
    const params = new HttpParams({fromString: 'lattlong=' + latitude + "," + longitude});
    return this.httpClient.get<City[]>(this.getWeatherByLatLong, {responseType: 'json', params});
  }

  /**
   * GET
   */
  public searchWeatherByCityWoeid(woeid: number): Observable<Weather> {
    return this.httpClient.get<Weather>(this.getWeatherByWoeid + woeid + "/");
  }

}
