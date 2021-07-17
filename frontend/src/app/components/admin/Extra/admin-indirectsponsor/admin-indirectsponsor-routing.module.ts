import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminIndirectsponsorComponent} from './admin-indirectsponsor.component';

const routes: Routes = [
  {
    path: '',
    component: AdminIndirectsponsorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminIndirectsponsorRoutingModule { }
