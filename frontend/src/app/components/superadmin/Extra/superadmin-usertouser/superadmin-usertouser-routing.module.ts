import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminUsertouserComponent} from './superadmin-usertouser.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminUsertouserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminUsertouserRoutingModule { }
