import axios from 'axios';
import { BASE_URL } from './config';
import { persistedState, persistState } from './helpers';

//DEFAULT
const defaultInstance = axios.create({ baseURL: BASE_URL })

defaultInstance.defaults.headers.common['mode'] = 'cors'
defaultInstance.defaults.withCredentials = true
if (persistedState('token')) {
  defaultInstance.defaults.headers.common['Authorization'] = 
    `Bearer ${persistedState('token').access_token.replaceAll('"','')}`;
}

defaultInstance.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
})

defaultInstance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2));
  return response
})

//AUTH
//login
const clientId = "RW3RdyB6DCsV5DjWaxWB8Lbbg2Thu2_VZ3cuTTe3-Gk";
const clientSecret = "3o8HDlvWEx9OQR9H8eSbm51wMPxnskpqjf1VaDo_rqI";
const loginGrantType = "password";

const authInstance = axios.create({ baseURL: BASE_URL })
authInstance.defaults.headers.common['mode'] = 'cors'
authInstance.defaults.withCredentials = false;

authInstance.interceptors.request.use(request => {
  request.params['client_id'] = clientId;

  if (request.url.includes('/oauth/token')) {
    //login
    request.params['client_secret'] = clientSecret;
    request.params['grant_type'] = loginGrantType;
  } else if (request.url.includes('/oauth/revoke')){
    //revoke - logout
    request.params['client_secret'] = clientSecret;
  }
  
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request;
});

authInstance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  if(response.access_token != null ) persistState('token', response.data);
  return response;
})




export { 
  defaultInstance,
  authInstance
}

