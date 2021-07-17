import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-superadmin-settings',
  templateUrl: './superadmin-settings.component.html',
  styleUrls: ['./superadmin-settings.component.scss']
})
export class SuperadminSettingsComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
    ) { }

  ngOnInit() {
  }

  btnOpen(){
    console.log('Open');
    this.spinner.show();
    this.toastr.success('This is success message');
  }
  

  btnClose(){
    console.log('Close');
    this.spinner.hide();
    this.toastr.success('This is success message');
  }

}
