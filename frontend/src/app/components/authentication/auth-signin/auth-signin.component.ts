import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';

//import { TestService } from 'src/app/services/test.service';

import { BaseurlService } from 'src/app/services/baseurl.service';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent implements OnInit {

  // common
success =  [];
errors = [];

form: any = {
  username: null,
  password: null,
};

emptyMessage(): void{
  this.errors = [];
  this.success = [];
}

errorMsg(msg: any): any{
  // tslint:disable-next-line: prefer-for-of
  for (let index = 0; index < msg.length; index++) {
    const element = msg[index];
    this.toastr.error(element);
  }
}
// common

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    
    private authservice: AuthService,
    private authtoken: AuthtokenService,
    private authstatus: AuthstatusService,
  ){ }

  ngOnInit() {
  }

  onSubmit(): any {
    //console.log(this.testSer.geturl());
    this.spinner.show();
    this.authservice.postLogin(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        //this.spinner.hide();
        this.authtoken.set(response);
        this.authstatus.changeAuthStatus(true);
        if(this.authtoken.roleMatch(['Superadmin'])){
          this.router.navigate(['/superadmin/dashboard']);
        }else if(this.authtoken.roleMatch(['Admin'])){
          this.router.navigate(['/admin/dashboard']);
        }else if(this.authtoken.roleMatch(['User'])){
          this.router.navigate(['/user/dashboard']);
        }

        
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
        // this.emptyMessage();
        // this.errors = error.error;
        this.errorMsg(error.error);
      }
    );
  }

}
