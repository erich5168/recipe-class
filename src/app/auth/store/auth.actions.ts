import { Action } from "@ngrx/store";

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';

export const SINGUP = "SINGUP";
export const SINGIN = 'SINGIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TrySignup implements Action {
  
  readonly type = TRY_SIGNUP;
  
  constructor(public payload: {username: string, password: string}){
    console.log('TRY_SIGNUP was called');
  }
}

export class TrySignin implements Action {
  
  readonly type = TRY_SIGNIN;
  
  constructor(public payload: {username: string, password: string}){
    console.log('TRY_SIGNUP was called');
  }
}

export class Signup implements Action{
  readonly type = SINGUP;

}

export class Signin implements Action{
  readonly type = SINGIN;

}

export class Logout implements Action{
  readonly type = LOGOUT;
}

export class SetToken implements Action{
  readonly type = SET_TOKEN;
  // constructor(public payload: string) <-- you could do it this way
  
  // but I find to always pass object makes it clearer in the code what is being passed
  // accessing the payload will look like [ action.payload.token ]
  constructor(public payload: { token:string }){}
}

export type AuthActionsType = Signup | Signin | Logout | SetToken | TrySignup | TrySignin;