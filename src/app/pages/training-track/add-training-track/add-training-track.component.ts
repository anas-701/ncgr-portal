import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { TrainingTrackService } from '../services/training-track.service';
import { TrackCreateRequest } from '../model/track-create-request';
import { SideBarComponent } from '../../side-bar/side-bar.component';

@Component({
  selector: 'app-add-training-track',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SideBarComponent],
  templateUrl: './add-training-track.component.html',
  styleUrl: './add-training-track.component.scss',
})
export class AddTrainingTrackComponent implements OnInit {
  trackForm: FormGroup;
  isActive = true;
  alertMessage = '';
  alertSeverity = 'success';
  isEditMode = false;
  isValidTrack = true;
  loading = true;
  processing = false;
  id: string | null = null;
  selectedLanguage: string = 'ar';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trackService: TrainingTrackService
  ) {
    this.trackForm = this.fb.group({
      pathNameAr: ['', Validators.required],
      pathNameEn: ['', Validators.required],
      contentLanguage: this.fb.group(
        {
          ar: [false],
          en: [false],
        },
        { validators: this.atLeastOneLanguageValidator }
      ),
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loadTrackData(this.id);
    } else {
      this.loading = false;
    }
  }

  private atLeastOneLanguageValidator(group: FormGroup) {
    const ar = group.get('ar')?.value;
    const en = group.get('en')?.value;
    return ar || en ? null : { noLanguageSelected: true };
  }

  private loadTrackData(id: string) {
    this.loading = true;
    this.trackService
      .getTrackById(id, this.selectedLanguage)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          if (response.success && response.data) {
            this.isEditMode = true;
            const trackData = response.data;
            this.showAlert('تم تحميل بيانات المسار بنجاح', 'success');

            this.trackForm.patchValue({
              pathNameAr: trackData.titleAr,
              pathNameEn: trackData.titleEn,
              contentLanguage: {
                ar: trackData.isArabic,
                en: trackData.isEnglish,
              },
            });

            this.isActive = trackData.statusId === 1;
          } else {
            this.showAlert('حدث خطأ أثناء تحميل بيانات المسار', 'danger');
            this.isValidTrack = false;
          }
        },
        error: (error) => {
          console.error('Error loading track data:', error);
          this.isValidTrack = false;
        },
      });
  }

  onSubmit() {
    if (this.trackForm.valid) {
      this.processing = true;
      const formValue = this.trackForm.value;

      const trackData: TrackCreateRequest = {
        id: this.isEditMode && this.id ? Number(this.id) : 0,
        titleAr: formValue.pathNameAr,
        titleEn: formValue.pathNameEn,
        isArabic: formValue.contentLanguage.ar,
        isEnglish: formValue.contentLanguage.en,
        statusId: this.isActive ? 1 : 2, // Assuming 1 is active, 2 is inactive
      };

      const apiCall = this.isEditMode
        ? this.trackService.updateTrack(trackData, this.selectedLanguage)
        : this.trackService.createTrack(trackData, this.selectedLanguage);

      apiCall.pipe(finalize(() => (this.processing = false))).subscribe({
        next: (response) => {
          console.log('API response:', response);
          const successMessage = this.isEditMode
            ? 'تم تحديث المسار بنجاح'
            : 'تم إضافة المسار بنجاح';

          this.showAlert(successMessage, 'success');

          setTimeout(() => {
            this.router.navigate(['/training-paths']);
          }, 1500);
        },
        error: (error) => {
          console.error('Error saving track:', error);
          console.error('Status:', error.status);
          console.error('Status text:', error.statusText);
          console.error('Error URL:', error.url);

          let errorMessage = 'حدث خطأ أثناء حفظ البيانات';

          if (error.status === 404) {
            errorMessage =
              'خطأ في عنوان API المستخدم - الرجاء التأكد من صحة الإعدادات';
          } else if (error.status === 401) {
            errorMessage = 'غير مصرح لك بهذه العملية';
          } else if (error.status === 400) {
            errorMessage =
              'بيانات غير صحيحة - الرجاء التأكد من الحقول المطلوبة';
          } else if (error.status === 403) {
            errorMessage = 'غير مسموح بهذه العملية';
          } else if (error.status === 200) {
            const successMessage = this.isEditMode
              ? 'تم تحديث المسار بنجاح'
              : 'تم إضافة المسار بنجاح';

            this.showAlert(successMessage, 'success');

            setTimeout(() => {
              this.router.navigate(['/dashboard/learning-paths']);
            }, 1500);
            return;
          }

          this.showAlert(errorMessage, 'danger');
        },
      });
    }
  }

  private showAlert(message: string, severity: string) {
    this.alertMessage = message;
    this.alertSeverity = severity;
    setTimeout(() => {
      this.alertMessage = '';
    }, 5000);
  }

  changeLanguage(lang: string) {
    this.selectedLanguage = lang;
  }
}
