import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class SkipLoginGuard implements CanActivate {

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
    if (token !== null) {
      this.router.navigate(['/dashboard']);
      return false;
    } else {
      return true;
    }
  }
}
