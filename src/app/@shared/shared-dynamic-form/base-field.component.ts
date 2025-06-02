import { Component, Input, forwardRef } from '@angular/core';
import { ReactiveFormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'base-field',
    standalone: true,
    imports: [ReactiveFormsModule],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BaseFieldComponent),
            multi: true
        }
    ],
    template: `<ng-content></ng-content>`
})
export class BaseFieldComponent implements ControlValueAccessor {
    @Input() id!: string;
    @Input() label!: string;
    @Input() validators: ValidatorFn[] = [];
    @Input() placeholder?: string;
    @Input() required: boolean = false;
    @Input() control!: AbstractControl | FormControl|null;
    @Input() styleClass?: string;

    value: any = '';
    disabled: boolean = false;

    protected onChange = (value: any) => { };
    protected onTouched = () => { };

    writeValue(value: any): void {
        this.value = value || '';
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    protected updateValue(newValue: any): void {
        this.value = newValue;
        this.onChange(newValue);
        this.onTouched();
    }
}