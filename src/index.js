import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { verifyAuth } from './actions';
import reduxThunk from 'redux-thunk';
import rootReducer from './reducers';

import App from './components/app';

const createStoreWithMiddleware = applyMiddleware (reduxThunk)(createStore);
const store = createStoreWithMiddleware(rootReducer);
store.dispatch(verifyAuth());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'));
