import { Routes } from '@angular/router';
import { ServerUnavailableComponent, NotFoundComponent, InternalServerErrorComponent } from './shared/components';
import { SkipLoginGuard, AuthGuard } from './core/guards';

export const Approutes: Routes = [
    // {
    //     path: '',
    //     canActivate: [SkipLoginGuard],
    //     loadChildren: () => import('./modules/non-auth/non-auth.module').then(m => m.NonAuthModule)
    // },
    {
        path: '',
        // canActivate: [AuthGuard],
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: '503',
        component: ServerUnavailableComponent,
        data: {
            title: 'Page 503'
        }
    },
    {
        path: '404',
        component: NotFoundComponent,
        data: {
            title: 'Page 404'
        }
    },
    {
        path: '500',
        component: InternalServerErrorComponent,
        data: {
            title: 'Page 500'
        }
    },
    {
        path: '**',
        redirectTo: '404',
        pathMatch: 'full'
    }
];
