import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserDirectsponsorComponent} from './user-directsponsor.component';

const routes: Routes = [
  {
    path: '',
    component: UserDirectsponsorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDirectsponsorRoutingModule { }
