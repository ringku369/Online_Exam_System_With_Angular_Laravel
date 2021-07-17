import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminMemberComponent} from './admin-member.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMemberRoutingModule { }
