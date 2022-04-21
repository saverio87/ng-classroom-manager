import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { AuthService } from "src/app/services/auth.service";
import { switchMap, map, catchError } from 'rxjs/operators';
import { 
  login,
  loginSuccess,
  loginFailure
} from './auth.actions';



@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}


// actions$ listens for actions being dispatched in the app,
  // ofType() narrows it down to the desired action we want to
  // listen for
  login$ = createEffect(
    ()=> this.actions$.pipe(
      ofType(login),
      switchMap((action)=> 
      from (this.authService.login(action.email, action.password)).pipe(
        map((res)=> 
        loginSuccess({
          _id: res.body._id,
          tokens: {
            xAccessToken: res.headers.get('x-access-token'),
            xRefreshToken: res.headers.get('x-refresh-token')
          }
          })
        ),
        catchError((error) => of(loginFailure({ error })))
      ))
    )
  )







        }