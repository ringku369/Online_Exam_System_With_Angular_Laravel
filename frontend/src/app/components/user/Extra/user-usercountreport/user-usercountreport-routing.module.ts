import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserUsercountreportComponent} from './user-usercountreport.component';

const routes: Routes = [
  {
    path: '',
    component: UserUsercountreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUsercountreportRoutingModule { }
