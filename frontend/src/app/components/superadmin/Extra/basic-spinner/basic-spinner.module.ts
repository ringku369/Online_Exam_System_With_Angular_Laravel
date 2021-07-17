import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicSpinnerRoutingModule } from './basic-spinner-routing.module';
import { BasicSpinnerComponent } from './basic-spinner.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [BasicSpinnerComponent],
  imports: [
    CommonModule,
    BasicSpinnerRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class BasicSpinnerModule { }
