import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminUserblnupdatereportComponent} from './superadmin-userblnupdatereport.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminUserblnupdatereportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminUserblnupdatereportRoutingModule { }
