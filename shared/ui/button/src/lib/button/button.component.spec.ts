import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import spyOn = jest.spyOn;

import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ButtonComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it("should have label with name 'submit'", () => {
        const label = 'submit';
        component.label = label;
        fixture.detectChanges();

        expect(component.label).toBe(label);

        const buttonDebugElement = fixture.debugElement.query(By.css('button'));
        expect(buttonDebugElement).toBeTruthy();
        expect(buttonDebugElement.nativeNode.textContent).toContain(component.label)
    })

    it("should invoke clicked event emitter", () => {
        const spy = spyOn(component.clicked, 'emit');
        component.onClick();
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    })

    it("should invoke onClick method by clicking button ", () => {
        const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeNode;
        const onClickSpy = spyOn(component, 'onClick');
        const emitterSpy = spyOn(component.clicked, 'emit');

        button.click();
        expect(onClickSpy).toHaveBeenCalled();
        expect(onClickSpy).toHaveBeenCalledTimes(1);
        expect(emitterSpy).toHaveBeenCalled();
        expect(emitterSpy).toHaveBeenCalledTimes(1);
    })
    it("should check disable functionality", () => {
        const button: HTMLButtonElement = fixture.debugElement.query(By.css('button')).nativeNode;
        expect(button.disabled).toBe(false);

        component.disabled = true;
        fixture.detectChanges();
        expect(button.disabled).toBe(true);
    })
});
