/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import { GET_STUDENT_INFO, GET_STUDENTS, ADD_STUDENT } from './types';
// import axios
import axios from 'axios';

export const getStudentInfo = (id) => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.get(`/dash/student/${id}`);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: GET_STUDENT_INFO,
    payload: res.data,
  });
};

export const getStudents = () => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.get(`/students/all`);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: GET_STUDENTS,
    payload: res.data,
  });
};

export const addStudent = (student) => async (dispatch) => {
  // make a call to our api
  // endpoint: /api/contact/id
  const res = await axios.post(`/students/add`, student);
  // dispatch our action and the payload to the reducer.
  dispatch({
    type: ADD_STUDENT,
    payload: res.data,
  });
};
