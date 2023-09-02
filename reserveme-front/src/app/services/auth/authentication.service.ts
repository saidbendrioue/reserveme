import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ENDPOINT } from 'src/app/constants/api.constant';
import { AuthenticationRequest } from 'src/app/models/auth/authentication-request.model';
import { AuthenticationResponse } from 'src/app/models/auth/authentication-response.model';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signin(authenticationRequest: AuthenticationRequest): Observable<AuthenticationResponse> {
    const endpoint = `${API_ENDPOINT}/auth/signin`;
    return this.http.post<AuthenticationResponse>(endpoint, authenticationRequest);
  }

  signup(owner: User): Observable<AuthenticationResponse> {
    const endpoint = `${API_ENDPOINT}/auth/signup`;
    return this.http.post<AuthenticationResponse>(endpoint, owner);
  }
}
