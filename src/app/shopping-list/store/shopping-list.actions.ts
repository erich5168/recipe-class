import { Action } from '@ngrx/store';
import { Ingredient } from '../../models/ingredient.model';

// 1. Define unique identifier for action
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';


// 2. Define class: take unique identifier and assign to class readonly type.  And make sure this class has a payload (object to replace original state)
export class AddIngredient implements Action{
  // Since class implements Action.  Required to provide readonly type
  readonly type = ADD_INGREDIENT;
  
  constructor(public payload: Ingredient){}
  
}

export class AddIngredients implements Action{
  readonly type = ADD_INGREDIENTS;
  
  constructor(public payload: Ingredient[]){}
}

export class UpdateIngredient implements Action{
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient){}
}

export class DeleteIngredient implements Action{
  readonly type = DELETE_INGREDIENT;

}

export class StartEdit implements Action{
  readonly type = START_EDIT;

  constructor(public payload:number){}
}

export class StopEdit implements Action{
  readonly type = STOP_EDIT;
}

// 3. Boundle all types in to ShoppingListActionType
// | union type operator
export type ShoppingListActionType = 
  AddIngredient | 
  AddIngredients | 
  UpdateIngredient | 
  DeleteIngredient |
  StartEdit |
  StopEdit;
