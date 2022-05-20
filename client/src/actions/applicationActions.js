/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger, no-console */
import {
  GET_APPLICATIONS,
  GET_APPLICATION,
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  APPROVE_MENTORSHIP,
  APPROVE_MENTOR_SUBJECT,
  DELETE_APPLICATION,
  APPLICATION_DEL_ERROR,
  GET_APPLICATIONS_BY_STUDENT
} from './types';
// import axios
import axios from 'axios';

// Get all applications
export const getApplications = () => async (dispatch) => {
  // console.log('getApplications');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get('/dash/applications');
  // Dispatch the action and payload to the reducer to update the state.
  // console.log(res.data);
  dispatch({
    type: GET_APPLICATIONS,
    payload: res.data,
  });
};


// Add  contacts
export const addApplication = () => async (dispatch) => {
  console.log('addApplication');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.post('/applications/add');
  // Dispatch the action and payload to the reducer to update the state.
  console.log(res.data);
  dispatch({
    type: ADD_APPLICATION,
      });
};

export const approveMentorship = (id) => async (dispatch) => {
  const res = await axios.put(`/students/edit/priv/${id}`, { isMentor: true });
  // Dispatch the action and payload to the reducer to update the state.
  // console.log(res.data);
  dispatch({
    type: APPROVE_MENTORSHIP,

    payload: res.data,
  });
};


// Get Applications by student
export const getApplicationByStudent = (id) => async (dispatch) => {
  // console.log('getApplications');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get(`/applications/student/${id}`);
  // Dispatch the action and payload to the reducer to update the state.
  // console.log(res.data);
  dispatch({
    type: GET_APPLICATIONS_BY_STUDENT,
    payload: res.data,
  });
};

export const approveMentorSubject = (id) => async (dispatch) => {
  const res = await axios.put(`/applications/approve/${id}`, { isApproved: true });
  // Dispatch the action and payload to the reducer to update the state.
  // console.log(res.data);
  dispatch({
    type: APPROVE_MENTOR_SUBJECT,
    payload: res.data,
  });
};

export const deleteApplication = (id) => async (dispatch) => {
  // console.log('DC id: ', id);
  try {
    await axios.delete(`/applications/${id}`);
    // console.log('first');
    dispatch({
      type: DELETE_APPLICATION,
      payload: id,
    });
    // console.log('second');
  } catch (error) {
    // console.log(error);
    dispatch({
      type: APPLICATION_DEL_ERROR,
      payload: error,
    });
  }
};

