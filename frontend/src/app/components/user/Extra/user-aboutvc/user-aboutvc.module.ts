import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAboutvcRoutingModule } from './user-aboutvc-routing.module';
import { UserAboutvcComponent } from './user-aboutvc.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { TagInputModule } from 'ngx-chips';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import {NgbAccordionModule, NgbCollapseModule, NgbDatepickerModule, NgbTabsetModule} from '@ng-bootstrap/ng-bootstrap';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {AngularHighchartsChartModule} from 'angular-highcharts-chart';

@NgModule({
  declarations: [UserAboutvcComponent],
  imports: [
    CommonModule,
    UserAboutvcRoutingModule,
    SharedModule,
    AngularDualListBoxModule,
    TagInputModule,
    SelectModule,
    FormsModule,
    NgxSpinnerModule,
    NgbDatepickerModule,
    AngularHighchartsChartModule,
    NgbTabsetModule,
    NgbCollapseModule,
    NgbAccordionModule
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class UserAboutvcModule { }
