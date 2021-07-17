import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseurlService {

  constructor(private http: HttpClient) { }
  //public baseUrl: any = 'http://127.0.0.1/backend/api';

  //public baseUrl: any = 'http://localhost:8012/php/angularlaravel/primx/backend/api';
  //public baseUrl: any = 'http://18.224.246.226/primx/backend/api';
  public baseUrl: any = 'http://localhost:8012/php/angularlaravel/softbd/backend/api';
  //public baseUrl: any = 'https://sabbirulislam.com/softbd/backend/api';
  geturl(): any{
    return this.baseUrl;
  }
  getImagePath(): any{
    //return 'https://synergyinterface.com/mxn/storage/app/';
  }
}
