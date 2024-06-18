import { LOGGED_IN, USER_DATA, FORGOT_PASSWORD_POPUP, LOGGED_IN_POPUP, REGISTER_POPUP, TAXI_DATA, BOOKING_SUMMARY_DATA, USER_LOCATION, SERVICE_SEGMENTS, CONFIG_DATA, } from '../constants';



// Action Creator
export const userData = (data) => ({
  type: USER_DATA,
  data: data,
});

export const userLoggedIn = (data) => ({
  type: LOGGED_IN,
  data: data,
});

export const setShowLoggedInPopup = (data) => ({
  type: LOGGED_IN_POPUP,
  data: data,
});

// export const showForgotPasswordPopup = (data) => ({
//   type: FORGOT_PASSWORD_POPUP,
//   data: data,
// });

export const setShowRegisterPopup = (data) => ({
  type: REGISTER_POPUP,
  data: data,
});

export const setUserLocation = (data) => ({
  type: USER_LOCATION,
  data: data,
});

export const setServiceSegments = (data) => ({
  type: SERVICE_SEGMENTS,
  data: data,
});

export const setConfigData = (data) => ({
  type: CONFIG_DATA,
  data: data,
});

// Taxi segment
export const setTaxiServiceData = (data) => ({
  type: TAXI_DATA,
  data: data,
})

export const setBookingData = (data) => ({
  type: BOOKING_SUMMARY_DATA,
  data: data,
})






