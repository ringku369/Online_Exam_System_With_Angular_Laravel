import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getTree`);
  }

  getDownlinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getDownlinkUser`);
  }

  postAdmin(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/postAdmin`,request);
  }

}
