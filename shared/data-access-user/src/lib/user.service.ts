import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    #isUserLoggedIn = signal(false);
    readonly isUserLoggedIn = this.#isUserLoggedIn.asReadonly();

    public checkCredentials(username: string, password: string) {
        if (username === 'demo' && password === 'demo') {
            this.#isUserLoggedIn.set(true);
        }
    }

    public logout() {
        this.#isUserLoggedIn.set(false);
    }
}
