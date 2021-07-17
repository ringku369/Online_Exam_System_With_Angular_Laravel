import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadminTreeService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  sendMailToUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/sendMailToUser`);
  }

  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getTree`);
  }

  getSelfTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getSelfTree`);
  }

  getTreeByID(request): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/getTreeByID`,request);
  }

  getDownlinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getDownlinkUser`);
  }

  getDownlinkallUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getDownlinkallUser`);
  }

  getAllLinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getAllLinkUser`);
  }

}
