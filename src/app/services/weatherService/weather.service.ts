import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { City } from 'src/app/model/city';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private getWeatherByLatLong = "/api/location/search/";

  constructor(private httpClient: HttpClient) {
  }

  /**
   * GET city id.
   * @param city
   */
  searchCityByName(city: string): Observable<City[]> {
    const params = new HttpParams({fromString: 'query=' + city});
    return this.httpClient.get<City[]>(this.getWeatherByLatLong, {responseType: 'json', params});
  }

  /**
   * GET all cities weather around position.
   * @param latitude
   * @param longitude
   */
  searchNearCities(latitude: number, longitude: number): Observable<any[]> {
    const params = new HttpParams({fromString: 'lattlong=' + latitude + "," + longitude});
    return this.httpClient.get<any>(this.getWeatherByLatLong, {responseType: 'json', params});
  }

}
