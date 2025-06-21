import { Component } from '@angular/core';
import { SideBarComponent } from '../../../side-bar/side-bar.component';
import { SharedDynamicFormComponent } from '../../../../@shared/shared-dynamic-form/shared-dynamic-form.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldConfig } from '../../../../@shared/shared-dynamic-form/interfaces/form-field-config.interface';
import { SharedRateComponent } from '../../../../@shared/shared-rate/shared-rate.component';

@Component({
  selector: 'app-workshop-content-rate-editor',
  imports: [
    SideBarComponent,
    SharedDynamicFormComponent,
    ReactiveFormsModule,
    SharedRateComponent
  ],
  templateUrl: './workshop-content-rate-editor.component.html',
  styleUrl: './workshop-content-rate-editor.component.scss'
})
export class WorkshopContentRateEditorComponent {
  isLoading!:boolean;
  form: FormGroup = new FormGroup({});
  formFields: FormFieldConfig[] = [
    {
      key: 'startRegisterDate',
      type: 'text',
      styleClass: 'col-12 mb-3',
      label: 'كيف كانت تجربتك؟',
      validators: [Validators.required],
    },
    {
      key: 'objective',
      type: 'radio',
      styleClass: 'col-12 mb-3',
      label: 'ما مدى رضاك عن تحقيق أهداف الورشة التدريبية؟',
      options: [
        { label: 'ممتاز', value: '1' },
        { label: 'جيد جدا', value: '2' },
        { label: 'جيد', value: '3' },
        { label: 'مقبول', value: '4' },
        { label: 'ضعيف', value: '5' },
      ],
      validators: [Validators.required],
    },
    {
      key: 'interactive',
      type: 'radio',
      styleClass: 'col-12',
      label: 'ما مدى تفاعل المدرب مع المشاركين والإجابة على استفساراتهم؟',
      options: [
        { label: 'ممتاز', value: '1' },
        { label: 'جيد جدا', value: '2' },
        { label: 'جيد', value: '3' },
        { label: 'مقبول', value: '4' },
        { label: 'ضعيف', value: '5' },
      ],
      validators: [Validators.required],
    },
    {
      key: 'sutisfied',
      type: 'radio',
      styleClass: 'col-12 mb-3',
      label: 'هل كانت مدة الورشة كافية لتغطية المواضيع المطروحة بشكل مناسب؟',
      options: [
        { label: 'نعم', value: '1' },
        { label: 'لا', value: '2' },
      ],
      validators: [Validators.required],
    },
    {
      key: 'skills',
      type: 'text',
      styleClass: 'col-12 mb-3',
      label: 'ما هي أبرز المهارات أو المعارف الجديدة التي اكتسبتها من الورشة؟',
      validators: [Validators.required],
    },
  ];
  onRatingChange(e:any){
    console.log(e)
  }
  onSubmit(){

  }   
}
