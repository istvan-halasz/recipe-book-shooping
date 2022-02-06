import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthResponseData } from "../auth.service";

import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.httpClient.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(map(responseData => {
        const expirationDate = new Date(new Date().getTime() + +responseData.expiresIn * 1000);
        return new AuthActions.Login({
          email: responseData.email,
          userId: responseData.localId,
          expirationDate: expirationDate,
          token: responseData.idToken
        });
      }),
        catchError(error => {
          return of(new AuthActions.LoginFail('Something went wrong!'));
        }));
    }),
  );

  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(ofType(AuthActions.LOGIN), tap(() => {
    this.router.navigate(['/']);

  }));


  constructor(private actions$: Actions, private httpClient: HttpClient, private router: Router) {
  }
}
