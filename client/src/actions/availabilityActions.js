/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import { GET_AVAILABILITIES_FOR_STUDENT, EDIT_AVAILABILITIES, GET_TIMESLOTS } from './types';
// import axios
import axios from 'axios';

// Get all contacts
export const getAvailabilityForStudent = (id) => async (dispatch) => {
  // console.log('getGroups');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get(`/availability/studentid/${id}`);
  // Dispatch the action and payload to the reducer to update the state.
  // console.log(res.data);
  dispatch({
    type: GET_AVAILABILITIES_FOR_STUDENT,
    payload: res.data,
  });
};

export const editAvailabilities = (availabilities) => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.put(`/availability/edit`, availabilities);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: EDIT_AVAILABILITIES,
    payload: res.data,
  });
};

export const getTimeslots = () => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.get(`/timeslots`);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: GET_TIMESLOTS,
    payload: res.data,
  });
};
