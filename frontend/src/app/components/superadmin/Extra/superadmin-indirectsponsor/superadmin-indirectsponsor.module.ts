import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminIndirectsponsorRoutingModule } from './superadmin-indirectsponsor-routing.module';
import { SuperadminIndirectsponsorComponent } from './superadmin-indirectsponsor.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { TagInputModule } from 'ngx-chips';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {AmazingTimePickerModule} from 'amazing-time-picker';

@NgModule({
  declarations: [SuperadminIndirectsponsorComponent],
  imports: [
    CommonModule,
    SuperadminIndirectsponsorRoutingModule,
    SharedModule,
    AngularDualListBoxModule,
    TagInputModule,
    SelectModule,
    FormsModule,
    NgxSpinnerModule,
    NgbDatepickerModule,
    AmazingTimePickerModule
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SuperadminIndirectsponsorModule { }
