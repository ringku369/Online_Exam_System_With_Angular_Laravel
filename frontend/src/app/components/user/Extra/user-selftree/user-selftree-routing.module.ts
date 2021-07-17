import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserSelftreeComponent} from './user-selftree.component';

const routes: Routes = [
  {
    path: '',
    component: UserSelftreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSelftreeRoutingModule { }
