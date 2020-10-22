import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        data: {
          title: 'Login',
          urls: [
            { title: 'Login', url: 'login' },
            { title: 'Login' }
          ]
        },
        component: LoginComponent
      }
    ]
  }
];

export const LoginRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
