import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminDepositComponent} from './admin-deposit.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDepositComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminDepositRoutingModule { }
