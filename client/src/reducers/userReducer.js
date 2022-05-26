/* eslint-disable import/named */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  GET_USERS,
  GET_USER,
  GET_STUDENT_ADMIN,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_DEL_ERROR,
  USER_DEFAULT,
} from '../actions/types';

const initialState = {
  users: {},
  user: {},
  loading: true,
  errors: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        // return the current state plus the new contacts array.
        loading: false,
      };
    case GET_USER:
      return {};
    case GET_STUDENT_ADMIN:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case ADD_USER:
      return {};
    case UPDATE_USER:
      return {};
    case DELETE_USER:
      return {};
    case USER_DEL_ERROR:
      return {};
    case USER_DEFAULT:
      console.log('SET_LOADING REDUCER');
      return initialState;
    default:
      return state;
  }
}
