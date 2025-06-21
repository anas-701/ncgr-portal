import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppLookUpResponse } from '../../../../@models/app-lookup-response.model';
import { AppLookUpServiceService } from '../../../../@core/services/app-look-up-service.service';

@Component({
  selector: 'app-location-step',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './location-step.component.html',
  styleUrl: './location-step.component.scss'
})
export class LocationStepComponent {
@Input() formGroup!: FormGroup;
  prices: AppLookUpResponse[] = [];
  certificates: AppLookUpResponse[] = [];

  constructor(private appLookUpService: AppLookUpServiceService) {}

  ngOnInit() {
  
  }
  // Validation helpers
  isFieldInvalid(controlName: string): boolean {
    const control = this.formGroup.get(controlName);
    return control
      ? control.invalid && (control.dirty || control.touched)
      : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.formGroup.get(controlName);
    if (!control) return '';

    if (control.hasError('required')) {
      // Always show Arabic error message regardless of field language
      return 'هذا الحقل مطلوب';
    }

    return '';
  }
}
