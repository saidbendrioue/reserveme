import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class DataService {
  private _currrentRestaurant: Restaurant | undefined;
  private sideBarVisibleSubject = new Subject<boolean>();
  // Observable to subscribe to state changes
  sideBarVisible = this.sideBarVisibleSubject.asObservable();

  get currentRestaurant(): any {
    const data = this._currrentRestaurant;
    this._currrentRestaurant = undefined;
    return data;
  }

  set currentRestaurant(data: Restaurant) {
    this._currrentRestaurant = data;
  }

  // Method to emit state change signal
  toggleSidebar(newState: boolean) {
    this.sideBarVisibleSubject.next(newState);
  }
}
