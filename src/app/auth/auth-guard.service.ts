import { Injectable, EventEmitter } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

// 
@Injectable()
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild{


  constructor(private store: Store<fromApp.AppState>){}

  accessPage = new EventEmitter<boolean>();

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // this.accessPage.emit(this.authService.isAuthenticated());
    // return this.authService.isAuthenticated();
    return this.store.select('auth')
      .take(1)
      .map(
        (authState: fromAuth.State) => {
          this.accessPage.emit(authState.authenticated);
          return authState.authenticated;
        }
      );
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    
    return this.store.select('auth')
      .take(1)
      .map(
        (authState: fromAuth.State) => {
          this.accessPage.emit(authState.authenticated);
          return authState.authenticated;
        }
      );
  }

  // [ Recipe ] Prevent Feature Module to be loaded without logged in
  canLoad(route: Route){
    return this.store.select('auth')
    .take(1)
      .map(
        (authState: fromAuth.State) => {
          this.accessPage.emit(authState.authenticated);
          return authState.authenticated;
        }
      );
  }

}
