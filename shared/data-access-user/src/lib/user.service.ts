import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    #isUserLoggedIn = signal(false);
    readonly isUserLoggedIn = this.#isUserLoggedIn.asReadonly();

    checkCredentials(username: string, password: string) {
        if (username === 'demo' && password === 'demo') {
            this.#isUserLoggedIn.set(true);
        }
    }

    logout() {
        this.#isUserLoggedIn.set(false);
    }
}
