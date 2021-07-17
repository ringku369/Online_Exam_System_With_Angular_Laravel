import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { SuperadminFundService } from 'src/app/services/superadmin/superadmin-fund.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const now = new Date();

@Component({
  selector: 'app-superadmin-usertouser',
  templateUrl: './superadmin-usertouser.component.html',
  styleUrls: ['./superadmin-usertouser.component.scss']
})
export class SuperadminUsertouserComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  
  form: any = {
    user : null,
    user_id : null,
    amount : 10,
    verifycode: null,
    remarks: 'N/A',


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


  promptAlert() {
    ////console.log('running');
    Swal.fire({
      text: 'Input Varification Code',
      input: 'text',
    }).then((result) => {
      if (result.value) {

        if(this.form.verifycode != result.value){
          this.toastr.error('Invalid varification code, user valid code to continue fund transfer');
          this.spinner.hide();
          return false;
        }


        this.form.verifycode = result.value;
        ////console.log(this.form);
        this.postFundTrToUserConfirm(this.form);

      }
    });
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
    private superadminFundService: SuperadminFundService,

    public parserFormatter: NgbDateParserFormatter, 
    public calendar: NgbCalendar

  )
  {
    this.spinner.show();
  }

  ngOnInit() {
    this.spinner.hide();
    //this.getAllLinkUser();
    //this.selectToday();
  }

  public cloneOptions(options) {
    
    return options.map(option => ({ value: option.value, label: option.label }));
  }

  public users:any = []


  postFundTrToUserConfirm(data){
    this.spinner.show();
    this.superadminFundService.postFundTrToUserConfirm(data).subscribe(
      (response: any) => {
       ////console.log(response);
        this.successMsg(response);
        this.form = {user : null,user_id : null,amount : 10, verifycode: null,remarks: 'N/A'}
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  getAllLinkUser(){
    this.superadminFundService.getAllLinkUser().subscribe(
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
    this.spinner.show();
    ////console.log(this.form);

    //this.form.fdate = this.fdate.year + '-' + (("0" + this.fdate.day).slice(-2)) + '-' + (("0" + this.fdate.month).slice(-2));
    this.form.user_id = this.form.user;
    if(this.form.user == '0'){
      this.toastr.error('Please select user option');
      this.spinner.hide();
      return false;
    }

    if(this.form.amount <= 0 || this.form.amount == null){
      this.toastr.error('Please input amount first');
      this.spinner.hide();
      return false;
    }
    
    this.superadminFundService.postFundTrToUser(this.form).subscribe(
      (response: any) => {
        ////console.log(response[0]);
        //console.log(response[1]);
        ////console.log(response[1].user_id);
        //this.successMsg(response[0]);
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
  }

}