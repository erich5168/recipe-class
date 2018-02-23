import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

import { AuthGuard } from './auth/auth-guard.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  page:string = 'recipes';

  constructor(private authGuard: AuthGuard){}

  ngOnInit(){
    firebase.initializeApp({
      apiKey: "AIzaSyAyXH88inCfZ3wVyrbUILjOD-SNAWqH1q4",
      authDomain: "ng-recipe-book-15edd.firebaseapp.com"
    });

    this.authGuard.accessPage.subscribe(
      (access: boolean) => {
        console.log(access);
      }
    )
  }


  pageSelected(event){
    console.log(event);
    this.page = event;
  }
}
