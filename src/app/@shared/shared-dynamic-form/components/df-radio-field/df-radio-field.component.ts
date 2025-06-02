import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FieldValidationComponent } from '../../field-validation.component';
import { BaseFieldComponent } from '../../base-field.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-df-radio-field',
  imports: [
    ReactiveFormsModule,
    FieldValidationComponent,
    NgClass
  ],
  templateUrl: './df-radio-field.component.html',
  styleUrl: './df-radio-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DfRadioFieldComponent),
      multi: true
    }
  ],  
})
export class DfRadioFieldComponent extends BaseFieldComponent{
  @Input() options?: any[] = [];
  get formControl(): FormControl {
    return this.control as FormControl;
  }
  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.updateValue(target.value);
  }
}
