import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserMappedqexamstartComponent} from './user-examstart.component';

const routes: Routes = [
  {
    path: '',
    component: UserMappedqexamstartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMappedqexamstartRoutingModule { }
