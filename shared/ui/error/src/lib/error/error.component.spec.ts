import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorComponent } from './error.component';

describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ErrorComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should show passed message", () => {
        const message = 'something get wrong';
        const div = fixture.debugElement.query(By.css('div')).nativeNode;

        component.errorMessage = message;
        fixture.detectChanges();

        expect(div.textContent).toContain(message);
        expect(div.classList).toContain('error');
        expect(getComputedStyle(div).color).toBe('red');
    })
});
