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
          title: 'Abbott Portal',
          urls: [
            { title: 'Abbott Portal', url: 'portal' },
            { title: 'Abbott Portal' }
          ]
        },
        component: PortalComponent
      }
    ]
  }
];

export const PortalRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
