import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class SuperadminReportService {

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

  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getTree`);
  }

  getDownlinkUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getDownlinkUser`);
  }

  getSingleUser(): any{
    return this.http.get(`${this.baseurl.geturl()}/superadmin/getSingleUser`);
  }

  createUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/createUser`,request);
  }

  postDirectSponsor(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/postDirectSponsor`,request);
  }
  
  postIndirectSponsor(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/postIndirectSponsor`,request);
  }
  
  dateWiseSelfDLUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/dateWiseSelfDLUser`,request);
  }
  
  dateWiseSelfProfit(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/dateWiseSelfProfit`,request);
  }
  
  dateWiseSelfTransaction(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/dateWiseSelfTransaction`,request);
  }
  
  
  
  binaryMatchingReport(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/binaryMatchingReport`,request);
  }
  
  dateWiseUserBlnUpdate(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/dateWiseUserBlnUpdate`,request);
  }
  
  monthWiseGenerationUpdate(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/superadmin/monthWiseGenerationUpdate`,request);
  }

}
