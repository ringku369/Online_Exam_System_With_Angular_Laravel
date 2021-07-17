import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminAboutvcComponent} from './superadmin-aboutvc.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminAboutvcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminAboutvcRoutingModule { }
