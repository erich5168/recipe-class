import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { Response } from '@angular/http';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Recipe } from '../../models/recipe.model';
import { DataStorageService } from '../../services/data-storage.service';
 // import { AuthService } from '../../auth/auth.service';
import { RecipesService } from '../../recipes/recipes.service';

import * as fromApp from "../../store/app.reducers";
import * as fromAuth from "../../auth/store/auth.reducers";
import * as AuthActions from "../../auth/store/auth.actions";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  authState: Observable<fromAuth.State>;

  constructor(private dataStorageService: DataStorageService,
              private recipesService: RecipesService,
              // private authService: AuthService,
              private store: Store<fromApp.AppState>
            ) { }

  ngOnInit() {
    // Give use auth reducers state
    this.authState = this.store.select('auth'); 
  }

  // onSelect(component:string){
  //   this.compSelected.emit(component);
  // }

  onSave(){
    // Old http response
    // this.dataStorageService.storeData()
    //   .subscribe(
    //     (response: Response) => {
    //       console.log(response);
    //     });
    this.dataStorageService.storeData()
      .subscribe(
          (response) => {
            console.log(response);

            if(response.type === HttpEventType.UploadProgress){
              console.log('Upload in progress');
              console.log('Progress: ' + response.loaded / response.total * 100 + '%');
            }else if(response.type === HttpEventType.DownloadProgress){
              console.log('Download in progress');
            }else{
              console.log('No progress', response.type);
            }


          // A method that allows you to tap in to seeing the events types.
          //
          // enum HttpEventType{
          //  Sent  :: 0
          //  UploadProgress :: 1
          //  ResponseHeader :: 2
          //  DownloadProgress :: 3
          //  Response :: 4
          //  User :: 5
          // }
            // (response: HttpEvent<Object>) => {
            // console.log(response.type === HttpEventType.Sent);
          // 1st event is true because it is a sent events
          // 2nd event is the return event =>  false


        });

  }

  onGet(){
    this.dataStorageService.getDataLong()
      .subscribe(
        (response) => {
          console.log(response);

          // getDataLong() use the following
          if(response instanceof HttpResponse){
            console.log(response.body as Array<Recipe>);
            const recipes: Recipe[] = response.body as Array<Recipe>;

            this.recipesService.loadRecipes(recipes);
          }
          
        }
      );

    // httpClient.get<Recipe[]>()  automatically response as JSON object cast with Recipe[]
    // this.dataStorageService.getData()
    //   .subscribe(
    //     (response) => {
    //       console.log(response);
    //       this.recipesService.loadRecipes(response);
    //     }
    //   );
  }

  onLogout(){
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());
  }

  // isAuthenticated(){
  //   return this.authService.isAuthenticated();
  // }

}
