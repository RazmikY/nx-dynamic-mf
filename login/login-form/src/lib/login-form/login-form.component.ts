import { Component } from '@angular/core';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { UserService } from '@nx-dynamic-mf/shared/data-access-user';

@Component({
    selector: 'nx-dynamic-mf-login-form',
    standalone: true,
    imports: [ReactiveFormsModule],
    template: `
        <div class="login-app">
            <form
                class="login-form"
                [formGroup]="loginForm"
                (ngSubmit)="login()"
            >
                <label>
                    Username:
                    <input
                        type="text"
                        name="username"
                        formControlName="username"
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        formControlName="password"
                    />
                </label>
                <button type="submit">Login</button>
            </form>
            @if (isLoggedIn()) {
                <div>User is logged in!</div>
            }
        </div>
    `,
    styles: `
        .login-app {
            width: 30vw;
            border: 2px dashed black;
            padding: 8px;
            margin: 0 auto;
        }
        .login-form {
            display: flex;
            align-items: center;
            flex-direction: column;
            margin: 0 auto;
            padding: 8px;
            gap: 5px;
        }
        label {
            display: block;
        }
        button:hover {
            cursor: pointer;
        }
    `,
})
export class LoginFormComponent {
    loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
    isLoggedIn = this.userService.isUserLoggedIn;

    constructor(
        private userService: UserService,
        private fb: NonNullableFormBuilder,
    ) {}

    login() {
        const { password, username } = this.loginForm.value;
        this.userService.checkCredentials(username!, password!);
    }
}
