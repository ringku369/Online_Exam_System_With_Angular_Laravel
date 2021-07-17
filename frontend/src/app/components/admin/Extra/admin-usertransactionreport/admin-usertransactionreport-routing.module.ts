import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUsertransactionreportComponent} from './admin-usertransactionreport.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsertransactionreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsertransactionreportRoutingModule { }
