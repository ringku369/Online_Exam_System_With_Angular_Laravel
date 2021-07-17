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
  selector: 'app-admin-teacher',
  templateUrl: './admin-teacher.component.html',
  styleUrls: ['./admin-teacher.component.scss']
})
export class AdminTeacherComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
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
    //type: '',
    
    //balance: null,

    //bank : '0',
    //bank_id : null,
    //rank : '0',
    //rank_id : null,
    password : null,
    password_confirmation : null,

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
    private adminTeacherService: AdminUserService,

    public parserFormatter: NgbDateParserFormatter, 
    public calendar: NgbCalendar

    

  )
  {
    this.spinner.show();
  }

  ngOnInit() {
    this.getTeacher();
    this.spinner.hide();
    this.selectToday();
    //this.getBank();

    this.form.type = '';
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public teachers:any = [];

  public banks:any = [];
  public ranks:any = [];


  // getBank(){
  //   this.adminTeacherService.getBankForDD().subscribe(
  //     (response: any) => {
  //       this.banks = this.cloneOptions(response);
  //       this.spinner.hide();
  //     },
  //     (error: any) => {
  //       ////console.log(error);
  //       this.errorMsg(error.error);
  //     }
  //   );
  // }


  getTeacher(){
    this.adminTeacherService.getTeacher().subscribe(
      (response: any) => {
        //console.log(response);
        this.teachers = response;
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
    //this.form.bank_id = this.form.bank;
    //this.form.rank_id = this.form.rank;
    //console.log(this.form);
    //return false;


    this.spinner.show();
    this.adminTeacherService.createTeacher(this.form).subscribe(
      (response: any) => {
        //console.log(response);
     
        this.form = {
          id: null,
          name: null,
          email: null,
          username: null,
          contact: null,
          profession: null,
          district: null,
          address: null,
          gender: '',
          //type: '',
          
          //balance: null,
      
          //bank : '0',
          //bank_id : null,
          //rank : '0',
          //rank_id : null,
          password : null,
          password_confirmation : null,
      
        };
        this.successMsg(response);
        this.getTeacher();
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
    this.form.id = data.id.toString();
    // this.form.balance = data.balance.toString();
    // this.form.bank = data.bank_id.toString();
    // this.form.rank = data.rank_id.toString();


    // this.form.bank_id = data.bank_id.toString();
    // this.form.rank_id = data.rank_id.toString();
    this.isUpdate = true;
    window.scrollTo(0, 100);
    //console.log(this.form);

  }


  updateForm():any {
    console.log(this.form);
    this.spinner.show();
    this.adminTeacherService.updateTeacher(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.form = {
          id: null,
          name: null,
          email: null,
          username: null,
          contact: null,
          profession: null,
          district: null,
          address: null,
          gender: '',
          //type: '',
          
          //balance: null,
      
          //bank : '0',
          //bank_id : null,
          //rank : '0',
          //rank_id : null,
          password : null,
          password_confirmation : null,
      
        };
        this.isUpdate = false;
        this.successMsg(response);
        this.getTeacher();
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
    this.adminTeacherService.deleteTeacher(this.form.id).subscribe(
      (response: any) => {
        this.form.name = null;
        this.isUpdate = false;
        this.successMsg(response);
        this.getTeacher();
        this.spinner.hide();
      },
      (error: any) => {
        console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }

}
