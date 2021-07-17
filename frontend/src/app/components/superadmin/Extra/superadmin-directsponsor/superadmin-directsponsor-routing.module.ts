import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminDirectsponsorComponent} from './superadmin-directsponsor.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminDirectsponsorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminDirectsponsorRoutingModule { }
