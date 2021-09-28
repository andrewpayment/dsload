import { Counter } from 'k6/metrics';
import { Options } from 'k6/options';
import { environment, setupHelper } from '../../lib/helpers/setup.helper';
import { Cookies } from '../../lib/models/cookies.model';
import { getEmployeeTimePolicyConfiguration } from '../../actions/employees/employee.actions';
import { setSleep } from '../../lib/helpers/sleep.helper';

export let options: Partial<Options> = {
  vus: 3,
  iterations: 10,
  insecureSkipTLSVerify: true,
  thresholds: {
    'checks{checkTag:authentication}': ['rate>0.9'],
  },
}

let numberOfEETimePolicyConfigsRetrieved = new Counter("NumberOfEETimePolicyConfigsRetrieved");

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

export default (authCookies: Cookies) => {
  let res = getEmployeeTimePolicyConfiguration(API_URL, authCookies, environment.testUser.lastEmployeeId);
  
  setSleep();
  
  if (res.status === 200 && res.json()) {
    numberOfEETimePolicyConfigsRetrieved.add(true);
  }
}
