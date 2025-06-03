import { Component, forwardRef, Input } from '@angular/core';
import { FieldValidationComponent } from '../../field-validation.component';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { BaseFieldComponent } from '../../base-field.component';

@Component({
  selector: 'app-df-date-field',
  imports: [
    ReactiveFormsModule,
    FieldValidationComponent,
    NgClass
  ],
  templateUrl: './df-date-field.component.html',
  styleUrl: './df-date-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DfDateFieldComponent),
      multi: true
    }
  ]
})
export class DfDateFieldComponent extends BaseFieldComponent {
  @Input() minDate?: string; // Format: YYYY-MM-DD
  @Input() maxDate?: string; // Format: YYYY-MM-DD
  @Input() dateFormat: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd'| undefined = 'yyyy-mm-dd';

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  get formattedValue(): string {
    if (!this.control?.value) return '';

    const date = new Date(this.control.value);
    if (isNaN(date.getTime())) return '';

    // Always return in YYYY-MM-DD format for HTML date input
    return date.toISOString().split('T')[0];
  }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const dateValue = target.value;

    if (dateValue) {
      // Convert to Date object or keep as string based on your needs
      const date = new Date(dateValue);
      this.updateValue(date.toISOString());
    } else {
      this.updateValue('');
    }
  }

  // Helper method to format date for display (if needed elsewhere)
  formatDateForDisplay(date: Date): string {
    if (!date || isNaN(date.getTime())) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    switch (this.dateFormat) {
      case 'dd/mm/yyyy':
        return `${day}/${month}/${year}`;
      case 'mm/dd/yyyy':
        return `${month}/${day}/${year}`;
      case 'yyyy-mm-dd':
      default:
        return `${year}-${month}-${day}`;
    }
  }

  // Validation helpers
  isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  isWithinRange(dateString: string): boolean {
    if (!this.isValidDate(dateString)) return false;

    const date = new Date(dateString);
    const min = this.minDate ? new Date(this.minDate) : null;
    const max = this.maxDate ? new Date(this.maxDate) : null;

    if (min && date < min) return false;
    if (max && date > max) return false;

    return true;
  }
}
