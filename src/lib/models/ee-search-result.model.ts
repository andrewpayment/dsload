import {EmployeeContactResult} from './employee.model';

export interface EmployeeSearchResult { 
  filterCount: number;
  nav: EmployeeSearchNavResult;
  page: number;
  pageCount: number;
  pageSize: number;
  results: EmployeeContactResult[];
  totalCount: number;
}

export interface EmployeeSearchNavResult { 
  current: EmployeeContactResult;
  first: EmployeeContactResult;
  last: EmployeeContactResult;
  next: EmployeeContactResult;
  prev: EmployeeContactResult;
}
