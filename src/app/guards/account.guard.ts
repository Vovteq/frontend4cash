import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild} from '@angular/router';
import { Observable } from 'rxjs';
import LocalUser from "../../scripts/ts/utils/LocalUser";
import {Delegate} from "../../scripts/ts/delegates/Delegate";

@Injectable({
  providedIn: 'root'
})
export class AccountGuard implements CanActivate, CanActivateChild {
  public static onRouteResolved: Delegate<[ActivatedRouteSnapshot, boolean]> = new Delegate<[ActivatedRouteSnapshot, boolean]>();

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const result = LocalUser.loggedIn();
    return true;
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
