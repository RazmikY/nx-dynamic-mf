import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import spyOn = jest.spyOn;

import { RemoteEntryComponent } from './entry.component';
import { UserService } from '@nx-dynamic-mf/shared/data-access';

describe('RemoteEntryComponent', () => {
    let component: RemoteEntryComponent;
    let fixture: ComponentFixture<RemoteEntryComponent>;
    let userService: UserService;

    beforeEach(async () => {
        userService = {
            isUserLoggedIn: signal(false),
            checkCredentials: jest.fn(),
        } as unknown as UserService;

        await TestBed.configureTestingModule({
            imports: [RemoteEntryComponent],
            providers: [{ provide: UserService, useValue: userService }],
        }).compileComponents();

        fixture = TestBed.createComponent(RemoteEntryComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create loginForm with initial value', () => {
        const loginForm = component.loginForm;
        expect(loginForm).toBeTruthy();
        expect(loginForm.controls.userName.value).toBe('');
        expect(loginForm.controls.password.value).toBe('');
    });

    it('should setValue to the loginForm', () => {
        const loginForm = component.loginForm;
        loginForm.controls.password.setValue('hello');
        loginForm.controls.userName.setValue('world');
        fixture.detectChanges();

        const userNameInput = fixture.debugElement.query(
            By.css('input[name="userName"]'),
        ).nativeNode;
        const passwordInput = fixture.debugElement.query(
            By.css('input[name="password"]'),
        ).nativeNode;

        expect(userNameInput.value).toBe('world');
        expect(passwordInput.value).toBe('hello');
    });

    it('should update loginForm value by changing input values', () => {
        const loginForm = component.loginForm;
        fixture.detectChanges();
        const userNameInput = fixture.debugElement.query(
            By.css('input[name="userName"]'),
        ).nativeNode;
        const passwordInput = fixture.debugElement.query(
            By.css('input[name="password"]'),
        ).nativeNode;

        userNameInput.value = 'demo';
        passwordInput.value = 'demo';
        passwordInput.dispatchEvent(new Event('input'));
        userNameInput.dispatchEvent(new Event('input'));

        expect(loginForm.value.userName).toBe('demo');
        expect(loginForm.value.password).toBe('demo');
    });

    it('should test login method', () => {
        const loginForm = component.loginForm;
        const checkCredentials = spyOn(userService, 'checkCredentials');
        expect((component as any).submitted).toBeFalsy();

        component.login();
        expect((component as any).submitted).toBeTruthy();
        expect(checkCredentials).toHaveBeenCalled();
        expect(checkCredentials).toHaveBeenCalledWith(
            loginForm.value.userName,
            loginForm.value.password,
        );
    });

    it('should test isLoginFormTouched getter', () => {
        expect(component.isLoginFormTouched).toBe(false);

        fixture.detectChanges();

        const userNameInput = fixture.debugElement.query(
            By.css('input[name="userName"]'),
        ).nativeNode;
        const passwordInput = fixture.debugElement.query(
            By.css('input[name="password"]'),
        ).nativeNode;

        userNameInput.value = 'demo';
        passwordInput.value = 'demo';
        passwordInput.dispatchEvent(new Event('input'));
        passwordInput.dispatchEvent(new Event('blur'));

        component.login();

        // will be false, because all controls must be touched
        // in this scenario only password control is touched
        expect(component.isLoginFormTouched).toBe(false);

        // now userName control is also touched
        userNameInput.dispatchEvent(new Event('input'));
        userNameInput.dispatchEvent(new Event('blur'));
        component.login();
        expect(component.isLoginFormTouched).toBe(true);
    });

    it('should test submit button', () => {
        const button = fixture.debugElement.query(By.css('button')).nativeNode;
        const loginForm = component.loginForm;
        fixture.detectChanges();

        expect(button).toBeTruthy();
        expect(loginForm.invalid).toBe(true);
        expect(button.disabled).toBe(true);

        loginForm.controls.password.setValue('hello');
        loginForm.controls.userName.setValue('world');
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(loginForm.invalid).toBe(false);
            expect(button.disabled).toBe(false);
        });
    });

    it('should check submitted field resetting functionality', () => {
        const loginForm = component.loginForm;
        loginForm.controls.password.setValue('hello');
        loginForm.controls.userName.setValue('world');

        // will be false because the login method does not called;
        expect((component as any).submitted).toBe(false);

        component.login();
        expect((component as any).submitted).toBe(true);

        // after changing loginForm controls value submitted
        // field value will be reset
        loginForm.controls.userName.setValue('demo');
        expect((component as any).submitted).toBe(false);
    });

    it("should check if error message is shown", () => {
        const loginForm = component.loginForm;

        fixture.detectChanges();
        const errorComponent = fixture.debugElement.query(By.css(".error"));
        expect(errorComponent).toBeFalsy();

        // write wrong username and password
        loginForm.controls.password.setValue('hello');
        loginForm.controls.userName.setValue('world');
        component.login();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(errorComponent).toBeTruthy();
            expect(errorComponent.nativeNode.textContent).toBe("Wrong userName or password!")
        });

        // set correct password and userName
        loginForm.controls.password.setValue('demo');
        loginForm.controls.userName.setValue('demo');
        component.login();
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(errorComponent).toBeFalsy();
        })
    })
});
