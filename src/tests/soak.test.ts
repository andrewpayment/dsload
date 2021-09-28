import { Options } from 'k6/options';
import getUserTest from './get-user.test';
import { Cookies } from '@models/cookies.model';
import { setupHelper } from '../lib/helpers/setup.helper';
import employeeSearchTest from './employees/employees-search.test';
import getEmployeeTimePolicyConfiguration from './employees/get-employee-time-policy-config.test';

export let options: Partial<Options> = {
  // number of virtual users
  vus: 10,
  // iterations: 10,
  
  // needed in development environments because self-signed https certs will error here:
  // WARN[0006] Request Failed: x509 certificate has expired or is not yet valid
  insecureSkipTLSVerify: true,
  
  stages: [
    { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 60 users over 5 minutes.
    { duration: '10m', target: 125 }, // stay at 60 users for 10 minutes
    { duration: '3m', target: 175 }, // ramp-up to 100 users over 3 minutes (peak hour starts)
    { duration: '2m', target: 175 }, // stay at 100 users for short amount of time (peak hour)
    { duration: '3m', target: 125 }, // ramp-down to 60 users over 3 minutes (peak hour ends)
    { duration: '10m', target: 100 }, // continue at 60 for additional 10 minutes
    { duration: '5m', target: 0 }, // ramp-down to 0 users
  ],
  
  thresholds: {
    'http_req_duration': ['avg < 500', 'p(93) < 1500'],
  },
};

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

export default function(authCookies: Cookies) {
  getUserTest(authCookies);
  employeeSearchTest(authCookies);
  getEmployeeTimePolicyConfiguration(authCookies);
}

