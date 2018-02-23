import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';


import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';

@Injectable()
export class RecipesService {

  //recipeSelected = new EventEmitter<Recipe>();

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[]=[
    new Recipe(
      'A Test Recipe',
      'This is simply a test', 'https://static.pexels.com/photos/691114/pexels-photo-691114.jpeg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('Cheese', 3),
        new Ingredient('Tomatos', 11)
      ]),

    new Recipe(
      'Recipe2',
      'This is hardly a test2', 'http://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1506120378/MR_0917170472.jpg?itok=KPTNrvis',
      [
        new Ingredient('Broccoli', 4),
        new Ingredient('Carrots', 2),
        new Ingredient('Potato', 2)
      ])

  ];

  constructor() { }

  // return this.recipes;  this will return a direct reference of recipes array.  This means if we change something on this array we will change it directly to the recipes array service.
  // So here we will attach .slice without any argu which will then return an exact copy of the recipes array.  This way outside will not be able to change it.
  getRecipes(){
    return this.recipes.slice();  // we only get a copy
  }

  getRecipe(id: number){
    return this.recipes[id];
  }

  loadRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
    console.log(recipes);
  }

 

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
