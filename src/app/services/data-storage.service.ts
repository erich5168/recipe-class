import { Injectable } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import 'rxjs/Rx';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../models/recipe.model';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';



@Injectable()
export class DataStorageService {

  apiUrl = 'https://ng-recipe-book-15edd.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient,
              private recipesService: RecipesService,
              private store: Store<fromApp.AppState>
            ) { }

  storeData(){
    // This is not needed here because of auth.interceptor.  It appends token to every http request
    // const token = this.authService.getToken();
    
    // const apiUrlWithAuth = this.apiUrl + '?auth=' + token;
    //
    // return this.httpClient.put(this.apiUrl, this.recipesService.getRecipes(), {
    //   observe: 'body', // body :: default || events :: helps you track
    //   //headers: new HttpHeaders().set('Authorization', 'adsfasdfasdfasdf').append()
    //   params: new HttpParams().set('auth', token)
    // });

    // Track Progress
    const req = new HttpRequest('PUT', this.apiUrl, this.recipesService.getRecipes(), {
      reportProgress: true,
      // implement HttpInterceptor
      // params: new HttpParams().set('auth', token)
    });

    return this.httpClient.request(req);

  }

  // This provides prgoress... and HttpEventType
  getDataLong(){
    const req = new HttpRequest('GET', this.apiUrl, {
      reportProgress: true,
    });

    return this.httpClient.request(req)
      .map(
        (response) => {
          if(response instanceof HttpResponse){

            for(let recipe of response.body as Array<Recipe>){
              if(!recipe['ingredients']){
                recipe['ingredients'] = [];
              }
            }
            return response;
          }
        }
      );

  }

  getData(){
    // This is not needed here because of auth.interceptor.  It appends token to every http request
    // const token = this.authService.getToken();
    // const apiUrlWithAuth = this.apiUrl + '?auth=' + token;

    const recipes: Recipe[] = [];

    // return this.httpClient.get<Recipe[]>(apiUrlWithAuth)
    return this.httpClient.get<Recipe[]>(this.apiUrl, {
      observe: 'body', // response:: return back an response object with httpResponse {body, header}
      responseType: 'json' // text:: string || blob:: use ful download file ||  arrayBuffer if you want buffer

      // implement HttpInterceptor
      // params: new HttpParams().set('auth', token)
    })
      .map(
        (recipes) => {
          // Instructors way
          // const recipes: Recipe[] = response.json();
            //--> The default of HttpClient automatically returns response body and it automatically return json object so you no longer needs response.json()

          // This my way of ensure returning a Recipe Object
          // const returnDatas = response.json();
          // for(const data of returnDatas){
          //   const recipe = new Recipe(data.name, data.description, data.imagePath, data.ingredients);
          //
          //   recipes.push(recipe);
          // }


          for(let recipe of recipes){
            if(!recipe['ingredients']){
              recipe['ingredients'] = [];
            }
          }
          // console.log(recipes);
          return recipes;
      })
      .catch(
        (error: Response) => {
          const data = error.json()
          return Observable.throw('Some error occured' + data);
        }
      )
      // .subscribe(
      //   (recipes: Recipe[]) => {
      //     this.recipesService.loadRecipes(recipes);
      //   }
      // );

  }

}
