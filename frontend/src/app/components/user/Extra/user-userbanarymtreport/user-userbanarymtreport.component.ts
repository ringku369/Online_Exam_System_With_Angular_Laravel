import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { UserReportService } from 'src/app/services/user/user-report.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const now = new Date();

@Component({
  selector: 'app-user-userbanarymtreport',
  templateUrl: './user-userbanarymtreport.component.html',
  styleUrls: ['./user-userbanarymtreport.component.scss']
})
export class UserUserbanarymtreportComponent implements OnInit {
  
  dtExportButtonOptions: any = {};
  dtColumnsReorderOptions: any = {};
  dtResponsiveOptions: any = {};
  dtRowSelectOptions: any = {};
  dtRouterLinkOptions: any = {};

  


  // common
  success =  [];
  errors = [];
  
  form: any = {
    fdate: null,
    todate: null,

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
    this.tdate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
  // common
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    
    private authservice: AuthService,
    private authtoken: AuthtokenService,
    private authstatus: AuthstatusService,
    private userReportService: UserReportService,

    public parserFormatter: NgbDateParserFormatter, 
    public calendar: NgbCalendar

  )
  {
    this.spinner.show();
  }

  isShow:boolean = false;

  ngOnInit() {
    this.spinner.hide();
    this.selectToday();

    this.OnSubmitChild();
  }

  onSubmit(): any {
    //console.log("Reloading...");
    this.spinner.show();
    this.form.fdate = this.fdate.year + '-' + (("0" + this.fdate.month).slice(-2)) + '-' + (("0" + this.fdate.day).slice(-2)) ;

    this.form.todate = this.tdate.year + '-' +  (("0" + this.tdate.month).slice(-2)) + '-' + (("0" + this.tdate.day).slice(-2));
    ////console.log(this.form);
    //this.spinner.hide();

    this.OnSubmitChild();

  }


  term:any;
  users:any = [];
  OnSubmitChild(){
    this.spinner.show();
    this.sum = 0;
    this.userReportService.binaryMatchingReport(this.form).subscribe(
      (response: any) => {
        this.users = response;
        //console.log(response);
        this.spinner.hide();

        this.getTotal(response);
        

      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }

  sum = 0;

  getTotal(response):void{
    if(response!=undefined){
      response.forEach(element => {
        this.sum+=element.amount;
      });   
    }
  }

}
