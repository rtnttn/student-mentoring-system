/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import { GET_STAFF, ADD_STAFF } from './types';
// import axios
import axios from 'axios';

export const getStaff = () => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.get(`/staff/all`);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: GET_STAFF,
    payload: res.data,
  });
};

export const addStaff = (staff) => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.post(`/staff/add`, staff);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: ADD_STAFF,
    payload: res.data,
  });
};
