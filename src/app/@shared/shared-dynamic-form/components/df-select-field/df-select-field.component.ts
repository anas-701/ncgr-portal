import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseFieldComponent } from '../../base-field.component';
import { NgClass } from '@angular/common';
import { FieldValidationComponent } from '../../field-validation.component';

@Component({
  selector: 'app-df-select-field',
  imports: [ReactiveFormsModule,NgClass,FieldValidationComponent],
  templateUrl: './df-select-field.component.html',
  styleUrl: './df-select-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DfSelectFieldComponent),
      multi: true
    }
  ],
})
export class DfSelectFieldComponent extends BaseFieldComponent{
  @Input() options?: any[] = [];

  onSelect(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.updateValue(target.value);
  }
}
