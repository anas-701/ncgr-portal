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
import { ToasterService } from '../../../@shared/toaster.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,TextEditor],
  templateUrl: './step-one.component.html',
  styleUrl: './step-one.component.scss',
})
export class StepOneComponent implements OnInit {
  @Input() formGroup!: FormGroup;

  paths: AppLookUpResponse[] = [];
  tags: AppLookUpResponse[] = [];

  coverPicturePath: string | null = null;
  programPicturePath: string | null = null;

  constructor(private appLookUpService: AppLookUpServiceService ,private toaster: ToasterService) {}

  ngOnInit() {
    this.getAppLookUpData();
    this.restoreImagePreview();
    this.addLanguageValidation();
  }

  // Add custom validators for language restriction
  addLanguageValidation() {
    // Arabic fields
    const arabicFields = [
      'programName',
      'programDescription',
      'programObjectives',
    ];
    // English fields
    const englishFields = [
      'programNameEn',
      'programDescriptionEn',
      'programObjectivesEn',
    ];

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

  getAppLookUpData() {
    this.appLookUpService.getAllPaths().subscribe((res) => {
      this.paths = res?.result;
    });

    this.appLookUpService.getAllTags().subscribe((res) => {
      this.tags = res?.result;
    });
  }

  onFileSelected(event: Event, isArabic: boolean) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
        this.toaster.warning('يرجى اختيار ملف من نوع JPEG أو JPG أو PNG فقط');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        this.toaster.warning('حجم الملف يجب أن لا يتجاوز 5 ميجابايت');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (isArabic) {
          this.coverPicturePath = e.target.result;
          this.formGroup.patchValue({
            arabicImage: file,
            coverPicturePath: e.target.result,
          });
        } else {
          this.programPicturePath = e.target.result;
          this.formGroup.patchValue({
            englishImage: file,
            programPicturePath: e.target.result,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(isArabic: boolean) {
    if (isArabic) {
      this.coverPicturePath = null;
      this.formGroup.patchValue({
        arabicImage: null,
        coverPicturePath: null,
      });
      const fileInput = document.getElementById(
        'arabicImage'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } else {
      this.programPicturePath = null;
      this.formGroup.patchValue({
        englishImage: null,
        programPicturePath: null,
      });
      const fileInput = document.getElementById(
        'englishImage'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  }

  private restoreImagePreview() {
    this.coverPicturePath = this.formGroup.value?.coverPicturePath || null;
    this.programPicturePath = this.formGroup.value?.programPicturePath || null;
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
