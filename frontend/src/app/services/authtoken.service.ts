import { Injectable } from '@angular/core';
import { BaseurlService } from './baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class AuthtokenService {

  constructor( private baseurl: BaseurlService ) { }

  private iss = {
    login: `${this.baseurl.geturl()}/login`,
    signup: `${this.baseurl.geturl()}/userregistration`
  };

  set(response: any): any {
    localStorage.setItem('TokenInfo', JSON.stringify(response));
  }

  get(): any {
    return JSON.parse(localStorage.getItem('TokenInfo'));
  }
  remove(): void {
    localStorage.removeItem('TokenInfo');
  }

  isValid(): boolean {
    if ( JSON.parse(localStorage.getItem('TokenInfo')) === null ){
      return false;
    }
    const token = this.get().access_token;
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  payload(token: any): any {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any): any {
    return JSON.parse(atob(payload));
  }

  loggedIn(): boolean {
    return this.isValid();
  }


  roleMatch(allowedRoles:any): boolean {
    //console.log(allowedRoles);
    var isMatch = false;
    var userRoles: string[] = this.get().role;
    allowedRoles.forEach(element => {
      if (userRoles.indexOf(element) > -1) {
        //console.log(element);
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }

}
