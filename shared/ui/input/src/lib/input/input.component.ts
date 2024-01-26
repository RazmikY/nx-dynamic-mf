import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    Optional,
    Self
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'nx-dynamic-mf-input',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <input
            [type]="type"
            [name]="name"
            [value]="inputValue"
            [disabled]="isDisabled"
            (input)="onChanged($any($event.target).value)"
            (blur)="onTouched()"
        />
    `
})
export class InputComponent implements OnInit, ControlValueAccessor {
    @Input({ required: true }) name!: string;
    @Input({ required: true }) type!: string;

    public isDisabled = false;
    public inputValue: string = '';
    public onChange!: (value: string) => void;
    public onTouched!: () => void;

    constructor(@Optional() @Self() public dir: NgControl) {
        if (dir) {
            this.dir.valueAccessor = this;
        }
    }

    ngOnInit(): void {
        this.configControl();
    }

    private configControl(): void {
        const control = this.dir.control!;
        if (control) {
            const validators = control.validator ? [control.validator] : [];
            const asyncValidator = control?.asyncValidator
                ? [control.asyncValidator]
                : [];
            control.setValidators(validators);
            control.setAsyncValidators(asyncValidator);
            control.updateValueAndValidity();
        }
    }

    public onChanged(value: string): void {
        this.onChange(value);
    }

    writeValue(inputValue: string): void {
        this.inputValue = inputValue;
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}
