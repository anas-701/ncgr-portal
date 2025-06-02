import { Component, inject, OnInit, output } from '@angular/core';
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
  // signalEffect = effect(() => {
  //   if (this._workshopEditorService.getMatterDetails()) {
  //     this.setFormValue()
  //   }
  // })
  ngOnInit(): void {
    this.initForm()
  }
  initForm() {
    this.formFields = [
      {
        key: 'title',
        type: 'text',
        label: 'عنوان الورشة (بالعربية)',
        styleClass:'col-md-6',
        validators: [Validators.required,CustomValidators.arabicLetters]
      },
      {
        key: 'titleEn',
        type: 'text',
        label: 'عنوان الورشة (بالانجليزية)',
        styleClass:'col-md-6',
        options: [
          { label: 'test', value: 'test' }
        ],
        validators: [Validators.required,CustomValidators.englishLetters]
      },
      {
        key: 'description',
        type: 'editor',
        label: 'وصف الورشة (بالعربية)',
        styleClass:'col-md-6',
        validators: [Validators.required]
      },
      {
        key: 'description',
        type: 'editor',
        label: 'وصف الورشة (بالانجليزية)',
        styleClass:'col-md-6',
        validators: [Validators.required]
      },
      {
        key: 'trainerName',
        type: 'text',
        label: 'اسم المدرب (بالعربية)',
        styleClass:'col-md-6',
        validators: [Validators.required,CustomValidators.arabicLetters]
      },
      {
        key: 'trainerNameEn',
        type: 'text',
        label: 'اسم المدرب (بالانجليزية)',
        styleClass:'col-md-6',
        options: [
          { label: 'test', value: 'test' }
        ],
        validators: [Validators.required,CustomValidators.englishLetters]
      },
      {
        key: 'email',
        type: 'text',
        label: 'البريد الالكتروني للمدرب',
        validators: [Validators.required,CustomValidators.customEmail]
      },
      {
        key: 'file',
        type: 'file',
        styleClass:'col-md-6',
        label: 'صورة الورشة',
        validators: [Validators.required]
      },
      {
        key: 'language',
        type: 'radio',
        styleClass:'col-md-6',
        label: 'اللغة',
        validators: [Validators.required],
        options:[
          {label:'العربية',value:'1'},
          {label:'الانجليزية',value:'2'},
        ]
      },
    ];
    setTimeout(() => {
      this.setFormData()
    }, 1000);
  }
  setFormData() {
    const existingData = {
      title: 'ورشة تطوير البرمجيات',
      titleEn: 'test',
      description: 'هذه ورشة متقدمة في تطوير البرمجيات'
    };

    // this.form.patchValue(existingData);
  }
  onSubmit() {
    console.log('form', this.form.value)
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return
    }
    this.onChangeStep.emit(2)
  }
}
