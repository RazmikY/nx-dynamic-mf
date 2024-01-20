import { Component, effect } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { UserService } from '@nx-dynamic-mf/shared/data-access';
import { NxWelcomeComponent } from './nx-welcome.component';


@Component({
    standalone: true,
    imports: [NxWelcomeComponent, RouterModule],
    selector: 'nx-dynamic-mf-root',
    template: `
        <div class="dashboard-nav">Admin Dashboard</div>

        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    isLoggedIn = this.userService.isUserLoggedIn;

    navigate = effect(async () => {
        if (!this.isLoggedIn()) {
            await this.router.navigateByUrl('login');
        } else {
            await this.router.navigateByUrl('');
        }
    });

    constructor(
        private userService: UserService,
        private router: Router,
    ) {}
}
