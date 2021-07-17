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
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";

const now = new Date();

@Component({
  selector: 'app-admin-rank',
  templateUrl: './admin-rank.component.html',
  styleUrls: ['./admin-rank.component.scss']
})
export class AdminRankComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  
  isUpdate:boolean = false;

  form: any = {
    id: null,
    name: null,
    basic: null

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
    this.getRank();
    this.spinner.hide();
    this.selectToday();
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;

  public rankes:any = []


  getRank(){
    this.adminUserService.getRank().subscribe(
      (response: any) => {
        //console.log(response);
        this.rankes = response;
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


  confirmAlert(data:any) {
    Swal.fire({
      title: 'Are you sure, You want to delete this data?',
      text: 'Once deleted, you will not be able to recover this data!',
      //type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Form submission failed for deleting item!', 'error');
      } else {
        //Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');

        this.form.id = data.id;
        this.deleteForm();
      }
    });
  }

  submitForm():any {

    //this.toastr.error("You are not authorized to create rank");
    //return false;
    this.spinner.show();
    this.adminUserService.createRank(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.form.basic = null;
        this.successMsg(response);
        this.getRank();
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }


  isInt(n){
    return Number(n) === n && n % 1 === 0;
  }


  
  update(data:any):any{
    this.form = data;
    this.isUpdate = true;
    window.scrollTo(0, 100)
  }


  updateForm():any {
   
    this.spinner.show();
    this.adminUserService.updateRank(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.form.name = null;
        this.form.basic = null;
        this.isUpdate = false;
        this.successMsg(response);
        this.getRank();
        this.spinner.hide();
        
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }



  delete(data:any):any{
    this.toastr.error("You are not authorized to delete rank");
    return false;
    this.confirmAlert(data);
  }



  deleteForm():any {
   console.log(this.form.id);
    this.spinner.show();
    this.adminUserService.deleteRank(this.form.id).subscribe(
      (response: any) => {
        this.form.name = null;
        this.isUpdate = false;
        this.successMsg(response);
        this.getRank();
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
