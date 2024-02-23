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
    styleUrl: './login.component.scss',
    templateUrl: './login.component.html',
})
export class LoginComponent {
    private submitted = false;
    public readonly loginForm = this.fb.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });
    public readonly isLoggedIn = this.userService.isUserLoggedIn;

    constructor(
        private readonly userService: UserService,
        private readonly fb: NonNullableFormBuilder,
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

    public get loginFormIsTouched(): boolean {
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
