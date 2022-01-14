import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_KEY: string = 'AIzaSyDxJulQo00KgIpGIuD6VOqwYQUUFnrMgMA';

  constructor(private httpClient: HttpClient) { }

  signUp(email: string, password: string) {
    this.httpClient.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[' + this.API_KEY + ']',
      {
        email: email,
        password: password,
        returnSecureToken: true
      });
  }
}
