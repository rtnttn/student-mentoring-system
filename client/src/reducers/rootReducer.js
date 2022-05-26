import { combineReducers } from 'redux';

import authReducer from './authReducer';
import applicationReducer from './applicationReducer';
import userReducer from './userReducer';
import groupReducer from './groupReducer';
import studentReducer from './studentReducer';
import subjectReducer from './subjectReducer';

export default combineReducers({
  auth: authReducer,
  application: applicationReducer,
  user: userReducer,
  group: groupReducer,
  student: studentReducer,
  subject: subjectReducer,
});
