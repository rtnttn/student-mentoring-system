/* eslint-disable default-param-last */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
import {
  GET_APPLICATIONS,
  GET_APPLICATIONS_BASIC,
  GET_APPLICATION,
  ADD_APPLICATION,
  UPDATE_APPLICATION,
  APPROVE_MENTORSHIP,
  APPROVE_MENTOR_SUBJECT,
  DELETE_APPLICATION,
  APPLICATION_DEL_ERROR,
  GET_APPLICATIONS_BY_STUDENT,
  ADD_APPLICATION_BY_STUDENT,
  APPLICATION_FORM_ERROR,
} from '../actions/types';

const initialState = {
  applications: {},
  basicApplications: [],
  application: {},
  loading: true,
  errors: {},
};

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case GET_APPLICATIONS:
      return {
        ...state,
        applications: action.payload,
        // return the current state plus the new contacts array.
        loading: false,
      };
    case GET_APPLICATIONS_BASIC:
      return {
        ...state,
        basicApplications: action.payload,
        loading: false,
      };
    case GET_APPLICATION:
      return {
        ...state,
        application: action.payload,
        loading: false,
      };
    case ADD_APPLICATION:
      return {
        ...state,
        application: action.payload,
        loading: false,
      };
    case UPDATE_APPLICATION:
      return {};
    case APPROVE_MENTORSHIP:
      return {
        ...state,
      };
    case APPROVE_MENTOR_SUBJECT:
      return {
        ...state,
      };
    case DELETE_APPLICATION:
      return {
        ...state,
        applications: {
          ...state.applications,
          mentors: state.applications.mentors.filter(
            (application) => application.applicationId !== action.payload
          ),
          mentees: state.applications.mentees.filter(
            (application) => application.applicationId !== action.payload
          ),
          mentorEoI: state.applications.mentorEoI.filter(
            (application) => application.applicationId !== action.payload
          ),
        },
        loading: false,
      };
    case GET_APPLICATIONS_BY_STUDENT:
      return {
        ...state,
        applications: action.payload,
        loading: false,
      };

    case ADD_APPLICATION_BY_STUDENT:
      return {
        ...state,
        applications: action.payload,
        loading: false,
      };
    case APPLICATION_DEL_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      };
    case APPLICATION_FORM_ERROR:
      return {
        ...state,
        errors: action.payload,
        loading: false,
      }
    default:
      return state;
  }
}
