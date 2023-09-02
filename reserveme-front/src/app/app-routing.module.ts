import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth/auth.guard';
import { SigninComponent } from './views/authentication/signin/signin.component';
import { SignupComponent } from './views/authentication/signup/signup.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CreateMenuComponent } from './views/dashboard/menu/menu-form/menu-form.component';
import { MenuListComponent } from './views/dashboard/menu/menu-list/menu-list.component';
import { CreateMenuItemComponent } from './views/dashboard/menu-item/menu-item-form/menu-item-form.component';
import { RestaurantListComponent } from './views/dashboard/restaurant/restaurant-list/restaurant-list.component';
import { RestaurantFormComponent } from './views/dashboard/restaurant/restaurant-form/restaurant-form.component';
import { MenuItemListComponent } from './views/dashboard/menu-item/menu-item-list/menu-item-list.component';
import { MenuChartComponent } from './views/menu-chart/menu-chart.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'menu-chart/:id', component: MenuChartComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'restaurants', component: RestaurantListComponent },
      { path: 'restaurants/create', component: RestaurantFormComponent },
      { path: 'restaurants/:restaurantId/menus', component: MenuListComponent },
      { path: 'restaurants/:restaurantId/menus/create', component: CreateMenuComponent },
      { path: 'restaurants/:restaurantId/menus/:menuId', component: MenuItemListComponent },
      { path: 'restaurants/:restaurantId/menus/:menuId/create-menu-item', component: CreateMenuItemComponent }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
