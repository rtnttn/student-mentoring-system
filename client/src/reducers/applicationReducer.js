/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
  GET_APPLICATIONS,
  GET_APPLICATION,
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  DELETE_APPLICATION,
  APPLICATION_DEL_ERROR,
} from '../actions/types';

const initialState = {
  applications: {},
  application: {},
  loading: true,
  errors: {},
};

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        // return the current state plus the new contacts array.
        loading: false,
      };
    case GET_APPLICATION:
      return {};
    case ADD_APPLICATION:
      return {};
    case UPDATE_APPLICATION:
      return {};
    case DELETE_APPLICATION:
      return {};
    case APPLICATION_DEL_ERROR:
      return {};
    default:
      return state;
  }
}