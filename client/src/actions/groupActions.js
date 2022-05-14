/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
  GET_GROUPS,
  GET_GROUP,
  ADD_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  GROUP_DEL_ERROR,
} from './types';
// import axios
import axios from 'axios';

// Get all contacts
export const getGroups = () => async (dispatch) => {
  console.log('getGroups');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get('/dash/groups');
  // Dispatch the action and payload to the reducer to update the state.
  console.log(res.data);
  dispatch({
    type: GET_GROUPS,
    payload: res.data,
  });
};
