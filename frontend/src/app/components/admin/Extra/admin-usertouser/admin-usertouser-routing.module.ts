import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminUsertouserComponent} from './admin-usertouser.component';

const routes: Routes = [
  {
    path: '',
    component: AdminUsertouserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminUsertouserRoutingModule { }
