import  { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './reducer_auth';
import gifsReducer from './reducer_gifs';
import modalReducer from './reducer_modal';

import { SIGN_OUT } from '../actions';

const appReducer = combineReducers ({
    form : formReducer,
    auth: authReducer,
    gifs : gifsReducer,
    modal : modalReducer
});

const rootReducer = (state, action) => {
  if (action.type === SIGN_OUT){
      state = undefined;
  }
  return appReducer (state, action);
}

export default rootReducer;
