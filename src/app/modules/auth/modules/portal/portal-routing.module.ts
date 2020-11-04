import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './components/portal.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'Abbott Search',
          urls: [
            { title: 'Abbott Search', url: 'portal' },
            { title: 'Abbott Search' }
          ]
        },
        component: PortalComponent
      }
    ]
  }
];

export const PortalRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
