import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminTeacherComponent} from './admin-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTeacherComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTeacherRoutingModule { }
