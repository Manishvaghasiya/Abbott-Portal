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
          title: 'Portal',
          urls: [
            { title: 'Portal', url: 'portal' },
            { title: 'Portal' }
          ]
        },
        component: PortalComponent
      }
    ]
  }
];

export const PortalRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
