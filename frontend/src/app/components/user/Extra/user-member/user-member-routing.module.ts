import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserMemberComponent} from './user-member.component';

const routes: Routes = [
  {
    path: '',
    component: UserMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMemberRoutingModule { }
