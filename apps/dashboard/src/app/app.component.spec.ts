import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';

import { NxWelcomeComponent } from './nx-welcome.component';
import { AppComponent } from './app.component';
import { UserService } from '@nx-dynamic-mf/shared/data-access';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let router: Router;
    let userService: UserService;

    beforeEach(async () => {
        userService = {
            isUserLoggedIn: signal(false)
        } as unknown as UserService;

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    { path: '', component: NxWelcomeComponent }
                ]),
                AppComponent,
                NxWelcomeComponent
            ],
            providers: [{ provide: UserService, useValue: userService }]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should navigate to login page', () => {
        const isUserLoggedIn = userService.isUserLoggedIn;

        fixture.whenStable().then(() => {
            if (!isUserLoggedIn()) {
                expect(router.url).toBe('login');
            }
        });
    });

    it('should navigate to the main page', () => {
        (userService.isUserLoggedIn as WritableSignal<boolean>).set(true);

        fixture.whenStable().then(() => {
            expect(router.url).toBe('/');
        });
    });
});
