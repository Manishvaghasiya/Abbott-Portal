import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from '../../core/guards';

const routes: Routes = [{
  path: '',
  component: FullComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    {
      path: 'dashboard',
      // canActivate: [AuthGuard],
      loadChildren: () => import(`./modules/dashboard/dashboard.module`).then(m => m.DashboardModule)
    },
    {
      path: 'portal1',
      // canActivate: [AuthGuard],
      loadChildren: () => import(`./modules/portal-1/portal1.module`).then(m => m.Portal1Module)
    }
  ]
}];

export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
