import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminMappedqexamstartComponent} from './admin-examstart.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMappedqexamstartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMappedqexamstartRoutingModule { }
