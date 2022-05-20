/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
    GET_STUDENT_INFO,
  } from './types';
  // import axios
  import axios from 'axios';
    
  
  export const getStudentInfo = (id) => async (dispatch) => {
    // make a call to our api
    // endpoint: /api/contact/id
    const res = await axios.get(`/dash/student/${id}`);
    // dispatch our action and the payload to the reducer.
    dispatch({
      type: GET_STUDENT_INFO,
      payload: res.data,
    });
  };
  