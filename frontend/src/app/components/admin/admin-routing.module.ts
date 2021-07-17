import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./admin-dashboard/admin-dashboard.module').then(module => module.AdminDashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./admin-profile/admin-profile.module').then(module => module.AdminProfileModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./admin-user/admin-user.module').then(module => module.AdminUserModule)
      },
      {
        path: 'teacher',
        loadChildren: () => import('./admin-teacher/admin-teacher.module').then(module => module.AdminTeacherModule)
      },
      {
        path: 'password',
        loadChildren: () => import('./admin-password/admin-password.module').then(module => module.AdminPasswordModule)
      },
      {
        path: 'question',
        loadChildren: () => import('./admin-question/admin-question.module').then(module => module.AdminQuestionModule)
      },
      {
        path: 'option',
        loadChildren: () => import('./admin-option/admin-option.module').then(module => module.AdminOptionModule)
      },
      {
        path: 'answer',
        loadChildren: () => import('./admin-answer/admin-answer.module').then(module => module.AdminAnswerModule)
      },
      {
        path: 'bank',
        loadChildren: () => import('./admin-bank/admin-bank.module').then(module => module.AdminBankModule)
      },
      {
        path: 'qbankmapping',
        loadChildren: () => import('./admin-qbankmapping/admin-qbankmapping.module').then(module => module.AdminQqbankmappingmapingModule)
      },
      {
        path: 'mappedqbank',
        loadChildren: () => import('./admin-mappedqbank/admin-mappedqbank.module').then(module => module.AdminMappedqmappedqbankModule)
      },
      {
        path: 'Individualqb',
        loadChildren: () => import('./admin-mappedexambank/admin-mappedexambank.module').then(module => module.AdminMappedqmappedexambankModule)
      },
      {
        path: 'exam',
        loadChildren: () => import('./admin-exam/admin-exam.module').then(module => module.AdminExamModule)
      },
      {
        path: 'examresult',
        loadChildren: () => import('./admin-examresult/admin-examresult.module').then(module => module.AdminExamresultModule)
      },
      {
        path: 'examstart',
        loadChildren: () => import('./admin-examstart/admin-examstart.module').then(module => module.AdminExamstartModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
