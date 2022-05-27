/* eslint-disable consistent-return */
/* eslint-disable default-param-last */
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  STUDENT_LOADED,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STUDENT_LOGOUT,
  STAFF_LOADED,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
  STAFF_LOGOUT,
  AUTH_ERROR,
} from '../actions/types';

const intialState = {
  token: localStorage.getItem('token'),
  isAuthStudent: false,
  isAuthStaff: false,
  loading: true,
  student: null,
  staff: null,
  errors: {},
};

export default function authReducer(state = intialState, action) {
  switch (action.type) {
    case STUDENT_LOADED:
      return {
        ...state,
        isAuthStudent: true,
        loading: false,
        student: action.payload,
      };
    case STAFF_LOADED:
      return {
        ...state,
        isAuthStaff: true,
        loading: false,
        staff: action.payload,
      };
    case REGISTER_SUCCESS:
      return state;
    case STUDENT_LOGIN_SUCCESS:
      localStorage.setItem('studentToken', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthStudent: true,
        loading: false,
      };
    case STAFF_LOGIN_SUCCESS:
      localStorage.setItem('staffToken', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthStaff: true,
        loading: false,
      };
    case REGISTER_FAIL:
      return state;
    case AUTH_ERROR:
      return state;
    case STUDENT_LOGIN_FAIL:
      return state;
    case STAFF_LOGIN_FAIL:
      return state;
    case STUDENT_LOGOUT:
      localStorage.removeItem('studentToken');
      return {
        ...state,
        token: null,
        isAuthStudent: false,
        loading: false,
        student: null,
      };
    case STAFF_LOGOUT:
      localStorage.removeItem('staffToken');
      return {
        ...state,
        token: null,
        isAuthStaff: false,
        loading: false,
        staff: null,
      };
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
