import { NgModule } from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import { CommonModule } from '@angular/common';

import { AdvNotificationRoutingModule } from './adv-notification-routing.module';
import { AdvNotificationComponent } from './adv-notification.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import {ToastyModule} from 'ng2-toasty';

@NgModule({
  imports: [
    AdvNotificationRoutingModule,
    SharedModule,
    ToastyModule.forRoot()
  ],
  exports: [ToastyModule],
  declarations: [AdvNotificationComponent]
})
export class AdvNotificationModule { }
