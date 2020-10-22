import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse
} from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { filter, switchMap, catchError, finalize, take, tap } from 'rxjs/operators';

import { AuthService } from '../services';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  isRefreshingToken: boolean;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private authService: AuthService,
    private router: Router) {
    this.isRefreshingToken = false;
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
    } else {
      return req;
    }
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req, this.authService.getAuthToken())).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          return event;
        }
      }), catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          return this.handle400Error(err);
        } else {
          return throwError(err);
        }
      }));
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler, err: HttpErrorResponse) {
    const rememberUser = this.authService.getRememberUser();
    if (rememberUser === 'true') {

      if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;

        // Reset here so that the following requests wait until the token
        // comes back from the refreshToken call.
        this.tokenSubject.next(null);
        return this.authService.refreshToken()
          .pipe(switchMap((res: any) => {
            if (res.result.Token) {
              this.authService.setAuthToken(res.result.Token);
              this.authService.setRefreshToken(res.result.RefreshToken);
              this.tokenSubject.next(res.result.Token);
              return next.handle(this.addToken(req, res.result.Token));
            }

            // If we don't get a new token, we are in trouble so logout.
            return this.logoutUser('');
          }),
            catchError(error => {
              // If there is an exception calling 'refreshToken', bad news so logout.
              return this.logoutUser(error);
            }),
            finalize(() => {
              this.isRefreshingToken = false;
            }));
      } else {
        return this.tokenSubject
          .pipe(
            filter(token => token != null),
            take(1),
            switchMap(token => {
              return next.handle(this.addToken(req, token));
            })
          );
      }
    } else {
      return this.logoutUser(err);
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser(error);
    }
    // return Observable.throw(error);
    return throwError(error);
  }

  logoutUser(err: any) {
    this.authService.logout(true);
    this.router.navigate(['/login']);
    return throwError(err);
    // Route to the login page (implementation up to you)
    // return Observable.throw('');
  }
}
