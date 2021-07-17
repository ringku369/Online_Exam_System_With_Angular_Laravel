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
  selector: 'app-admin-qbankmapping',
  templateUrl: './admin-qbankmapping.component.html',
  styleUrls: ['./admin-qbankmapping.component.scss']
})
export class AdminQqbankmappingmapingComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  isUpdate:boolean = false;
  form: any = {
    checkedList :[],
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
    public calendar: NgbCalendar

    

  )
  {
    //this.spinner.show();


  }

  ngOnInit() {
    //New Code
      this.masterSelected = false;
      this.getCheckedItemList();
    //New Code

    //this.getQqbankmappingmaping();
    this.spinner.hide();
    this.selectToday();
    this.getBankForDD();
    this.getQuestionForUIL();
    this.getQBankMapping();
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }
  public term:any;
  public banks:any = [];

  public questionbanks:any = [];
  
  
  getQBankMapping(){
    this.spinner.show();
    this.adminUserService.getQBankMapping().subscribe(
      (response: any) => {
        //console.log(response);
        this.questionbanks = response;
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  getBankForDD(){
    this.spinner.show();
    this.adminUserService.getBankForDD().subscribe(
      (response: any) => {
        this.banks = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        ////console.log(error);
        this.errorMsg(error.error);
      }
    );
  }


//New Code 
  masterSelected:boolean;
  // checklist:any = [
  //   {id:1,value:'Elenor Anderson',isSelected:false},
  //   {id:2,value:'Caden Kunze',isSelected:true},
  //   {id:3,value:'Ms. Hortense Zulauf',isSelected:true},
  //   {id:4,value:'Grady Reichert',isSelected:false},
  //   {id:5,value:'Dejon Olson',isSelected:false},
  //   {id:6,value:'Jamir Pfannerstill',isSelected:false},
  //   {id:7,value:'Aracely Renner DVM',isSelected:false},
  //   {id:8,value:'Genoveva Luettgen',isSelected:false}
  // ];

  checkedList:any = [];

  checklist:any = [];


  getAllData(){
    return this.checklist;
  }



  checkUncheckAll() {
    for (var i = 0; i < this.checklist.length; i++) {
      this.checklist[i].isSelected = this.masterSelected;
    }
    this.getCheckedItemList();
  }
  isAllSelected() {
    this.masterSelected = this.checklist.every(function(item:any) {
        return item.isSelected == true;
      })
    this.getCheckedItemList();
  }

  getCheckedItemList(){
    this.checkedList = [];
    for (var i = 0; i < this.checklist.length; i++) {
      if(this.checklist[i].isSelected)
      this.checkedList.push(this.checklist[i]);


    }
    this.checkedList = JSON.stringify(this.checkedList);

    

  }

//New Code 

bankChange($event, value:string){
  ////console.log("the selected value is " + value);
  //////console.log("the selected value is " + $event);
  this.masterSelected = false;
  this.form.bank_id = value;
  this.getQuestionForUIL();

}

  
getQuestionForUIL(){
  this.spinner.show();
  this.adminUserService.getQuestionForUIL().subscribe(
    (response: any) => {
      ////console.log(response);
      this.spinner.hide();
      return this.checklist = response;
      
    },
    (error: any) => {
      //console.log(error);
      this.errorMsg(error.error);
    }
  );
}

  submitForm(){
    
    if(this.form.bank == '0'){
      this.toastr.error('Please select question bank title before');
      return false;
    }
    
    if(JSON.parse(this.checkedList).length == 0){
      this.toastr.error('Please select quistion before');
      return false;
    }
    
    this.form.checkedList =JSON.parse(this.checkedList);
    ////console.log(this.form);
    this.spinner.show();
    this.adminUserService.creatQBankMapping(this.form).subscribe(
      (response: any) => {
        ////console.log(response);
        this.masterSelected = false;
        this.checkUncheckAll();
        this.getQBankMapping();
        this.form ={
          checkedList :[],
          bank : '0',
          bank_id : null,
        }
        this.successMsg(response);
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

  deleteForm():any {
    //////console.log(this.form.id);
    this.spinner.show();
    this.adminUserService.deleteQBankMapping(this.form.id).subscribe(
      (response: any) => {
        //this.form.name = null;
        this.isUpdate = false;
        this.successMsg(response);
        this.getQBankMapping();
        this.spinner.hide();
      },
      (error: any) => {
        //////console.log(error);
        this.spinner.hide();
        this.errorMsg(error.error);
      }
    );
  }

}
