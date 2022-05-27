// reducers/alertReducer
// This file holds the state and reducer for our alerts
import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const intialState = [];

// eslint-disable-next-line default-param-last
export default function alertReducer(state = intialState, action) {
  const { payload, type } = action;
  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
