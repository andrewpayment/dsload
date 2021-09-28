import { Environment } from '../lib/models/env.model';

declare module "environment.json" {
  const value: Environment;
  export default value;
}
