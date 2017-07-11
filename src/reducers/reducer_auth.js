import { AUTH_USER, AUTH_ERROR, SIGN_OUT } from '../actions';

const initialState = {
  authenticated: false
}

export default function (state = initialState, action){

  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null
       };

   case AUTH_ERROR:
       return {...state,
         error: action.payload.message
        };

    case SIGN_OUT:
       return {
         ...state,
         authenticated: false,
         error: null
       };

    default:
      return state;
  }

}
