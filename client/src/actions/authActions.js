/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { setAlert } from './alertActions';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  STUDENT_LOADED,
  STAFF_LOADED,
  AUTH_ERROR,
  STUDENT_LOGIN_SUCCESS,
  STUDENT_LOGIN_FAIL,
  STAFF_LOGIN_SUCCESS,
  STAFF_LOGIN_FAIL,
  STUDENT_LOGOUT,
  STAFF_LOGOUT,
} from './types';

// Load Student
export const loadStudent = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/auth/student');

    dispatch({
      type: STUDENT_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Load Staff
export const loadStaff = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/auth/staff');

    dispatch({
      type: STAFF_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Create student account
export const register = (user) => async (dispatch) => {
  try {
    const res = await axios.post('/students/add', user);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    // display each error.
    // errors.forEach.
    console.log(errors);
    dispatch({
      type: REGISTER_FAIL,
    });
  }
}; // End of register

// Student login
export const studentLogin = (details) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login/student', details);

    dispatch({
      type: STUDENT_LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('You have logged in successfully', 'success'));
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    console.log(errors);
    dispatch({
      type: STUDENT_LOGIN_FAIL,
    });
  }
};

// Staff login
export const staffLogin = (details) => async (dispatch) => {
  try {
    const res = await axios.post('/auth/login/staff', details);

    dispatch({
      type: STAFF_LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('You have logged in successfully', 'success'));
  } catch (error) {
    const { errors } = error.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    console.log(errors);
    dispatch({
      type: STAFF_LOGIN_FAIL,
    });
  }
};

// Student logout
export const studentLogout = () => (dispatch) => {
  dispatch({
    type: STUDENT_LOGOUT,
  });
};

// Staff logout
export const staffLogout = () => (dispatch) => {
  dispatch({
    type: STAFF_LOGOUT,
  });
};
