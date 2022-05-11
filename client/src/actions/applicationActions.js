/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
  GET_APPLICATIONS,
  GET_APPLICATION,
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  DELETE_APPLICATION,
  APPLICATION_DEL_ERROR,
} from './types';
// import axios
import axios from 'axios';

// Get all contacts
export const getApplications = () => async (dispatch) => {
  console.log('getApplications');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get('/dash/applications');
  // Dispatch the action and payload to the reducer to update the state.
  console.log(res.data);
  dispatch({
    type: GET_APPLICATIONS,
    payload: res.data,
  });
};
