import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminAboutvcComponent} from './admin-aboutvc.component';

const routes: Routes = [
  {
    path: '',
    component: AdminAboutvcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminAboutvcRoutingModule { }
