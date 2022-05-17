/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
  GET_GROUPS,
  GET_GROUP,
  GET_GROUP_ADMIN,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  GROUP_DEL_ERROR,
} from '../actions/types';

const initialState = {
  groups: {},
  group: {},
  loading: true,
  errors: {},
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        // return the current state plus the new contacts array.
        loading: false,
      };
    case GET_GROUP:
      return {};
    case GET_GROUP_ADMIN:
      return {
        ...state,
        group: action.payload,
        loading: false,
      };
    case ADD_GROUP:
      return {};
    case UPDATE_GROUP:
      return {};
    case DELETE_GROUP:
      return {};
    case GROUP_DEL_ERROR:
      return {};
    default:
      return state;
  }
}
