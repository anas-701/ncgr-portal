import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { StepOneComponent } from '../../add-training-program/step-one/step-one.component';
import { StepTwoComponent } from '../../add-training-program/step-two/step-two.component';
import { StepThreeComponent } from '../../add-training-program/step-three/step-three.component';
import { SideBarComponent } from '../../side-bar/side-bar.component';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationStepComponent } from './location-step/location-step.component';
import { GeneralProgramsService } from '../service/general-programs.service';

@Component({
  selector: 'app-add-general-programs',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    SideBarComponent,
    LocationStepComponent,
  ],
  templateUrl: './add-general-programs.component.html',
  styleUrl: './add-general-programs.component.scss',
})
export class AddGeneralProgramsComponent {
  currentStep = 1;
  programForm!: FormGroup;
  isLoading = false;
  programId!: string | null;
  editMode = false;
  formError: string | null = null;

  // Toast message variables
  showSuccessToast = false;
  showErrorToast = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private generalProgramsSevice: GeneralProgramsService
  ) {
    this.initForm();
    this.programId = this.route.snapshot.queryParamMap.get('id');
    console.log('Program ID from snapshot:', this.programId);
  }
  private initForm(): void {
    this.programForm = this.fb.group({
      programName: ['', Validators.required],
      programDescription: ['', Validators.required],
      programObjectives: ['', Validators.required],
      PathId: [null, Validators.required],
      programNameEn: ['', Validators.required],
      programDescriptionEn: ['', Validators.required],
      programObjectivesEn: ['', Validators.required],
      arabicImage: [null],
      englishImage: [null],
      coverPicturePath: [null],
      programPicturePath: [null],
      language: ['1', Validators.required],
      TagsId: [null],
      programType: ['1'],
      targetAudienceId: [null],
      programRequirements: ['', Validators.required],
      programRequirementsEn: ['', Validators.required],
      PrivateProgram: ['1'],
      programStart: ['', Validators.required],
      programEnd: ['', Validators.required],
      registerationStart: ['', Validators.required],
      registerationEnd: ['', Validators.required],
      capacity: ['', [Validators.required,Validators.min(1)]],
      categoryId: ['1'],
      price: [null],
      certificateId: ['1', Validators.required],
      programCostId: ['0'],
    });
  }
  getProgramById(): void {
    if (this.programId) {
      this.generalProgramsSevice
        .getGeneralProgramById(this.programId)
        .subscribe({
          next: (response) => {
            if (response) {
              this.programForm.patchValue({
                programName: response.data.titleAr,
                programDescription: response.data.descriptionAr,
                programObjectives: response.data.aboutAr,
                PathId: response.data.pathId,
                programNameEn: response.data.titleEn,
                programDescriptionEn: response.data.descriptionEn,
                programObjectivesEn: response.data.aboutEn,
                arabicImage: response.data.programPicturePath,
                englishImage: response.data.coverPicturePath,
                coverPicturePath: response.data.coverPicturePath,
                programPicturePath: response.data.programPicturePath,
                language: String(response.data.language),
                TagsId: response.data.tagId,
                programType: String(response.data.typeId),
                targetAudienceId: response.data.categoryId,
                programRequirements: response.data.programRequirementsAr,
                programRequirementsEn: response.data.programRequirementsEn,
                PrivateProgram:
                  response.data.privateProgram == false ? '0' : '1',
                categoryId: response.data.programCostId ? '0' : '1',
                price: response.data.programCostId,
                certificateId: response.data.certificateId,
                programCostId: response.data.programCostId,
                
              });
              this.editMode = true;
            } else {
              this.toastr.error('لم يتم العثور على البرنامج');
            }
          },
          error: (error) => {
            this.toastr.error('حدث خطأ أثناء استرجاع البرنامج');
            console.error('Error fetching program:', error);
          },
          complete: () => {
            console.log('Program fetch completed');
          },
        });
    } else {
      this.toastr.error('معرف البرنامج غير صالح');
    }
  }
  ngOnInit(): void {
    this.getProgramById();
  }

  nextStep(): void {
    if (this.currentStep === 1) {
      const stepOneControls = [
        'programName',
        'programDescription',
        'programObjectives',
        'programNameEn',
        'programDescriptionEn',
        'programObjectivesEn',
        'PathId',
        'language',
      ];
      let isValid = true;

      // Mark all fields as touched to show validation errors
      stepOneControls.forEach((controlName) => {
        const control = this.programForm.get(controlName);
        if (control) {
          control.markAsTouched();
          if (control.invalid) {
            isValid = false;
          }
        }
      });

      if (!isValid) {
        this.formError = 'يرجى ملء جميع الحقول المطلوبة';
        this.toastr.error('يرجى ملء جميع الحقول المطلوبة');
        return;
      }

      this.formError = null;
    } else if (this.currentStep === 2) {
      const stepTwoControls = ['programRequirements', 'programRequirementsEn'];

      // If private program type is selected, targetAudienceId is required
      if (this.programForm.get('programType')?.value === '1') {
        stepTwoControls.push('targetAudienceId');
        this.programForm
          .get('targetAudienceId')
          ?.setValidators(Validators.required);
      } else {
        this.programForm.get('targetAudienceId')?.clearValidators();
      }
      this.programForm.get('targetAudienceId')?.updateValueAndValidity();

      let isValid = true;

      // Mark all fields as touched to show validation errors
      stepTwoControls.forEach((controlName) => {
        const control = this.programForm.get(controlName);
        if (control) {
          control.markAsTouched();
          if (control.invalid) {
            isValid = false;
          }
        }
      });

      if (!isValid) {
        this.formError = 'يرجى ملء جميع الحقول المطلوبة';
        this.toastr.error('يرجى ملء جميع الحقول المطلوبة');
        return;
      }
    } else if (this.currentStep === 3) {
      const locationStepControls = [
        'programStart',
        'programEnd',
        'registerationStart',
        'registerationEnd',
        'capacity',
      ];
      let isValid = true;
      locationStepControls.forEach((controlName) => {
        const control = this.programForm.get(controlName);
        if (control) {
          control.markAsTouched();
          if (control.invalid) {
            isValid = false;
          }
        }
      });

      if (!isValid) {
        this.formError = 'يرجى ملء جميع الحقول المطلوبة';
        this.toastr.error('يرجى ملء جميع الحقول المطلوبة');
        return;
      }
      const programStart = this.programForm.get('programStart')?.value;
      const programEnd = this.programForm.get('programEnd')?.value;
      const registerationStart =
        this.programForm.get('registerationStart')?.value;
      const registerationEnd = this.programForm.get('registerationEnd')?.value;

      // التحقق من صحة التواريخ
      if (new Date(programStart) > new Date(programEnd)) {
        this.formError =
          'تاريخ بداية البرنامج يجب أن يكون قبل تاريخ نهاية البرنامج';
        this.toastr.error(this.formError);
        return;
      }

      if (new Date(registerationStart) > new Date(registerationEnd)) {
        this.formError =
          'تاريخ بداية التسجيل يجب أن يكون قبل تاريخ نهاية التسجيل';
        this.toastr.error(this.formError);
        return;
      }

      if (new Date(registerationEnd) > new Date(programStart)) {
        this.formError =
          'تاريخ نهاية التسجيل يجب أن يكون قبل تاريخ بداية البرنامج';
        this.toastr.error(this.formError);
        return;
      }
      this.formError = null;
    }

    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Method to show toast messages
  showToast(
    type: 'success' | 'error',
    message: string,
    duration: number = 5000
  ): void {
    if (type === 'success') {
      this.successMessage = message;
      this.showSuccessToast = true;
      setTimeout(() => {
        this.showSuccessToast = false;
      }, duration);
    } else {
      this.errorMessage = message;
      this.showErrorToast = true;
      setTimeout(() => {
        this.showErrorToast = false;
      }, duration);
    }
  }

  // Hide all toasts
  onHideToasts(): void {
    this.showSuccessToast = false;
    this.showErrorToast = false;
  }

  submitForm(): void {
    // For paid programs, price is required
    if (this.programForm.get('categoryId')?.value === '0') {
      this.programForm.get('price')?.setValidators(Validators.required);
    } else {
      this.programForm.get('price')?.clearValidators();
      this.programForm.get('price')?.setValue(null);
    }
    this.programForm.get('price')?.updateValueAndValidity();

    // Check certificate is valid
    const certificateId = this.programForm.get('certificateId');
    if (certificateId) {
      certificateId.markAsTouched();
    }

    if (this.programForm.invalid) {
      this.markFormGroupTouched(this.programForm);
      this.formError = 'يرجى ملء جميع الحقول المطلوبة';
      this.showToast('error', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    this.isLoading = true;
    const formValue = this.programForm.value;
    const formData = this.prepareFormData(formValue);
    if (this.editMode) {
      formData.set('id', this.programId!);
      this.generalProgramsSevice
        .updateGeneralProgram(this.programId!, formData)
        .subscribe({
          next: (response) => {
            this.showToast('success', 'تم تحديث البرنامج بنجاح');
            this.resetForm();
            // Navigate after a slight delay to allow the user to see the success message
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 2000);
          },
          error: (error) => {
            this.showToast('error', 'حدث خطأ، لم يتم تحديث البرنامج');
            console.error('Error submitting form:', error);
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      return;
    }
    this.generalProgramsSevice.createGeneralProgram(formData).subscribe({
      next: (response) => {
        this.showToast('success', 'تم إنشاء البرنامج بنجاح');
        this.resetForm();
        // Navigate after a slight delay to allow the user to see the success message
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      error: (error) => {
        this.showToast('error', 'حدث خطأ، لم يتم إضافة البرنامج');
        console.error('Error submitting form:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  private prepareFormData(formValue: any): FormData {
    const formData = new FormData();
    Object.keys(formValue).forEach((key) => {
      const value = formValue[key];
      if (value !== null && value !== undefined) {
        if (key === 'arabicImage' && value instanceof File) {
          formData.append('CoverPicture', value);
        } else if (key === 'englishImage' && value instanceof File) {
          formData.append('ProgramPicture', value);
        } else if (key === 'PrivateProgram') {
          formData.append(
            'PrivateProgram',
            value === '1' || value === true ? 'true' : 'false'
          );
        } else if (typeof value === 'object') {
        } else {
          formData.append(this.mapFieldName(key), value.toString());
        }
      }
    });

    formData.append('id', '0');
    formData.append('ProgramStatusId', '1');

    return formData;
  }

  private mapFieldName(formControlName: string): string {
    const fieldMap: { [key: string]: string } = {
      programName: 'TitleAr',
      programNameEn: 'TitleEn',
      programDescription: 'DescriptionAr',
      programDescriptionEn: 'DescriptionEn',
      programObjectives: 'AboutAr',
      programObjectivesEn: 'AboutEn',
      language: 'Language',
      PathId: 'PathId',
      programRequirements: 'ProgramRequirementsAr',
      programRequirementsEn: 'ProgramRequirementsEn',
      PrivateProgram: 'PrivateProgram',
      TagsId: 'TagId',
      programType: 'TypeId',
      targetAudienceId: 'CategoryId',
      categoryId: 'ProgramCostId',
      price:'Amount',
      certificateId: 'CertificateId',
    };

    return fieldMap[formControlName] || formControlName;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private resetForm(): void {
    this.programForm.reset({
      language: '1',
      PrivateProgram: '1',
      categoryId: '1',
      certificateId: '1',
      programCostId: '1',
    });
    this.currentStep = 1;
    this.isLoading = false;
  }
}
