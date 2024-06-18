import Cookies from 'js-cookie';
import config from '../_config';

const publicKey = config.TAXI_PUBLIC_KEY;
const secretKey = config.TAXI_SECRET_KEY;

export function setHeader() {
  const _headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/json',
      publicKey: publicKey,
      secretKey: secretKey,
    },
  };
  if (Cookies.get('_access_token')) {
    _headers['headers']['Authorization'] = `Bearer ${Cookies.get('_access_token')}`;
  }

  return _headers;
}