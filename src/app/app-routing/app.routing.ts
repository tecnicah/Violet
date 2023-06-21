import { Routes } from '@angular/router';

import { FullComponent } from '../layouts/full/full.component';
import { LoginComponent } from '../pages-component/login/login.component';
import { SinglePageAssigneeFamilyInfo } from '../layouts/single-pages/assignee-and-family-info.component';
import { PrintLsfComponent } from '../pages-component/dialog/print-lsf/print-lsf.component';
import { PrintLdComponent  } from '../pages-component/dialog/print-ld/print-ld.component';
import { PrintIrComponent } from '../pages-component/dialog/print-ir/print-ir.component';

export const AppRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'printlsf/:id/:service_detail_id/:tenant/:city/:country/:type', 
    component: PrintLsfComponent 
  },
  {
    path: 'printld/:id/:service_detail_id/:tenant/:city/:country/:type', 
    component: PrintLdComponent 
  },
  {
    path: 'printir/:id/:service_detail_id/:tenant/:city/:country/:type', 
    component: PrintIrComponent 
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
