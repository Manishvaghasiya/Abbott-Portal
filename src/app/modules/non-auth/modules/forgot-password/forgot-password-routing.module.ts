import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './components';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ForgotPasswordComponent
      }
    ]
  }
];

export const ForgotPasswordRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
