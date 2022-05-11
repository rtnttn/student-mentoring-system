import { combineReducers } from 'redux';

import authReducer from './authReducer';
import applicationReducer from './applicationReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  application: applicationReducer,
  user: userReducer,
});
