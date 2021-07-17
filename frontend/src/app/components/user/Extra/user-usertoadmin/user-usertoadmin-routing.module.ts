import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserUsertoadminComponent} from './user-usertoadmin.component';

const routes: Routes = [
  {
    path: '',
    component: UserUsertoadminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUsertoadminRoutingModule { }
