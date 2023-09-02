import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-sidebar',
  template: `
    <p-sidebar [visible]="visible" [position]="'left'" (onHide)="visible = false">
      <ul class="app-menu">
          <li><a routerLink="/dashboard">Dashboard</a></li>
          <li><a routerLink="/menu">Menu</a></li>
      </ul>
  </p-sidebar>
  `
})
export class SidebarComponent {

  visible: boolean = false;
  private subscription: Subscription;

  constructor(private dataService: DataService) {
    this.subscription = this.dataService.sideBarVisible.subscribe(visibility => {
      this.visible = visibility;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
