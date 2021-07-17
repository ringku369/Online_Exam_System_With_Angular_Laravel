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
  selector: 'app-admin-mappedexambank',
  templateUrl: './admin-mappedexambank.component.html',
  styleUrls: ['./admin-mappedexambank.component.scss']
})
export class AdminMappedqmappedexambankComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    //name: null,
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
    //this.getMappedqmappedexambank();
    this.spinner.hide();
    this.selectToday();
    this.getBankForDD();

    this.form.type = '';
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public mappedexambanks:any = [];

  public banks:any = [];


  getBankForDD(){
    this.spinner.show();
    this.adminUserService.getBankForDD().subscribe(
      (response: any) => {
        this.banks = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }
  

  bankChange($event, value:string){
    //console.log("the selected value is " + value);
    //////console.log("the selected value is " + $event);


    this.form.bank = value;
    this.form.bank_id = value;
    this.getMappedExamBank(value)
  
  }


  getMappedExamBank(id:any){
    this.adminUserService.getMappedExamBank(id).subscribe(
      (response: any) => {
        //console.log(response);
        this.mappedexambanks = response;
      },
      (error: any) => {
        console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

}
