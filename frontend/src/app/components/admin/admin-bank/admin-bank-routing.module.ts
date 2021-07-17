import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminBankComponent} from './admin-bank.component';

const routes: Routes = [
  {
    path: '',
    component: AdminBankComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminBankRoutingModule { }
