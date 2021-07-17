import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserUsertransactionreportComponent} from './user-usertransactionreport.component';

const routes: Routes = [
  {
    path: '',
    component: UserUsertransactionreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUsertransactionreportRoutingModule { }
