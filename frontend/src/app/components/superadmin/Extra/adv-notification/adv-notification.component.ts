import {Component, OnInit} from '@angular/core';
//import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';

@Component({
  selector: 'app-adv-notification',
  templateUrl: './adv-notification.component.html',
  styleUrls: ['./adv-notification.component.scss']
})
export class AdvNotificationComponent implements OnInit {
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  theme = 'bootstrap';
  type = 'default';
  closeOther = false;
  toastOptions:ToastOptions;

  constructor(private toastyService:ToastyService, private toastyConfig: ToastyConfig) { 
    // Assign the selected theme name to the `theme` property of the instance of ToastyConfig. 
    // Possible values: default, bootstrap, material
    this.toastyConfig.theme = 'material';
}

  ngOnInit() {
  }

  addToast() {
    // Just add default Toast with title only
    this.toastyService.default('Hi there');
    // Or create the instance of ToastOptions
    this.toastOptions = {
        title: "My title",
        msg: "The message",
        showClose: true,
        timeout: 5000,
        theme: 'default',
        onAdd: (toast:ToastData) => {
            console.log('Toast ' + toast.id + ' has been added!');
        },
        onRemove: function(toast:ToastData) {
            console.log('Toast ' + toast.id + ' has been removed!');
        }
    };
    // Add see all possible types in one shot
    this.toastyService.info(this.toastOptions);
    this.toastyService.success(this.toastOptions);
    this.toastyService.wait(this.toastOptions);
    this.toastyService.error(this.toastOptions);
    this.toastyService.warning(this.toastOptions);
}

}
