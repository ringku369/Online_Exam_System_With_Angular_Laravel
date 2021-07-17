import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminMappedqmappedexambankComponent} from './admin-mappedexambank.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMappedqmappedexambankComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMappedqmappedexambankRoutingModule { }
