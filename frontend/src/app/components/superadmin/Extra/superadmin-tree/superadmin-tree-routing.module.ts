import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminTreeComponent} from './superadmin-tree.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminTreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminTreeRoutingModule { }
