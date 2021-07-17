import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class AdminFundService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getTree`);
  }

  getAllLinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getAllLinkUser`);
  }

  getAdminLinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getAdminLinkUser`);
  }

  getDownlinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getDownlinkUser`);
  }

  getSingleUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getSingleUser`);
  }

  createUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/createUser`,request);
  }

  postDirectSponsor(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/postDirectSponsor`,request);
  }
  
  postIndirectSponsor(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/postIndirectSponsor`,request);
  }
  
  postFundTrToUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/postFundTrToUser`,request);
  }
  
  postFundTrToUserConfirm(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/postFundTrToUserConfirm`,request);
  }
  
  postFundTrToAdmin(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/postFundTrToAdmin`,request);
  }
  
  postFundTrToAdminConfirm(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/postFundTrToAdminConfirm`,request);
  }

}
