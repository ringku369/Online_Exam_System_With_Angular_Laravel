import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class UserMemberService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }


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

}
