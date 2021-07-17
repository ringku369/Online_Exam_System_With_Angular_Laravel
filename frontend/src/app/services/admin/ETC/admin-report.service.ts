import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class AdminReportService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


  getSelfProfile(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getSelfProfile`);
  }

  putSelfProfile(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/putSelfProfile`,request);
  }

  putSelfPassword(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/putSelfPassword`,request);
  }

  putSelfPasswordConfirmation(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/putSelfPasswordConfirmation`,request);
  }

  getTree(): any{
    return this.http.get(`${this.baseurl.geturl()}/admin/getTree`);
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
  
  dateWiseSelfDLUser(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/dateWiseSelfDLUser`,request);
  }
  
  dateWiseSelfProfit(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/dateWiseSelfProfit`,request);
  }
  
  dateWiseSelfTransaction(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/dateWiseSelfTransaction`,request);
  }
  
  binaryMatchingReport(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/binaryMatchingReport`,request);
  }

  dateWiseUserBlnUpdate(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/dateWiseUserBlnUpdate`,request);
  }
  
  monthWiseGenerationUpdate(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/admin/monthWiseGenerationUpdate`,request);
  }

}
