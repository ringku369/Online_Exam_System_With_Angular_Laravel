import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminOptionComponent} from './admin-option.component';

const routes: Routes = [
  {
    path: '',
    component: AdminOptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminOptionRoutingModule { }
