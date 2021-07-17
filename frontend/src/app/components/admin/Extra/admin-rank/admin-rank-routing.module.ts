import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminRankComponent} from './admin-rank.component';

const routes: Routes = [
  {
    path: '',
    component: AdminRankComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRankRoutingModule { }
