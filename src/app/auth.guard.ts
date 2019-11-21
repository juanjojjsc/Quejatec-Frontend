import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  //   ): boolean | Observable<boolean> |  Promise<boolean> {
  //     const isAuth = this.authService.getIsAuth();
  //     if (!isAuth) {
  //       //If user is not authenticated, bring him back to login
  //       this.router.navigate(['/login']);
  //     }
  //     return isAuth;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isAuth = this.authService.getIsAuth();
      if (!isAuth) {
        //If user is not authenticated, bring him back to login
        this.router.navigate(['/login']);
      }
      return isAuth;
    }

}
