import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';

import { GAuth2 } from './gauth.service';

@Injectable()
export class SettingGuard implements CanActivate, CanActivateChild {
  constructor(private authorization: GAuth2, private router: Router) {}

  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // console.log('AuthGuard#canActivate called', { state });
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  checkLogin (url: string): boolean {
    if (this.authorization.isAdminstrator()) { return true; }

    // Store the attempted URL for redirecting
    // this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/']);
    return false;
  }
}
