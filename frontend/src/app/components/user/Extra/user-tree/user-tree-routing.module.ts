import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserTreeComponent} from './user-tree.component';

const routes: Routes = [
  {
    path: '',
    component: UserTreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserTreeRoutingModule { }
