import config from "../_config";
import { setHeader } from '../_helper/apiHeader'
import Axios from "axios";
import { getResponseData } from "../_helper/getResponseData";

const BASE_API_URL = config.BASE_API_URL;


export async function registerUser(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/signup`, params, setHeader());
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}

export async function loginUser(params) {
  try {
    const res = await Axios.post(`${BASE_API_URL}user/login`, params, setHeader())
    const { response } = getResponseData(res['data'])
    return { response, error: null };
  } catch (err) {
    throw err;
  };
}


