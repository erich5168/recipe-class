import * as ShoppingListActions from './shopping-list.actions';
import { Ingredient } from '../../models/ingredient.model';




export interface State{
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apple', 5),
    new Ingredient('Tomators', 2),
    new Ingredient('Orange', 6)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
}

/**
 * 
 * @param state 
 * @param action get a default value of initialState.  If the stat is not present set = initialState
 */
export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActionType){
  switch(action.type){

    case ShoppingListActions.ADD_INGREDIENT:
      return {
        // [...] Spread operator -  simply expanding the state object. So that all the properties of the old stat is added to new object about to be returned...
        ...state,
        // replace one of the properties.  The ingredients properties.
        // in side of ingredients array [...old array, ...new array] with spread operator it concatenate the arrays
        ingredients: [...state.ingredients, action.payload]
      };

    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    
    case ShoppingListActions.UPDATE_INGREDIENT:
      const copyUpdateIngredients = [...state.ingredients];
      copyUpdateIngredients[state.editedIngredientIndex] = action.payload;
      
      return{
        ...state,
        ingredients: copyUpdateIngredients
      };
      
    case ShoppingListActions.DELETE_INGREDIENT:
      
      const afterDeleteIngreidents = [...state.ingredients];
      afterDeleteIngreidents.splice(state.editedIngredientIndex, 1);

      return{
        ...state,
        ingredients: afterDeleteIngreidents
      };
    
    case ShoppingListActions.START_EDIT:
      
      // spread operator here is to make sure its immutable
      const editedIngredient = {...state.ingredients[action.payload]};

      return{
        ...state,
        editedIngredient: editedIngredient,
        editedIngredientIndex: action.payload
      }

    case ShoppingListActions.STOP_EDIT:
      return{
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      }

    default:
      return state;
    
  }
}