/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
    GET_SUBJECTS,
    GET_SUBJECT,
    ADD_SUBJECT,
  } from '../actions/types';
  
  const initialState = {
    subjects: {},
    subject: {},
    loading: true,
    errors: {},
  };
  
  export default function subjectReducer(state = initialState, action) {
    switch (action.type) {
      case GET_SUBJECTS:
        return {
          ...state,
          subjects: action.payload,
          // return the current state plus the new subject array.
          loading: false,
        };
      case GET_SUBJECT:
        return {
          ...state,
            subject: action.payload,
            loading: false
        };
      case ADD_SUBJECT:
        return {
          ...state,
          subject: action.payload,
          loading: false
        };
      default:
        return state;
    }
  }
  