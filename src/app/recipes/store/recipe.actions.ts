import { Action } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';


export const SET_RECIPES = 'SET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

export class SetRecipes implements Action{
  readonly type = SET_RECIPES;
  constructor( public payload: {recipes: Recipe[]} ){}
}

export class AddRecipe implements Action{
  readonly type = ADD_RECIPE;
  constructor( public payload: {recipe: Recipe} ){}
}

export class UpdateRecipe implements Action{
  readonly type = UPDATE_RECIPE;
  constructor( public payload: { index: number, newRecipe: Recipe } ){}
}

export class DeleteRecipe implements Action{
  readonly type = DELETE_RECIPE;
  constructor( public payload: { index: number } ){}
}

export type RecipeActionsType = SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe;