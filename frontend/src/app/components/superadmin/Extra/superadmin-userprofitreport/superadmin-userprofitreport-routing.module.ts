import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminUserprofitreportComponent} from './superadmin-userprofitreport.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminUserprofitreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminUserprofitreportRoutingModule { }
