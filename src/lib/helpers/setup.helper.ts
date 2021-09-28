import * as env from '../../../environment.json';
import { Environment } from '../models/env.model';
export const environment: Environment = env as Environment;
import * as session from '../../actions/session-management.actions';
import { setSleep } from './sleep.helper';

export function setupHelper() {
  const authCookies = session.login(environment.testUser, environment.baseUrl);
  setSleep();
  return authCookies;
}

