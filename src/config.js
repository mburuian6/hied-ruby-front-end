import { isPersistedState } from "./helpers";

const BASE_URL = 'http://localhost:8080/';
const API_HOME_URL = BASE_URL;

//Auth
const API_SIGN_UP_PATH = '/users';
const API_LOGIN_PATH = '/oauth/token';
const API_LOGOUT_PATH = '/oauth/revoke';

//Content
const API_JOBS_PATH = '/posts';
const API_POST_BIDS_PATH = '/bids/open_post_bids';
const API_BIDS_PATH = '/bids';
const API_ACCEPT_BID_PATH = '/bids/accept_bid';
const API_ALL_NOTIFICATIONS= '/notifications/all_notifications';

const headers = new Headers();
headers.append('Content-Type','application/json');
headers.append('Authorization',
  `Bearer ${isPersistedState('authenticationToken')}`);

export {
    BASE_URL, 
    API_HOME_URL,
    API_SIGN_UP_PATH,
    API_LOGIN_PATH,
    headers,
    API_JOBS_PATH,
    API_BIDS_PATH,
    API_POST_BIDS_PATH,
    API_ACCEPT_BID_PATH,
    API_ALL_NOTIFICATIONS
}
