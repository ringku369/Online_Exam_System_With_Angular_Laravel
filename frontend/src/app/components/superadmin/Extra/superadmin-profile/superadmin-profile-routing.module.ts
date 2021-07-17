import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminProfileComponent} from './superadmin-profile.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminProfileRoutingModule { }
