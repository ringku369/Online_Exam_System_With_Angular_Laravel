import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminTreeComponent} from './admin-tree.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminTreeRoutingModule { }
