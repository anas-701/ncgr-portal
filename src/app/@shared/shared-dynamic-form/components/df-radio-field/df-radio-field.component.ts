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
export class DfRadioFieldComponent extends BaseFieldComponent {
  @Input() options?: any[] = [];
  
  get formControl(): FormControl {
    return this.control as FormControl;
  }

  onSelect(event: Event): void {
    const target = event.target as HTMLInputElement; // تغيير من HTMLSelectElement إلى HTMLInputElement
    if (target.checked) { // تأكد أن الـ radio محدد
      this.updateValue(target.value);
    }
  }

  // Override writeValue للتأكد من التحديث الصحيح
  override writeValue(value: any): void {
    super.writeValue(value);
    // يمكنك إضافة منطق إضافي هنا إذا لزم الأمر
  }
}