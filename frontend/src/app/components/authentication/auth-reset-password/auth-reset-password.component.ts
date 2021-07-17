import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-auth-reset-password',
  templateUrl: './auth-reset-password.component.html',
  styleUrls: ['./auth-reset-password.component.scss']
})
export class AuthResetPasswordComponent implements OnInit {

  
  // common
  success =  [];
  errors = [];

  successMsg(msg: any): any{
    for (let index = 0; index < msg.length; index++) {
      const element = msg[index];
      this.toastr.success(element);
    }
  }


  errorMsg(msg: any): any{
    for (let index = 0; index < msg.length; index++) {
      const element = msg[index];
      this.toastr.error(element);
    }
  }

  form: any = {
    current_password: null,
    password: null,
    confirm_password: null,
    verifycode: null,
    username: null,
    email: null
  
  };

  emptyMessage(): void{
    this.errors = [];
    this.success = [];
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


  isContinue : boolean = false;

  promptAlert() {
    Swal.fire({
      text: 'Input Varification Code',
      input: 'text',
    }).then((result) => {
      if (result.value == null) {
        this.toastr.error('Inpute varification code');
        return false;
      }else{
        this.form.verifycode = result.value;
        this.verifycodeCheck();
      }

    });
  }


  verifycodeCheck(){
    this.spinner.show();
    this.authservice.verifycodeCheck(this.form).subscribe(
      (response: any) => {
        this.spinner.hide();
        //console.log(response);
        this.putResetPasswordConfirmation(this.form);
      },
      (error: any) => {
        this.spinner.hide();
        this.errorMsg(error.error);
        console.log(error.error);
      }
    );
  }



  onSubmit(): any {
    //console.log(this.form);
    this.spinner.show();
    
    this.authservice.postResetInfo(this.form).subscribe(
      (response: any) => {
        console.log(response);

        this.toastr.success(response[0]);

        this.form= response[1],
        this.spinner.hide();

        this.promptAlert();
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        // this.emptyMessage();
        // this.errors = error.error;
        this.errorMsg(error.error);
      }
    );

  }


  putResetPasswordConfirmation(request):any {
    this.spinner.show();
    this.authservice.putResetPasswordConfirmation(request).subscribe(
      (response: any) => {
        //console.log(response);
        this.successMsg(response);
        this.spinner.hide();

        this.form = {
          current_password: null,
          password: null,
          confirm_password: null,
          verifycode: null,
          username: null,
          email: null
        };

        setTimeout(() => {
          this.router.navigate(['/auth/signin']);
        }, 3000);
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }


  

}
