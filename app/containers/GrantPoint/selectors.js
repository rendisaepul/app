/**
 *  Import node modules
 */
import { createSelector } from 'reselect';

/**
 *  Select the main portion of the root reducer
 */
const selectGrantPointReducer = () => state => state.get('grantPoint');

/**
 *  Selects the username field data
 *  Returns object
 */
export const getAttendees = () => createSelector(
  selectGrantPointReducer(),
  state => state.get('attendeesData')
);

/**
 *  Get logged in status
 *  Returns boolean
 */
export const getIsGettingAttendees = () => createSelector(
  selectGrantPointReducer(),
  state => state.get('isGettingAttendees')
);

