import config from "../_config";
import { setHeader } from '../_helper/apiHeader'
import Axios from "axios";
import { getResponseData } from "../_helper/getResponseData";

const BASE_API_URL = config.BASE_API_URL;

// user detail
export async function getUserData(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/details`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

export async function getConfigurationData(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/configuration`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

export async function getServiceSegmentsData(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/segments`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

export async function getSiteContentData(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/website/home-screen`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}



