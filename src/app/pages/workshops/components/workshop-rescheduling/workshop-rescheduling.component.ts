import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';

@Component({
  selector: 'app-workshop-rescheduling',
  imports: [
    ReactiveFormsModule,
    SharedDynamicFormComponent
  ],
  templateUrl: './workshop-rescheduling.component.html',
  styleUrl: './workshop-rescheduling.component.scss'
})
export class WorkshopReschedulingComponent {
  form: FormGroup = new FormGroup({});
  formFields: FormFieldConfig[] = [
    {
      key: 'startRegisterDate',
      type: 'date',
      styleClass: 'col-md-6',
      label: 'موعد بدء التسجيل',
      validators: [Validators.required],
    },
    {
      key: 'endRegisterDate',
      type: 'date',
      styleClass: 'col-md-6',
      label: 'موعد انتهاء التسجيل',
      validators: [Validators.required],
    },
  ];
  onSubmit(){

  }
}
