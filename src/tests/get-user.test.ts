import { Counter } from 'k6/metrics';
import { Options } from 'k6/options';
import { Store } from '../lib/helpers/store.helper';
import { setSleep } from '../lib/helpers/sleep.helper';
import { getUserInfo } from '../actions/user.actions';
import { Cookies } from '@models/cookies.model';
import { environment, setupHelper } from '../lib/helpers/setup.helper';

export let options: Partial<Options> = {
  vus: 3,
  iterations: 10,
  insecureSkipTLSVerify: true,
  thresholds: {
    'checks{checkTag:authentication}': ['rate>0.9'],
  },
};

let numberOfUserInfoRetrieved = new Counter('NumberOfUserInfoRetrieved');

const API_URL = `${environment.baseUrl}/api`;

/**
 * This is the setup function called BEFORE the test starts. It is where 
 * we do our authentication and get a cookie to use with all of our subsequent
 * API calls. It must be defined in each test, BUT when running the soak test
 * only the setup function inside of that file gets called.
 * 
 * @returns Cookies
 */
export function setup() {
  return setupHelper();
}

// Main test entry point
export default (authCookies: Cookies) => {
  let res = getUserInfo(API_URL, authCookies);
  
  setSleep();
  
  if (res.status === 200 && res.json()) {
    numberOfUserInfoRetrieved.add(true);
  }
};

export function teardown() {
  // add stuff to do after the test is done, like deleting any temp files, etc...
  Store.dispose();
}
