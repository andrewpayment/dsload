import { ParamsCookieValue } from 'k6/http';


export class Store { 
  private static instance: Store;
  static get Instance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }
  fedAuth: ParamsCookieValue;
  fedAuth1: ParamsCookieValue;
  
  get authCookies(): {[name: string]: ParamsCookieValue} {
    return {
      FedAuth: this.fedAuth,
      FedAuth1: this.fedAuth1,
    };
  }

  constructor(fedauth: string = '', fedauth1: string = '') {
    if (fedauth) {
      this.fedAuth = { value: fedauth };
    }
    if (fedauth1) {
      this.fedAuth1 = { value: fedauth1 };
    }
  }
  
  setAuthCookies(fedauth: string, fedauth1: string) {
    this.fedAuth = { value: fedauth };
    this.fedAuth1 = { value: fedauth1 };
  }
  
  static dispose() { 
    if (Store.instance) {
      Store.instance = null;
    }
  }
  
}
