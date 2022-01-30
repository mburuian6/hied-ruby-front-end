import axios from 'axios';
import { BASE_URL } from './config';
import { isPersistedState } from './helpers';

const defaultInstance = axios.create({
  baseURL: BASE_URL
})

defaultInstance.defaults.headers.common['mode'] = 'cors'
if (isPersistedState('authenticationToken') != null) {
  defaultInstance.defaults.withCredentials = true 
  defaultInstance.defaults.headers.common['Authorization'] = 
    `${isPersistedState('authenticationToken').replaceAll('"','')}`  ;
}

// defaultInstance.interceptors.request.use(request => {
//   console.log('Starting Request', JSON.stringify(request, null, 2))
//   return request
// })

defaultInstance.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2))
  return response
})

const authInstance = defaultInstance
authInstance.defaults.withCredentials = false;

const homeInstance = defaultInstance
homeInstance.defaults.withCredentials = false;

export { 
  defaultInstance,
  authInstance,
  homeInstance
}

