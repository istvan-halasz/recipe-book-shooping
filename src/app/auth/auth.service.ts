import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    return this.httpClient.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + this.API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }).pipe(catchError(errorResponse => {
        let errorMessage = 'An unkown error occurred!';
        if (!errorResponse.error || !errorResponse.error.error) {
          return throwError(errorMessage);
        }

        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
        }

        return throwError(errorMessage);
      }));
  }
}
