import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { AdminUserService } from 'src/app/services/admin/admin-user.service';
//import { AdminReportService } from 'src/app/services/admin/admin-report.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators";
//import { PDFDocument } from 'pdf-lib';

declare var require: any
const FileSaver = require('file-saver');

const now = new Date();

@Component({
  selector: 'app-admin-reportfundhistory',
  templateUrl: './admin-reportfundhistory.component.html',
  styleUrls: ['./admin-reportfundhistory.component.scss']
})
export class AdminReportfundhistoryComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  
  form: any = {
    fdate: null,
    todate: null,
    mydate: null,

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
  mydate: NgbDateStruct;
  public date: {year: number, month: number};


  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()
  };

  selectToday() {
    this.fdate = {year: now.getFullYear(), month: now.getMonth() + 0, day: now.getDate()};
    this.tdate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
    this.mydate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
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
    this.spinner.hide();
    this.selectToday();
  }
  


  onSubmit(): any {
    this.spinner.show();
    this.form.fdate = this.fdate.year + '-' + (("0" + this.fdate.month).slice(-2)) + '-' + (("0" + this.fdate.day).slice(-2)) ;

    this.form.todate = this.tdate.year + '-' +  (("0" + this.tdate.month).slice(-2)) + '-' + (("0" + this.tdate.day).slice(-2));
    ////console.log(this.form);
    //this.spinner.hide();

    this.OnSubmitChild();

  }


  term:any;
  users:any = [];
  deposites:any = [];
  OnSubmitChild(){
    this.adminUserService.dateWiseFundTrnHistory(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.deposites = response;
        //this.successMsg(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }



  PrintDiv(){
    var divToPrint = document.getElementsByClassName('widget-content')[0];
    var popupWin = window.open('invoice', '_blank', 'width=100%,height=auto,location=no,left=200px');
    popupWin.document.open();
    popupWin.document.write('<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"></head><body onload="window.print()">' + divToPrint.innerHTML + '</body></html>');
    popupWin.document.close();
  }


}
