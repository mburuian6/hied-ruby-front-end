import { isPersistedState } from "./helpers";

const BASE_URL = 'http://localhost:8080/';
const API_HOME_URL = BASE_URL;
const API_JOBS_URL = 'http://localhost:8080/posts';
const API_SIGN_UP_URL = 'http://localhost:8080/auth/signup';
const API_LOGIN_URL = 'http://localhost:8080/auth/login';

const API_JOBS_PATH = '/posts';
const API_POST_BIDS_PATH = '/bids/open_post_bids';
const API_BIDS_PATH = '/bids';

const headers = new Headers();
headers.append('Content-Type','application/json');
headers.append('Authorization',
  `Bearer ${isPersistedState('authenticationToken')}`);

export {
    BASE_URL, 
    API_HOME_URL,
    API_JOBS_URL,
    API_SIGN_UP_URL,
    API_LOGIN_URL,
    headers,
    API_JOBS_PATH,
    API_BIDS_PATH,
    API_POST_BIDS_PATH
}
