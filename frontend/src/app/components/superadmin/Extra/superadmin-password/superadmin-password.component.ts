import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { SuperadminUserService } from 'src/app/services/superadmin/superadmin-user.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const now = new Date();

@Component({
  selector: 'app-superadmin-password',
  templateUrl: './superadmin-password.component.html',
  styleUrls: ['./superadmin-password.component.scss']
})
export class SuperadminPasswordComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  
  form: any = {
    current_password: null,
    password: null,
    confirm_password: null,
    verifycode: null,

  };
  
  emptyMessage(): void{
    this.errors = [];
    this.success = [];
  }
  
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

  
  fdate: NgbDateStruct;
  tdate: NgbDateStruct;
  public date: {year: number, month: number};


  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()
  };

  selectToday() {
    this.fdate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
  // common
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    
    private authservice: AuthService,
    private authtoken: AuthtokenService,
    private authstatus: AuthstatusService,
    private superadminUserService: SuperadminUserService,

    public parserFormatter: NgbDateParserFormatter, 
    public calendar: NgbCalendar

    

  )
  {
    this.spinner.show();
  }

  ngOnInit() {
    //this.getSelfProfile();
    this.spinner.hide();
    //this.selectToday();
  }


  promptAlert() {
    //////console.log('running');
    Swal.fire({
      text: 'Input Varification Code',
      input: 'text',
    }).then((result) => {
      if (result.value) {

        if(this.form.verifycode != result.value){
          this.toastr.error('Invalid varification code, user valid code to continue chage password');
          this.spinner.hide();
          return false;
        }


        this.form.verifycode = result.value;
        //////console.log(this.form);
        this.putSelfPasswordConfirmation(this.form);

      }
    });
  }


  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }

  public users:any = [];
  getSelfProfile(){
    this.superadminUserService.getSelfProfile().subscribe(
      (response: any) => {
        //console.log(response);
        this.form = response;
        if (this.form.gender == null) {
          this.form.gender = '';
        }
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }
  getDownlinkUser(){
    this.superadminUserService.getDownlinkUser().subscribe(
      (response: any) => {
        this.users = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        //////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  confirmAlert() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this imaginary file!',
      //type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Your imaginary file is safe!', 'error');
      } else {
        Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');
      }
    });
  }




  onSubmit(): any {
    this.spinner.show();
    this.superadminUserService.putSelfPassword(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.toastr.success(response[0]);

        this.form= response[1],
        this.spinner.hide();

        this.promptAlert();
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );

    // //confirmation
    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: 'You want to create this account!',
    //   //type: 'warning',
    //   showCloseButton: true,
    //   showCancelButton: true
    // }).then((willDelete) => {
    //   if (willDelete.dismiss) {
    //     Swal.fire('', 'Form submission failed for creating account!', 'error');
    //   } else {
    //     //Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');
    //     this.submitForm();
    //   }
    // });
    // //confirmation

    
  }

  putSelfPasswordConfirmation(request):any {
    this.spinner.show();
    this.superadminUserService.putSelfPasswordConfirmation(request).subscribe(
      (response: any) => {
        //console.log(response);
        this.successMsg(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }

}
