import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        loadChildren: () =>
            import('./remote-entry/login.routes').then((m) => m.loginRoutes),
    },
];
