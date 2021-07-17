import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminExamComponent} from './admin-exam.component';

const routes: Routes = [
  {
    path: '',
    component: AdminExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminExamRoutingModule { }
