import { inject } from '@angular/core';

import { UserService } from './user.service';

export const authGuard = (userService = inject(UserService)) => userService.isUserLoggedIn;
