import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../../@shared/shared-dynamic-form/custom-validators';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';


@Component({
  selector: 'app-workshop-requirment-editor',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-requirment-editor.component.html',
  styleUrl: './workshop-requirment-editor.component.scss'
})
export class WorkshopRequirmentEditorComponent {
  form: FormGroup = new FormGroup({});
  formFields: FormFieldConfig[] = [
    {
      key: 'title',
      type: 'text',
      styleClass: 'col-md-6',
      label: 'عنوان الجلسة (بالعربية)',
      validators: [Validators.required,CustomValidators.arabicLetters],
    },
    {
      key: 'titleEn',
      type: 'text',
      styleClass: 'col-md-6',
      label: 'عنوان الجلسة (بالانجليزية)',
      validators: [Validators.required,CustomValidators.englishLetters],
    },
    {
      key: 'date',
      type: 'date',
      styleClass: 'col-md-6',
      label: 'تاريخ الجلسة',
      validators: [Validators.required],
    },
  ];
  
  onSubmit(){

  }   
}
