import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { FOOD_VENDORS } from 'src/app/constants/food.vendors.constants';
import { Restaurant } from 'src/app/models/restaurant.model';
import { User } from 'src/app/models/user.model';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
})

export class RestaurantFormComponent implements OnInit {
  imageFile: any;
  restaurant: Restaurant = {};
  ownerId: string = '';
  imageDataUrl: any;
  restaurantTypes = FOOD_VENDORS;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const currentUser: User = JSON.parse(localStorage.getItem("current_user") ?? '');
    this.ownerId = currentUser.id ?? '';
  }

  onFileSelect(event: any): void {
    this.imageFile = event.files[0];
    // Read the selected image file as a data URL
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageDataUrl = e.target.result;
    };
    reader.readAsDataURL(this.imageFile);
  }

  createRestaurant(): void {
    this.restaurant.ownerId = this.ownerId;
    this.restaurantService.createRestaurant(this.restaurant, this.imageFile)
      .pipe(
        map(response => {
          this.router.navigate(['/dashboard/restaurants']);
        }),
        catchError(error => {
          console.error('Error creating restaurant:', error);
          return [];
        })
      ).subscribe();
  }

}
