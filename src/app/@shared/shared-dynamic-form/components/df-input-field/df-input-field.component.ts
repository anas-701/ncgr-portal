import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseFieldComponent } from '../../base-field.component';
import { NgClass } from '@angular/common';
import { FieldValidationComponent } from '../../field-validation.component';

@Component({
  selector: 'app-df-input-field',
  imports: [
    ReactiveFormsModule,
    NgClass,
    FieldValidationComponent
  ],
  templateUrl: './df-input-field.component.html',
  styleUrl: './df-input-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DfInputFieldComponent),
      multi: true
    }
  ],
})
export class DfInputFieldComponent extends BaseFieldComponent{
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.updateValue(target.value);
  }
}
