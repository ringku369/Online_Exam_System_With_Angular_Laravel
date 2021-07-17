import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminMappedqmappedqbankComponent} from './admin-mappedqbank.component';

const routes: Routes = [
  {
    path: '',
    component: AdminMappedqmappedqbankComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminMappedqmappedqbankRoutingModule { }
