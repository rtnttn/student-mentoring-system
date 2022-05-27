import { combineReducers } from 'redux';

import authReducer from './authReducer';
import applicationReducer from './applicationReducer';
import userReducer from './userReducer';
import groupReducer from './groupReducer';
import studentReducer from './studentReducer';
import subjectReducer from './subjectReducer';
import alertReducer from './alertReducer';


export default combineReducers({
  auth: authReducer,
  application: applicationReducer,
  user: userReducer,
  group: groupReducer,
  subject: subjectReducer,
  student: studentReducer,
  alert: alertReducer,
});
