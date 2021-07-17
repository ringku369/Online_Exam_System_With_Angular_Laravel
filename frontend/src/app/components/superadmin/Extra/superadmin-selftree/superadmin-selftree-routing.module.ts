import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminSelftreeComponent} from './superadmin-selftree.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminSelftreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminSelftreeRoutingModule { }
