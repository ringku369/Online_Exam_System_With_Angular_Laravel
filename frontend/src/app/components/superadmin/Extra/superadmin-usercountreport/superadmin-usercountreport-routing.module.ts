import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminUsercountreportComponent} from './superadmin-usercountreport.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminUsercountreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminUsercountreportRoutingModule { }
