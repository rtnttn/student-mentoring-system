/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger, no-console */
import {
    GET_SUBJECTS,
    GET_SUBJECT,
    ADD_SUBJECT,
  } from './types';
  // import axios
  import axios from 'axios';
  
  // Get all subject
  export const getsubjects = () => async (dispatch) => {
    // console.log('getsubjects');
    // the call to the api.
    // This will get all our subjects from the endpoint
    const res = await axios.get('/subjects/all');
    // Dispatch the action and payload to the reducer to update the state.
    // console.log(res.data);
    dispatch({
      type: GET_SUBJECTS,
      payload: res.data,
    });
  };
  
  // Get a subject
  export const getSubject = (id) => async (dispatch) => {
    console.log('getsubject');
    // the call to the api.
    // This will get all our subjectsfrom the endpoint
    const res = await axios.get(`/subjects/id/${id}`);
    // Dispatch the action and payload to the reducer to update the state.
    // console.log(res.data);
    dispatch({
        type: GET_SUBJECTS,
        payload: res.data,
      });
  };

  
  // Add Subject
  export const addSubject = () => async (dispatch) => {
    console.log('addSubject');
    // the call to the api.
    // This will get all our subject from the endpoint
    const res = await axios.post('/subjects/add');
    // Dispatch the action and payload to the reducer to update the state.
    console.log(res.data);
    dispatch({
      type: ADD_SUBJECT,
      payload: res.data
        });
  };
  
