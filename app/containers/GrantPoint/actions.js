import {
  DevSummitAxios
} from '../../helpers';

import {
  GET_ATTENDEES,
  IS_GETTING_ATTENDEES,
  IS_TRANSFERING_POINTS
} from './constants';

function isGettingAttendees(status) {
  return {
    type: IS_GETTING_ATTENDEES,
    status
  };
}

function updateIsTransferingPoints(status) {
  return {
    type: IS_TRANSFERING_POINTS,
    status
  };
}

export function getAttendees() {
  return (dispatch) => {
    dispatch(isGettingAttendees(true))
    DevSummitAxios.get('api/v1/attendees')
      .then((response) => {
        dispatch({
          type: GET_ATTENDEES,
          payload: response.data.data
        })
        dispatch(isGettingAttendees(false));
      }).catch((error) => {
        console.log('error : ', error)
      })
  }
}

export function transferPoints(receiver_id, points) {
  return (dispatch) => {
    dispatch(isGettingAttendees(true))
    DevSummitAxios.post('api/v1/points/transfer',
      { Authorization:  },
      { receiver_id, points })
      .then((response) => {
        // dispatch(getAttendees());
        console.log(response, 'ini success')
        dispatch(isGettingAttendees(false));
      }).catch((error) => {
        console.log('error : ', error)
      })
  }
}
