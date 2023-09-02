import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  user: User = { email: '', firstName: '', lastName: '', password: '', role: 'USER' };

  confirmPassword: string = '';

  signupResponse$: any;
  signupError$: any;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  signup() {
    if (this.user.password !== this.confirmPassword) {
      alert("password missmatch")
      return;
    }

    this.authenticationService.signup(this.user)
      .pipe(
        map(response => {
          this.router.navigate(['/signin']);
        }),
        catchError(error => {
          return [];
        })
      )
      .subscribe();
  }

}
