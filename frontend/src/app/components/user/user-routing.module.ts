import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./user-dashboard/user-dashboard.module').then(module => module.UserDashboardModule)
      },
     
      {
        path: 'profile',
        loadChildren: () => import('./user-profile/user-profile.module').then(module => module.UserProfileModule)
      },
      
      {
        path: 'password',
        loadChildren: () => import('./user-password/user-password.module').then(module => module.UserPasswordModule)
      },
      {
        path: 'examresult',
        loadChildren: () => import('./user-examresult/user-examresult.module').then(module => module.UserExamresultModule)
      },
      {
        path: 'examstart',
        loadChildren: () => import('./user-examstart/user-examstart.module').then(module => module.UserExamstartModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
