import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import * as fromApp from "../store/app.reducers";
import * as AuthActions from "./store/auth.actions";


// Methods we will have to sign in user call to create users
@Injectable()
export class AuthService {
  token: string;

  constructor(
              private router: Router,
              private store: Store<fromApp.AppState>
              ) { }

  singupUser(email: string, password: string){
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (data) => {
          console.log(data);
          this.store.dispatch(new AuthActions.Signup());

          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                //this.token = token;
                this.store.dispatch(new AuthActions.SetToken({token: token}));
                this.router.navigate(['/']);
              }
            );


        })
      .catch((error) => console.log(error));
  }

  signinUser(email: string, password: string){

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        data => {
          this.store.dispatch(new AuthActions.Signin());

          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => {
                //this.token = token;
                this.store.dispatch(new AuthActions.SetToken({token: token}));
                this.router.navigate(['/']);
              }
            );
        }
      )
      .catch(error => console.log(error));
  }

  getToken(){
    firebase.auth().currentUser.getIdToken()
      .then(
        (token: string) => this.token = token
      );

    return this.token;
  }

  isAuthenticated(){
    return this.token != null;
  }

  logout(){
    firebase.auth().signOut();
    // this.token = null;
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/']);
  }

}
