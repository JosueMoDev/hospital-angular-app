import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private renewToken: UserService,
    private router: Router
  ) { }
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    return this.renewToken.tokenValidation()
    .pipe(
      tap(isAutenticated => {
        if (!isAutenticated) {
          this.router.navigateByUrl('/login')
        }
      } )
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    return this.renewToken.tokenValidation()
      .pipe(
        tap(isAutenticated => {
          if (!isAutenticated) {
            this.router.navigateByUrl('/login')
          }
        } )
    );
  }

}
