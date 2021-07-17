import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { UserUserService } from 'src/app/services/user/user-user.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const now = new Date();

@Component({
  selector: 'app-user-directsponsor',
  templateUrl: './user-directsponsor.component.html',
  styleUrls: ['./user-directsponsor.component.scss']
})
export class UserDirectsponsorComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  
  form: any = {
    name: null,
    email: null,
    mobile: null,
    //user : '0',
    //user_id : null,
    position : "",
    //username : null,
    password : null,
    password_confirmation : null,

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
    private userUserService: UserUserService,

    public parserFormatter: NgbDateParserFormatter, 
    public calendar: NgbCalendar

    

  )
  {
    this.spinner.show();
  }

  ngOnInit() {
    this.spinner.hide();
    //this.getDownlinkUser();
    //this.selectToday();
  }

  public cloneOptions(options) {
    
    return options.map(option => ({ value: option.value, label: option.label }));
  }

  public users:any = []


  getDownlinkUser(){
    this.userUserService.getDownlinkUser().subscribe(
      (response: any) => {
        this.users = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        ////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


  onSubmit(): any {

    if(this.form.password !=this.form.password_confirmation ){
      this.toastr.error('Password does not match, please try again');
      return false;
    }
    //confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to create this account!',
      //type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Form submission failed for creating account!', 'error');
      } else {
        //Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');
        this.submitForm();
      }
    });
    //confirmation


    
  }


  submitForm():any {
    this.spinner.show();
    this.userUserService.postDirectSponsor(this.form).subscribe(
      (response: any) => {
        ////console.log(response);
        this.successMsg(response);
        this.form = {name: null,email: null,mobile: null,position:'',password:null,conpassword:null,password_confirmation:null};
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
