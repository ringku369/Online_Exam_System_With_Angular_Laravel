import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminQuestionComponent} from './admin-question.component';

const routes: Routes = [
  {
    path: '',
    component: AdminQuestionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminQuestionRoutingModule { }
