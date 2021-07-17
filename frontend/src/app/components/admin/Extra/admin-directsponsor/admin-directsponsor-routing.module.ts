import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminDirectsponsorComponent} from './admin-directsponsor.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDirectsponsorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDirectsponsorRoutingModule { }
