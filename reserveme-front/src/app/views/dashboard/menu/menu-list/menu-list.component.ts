import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { MenuService } from 'src/app/services/menu.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import * as QRCode from 'qrcode';
import { saveAs } from 'file-saver';
import { API_ENDPOINT } from 'src/app/constants/api.constant';

@Component({
  selector: 'app-view-menu-list',
  templateUrl: './menu-list.component.html',
})
export class MenuListComponent implements OnInit {

  menus: Menu[] = [];
  currentRestaurant: Restaurant | undefined;
  restaurantId: string | null | undefined;
  items: any = [];
  clickedMenuId: string = '';

  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
  ) { }

  ngOnInit(): void {
    this.restaurantId = this.getRestaurantId();

    this.restaurantService.getRestaurantById(this.restaurantId ?? '').pipe(
      map(response => {
        this.currentRestaurant = response;
      }),
      catchError(error => {
        return [];
      })
    ).subscribe();

    this.menuService.getMenuByRestaurantId(this.restaurantId ?? '').pipe(
      map(response => {
        this.menus = response;
      }),
      catchError(error => {
        return [];
      })
    ).subscribe();

    this.items = [
      {
        label: 'Preview',
        icon: 'pi pi-eye',
        command: () => {
          this.router.navigate([`/menu-chart/${this.clickedMenuId}`]);
        }
      },
      {
        label: 'Download QR-Code',
        icon: 'pi pi-arrow-circle-down',
        command: () => {
          this.generateQRCodeAndDownload()
        }
      }
    ];
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

  getImageUrl(menu: Menu): string {
    if (menu.imageUrl)
      return `${menu.imageUrl}`;
    else
      return `https://source.unsplash.com/400x200/?food?${menu.imageUrl}`;
  }

  addMenu() {
    this.router.navigate([`/dashboard/restaurants/${this.restaurantId}/menus/create`]);
  }

  goToMenuItemList(menu: Menu) {
    this.router.navigate([`/dashboard/restaurants/${this.restaurantId}/menus/${menu.id}`]);
  }

  async generateQRCodeAndDownload() {
    try {
      const qrCodeData = `${API_ENDPOINT}/menu-chart/${this.clickedMenuId}`;
      const canvas = await QRCode.toCanvas(qrCodeData, { width: 200 });
      canvas.toBlob((blob: any) => {
        saveAs(blob, this.clickedMenuId + '.png');
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  }
}
