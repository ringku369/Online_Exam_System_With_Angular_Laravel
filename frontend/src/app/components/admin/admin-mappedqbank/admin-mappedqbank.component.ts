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
  selector: 'app-admin-mappedqbank',
  templateUrl: './admin-mappedqbank.component.html',
  styleUrls: ['./admin-mappedqbank.component.scss']
})
export class AdminMappedqmappedqbankComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    name: null,

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
    this.getMappedqmappedqbank();
    this.spinner.hide();
    this.selectToday();
    //this.getBranch();

    this.form.type = '';
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public mappedqbanks:any = [];


  getMappedqmappedqbank(){
    this.spinner.show();
    this.adminUserService.getMappedQBank().subscribe(
      (response: any) => {
        //console.log(response);
        this.mappedqbanks = response;
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


  
  delete(data:any):any{
    this.confirmAlert(data);
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
        //this.deleteForm();
      }
    });
  }

  deleteForm():any {
    ////////console.log(this.form.id);
    this.spinner.show();
    this.adminUserService.deleteMappedQBank(this.form.id).subscribe(
      (response: any) => {
        //this.form.name = null;
        this.isUpdate = false;
        this.successMsg(response);
        this.getMappedqmappedqbank();
        this.spinner.hide();
      },
      (error: any) => {
        ////////console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }


}
