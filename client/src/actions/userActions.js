/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import { GET_USERS, GET_USER, ADD_USER, UPDATE_USER, DELETE_USER, USER_DEL_ERROR } from './types';
// import axios
import axios from 'axios';

// Get all contacts
export const getUsers = () => async (dispatch) => {
  console.log('getUsers');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get('/dash/users');
  // Dispatch the action and payload to the reducer to update the state.
  console.log(res.data);
  dispatch({
    type: GET_USERS,
    payload: res.data,
  });
};
