import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant.model';
import { DataService } from 'src/app/services/data.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
})

export class RestaurantListComponent implements OnInit {

  restaurants: Restaurant[] = [];

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.restaurantService.getAllRestaurants().pipe(
      map(response => {
        this.restaurants = response;
      }),
    ).subscribe();
  }

  addRestaurant() {
    this.router.navigate([`/dashboard/restaurants/create`])
  }

  getImageUrl(restaurant: Restaurant): string | undefined {
    return "https://source.unsplash.com/400x200/?food?" + restaurant.id;
  }


  goToMenuList(restaurant: Restaurant) {
    this.dataService.currentRestaurant = restaurant;
    this.router.navigate([`/dashboard/restaurants/${restaurant.id}/menus`]);
  }
}
