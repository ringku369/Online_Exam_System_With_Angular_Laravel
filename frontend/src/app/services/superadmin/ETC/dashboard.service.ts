import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from '../authtoken.service';
import { BaseurlService } from '../baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }

  // GetProfileInfo(): any{
  //   // return this.http.post(`${this.baseurl.geturl()}/userdetails?token=${this.authtoken.get().access_token}`, null);
  //   return this.http.post(`${this.baseurl.geturl()}/userdetails`, null);
  // }

  getAppointedItems(): any{
    return this.http.post(`${this.baseurl.geturl()}/getappointeditems`, null);
  }

  getAppointedItemsWithDate(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/getappointeitemwithdate`, request);
  }

  cancelAppointeItem(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/cancelappointeitem`, request);
  }

  deleteAppointeItem(request:any): any{
    return this.http.post(`${this.baseurl.geturl()}/deleteappointeitem`, request);
  }

}
