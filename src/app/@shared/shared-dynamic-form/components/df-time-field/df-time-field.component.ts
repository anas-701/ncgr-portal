import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { FieldValidationComponent } from '../../field-validation.component';
import { BaseFieldComponent } from '../../base-field.component';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-df-time-field',
  imports: [
    ReactiveFormsModule,
    FieldValidationComponent,
    NgClass
  ],
  templateUrl: './df-time-field.component.html',
  styleUrl: './df-time-field.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DfTimeFieldComponent),
      multi: true
    }
  ]
})
export class DfTimeFieldComponent extends BaseFieldComponent{
  @Input() minTime?: string; // Format: HH:MM
  @Input() maxTime?: string; // Format: HH:MM
  @Input() step?: number = 60; // Seconds (60 = 1 minute steps)
  @Input() timeFormat?: '12' | '24' = '24'; // 12-hour or 24-hour format
  @Input() showTimeFormat?: boolean = false;

  get formControl(): FormControl {
    return this.control as FormControl;
  }

  get formattedValue(): string {
    if (!this.control?.value) return '';
    
    // If the value is already in HH:MM format, return it
    if (typeof this.control.value === 'string' && this.isValidTimeFormat(this.control.value)) {
      return this.control.value;
    }
    
    // If it's a Date object, extract time
    if (this.control.value instanceof Date) {
      const hours = this.control.value.getHours().toString().padStart(2, '0');
      const minutes = this.control.value.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    
    return '';
  }

  onTimeChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const timeValue = target.value; // Format: HH:MM
    
    if (timeValue) {
      // You can store as string or convert to Date object
      this.updateValue(timeValue);
    } else {
      this.updateValue('');
    }
  }

  // Helper method to validate time format
  isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }

  // Convert 24-hour to 12-hour format
  convertTo12Hour(time24: string): string {
    if (!this.isValidTimeFormat(time24)) return time24;
    
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${ampm}`;
  }

  // Convert 12-hour to 24-hour format
  convertTo24Hour(time12: string): string {
    const time12Regex = /^(1[0-2]|0?[1-9]):([0-5][0-9])\s?(AM|PM)$/i;
    const match = time12.match(time12Regex);
    
    if (!match) return time12;
    
    let [, hours, minutes, ampm] = match;
    let hour = parseInt(hours, 10);
    
    if (ampm.toUpperCase() === 'AM' && hour === 12) {
      hour = 0;
    } else if (ampm.toUpperCase() === 'PM' && hour !== 12) {
      hour += 12;
    }
    
    return `${hour.toString().padStart(2, '0')}:${minutes}`;
  }

  // Get formatted time for display
  getDisplayTime(): string {
    const value = this.formattedValue;
    if (!value) return '';
    
    return this.timeFormat === '12' ? this.convertTo12Hour(value) : value;
  }

  // Validation helpers
  isWithinTimeRange(time: string): boolean {
    if (!this.isValidTimeFormat(time)) return false;
    
    const timeMinutes = this.timeToMinutes(time);
    const minMinutes = this.minTime ? this.timeToMinutes(this.minTime) : 0;
    const maxMinutes = this.maxTime ? this.timeToMinutes(this.maxTime) : 24 * 60;
    
    return timeMinutes >= minMinutes && timeMinutes <= maxMinutes;
  }

  private timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}
