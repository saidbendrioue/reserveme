import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router) { }

  canActivate(): boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}