import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminSettingsRoutingModule } from './superadmin-settings-routing.module';
import { SuperadminSettingsComponent } from './superadmin-settings.component';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [SuperadminSettingsComponent],
  imports: [
    CommonModule,
    SuperadminSettingsRoutingModule,
    SharedModule,
    NgxSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SuperadminSettingsModule { }
