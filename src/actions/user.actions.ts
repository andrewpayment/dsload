import { check, group } from 'k6';
import { User } from '../lib/models/user.model';
import http from 'k6/http';
import { Cookies } from '@models/cookies.model';

export function getUserInfo(apiUrl: string, authCookies: Cookies) {
  const getUserInfo = `${apiUrl}/account/userinfo`;
  
  return group('Get User Info', () => {
    let res = http.get(getUserInfo, {
      cookies: {
        ...authCookies,
      }
    });
    
    const user = res.status === 200 
      ? res.json() as unknown as User
      : {} as User;
    
    check(res, {
      'has valid user': (r) => user.userId > 0 && user.userName != null,
    });
    
    return res;
  })
}
