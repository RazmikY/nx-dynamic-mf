import { signal, WritableSignal } from '@angular/core';

import { UserService } from './user.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
    const userService: Partial<UserService>  = {
        isUserLoggedIn: signal(false),
    };

    it(`should return false if usersService "isUserLoggedIn" is false`, () => {
        const isUserLoggedIn = authGuard(userService as UserService)();
        expect(isUserLoggedIn).toBe(false);
    })

    it(`should return true if usersService "isUserLoggedIn" is true`, () => {
        (userService.isUserLoggedIn as WritableSignal<boolean>).set(true);
        const isUserLoggedIn = authGuard(userService as UserService)();
        expect(isUserLoggedIn).toBe(true);
    })
});
