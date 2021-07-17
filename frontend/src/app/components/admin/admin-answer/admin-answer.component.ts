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
import { interval } from 'rxjs';
const now = new Date();

@Component({
  selector: 'app-admin-answer',
  templateUrl: './admin-answer.component.html',
  styleUrls: ['./admin-answer.component.scss']
})
export class AdminAnswerComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    //name: null,
    question : '0',
    question_id : null,
    option : '0',
    option_id : null,

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
    this.getAnswer();
    this.spinner.hide();
    this.selectToday();
    this.getQuestionForDD();
    //this.getOptionForDD();

    //this.form.type = '';
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public answers:any = [];

  public questions:any = [];
  public options:any = [];


  getQuestionForDD(){
    this.spinner.show();
    this.adminUserService.getQuestionForDD().subscribe(
      (response: any) => {
        this.questions = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  getOptionForDD(id:any){
    this.spinner.show();
    this.adminUserService.getOptionForDD().subscribe(
      (response: any) => {
        this.options = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


  


  getAnswer(){
    this.adminUserService.getAnswer().subscribe(
      (response: any) => {
        //console.log(response);
        this.answers = response;
      },
      (error: any) => {
        ////console.log(error);
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
    //console.log(this.form);
    
    
  }

  submitForm():any {
    if(this.form.question == '0'){
      this.toastr.error('Please select question before');
      return false;
    }
    
    if(this.form.option == '0'){
      this.toastr.error('Please select option before');
      return false;
    }
    this.form.question_id = this.form.question;
    this.form.option_id = this.form.option;
    ////console.log(this.form);
    //return false;


    this.spinner.show();
    this.adminUserService.createAnswer(this.form).subscribe(
      (response: any) => {
        ////console.log(response);
        this.form = {
          name: null,
          question : '0',
          question_id : null,
          option : '0',
          option_id : null,
      
        };
        this.successMsg(response);
        this.getAnswer();
        this.spinner.hide();
      },
      (error: any) => {
        ////console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }



  update(data:any):any{
    
    ////console.log(data);
    this.getOptionForDDWithID(data.question_id.toString());
    //console.log(data);
    
    setTimeout((data) => {

      this.form = data;
      
      this.form.question = data.question_id.toString();
      this.form.question_id = data.question_id.toString();
      this.form.option = data.option['id'].toString();
      this.form.option_id = data.option_id.toString();
      this.isUpdate = true;
    }, 3000);

    
    window.scrollTo(0, 100);
    
    ////console.log(this.form);

    
    
  }


  updateForm():any {
    //console.log(this.form);
    this.spinner.show();
    this.adminUserService.updateAnswer(this.form).subscribe(
      (response: any) => {
        ////console.log(response);
        
        this.isUpdate = false;
        this.successMsg(response);
        this.getAnswer();
        this.spinner.hide();
        
      },
      (error: any) => {
        ////console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }



  delete(data:any):any{
    this.confirmAlert(data);
  }



  deleteForm():any {
    ////console.log(this.form.id);
    this.spinner.show();
    this.adminUserService.deleteAnswer(this.form.id).subscribe(
      (response: any) => {
        //this.form.name = null;
        this.isUpdate = false;
        this.successMsg(response);
        this.getAnswer();
        this.spinner.hide();
      },
      (error: any) => {
        ////console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }


  questionChange($event, value:string){
    //console.log("the selected value is " + value);
    ////console.log("the selected value is " + $event);
    
    this.getOptionForDDWithID(value);

  }

  optionChange($event, value:string){
    ////console.log("the selected value is " + value);
    ////console.log("the selected value is " + $event);
  }


  getOptionForDDWithID(id:any){
    this.spinner.show();
    this.adminUserService.getOptionForDDWithID(id).subscribe(
      (response: any) => {
        //console.log(response);
        this.options = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

}
