import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class UserFundService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getTree`);
  }

  getAllLinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getAllLinkUser`);
  }

  getAdminLinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getAdminLinkUser`);
  }

  getDownlinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getDownlinkUser`);
  }

  getSingleUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getSingleUser`);
  }

  createUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/createUser`,request);
  }

  postDirectSponsor(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/postDirectSponsor`,request);
  }
  
  postIndirectSponsor(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/postIndirectSponsor`,request);
  }
  
  postFundTrToUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/postFundTrToUser`,request);
  }
  
  postFundTrToUserConfirm(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/postFundTrToUserConfirm`,request);
  }
  
  postFundTrToAdmin(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/postFundTrToAdmin`,request);
  }
  
  postFundTrToAdminConfirm(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/postFundTrToAdminConfirm`,request);
  }

}
