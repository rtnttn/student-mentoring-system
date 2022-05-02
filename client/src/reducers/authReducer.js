/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../actions/types';

const intialState = {
  // token: localStorage.getItem('token'),
  // isAuthenticated: false,
  loading: true,
  user: null,
};

export default function authReducer(state = intialState, action) {
  switch (action.type) {
    // case USER_LOADED:
    //   return{
    //     ...state,
    //     isAuthenticated: true,
    //     loading: false,
    //     user: action.payload
    //   }
    case REGISTER_SUCCESS:
      return state;
    // case LOGIN_SUCCESS:
    //   localStorage.setItem('token', action.payload.token);
    //   return {
    //     ...state,
    //     ...action.payload,
    //     isAuthenticated: true,
    //     loading: false
    //   };
    case REGISTER_FAIL:
      return state;
    // case AUTH_ERROR:
    // case LOGIN_FAIL:
    // case LOGOUT:
    //   localStorage.removeItem('token');
    //   return {
    //     ...state,
    //     token: null,
    //     isAuthenticated: false,
    //     loading: false,
    //     user: null
    //   };
    // case ACCOUNT_DELETED:
    //   localStorage.removeItem('token');
    //   return {
    //     ...state,
    //     token: null,
    //     isAuthenticated: false,
    //     loading: false,
    //     user: null
    //   };
    default:
      return state;
  }
}
