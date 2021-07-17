import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';

import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth/signin',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./components/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard] , data: { roles: ['Admin'] },
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./components/admin/admin.module').then(module => module.AdminModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard] , data: { roles: ['User'] },
    children: [
      {
        path: 'user',
        loadChildren: () => import('./components/user/user.module').then(module => module.UserModule)
      }
    ]
  },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard] , data: { roles: ['Superadmin'] },
    children: [
      {
        path: 'superadmin',
        loadChildren: () => import('./components/superadmin/superadmin.module').then(module => module.SuperadminModule)
      }
    ]
  },
  
  { path: '**', redirectTo: 'auth/error-404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true, scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
