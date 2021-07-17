import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

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
