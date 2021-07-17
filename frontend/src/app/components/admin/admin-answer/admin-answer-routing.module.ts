import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminAnswerComponent} from './admin-answer.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAnswerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAnswerRoutingModule { }
