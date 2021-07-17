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
  selector: 'app-admin-option',
  templateUrl: './admin-option.component.html',
  styleUrls: ['./admin-option.component.scss']
})
export class AdminOptionComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    question : '0',
    question_id : null,
    options : []

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
    this.getOption();
    this.spinner.hide();
    this.selectToday();
    this.getQuestionForDD();

    //this.form.type = '';
    
    this.fieldArray.push(this.newAttribute);
    this.newAttribute = {name:null};

  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public options:any = [];
  public questions:any = [];


  // New Code 
  fieldArray: Array<any> = [];
  newAttribute: any = {name:null};

  addFieldValue() {
    if (this.fieldArray.length <= 3) {
      this.fieldArray.push(this.newAttribute);
      this.newAttribute = {name:null};
    } else {
      this.toastr.error('Option can not be added more');
    }
  }

  deleteFieldValue(index) {
    this.fieldArray.splice(index, 1);
  }

  // New Code 


  getQuestionForDD(){
    this.spinner.show();
    this.adminUserService.getQuestionForDD().subscribe(
      (response: any) => {
        this.questions = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        ////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


  getOption(){
    this.adminUserService.getOption().subscribe(
      (response: any) => {
        //console.log(response);
        this.options = response;
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




  onSubmit(): any {
    console.log(this.form);
    //this.submitForm();
  }

  submitForm():any {
    if(this.form.question == '0'){
      this.toastr.error('Please select question before');
      return false;
    }
    this.form.question_id = this.form.question;
    //console.log(this.fieldArray);
    this.form.options = this.fieldArray;
    console.log(this.form);
    //return false;


    this.spinner.show();
    this.adminUserService.createOption(this.form).subscribe(
      (response: any) => {
        console.log(response);
        this.form = {
          options: [],
          question : '0',
          question_id : null
      
        };
        this.fieldArray = [];
        this.fieldArray.push(this.newAttribute = {name:null});
        //this.newAttribute = {name:null};
        this.successMsg(response);
        this.getOption();
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }



  update(data:any):any{
    
    //console.log(data);

    this.form = data;
    this.form.question = data.question_id.toString();
    this.fieldArray.splice(0, 1);
    this.fieldArray.push(this.newAttribute = {name:data.name});
    this.form.options = this.fieldArray;
    this.isUpdate = true;
    window.scrollTo(0, 100);
    //console.log(this.form);
    
  }


  updateForm():any {
   
    this.spinner.show();
    this.adminUserService.updateOption(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.form = {
          options: [],
          question : '0',
          question_id : null
      
        };
        this.fieldArray = [];
        this.fieldArray.push(this.newAttribute = {name:null});
        //this.newAttribute = {name:null};
        this.isUpdate = false;
        this.successMsg(response);
        this.getOption();
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
    this.confirmAlert(data);
  }



  deleteForm():any {
    //console.log(this.form.id);
    this.spinner.show();
    this.adminUserService.deleteOption(this.form.id).subscribe(
      (response: any) => {
        this.form.name = null;
        this.isUpdate = false;
        this.successMsg(response);
        this.getOption();
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
