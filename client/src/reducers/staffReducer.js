/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import { GET_STAFF, ADD_STAFF } from '../actions/types';

const initialState = {
  staff: [],
  loading: true,
  errors: {},
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STAFF:
      return {
        ...state,
        staff: action.payload,
        loading: false,
      };
    case ADD_STAFF:
      return {
        ...state,
        staff: [action.payload, ...state.staff],
        loading: false,
      };

    default:
      return state;
  }
}
