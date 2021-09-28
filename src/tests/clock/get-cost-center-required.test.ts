import { Counter } from 'k6/metrics';
import { Options } from 'k6/options';
import { environment, setupHelper } from '../../lib/helpers/setup.helper';
import { Cookies } from '../../lib/models/cookies.model';
import {getCostCenterSelectionRequired} from '../../actions/clock/cost-center.actions';
import { setSleep } from '../../lib/helpers/sleep.helper';

export let options: Partial<Options> = {
  vus: 3,
  iterations: 10,
  insecureSkipTLSVerify: true,
  thresholds: {
    'checks{checkTag:authentication}': ['rate>0.9'],
  },
}

let numberOfCostCenterSelectionRequiredReceived = new Counter('NumberOfCostCenterSelectionRequiredReceived');

const API_URL = `${environment.baseUrl}/api/clock/costcenterrequired`;

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
  let res = getCostCenterSelectionRequired(environment.testUser.lastClientId, API_URL, cookies);
  
  setSleep();
  
  if (res.status === 200) {
    numberOfCostCenterSelectionRequiredReceived.add(true);
  }
}
