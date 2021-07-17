import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserReportuserfundhistoryComponent} from './user-reportuserfundhistory.component';

const routes: Routes = [
  {
    path: '',
    component: UserReportuserfundhistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserReportuserfundhistoryRoutingModule { }
