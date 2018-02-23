import { ActionReducerMap } from "@ngrx/store";

import * as fromShoppingList from "../shopping-list/store/shopping-list.reducers";
import * as fromAuth from "../auth/store/auth.reducers";


// Simply export global application reducers. Export a state which bundle other small applications state

export interface AppState{
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State

}

export const reducers: ActionReducerMap<AppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducers
  
}