import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAboutvcComponent} from './user-aboutvc.component';

const routes: Routes = [
  {
    path: '',
    component: UserAboutvcComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAboutvcRoutingModule { }
