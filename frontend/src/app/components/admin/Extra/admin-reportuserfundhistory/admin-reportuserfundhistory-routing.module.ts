import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminReportuserfundhistoryComponent} from './admin-reportuserfundhistory.component';

const routes: Routes = [
  {
    path: '',
    component: AdminReportuserfundhistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminReportuserfundhistoryRoutingModule { }
