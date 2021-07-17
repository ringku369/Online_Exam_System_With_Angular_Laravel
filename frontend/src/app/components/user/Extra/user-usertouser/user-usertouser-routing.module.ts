import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserUsertouserComponent} from './user-usertouser.component';

const routes: Routes = [
  {
    path: '',
    component: UserUsertouserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserUsertouserRoutingModule { }
