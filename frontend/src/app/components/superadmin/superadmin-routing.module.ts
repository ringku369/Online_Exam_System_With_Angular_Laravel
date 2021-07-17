import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./superadmin-dashboard/superadmin-dashboard.module').then(module => module.SuperadminDashboardModule)
      }
      // {
      //   path: 'aboutvc',
      //   loadChildren: () => import('./superadmin-aboutvc/superadmin-aboutvc.module').then(module => module.SuperadminAboutvcModule)
      // },
      // {
      //   path: 'tree',
      //   loadChildren: () => import('./superadmin-tree/superadmin-tree.module').then(module => module.SuperadminTreeModule)
      // },
      // {
      //   path: 'selftree',
      //   loadChildren: () => import('./superadmin-selftree/superadmin-selftree.module').then(module => module.SuperadminSelftreeModule)
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () => import('./superadmin-profile/superadmin-profile.module').then(module => module.SuperadminProfileModule)
      // },
      // {
      //   path: 'usercountreport',
      //   loadChildren: () => import('./superadmin-usercountreport/superadmin-usercountreport.module').then(module => module.SuperadminUsercountreportModule)
      // },
      // {
      //   path: 'userprofitreport',
      //   loadChildren: () => import('./superadmin-userprofitreport/superadmin-userprofitreport.module').then(module => module.SuperadminUserprofitreportModule)
      // },
      // {
      //   path: 'userblnupdatereport',
      //   loadChildren: () => import('./superadmin-userblnupdatereport/superadmin-userblnupdatereport.module').then(module => module.SuperadminUserblnupdatereportModule)
      // },
      // {
      //   path: 'userbanarymtreport',
      //   loadChildren: () => import('./superadmin-userbanarymtreport/superadmin-userbanarymtreport.module').then(module => module.SuperadminUserbanarymtreportModule)
      // },
      // {
      //   path: 'usertransactionreport',
      //   loadChildren: () => import('./superadmin-usertransactionreport/superadmin-usertransactionreport.module').then(module => module.SuperadminUsertransactionreportModule)
      // },
      // {
      //   path: 'password',
      //   loadChildren: () => import('./superadmin-password/superadmin-password.module').then(module => module.SuperadminPasswordModule)
      // },
      // {
      //   path: 'member',
      //   loadChildren: () => import('./superadmin-member/superadmin-member.module').then(module => module.SuperadminMemberModule)
      // },
      // {
      //   path: 'directsponsor',
      //   loadChildren: () => import('./superadmin-directsponsor/superadmin-directsponsor.module').then(module => module.SuperadminDirectsponsorModule)
      // },
      // {
      //   path: 'indirectsponsor',
      //   loadChildren: () => import('./superadmin-indirectsponsor/superadmin-indirectsponsor.module').then(module => module.SuperadminIndirectsponsorModule)
      // },
      // {
      //   path: 'usertouser',
      //   loadChildren: () => import('./superadmin-usertouser/superadmin-usertouser.module').then(module => module.SuperadminUsertouserModule)
      // },
      // {
      //   path: 'usertoadmin',
      //   loadChildren: () => import('./superadmin-usertoadmin/superadmin-usertoadmin.module').then(module => module.SuperadminUsertoadminModule)
      // },
      // {
      //   path: 'settings',
      //   loadChildren: () => import('./superadmin-settings/superadmin-settings.module').then(module => module.SuperadminSettingsModule)
      // },
      // {
      //   path: 'notification',
      //   loadChildren: () => import('./adv-notification/adv-notification.module').then(module => module.AdvNotificationModule)
      // },
      // {
      //   path: 'spiner',
      //   loadChildren: () => import('./basic-spinner/basic-spinner.module').then(module => module.BasicSpinnerModule)
      // },
      // {
      //   path: 'sale',
      //   loadChildren: () => import('./dash-sale/dash-sale.module').then(module => module.DashSaleModule)
      // },
      // {
      //   path: 'crm',
      //   loadChildren: () => import('./dash-crm/dash-crm.module').then(module => module.DashCrmModule)
      // },
      // {
      //   path: 'analytics',
      //   loadChildren: () => import('./dash-analytics/dash-analytics.module').then(module => module.DashAnalyticsModule)
      // },
      // {
      //   path: 'project',
      //   loadChildren: () => import('./dash-project/dash-project.module').then(module => module.DashProjectModule)
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperadminRoutingModule { }
