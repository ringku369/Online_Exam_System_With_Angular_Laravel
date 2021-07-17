import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { AuthtokenService } from './authtoken.service';
import { AuthstatusService } from './authstatus.service';
import { BaseurlService } from './baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl = 'http://localhost:8012/php/api/api2/api';

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Accept':'application/json' })
  // };

  constructor(
    private http: HttpClient, private authtoken: AuthtokenService,
    private authstatus: AuthstatusService, private baseurl: BaseurlService) { }

  postLogin(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/login`, data);
  }

  postSignup(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/userregistration`, data);
  }

  postLogout(): any{
    return this.http.post(`${this.baseurl.geturl()}/logout?token=${this.authtoken.get().access_token}`, null);
  }

  getMeInfo(): any {
    return this.http.post(`${this.baseurl.geturl()}/me`, null);
    // return this.http.post(`${this.baseUrl}/me?token=${this.authtoken.get().access_token}`, null);
  }

  signout(): void{
    // this.postLogout();
    this.authtoken.remove();
    this.authstatus.changeAuthStatus(false);
  }

  getRank(): any{
    return this.http.get(`${this.baseurl.geturl()}/getRank`);
  }

  postResetInfo(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/postResetInfo`, data);
  }

  putResetPasswordConfirmation(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/putResetPasswordConfirmation`, data);
  }

  verifycodeCheck(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/verifycodeCheck`, data);
  }

}
