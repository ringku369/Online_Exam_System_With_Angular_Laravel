import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminIndirectsponsorComponent} from './superadmin-indirectsponsor.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminIndirectsponsorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminIndirectsponsorRoutingModule { }
