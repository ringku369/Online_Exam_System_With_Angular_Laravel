import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUserblnupdatereportComponent} from './admin-userblnupdatereport.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUserblnupdatereportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUserblnupdatereportRoutingModule { }
