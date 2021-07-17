import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class AdminTreeService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  sendMailToUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/sendMailToUser`);
  }

  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getTree`);
  }

  getSelfTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getSelfTree`);
  }

  getTreeByID(request): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/getTreeByID`,request);
  }

  getDownlinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getDownlinkUser`);
  }

  getDownlinkallUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getDownlinkallUser`);
  }

  getAllLinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getAllLinkUser`);
  }

}
