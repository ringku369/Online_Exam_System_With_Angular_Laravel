import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class UserTreeService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  sendMailToUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/sendMailToUser`);
  }

  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getTree`);
  }

  getSelfTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getSelfTree`);
  }

  getTreeByID(request): any{
    return this.http.post(`${this.baseurl.geturl()}/user/getTreeByID`,request);
  }

  getDownlinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getDownlinkUser`);
  }

  getDownlinkallUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getDownlinkallUser`);
  }

}
