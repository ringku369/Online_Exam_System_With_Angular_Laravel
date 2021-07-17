import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminMemberComponent} from './superadmin-member.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminMemberComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminMemberRoutingModule { }
