import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserUserbanarymtreportComponent} from './user-userbanarymtreport.component';

const routes: Routes = [
  {
    path: '',
    component: UserUserbanarymtreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUserbanarymtreportRoutingModule { }
