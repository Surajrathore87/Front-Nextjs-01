/* eslint-disable indent */
import {
  LOGGED_IN, USER_DATA, FORGOT_PASSWORD_POPUP, LOGGED_IN_POPUP, REGISTER_POPUP, USER_LOCATION, SERVICE_SEGMENTS, CONFIG_DATA
} from '../constants';
import Cookies from 'js-cookie';

const userData = (state = {
  userData: {}, isLoggedIn: Cookies.get('_access_token') && true || false, isLoggedInPopup: false, isForgotPasswordPopup: false, isRegisterPopup: false, userLocation: {}, serviceSegments: [], configData: {}
}, action) => {
  switch (action.type) {
    case USER_DATA:
      return { ...state, userData: action['data'] };
    case LOGGED_IN:
      return { ...state, isLoggedIn: action['data'] };
    case LOGGED_IN_POPUP:
      return { ...state, isLoggedInPopup: action['data'] };
    case REGISTER_POPUP:
      return { ...state, isRegisterPopup: action['data'] };
    case FORGOT_PASSWORD_POPUP:
      return { ...state, isForgotPasswordPopup: action['data'] };
    case USER_LOCATION:
      return { ...state, userLocation: action['data'] };
    case SERVICE_SEGMENTS:
      return { ...state, serviceSegments: action['data'] };
    case CONFIG_DATA:
      return { ...state, configData: action['data'] };
    default:
      return state;
  }
};

export default userData;
