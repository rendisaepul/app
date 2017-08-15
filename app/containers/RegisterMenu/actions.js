import { AsyncStorage } from 'react-native';
import OAuthManager from 'react-native-oauth';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { google } from 'react-native-simple-auth';

import {
  DevSummitAxios
} from '../../helpers';

/*
 * import constants
 */

import {
  UPDATE_IS_REGISTERED,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  FB_CLIENT_ID,
  FB_CLIENT_SECRET
} from './constants';

export function registerGoogle() {
  return (dispatch) => {
    google({
      appId: '460961401101-36cq9ofsgk6spotne1vvnac794599f42.apps.googleusercontent.com',
      callback: 'com.devsummit:/oauth2redirect',
    }).then((resp) => {
      console.log(resp)
      if (resp.user) {
        const prefilledData = {
          first_name: resp.user.given_name,
          last_name: resp.user.family_name,
          email: resp.user.email,
          social_id: resp.user.id
        }
        Actions.registerEmail({prefilledData: prefilledData})
      }
    }).catch((error) => {
      console.log(error)
    });
  }
}

export function registerFacebook() {
  return (dispatch) => {
    const manager = new OAuthManager('devsummit')
    manager.configure({
      facebook: {
        client_id: FB_CLIENT_ID,
        client_secret: FB_CLIENT_SECRET
      }
    });
    manager.authorize('facebook', { scopes: 'public_profile,email' })
      .then((resp) => {
        if (resp.authorized) {
          axios.get('https://graph.facebook.com/me?fields=id,first_name,last_name,email', {
            headers: {
              Accept: 'application/json',
              Authorization: `Bearer ${resp.response.credentials.accessToken}`
            }
          }).then((response) => {
            const prefilledData = {
              first_name: response.data.first_name,
              last_name: response.data.last_name,
              email: response.data.email,
              social_id: response.data.id
            }
            Actions.registerEmail({ prefilledData })
          }).catch(err => console.log(err));
        }
      }).catch(err => console.log(err));
  }
}
