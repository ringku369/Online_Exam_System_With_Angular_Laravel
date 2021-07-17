import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class UserReportService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  getSelfProfile(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getSelfProfile`);
  }

  putSelfProfile(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/putSelfProfile`,request);
  }

  putSelfPassword(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/putSelfPassword`,request);
  }

  putSelfPasswordConfirmation(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/putSelfPasswordConfirmation`,request);
  }

  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/user/getTree`);
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
  
  dateWiseSelfDLUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/dateWiseSelfDLUser`,request);
  }
  
  dateWiseSelfProfit(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/dateWiseSelfProfit`,request);
  }
  
  dateWiseSelfTransaction(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/dateWiseSelfTransaction`,request);
  }
  
  binaryMatchingReport(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/user/binaryMatchingReport`,request);
  }

}
