import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminPasswordComponent} from './superadmin-password.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminPasswordRoutingModule { }
