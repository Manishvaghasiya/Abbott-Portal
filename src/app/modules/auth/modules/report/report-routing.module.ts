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
          title: 'Report',
          urls: [
            { title: 'Report', url: 'report' },
            { title: 'Report' }
          ]
        },
        component: ReportComponent
      }
    ]
  }
];

export const ReportRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
