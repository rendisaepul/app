import { AsyncStorage } from 'react-native';
import OAuthManager from 'react-native-oauth';
import { google, facebook, twitter, tumblr } from 'react-native-simple-auth';

import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_LOGGED_IN,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} from './constants';


/*
 * Update the input fields
 * @param {field: name of the field}
 * @param {value: value to be set}
 */
export function updateFields(field, value) {
  return {
    type: UPDATE_SINGLE_FIELD,
    field,
    value
  };
}

/*
 * Log user in
 * save access_token & refresh_token to asyncstorage
 */
export function login() {
  return (dispatch, getState) => {
    const { fields } = getState().get('main').toJS();

    const { username, password } = fields;
    DevSummitAxios.post('/auth/login', {
      username,
      password
    }).then((response) => {
      if (response && response.data && response.data.meta.success) {
        try {
          AsyncStorage.setItem('access_token', responseJson.result.access_token);
          AsyncStorage.setItem('refresh_token', responseJson.result.refresh_token);
        } catch (error) {
          console.log(error, 'error caught');
        }
        dispatch({
          type: UPDATE_IS_LOGGED_IN,
          status: true
        });
      }
    });
  };
}

export function loginGoogle() {
  return (dispatch) => {
    google({
      appId: '460961401101-36cq9ofsgk6spotne1vvnac794599f42.apps.googleusercontent.com',
      callback: 'com.devsummit:/oauth2redirect',
    }).then((info) => {
      console.log(info)
      // info.user - user details from the provider
      // info.credentials - tokens from the provider
    }).catch((error) => {
      console.log(error)
      // error.code
      // error.description
    });
    // const manager = new OAuthManager('devsummit')
    // manager.configure({
    //   google: {
    //     callback_url: GOOGLE_CALLBACK_URL,
    //     client_id: GOOGLE_CLIENT_ID,
    //     client_secret: GOOGLE_CLIENT_SECRET
    //   }
    // });
    // manager.authorize('google', {scopes: 'email'})
    //   .then((resp) => {
    //     if (resp.authorized) {
    //       DevSummitAxios.post('/auth/login',{
    //         provider: resp.provider,
    //         token: resp.response.credentials.idToken
    //       }, {
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       }).then((response) => {
    //         if (response && response.data && response.data.meta.success) {
    //           try {
    //             AsyncStorage.setItem('access_token', response.data.data.access_token);
    //             AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
    //           } catch (error) {
    //             console.log(error, 'error caught');
    //           }
    //           dispatch({
    //             type: UPDATE_IS_LOGGED_IN,
    //             status: true
    //           });
    //         }
    //       }).catch(err => console.log(err));
    //     }
    //   }).catch(err => console.log(err));
  }
}

export function loginTwitter() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit')
    manager.configure({
      twitter: {
        consumer_key: 'MUkDDSYuqRGMUh7k0TRJvYSNe',
        consumer_secret: 'GULH8Ovx7B77snfoK4CJzanb76wBzFZC8OtHW0kb6WcasR7lV1'
      }
    });
    manager.authorize('twitter')
      .then((resp) => {
        console.log(resp)
        // if (resp.authorized) {
        //   DevSummitAxios.post('/auth/login',{
        //     provider: resp.provider,
        //     token: resp.response.credentials.idToken
        //   }, {
        //     headers: {
        //       'Content-Type': 'application/json'
        //     }
        //   }).then((response) => {
        //     if (response && response.data && response.data.meta.success) {
        //       try {
        //         AsyncStorage.setItem('access_token', response.data.data.access_token);
        //         AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
        //       } catch (error) {
        //         console.log(error, 'error caught');
        //       }
        //       dispatch({
        //         type: UPDATE_IS_LOGGED_IN,
        //         status: true
        //       });
        //     }
        //   }).catch(err => console.log(err));
        // }
      }).catch(err => console.log(err));
  }
}

