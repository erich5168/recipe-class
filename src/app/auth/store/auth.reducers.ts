import * as AuthActions from "./auth.actions";

export interface State{
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false
}

export function authReducers(state = initialState, action: AuthActions.AuthActionsType){
  switch(action.type){

    case (AuthActions.SINGUP): // Both SIGNUP & SINGIN will return the same 
    case (AuthActions.SINGIN):
      return{
        ...state,
        authenticated: true
      };

    case (AuthActions.LOGOUT):
      return{
        ...state,
        token: null,
        authenticated: false
      };
    
      case (AuthActions.SET_TOKEN):
      return{
        ...state,
        token: action.payload.token
      };

    default:
      return state;

  }
}