import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthtokenService } from './authtoken.service';
import { BaseurlService } from './baseurl.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient, private authtoken: AuthtokenService, private baseurl: BaseurlService) { }

  getproducts(produclimit: any): any{
    return this.http.get(`${this.baseurl.geturl()}/productswithlimit/${produclimit.limit}/${produclimit.page}`);
  }

  postMorningTimeSchedules(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/morningtimeschedules`, data);
  }

  postNoonTimeSchedules(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/noontimeschedules`, data);
  }

  postEveningTimeSchedules(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/eveningtimeschedules`, data);
  }


  postBookingDetails(data: any): any{
    return this.http.post(`${this.baseurl.geturl()}/bookedschedules`, data);
  }

}
