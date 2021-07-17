import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminQqbankmappingmapingComponent} from './admin-qbankmapping.component';

const routes: Routes = [
  {
    path: '',
    component: AdminQqbankmappingmapingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminQqbankmappingmapingRoutingModule { }
