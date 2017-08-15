import { AsyncStorage } from 'react-native';
import OAuthManager from 'react-native-oauth';
import { google } from 'react-native-simple-auth';

import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_SINGLE_FIELD,
  UPDATE_IS_LOGGED_IN,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET,
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
    }).then((resp) => {
      console.log(resp)
      if (resp.credentials) {
        DevSummitAxios.post('/auth/login',{
          provider: 'google',
          token: resp.credentials.id_token
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((response) => {
          console.log(response)
          if (response && response.data && response.data.meta.success) {
            try {
              AsyncStorage.setItem('access_token', response.data.data.access_token);
              AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
            } catch (error) {
              console.log(error, 'error caught');
            }
            dispatch({
              type: UPDATE_IS_LOGGED_IN,
              status: true
            });
          }
        }).catch(err => console.log(err));
      }
    }).catch((error) => {
      console.log(error)
    });
  }
}

export function loginTwitter() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit')
    manager.configure({
      twitter: {
        consumer_key: 'iJoptl48l8j5OseOI1lrS3r9N',
        consumer_secret: 'eJBRnVvE0YplptEelYJOuHYw2YLdOf9v39YNnfdM6Rkv3kNShC'
      }
    });
    manager.authorize('twitter')
      .then((resp) => {
        console.log(resp)
        if (resp.authorized) {
          DevSummitAxios.post('/auth/login', {
            provider: 'twitter',
            token: resp.response.credentials.accessToken
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((response) => {
            if (response && response.data && response.data.meta.success) {
              try {
                AsyncStorage.setItem('access_token', response.data.data.access_token);
                AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
              } catch (error) {
                console.log(error, 'error caught');
              }
              dispatch({
                type: UPDATE_IS_LOGGED_IN,
                status: true
              });
            }
          }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));
  }
}

export function loginFacebook() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit')
    manager.configure({
      facebook: {
        client_id: FB_CLIENT_ID,
        client_secret: FB_CLIENT_SECRET
      }
    });
    manager.authorize('facebook', { scopes: 'public_profile' })
      .then((resp) => {
        console.log(resp.response.credentials.accessToken)
        const data = {
          provider: 'facebook',
          token: resp.response.credentials.accessToken
        };
        const headers = { 'Content-Type': 'application/json' };
        DevSummitAxios.post('/auth/login', data, { headers })
          .then((response) => {
            if (response && response.data && response.data.meta.success) {
              try {
                AsyncStorage.setItem('access_token', response.data.data.access_token);
                AsyncStorage.setItem('refresh_token', response.data.data.refresh_token);
              } catch (error) {
                console.log(error, 'error caught');
              }
              dispatch({
                type: UPDATE_IS_LOGGED_IN,
                status: true
              });
            }
          })
          .catch((err) => { console.log(err); });
      }).catch((err) => { console.log('error login fb', err); });
  };
}

