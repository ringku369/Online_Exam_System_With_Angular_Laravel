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
  selector: 'app-admin-examstart',
  templateUrl: './admin-examstart.component.html',
  styleUrls: ['./admin-examstart.component.scss']
})
export class AdminMappedqexamstartComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    examdata : []
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
    this.getActiveExam();
    //this.spinner.hide();
    this.selectToday();
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }

  cacheArea:boolean = true;
  examListArea:boolean = true;
  examTypeTT:boolean = false;
  examTypeQT:boolean = false;



  public term:any;
  public exams:any = [];

  
  getActiveExam(){
    this.spinner.show();
    this.adminUserService.getActiveExam().subscribe(
      (response: any) => {
        ////////console.log(response);
        this.exams = response;
        this.spinner.hide();
      },
      (error: any) => {
        ////////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

// Cache area
  sessiondata = {
    status : '10',
    id: '1'
  }

  putCacheData(){
    this.adminUserService.putCacheData(this.sessiondata).subscribe(
      (response: any) => {
        //////console.log(response);
      },
      (error: any) => {
        //////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  getCacheData(){
    this.adminUserService.getCacheData().subscribe(
      (response: any) => {
        //////console.log(response);
      },
      (error: any) => {
        //////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  forgetCacheData(){
    this.adminUserService.forgetCacheData(this.sessiondata).subscribe(
      (response: any) => {
        //////console.log(response);
      },
      (error: any) => {
        //////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }
// Cache area

examReqData = {};

examRequest(data:any){
  this.examReqData = data;
  this.confirmAlert(data);

  //console.log(this.examReqData)
}
confirmAlert(data:any) {
  Swal.fire({
    title: `Are you sure want to give this exam? `,
    text: `Once click ok, exam will be started! exam total time :  ${data.duration} minutes &  ${data.note}`,
    //type: 'warning',
    showCloseButton: true,
    showCancelButton: true
  }).then((willDelete) => {
    if (willDelete.dismiss) {
      Swal.fire('', 'Exam could not be started!', 'error');
    } else {
      //Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');

      //this.form.id = data.id;
      this.examListArea = false;
      this.getExamQuestionData(data);
    }
  });
}


getExamQuestionData(data:any){
  //////console.log(data);
  this.spinner.show();
  this.adminUserService.getExamQuestionData(data).subscribe(
    (response: any) => {
      ////console.log(response);
      this.examquestions = response;
      this.spinner.hide();
    },
    (error: any) => {
      //console.log(error);
      this.examReqData = {};
      this.examquestions = [];
      this.form = { examdata : [] };
      this.itemArray = [];
      this.examListArea = true;
      this.spinner.hide();
      this.errorMsg(error.error);
    }
  );
}




// Exam question  Data
  checkedList:any = [];
  checklist:any = [];
  // examquestions:any = [{
  //   question:null,
  //   question_id:null,
  //   option:[{
  //     option_id:null,
  //     Option:null,
  //   }]}
  // ];
  examquestions:any = [];


  item:any = {};

  itemArray = [];



  isQesSelected(item:any){
    if(item.isSelected == true){
      this.itemArray.push(item);
    }else{
      this.itemArray.forEach((element,index)=>{
        if(element.option_id==item.option_id) this.itemArray.splice(index,1);
     });
    }
    //////console.log(this.itemArray);

    this.form.examdata = this.itemArray;

    //this.postExamQuestionData();
  }


  submitQuestionData(){
    this.spinner.show();
    if(this.itemArray.length == 0){
      this.toastr.error('There is no answer of question! please make answer at list one questin');
      this.spinner.hide();
      return false;
    }

    ////console.log(this.form);

    this.adminUserService.postExamQuestionData(this.form).subscribe(
      (response: any) => {
        //////console.log(response);
        this.examListArea = true;
        this.successMsg(response);
        this.examquestions = [];
        this.form = { examdata : [] };
        this.itemArray = [];
        
        //this.spinner.hide();

        // this.clearTimeVar = setTimeout(() => {  
        //   //this.makeExamQuestionAnSheet();
        //   ////console.log(this.examReqData);
        // }, 100);

        this.makeExamQuestionAnSheet();
        
      },
      (error: any) => {
        //console.log(error);
        //this.examReqData = {};
        this.examquestions = [];
        this.form = { examdata : [] };
        this.itemArray = [];
        this.examListArea = true;
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }

  clearTimeVar:any;
  // setTimeFunction() {
  //   this.clearTimeVar = setTimeout(() => {  
      
  //   }, 10000);
  // }

  makeExamQuestionAnSheet(){
    this.spinner.show();
    
    this.adminUserService.makeExamQuestionAnSheet(this.examReqData).subscribe(
      (response: any) => {
        //console.log(response);
        //this.examReqData = {};
        this.form = { examdata : [] };
        this.itemArray = [];
        this.successMsg(response);
        this.spinner.hide();
        clearTimeout(this.clearTimeVar);
        this.getExamAnsSheet();
      },
      (error: any) => {
        //console.log(error);
        //this.examReqData = {};
        this.form = { examdata : [] };
        this.itemArray = [];
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }


  resultListArea:boolean = false;
  answersheets:any = [];

  getExamAnsSheet(){
    this.spinner.show();
    
    this.adminUserService.getExamAnsSheet(this.examReqData).subscribe(
      (response: any) => {
        //console.log(response);
        this.answersheets = response;
        this.getTotal(response);
        this.resultListArea = true;
        this.examListArea = false;
        this.examReqData = {};
        //this.successMsg(response);
        this.spinner.hide();
        clearTimeout(this.clearTimeVar);
      },
      (error: any) => {
        //console.log(error);
        this.examReqData = {};
        this.spinner.hide();
        ////console.log(error.error);
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





  demodata = {id:8,user_id:3};
  makeExamAnswerSheet(){
    //this.spinner.show();
    
    this.adminUserService.makeExamQuestionAnSheet(this.demodata).subscribe(
      (response: any) => {
        //console.log(response);
        //this.examReqData = {};
        this.form = { examdata : [] };
        this.itemArray = [];
        this.successMsg(response);
        this.spinner.hide();
        clearTimeout(this.clearTimeVar);

        this.getExamAnsSheet();
      },
      (error: any) => {
        //console.log(error);
        //this.examReqData = {};
        this.form = { examdata : [] };
        this.itemArray = [];
        this.spinner.hide();
        ////console.log(error.error);
        this.errorMsg(error.error);
      }
    );
  }


  delete(data:any):any{
    this.confirDelete(data);
  }


  confirSubmit() {
    Swal.fire({
      title: 'Are you sure, You want to submit this data?',
      text: 'Once submit, exam result will be calculated autometically and displayed!',
      //type: 'warning',
      showCloseButton: true,
      showCancelButton: true
    }).then((willDelete) => {
      if (willDelete.dismiss) {
        Swal.fire('', 'Form submission failed for deleting item!', 'error');
      } else {
        //Swal.fire('', 'Poof! Your imaginary file has been deleted!', 'success');

        this.submitQuestionData();
      }
    });
  }

  confirDelete(data:any) {
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

  deleteForm():any {
    ////console.log(this.form.id);
    this.spinner.show();
    this.adminUserService.userExdata(this.form.id).subscribe(
      (response: any) => {
        this.examquestions = [];
        this.form = { examdata : [] };
        this.itemArray = [];
        this.successMsg(response);
        this.getActiveExam();
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
