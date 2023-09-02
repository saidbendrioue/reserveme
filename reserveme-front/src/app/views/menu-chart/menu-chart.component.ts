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
  selector: 'app-menu-chart',
  templateUrl: './menu-chart.component.html',
  styleUrls: ['./menu-chart.component.scss']
})
export class MenuChartComponent implements OnInit {

  menuId: any;
  menu: Menu | undefined;
  restaurant: Restaurant | undefined;
  menuItems: MenuItem[] = [];
  rating = 4;

  constructor(
    private menuService: MenuService,
    private menuItemService: MenuItemService,
    private restaurantService: RestaurantService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.menuId = this.getMenuId();
    this.getMenuById(this.menuId);
    this.getMenuItemsByMenuId(this.menuId);
  }

  getMenuById(menuId: string) {
    this.menuService.getMenuById(menuId)
      .pipe(
        map(response => {
          this.menu = response;
          this.getRestaurantById(this.menu.restaurantId ?? "");
        }),
        catchError(error => {
          return [];
        })
      ).subscribe();
  }

  getRestaurantById(restaurantId: string) {
    this.restaurantService.getRestaurantById(restaurantId)
      .pipe(
        map(response => {
          this.restaurant = response;
        }),
        catchError(error => {
          return [];
        })
      ).subscribe();
  }

  getMenuItemsByMenuId(menuId: string) {
    this.menuItemService.getMenuItemsByMenuId(menuId)
      .pipe(
        map(response => {
          this.menuItems = response;
          this.menuItems.forEach(item => item.price = Math.ceil(Math.random() * 10));
        }),
        catchError(error => {
          return [];
        })
      ).subscribe();
  }

  getMenuId() {
    const menuId = this.route.snapshot.paramMap.get('menuId');
    if (!this.menuId) {
      const parts = this.router.url.split('/');
      const idIndex = parts.indexOf("menu-chart") + 1;
      return parts[idIndex];
    }
    return menuId;
  }

  getImageUrl(menuItem: MenuItem): string {
    if (menuItem.imageUrl) {
      return `${API_ENDPOINT}/files/${menuItem.imageUrl}`
    } else {
      return ("https://source.unsplash.com/400x200/?food?" + menuItem.id)
    }
  }

}
