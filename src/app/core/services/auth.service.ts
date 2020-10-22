import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClientService } from '../interceptors/http-client.service';
import { ToastService } from './toast.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signInfoToken = 'sign-data-auth';
  jwtToken = 'auth-token';
  refreshTokens = 'refresh-token';
  authUserInfo = 'user-data';
  userInfo = 'user-data-auth';
  rememberUser = 'remember-user';

  constructor(
    private httpService: HttpClientService,
    private router: Router,
    private toastService: ToastService) { }

  getAccount() {
    return this.httpService.get(`api/account`);
  }

  getAuthToken() {
    return sessionStorage.getItem(this.jwtToken) || null;
  }

  setAuthToken(token: string) {
    sessionStorage.setItem(this.jwtToken, token);
  }

  setRefreshToken(refreshToken: string) {
    sessionStorage.setItem(this.refreshTokens, refreshToken);
  }

  getRefreshToken() {
    return sessionStorage.getItem(this.refreshTokens) || null;
  }

  destroyToken() {
    window.sessionStorage.removeItem(this.jwtToken);
  }

  getRememberUser() {
    return sessionStorage.getItem(this.rememberUser) || null;
  }

  refreshToken(): Observable<string> {
    /*
        The call that goes in here will use the existing refresh token to call
        a method on the oAuth server (usually called refreshToken) to get a new
        authorization token for the API calls.
    */
    return new Observable<string>();
    // return this.httpService
    //   .post(ApiConstants.refreshToken, { RefreshToken: this.getRefreshToken() }).pipe(
    //     catchError(error => throwError(error)),
    //     map((response: any) => {
    //       return response;
    //     }));
  }

  setUserInfo(userInfo: string) {
    sessionStorage.setItem(this.userInfo, userInfo);
  }

  getUserInfo() {
    return sessionStorage.getItem(this.userInfo);
  }

  logout(flag?: boolean) {
    if (flag) {
      this.toastService.showSuccess('Logout successfull');
    }
    sessionStorage.clear();
    this.router.navigate(['login']);
  }
}
