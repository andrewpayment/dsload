import { User } from './user.model';

export interface Environment {
  baseUrl: string;
  testUser: User;
}
