import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUserprofitreportComponent} from './admin-userprofitreport.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUserprofitreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserprofitreportRoutingModule { }
