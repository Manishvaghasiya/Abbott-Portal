import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'Abbott Report',
          urls: [
            { title: 'Abbott Report', url: 'report' },
            { title: 'Abbott Report' }
          ]
        },
        component: ReportComponent
      }
    ]
  }
];

export const ReportRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
