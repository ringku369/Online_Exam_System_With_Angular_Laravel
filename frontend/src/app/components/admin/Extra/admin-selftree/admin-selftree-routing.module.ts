import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminSelftreeComponent} from './admin-selftree.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSelftreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSelftreeRoutingModule { }
