/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
    GET_STUDENT_INFO
  } from '../actions/types';
  
  const initialState = {
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
      default:
        return state;
    }
  }
  