import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, pipe } from 'rxjs';
import { Menu } from 'src/app/models/menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
})

export class CreateMenuComponent implements OnInit {
  menu: Menu = { name: '', description: '', imageUrl: '' };
  imageFile: any;
  restaurantId: string | null | undefined;
  imageDataUrl: any;
  menuTemplates = [
    { name: 'Products with image', id: '0' },
    { name: 'Products without image', id: '1' },
  ]
  constructor(
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.restaurantId = this.route.snapshot.paramMap.get('restaurantId');
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

  createMenu(): void {
    this.menu.restaurantId = this.restaurantId ?? undefined;
    this.menuService.createMenu(this.menu, this.imageFile)
      .pipe(
        map(response => {
          this.router.navigate([`/dashboard/restaurants/${this.restaurantId}/menus`]);
        }),
        catchError(error => {
          console.error('Error creating menu:', error);
          return [];
        })
      ).subscribe();
  }
}
