/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import { GET_STUDENT_INFO, GET_STUDENTS, ADD_STUDENT } from '../actions/types';

const initialState = {
  students: [],
  student: {},
  loading: true,
  errors: {},
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case GET_STUDENT_INFO:
      return {
        ...state,
        student: action.payload,
        // return the current state plus the new contacts array.
        loading: false,
      };
    case GET_STUDENTS:
      return {
        ...state,
        students: action.payload,
        loading: false,
      };
    case ADD_STUDENT:
      return {
        ...state,
        students: [action.payload, ...state.students],
        loading: false,
      };

    default:
      return state;
  }
}
