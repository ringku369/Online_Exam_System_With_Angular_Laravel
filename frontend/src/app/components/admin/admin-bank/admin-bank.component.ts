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
  selector: 'app-admin-bank',
  templateUrl: './admin-bank.component.html',
  styleUrls: ['./admin-bank.component.scss']
})
export class AdminBankComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    name: null,
    //branch : '0',
    //branch_id : null,

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
    
    this.getBank();
    this.selectToday();
    //this.getBranch();

    this.form.type = '';
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public banks:any = [];

  public branches:any = [];


  // getBranch(){
  //   this.adminUserService.getBranchForDD().subscribe(
  //     (response: any) => {
  //       this.branches = this.cloneOptions(response);
  //       this.spinner.hide();
  //     },
  //     (error: any) => {
  //       ////console.log(error);
  //       this.errorMsg(error.error);
  //     }
  //   );
  // }


  getBank(){
    //this.spinner.show();
    this.adminUserService.getBank().subscribe(
      (response: any) => {
        //console.log(response);
        this.banks = response;
        this.spinner.hide();
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
    this.form.branch_id = this.form.branch;
    //console.log(this.form);
    //return false;


    this.spinner.show();
    this.adminUserService.createBank(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.form = {
          name: null,
      
        };
        this.successMsg(response);
        this.getBank();
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
    //this.form.branch = data.branch_id.toString();
    this.isUpdate = true;
    window.scrollTo(0, 100);
    //console.log(this.form);
    
  }


  updateForm():any {
   
    this.spinner.show();
    this.adminUserService.updateBank(this.form).subscribe(
      (response: any) => {
        //console.log(response);
        this.form = {
          name: null,
      
        };
        this.isUpdate = false;
        this.successMsg(response);
        this.getBank();
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
    this.adminUserService.deleteBank(this.form.id).subscribe(
      (response: any) => {
        this.form.name = null;
        this.isUpdate = false;
        this.successMsg(response);
        this.getBank();
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
