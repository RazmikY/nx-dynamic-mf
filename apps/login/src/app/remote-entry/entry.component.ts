import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';

import { UserService } from '@nx-dynamic-mf/shared/data-access';
import { ButtonComponent } from '@nx-dynamic-mf/shared/ui/button';
import { InputComponent } from '@nx-dynamic-mf/shared/ui/input';
import { ErrorComponent } from '@nx-dynamic-mf/shared/ui/error';

@Component({
    standalone: true,
    imports: [ReactiveFormsModule, ButtonComponent, InputComponent, ErrorComponent],
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
                    <nx-dynamic-mf-input
                        formControlName="userName"
                        type="text"
                        name="userName"
                    />
                </label>
                <label>
                    Password:
                    <nx-dynamic-mf-input
                        formControlName="password"
                        type="password"
                        name="password"
                    />
                </label>
                <nx-dynamic-mf-button
                    [disabled]="loginForm.invalid"
                    label="Login"
                    type="submit"
                />
            </form>
            @if (isLoginFormTouched && !isLoggedIn()) {
                <nx-dynamic-mf-error errorMessage="Wrong userName or password!"/>
            }
        </div>
    `,
})
export class RemoteEntryComponent {
    private submitted = false;
    public readonly loginForm = this.fb.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
    public readonly isLoggedIn = this.userService.isUserLoggedIn;

    constructor(
        private userService: UserService,
        private fb: NonNullableFormBuilder,
    ) {
        this.loginForm.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => {
            if (this.submitted) {
                this.resetSubmittedValue();
            }
        });
    }

    public login(): void {
        this.submitted = true;
        const { password, userName } = this.loginForm.value;
        this.userService.checkCredentials(userName!, password!);
    }

    public get isLoginFormTouched(): boolean {
        return (
            this.submitted &&
            this.loginForm.valid &&
            Object.values(this.loginForm.controls).every(
                (value) => value.touched,
            )
        );
    }

    private resetSubmittedValue(): void {
        this.submitted = false;
    }
}
