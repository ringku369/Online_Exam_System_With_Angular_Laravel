import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserExamresultComponent} from './user-examresult.component';

const routes: Routes = [
  {
    path: '',
    component: UserExamresultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserExamresultRoutingModule { }
