import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { API_ENDPOINT } from 'src/app/constants/api.constant';
import { MenuItem } from 'src/app/models/menu-item.model';
import { Menu } from 'src/app/models/menu.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { MenuItemService } from 'src/app/services/menu-item.service';
import { MenuService } from 'src/app/services/menu.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-menu-item-list',
  templateUrl: './menu-item-list.component.html',
})
export class MenuItemListComponent implements OnInit {
  menuId: string | undefined | null;
  restaurantId: string | undefined | null;
  menuItems: MenuItem[] = [];
  currentMenu: Menu = {};
  currentRestaurant: Restaurant | undefined;

  constructor(
    private route: ActivatedRoute,
    private menuItemService: MenuItemService,
    private menuService: MenuService,
    private restaurantService: RestaurantService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.menuId = this.getMenuId();
    this.restaurantId = this.getRestaurantId();

    this.getCurrentMenu();
    this.getCurrentRestaurant();
    this.getAllMenuItems();
  }

  private getAllMenuItems() {
    this.menuItemService.getAllMenuItems().pipe(
      map(response => {
        this.menuItems = response;
      }),
      catchError(error => {
        return [];
      })
    ).subscribe();
  }

  private getCurrentMenu() {
    this.menuService.getMenuById(this.menuId ?? '').pipe(
      map(response => {
        this.currentMenu = response;
      }),
      catchError(error => {
        return [];
      })
    ).subscribe();
  }

  private getCurrentRestaurant() {
    this.restaurantService.getRestaurantById(this.restaurantId ?? '').pipe(
      map(response => {
        this.currentRestaurant = response;
      }),
      catchError(error => {
        return [];
      })
    ).subscribe();
  }

  addMenuItem() {
    this.router.navigate([`/dashboard/restaurants/${this.restaurantId}/menus/${this.menuId}/create-menu-item`])
  }

  getImageUrl(menuItem: MenuItem): string {
    return ("https://source.unsplash.com/400x200/?food?" + menuItem.id);
  }

  getMenuId() {
    const menuId = this.route.snapshot.paramMap.get('menuId');
    if (!this.menuId) {
      const parts = this.router.url.split('/');
      const idIndex = parts.indexOf("menus") + 1;
      return parts[idIndex];
    }
    return menuId;
  }

  getRestaurantId() {
    const restaurantId = this.route.snapshot.paramMap.get('restaurantId');
    if (!this.restaurantId) {
      const parts = this.router.url.split('/');
      const idIndex = parts.indexOf("restaurants") + 1;
      return parts[idIndex];
    }
    return restaurantId;
  }

}
