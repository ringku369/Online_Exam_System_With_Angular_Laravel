import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { AdminUserService } from 'src/app/services/admin/admin-user.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const now = new Date();

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  
  form: any = {
    id: null,
    name: null,
    email: null,
    username: null,
    contact: null,
    profession: null,
    district: null,
    address: null,
    gender: '',
    bank : '0',
    bank_id : null,

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
    private adminUserService: AdminUserService,

    public parserFormatter: NgbDateParserFormatter, 
    public calendar: NgbCalendar

    

  )
  {
    this.spinner.show();
  }

  ngOnInit() {
    this.getSelfProfile();
    this.spinner.hide();
    this.selectToday();
    //this.getBank();
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }

  public users:any = [];
  public banks:any = [];

  getBank(){
    this.adminUserService.getBankForDD().subscribe(
      (response: any) => {
        this.banks = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        ////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


  getSelfProfile(){
    this.adminUserService.getSelfProfile().subscribe(
      (response: any) => {
        //console.log(response);
        this.form = response;
        this.form.bank = response.bank_id.toString();
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

    //console.log(this.form);
    //return false;
    this.submitForm();

    
  }

  submitForm():any {
    this.spinner.show();
    this.adminUserService.putSelfProfile(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.successMsg(response);
        this.getSelfProfile();
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }


  updateForm():any {
    this.spinner.show();
    this.adminUserService.putSelfEmail(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.successMsg(response);
        this.getSelfProfile();
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
