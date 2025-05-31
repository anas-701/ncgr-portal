import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AppLookUpServiceService } from '../../../@core/services/app-look-up-service.service';
import { AppLookUpResponse } from '../../../@models/app-lookup-response.model';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.scss',
})
export class StepThreeComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  prices: AppLookUpResponse[] = [];
  certificates: AppLookUpResponse[] = [];

  constructor(private appLookUpService: AppLookUpServiceService) {}

  ngOnInit() {
    this.getAppLookUpData();
  }

  getAppLookUpData() {
    this.appLookUpService.getAllCosts().subscribe((res) => {
      this.prices = res?.result;
    });
    this.appLookUpService.getAllCertificates().subscribe((res) => {
      this.certificates = res?.result;
    });
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
