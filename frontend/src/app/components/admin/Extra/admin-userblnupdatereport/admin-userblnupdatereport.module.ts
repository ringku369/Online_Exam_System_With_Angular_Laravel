import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminUserblnupdatereportRoutingModule } from './admin-userblnupdatereport-routing.module';
import { AdminUserblnupdatereportComponent } from './admin-userblnupdatereport.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { TagInputModule } from 'ngx-chips';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {AmazingTimePickerModule} from 'amazing-time-picker';
import {DataTablesModule} from 'angular-datatables';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AdminUserblnupdatereportComponent],
  imports: [
    CommonModule,
    AdminUserblnupdatereportRoutingModule,
    SharedModule,
    AngularDualListBoxModule,
    TagInputModule,
    SelectModule,
    FormsModule,
    NgxSpinnerModule,
    NgbDatepickerModule,
    DataTablesModule,
    Ng2SearchPipeModule,
    AmazingTimePickerModule
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AdminUserblnupdatereportModule { }