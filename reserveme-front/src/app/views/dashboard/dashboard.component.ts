import { Component } from '@angular/core';
import { Menu } from 'src/app/models/menu.model';

@Component({
  selector: 'app-dashboard',
  template: `
            <div class="app-layout">
              <app-sidebar></app-sidebar>
              <router-outlet></router-outlet>
            </div>
            `
})
export class DashboardComponent {

  sidebarVisible = false;
  menus: Menu[] = [];

  constructor() { }

  toggleSidebar(): void {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
