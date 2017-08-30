import { Actions } from 'react-native-router-flux';
import { DevSummitAxios, getAccessToken } from '../../helpers';
/*
 * import constants
 */
import {
  SET_TICKET_TYPE,
  UPDATE_ORDER,
  SET_ORDER,
  IS_UPDATING_ORDER
} from './constants';

import * as actions from '../OrderList/actions';
// get order detail

export function getOrderDetail(orderId) {
  return (dispatch, getState) => {
    getAccessToken().then((accessToken) => {
      DevSummitAxios.get(`/api/v1/orders/${orderId}/details`, {
        headers: { Authorization: accessToken }
      }).then((response) => {
        dispatch({ type: SET_ORDER, data: response.data.data });
      }).catch((err) => { console.log(err.response); });
    }).catch((error) => { });
  };
}

export function updateIsUpdatingOrder(status) {
  return {
    type: IS_UPDATING_ORDER,
    status
  };
}

export function submitUpdateOrder(orders) {
  return (dispatch) => {
    dispatch(updateIsUpdatingOrder(true))
    for (let i in orders) {
      if (orders[i] !== undefined) {
        getAccessToken().then((token) => {
          DevSummitAxios.patch(`/api/v1/orders/${orders[i].order_id}/details/${orders[i].id}`, {
            count: orders[i].count
          }, {
              headers: { Authorization: token }
            }).then((response) => {
            }).catch((err) => { console.log(err.response); });
        }).catch((error) => { });
      }
    }
    dispatch(updateIsUpdatingOrder(false));
    dispatch(actions.getOrderList());
    Actions.pop();
  }
}


export function updateOrder(action, detaild) {
  return (dispatch, getState) => {
    const { order } = getState().get('orderDetail').toJS();
    const ord = order.filter((item) => {
      return item.id === detaild;
    });
    const firstOrder = ord[0];
    if (action === 'increase') {
      if (firstOrder) {
        firstOrder.count += 1;
        dispatch({ type: UPDATE_ORDER, id: order.indexOf(firstOrder), payload: firstOrder });
      } else {
        const payload = { ticket_id: order.indexOf(ord), count: 1 };
        dispatch({ type: UPDATE_ORDER, id: order.indexOf(ord), payload });
      }
    }

    if (action === 'decrease') {
      if (firstOrder && firstOrder.count > 0) {
        firstOrder.count -= 1;
        dispatch({ type: UPDATE_ORDER, id: order.indexOf(firstOrder), payload: firstOrder });
      }
    }
  };
}