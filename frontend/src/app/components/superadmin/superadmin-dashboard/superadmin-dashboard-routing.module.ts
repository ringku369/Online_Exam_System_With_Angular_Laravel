import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminDashboardComponent} from './superadmin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminDashboardRoutingModule { }
