/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import { GET_SUBJECTS, ADD_SUBJECT, DELETE_SUBJECT, SUBJECT_DEL_ERROR } from './types';
// import axios
import axios from 'axios';

// Get all contacts
export const getSubjects = () => async (dispatch) => {
  // console.log('getUsers');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get('/subjects/all');
  // Dispatch the action and payload to the reducer to update the state.
  // console.log(res.data);
  dispatch({
    type: GET_SUBJECTS,
    payload: res.data,
  });
};

export const addSubject = (subject) => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.post(`/subjects/add`, subject);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: ADD_SUBJECT,
    payload: res.data,
  });
};

export const deleteSubject = (id) => async (dispatch) => {
  // console.log('DC id: ', id);
  try {
    await axios.delete(`/subjects/${id}`);
    // console.log('first');
    dispatch({
      type: DELETE_SUBJECT,
      payload: id,
    });
    // console.log('second');
  } catch (error) {
    // console.log(error);
    dispatch({
      type: SUBJECT_DEL_ERROR,
      payload: error,
    });
  }
};
