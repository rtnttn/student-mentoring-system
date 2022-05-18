/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
  GET_USERS,
  GET_USER,
  GET_STUDENT_ADMIN,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_DEL_ERROR,
  USER_DEFAULT,
} from './types';
// import axios
import axios from 'axios';

// Get all contacts
export const getUsers = () => async (dispatch) => {
  // console.log('getUsers');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get('/dash/users');
  // Dispatch the action and payload to the reducer to update the state.
  // console.log(res.data);
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};

export const getStudentAdmin = (id) => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.get(`/students/details/${id}`);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: GET_STUDENT_ADMIN,
    payload: res.data,
  });
};

export const userDefault = () => async (dispatch) => {
  // console.log('Set Loading');
  dispatch({
    type: USER_DEFAULT,
  });
};
