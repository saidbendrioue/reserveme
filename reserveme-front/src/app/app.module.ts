import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthenticationModule } from './views/authentication/authentication.module';
import { CreateMenuItemComponent } from './views/dashboard/menu-item/menu-item-form/menu-item-form.component';
import { CreateMenuComponent } from './views/dashboard/menu/menu-form/menu-form.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { HeaderComponent } from './views/dashboard/layout/header.component';
import { SidebarComponent } from './views/dashboard/layout/sidebar.component';
import { MenuListComponent } from './views/dashboard/menu/menu-list/menu-list.component';
import { SharedModule } from './shared.module';
import { MessageService } from 'primeng/api';
import { RestaurantFormComponent } from './views/dashboard/restaurant/restaurant-form/restaurant-form.component';
import { RestaurantListComponent } from './views/dashboard/restaurant/restaurant-list/restaurant-list.component';
import { MenuItemListComponent } from './views/dashboard/menu-item/menu-item-list/menu-item-list.component';
import { MenuChartComponent } from './views/menu-chart/menu-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CreateMenuComponent,
    MenuListComponent,
    CreateMenuItemComponent,
    MenuItemListComponent,
    RestaurantListComponent,
    RestaurantFormComponent,
    MenuChartComponent,
  ],
  imports: [
    SharedModule,
    AuthenticationModule,
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
