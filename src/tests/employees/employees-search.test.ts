import { Counter } from 'k6/metrics';
import { Options } from 'k6/options';
import env from '../../../environment.json';
import { Environment } from '../../lib/models/env.model';
const environment: Environment = env as Environment;
import { setupHelper } from '../../lib/helpers/setup.helper';
import { Cookies } from '../../lib/models/cookies.model';
import { setSleep } from '../../lib/helpers/sleep.helper';
import { searchEmployees } from '../../actions/employees/employee.actions';

export let options: Partial<Options> = {
  vus: 3,
  iterations: 10,
  insecureSkipTLSVerify: true,
  
};

let numberOfEESearchesCompleted = new Counter('NumberOfEESearchesCompleted');

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

export default (cookies: Cookies) => {
  const eeId = 320396;
  const isActiveOnly = true;
  const isExcludeTemps = false;
  const sortBy = 'name';
  let res = searchEmployees(API_URL, cookies, eeId, isActiveOnly, isExcludeTemps, sortBy);
  
  setSleep();
  
  if (res.status === 200 && res.json()) {
    numberOfEESearchesCompleted.add(true);
  }
}
