import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { isEmpty }    from 'lodash';

import { StorageService } from './storage.service';

@Injectable()
export class LocationService {

  constructor(
    public storage: StorageService
  ) { }

  /**
   * Get user location
   */
  getLocation() {
    return Observable.create(( observer) => {
      //check if we already have coords in local storage and return it to subscriber
      const coords = JSON.parse(this.storage.getStorageItem("coords"));
      if(!isEmpty(coords)) return observer.next(coords);

      if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(position => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
          observer.next(coords);
          observer.complete();
          this.storage.setStorageItem("coords", JSON.stringify(coords));
        }, (err) => {
          observer.error(err);
        })
      } else {
        observer.error(new Error("No geolocation available"));
      }
    });
  }
}
