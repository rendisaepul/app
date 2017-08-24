import {
  DevSummitAxios
} from '../../helpers';

import {
  GET_ATTENDEES,
  IS_GETTING_ATTENDEES
} from './constants';

function isGettingAttendees(status) {
  return {
    type: IS_GETTING_ATTENDEES,
    status
  };
}

export function getAttendees() {
  console.log('sadsdsaaaaaaaaaaaaaaa')
  return (dispatch) => {
    dispatch(isGettingAttendees(true))
    DevSummitAxios.get('api/v1/attendees')
      .then((response) => {
        console.log(response.data.data)
      }).catch((error) => {
        console.log('ini erornya : ', error)
      })
  }
}

export function haha(){
  return true
}
