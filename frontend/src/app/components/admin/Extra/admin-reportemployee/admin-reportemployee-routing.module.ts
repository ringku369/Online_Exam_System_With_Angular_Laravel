import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminReportemployeeComponent} from './admin-reportemployee.component';

const routes: Routes = [
  {
    path: '',
    component: AdminReportemployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminReportemployeeRoutingModule { }
