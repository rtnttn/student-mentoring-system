/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
  GET_GROUPS,
  GET_GROUP,
  GET_GROUP_ADMIN,
  GET_GROUP_FOR_ADD,
  ADD_GROUP,
  ADD_MENTEE_TO_GROUP,
  UPDATE_GROUP,
  DELETE_GROUP,
  GROUP_DEL_ERROR,
} from './types';
import { setAlert } from './alertActions';
// import axios
import axios from 'axios';

// Get all contacts
export const getGroups = () => async (dispatch) => {
  // console.log('getGroups');
  // the call to the api.
  // This will get all our contacts from the endpoint
  const res = await axios.get('/dash/groups');
  // Dispatch the action and payload to the reducer to update the state.
  // console.log(res.data);
  dispatch({
    type: GET_GROUPS,
    payload: res.data,
  });
};

export const getGroupAdmin = (id) => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.get(`/groups/id/${id}`);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: GET_GROUP_ADMIN,
    payload: res.data,
  });
};

export const getGroupForAdd = () => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.get(`/groups/add`);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: GET_GROUP_FOR_ADD,
    payload: res.data,
  });
};

export const addGroup = (group) => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.post(`/groups/add`, group);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: ADD_GROUP,
    payload: res.data,
  });

  dispatch(setAlert('Group created ', 'success'));
};

export const addMenteeToGroup = (students, groupId) => async (dispatch) => {
  // console.log('addMenteeToGroup');
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.put(`/groups/add/${groupId}`, students);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: ADD_MENTEE_TO_GROUP,
    payload: res.data,
  });

  dispatch(setAlert('Group member added ', 'success'));
};
