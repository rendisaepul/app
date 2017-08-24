import { fromJS } from 'immutable';

import {
  GET_ATTENDEES,
  IS_GETTING_ATTENDEES
} from './constants';

const initialState = fromJS({
  isGettingAttendees: false,
  attendeesData: []
});

function grantPointReducer(state = initialState, action) {
  switch (action.type) {
    case IS_GETTING_ATTENDEES:
      return state.set('isGettingAttendees', action.status);
    case GET_ATTENDEES:
      return state.set('attendeesData', action.payload);
    default:
      return state;
  }
}

export default grantPointReducer;
