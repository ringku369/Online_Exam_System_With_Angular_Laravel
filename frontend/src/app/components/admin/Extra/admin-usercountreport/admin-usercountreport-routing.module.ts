import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUsercountreportComponent} from './admin-usercountreport.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsercountreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsercountreportRoutingModule { }
