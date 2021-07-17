import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminExamresultComponent} from './admin-examresult.component';

const routes: Routes = [
  {
    path: '',
    component: AdminExamresultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminExamresultRoutingModule { }
