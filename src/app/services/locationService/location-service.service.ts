import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  currentLatitude = 0;
  currentLongitude = 0;

  constructor() {
  }

  public getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;
      });
    }
  }

  public getCurrentLatitude(): number {
    return this.currentLatitude;
  }

  public getCurrentLongitude(): number {
    return this.currentLongitude;
  }

}
