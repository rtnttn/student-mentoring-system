import { combineReducers } from 'redux';

import authReducer from './authReducer';
import applicationReducer from './applicationReducer';
import userReducer from './userReducer';
import groupReducer from './groupReducer';
import studentReducer from './studentReducer';
import staffReducer from './staffReducer';
import subjectReducer from './subjectReducer';
import alertReducer from './alertReducer';
import availabilityReducer from './availabilityReducer';

export default combineReducers({
  auth: authReducer,
  application: applicationReducer,
  user: userReducer,
  group: groupReducer,
  subject: subjectReducer,
  student: studentReducer,
  staff: staffReducer,
  alert: alertReducer,
  availability: availabilityReducer,
});
