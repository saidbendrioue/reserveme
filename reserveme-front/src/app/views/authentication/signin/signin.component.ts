import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from 'src/app/models/auth/authentication-request.model';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  authenticationRequest: AuthenticationRequest = { email: "", password: "" };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    localStorage.clear();
  }

  signin() {
    this.authenticationService.signin(this.authenticationRequest)
      .pipe(
        map(response => {
          localStorage.setItem('access_token', response?.token);
          localStorage.setItem('current_user', JSON.stringify(response?.user));

          this.router.navigate(['/dashboard/restaurants']);
        }),
        catchError(error => {
          return [];
        })
      )
      .subscribe();
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }
}
