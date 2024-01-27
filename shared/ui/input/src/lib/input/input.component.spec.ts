import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgControl } from '@angular/forms';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [InputComponent],
            providers: [NgControl]
        }).compileComponents();

        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        component.dir = TestBed.inject(NgControl);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should input type to be text', () => {
        component.type = 'text';
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const input = fixture.debugElement.query(By.css('input')).nativeNode;
            expect(input.dataset.type).toBe('text');
        });
    });

    it('should set name and type inputs', () => {
        // const mockOnChanged
        component.name = 'testName';
        component.type = 'text';
        fixture.detectChanges();

        const inputElement = fixture.nativeElement.querySelector('input');
        expect(inputElement.getAttribute('name')).toBe('testName');
        expect(inputElement.getAttribute('type')).toBe('text');
    });

    it('should update inputValue on writeValue', () => {
        const testValue = 'Test Value';
        component.writeValue(testValue);

        fixture.whenStable().then(() => {
            const inputElement = fixture.nativeElement.querySelector('input');
            expect(inputElement.nativeElement.value).toBe(testValue);
            expect(component.inputValue).toBe(testValue);
        });
    });

    it('should call onChange when input value changes', () => {
        const mockOnChange = jest.fn();
        component.registerOnChange(mockOnChange);

        const testValue = 'Test Change';
        const inputElement = fixture.nativeElement.querySelector('input');
        inputElement.value = testValue;
        inputElement.dispatchEvent(new Event('input'));

        fixture.whenStable().then(() => {
            expect(mockOnChange).toHaveBeenCalled();
            expect(mockOnChange).toHaveBeenCalledWith(testValue);
            expect(mockOnChange).toHaveBeenCalledTimes(1);
            expect(component.inputValue).toBe(testValue);
        });
    });

    it('should call onTouched when input loses focus', () => {
        const mockOnTouched = jest.fn();
        component.registerOnTouched(mockOnTouched);
        expect(component.dir.touched).toBeFalsy();

        fixture.whenStable().then(() => {
            const inputElement = fixture.nativeElement.querySelector('input');
            inputElement.dispatchEvent(new Event('blur'));

            expect(component.dir.touched).toBeTruthy();
            expect(mockOnTouched).toHaveBeenCalled();
        });
    });

    it('should set isDisabled when setDisabledState is called', () => {
        component.setDisabledState!(true);
        expect(component.isDisabled).toBe(true);

        component.setDisabledState!(false);
        expect(component.isDisabled).toBe(false);
    });

    it('should update validators and async validators on ngOnInit', () => {
        const mockControl = {
            validator: () => {
            },
            asyncValidator: () => {
            },
            setValidators: jest.fn(),
            setAsyncValidators: jest.fn(),
            updateValueAndValidity: jest.fn()
        };

        component.dir = { control: mockControl } as unknown as NgControl;
        component.ngOnInit();

        expect(mockControl.setValidators).toHaveBeenCalled();
        expect(mockControl.setAsyncValidators).toHaveBeenCalled();
        expect(mockControl.updateValueAndValidity).toHaveBeenCalled();
    });
});
