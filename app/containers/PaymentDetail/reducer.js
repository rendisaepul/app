import { fromJS } from 'immutable';

/*
* import constants
*/

import {
  UPDATE_SINGLE_INPUT_FIELD,
  UPDATE_SINGLE_ERROR_FIELD,
  GET_TRANSACTION_RESPONSE,
  IS_FETCHING_TRANSACTION
} from './constants';


/*
* initial state of reducers
*/
const initialState = fromJS({
  transactionResponse: {},
  isFetchingTransaction: false,
  inputFields: {
    emailDetail: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    vaNumber: '',
    cardNumber: '4365 0263 3573 7199',
    orderId: '',
    grossAmount: '',
    cardCvv: '123',
    descriptionDetail: '',
    lastDigitNumber: '',
    randomNumber: '',
    mandiriToken: ''
  },
  errorFields: {
    errorEmailDetail: false,
    errorFirstName: false,
    errorLastName: false,
    errorPhoneNumber: false,
    errorVaNumber: false,
    errorCardNumber: false,
    errorCardCvv: false,
    errorDescriptionDetail: false,
    errorLastDigitNumber: false,
    errorRandomNumber: false,
    errorMandiriToken: false
  }
});

function paymentDetailReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SINGLE_ERROR_FIELD:
      return state.setIn(['inputFields', action.field], action.value);
    case UPDATE_SINGLE_INPUT_FIELD:
      return state.setIn(['inputFields', action.field], action.value);
    case GET_TRANSACTION_RESPONSE:
      return state.set('transactionResponse', action.payload);
    case IS_FETCHING_TRANSACTION:
      return state.set('isFetchingTransaction', action.status);
    default:
      return state;
  }
}

/*
 * export the reducer
 */

export default paymentDetailReducer;
