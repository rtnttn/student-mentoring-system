/* eslint-disable prefer-destructuring */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types';
// import setAuthToken from '../utils/setAuthToken';

// Load User
// export const loadUser = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get('/api/auth');

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (error) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };

export const register = (user) => async (dispatch) => {
  // const user = JSON.stringify({name, email, password});

  try {
    const res = await axios.post('/api/student/add', user);

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
