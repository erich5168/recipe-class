import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(// private authService: AuthService,
              private store:Store<fromApp.AppState>
              ) { }

  ngOnInit() {
  }

  onSignup(form: NgForm){
    console.log(form);
    const email = form.value.email;
    const password = form.value.password;
    // reach to firebase to get authentication
    console.log(email, password);
    // this.authService.singupUser(email, password);
    this.store.dispatch(new AuthActions.TrySignup({username: email, password: password}));
  }
}