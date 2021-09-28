import { check, group } from 'k6';
import http from 'k6/http';
import { Cookies } from '../../lib/models/cookies.model';

export function getCostCenterSelectionRequired(clientId: number, apiUrl: string, cookies: Cookies) {
  apiUrl = `${apiUrl}/api/clock/costcenterequired/${clientId}`;
  
  return group('Get Cost Center Selection Required', () => {
    let res = http.get(apiUrl, {
      cookies: {...cookies},
    })
    
    check(res, {
      'get cost center selection required': (r) => r.status === 200,
    });
    
    return res;
  });
}
