import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { StepThreeComponent } from './step-three/step-three.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SideBarComponent } from '../side-bar/side-bar.component';
import { TrainingProgramsService } from '../../@core/services/training-programs.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-training-program',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    // SearchFilterComponent,
    SideBarComponent,
  ],
  templateUrl: './add-training-program.component.html',
  styleUrls: ['./add-training-program.component.scss'],
})
export class AddTrainingProgramComponent {
  currentStep = 1;
  trainingForm!: FormGroup;
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
    private trainingProgramService: TrainingProgramsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initForm();
    this.programId = this.route.snapshot.queryParamMap.get('id');
    console.log('Program ID from snapshot:', this.programId);
  }

  private initForm(): void {
    this.trainingForm = this.fb.group({
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

      categoryId: ['1'],
      price: [null],
      certificateId: ['1', Validators.required],
      programCostId: ['0'],
    });
  }
  getProgramById(): void {
    if (this.programId) {
      this.trainingProgramService
        .getTrainingProgramById(this.programId)
        .subscribe({
          next: (response) => {
            if (response) {
              this.trainingForm.patchValue({
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
        const control = this.trainingForm.get(controlName);
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
      if (this.trainingForm.get('programType')?.value === '1') {
        stepTwoControls.push('targetAudienceId');
        this.trainingForm
          .get('targetAudienceId')
          ?.setValidators(Validators.required);
      } else {
        this.trainingForm.get('targetAudienceId')?.clearValidators();
      }
      this.trainingForm.get('targetAudienceId')?.updateValueAndValidity();

      let isValid = true;

      // Mark all fields as touched to show validation errors
      stepTwoControls.forEach((controlName) => {
        const control = this.trainingForm.get(controlName);
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
    }

    if (this.currentStep < 3) {
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
    if (this.trainingForm.get('categoryId')?.value === '0') {
      this.trainingForm.get('price')?.setValidators(Validators.required);
    } else {
      this.trainingForm.get('price')?.clearValidators();
      this.trainingForm.get('price')?.setValue(null);
    }
    this.trainingForm.get('price')?.updateValueAndValidity();

    // Check certificate is valid
    const certificateId = this.trainingForm.get('certificateId');
    if (certificateId) {
      certificateId.markAsTouched();
    }

    if (this.trainingForm.invalid) {
      this.markFormGroupTouched(this.trainingForm);
      this.formError = 'يرجى ملء جميع الحقول المطلوبة';
      this.showToast('error', 'يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    this.isLoading = true;
    const formValue = this.trainingForm.value;
    const formData = this.prepareFormData(formValue);
    if (this.editMode) {
      formData.set('id', this.programId!);
      this.trainingProgramService
        .updateTrainingProgram(this.programId!, formData)
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
    this.trainingProgramService.createTrainingProgram(formData).subscribe({
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
      price: 'ProgramCostId',
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
    this.trainingForm.reset({
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
