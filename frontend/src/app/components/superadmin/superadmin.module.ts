import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperadminRoutingModule } from './superadmin-routing.module';
import {SharedModule} from '../../theme/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    SuperadminRoutingModule,
    SharedModule
  ]
})
export class SuperadminModule { }
