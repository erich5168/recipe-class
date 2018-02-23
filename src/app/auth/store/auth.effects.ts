import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap'; // On each emission the previous inner observable (the result of the function you supplied) is cancelled and the new observable is subscribed.
import 'rxjs/add/operator/mergeMap'; 
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise'; // Converts promise to an observable

import * as AuthActions from './auth.actions';

// This gives us a way to handle side effects mainly async tasks very easy...
@Injectable()
export class AuthEffects {

  /** 
   * This property is marked with @Effect() which is controled by @ngrx/effects 
   * actions$ is like an observable and is provided by @ngrx/effects it has a helper
   * method ofType() which allows us to check the type of action that is occuring.
   * 
   * We only handle side effects ( async operations ).  We do stuff depend on 
   * the action being dispatched but we don't change store 
   * 
   * --**-- At the end of @Effect chain.. you tipically dispatch a new effect.
   *        if you don't dispatch a new effect you can do the following
   * 
   *        @Effect({dispatch: false})
   */

  @Effect()
  authSignup = this.actions$
    .ofType(AuthActions.TRY_SIGNUP) // we are listing to this action type
    .map(
      (action: AuthActions.TrySignup) => {
        return action.payload;  // only interested in the payload: {username, password}
      }
    )
    .switchMap( 
      ( authData: {username: string, password:string} ) => {
        // turn friebase promise in to observable because @Effect expects an observable
        return fromPromise(
          firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password)
          // as soon as firebase return without an error.  
          // I will need to change the state user to singein and set the token
        );
      }
    )
    .switchMap(
      () => {
        return fromPromise(
          firebase.auth().currentUser.getIdToken()
        );
      }
    )
    .mergeMap(
      (token: string) => {

        this.router.navigate(['/']);

        // Use map() operator if you are only action you want to emit
        // mergeMap return two observable in to one / put two effects I want to dispatch in to one observable.
        // Emit two new actions
        return [
          {
            type: AuthActions.SINGUP
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: {
              token: token
            }
          }
        ]
      }
    ); 

  @Effect()
  authSignin = this.actions$
    .ofType(AuthActions.TRY_SIGNIN)
    .map(
      (action: AuthActions.TrySignin) => {
        return action.payload;
      }
    )
    .switchMap(
     ( authData: {username: string, password: string} ) => {
        return fromPromise(
          firebase.auth().signInWithEmailAndPassword(authData.username, authData.password)
        );
     }
    )
    .switchMap(
      () => {
        return fromPromise(
          firebase.auth().currentUser.getIdToken()
        )
      }
    )
    .mergeMap(
      (token:string) => {
        this.router.navigate(['/']);

        return [
          {
            type: AuthActions.SINGIN
          },
          {
            type: AuthActions.SET_TOKEN,
            payload: {
              token: token
            }
          }
        ]
      }
    );

  @Effect({dispatch: false})
  authLogout = this.actions$
    .ofType(AuthActions.LOGOUT)
    .do(()=>{
      console.log('logout from effects');
      this.router.navigate(['/']);
    });
  
  /**
   * We can simply watch effects that is occuring
   * 
   * @param actions$ --  List of all the actions in our applications includ. [ auth, shoppingList ]
   */
  constructor(private actions$: Actions, private router: Router){
    console.log('Effect should be called');
  }

}