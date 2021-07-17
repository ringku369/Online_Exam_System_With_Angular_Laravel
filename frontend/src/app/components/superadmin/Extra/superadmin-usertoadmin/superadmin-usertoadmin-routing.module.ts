import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminUsertoadminComponent} from './superadmin-usertoadmin.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminUsertoadminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminUsertoadminRoutingModule { }
