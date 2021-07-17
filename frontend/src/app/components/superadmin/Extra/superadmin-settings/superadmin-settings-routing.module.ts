import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SuperadminSettingsComponent} from './superadmin-settings.component';

const routes: Routes = [
  {
    path: '',
    component: SuperadminSettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminSettingsRoutingModule { }
