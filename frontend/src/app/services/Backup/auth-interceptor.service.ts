import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthtokenService } from './authtoken.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authtoken: AuthtokenService) { }
  tok = 'xxx';
  intercept(request: any, next: any): any{
    if (this.authtoken.isValid()) {
      const tokenizedReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authtoken.get().access_token
        }
      });
      return next.handle(tokenizedReq);
    }else{
      const tokenizedReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + 'yyy.yyy.yyy'
        }
      });
      return next.handle(tokenizedReq);
    }

  }

}
