import { Routes } from '@angular/router';

import { FullComponent } from '../layouts/full/full.component';
import { LoginComponent } from '../pages-component/login/login.component';
import { SinglePageAssigneeFamilyInfo } from '../layouts/single-pages/assignee-and-family-info.component';


export const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'assigneeAndFamilyInfo',
    component: SinglePageAssigneeFamilyInfo
  },
  {
    path: 'assigneeAndFamilyInfo/:id',
    component: SinglePageAssigneeFamilyInfo
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      // {
      //   path: '',
      //   loadChildren: () => import('../material-component/material.module').then(m => m.MaterialComponentsModule)
      // },
      {
        path: '',
        loadChildren: () => import('../pages-component/material.module').then(m => m.MaterialComponentsModule)
      }
    ]
  }
];
