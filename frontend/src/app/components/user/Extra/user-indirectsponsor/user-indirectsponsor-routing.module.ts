import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserIndirectsponsorComponent} from './user-indirectsponsor.component';

const routes: Routes = [
  {
    path: '',
    component: UserIndirectsponsorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserIndirectsponsorRoutingModule { }
