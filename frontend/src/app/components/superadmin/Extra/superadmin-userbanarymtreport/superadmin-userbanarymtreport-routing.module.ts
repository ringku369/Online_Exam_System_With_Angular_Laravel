import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminUserbanarymtreportComponent} from './superadmin-userbanarymtreport.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminUserbanarymtreportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminUserbanarymtreportRoutingModule { }
