/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
  GET_AVAILABILITIES_FOR_STUDENT,
  EDIT_AVAILABILITIES,
  GET_TIMESLOTS,
} from '../actions/types';

const initialState = {
  availabilities: [],
  timeslots: [],
  loading: true,
  errors: {},
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_AVAILABILITIES_FOR_STUDENT:
      return {
        ...state,
        availabilities: action.payload,
        // return the current state plus the new contacts array.
        loading: false,
      };
    case EDIT_AVAILABILITIES:
      return {
        ...state,
        loading: false,
      };
    case GET_TIMESLOTS:
      return {
        ...state,
        timeslots: action.payload,
        // return the current state plus the new contacts array.
        loading: false,
      };

    default:
      return state;
  }
}
