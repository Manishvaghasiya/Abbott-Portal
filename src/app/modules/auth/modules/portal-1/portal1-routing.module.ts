import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Portal1Component } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'Portal 1',
          urls: [
            { title: 'Portal 1', url: 'portal 1' },
            { title: 'Portal 1' }
          ]
        },
        component: Portal1Component
      }
    ]
  }
];

export const Portal1RoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
