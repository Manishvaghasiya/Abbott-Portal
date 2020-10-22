import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | import('@angular/router').UrlTree |
    import('rxjs').Observable<boolean | import('@angular/router').UrlTree> |
    Promise<boolean | import('@angular/router').UrlTree> {
    const token = this.authService.getAuthToken();
    if (token != null) {
      // logged in so return true
      return true;
    } else {
      // not logged in so redirect to login page with the return url
      this.authService.logout(false);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
