import { Recipe } from "../../models/recipe.model";
import { Ingredient } from "../../models/ingredient.model";

import * as RecipeActions from './recipe.actions';

// Similar to store/app.reducers where you name this whole reducer as recipes
export interface FeatureState{
  recipes: State
}

export interface State {
  recipes: Recipe[];
}

const initialState : State = {
  recipes: [
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

  ]
}

export function recipeReducers (state = initialState, action: RecipeActions.RecipeActionsType){
  switch(action.type){
    case(RecipeActions.SET_RECIPES):
      return{
        ...state,
        recipes: [...action.payload.recipes]
      }

    case(RecipeActions.ADD_RECIPE):
      return{
        ...state,
        recipes: [...state.recipes, action.payload.recipe]
      }
    
    case(RecipeActions.UPDATE_RECIPE): 
      const copyCurrentReciep = [...state.recipes];
      copyCurrentReciep[action.payload.index] = action.payload.newRecipe;

      return{
        ...state,
        recipes: copyCurrentReciep
      }
    
    case(RecipeActions.DELETE_RECIPE):
      const deletedRecipe = [...state.recipes];
      deletedRecipe.splice(action.payload.index, 1);

      return{
        ...state,
        recipes: deletedRecipe
      }

    default:
      return state;
  }
  
}