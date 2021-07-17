import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminBranchComponent} from './admin-branch.component';

const routes: Routes = [
  {
    path: '',
    component: AdminBranchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBranchRoutingModule { }
