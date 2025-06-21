import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { AppLookUpServiceService } from '../../../@core/services/app-look-up-service.service';
import { AppLookUpResponse } from '../../../@models/app-lookup-response.model';
import { TextEditor } from '../../../@shared/text-editor/text-editor.component';

@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TextEditor],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.scss',
})
export class StepTwoComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  targetAudiences: AppLookUpResponse[] = [];

  constructor(private appLookUpService: AppLookUpServiceService) {}

  ngOnInit() {
    this.getAppLookupData();
    this.addLanguageValidation();
  }

  // Add custom validators for language restriction
  addLanguageValidation() {
    // Arabic fields
    const arabicFields = ['programRequirements'];
    // English fields
    const englishFields = ['programRequirementsEn'];

    // Add Arabic validation
    arabicFields.forEach((field) => {
      const control = this.formGroup.get(field);
      if (control) {
        const currentValidators = control.validator;
        const validators = currentValidators
          ? [currentValidators, this.arabicOnlyValidator()]
          : [this.arabicOnlyValidator()];
        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    });

    // Add English validation
    englishFields.forEach((field) => {
      const control = this.formGroup.get(field);
      if (control) {
        const currentValidators = control.validator;
        const validators = currentValidators
          ? [currentValidators, this.englishOnlyValidator()]
          : [this.englishOnlyValidator()];
        control.setValidators(validators);
        control.updateValueAndValidity();
      }
    });
  }

  // Custom validator for Arabic text
  arabicOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Don't validate empty values
      }

      // Regular expression for Arabic characters
      const arabicPattern = /^[\u0600-\u06FF\s.,!؟()[\]{}:;'"،0-9-_]+$/;

       const plainText = control.value.replace(/<[^>]*>/g, '').trim();
      const valid = arabicPattern.test(plainText);
      return valid ? null : { arabicOnly: { value: control.value } };
    };
  }

  // Custom validator for English text
  englishOnlyValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Don't validate empty values
      }

      // Regular expression for English characters
      const englishPattern = /^[A-Za-z\s.,!?()[\]{}:;'"0-9-_]+$/;
       const plainText = control.value.replace(/<[^>]*>/g, '').trim();
      const valid = englishPattern.test(plainText);
      return valid ? null : { englishOnly: { value: control.value } };
    };
  }

  getAppLookupData() {
    this.appLookUpService.getAllCategories().subscribe((res) => {
      this.targetAudiences = res?.result;
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

    if (control.hasError('arabicOnly')) {
      return 'يرجى إدخال حروف عربية فقط';
    }

    if (control.hasError('englishOnly')) {
      return 'يرجى إدخال حروف إنجليزية فقط';
    }

    return '';
  }
}
