// Store.js
import { createStore, applyMiddleware } from 'redux';
// this allows us to create our store, and add in any middleware

// this will allow our browser to be connected to redux.
// composeWithDevToolsDevelopmentOnly
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
// import thunk
import thunk from 'redux-thunk';
// rootReducer
import rootReducer from './reducers/rootReducer';
// create our initial state
const initialState = {};
// create our middleware array
const middleware = [thunk];

// Createstore
// take 3 parameters.
// A reducer, the intitalSate, enhancers

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevToolsDevelopmentOnly(applyMiddleware(...middleware))
);

export default store;
