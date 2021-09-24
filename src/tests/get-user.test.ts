import { User } from '@models/user.model';
import { check, group } from 'k6';
import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { Options } from 'k6/options';
import { Store } from '../lib/helpers/store.helper';
import * as session from '../actions/session-management.actions';
import { setSleep } from '../lib/helpers/sleep.helper';
import { getUserInfo } from '../actions/user.actions';
import { Cookies } from '@models/cookies.model';

export let options: Partial<Options> = {
  vus: 3,
  iterations: 10,
  insecureSkipTLSVerify: true,
  thresholds: {
    'checks{checkTag:authentication}': ['rate>0.9'],
  },
};

let numberOfUserInfoRetrieved = new Counter('NumberOfUserInfoRetrieved');

const EMPLOYEE_OWNER: User = {
  firstName: 'Andrew',
  lastName: 'Payment',
  userName: 'paymean',
  password: 'Heinzcatsup1',
} as User;

const BASE_URL = 'https://staging-01/payroll';
const API_URL = `${BASE_URL}/api`;

export function setup() {
  // not sure what I can actually do here and share across calls? I can't seem to store the fedauth cookies here...
  const authCookies = session.login(EMPLOYEE_OWNER, BASE_URL);
  return authCookies;
}

export default (authCookies: Cookies) => {
  let res = getUserInfo(API_URL, authCookies);
  
  if (res.status === 200 && res.json()) {
    numberOfUserInfoRetrieved.add(true);
  }

  setSleep();
};

export function teardown() {
  // add stuff to do after the test is done, like deleting any temp files, etc...
  Store.dispose();
}
