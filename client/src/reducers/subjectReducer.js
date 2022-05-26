/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */

import { GET_SUBJECTS, ADD_SUBJECT, DELETE_SUBJECT, SUBJECT_DEL_ERROR } from '../actions/types';

const initialState = {
  subjects: [],
  loading: true,
  errors: {},
};

export default function subjectReducer(state = initialState, action) {
  switch (action.type) {
    case GET_SUBJECTS:
      return {
        ...state,
        subjects: action.payload,
        // return the current state plus the new contacts array.
        loading: false,
      };
    case ADD_SUBJECT:
      return {
        ...state,
        subjects: [action.payload, ...state.subjects],
        loading: false,
      };
    case DELETE_SUBJECT:
      return {
        ...state,
        subjects: state.subjects.filter(
          (subject) => subject.subjectId !== action.payload.subjectId
        ),
      };
    case SUBJECT_DEL_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

