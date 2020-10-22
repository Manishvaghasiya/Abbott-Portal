import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NonAuthLayoutComponent } from './non-auth-layout.component';
import { SkipLoginGuard } from '../../core/guards';

const routes: Routes = [
  {
    path: '', component: NonAuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'login',
        // canActivate: [SkipLoginGuard],
        loadChildren: () => import(`./modules/login/login.module`).then(m => m.LoginModule)
      },
      {
        path: 'forgot-password',
        loadChildren: () => import(`./modules/forgot-password/forgot-password.module`).then(m => m.ForgotPasswordModule)
      },
      {
        path: 'reset-password',
        loadChildren: () => import(`./modules/reset-password/reset-password.module`).then(m => m.ResetPasswordModule)
      }
    ]
  }
];

export const NonAuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
