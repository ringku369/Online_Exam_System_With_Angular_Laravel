import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadminUserService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  getSelfProfile(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getSelfProfile`);
  }

  putSelfProfile(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/putSelfProfile`,request);
  }

  putSelfPassword(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/putSelfPassword`,request);
  }

  putSelfPasswordConfirmation(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/putSelfPasswordConfirmation`,request);
  }

}
