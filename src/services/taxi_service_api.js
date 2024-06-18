import config from "../_config";
import { setHeader } from '../_helper/apiHeader'
import Axios from "axios";
import { getResponseData } from "../_helper/getResponseData";

const BASE_API_URL = config.BASE_API_URL;


export async function getTaxiServiceData(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/cars`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

// checkout for ride
export async function checkoutForRide(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/checkout`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

// payment option list
export async function getPaymentOptions(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/payment-option`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

// select payment option
export async function selectPaymentHandler(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/checkout-payment`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

// promo code check
export async function applyPromoCodeHandler(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/checkout/apply-promo`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

// confirm ride
export async function confirmRideHandler(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/confirm`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

// outstation availibility and ride details
export async function getOutstationServiceData(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/outstation-details`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

// rental service data
export async function getRentalServiceData(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/rental-cars`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

export async function getTaxiHistory(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/booking/history`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

export async function getTaxiBookingSummary(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/booking/history/detail`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

export async function getTaxiCancelReasons(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/cancel-reasons`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

export async function taxiBookingCancel(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/booking/cancel`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}



