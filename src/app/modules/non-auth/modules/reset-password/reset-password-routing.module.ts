import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ResetPasswordComponent
      }
    ]
  }
];

export const ResetPasswordRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
