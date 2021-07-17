import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { UserTreeService } from 'src/app/services/user/user-tree.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';
const now = new Date();

@Component({
  selector: 'app-user-selftree',
  templateUrl: './user-selftree.component.html',
  styleUrls: ['./user-selftree.component.scss']
})
export class UserSelftreeComponent implements OnInit {
  
  // common
  success =  [];
  errors = [];
  


  form: any = {
    user : '0',
    id : null,
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
    private userTreeService: UserTreeService,
  )
  {
    this.spinner.show();
  }

  public parents:any = [];
  public udata:any = {};


  ngOnInit() {
    //this.spinner.hide();
    //this.getTree();
    this.getSelfTree();
    //this.getDownlinkallUser();
  }

  public cloneOptions(options) {
    return options.map(option => ({ value: option.value, label: option.label }));
  }

  public users:any = [];
  getDownlinkallUser(){
    //this.spinner.show();

    this.userTreeService.getDownlinkallUser().subscribe(
      (response: any) => {
        this.users = this.cloneOptions(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  selectOnChange(user_id){
    //console.log("the selected value is " + event );

    if(user_id == '0'){
      this.toastr.error('Please select any doun link user');
      return false;
    }
    this.udata = {};
    this.form.id = user_id;
    this.getUserData(this.form);
  }

  getUserData(udata){
    this.spinner.show();
    this.userTreeService.getTreeByID(udata).subscribe(
      (response: any) => {
        this.parents = response;
        //console.log(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  getSelfTree(){
    this.userTreeService.getSelfTree().subscribe(
      (response: any) => {
        this.parents = response;
        //console.log(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  getTree(){
    this.userTreeService.getTree().subscribe(
      (response: any) => {
        this.parents = response;
        //console.log(response);
        this.spinner.hide();
      },
      (error: any) => {
        //console.log(error);
        this.errorMsg(error.error);
      }
    );
  }

  parentClick(event:any){
    this.udata = event;
  }

  child1Click(event:any){
    this.udata = event;
  }

  child2Click(event:any){
    this.udata = event;
  }

  child3Click(event:any){
    this.udata = event;
  }

  child4Click(event:any){
    this.udata = event;
  }

  child5Click(event:any){
    this.udata = event;
  }

  child6Click(event:any){
    this.udata = event;
  }

  child7Click(event:any){
    this.udata = event;
  }

  child8Click(event:any){
    this.udata = event;
  }

  child9Click(event:any){
    this.udata = event;
  }


}
