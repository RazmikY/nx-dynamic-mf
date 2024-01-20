import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators
} from '@angular/forms';

import { UserService } from '@nx-dynamic-mf/shared/data-access-user';
import { ButtonComponent } from '@nx-dynamic-mf/shared/ui/button';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, ButtonComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'nx-dynamic-mf-login-entry',
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
    `,
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
                <nx-dynamic-mf-button [disabled]="loginForm.invalid" label="Login" type="submit"/>
            </form>
            @if (isLoginFormTouched && !isLoggedIn()) {
                <div style="color: red;">Wrong userName or password!</div>
            }
        </div>
    `
})
export class RemoteEntryComponent {
    private submitted = false;
    public readonly loginForm = this.fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
    });
    public readonly isLoggedIn = this.userService.isUserLoggedIn;

    constructor(
        private userService: UserService,
        private fb: NonNullableFormBuilder
    ) {
        this.loginForm.valueChanges
            .pipe(takeUntilDestroyed())
            .subscribe(() => {
                if (this.submitted) {
                    this.resetSubmittedValue();
                }
            });
    }

    public login(): void {
        this.submitted = true;
        const { password, username } = this.loginForm.value;
        this.userService.checkCredentials(username!, password!);
    }

    public get isLoginFormTouched(): boolean {
        return (
            this.submitted &&
            this.loginForm.valid &&
            Object.values(this.loginForm.controls).every(
                (value) => value.touched
            )
        );
    }

    private resetSubmittedValue(): void {
        this.submitted = false;
    }
}
