import { Component, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { NxWelcomeComponent } from './nx-welcome.component';

import { UserService } from '@nx-dynamic-mf/shared/data-access-user';

@Component({
    standalone: true,
    imports: [NxWelcomeComponent, RouterModule],
    selector: 'nx-dynamic-mf-root',
    template: `
        <div class="dashboard-nav">Admin Dashboard</div>
        @if (isLoggedIn()) {
            <div>You are authenticated so you can see this content.</div>
        } @else {
            <router-outlet></router-outlet>
        }
    `,
})
export class AppComponent {
    isLoggedIn = this.userService.isUserLoggedIn;

    navigate = effect(() => {
        if (!this.userService.isUserLoggedIn()) {
            this.router.navigateByUrl('login');
        } else {
            this.router.navigateByUrl('');
        }
    });

    constructor(
        private userService: UserService,
        private router: Router,
    ) {}
}
