import axios from 'axios';
import { BASE_URL } from './paths-config';
import { persistedState, persistState } from './helpers';

//DEFAULT
const defaultInstance = axios.create({ baseURL: BASE_URL })

defaultInstance.defaults.headers.common['mode'] = 'cors'
// defaultInstance.defaults.withCredentials = true
if (persistedState('access_token')) {
  defaultInstance.defaults.headers.common['Authorization'] = 
    `Bearer ${persistedState('access_token').replaceAll('"','')}`;
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
// authInstance.defaults.withCredentials = false;

authInstance.interceptors.request.use(request => {
  request.data['client_id'] = clientId;

  if (request.url.includes('/oauth/token')) {
    //login
    request.data['client_secret'] = clientSecret;
    request.data['grant_type'] = loginGrantType;
  } else if (request.url.includes('/oauth/revoke')){
    //revoke - logout
    request.data['client_secret'] = clientSecret;
  }
  
  console.log('Starting Request', JSON.stringify(request, null, 2))
  return request;
});

authInstance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  if(response.data.access_token != null ) {
    persistState('username', response.data.username);
    persistState('access_token', response.data.access_token);
    persistState('expires_in', response.data.expires_in);
    persistState('refresh_token', response.data.refresh_token);
    persistState('created_at', response.data.created_at);
  }
  return response;
})




export { 
  defaultInstance,
  authInstance
}

