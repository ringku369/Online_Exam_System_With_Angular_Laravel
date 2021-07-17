import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUsertoadminComponent} from './admin-usertoadmin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsertoadminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsertoadminRoutingModule { }
