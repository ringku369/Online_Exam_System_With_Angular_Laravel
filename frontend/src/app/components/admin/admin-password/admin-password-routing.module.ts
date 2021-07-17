import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPasswordComponent} from './admin-password.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPasswordRoutingModule { }
