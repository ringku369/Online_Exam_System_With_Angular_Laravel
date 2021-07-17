import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from './authtoken.service';
import { BaseurlService } from './baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }

  GetProfileInfo(): any{
    // return this.http.post(`${this.baseurl.geturl()}/userdetails?token=${this.authtoken.get().access_token}`, null);
    return this.http.post(`${this.baseurl.geturl()}/userdetails`, null);
  }
}
