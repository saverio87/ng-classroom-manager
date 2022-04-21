import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import {shareReplay, tap} from 'rxjs/operators'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { currentAccessToken, currentRefreshToken } from '../state/auth/auth.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { resetAllStates } from '../state';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public xAccessToken$ = this.store.select(currentAccessToken);
  public xRefreshToken$ = this.store.select(currentRefreshToken);

  xAccessToken: string | undefined;
  xRefreshToken: string;



  constructor(private store: Store<AppState>, private router: Router, private webService:WebRequestService, private http: HttpClient) { }

  login(email: string, password: string):Observable<any> {
    return this.webService.login(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        
        // the auth tokens will be in the header of this response

        // this.setSession(res.body._id, res.headers.get('x-access-token') || '{}', res.headers.get('x-refresh-token') || '{}');
       
        
        console.log("LOGGED IN!", res);
      })
    )
  }

  signup(email: string, password: string) {
    return this.webService.signup(email, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response
        this.setSession(res.body._id, res.headers.get('x-access-token') || '{}', res.headers.get('x-refresh-token') || '{}');
        console.log("Successfully signed up and logged in");
      })
    )
  }

  logout() {
    this.removeSession();
    this.router.navigate(['/login']);
    this.store.dispatch(resetAllStates())
  }

  getAccessToken() {

    this.xAccessToken$.subscribe((data)=>{
      // For some reason the access token string is saved inside
      // an array
      this.xAccessToken = data
      
    })

    return this.xAccessToken;
  }

  setAccessToken() {

    // to do
  }

  // getRefreshToken() {
  //   return localStorage.getItem('x-refresh-token');
  // }

  // getUserId() {
  //   return localStorage.getItem('user-id');
  // }

  // setAccessToken(accessToken: any) {
  //   localStorage.setItem('x-access-token', accessToken)
  // }

  

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
    localStorage.removeItem('state');
  }

  // httpOptions: Object = {
  //   headers: {
  //     'x-refresh-token': this.getRefreshToken(),
  //     '_id': this.getUserId()
  //   },
  //   // responseType: 'text' as 'json',
  //   observe: 'response'
  // };

  //  getNewAccessToken() {
  //   return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, this.httpOptions).pipe(
  //     tap((res: any) => {
  //       this.setAccessToken(res.headers.get('x-access-token'));
  //     })
  //   )
  // }




}
