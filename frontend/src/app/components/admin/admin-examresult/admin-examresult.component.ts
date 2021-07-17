import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { AdminUserService } from 'src/app/services/admin/admin-user.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct, NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


import {ColorPickerService, Rgba} from 'ngx-color-picker';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js';
const now = new Date();

@Component({
  selector: 'app-admin-examresult',
  templateUrl: './admin-examresult.component.html',
  styleUrls: ['./admin-examresult.component.scss']
})
export class AdminExamresultComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    name: null

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
    public calendar: NgbCalendar,
    private modalService: NgbModal

    

  )
  {
    this.spinner.show();
  }

  ngOnInit() {
    this.getExamresult();
    this.spinner.hide();
    this.selectToday();

  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public examresults:any = [];


  getExamresult(){
    this.spinner.show();
    this.adminUserService.getExamresult().subscribe(
      (response: any) => {
        //console.log(response);
        this.examresults = response;
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


  examReqData = {};

  getResult(data:any){
    this.examReqData = data;
    //console.log(data);
    this.getExamAnsSheet();
  }


  

  resultListArea:boolean = false;
  answersheets:any = [];

  getExamAnsSheet(){
    this.spinner.show();
    
    this.adminUserService.getExamAnsSheet(this.examReqData).subscribe(
      (response: any) => {
        
        this.answersheets = response;
        this.getTotal(response);
        this.resultListArea = true;
        //this.successMsg(response);
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
        //console.log(error.error);
        this.errorMsg(error.error);
      }
    );
  }

  marks:any = 0;

  getTotal(response):void{
    if(response!=undefined){
      response.forEach(element => {
        //console.log(element);
        //console.log(element.mark);
        this.marks +=element.mark;
      });   
    }

    //console.log(this.marks);
  }



}
