import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-basic-spinner',
  templateUrl: './basic-spinner.component.html',
  styleUrls: ['./basic-spinner.component.scss']
})
export class BasicSpinnerComponent implements OnInit {
  public btnLoader: boolean;
  public submitLoader: boolean;

  constructor(private spinner: NgxSpinnerService) {
    this.btnLoader = false;
    this.submitLoader = false;
  }

  ngOnInit() {
  }

  ShowSpin(){
    console.log("ShowSpin");
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);
  }

  onBtnLoader() {
    this.btnLoader = true;
    setTimeout(() => {
      this.btnLoader = false;
    }, 2000);
  }

  onSubmitLoader() {
    this.submitLoader = true;
    setTimeout(() => {
      this.submitLoader = false;
    }, 2000);
  }

}
