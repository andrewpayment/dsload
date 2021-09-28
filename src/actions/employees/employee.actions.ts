import http from 'k6/http';
import { Cookies } from '../../lib/models/cookies.model';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { EmployeeSearchResult } from '../../lib/models/ee-search-result.model';
import { check, group } from 'k6';
import { CheckPunchTypeResult } from '../../lib/models/check-punch-type-result.model';

export function searchEmployees(apiUrl: string, cookies: Cookies, employeeId: number,
  isActiveOnly: boolean, isExcludeTemps: boolean, sortBy: string) {
  const searchUrl = `${apiUrl}/employees/search`;
  const url = new URL(searchUrl);
  
  url.searchParams.append('employeeId', employeeId);
  url.searchParams.append('isActiveOnly', isActiveOnly);
  url.searchParams.append('isExcludeTemps', isExcludeTemps);
  url.searchParams.append('sortBy', sortBy);
  
  return group('Search Employees', () => {
    let res = http.get(url.toString(), {
      cookies: {
        ...cookies,
      },
    });
    
    const eeSearchResult = res.status === 200 
      ? res.json() as unknown as EmployeeSearchResult
      : {} as EmployeeSearchResult;
      
    check(res, {
      'has valid search result': (r) => eeSearchResult != null &&
        eeSearchResult.totalCount != null,
    })
    
    return res;
  })
}

export function getEmployeeTimePolicyConfiguration(apiUrl: string, cookies: Cookies,
  employeeId: number, ipCheck: boolean = false, includeConfig: boolean = true, punch: Date = null) {
  apiUrl = `${apiUrl}/api/clock/punch-detail/${employeeId}`;
  const url = new URL(apiUrl);
  
  url.searchParams.append('ip', ipCheck);
  url.searchParams.append('config', includeConfig);
  // url.searchParams.append('punch', ) // this is null by default on the controller
  
  return group('ClockController.GetNextPunchDetail', () => {
    let res = http.get(url.toString(), {
      cookies: {
        ...cookies,
      },
    })
    
    const detail = res.status === 200 
      ? res.json() as unknown as CheckPunchTypeResult
      : {} as CheckPunchTypeResult;
      
    check(res, {
      'has clock config': (r) => detail.employeeClockConfiguration && 
        detail.employeeClockConfiguration.employeeId > 0,
    })
    
    return res;
  })
}
