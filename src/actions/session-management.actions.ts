//#region Puppeteer hates me
import { User } from '@models/user.model';
import { Cookies } from '@models/cookies.model';
import { check } from 'k6';
import http, { ParamsCookieValue } from 'k6/http';
import { setSleep } from '../lib/helpers/sleep.helper';
import { Store } from '../lib/helpers/store.helper';

export function login(user: User, url: string): Cookies {
  let res = http.get(`${url}`);
  
  res = res.submitForm({
    formSelector: 'form',
    fields: {
      UserName: user.userName,
      Password: user.password,
    },
  });
  
  check(res, {
    'successful login': (r) => r.status === 200
  });
  
  let cookies: {[key:string]: string} = {};
  for (const p in res.cookies) {
    const cookie = res.cookies[p][0].value;
    cookies[p] = cookie;
  }
  
  const postUrl = res.html().find('form').first().attr('action') as string;
  const wa = res.html().find('input[name=wa]').first().attr('value') as string;
  const wresult = res.html().find('input[name=wresult]').first().attr('value') as string;
  const wctx = res.html().find('input[name=wctx]').first().attr('value') as string;
  
  res = http.post(postUrl, {
    wa, wresult, wctx
  }, { redirects: 0 });
  
  cookies = {};
  for (const p in res.cookies) {
    const cookie = res.cookies[p][0].value;
    cookies[p] = cookie;
  }
  
  const hasFedAuth = cookies.FedAuth != null && cookies.FedAuth.length > 0;
  const hasFedAuth1 = cookies.FedAuth1 != null && cookies.FedAuth1.length > 0;
  
  check(res, {
    'has fedauth cookie': (r) => hasFedAuth,
    'has fedauth1 cookie': (r) => hasFedAuth1,
  }, { checkTag: 'authentication' });
  
  Store.Instance.setAuthCookies(cookies.FedAuth, cookies.FedAuth1);
  
  setSleep();
  
  return getAuthCookies(cookies);
}

function getAuthCookies(rawCookies: {[key: string]: string}): Cookies {
  return {
    FedAuth: rawCookies['FedAuth'],
    FedAuth1: rawCookies['FedAuth1'],
  };
}
