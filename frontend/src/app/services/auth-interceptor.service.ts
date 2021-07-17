import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { AuthtokenService } from './authtoken.service';
import { tap } from 'rxjs/operators';
import { AuthstatusService } from './authstatus.service';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(
    private authservice: AuthService,
    private authstatus: AuthstatusService,
    private authtoken: AuthtokenService,
    private router: Router
    ) { }
  tok = 'xxx';
  intercept(request: any, next: any): any{
    if (this.authtoken.isValid()) {
      //console.log('running...');
      //console.log(this.authtoken.get().access_token);
      const tokenizedReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authtoken.get().access_token
        }
      });
      return next.handle(tokenizedReq)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            //console.log(event.status);
          }
        }, error => {
         // http response status code
            //console.error(error.status);
            //console.error(error.message);

            if(error.status == 401){
              this.logout401();
            }
  
        })
      )
    }else{
      const tokenizedReq = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + 'yyy.yyy.yyy'
        }
      });
      return next.handle(tokenizedReq)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            //console.log(event.status);
          }
        }, error => {
            //console.error(error.status);
            //console.error(error.message);
            if(error.status == 401){
              this.logout401();
            }
  
        })
      )
    }

    

  }

  logout401(){
    //this.authservice.postLogout();
    this.authtoken.remove();
    this.authstatus.changeAuthStatus(false);
    //this.router.navigate(['/login']);
    this.router.navigateByUrl('/auth/signin');
  }

}
