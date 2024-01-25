import { Route } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';
import { authGuard } from '@nx-dynamic-mf/shared/data-access';

export const appRoutes: Route[] = [
    {
        path: 'login',
        loadChildren: () => import('login/Routes').then((m) => m.loginRoutes),
    },
    {
        path: '',
        component: NxWelcomeComponent,
        canActivate: [authGuard]
    },
];
