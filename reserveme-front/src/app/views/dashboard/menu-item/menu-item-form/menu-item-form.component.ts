import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, pipe } from 'rxjs';
import { MenuItem } from 'src/app/models/menu-item.model';
import { MenuItemService } from 'src/app/services/menu-item.service';

@Component({
  selector: 'app-menu-item-form',
  templateUrl: './menu-item-form.component.html',
})

export class CreateMenuItemComponent implements OnInit {
  menuItem: MenuItem = {};
  imageFile: any;
  menuId: string | null | undefined;
  restaurantId: string | null | undefined;

  isCreating: boolean = false;

  constructor(
    private menuItemService: MenuItemService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.menuId = this.route.snapshot.paramMap.get('menuId');
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
  }

  onFileSelect(event: any): void {
    this.imageFile = event.files[0];
  }

  createMenuItem(): void {
    this.isCreating = true;
    this.menuItem.menuId = this.menuId;
    this.menuItemService.createMenuItem(this.menuItem, this.imageFile)
      .pipe(
        map(response => {
          this.isCreating = false;
          this.router.navigate([`/dashboard/restaurants/${this.restaurantId}/menus/${this.menuId}`]);
        }),
        catchError(error => {
          console.error('Error creating menu:', error);
          this.isCreating = false;
          return [];
        })
      ).subscribe();
  }
}
