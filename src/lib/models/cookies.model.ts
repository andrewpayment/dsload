import { ParamsCookieValue } from 'k6/http';

export interface Cookies { 
  [name: string]: ParamsCookieValue;
}
