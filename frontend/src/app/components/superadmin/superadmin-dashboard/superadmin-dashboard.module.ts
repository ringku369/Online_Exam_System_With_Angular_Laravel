import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminDashboardRoutingModule } from './superadmin-dashboard-routing.module';
import { SuperadminDashboardComponent } from './superadmin-dashboard.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { TagInputModule } from 'ngx-chips';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {AngularHighchartsChartModule} from 'angular-highcharts-chart';
import {ChartModule} from 'angular2-chartjs';

@NgModule({
  declarations: [SuperadminDashboardComponent],
  imports: [
    CommonModule,
    SuperadminDashboardRoutingModule,
    SharedModule,
    AngularDualListBoxModule,
    TagInputModule,
    SelectModule,
    FormsModule,
    NgxSpinnerModule,
    NgbDatepickerModule,
    AngularHighchartsChartModule,
    ChartModule
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SuperadminDashboardModule { }
