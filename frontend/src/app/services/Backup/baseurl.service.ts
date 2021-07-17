import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseurlService {

  constructor(private http: HttpClient) { }
  //private baseUrl: any = 'https://synergyinterface.com/mxnapi/api';
  //public baseUrl: any = 'http://localhost:8012/php/angular&laravel/covid19/backend/api';
  public baseUrl: any = 'http://localhost:8012/php/angular&laravel/randr/backend/api';
  geturl(): any{
    return this.baseUrl;
  }
  getImagePath(): any{
    return 'https://synergyinterface.com/mxn/storage/app/';
    //return 'http://localhost:8012/php/covid19/backend/storage/app/';
    //return 'http://localhost:8012/php/covid19/backend/storage/app/';
  }
}
