import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AuthGuard } from '../../core/guards';

const routes: Routes = [{
  path: '',
  component: FullComponent,
  children: [
    { path: '', redirectTo: 'portal', pathMatch: 'full' },
    // {
    //   path: 'dashboard',
    //   // canActivate: [AuthGuard],
    //   loadChildren: () => import(`./modules/dashboard/dashboard.module`).then(m => m.DashboardModule)
    // },
    {
      path: 'portal',
      // canActivate: [AuthGuard],
      loadChildren: () => import(`./modules/portal/portal.module`).then(m => m.PortalModule)
    },
    {
      path: 'report',
      // canActivate: [AuthGuard],
      loadChildren: () => import(`./modules/report/report.module`).then(m => m.ReportModule)
    }
  ]
}];

export const AuthRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
