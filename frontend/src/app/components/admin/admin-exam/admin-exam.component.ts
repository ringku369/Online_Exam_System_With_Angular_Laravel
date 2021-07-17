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
  selector: 'app-admin-exam',
  templateUrl: './admin-exam.component.html',
  styleUrls: ['./admin-exam.component.scss']
})
export class AdminExamComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    name: null,
    note: 'Answer sheet should be submitted in define time otherwise it\'s will not be eligible',
    fdate: null,
    etime: null,
    duration: null,
    type: '',
    isnegetive: '',
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
    public calendar: NgbCalendar,
    private modalService: NgbModal

    

  )
  {
    this.spinner.show();
  }

  ngOnInit() {
    this.getExam();
    this.spinner.hide();
    this.selectToday();
    this.getBankForDD();

    this.form.type = '';
    this.form.isnegetive = '';
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public exams:any = [];

  public banks:any = [];


  getBankForDD(){
    this.spinner.show();
    this.adminUserService.getBankForDD().subscribe(
      (response: any) => {
        this.banks = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


  getExam(){
    this.spinner.show();
    this.adminUserService.getExam().subscribe(
      (response: any) => {
        //console.log(response);
        this.exams = response;
      },
      (error: any) => {
        console.log(error);
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


    this.form.fdate = this.fdate.year + '-' + (("0" + this.fdate.month).slice(-2)) + '-' + (("0" + this.fdate.day).slice(-2)) ;
    this.form.bank_id = this.form.bank;
    console.log(this.form);
    //return false;


    this.spinner.show();
    this.adminUserService.createExam(this.form).subscribe(
      (response: any) => {
        console.log(response);
        this.form = {
          name: null,
          note: 'Answer sheet should be submitted in define time otherwise it\'s will not be eligible',
          fdate: null,
          etime: null,
          duration: null,
          type: '',
          isnegetive: '',
          bank : '0',
          bank_id : null,
        };
        this.successMsg(response);
        this.getExam();
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
    this.form.duration = data.duration.toString();
    this.form.etime = data.examtime.toString();
    this.form.fdate = data.examdate.toString();
    this.form.bank = data.bank_id.toString();
    this.isUpdate = true;
    window.scrollTo(0, 100);
    //console.log(this.form);
    
  }


  updateForm():any {
   
    this.spinner.show();
    this.adminUserService.updateExam(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.form = {
          name: null,
          note: 'Answer sheet should be submitted in define time otherwise it\'s will not be eligible',
          fdate: null,
          etime: null,
          duration: null,
          type: '',
          isnegetive: '',
          bank : '0',
          bank_id : null,
        };
        this.isUpdate = false;
        this.successMsg(response);
        this.getExam();
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
    this.adminUserService.deleteExam(this.form.id).subscribe(
      (response: any) => {
        this.form = {
          name: null,
          note: 'Answer sheet should be submitted in define time otherwise it\'s will not be eligible',
          fdate: null,
          etime: null,
          duration: null,
          type: '',
          isnegetive: '',
          bank : '0',
          bank_id : null,
        };
        this.isUpdate = false;
        this.successMsg(response);
        this.getExam();
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }


  bankChange($event, value:string){
    ////console.log("the selected value is " + value);
    //////console.log("the selected value is " + $event);
    this.form.bank_id = value;
  
  }

  


  // Modal area
  //public isModal= true;
  //public btnDisabled:boolean = false;

  statusForm = {
    id : null,
    status:null
  }

  public clearTimeVar:any;
  closeResult = '';


  modalClose(){
    //clearTimeout(this.clearTimeVar);
    //this.btnDisabled = false;
    this.modalService.dismissAll();
  }



  setTimeFunction() {
    this.clearTimeVar = setTimeout(() => {  
      //this.btnDisabled = false;
      this.modalService.dismissAll();
    }, 10000);
    
  }


  openLg(content:any, exam:any) {
    this.statusForm.id = exam.id.toString();
    this.statusForm.status = exam.status.toString();

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size : 'lg', scrollable: true}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
    this.modalClose();
  }


  changeStatus(){
    //console.log('changing data...');
    //console.log(this.statusForm);
    this.changeExamStatus();
  }
  // Modal area


  changeExamStatus():any {
    this.spinner.show();
    this.adminUserService.changeExamStatus(this.statusForm).subscribe(
      (response: any) => {
        //console.log(response);
        this.statusForm = {
          id:null,
          status:null
        };

        this.form = {
          name: null,
          note: 'Answer sheet should be submitted in define time otherwise it\'s will not be eligible',
          fdate: null,
          etime: null,
          duration: null,
          type: '',
          isnegetive: '',
          bank : '0',
          bank_id : null,
        };
        this.isUpdate = false;
        this.successMsg(response);
        this.getExam();
        this.spinner.hide();
        this.modalClose();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }


}
