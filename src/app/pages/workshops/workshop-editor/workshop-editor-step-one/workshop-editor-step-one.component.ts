import { Component, effect, inject, OnInit, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WorkshopEditorService } from '../services/workshop-editor.service';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { CustomValidators } from '../../../../@shared/shared-dynamic-form/custom-validators';

@Component({
  selector: 'app-workshop-editor-step-one',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-editor-step-one.component.html',
  styleUrl: './workshop-editor-step-one.component.scss'
})
export class WorkshopEditorStepOneComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  onChangeStep = output<number>();
  formFields: FormFieldConfig[] = [];
  _workshopEditorService = inject(WorkshopEditorService)
  signalEffect = effect(() => {
    if (this._workshopEditorService.getWorkShop()) {
      console.log(this._workshopEditorService.getWorkShop())
      this.setFormData()
    }
  })
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formFields = [
      {
        key: 'titleAr',
        type: 'text',
        label: 'عنوان الورشة (بالعربية)',
        styleClass: 'col-md-6',
        validators: [Validators.required, CustomValidators.arabicLetters]
      },
      {
        key: 'titleEn',
        type: 'text',
        label: 'عنوان الورشة (بالانجليزية)',
        styleClass: 'col-md-6',
        validators: [Validators.required, CustomValidators.englishLetters]
      },
      {
        key: 'descriptionAr',
        type: 'editor',
        label: 'وصف الورشة (بالعربية)',
        styleClass: 'col-md-6',
        validators: [Validators.required]
      },
      {
        key: 'descriptionEn',
        type: 'editor',
        label: 'وصف الورشة (بالانجليزية)',
        styleClass: 'col-md-6',
        validators: [Validators.required]
      },
      {
        key: 'trainerNameAr',
        type: 'text',
        label: 'اسم المدرب (بالعربية)',
        styleClass: 'col-md-6',
        validators: [CustomValidators.arabicLetters]
      },
      {
        key: 'trainerNameEn',
        type: 'text',
        label: 'اسم المدرب (بالانجليزية)',
        styleClass: 'col-md-6',
        validators: [CustomValidators.englishLetters]
      },
      {
        key: 'email',
        type: 'text',
        label: 'البريد الالكتروني للمدرب',
        validators: [CustomValidators.customEmail]
      },
      {
        key: 'workshopPicture',
        type: 'file',
        styleClass: 'col-md-6',
        label: 'صورة الورشة',
        validators: [Validators.required]
      },
      {
        key: 'language',
        type: 'radio',
        styleClass: 'col-md-6',
        label: 'اللغة',
        options: [
          { label: 'العربية', value: 1 },
          { label: 'الانجليزية', value: 2 },
        ]
      },
    ];
    setTimeout(() => {
      this.setDefaultFormValue()
    });
  }
  setDefaultFormValue() {
    const defaultValue = {
      language: 1
    }
    this.form.patchValue(defaultValue);
  }
  setFormData() {
    this.form.patchValue(this._workshopEditorService.getWorkShop());
  }
  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this._workshopEditorService.updateWorkShop({
      ...this._workshopEditorService.getWorkShop(),
      ...this.form.value
    })
    this.onChangeStep.emit(2)
  }
}
