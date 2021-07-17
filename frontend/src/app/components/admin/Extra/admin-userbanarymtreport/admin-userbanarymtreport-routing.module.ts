import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUserbanarymtreportComponent} from './admin-userbanarymtreport.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUserbanarymtreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserbanarymtreportRoutingModule { }
