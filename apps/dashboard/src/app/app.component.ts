import { Component, effect } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@nx-dynamic-mf/shared/data-access';
import { NxWelcomeComponent } from './nx-welcome.component';

@Component({
    standalone: true,
    imports: [NxWelcomeComponent, RouterOutlet],
    selector: 'nx-dynamic-mf-root',
    template: `
        <div class="dashboard-nav">Admin Dashboard</div>

        <router-outlet></router-outlet>
    `,
})
export class AppComponent {
    constructor(
        private userService: UserService,
        private router: Router,
    ) {
        effect(async () => {
            if (!this.userService.isUserLoggedIn()) {
                await this.router.navigateByUrl('login');
            } else {
                await this.router.navigateByUrl('');
            }
        });
    }
}
