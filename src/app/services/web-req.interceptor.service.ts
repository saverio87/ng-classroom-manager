import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebReqInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  addAuthHeader(request:HttpRequest<any>) {
    // get the access token
    const token = this.authService.getAccessToken()
    // append the access token to the request header
    if (token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }

    return request
  }


  intercept(request: HttpRequest<any>, next: HttpHandler) {
    request = this.addAuthHeader(request)  

    // call next() and handle the response

    return next.handle(request).pipe(
      catchError((error:HttpErrorResponse) => {
        console.log(error);

        // If 401 error, redirect to login page

        if (error.status === 401) {
          this.authService.logout()
        }

        return throwError(error)
      })
    )
  }
}
