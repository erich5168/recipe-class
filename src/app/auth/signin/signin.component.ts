import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

// import { AuthService } from '../auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor( // private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>
            ) { }

  ngOnInit() {
  }

  onSignin(form: NgForm){
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TrySignin({username: email, password: password}));

    // this.authService.signinUser(email, password);
    // We can create the redirect here but a better place would be in the auth service.  This will make the redirect avaliable throughout the app.
    //this.router.navigate(['/recipes']);
  }

}
